using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LookupController : ControllerBase
    {
        private readonly AppDbContext _context;

        public LookupController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("priorities")]
        public IActionResult GetPriorities()
        {
            // Assuming you have a Priority enum or model
            var priorities = Enum.GetNames(typeof(Priority)); // Or fetch from database
            return Ok(priorities);
        }

        [HttpGet("stages")]
        public IActionResult GetStages()
        {
            // Assuming you have a Stage enum or model
            var stages = Enum.GetNames(typeof(Stage)); // Or fetch from database
            return Ok(stages);
        }

        [HttpGet("roles")]
        public async Task<IActionResult> GetRoles()
        {
            // Assuming you have roles stored in database
            var roles = await _context.Roles.ToListAsync(); // Adjust based on your actual model
            return Ok(roles);
        }
    }

    // Example enums (if not already defined)
    public enum Priority { High, Medium, Low }
    public enum Stage { Prospect, Qualification, Proposal, Negotiation, ClosedWon, ClosedLost }
}
