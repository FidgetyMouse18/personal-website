import { Vector3 } from "three";
import MinMax from "./MinMax";
import NoiseFactory from "./NoiseFactory";

const ShapeSettings = require("./Configs/ShapeSettings.json");

class ShapeGenerator {
  elevationMinMax: MinMax = new MinMax();
  CalculatePointOnPlanet(spherePoint: Vector3): Vector3 {
    let elevation = 0;
    let firstLayerVal = 0;
    if (ShapeSettings.noiseLayers.length > 0) {
      firstLayerVal = NoiseFactory.GetNoiseFilter(
        ShapeSettings.noiseLayers[0].noiseSettings
      ).Evaluate(spherePoint);
      elevation = firstLayerVal;
    }
    for (let i = 1; i < ShapeSettings.noiseLayers.length; i++) {
      let mask = ShapeSettings.noiseLayers[i].useFirstAsMask
        ? firstLayerVal
        : 1;
      elevation +=
        NoiseFactory.GetNoiseFilter(
          ShapeSettings.noiseLayers[i].noiseSettings
        ).Evaluate(spherePoint) * mask;
}
    elevation = ShapeSettings.planetRadius * (1 + elevation);
    this.elevationMinMax.AddValue(elevation);
    let spherePointDupe = new Vector3().copy(spherePoint);
    spherePointDupe.multiplyScalar(elevation);
    return spherePointDupe;
  }
}

export default ShapeGenerator;
