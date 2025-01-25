import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { PerspectiveCamera, Points } from '@react-three/drei';
import * as THREE from 'three';


// make stars
let points: THREE.Vector3[] = [];
let velocities: number[] = [];
let accelerations: number[] = [];

for (let i = 0; i < 6000; i++) {
    let star = new THREE.Vector3(
        Math.random() * 600 - 300,
        Math.random() * 600 - 300,
        Math.random() * 600 - 300
    );

    points.push(star);
    velocities.push(0);
    accelerations.push(Math.random() * (.001 - .0005) + .0005);
}

function StarPointCloud() {
    const pointRef = useRef<THREE.Points>(null!);
    const { gl, scene, camera } = useThree();

    // HACK: I could not tell you why but this squashes the whole image to fit rather than the standard react-3-fiber approach that crops
    useEffect(() => {
        if (pointRef.current) {
            let starBufferGeometry = new THREE.BufferGeometry().setFromPoints(points);
            let stars = pointRef.current;
            stars.geometry = starBufferGeometry;

            function animate() {
                const positionAttribute = starBufferGeometry.getAttribute('position');

                for (let i = 0; i < positionAttribute.count; i++) {
                    let y = positionAttribute.getY(i);

                    velocities[i] = velocities[i] + accelerations[i];
                    y -= velocities[i];

                    if (y < -200) {
                        y = 200;
                        velocities[i] = 0;
                    }

                    positionAttribute.setY(i, y);
                }

                positionAttribute.needsUpdate = true;
                stars.rotation.y += 0.001;

                // this render call is the secret sauce I guess
                gl.render(scene, camera);
                requestAnimationFrame(animate);
            }

            animate();
        }
    }, []);

    return (
        <Points positions={new Float32Array()} ref={pointRef}>
            <pointsMaterial
                size={0.02}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </Points>
    );
}

export default function LandingEffectController() {
    const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        function resize() {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        }

        window.addEventListener('resize', resize, { signal });
        resize();

        return () => controller.abort();
    }, []);

    return (
        <Canvas
            className="absolute left-0 top-0 h-full w-full backdrop-blur-[1vmax]"
            gl={canvas => {
                let renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: "default" });
                renderer.toneMapping = THREE.NoToneMapping;
                renderer.setSize(windowSize.width, windowSize.height);

                return renderer;
            }}
            camera={{ fov: 60, near: 1, far: 1000, position: [0, 1, 0], rotation: [Math.PI / 2, 0, 0], aspect: windowSize.width / windowSize.height }}
        >
            <StarPointCloud />
        </Canvas>
    );
}