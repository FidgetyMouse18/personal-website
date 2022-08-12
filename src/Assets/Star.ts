import { SphereGeometry, MeshStandardMaterial, Mesh, MathUtils } from "three";
const sphereGeometry = new SphereGeometry(0.25, 24, 24);
//const torusMaterial = new MeshBasicMaterial( {color: 0xFF6347, wireframe: true} )
const sphereMaterial = new MeshStandardMaterial({ color: 0xffffff });
const star = new Mesh(sphereGeometry, sphereMaterial);

export default star;

const createRandStar = (): Mesh<SphereGeometry, MeshStandardMaterial> => {
  const [x, y, z] = Array(3)
    .fill(0)
    .map(() => MathUtils.randFloatSpread(1000));
  const starR = new Mesh(sphereGeometry, sphereMaterial);
  starR.position.set(x, y, z);
  return starR;
};

export { createRandStar };
