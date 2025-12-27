using ShoppingList.Domain.Models;

namespace ShoppingList.Infrastructure.Repositories
{
    public interface ICategoryRepository
    {
        Task<IEnumerable<Category>> GetAllAsync();
    }
}