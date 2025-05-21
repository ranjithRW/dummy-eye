import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

let object;
let controls;
let objToRender = "eye";

const loader = new GLTFLoader();
loader.load(
    `models/${objToRender}/eye.glb`, // Ensure this path is correct and file exists
    function (glb) {
        object = glb.scene;
        scene.add(object);
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        console.error('Error loading model:', error);
    }
);

let mouseX = 0;
let mouseY = 0;

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight); // ✅ Corrected here
document.getElementById("container3D").appendChild(renderer.domElement);

// Adjust camera position depending on model
camera.position.z = objToRender === "dino" ? 25 : 5;

// Lights
const topLight = new THREE.DirectionalLight(0xffffff, 1);
topLight.position.set(500, 500, 500);
topLight.castShadow = true;
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0x333333, objToRender === "dino" ? 5 : 1);
scene.add(ambientLight);

// Controls for "dino" model
if (objToRender === "dino") {
    controls = new OrbitControls(camera, renderer.domElement);
}

function animate() {
    requestAnimationFrame(animate);

    if (object && objToRender === "eye") {
        object.rotation.y = -3 + mouseX / window.innerWidth * 6;
        object.rotation.x = -1.2 + mouseY / window.innerHeight * 2.4;
    }

    renderer.render(scene, camera);
}

window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

document.onmousemove = (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
};

animate();
