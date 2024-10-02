using AutoMapper;
using server.DTOs;
using server.Entities;

namespace server.Profiles;

public class ReportProfile : Profile
{
    public ReportProfile()
    {
        CreateMap<Report, ReportDto>()
            .ForMember(dest => dest.FacilityName, opt => opt.MapFrom(src => src.IndustrialFacility.Name))
            .ForMember(dest => dest.PollutionName, opt => opt.MapFrom(src => src.Pollution.Name));
        
        CreateMap<ReportDto, Report>();
    }
}