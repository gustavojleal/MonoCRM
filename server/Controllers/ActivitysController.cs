using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.DTOs;
using Server.Models;

namespace Server.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class ActivitysController : ControllerBase
  {
    private readonly AppDbContext _context;

    public ActivitysController(AppDbContext context)
    {
      _context = context;
    }

    // GET: api/Activitys
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Models.Activity>>> GetActivitys()
    {
      var Activitys = await _context.Activities.ToListAsync();
      return Ok(Activitys);
    }

    // GET: api/Activitys/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Models.Activity>> GetActivity(int id)
    {
      var Activity = await _context.Activities.FindAsync(id);

      if (Activity == null)
      {
        return NotFound();
      }

      return Ok(Activity);
    }

    // POST: api/Activitys
    [HttpPost]
    public async Task<ActionResult<Models.Activity>> CreateActivity(CreateActivityDto createActivityDto)
    {
      var Activity = new Models.Activity
      {
        Title = createActivityDto.Title,
        Description = createActivityDto.Description,
        Status = createActivityDto.Status,
        Priority = createActivityDto.Priority,
        Type = createActivityDto.Type,
        DueDate = createActivityDto.DueDate,
        CompletedDate = createActivityDto.CompletedDate,
        ContactId = createActivityDto.ContactId,
        DealId = createActivityDto.DealId,
        AccountId = createActivityDto.AccountId
      };

      _context.Activities.Add(Activity);
      await _context.SaveChangesAsync();

      return CreatedAtAction(nameof(GetActivity), new { id = Activity.Id }, Activity);
    }

    // PUT: api/Activitys/5
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateActivity(int id, UpdateActivityDto updateActivityDto)
    {
      var Activity = await _context.Activities.FindAsync(id);

      if (Activity == null)
      {
        return NotFound();
      }

      Activity.Title = updateActivityDto.Title;
      Activity.Description = updateActivityDto.Description;
      Activity.Status = updateActivityDto.Status;
      Activity.Priority = updateActivityDto.Priority;
      Activity.Type = updateActivityDto.Type;
      Activity.DueDate = updateActivityDto.DueDate;
      Activity.CompletedDate = updateActivityDto.CompletedDate;
      Activity.ContactId = updateActivityDto.ContactId;
      Activity.DealId = updateActivityDto.DealId;
      Activity.AccountId = updateActivityDto.AccountId;

      try
      {
        await _context.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (!ActivityExists(id))
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

    // DELETE: api/Activitys/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteActivity(int id)
    {
      var Activity = await _context.Activities.FindAsync(id);
      if (Activity == null)
      {
        return NotFound();
      }

      _context.Activities.Remove(Activity);
      await _context.SaveChangesAsync();

      return NoContent();
    }

    private bool ActivityExists(int id)
    {
      return _context.Activities.Any(e => e.Id == id);
    }
  }
}
