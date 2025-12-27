using Microsoft.EntityFrameworkCore;
using ShoppingList.Infrastructure.Data;
using ShoppingList.Domain.Models;

namespace ShoppingList.Infrastructure.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly ShoppingContext _context;

        public ProductRepository(ShoppingContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Product>> GetProductsAsync(int? categoryId = null)
        {
            var query = _context.Products.AsQueryable();

            if (categoryId.HasValue)
            {
                query = query.Where(p => p.CategoryId == categoryId.Value);
            }

            return await query.ToListAsync();
        }
    }
}