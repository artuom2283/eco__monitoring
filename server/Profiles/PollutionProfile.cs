using AutoMapper;
using server.DTO;
using server.Entities;

namespace server.Profiles;

public class PollutionProfile : Profile
{
    public PollutionProfile()
    {
        CreateMap<PollutionDto, Pollution>();
        CreateMap<Pollution, PollutionDto>();
    }
}