using AutoMapper;
using server.DTOs;
using server.Entities;

namespace server.Profiles;

public class ReportProfile : Profile
{
    public ReportProfile()
    {
        CreateMap<Report, ReportDto>();
        CreateMap<ReportDto, Report>();
        CreateMap<FullReportDto, Report>();
        CreateMap<Report, FullReportDto>();
    }
}