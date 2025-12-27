using Microsoft.EntityFrameworkCore;
using ShoppingList.Domain.Models;

namespace ShoppingList.Infrastructure.Data;

public class ShoppingContext : DbContext
{
    public ShoppingContext(DbContextOptions<ShoppingContext> options) : base(options) { }
    public DbSet<Product> Products { get; set; }
    public DbSet<Category> Categories { get; set; }
}