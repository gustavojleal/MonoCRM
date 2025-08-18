using AutoMapper;
using Server.Models;
using Server.DTOs; 

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Contact, ContactResponseDto>();
        CreateMap<CreateContactDto, Contact>();
    }
}