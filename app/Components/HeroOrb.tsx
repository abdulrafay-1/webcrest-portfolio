"use client";

import * as THREE from "three";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { Canvas, ThreeEvent, useFrame } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

const ORB_SCALE = 2.2;

const ORB_DETAIL = 6;

const MAGNET_RADIUS = 0.55;
const MAGNET_STRENGTH = 0.45;

const OFFSCREEN = 9999;

function MagneticOrb() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null);

  const magnetLocal = useRef(
    new THREE.Vector3(OFFSCREEN, OFFSCREEN, OFFSCREEN),
  );
  const magnetTarget = useRef(
    new THREE.Vector3(OFFSCREEN, OFFSCREEN, OFFSCREEN),
  );
  const targetScale = useRef(
    new THREE.Vector3(ORB_SCALE, ORB_SCALE, ORB_SCALE),
  );
  const tmp = useMemo(() => new THREE.Vector3(), []);

  const isHovering = useRef(false);

  const onPointerMove = useCallback(
    (e: ThreeEvent<PointerEvent>) => {
      const mesh = meshRef.current;
      if (!mesh) return;

      isHovering.current = true;

      tmp.copy(e.point);
      mesh.worldToLocal(tmp);

      magnetTarget.current.copy(tmp);
    },
    [tmp],
  );

  const onPointerOut = useCallback(() => {
    isHovering.current = false;
    magnetTarget.current.set(OFFSCREEN, OFFSCREEN, OFFSCREEN);
    magnetLocal.current.set(OFFSCREEN, OFFSCREEN, OFFSCREEN);
  }, []);

  useEffect(() => {
    const mat = materialRef.current;
    if (!mat) return;

    mat.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = { value: 0 };
      shader.uniforms.uMagnet = {
        value: new THREE.Vector3(OFFSCREEN, OFFSCREEN, OFFSCREEN),
      };
      shader.uniforms.uRadius = { value: MAGNET_RADIUS };
      shader.uniforms.uStrength = { value: MAGNET_STRENGTH };

      (mat as any).userData.shader = shader;

      shader.vertexShader = shader.vertexShader
        .replace(
          `#include <common>`,
          `#include <common>
           uniform float uTime;
           uniform vec3 uMagnet;
           uniform float uRadius;
           uniform float uStrength;

           vec3 magneticDeform(vec3 p) {
             vec3 n = normalize(p);

             float rippleA = 0.025 * sin(uTime * 1.1 + p.x * 7.0 + p.y * 4.0);
             float rippleB = 0.018 * sin(uTime * 1.6 - p.z * 8.0 + p.x * 3.0);
             p += n * (rippleA + rippleB);

             if (uMagnet.x > 9000.0) return p;

             float d = distance(p, uMagnet);
             float t = 1.0 - smoothstep(0.0, uRadius, d);
             vec3 dir = normalize(uMagnet - p);
             float inward = min(0.0, dot(dir, n));
             dir -= n * inward;
             float wobble = 0.06 * sin(uTime * 0.8 + p.y * 6.0 + p.x * 4.0);
             p += dir * (t * t) * uStrength;
             p += n * wobble * t;

             return p;
           }`,
        )
        .replace(
          `#include <begin_vertex>`,
          `#include <begin_vertex>
           transformed = magneticDeform(transformed);`,
        );
    };

    mat.needsUpdate = true;
  }, []);

  useFrame((state, delta) => {
    const mesh = meshRef.current;
    const mat = materialRef.current;
    if (!mesh || !mat) return;

    mesh.rotation.x += delta * 0.06;
    mesh.rotation.y += delta * 0.09;

    if (isHovering.current) {
      magnetLocal.current.lerp(magnetTarget.current, 0.12);
    } else {
      magnetLocal.current.set(OFFSCREEN, OFFSCREEN, OFFSCREEN);
    }

    const interaction = isHovering.current
      ? THREE.MathUtils.clamp(1 - magnetLocal.current.length() / 1.2, 0, 1)
      : 0;

    targetScale.current.set(
      ORB_SCALE * (1 - interaction * 0.08),
      ORB_SCALE * (1 + interaction * 0.06),
      ORB_SCALE * (1 + interaction * 0.1),
    );
    mesh.scale.lerp(targetScale.current, 0.07);

    const shader = (mat as any).userData.shader;
    if (shader) {
      shader.uniforms.uTime.value = state.clock.elapsedTime;
      shader.uniforms.uMagnet.value.copy(magnetLocal.current);
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.35}>
      <mesh
        ref={meshRef}
        scale={ORB_SCALE}
        onPointerMove={onPointerMove}
        onPointerOut={onPointerOut}
      >
        {/* ✅ huge performance win */}
        <icosahedronGeometry args={[1, ORB_DETAIL]} />

        <meshPhysicalMaterial
          ref={materialRef}
          color="#8b5cf6"
          roughness={0.08}
          metalness={1}
          envMapIntensity={1.6}
          clearcoat={1}
          clearcoatRoughness={0.08}
        />
      </mesh>
    </Float>
  );
}

function Particles() {
  const count = 400;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return pos;
  }, [count]);

  const ref = useRef<THREE.Points>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#a78bfa"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export default function HeroOrb() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.35} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={0.8}
          color="#a78bfa"
        />
        <pointLight position={[-5, -5, 5]} intensity={0.5} color="#c084fc" />

        <MagneticOrb />
        <Particles />

        <Environment preset="night" />

        {/* If still heavy, comment this out first */}
        <EffectComposer multisampling={0}>
          <Bloom luminanceThreshold={0.25} intensity={0.6} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
