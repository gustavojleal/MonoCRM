using Microsoft.AspNetCore.Mvc;
using Server.DTOs;
using Server.Models;
using Server.Interfaces;

using AutoMapper;

namespace Server.Controllers
{
  [ApiController]
[Route("api/[controller]")]
public class ContactsController : ControllerBase
{
    private readonly IContactService _contactService;
    private readonly IMapper _mapper;
    private readonly ILogger<ContactsController> _logger; // Adicionado campo para logger

    public ContactsController(
        IContactService contactService,
        IMapper mapper,
        ILogger<ContactsController> logger)
    {
        _contactService = contactService;
        _mapper = mapper;
        _logger = logger;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ContactResponseDto>>> GetAllContacts()
    {
        var contacts = await _contactService.GetAllContactsAsync();
        return Ok(_mapper.Map<IEnumerable<ContactResponseDto>>(contacts));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ContactResponseDto>> GetContactById(Guid id)
    {
      Console.WriteLine("ID =========>>> "+id);
        var contact = await _contactService.GetContactByIdAsync(id);
        if (contact == null)
        {
            return NotFound();
        }
        Console.WriteLine("Contact =========>>> "+contact);
        return Ok(_mapper.Map<ContactResponseDto>(contact));
    }

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
    public async Task<IActionResult> UpdateContact(Guid id, [FromBody] UpdateContactDto updateDto)
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
    public async Task<IActionResult> DeleteContact(Guid id)
    {
        var success = await _contactService.DeleteContactAsync(id);
        if (!success)
        {
            return NotFound();
        }
        
        return NoContent();
    }

 

}
}
