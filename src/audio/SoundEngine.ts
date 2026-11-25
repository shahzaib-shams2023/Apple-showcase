/**
 * Procedural Web Audio synthesizer for MONOLITH // 26.
 * Muted by default; initializes strictly after an explicit user gesture.
 */
export class SoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private droneOscA: OscillatorNode | null = null;
  private droneOscB: OscillatorNode | null = null;
  private droneFilter: BiquadFilterNode | null = null;
  private enabled = false;
  private supported =
    typeof window !== 'undefined' &&
    ('AudioContext' in window || 'webkitAudioContext' in window);

  public isSupported(): boolean {
    return this.supported;
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  private ensureContext(): boolean {
    if (!this.supported) return false;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0;
      this.masterGain.connect(this.ctx.destination);

      this.droneFilter = this.ctx.createBiquadFilter();
      this.droneFilter.type = 'lowpass';
      this.droneFilter.frequency.value = 165;
      this.droneFilter.connect(this.masterGain);

      const droneGain = this.ctx.createGain();
      droneGain.gain.value = 0.055;
      droneGain.connect(this.droneFilter);

      this.droneOscA = this.ctx.createOscillator();
      this.droneOscA.type = 'sine';
      this.droneOscA.frequency.value = 55;
      this.droneOscA.connect(droneGain);

      this.droneOscB = this.ctx.createOscillator();
      this.droneOscB.type = 'triangle';
      this.droneOscB.frequency.value = 82.41;
      this.droneOscB.connect(droneGain);

      this.droneOscA.start();
      this.droneOscB.start();
    }

    if (this.ctx.state === 'suspended') {
      void this.ctx.resume();
    }
    return true;
  }

  public setEnabled(next: boolean): boolean {
    if (!next) {
      this.enabled = false;
      if (this.ctx && this.masterGain) {
        const now = this.ctx.currentTime;
        this.masterGain.gain.cancelScheduledValues(now);
        this.masterGain.gain.setTargetAtTime(0, now, 0.08);
      }
      return false;
    }

    if (!this.ensureContext()) return false;
    this.enabled = true;
    if (this.ctx && this.masterGain) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setTargetAtTime(0.42, now, 0.25);
    }
    this.playClick(340, 0.06);
    return true;
  }

  public pauseForVisibility(hidden: boolean) {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setTargetAtTime(hidden || !this.enabled ? 0 : 0.42, now, 0.08);
  }

  public playEntranceChord() {
    if (!this.enabled || !this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    [110, 164.81, 220, 329.63].forEach((freq, i) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.045);
      gain.gain.setValueAtTime(0.0001, now + i * 0.045);
      gain.gain.exponentialRampToValueAtTime(0.055, now + i * 0.045 + 0.16);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.7);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now + i * 0.045);
      osc.stop(now + 1.75);
    });
  }

  public playClick(freq = 460, gainLevel = 0.035) {
    if (!this.enabled || !this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.58, now + 0.06);
    gain.gain.setValueAtTime(gainLevel, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.075);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.08);
  }

  public playChapterShift(index: number) {
    if (this.droneFilter && this.ctx && this.enabled) {
      const targetCutoff = 145 + index * 32;
      this.droneFilter.frequency.setTargetAtTime(
        targetCutoff,
        this.ctx.currentTime,
        0.35
      );
    }
    this.playClick(250 + index * 36, 0.03);
  }

  public dispose() {
    this.enabled = false;
    try {
      this.droneOscA?.stop();
      this.droneOscB?.stop();
      void this.ctx?.close();
    } catch {
      // Ignore teardown errors
    }
    this.ctx = null;
    this.masterGain = null;
  }
}
