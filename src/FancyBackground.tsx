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
import torus from "./Assets/Torus";
import { createRandStar } from "./Assets/Star";
import Planet from "./Assets/Planet";

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
  constructor(props: any) {
    super(props);
    this.state = {
      initialized: false,
    };
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.renderer = null;
    this.controls = null;
    this.planet = null;
    this.camera.position.setZ(30);

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
    this.planet = new Planet(this.scene);
    this.planet.SetPos(-10, 10, -30)
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

    torus.rotateX(0.003);
    torus.rotateY(0.0015);
    torus.rotateZ(0.003);
    this.planet?.RotateOnAxis(new Vector3(0.55,1,0.03), 0.0008);

    if (!this.renderer) return;
    this.renderer.render(this.scene, this.camera);
    if (!this.controls) return;
    this.controls.update();
  }

  moveCamera() {
      const t = document.body.getBoundingClientRect().top
      this.planet?.RotateOnAxis(new Vector3(0.55,1,0.03), t * -0.00008);
      //this.camera.position.z += t * -0.01;
      //this.camera.position.x += t * 0.005;
      //this.camera.position.y += t * -0.002;

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
