export interface ReportDto{
    id: number;
    pollutionId: number;
    facilityId: number;
    year: number;
    volume: number;
    waterTax: number;
    airTax: number;
}

export interface FullReportDto{
    id: number;
    pollutionName: string;
    facilityName: string;
    year: number;
    volume: number;
    massFlowRate: number;
    emissionsLimit: number;
    waterTax: number;
    airTax: number;
    totalTax: number;
}