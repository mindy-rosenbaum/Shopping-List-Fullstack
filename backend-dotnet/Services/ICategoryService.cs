using ShoppingList.Api.DTOs;

namespace ShoppingList.Api.Services
{
    public interface ICategoryService
    {
        Task<IEnumerable<CategoryDTO>> GetAllCategoriesAsync();
    }
}