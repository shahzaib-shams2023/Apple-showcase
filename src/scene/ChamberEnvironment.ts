import * as THREE from 'three';

export interface ChamberEnvironment {
  group: THREE.Group;
  pedestalMesh: THREE.Mesh;
  apertureGroup: THREE.Group;
  uniforms: {
    uTime: { value: number };
    uAccent: { value: THREE.Color };
    uExplode: { value: number };
    uFold: { value: number };
    uIntensity: { value: number };
  };
  update: (params: {
    time: number;
    dt: number;
    apertureScale: number;
    apertureOpacity: number;
    ringTilt: number;
    pedestalX: number;
    explode: number;
    fold: number;
    pedestalIntensity: number;
    accent: THREE.Color;
    pointerX: number;
    pointerY: number;
  }) => void;
  dispose: () => void;
}

/**
 * Architectural 3D metrology environment:
 * - Custom GLSL optical calibration floor disc beneath the specimen
 * - Three suspended physical titanium aperture rings creating spatial depth & threshold portal
 * - Vertical optical axis datum wire behind the specimen
 */
export function createChamberEnvironment(): ChamberEnvironment {
  const group = new THREE.Group();

  const uniforms = {
    uTime: { value: 0 },
    uAccent: { value: new THREE.Color('#c85a6a') },
    uExplode: { value: 0 },
    uFold: { value: 0 },
    uIntensity: { value: 0.42 },
  };

  const vertexShader = /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv * 2.0 - 1.0;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = /* glsl */ `
    precision highp float;
    varying vec2 vUv;
    uniform float uTime;
    uniform vec3 uAccent;
    uniform float uExplode;
    uniform float uFold;
    uniform float uIntensity;

    void main() {
      float r = length(vUv);
      if (r > 1.0) discard;

      float radialFade = smoothstep(1.0, 0.05, r);
      float angle = atan(vUv.y, vUv.x);

      // Precision calibrated ticks around perimeter
      float tickPattern = smoothstep(0.92, 0.99, cos(angle * 36.0));
      float tickBand = smoothstep(0.015, 0.0, abs(r - 0.62));

      // Concentric optical waves sensitive to Z-stratum explosion & fold open angle
      float freq = mix(20.0, 32.0, uExplode);
      float rings = smoothstep(0.97, 1.0, abs(sin(r * freq - uTime * 0.18)));

      // Primary horizon datum ring
      float targetRadius = 0.40 + uExplode * 0.16 + uFold * 0.12;
      float mainRing = smoothstep(0.01, 0.0, abs(r - targetRadius));

      // Optical crosshairs
      float crossX = smoothstep(0.0035, 0.0, abs(vUv.x)) * step(0.16, r) * step(r, 0.74);
      float crossY = smoothstep(0.0035, 0.0, abs(vUv.y)) * step(0.16, r) * step(r, 0.74);

      vec3 neutralTone = vec3(0.95, 0.93, 0.89);
      vec3 color = mix(neutralTone * 0.34, uAccent, mainRing * 0.85 + uExplode * 0.25);

      float alpha =
        radialFade * 0.11 * uIntensity +
        rings * radialFade * 0.06 * uIntensity +
        mainRing * 0.46 * uIntensity +
        tickPattern * tickBand * 0.24 * uIntensity +
        (crossX + crossY) * 0.11 * uIntensity;

      gl_FragColor = vec4(color, clamp(alpha, 0.0, 0.72));
    }
  `;

  const pedestalGeo = new THREE.PlaneGeometry(5.8, 5.8, 1, 1);
  const pedestalMat = new THREE.ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false,
  });

  const pedestalMesh = new THREE.Mesh(pedestalGeo, pedestalMat);
  pedestalMesh.rotation.x = -Math.PI / 2;
  pedestalMesh.position.y = -1.1;
  group.add(pedestalMesh);

  // Physical suspended architectural aperture rings (kept behind the specimen plane)
  const apertureGroup = new THREE.Group();
  const ringMatOuter = new THREE.MeshStandardMaterial({
    color: '#1f2228',
    metalness: 0.82,
    roughness: 0.48,
    transparent: true,
    opacity: 0.48,
  });
  const ringMatInner = new THREE.MeshStandardMaterial({
    color: '#3f2a2f',
    metalness: 0.72,
    roughness: 0.42,
    transparent: true,
    opacity: 0.42,
  });

  const ringOuterGeo = new THREE.TorusGeometry(2.25, 0.006, 12, 120);
  const ringMidGeo = new THREE.TorusGeometry(1.56, 0.005, 12, 108);
  const ringBackGeo = new THREE.TorusGeometry(3.05, 0.007, 12, 120);

  const ringOuter = new THREE.Mesh(ringOuterGeo, ringMatOuter);
  ringOuter.position.z = -0.95;

  const ringMid = new THREE.Mesh(ringMidGeo, ringMatInner);
  ringMid.position.z = -1.65;

  const ringBack = new THREE.Mesh(ringBackGeo, ringMatOuter);
  ringBack.position.z = -2.6;

  // Vertical optical axis datum line
  const axisGeo = new THREE.CylinderGeometry(0.002, 0.002, 5.4, 8);
  const axisMat = new THREE.MeshBasicMaterial({
    color: '#f4f0e8',
    transparent: true,
    opacity: 0.06,
  });
  const axisMesh = new THREE.Mesh(axisGeo, axisMat);
  axisMesh.position.set(0, 0, -2.5);

  apertureGroup.add(ringOuter, ringMid, ringBack, axisMesh);
  group.add(apertureGroup);

  return {
    group,
    pedestalMesh,
    apertureGroup,
    uniforms,
    update: ({
      time,
      dt,
      apertureScale,
      apertureOpacity,
      ringTilt,
      pedestalX,
      explode,
      fold,
      pedestalIntensity,
      accent,
      pointerX,
      pointerY,
    }) => {
      uniforms.uTime.value = time;
      uniforms.uExplode.value = explode;
      uniforms.uFold.value = fold;
      uniforms.uAccent.value.lerp(accent, Math.min(1, dt * 4));
      uniforms.uIntensity.value = THREE.MathUtils.damp(
        uniforms.uIntensity.value,
        pedestalIntensity,
        4.0,
        dt
      );

      pedestalMesh.position.x = THREE.MathUtils.damp(
        pedestalMesh.position.x,
        pedestalX,
        4.6,
        dt
      );

      const s = THREE.MathUtils.damp(apertureGroup.scale.x, apertureScale, 3.8, dt);
      apertureGroup.scale.setScalar(s);
      apertureGroup.position.x = THREE.MathUtils.damp(
        apertureGroup.position.x,
        pedestalX * 0.45 + pointerX * 0.08,
        3.5,
        dt
      );
      apertureGroup.position.y = THREE.MathUtils.damp(
        apertureGroup.position.y,
        pointerY * 0.06,
        3.5,
        dt
      );

      ringOuter.rotation.y = THREE.MathUtils.damp(
        ringOuter.rotation.y,
        ringTilt * 0.35 + pointerX * 0.08,
        3.5,
        dt
      );
      ringOuter.rotation.x = THREE.MathUtils.damp(
        ringOuter.rotation.x,
        0.18 + pointerY * 0.06,
        3.5,
        dt
      );

      ringMid.rotation.y = THREE.MathUtils.damp(
        ringMid.rotation.y,
        -ringTilt * 0.55 - pointerX * 0.05,
        3.5,
        dt
      );
      ringMid.rotation.x = THREE.MathUtils.damp(
        ringMid.rotation.x,
        -0.14 + ringTilt * 0.15,
        3.5,
        dt
      );

      ringBack.rotation.y = THREE.MathUtils.damp(
        ringBack.rotation.y,
        ringTilt * 0.2,
        3.5,
        dt
      );

      ringMatOuter.opacity = THREE.MathUtils.damp(
        ringMatOuter.opacity,
        0.55 * apertureOpacity,
        4.0,
        dt
      );
      ringMatInner.opacity = THREE.MathUtils.damp(
        ringMatInner.opacity,
        0.65 * apertureOpacity,
        4.0,
        dt
      );
      ringMatInner.color.lerp(accent, Math.min(1, dt * 2.5));
      axisMat.opacity = THREE.MathUtils.damp(
        axisMat.opacity,
        0.09 * apertureOpacity,
        4.0,
        dt
      );
    },
    dispose: () => {
      pedestalGeo.dispose();
      pedestalMat.dispose();
      ringOuterGeo.dispose();
      ringMidGeo.dispose();
      ringBackGeo.dispose();
      axisGeo.dispose();
      ringMatOuter.dispose();
      ringMatInner.dispose();
      axisMat.dispose();
    },
  };
}

