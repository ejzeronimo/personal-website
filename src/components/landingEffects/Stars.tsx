import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';

import starImage from "../../resources/star.png";

export default function LandingEffectController() {
    const selfRef = useRef(null);

    useEffect(() => {
        let scene = new THREE.Scene();
        let camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
        let renderer = new THREE.WebGLRenderer({ canvas: (selfRef.current! as HTMLCanvasElement), alpha: true });
        

        camera.position.z = 1;
        camera.rotation.x = Math.PI / 2;

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

        let starBufferGeometry = new THREE.BufferGeometry().setFromPoints(points);

        let starMaterial = new THREE.PointsMaterial({
            size: 0.02,
            sizeAttenuation: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        });

        let stars = new THREE.Points(starBufferGeometry, starMaterial);
        scene.add(stars);

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

            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        }

        function resize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        animate();
        resize();
        window.addEventListener('resize', resize);

        return () => {
            window.removeEventListener('resize', resize);
        };
    }, []);

    return <canvas className="absolute left-0 top-0 z-[2] h-full w-full backdrop-blur-sm" ref={selfRef}></canvas>
}