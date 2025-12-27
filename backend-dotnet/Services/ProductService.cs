using AutoMapper;
using ShoppingList.Api.DTOs;
using ShoppingList.Infrastructure.Repositories;

namespace ShoppingList.Api.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;

        public ProductService(IProductRepository productRepository, IMapper mapper)
        {
            _productRepository = productRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ProductDTO>> GetProductsAsync(int? categoryId = null)
        {
            var products = await _productRepository.GetProductsAsync(categoryId);
            return _mapper.Map<IEnumerable<ProductDTO>>(products);
        }
    }
}