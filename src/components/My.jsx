import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'


const My = () => {
    const mount = useRef(null);
    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        const renderer = new THREE.WebGLRenderer();

        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshStandardMaterial({ color: 0x32a852 });
        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(0, 2, 0);
        camera.position.set(0, 5, 0);
        scene.add(cube);
        const pointLight = new THREE.PointLight(0xffffff);
        pointLight.position.set(50, 50, 50);

        const ambientLight = new THREE.AmbientLight(0xffffff);

        const gridHelper = new THREE.GridHelper(100, 50);

        scene.add(ambientLight, pointLight, gridHelper);


        renderer.setClearColor('#000000')


        // const loader = new THREE.TextureLoader();
        // loader.crossOrigin = "";
        // loader.load('../images/space.jpg', function (texture) {
        //     scene.background = texture;
        // });

        // const jeffTexture = new THREE.TextureLoader().load('../images/jeff.png');
        // const jeff = new THREE.Mesh(
        //     new THREE.BoxGeometry(3,3,3),
        //     new THREE.MeshBasicMaterial({map: jeffTexture})
        // );
        // scene.add(jeff);

        renderer.setSize(window.innerWidth, window.innerHeight);
        mount.current.appendChild(renderer.domElement)

        const controls = new OrbitControls(camera, renderer.domElement);

        function animate() {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            cube.rotation.z += 0.01;
            controls.update();
            renderer.render(scene, camera);
        }
        animate();


        function addStar() {
            const geometry = new THREE.SphereGeometry(0.1);
            const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
            const star = new THREE.Mesh(geometry, material);

            const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

            star.position.set(x, y, z);
            scene.add(star);
        }
        Array(100).fill().forEach(addStar);


        return () => {
            mount.current.removeChild(renderer.domElement)

        }

    }, []);


    return (
        <div
        style={{position: "fixed", top: "0", left: "0"}} 
        ref={mount}></div>
    )
}

export default My