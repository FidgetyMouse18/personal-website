import {noiseSettingsRidgid, noiseSettingsSimple} from "./NoiseSettings"

interface layerSetting {
    useFirstAsMask: boolean;
    noiseSettings: noiseSettingsSimple | noiseSettingsRidgid
}

export interface ShapeSettings {
    planetRadius: number,
    noiseLayers: layerSetting[]
}