import { Component, ReactNode } from "react";
import "./css/App.css";
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  PointLight,
  AmbientLight,
  Vector3,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { createRandStar } from "./Assets/Star";
import Planet from "./Assets/Planet";
import {ShapeSettings} from "./Assets/Planet/Types/ShapeSettings"
import Moon from "./Assets/Moon";
import { randFloat, randInt } from "three/src/math/MathUtils";

const shapeSettings: ShapeSettings = require("./Assets/Planet/Configs/ShapeSettings.json");
const EarthMoon: ShapeSettings = require("./Assets/Moon/Configs/EarthMoon.json");

interface props {}

interface state {
  initialized: boolean;
}

class FancyBackground extends Component<props, state> {
  scene: Scene;
  camera: PerspectiveCamera;
  renderer: WebGLRenderer | null;
  controls: OrbitControls | null;
  planet: Planet | null;
  moon: Moon | null;
  orbitalAxis: number;
  constructor(props: any) {
    super(props);
    this.state = {
      initialized: false,
    };
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.renderer = null;
    this.controls = null;
    this.planet = null;
    this.moon = null;
    this.camera.position.setZ(30);
      this.orbitalAxis = randFloat(-1 * Math.PI, Math.PI)
    this.animate = this.animate.bind(this);
    this.moveCamera = this.moveCamera.bind(this);
  }

  addGeometries(): void {
    if (!this.renderer) return;

    const light = new PointLight(0xffffff);
    light.position.set(5, 5, 5);
    const ambientLight = new AmbientLight(0xffffff);


    this.scene.add(light, ambientLight);

    for (let i = 0; i < 5000; i++) {
      this.scene.add(createRandStar());
    }


    if(this.planet != null) return;
    this.planet = new Planet(this.scene, shapeSettings, 128);
    this.planet.SetPos(-10, 10, -70)
    this.moon = new Moon(this.scene, EarthMoon, 64, this.planet);
  }

  componentDidMount(): void {
    this.renderer = new WebGLRenderer({
      //@ts-ignore
      canvas: document.querySelector("#bg"),
    })

    if (!this.renderer || this.state.initialized) return;
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.addGeometries();
    this.animate();
    document.body.onscroll = this.moveCamera;
  }

  animate(): void {
    requestAnimationFrame(this.animate);

    this.planet?.RotateOnAxis(new Vector3(0.55,1,0.03), 0.0008);
    this.moon?.RotateOnAxis(new Vector3(0.55,1,0.03), 0.0008);
    this.moon?.OrbitAroundAxis(0.0002, 20, this.orbitalAxis);
    if (!this.renderer) return;
    this.renderer.render(this.scene, this.camera);
    if (!this.controls) return;
    this.controls.update();
  }

  moveCamera() {
      const t = document.body.getBoundingClientRect().top
      this.planet?.RotateOnAxis(new Vector3(0.55,1,0.03), t * -0.00008);
  }

  render(): ReactNode {
    return (
      <div>
        <canvas id="bg"></canvas>
      </div>
    );
  }
}

export default FancyBackground;
