import { noiseSettingsRidgid, noiseSettingsSimple } from "./NoiseSettings";

interface layerSetting {
  useFirstAsMask: boolean;
  noiseSettings: noiseSettingsSimple | noiseSettingsRidgid;
}

export interface ShapeSettings {
  planetRadius: number;
  colors: {
    water: { r: number; g: number; b: number };
    sand: { r: number; g: number; b: number };
    grass: { r: number; g: number; b: number };
    lowMt: { r: number; g: number; b: number };
    midMt: { r: number; g: number; b: number };
    upperMt: { r: number; g: number; b: number };
  };
  noiseLayers: layerSetting[];
}
