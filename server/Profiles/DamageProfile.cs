using AutoMapper;
using server.DTOs;
using server.Entities;

namespace server.Profiles;

public class DamageProfile : Profile
{
    public DamageProfile()
    {
        CreateMap<Damage, DamageDto>().ReverseMap();
    }
}