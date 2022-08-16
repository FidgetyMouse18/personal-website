import { Vector3 } from "three";
import { randFloat } from "three/src/math/MathUtils";

class SupportFunctions {

  static GetRandomTangent(vector: Vector3): Vector3 {
    vector.normalize();
    let tangent = new Vector3().crossVectors(
      vector,
      new Vector3(-1 * vector.z, vector.x, vector.y)
    );
    let biTangent = new Vector3().crossVectors(vector, tangent);
    let angle = randFloat(-1 * Math.PI, Math.PI);
    let returnVec = new Vector3()
      .add(tangent.multiplyScalar(Math.sin(angle)))
      .add(biTangent.multiplyScalar(Math.cos(angle)));
    return returnVec;
  }

}

export default SupportFunctions;
