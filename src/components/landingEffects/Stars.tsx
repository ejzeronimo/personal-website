import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { CameraControls, OrbitControls, PerspectiveCamera, PointMaterial, Points } from '@react-three/drei';
import * as THREE from 'three';

const pointCount = 12000;
const boxSize = 600;

const points = Array.from({ length: pointCount }, () => new THREE.Vector3(Math.random() * boxSize - (boxSize / 2), Math.random() * boxSize - (boxSize / 2), Math.random() * boxSize - (boxSize / 2)));

const velocities = Array.from({ length: pointCount }, () => 0)
const accelerations = Array.from({ length: pointCount }, () => Math.random() * (.001 - .0005) + .0005);

function StarPointCloud() {
    const pointRef = useRef<THREE.Points>(null!);

    useFrame((state, delta, xrFrame) => {
        if (pointRef.current) {
            const starPoints = pointRef.current;
            const positionAttribute = starPoints.geometry.getAttribute('position');

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

            starPoints.rotation.y += 0.001;
        }
    });

    let foo = points.map((vec) => {
        return vec.x, vec.y, vec.z
    });

    return (
        <Points positions={new Float32Array(foo)} ref={pointRef}>
            <pointsMaterial
                color={new THREE.Color(0xffffff)}
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
            className="absolute left-0 top-0 z-[2] h-full w-full"
            gl={canvas => {
                let foo = new THREE.WebGLRenderer({ canvas, alpha: true });
                foo.setSize(window.innerWidth, window.innerHeight);

                return foo;
            }}>
            <PerspectiveCamera makeDefault aspect={windowSize.width / windowSize.height} position={[0, 0, 1]} rotation={[Math.PI / 2, 0, 0]} fov={60} near={1} far={1000} />
            <StarPointCloud />
            {/* <CameraControls /> */}
        </Canvas>
    );
}