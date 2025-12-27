using Microsoft.AspNetCore.Mvc;
using ShoppingList.Api.DTOs;
using ShoppingList.Api.Services;

namespace ShoppingList.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ProductsController : ControllerBase
{
    private readonly IProductService _productService;

    public ProductsController(IProductService productService)
    {
        _productService = productService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ProductDTO>>> GetProducts([FromQuery] int? categoryId = null)
    {
        var products = await _productService.GetProductsAsync(categoryId);
        return Ok(products);
    }
}