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
import {ShapeSettings} from "./Types/ShapeSettings"
import NoiseFactory from "./NoiseFactory";

class Planet {
  scene: Scene;
  shapeGenerator: ShapeGenerator;
  mesh: Mesh;
  resolution: number;
  shapeSettings: ShapeSettings;

  constructor(scene: Scene, shapeSettings: ShapeSettings, resolution: number) {
    this.scene = scene;
    this.shapeGenerator = new ShapeGenerator(shapeSettings);
    this.mesh = new Mesh();
    this.resolution = resolution;
    this.shapeSettings = shapeSettings;

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

  GetPlanetName(): string {
    return this.mesh.name;
  }

  ChangeSettings(shapeSettings: ShapeSettings) {
    this.shapeGenerator = new ShapeGenerator(shapeSettings);
    console.log("Settings changed")
  }

  ResetNoise() {
    NoiseFactory.ResetNoise();
  }

  ChangeResolution(resolution: number) {
    this.resolution = resolution;
  }

  Initialize() {
    console.log("Building Planet")
    var sphereVerticesArray = [];
    var sphereNormsArray = [];
    let sphere = new SphereGeometry(1, this.resolution, this.resolution);
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
        water: {value : new Vector3(this.shapeSettings.colors.water.r / 255.0, this.shapeSettings.colors.water.g / 255.0, this.shapeSettings.colors.water.b / 255.0)},
        sand: {value : new Vector3(this.shapeSettings.colors.sand.r / 255.0, this.shapeSettings.colors.sand.g / 255.0, this.shapeSettings.colors.sand.b / 255.0)},
        grass: {value : new Vector3(this.shapeSettings.colors.grass.r / 255.0, this.shapeSettings.colors.grass.g / 255.0, this.shapeSettings.colors.grass.b / 255.0)},
        lowMt: {value : new Vector3(this.shapeSettings.colors.lowMt.r / 255.0, this.shapeSettings.colors.lowMt.g / 255.0, this.shapeSettings.colors.lowMt.b / 255.0)},
        midMt: {value : new Vector3(this.shapeSettings.colors.midMt.r / 255.0, this.shapeSettings.colors.midMt.g / 255.0, this.shapeSettings.colors.midMt.b / 255.0)},
        upperMt: {value : new Vector3(this.shapeSettings.colors.upperMt.r / 255.0, this.shapeSettings.colors.upperMt.g / 255.0, this.shapeSettings.colors.upperMt.b / 255.0)},
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
