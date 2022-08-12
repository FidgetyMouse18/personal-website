import { TorusGeometry, MeshStandardMaterial, Mesh } from "three";
const torusGeometry = new TorusGeometry(10, 3, 16, 100);
//const torusMaterial = new MeshBasicMaterial( {color: 0xFF6347, wireframe: true} )
const torusMaterial = new MeshStandardMaterial({ color: 0xff6347 });
const torus = new Mesh(torusGeometry, torusMaterial);

export default torus;
