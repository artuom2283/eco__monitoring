using AutoMapper;
using server.Entities;

namespace server.Profiles;

public class IndustrialFacilityProfile : Profile
{
    public IndustrialFacilityProfile()
    {
        CreateMap<IndustrialFacilityDto, IndustrialFacility>();
        CreateMap<IndustrialFacility, IndustrialFacilityDto>();
    }
}