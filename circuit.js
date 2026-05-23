import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.z = 5;
camera.rotation.order = "YXZ";
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let au = false, ad = false, al = false, ar = false;
let w = false, s = false, a = false, d = false;
let space = false, shift = false;
window.addEventListener("keydown", (event) => {
    if(event.key === "ArrowUp") {au = true;}
    if(event.key === "ArrowDown") {ad = true;}
    if(event.key === "ArrowLeft") {al = true;}
    if(event.key === "ArrowRight") {ar = true;}
    if(event.key === "w") {w = true;}
    if(event.key === "s") {s = true;}
    if(event.key === "a") {a = true;}
    if(event.key === "d") {d = true;}
    if(event.key === " ") {space = true;}
    if(event.key === "Shift") {shift = true;}
});
window.addEventListener("keyup", (event) => {
    if(event.key === "ArrowUp") {au = false;}
    if(event.key === "ArrowDown") {ad = false;}
    if(event.key === "ArrowLeft") {al = false;}
    if(event.key === "ArrowRight") {ar = false;}
    if(event.key === "w") {w = false;}
    if(event.key === "s") {s = false;}
    if(event.key === "a") {a = false;}
    if(event.key === "d") {d = false;}
    if(event.key === " ") {space = false}
    if(event.key === "Shift") {shift = false}
})


const box_g = new THREE.BoxGeometry(2,2,2);
const box_m = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: false
});
const cube = new THREE.Mesh(box_g,box_m);
scene.add(cube);

const direction = new THREE.Vector3();
const right = new THREE.Vector3();
let rspeed = 0.03, mspeed = 0.3;
function animate() {
    requestAnimationFrame(animate);
    camera.getWorldDirection(direction);
    right.crossVectors(direction, camera.up).normalize();
    if(au && camera.rotation.x < Math.PI / 2) {camera.rotation.x += rspeed}
    if(ad && camera.rotation.x > -Math.PI / 2) {camera.rotation.x -= rspeed}
    if(al) {camera.rotation.y += rspeed}
    if(ar) {camera.rotation.y -= rspeed}
    if(w) {camera.position.add(direction.clone().multiplyScalar(mspeed));}
    if(s) {camera.position.add(direction.clone().multiplyScalar(-mspeed));}
    if(a) {camera.position.add(right.clone().multiplyScalar(-mspeed));}
    if(d) {camera.position.add(right.clone().multiplyScalar(mspeed));}
    if(space) {camera.position.add(camera.up.clone().multiplyScalar(mspeed))}
    if(shift) {camera.position.add(camera.up.clone().multiplyScalar(-mspeed))}
    renderer.render(scene, camera);
}
animate();

window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
