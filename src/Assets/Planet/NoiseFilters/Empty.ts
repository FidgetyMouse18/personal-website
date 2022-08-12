import { Vector3 } from "three";
import BaseNoise from "./Base";

class EmptyNoise extends BaseNoise {
    Evaluate(spherePoint: Vector3): number {
        return 0;
    }
}

export default EmptyNoise;