import {
  Mesh,
  Vector3,
  Scene,
  SphereGeometry,
  Float32BufferAttribute,
  ShaderMaterial,
} from "three";
import ShapeGenerator from "./ShapeGenerator";
import { _FS, _VS } from "./Shaders/Planet";
class Planet {
  scene: Scene;
  shapeGenerator: ShapeGenerator;
  mesh: Mesh;
  constructor(scene: Scene) {
    this.scene = scene;
    this.shapeGenerator = new ShapeGenerator();
    this.mesh = new Mesh();
    this.Initialize();
  }

  RotateOnAxis(axis: Vector3, speed: number) {
    this.mesh.rotateOnAxis(axis, speed);
  }

  SetPos(x: number, y: number, z: number) {
    this.mesh.position.set(x,y,z);
  }
  GetPos(): Vector3 {
    return this.mesh.position;
  }

  Initialize() {
    var sphereVerticesArray = [];
    var sphereNormsArray = [];
    let resolution = 128;
    let sphere = new SphereGeometry(1, resolution, resolution);
    let sphereVerts = sphere.getAttribute("position").array;
    for (var i = 0; i < sphereVerts.length / 3; i++) {
      var vec = new Vector3(
        sphereVerts[i * 3],
        sphereVerts[i * 3 + 1],
        sphereVerts[i * 3 + 2]
      );
      let vecN = this.shapeGenerator.CalculatePointOnPlanet(vec);

      sphereVerticesArray.push(vecN.x, vecN.y, vecN.z);

      var mag = vecN.x * vecN.x + vecN.y * vecN.y + vecN.z * vecN.z;
      mag = Math.sqrt(mag);
      sphereNormsArray.push(vecN.x / mag, vecN.y / mag, vecN.z / mag);
    }

    sphere.setAttribute(
      "position",
      new Float32BufferAttribute(sphereVerticesArray, 3)
    );
    sphere.setAttribute(
      "normal",
      new Float32BufferAttribute(sphereNormsArray, 3)
    );
    sphere.computeVertexNormals();

    let shader = new ShaderMaterial({
      uniforms: {
        Min: { value: this.shapeGenerator.elevationMinMax.Min },
        Max: { value: this.shapeGenerator.elevationMinMax.Max },
      },
      vertexShader: _VS,
      fragmentShader: _FS,
    });

    const mesh = new Mesh(sphere, shader);
    this.scene.add(mesh);
    this.mesh = mesh;
  }
}

export default Planet;
