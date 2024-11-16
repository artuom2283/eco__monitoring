export interface PollutionDto {
    id: number;
    name: string;
    massFlowRate: number;
    emissionsLimit: number;
    dangerClass: number;
    specificEmissions : number;
    hazardClassCoefficient : number;
    hazardCoefficient : number;
}