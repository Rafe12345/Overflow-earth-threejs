import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
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
const axesHelper = new THREE.AxesHelper( 1000 );
scene.add( axesHelper );
function stars(){
	let whd = Math.random() * (0.8- 0.1) + 0.1;
	let x = Math.random() * (500 - -500) + -500;
	let y = Math.random() * (400 - -150) +  -150;
	let z = Math.random() * (250 - - 200) + - 200;
	const geostars = new THREE.SphereGeometry(whd,44,22)
	const material_stars = new THREE.MeshBasicMaterial({
	})
	const stars = new THREE.Mesh(geostars,material_stars)
	stars.position.set(x,y,z)
	scene.add(stars)
}

for(let i = 0; i<5000; i++){
	stars()
}

function animate() {
	sphere.rotation.y += 0.005;
	sphere.rotation.x += 0.001;
	controls.update()
	renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );