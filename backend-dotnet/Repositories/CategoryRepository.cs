using Microsoft.EntityFrameworkCore;
using ShoppingList.Infrastructure.Data;
using ShoppingList.Domain.Models;

namespace ShoppingList.Infrastructure.Repositories
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly ShoppingContext _context;

        public CategoryRepository(ShoppingContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Category>> GetAllAsync()
        {
            return await _context.Categories.ToListAsync();
        }
    }
}