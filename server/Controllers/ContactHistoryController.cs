using Microsoft.AspNetCore.Mvc;
using Server.DTOs;
using Server.Models;
using AutoMapper;

namespace Server.Controllers
{
  [ApiController]
  [Route("api/[controller]")]

  public class ContactHistoryController : ControllerBase
  {
    private readonly IContactHistoryService _contactHistoryService;
    private readonly IMapper _mapper;
    private readonly ILogger<ContactHistoryController> _logger;


    public ContactHistoryController(
        IContactHistoryService contactHistoryService,
        IMapper mapper,
        ILogger<ContactHistoryController> logger)
    {
      _contactHistoryService = contactHistoryService;
      _mapper = mapper;
      _logger = logger;
    }

    [HttpPost("{contactId}")]
    public async Task<ActionResult<ContactHistoryResponseDto>> CreateContactHistory(Guid contactId, [FromBody] CreateContactHistoryDto createDto)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      // var contactHistory = _mapper.Map<ContactHistory>(createDto);
      var contactHistory = new ContactHistory { ContactId = contactId, Action = createDto.Action, Details = createDto.Details, UserId = createDto.UserId };

      contactHistory.ContactId = contactId;

      await _contactHistoryService.CreateContactHistoryAsync(contactHistory);
      return CreatedAtAction(nameof(GetContactHistories), new { contactId }, _mapper.Map<ContactHistoryResponseDto>(contactHistory));
    }

 // Mapeamento manual em vez de usar AutoMapper 
 // var contactHistory = new ContactHistory { ContactId = contactId, HistoryDate = createDto.HistoryDate, Notes = createDto.Notes, HistoryType = createDto.HistoryType, CreatedAt = DateTime.UtcNow };
 //  await _contactHistoryService.CreateContactHistoryAsync(contactHistory); 
 // // Também mapear manualmente a resposta se necessário var responseDto = new ContactHistoryResponseDto { Id = contactHistory.Id, ContactId = contactHistory.ContactId, HistoryDate = contactHistory.HistoryDate, Notes = contactHistory.Notes, HistoryType = contactHistory.HistoryType, CreatedAt = contactHistory.CreatedAt }; return CreatedAtAction(nameof(GetContactHistories), new { contactId }, responseDto); }

     [HttpGet("{contactId}")]
    public async Task<ActionResult<IEnumerable<ContactHistoryResponseDto>>> GetContactHistories(Guid contactId)
    {
        try
        {
            var histories = await _contactHistoryService.GetContactHistoriesByContactIdAsync(contactId);
            var responseDtos = _mapper.Map<IEnumerable<ContactHistoryResponseDto>>(histories);
            return Ok(responseDtos);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving histories for contact {ContactId}", contactId);
            return StatusCode(500, "Internal server error");
        }
    }


  }


}
