using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.DTOs;
using Server.Models;

namespace Server.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class TasksController : ControllerBase
  {
    private readonly CrmDbContext _context;

    public TasksController(CrmDbContext context)
    {
      _context = context;
    }

    // GET: api/Tasks
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Models.Task>>> GetTasks()
    {
      var tasks = await _context.Tasks.ToListAsync();
      return Ok(tasks);
    }

    // GET: api/Tasks/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Models.Task>> GetTask(int id)
    {
      var task = await _context.Tasks.FindAsync(id);

      if (task == null)
      {
        return NotFound();
      }

      return Ok(task);
    }

    // POST: api/Tasks
    [HttpPost]
    public async Task<ActionResult<Models.Task>> CreateTask(CreateTaskDto createTaskDto)
    {
      var task = new Models.Task
      {
        Title = createTaskDto.Title,
        Description = createTaskDto.Description,
        Status = createTaskDto.Status,
        Priority = createTaskDto.Priority,
        Type = createTaskDto.Type,
        DueDate = createTaskDto.DueDate,
        CompletedDate = createTaskDto.CompletedDate,
        ContactId = createTaskDto.ContactId,
        LeadId = createTaskDto.LeadId,
        DealId = createTaskDto.DealId,
        AccountId = createTaskDto.AccountId
      };

      _context.Tasks.Add(task);
      await _context.SaveChangesAsync();

      return CreatedAtAction(nameof(GetTask), new { id = task.Id }, task);
    }

    // PUT: api/Tasks/5
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateTask(int id, UpdateTaskDto updateTaskDto)
    {
      var task = await _context.Tasks.FindAsync(id);

      if (task == null)
      {
        return NotFound();
      }

      task.Title = updateTaskDto.Title;
      task.Description = updateTaskDto.Description;
      task.Status = updateTaskDto.Status;
      task.Priority = updateTaskDto.Priority;
      task.Type = updateTaskDto.Type;
      task.DueDate = updateTaskDto.DueDate;
      task.CompletedDate = updateTaskDto.CompletedDate;
      task.ContactId = updateTaskDto.ContactId;
      task.LeadId = updateTaskDto.LeadId;
      task.DealId = updateTaskDto.DealId;
      task.AccountId = updateTaskDto.AccountId;

      try
      {
        await _context.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (!TaskExists(id))
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

    // DELETE: api/Tasks/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTask(int id)
    {
      var task = await _context.Tasks.FindAsync(id);
      if (task == null)
      {
        return NotFound();
      }

      _context.Tasks.Remove(task);
      await _context.SaveChangesAsync();

      return NoContent();
    }

    private bool TaskExists(int id)
    {
      return _context.Tasks.Any(e => e.Id == id);
    }
  }
}
