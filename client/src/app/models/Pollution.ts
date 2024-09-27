export interface PollutionDto {
    id: number;
    industrialFacilityId: number;
    name: string;
    volume: number;
    massFlowRate: number;
    emissionsLimit: number;
    year: number;
}