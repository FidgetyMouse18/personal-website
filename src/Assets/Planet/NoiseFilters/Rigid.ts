import { Vector3 } from "three";
import BaseNoise from "./Base";
import { createNoise3D, NoiseFunction3D } from "simplex-noise";
import alea from "alea";

interface noiseSettings {
    type: string;
    strength: number;
    baseRoughness: number;
    roughness: number;
    octaves: number;
    persistance: number;
    minValue: number;
    centre: { x: number; y: number; z: number };
    weightMultiplier: number;
  }

class RigidNoise extends BaseNoise {
    settings: noiseSettings = {
        type: "simple",
        strength: 1,
        baseRoughness: 1,
        roughness: 1,
        octaves: 1,
        persistance: 1,
        minValue: 1,
        centre: { x: 0, y: 0, z: 0 },
        weightMultiplier: 1
      };
      noise: NoiseFunction3D = createNoise3D(alea(Date.now()));
    
      SetSettings(settings: noiseSettings) {
        this.settings = settings;
      }
    
      Evaluate(spherePoint: Vector3): number {
        let noiseValue = 0;
        let frequency = this.settings.baseRoughness;
        let amplitude = 1;
        let weight = 1;
    
        for (let i = 0; i < this.settings.octaves; i++) {
          let v = this.noise(
            spherePoint.x * frequency + this.settings.centre.x,
            spherePoint.y * frequency + this.settings.centre.y,
            spherePoint.z * frequency + this.settings.centre.z
          );
          v *= v;
          v *= weight
          weight = Math.min(Math.max(v * this.settings.weightMultiplier, 0), 1);

          noiseValue += v * amplitude;
          frequency *= this.settings.roughness;
          amplitude *= this.settings.persistance;
        }
        noiseValue = Math.max(0, noiseValue - this.settings.minValue);
      return noiseValue * this.settings.strength;
      }
}

export default RigidNoise;