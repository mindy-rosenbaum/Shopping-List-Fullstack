using AutoMapper;
using ShoppingList.Api.DTOs;
using ShoppingList.Domain.Models;

namespace ShoppingList.Api.Mapping
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Category, CategoryDTO>();
            CreateMap<Product, ProductDTO>();
        }
    }
}