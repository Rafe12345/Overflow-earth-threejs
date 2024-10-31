import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
const controls = new OrbitControls( camera, renderer.domElement );
camera.position.set( 0, 0, 33 );
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 25;
controls.maxDistance = 60;
controls.update();
document.body.appendChild(renderer.domElement);
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('world.topo.bathy.200412.3x5400x2700.jpg');
const geometry = new THREE.SphereGeometry(15,50,25);
const material = new THREE.MeshStandardMaterial();
material.map = texture;
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere);
const light = new THREE.HemisphereLight( 0xffffff, 0x000000, 4 );
light.position.set(0,1,0);
scene.add( light );
function animate() {
	sphere.rotation.y += 0.005;
	sphere.rotation.x += 0.001;
	controls.update()
	renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );