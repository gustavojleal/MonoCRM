using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.DTOs;
using Server.Models;

namespace Server.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class DealProductsController : ControllerBase
  {
    private readonly CrmDbContext _context;

    public DealProductsController(CrmDbContext context)
    {
      _context = context;
    }

    // GET: api/DealProducts
    [HttpGet]
    public async Task<ActionResult<IEnumerable<DealProduct>>> GetDealProducts()
    {
      var dealProducts = await _context.DealProducts.ToListAsync();
      return Ok(dealProducts);
    }

    // GET: api/DealProducts/5
    [HttpGet("{id}")]
    public async Task<ActionResult<DealProduct>> GetDealProduct(int id)
    {
      var dealProduct = await _context.DealProducts.FindAsync(id);

      if (dealProduct == null)
      {
        return NotFound();
      }

      return Ok(dealProduct);
    }

    // POST: api/DealProducts
    [HttpPost]
    public async Task<ActionResult<DealProduct>> CreateDealProduct(CreateDealProductDto createDealProductDto)
    {
      var dealProduct = new DealProduct
      {
        DealId = createDealProductDto.DealId,
        ProductId = createDealProductDto.ProductId,
        Quantity = createDealProductDto.Quantity,
        UnitPrice = createDealProductDto.UnitPrice,
        Discount = createDealProductDto.Discount
      };

      _context.DealProducts.Add(dealProduct);
      await _context.SaveChangesAsync();

      return CreatedAtAction(nameof(GetDealProduct), new { id = dealProduct.Id }, dealProduct);
    }

    // PUT: api/DealProducts/5
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateDealProduct(int id, UpdateDealProductDto updateDealProductDto)
    {
      var dealProduct = await _context.DealProducts.FindAsync(id);

      if (dealProduct == null)
      {
        return NotFound();
      }

      dealProduct.DealId = updateDealProductDto.DealId;
      dealProduct.ProductId = updateDealProductDto.ProductId;
      dealProduct.Quantity = updateDealProductDto.Quantity;
      dealProduct.UnitPrice = updateDealProductDto.UnitPrice;
      dealProduct.Discount = updateDealProductDto.Discount;

      try
      {
        await _context.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (!DealProductExists(id))
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

    // DELETE: api/DealProducts/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteDealProduct(int id)
    {
      var dealProduct = await _context.DealProducts.FindAsync(id);
      if (dealProduct == null)
      {
        return NotFound();
      }

      _context.DealProducts.Remove(dealProduct);
      await _context.SaveChangesAsync();

      return NoContent();
    }

    private bool DealProductExists(int id)
    {
      return _context.DealProducts.Any(e => e.Id == id);
    }
  }
}
