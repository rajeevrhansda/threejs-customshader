import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import vShader from './vertex.glsl.js'
import fShader from './fragment.glsl.js'

// import vShader from './shader/frogVertex.glsl'
// import fShader from './shader/frogVertex.glsl'

const CustomShader = () => {

    const mount = useRef(null);



    useEffect(() => {
        const scene = new THREE.Scene();

        const fov = 75;
        const aspect = window.innerWidth / window.innerHeight;
        const near = 1.0;
        const far = 1000.0;
        const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        camera.position.set(0, -30, 30);

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
        });


        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;


        let light = new THREE.DirectionalLight(0xFFFFFF, 1.0);
        light.position.set(20, 100, 10);
        light.target.position.set(0, 0, 0);

        light.castShadow = true;
        light.shadow.bias = -0.001;
        light.shadow.mapSize.width = 2048;
        light.shadow.mapSize.height = 2048;
        light.shadow.camera.near = 0.1;
        light.shadow.camera.far = 500.0;
        light.shadow.camera.near = 0.5;
        light.shadow.camera.far = 500.0;
        light.shadow.camera.left = 100;
        light.shadow.camera.right = -100;
        light.shadow.camera.top = 100;
        light.shadow.camera.bottom = -100;

        scene.add(light);




        const plane = new THREE.Mesh(
            new THREE.PlaneGeometry(100, 100, 10, 10),
            new THREE.MeshStandardMaterial({
                color: 0xFFFFFF,
            }));
            plane.position.set(0,-15,0)
        plane.castShadow = false;
        plane.receiveShadow = true;
        plane.rotation.x = -Math.PI / 2;
        scene.add(plane);



        


        
        

        const s2 = new THREE.Mesh(
            new THREE.SphereGeometry(10, 128, 128),
            new THREE.ShaderMaterial({
                vertexShader: vShader,
                fragmentShader: fShader,
            }));
        s2.castShadow = true;
        s2.receiveShadow = true;
        scene.add(s2);










        renderer.setClearColor('#000000')


        renderer.setSize(window.innerWidth, window.innerHeight);

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }, false);

        function RAF() {
            requestAnimationFrame(() => {
                renderer.render(scene, camera);
                RAF();
            });
        }
        RAF();






        mount.current.appendChild(renderer.domElement);

        const controls = new OrbitControls(
            camera, renderer.domElement);
        controls.target.set(0, 20, 0);
        controls.update();
        renderer.render(scene, camera);







        return () => {
            mount.current.removeChild(renderer.domElement)
        }
    }, []);





    return (
        <div
            style={{ position: "fixed", top: "0", left: "0" }}
            ref={mount}></div>
    )
}

export default CustomShader;