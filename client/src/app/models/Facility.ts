export interface FullIndustrialFacilityDto {
    id: number;
    pollutionId: number;
    facilityName: string;
    pollutionName: string;
    volume: number;
    tax: number;
    massFlowRate: number;
    emissionsLimit: number;
}

export interface IndustrialFacilityDto {
    id: number;
    name: string;
}