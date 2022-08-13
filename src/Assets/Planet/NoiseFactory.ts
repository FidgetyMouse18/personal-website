import { SimpleNoise, RigidNoise, BaseNoise, EmptyNoise } from "./NoiseFilters";
import {
  noiseSettingsRidgid,
  noiseSettingsSimple,
} from "./Types/NoiseSettings";

class NoiseFactory {
  static simpleNoise: SimpleNoise = new SimpleNoise();
  static rigidNoise: RigidNoise = new RigidNoise();
  static emptyNoise: EmptyNoise = new EmptyNoise();

  static GetNoiseFilter(
    settings: noiseSettingsSimple | noiseSettingsRidgid
  ): BaseNoise {
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

  static ResetNoise() {
    this.rigidNoise = new RigidNoise();
    this.simpleNoise = new SimpleNoise();
  }
}

export default NoiseFactory;
