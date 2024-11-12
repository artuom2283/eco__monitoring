using AutoMapper;
using server.DTOs;
using server.Entities;

namespace server.Profiles;

public class RiskProfile : Profile
{
    public RiskProfile()
    {
        CreateMap<Risk, RiskDto>().ReverseMap();
    }
}