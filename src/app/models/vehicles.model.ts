export type TeslaModel = "S" | "3" | "X" | "Y" | "C";
export type TeslaColor = "blue" | "black" | "grey" | "white" | "red";

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