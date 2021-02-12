using AutoMapper;
using FarmersSpecial.Entities;
using FarmersSpecial.Models.Users;

namespace FarmersSpecial.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, UserModel>();
            CreateMap<RegisterModel, User>();
        }
    }
}