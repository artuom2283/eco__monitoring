export interface ReportDto{
    id: number;
    pollutionId: number;
    industrialFacilityId: number;
    year: number;
    volume: number;
    taxRate: number;
    taxType: string;
}

export interface FullReportDto{
    id: number;
    pollutionName: string;
    facilityName: string;
    year: number;
    volume: number;
    massFlowRate: number;
    emissionsLimit: number;
    taxRate: number;
    taxType: string;
    taxAmount: number;
}