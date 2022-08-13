export interface noiseSettingsRidgid extends noiseSettingsSimple {
  weightMultiplier: number;
}

export interface noiseSettingsSimple {
  type: string;
  strength: number;
  baseRoughness: number;
  roughness: number;
  octaves: number;
  persistance: number;
  minValue: number;
  centre: { x: number; y: number; z: number };
}
