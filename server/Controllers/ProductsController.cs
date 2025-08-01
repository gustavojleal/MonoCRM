using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.DTOs;
using Server.Models;

namespace Server.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class ProductsController : ControllerBase
  {
    private readonly AppDbContext _context;

    public ProductsController(AppDbContext context)
    {
      _context = context;
    }

    // GET: api/Products
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
    {
      var products = await _context.Products.ToListAsync();
      return Ok(products);
    }

    // GET: api/Products/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> GetProduct(int id)
    {
      var product = await _context.Products.FindAsync(id);

      if (product == null)
      {
        return NotFound();
      }

      return Ok(product);
    }

    // POST: api/Products
    [HttpPost]
    public async Task<ActionResult<Product>> CreateProduct(CreateProductDto createProductDto)
    {
      var product = new Product
      {
        Name = createProductDto.Name,
        Code = createProductDto.Code,
        Description = createProductDto.Description,
        Category = createProductDto.Category,
        Price = createProductDto.Price,
        Cost = createProductDto.Cost,
        Unit = createProductDto.Unit,
        IsActive = createProductDto.IsActive
      };

      _context.Products.Add(product);
      await _context.SaveChangesAsync();

      return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
    }

    // PUT: api/Products/5
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateProduct(int id, UpdateProductDto updateProductDto)
    {
      var product = await _context.Products.FindAsync(id);

      if (product == null)
      {
        return NotFound();
      }

      product.Name = updateProductDto.Name;
      product.Code = updateProductDto.Code;
      product.Description = updateProductDto.Description;
      product.Category = updateProductDto.Category;
      product.Price = updateProductDto.Price;
      product.Cost = updateProductDto.Cost;
      product.Unit = updateProductDto.Unit;
      product.IsActive = updateProductDto.IsActive;

      try
      {
        await _context.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (!ProductExists(id))
        {
          return NotFound();
        }
        else
        {
          throw;
        }
      }

      return NoContent();
    }

    // DELETE: api/Products/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProduct(int id)
    {
      var product = await _context.Products.FindAsync(id);
      if (product == null)
      {
        return NotFound();
      }

      _context.Products.Remove(product);
      await _context.SaveChangesAsync();

      return NoContent();
    }

    private bool ProductExists(int id)
    {
      return _context.Products.Any(e => e.Id == id);
    }
  }
}
