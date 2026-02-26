"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type SceneBundle = {
  camera: THREE.Camera;
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  uniforms: {
    time: { value: number };
    resolution: { value: THREE.Vector2 };
  };
  mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial>;
  geometry: THREE.PlaneGeometry;
  material: THREE.ShaderMaterial;
  animationId: number;
  ro?: ResizeObserver;
};

export function ShaderAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bundleRef = useRef<SceneBundle | null>(null);
  const startedRef = useRef(false); // ✅ prevents StrictMode double init

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // ✅ In dev (React 18 StrictMode), effects run twice.
    if (startedRef.current) return;
    startedRef.current = true;

    // Safety: clear any existing children (prevents duplicate canvas)
    container.innerHTML = "";

    // Vertex shader
    const vertexShader = `
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `;

    // Fragment shader
    const fragmentShader = `
      precision highp float;
      uniform vec2 resolution;
      uniform float time;

      void main(void) {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
        float t = time * 0.05;
        float lineWidth = 0.002;

        vec3 color = vec3(0.0);
        for (int j = 0; j < 3; j++) {
          for (int i = 0; i < 5; i++) {
            color[j] += lineWidth * float(i*i) /
              abs(fract(t - 0.01*float(j) + float(i)*0.01) * 5.0 - length(uv) + mod(uv.x + uv.y, 0.2));
          }
        }

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    // Scene
    const camera = new THREE.Camera();
    camera.position.z = 1;

    const scene = new THREE.Scene();
    const geometry = new THREE.PlaneGeometry(2, 2);

    const uniforms: SceneBundle["uniforms"] = {
      time: { value: 1.0 },
      resolution: { value: new THREE.Vector2(1, 1) },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";

    container.appendChild(renderer.domElement);

    const resize = () => {
      const width = Math.max(1, container.clientWidth);
      const height = Math.max(1, container.clientHeight);

      renderer.setSize(width, height, false);

      // drawing buffer size (actual pixels)
      uniforms.resolution.value.set(
        renderer.domElement.width,
        renderer.domElement.height,
      );
    };

    // ✅ Better than window resize (works for any parent size changes)
    const ro = new ResizeObserver(() => resize());
    ro.observe(container);

    // Initial resize
    resize();

    const animate = () => {
      const id = requestAnimationFrame(animate);
      uniforms.time.value += 0.05;
      renderer.render(scene, camera);

      if (bundleRef.current) bundleRef.current.animationId = id;
    };

    bundleRef.current = {
      camera,
      scene,
      renderer,
      uniforms,
      mesh,
      geometry,
      material,
      animationId: 0,
      ro,
    };

    animate();

    return () => {
      const b = bundleRef.current;
      if (!b) return;

      // stop loop
      cancelAnimationFrame(b.animationId);

      // stop observing
      b.ro?.disconnect();

      // remove canvas
      if (container.contains(b.renderer.domElement)) {
        container.removeChild(b.renderer.domElement);
      }

      // dispose
      b.geometry.dispose();
      b.material.dispose();
      b.renderer.dispose();

      // optional: release GPU context aggressively
      try {
        b.renderer.forceContextLoss();
      } catch {}

      b.scene.clear();
      bundleRef.current = null;

      // allow mount again if component remounts
      startedRef.current = false;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 h-full w-full"
      style={{ background: "#000", overflow: "hidden" }}
    />
  );
}
