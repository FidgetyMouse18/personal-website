import { Scene, Vector3 } from "three";
import Planet from "../Planet";
import { ShapeSettings } from "../Planet/Types/ShapeSettings";
import SupportFunctions from "../SupportFunctions";

class Moon extends Planet {
  orbitingPlanet: Planet;
  constructor(
    scene: Scene,
    shapeSettings: ShapeSettings,
    resolution: number,
    orbitingPlanet: Planet,
  ) {
    super(scene, shapeSettings, resolution);
    this.orbitingPlanet = orbitingPlanet;
  }

  OrbitAroundAxis(speed: number, distance: number, angle: number) {
   let planetPos = this.orbitingPlanet.GetPos();
   let date = Date.now()
   let temp = this.orbitingPlanet.GetPos().clone();
   let pos = new Vector3(planetPos.x + Math.cos(speed * date) * distance, planetPos.y, planetPos.z + Math.sin(speed * date) * distance).applyAxisAngle(temp.normalize(), angle)
   this.mesh.position.set(pos.x, pos.y, pos.z);
  }
}

export default Moon;
