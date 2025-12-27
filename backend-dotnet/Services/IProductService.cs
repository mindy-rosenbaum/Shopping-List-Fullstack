using ShoppingList.Api.DTOs;

namespace ShoppingList.Api.Services
{
    public interface IProductService
    {
        Task<IEnumerable<ProductDTO>> GetProductsAsync(int? categoryId = null);
    }
}