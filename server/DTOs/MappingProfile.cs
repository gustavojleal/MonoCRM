using AutoMapper;
using Server.Models;
using Server.DTOs; 

public class MappingProfile : Profile
{
  public MappingProfile()
  {
    CreateMap<CreateContactDto, Contact>();
    CreateMap<ContactHistory, ContactHistoryResponseDto>();
    CreateMap<CreateContactHistoryDto, ContactHistory>();
    CreateMap<Contact, ContactResponseDto>()
    .ForMember(dest => dest.Histories, opt => opt.MapFrom(src => src.ContactHistories));
    CreateMap<UpdateContactDto, Contact>();
    CreateMap<UpdateContactHistoryDto, ContactHistory>();
  }
}