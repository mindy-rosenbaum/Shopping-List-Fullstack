using ShoppingList.Domain.Models;

namespace ShoppingList.Infrastructure.Repositories
{
    public interface IProductRepository
    {
        Task<IEnumerable<Product>> GetProductsAsync(int? categoryId = null);
    }
}