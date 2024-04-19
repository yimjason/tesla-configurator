export type TeslaModel = "3" | "C" | "S" | "X" | "Y";
export type TeslaColor = "black" | "blue" | "grey" | "red" | "white";

export interface Model {
    code: TeslaModel;
    description: string;
    colors: Color[];
}

export interface Color {
    code: TeslaColor,
    description: string;
    price: number;
}

export interface TeslaOption {
    configs: TeslaConfig[];
    towHitch: boolean;
    yoke: boolean;
}

export interface TeslaConfig { 
    id: number;
    description: string;
    range: number;
    speed: number;
    price: number; 
}

export interface SummaryData {
    models: Model[];
    modelCode: string | null;
    colorCode: string | null;
    option: TeslaOption;
    configId: number | null;
    towHitchOption: boolean;
    yokeOption: boolean;
}
