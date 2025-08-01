using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.DTOs;
using Server.Models;

namespace Server.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class LeadsController : ControllerBase
  {
    private readonly AppDbContext _context;

    public LeadsController(AppDbContext context)
    {
      _context = context;
    }

    // GET: api/Leads
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Lead>>> GetLeads()
    {
      var leads = await _context.Leads.ToListAsync();
      return Ok(leads);
    }

    // GET: api/Leads/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Lead>> GetLead(int id)
    {
      var lead = await _context.Leads.FindAsync(id);

      if (lead == null)
      {
        return NotFound();
      }

      return Ok(lead);
    }

    // POST: api/Leads
    [HttpPost]
    public async Task<ActionResult<Lead>> CreateLead(CreateLeadDto createLeadDto)
    {
      var lead = new Lead
      {
        FirstName = createLeadDto.FirstName,
        LastName = createLeadDto.LastName,
        Email = createLeadDto.Email,
        Phone = createLeadDto.Phone,
        Company = createLeadDto.Company,
        JobTitle = createLeadDto.JobTitle,
        Status = createLeadDto.Status,
        Source = createLeadDto.Source,
        Priority = createLeadDto.Priority,
        Notes = createLeadDto.Notes,
        LastContactDate = createLeadDto.LastContactDate,
        AccountId = createLeadDto.AccountId,
        ConvertedContactId = createLeadDto.ConvertedContactId
      };

      _context.Leads.Add(lead);
      await _context.SaveChangesAsync();

      return CreatedAtAction(nameof(GetLead), new { id = lead.Id }, lead);
    }

    // PUT: api/Leads/5
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateLead(int id, UpdateLeadDto updateLeadDto)
    {
      var lead = await _context.Leads.FindAsync(id);

      if (lead == null)
      {
        return NotFound();
      }

      lead.FirstName = updateLeadDto.FirstName;
      lead.LastName = updateLeadDto.LastName;
      lead.Email = updateLeadDto.Email;
      lead.Phone = updateLeadDto.Phone;
      lead.Company = updateLeadDto.Company;
      lead.JobTitle = updateLeadDto.JobTitle;
      lead.Status = updateLeadDto.Status;
      lead.Source = updateLeadDto.Source;
      lead.Priority = updateLeadDto.Priority;
      lead.Notes = updateLeadDto.Notes;
      lead.LastContactDate = updateLeadDto.LastContactDate;
      lead.AccountId = updateLeadDto.AccountId;
      lead.ConvertedContactId = updateLeadDto.ConvertedContactId;

      try
      {
        await _context.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (!LeadExists(id))
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

    // DELETE: api/Leads/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteLead(int id)
    {
      var lead = await _context.Leads.FindAsync(id);
      if (lead == null)
      {
        return NotFound();
      }

      _context.Leads.Remove(lead);
      await _context.SaveChangesAsync();

      return NoContent();
    }

    private bool LeadExists(int id)
    {
      return _context.Leads.Any(e => e.Id == id);
    }
  }
}
