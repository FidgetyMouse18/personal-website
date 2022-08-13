import { Vector3 } from "three";
import MinMax from "./MinMax";
import NoiseFactory from "./NoiseFactory";
import {ShapeSettings} from "./Types/ShapeSettings"



class ShapeGenerator {
  elevationMinMax: MinMax = new MinMax();
  shapeSettings: ShapeSettings;
  constructor(shapeSettings: ShapeSettings) {
    this.shapeSettings = shapeSettings;
  }
  CalculatePointOnPlanet(spherePoint: Vector3): Vector3 {
    let elevation = 0;
    let firstLayerVal = 0;
    if (this.shapeSettings.noiseLayers.length > 0) {
      firstLayerVal = NoiseFactory.GetNoiseFilter(
        this.shapeSettings.noiseLayers[0].noiseSettings
      ).Evaluate(spherePoint);
      elevation = firstLayerVal;
    }
    for (let i = 1; i < this.shapeSettings.noiseLayers.length; i++) {
      let mask = this.shapeSettings.noiseLayers[i].useFirstAsMask
        ? firstLayerVal
        : 1;
      elevation +=
        NoiseFactory.GetNoiseFilter(
          this.shapeSettings.noiseLayers[i].noiseSettings
        ).Evaluate(spherePoint) * mask;
}
    elevation = this.shapeSettings.planetRadius * (1 + elevation);
    this.elevationMinMax.AddValue(elevation);
    let spherePointDupe = new Vector3().copy(spherePoint);
    spherePointDupe.multiplyScalar(elevation);
    return spherePointDupe;
  }
}

export default ShapeGenerator;
