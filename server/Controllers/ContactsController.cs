using Microsoft.AspNetCore.Mvc;
using Server.DTOs;
using Server.Models;
using Server.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

using AutoMapper;
using Microsoft.Extensions.Logging; // Adicionado para ILogger

namespace Server.Controllers
{
  [ApiController]
[Route("api/[controller]")]
public class ContactsController : ControllerBase
{
    private readonly IContactService _contactService;
    private readonly IHistoryService _historyService;
    private readonly IMapper _mapper;
    private readonly ILogger<ContactsController> _logger; // Adicionado campo para logger

    public ContactsController(
        IContactService contactService,
        IHistoryService historyService,
        IMapper mapper,
        ILogger<ContactsController> logger) // Adicionado parâmetro de logger
    {
        _contactService = contactService;
        _historyService = historyService;
        _mapper = mapper;
        _logger = logger; // Atribuição do logger
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ContactResponseDto>>> GetAllContacts()
    {
        var contacts = await _contactService.GetAllContactsAsync();
        return Ok(_mapper.Map<IEnumerable<ContactResponseDto>>(contacts));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ContactResponseDto>> GetContactById(int id)
    {
        var contact = await _contactService.GetContactByIdAsync(id);
        if (contact == null)
        {
            return NotFound();
        }
        return Ok(_mapper.Map<ContactResponseDto>(contact));
    }

    // [HttpPost]
    // public async Task<ActionResult<ContactResponseDto>> CreateContact([FromBody] CreateContactDto createDto)
    // {
    //     var contact = _mapper.Map<Contact>(createDto);
    //     var createdContact = await _contactService.CreateContactAsync(contact);
        
    //     return CreatedAtAction(
    //         nameof(GetContactById),
    //         new { id = createdContact.Id },
    //         _mapper.Map<ContactResponseDto>(createdContact));
    // }
    [HttpPost]
    public async Task<ActionResult<ContactResponseDto>> CreateContact([FromBody] CreateContactDto createDto)
    {
        // Validate model state
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var contact = _mapper.Map<Contact>(createDto);
            var createdContact = await _contactService.CreateContactAsync(contact);
            
            // Map to CONCRETE response type
            var responseDto = _mapper.Map<ContactResponseDto>(createdContact);
            
            return CreatedAtAction(
                nameof(GetContactById),
                new { id = createdContact.Id },
                responseDto); // Return concrete type
        }
        catch (Exception ex)
        {
            // Log error
            _logger.LogError(ex, "Error creating contact");
            return StatusCode(500, "Internal server error");
        }
  }
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateContact(int id, [FromBody] UpdateContactDto updateDto)
    {
        var contact = await _contactService.GetContactByIdAsync(id);
        if (contact == null)
        {
            return NotFound();
        }

        _mapper.Map(updateDto, contact);
        await _contactService.UpdateContactAsync(contact);
        
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteContact(int id)
    {
        var success = await _contactService.DeleteContactAsync(id);
        if (!success)
        {
            return NotFound();
        }
        
        return NoContent();
    }

    [HttpPost("{contactId}/history")]
    public async Task<ActionResult> AddContactHistory(
        int contactId,
        [FromBody] CreateHistoryDto historyDto)
    {
        historyDto.ContactId = contactId;
        var history = _mapper.Map<History>(historyDto);
        await _historyService.CreateHistoryAsync(history);
        
        return CreatedAtAction(
            nameof(GetContactById),
            new { id = contactId },
            null);
    }

    [HttpGet("{contactId}/history")]
    public async Task<ActionResult<IEnumerable<HistoryResponseDto>>> GetContactHistory(int contactId)
    {
        var histories = await _historyService.GetHistoriesByContactIdAsync(contactId);
        return Ok(_mapper.Map<IEnumerable<HistoryResponseDto>>(histories));
    }
}
}
