import { SimpleNoise, RigidNoise, BaseNoise, EmptyNoise } from "./NoiseFilters";

interface noiseSettingsRidgid {
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

interface noiseSettingsSimple {
  type: string;
  strength: number;
  baseRoughness: number;
  roughness: number;
  octaves: number;
  persistance: number;
  minValue: number;
  centre: { x: number; y: number; z: number };
}

class NoiseFactory {
  static simpleNoise: SimpleNoise = new SimpleNoise();
  static rigidNoise: RigidNoise = new RigidNoise();
  static emptyNoise: EmptyNoise = new EmptyNoise();

  static GetNoiseFilter(settings: noiseSettingsSimple | noiseSettingsRidgid): BaseNoise {
    switch (settings.type.toLowerCase()) {
      case "simple":
        this.simpleNoise.SetSettings(settings);
        return this.simpleNoise;
      case "rigid":
        //@ts-ignore
        this.rigidNoise.SetSettings(settings);
        return this.rigidNoise;
      default:
        return this.emptyNoise;
    }
  }
}
export default NoiseFactory;
