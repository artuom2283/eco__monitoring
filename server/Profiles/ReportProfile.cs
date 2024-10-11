using AutoMapper;
using server.DTOs;
using server.Entities;

namespace server.Profiles;

public class ReportProfile : Profile
{
    public ReportProfile()
    {
        CreateMap<Report, UpdateReportDto>();
        CreateMap<UpdateReportDto, Report>();
        CreateMap<FullReportDto, Report>();
        CreateMap<Report, FullReportDto>();
        CreateMap<Report, AddReportDto>();
        CreateMap<AddReportDto, Report>();
    }
}