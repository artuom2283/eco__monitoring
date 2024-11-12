using AutoMapper;
using server.DTOs;
using server.Entities;

namespace server.Profiles;

public class ReportProfile : Profile
{
    public ReportProfile()
    {
        CreateMap<Report, UpdateReportDto>().ReverseMap();
        CreateMap<Report, FullReportDto>().ReverseMap();
        CreateMap<Report, AddReportDto>().ReverseMap();
    }
}