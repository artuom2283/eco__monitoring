using AutoMapper;
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