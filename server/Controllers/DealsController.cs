using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.DTOs;
using Server.Models;

namespace Server.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class DealsController : ControllerBase
  {
    private readonly CrmDbContext _context;

    public DealsController(CrmDbContext context)
    {
      _context = context;
    }

    // GET: api/Deals
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Deal>>> GetDeals()
    {
      var deals = await _context.Deals.ToListAsync();
      return Ok(deals);
    }

    // GET: api/Deals/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Deal>> GetDeal(int id)
    {
      var deal = await _context.Deals.FindAsync(id);

      if (deal == null)
      {
        return NotFound();
      }

      return Ok(deal);
    }

    // POST: api/Deals
    [HttpPost]
    public async Task<ActionResult<Deal>> CreateDeal(CreateDealDto createDealDto)
    {
      var deal = new Deal
      {
        Title = createDealDto.Title,
        Description = createDealDto.Description,
        Amount = createDealDto.Amount,
        Stage = createDealDto.Stage,
        Probability = createDealDto.Probability,
        ExpectedCloseDate = createDealDto.ExpectedCloseDate,
        ActualCloseDate = createDealDto.ActualCloseDate,
        Priority = createDealDto.Priority,
        Notes = createDealDto.Notes,
        AccountId = createDealDto.AccountId,
        ContactId = createDealDto.ContactId,
        LeadId = createDealDto.LeadId
      };

      _context.Deals.Add(deal);
      await _context.SaveChangesAsync();

      return CreatedAtAction(nameof(GetDeal), new { id = deal.Id }, deal);
    }

    // PUT: api/Deals/5
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateDeal(int id, UpdateDealDto updateDealDto)
    {
      var deal = await _context.Deals.FindAsync(id);

      if (deal == null)
      {
        return NotFound();
      }

      deal.Title = updateDealDto.Title;
      deal.Description = updateDealDto.Description;
      deal.Amount = updateDealDto.Amount;
      deal.Stage = updateDealDto.Stage;
      deal.Probability = updateDealDto.Probability;
      deal.ExpectedCloseDate = updateDealDto.ExpectedCloseDate;
      deal.ActualCloseDate = updateDealDto.ActualCloseDate;
      deal.Priority = updateDealDto.Priority;
      deal.Notes = updateDealDto.Notes;
      deal.AccountId = updateDealDto.AccountId;
      deal.ContactId = updateDealDto.ContactId;
      deal.LeadId = updateDealDto.LeadId;

      try
      {
        await _context.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (!DealExists(id))
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

    // DELETE: api/Deals/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteDeal(int id)
    {
      var deal = await _context.Deals.FindAsync(id);
      if (deal == null)
      {
        return NotFound();
      }

      _context.Deals.Remove(deal);
      await _context.SaveChangesAsync();

      return NoContent();
    }

    private bool DealExists(int id)
    {
      return _context.Deals.Any(e => e.Id == id);
    }
  }
}
