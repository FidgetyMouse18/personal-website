import { Vector3 } from "three";

abstract class BaseNoise {
  abstract Evaluate(spherePoint: Vector3): number;
}

export default BaseNoise;
