using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.DTOs;
using Server.Models;

namespace Server.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class ContactsController : ControllerBase
  {
    private readonly CrmDbContext _context;

    public ContactsController(CrmDbContext context)
    {
      _context = context;
    }

    // GET: api/Contacts
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Contact>>> GetContacts()
    {
      var contacts = await _context.Contacts.ToListAsync();
      return Ok(contacts);
    }

    // GET: api/Contacts/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Contact>> GetContact(int id)
    {
      var contact = await _context.Contacts.FindAsync(id);

      if (contact == null)
      {
        return NotFound();
      }

      return Ok(contact);
    }

    // POST: api/Contacts
    [HttpPost]
    public async Task<ActionResult<Contact>> CreateContact(CreateContactDto createContactDto)
    {
      var contact = new Contact
      {
        FirstName = createContactDto.FirstName,
        LastName = createContactDto.LastName,
        Email = createContactDto.Email,
        Phone = createContactDto.Phone,
        Company = createContactDto.Company,
        JobTitle = createContactDto.JobTitle,
        Notes = createContactDto.Notes,
        AccountId = createContactDto.AccountId
      };

      _context.Contacts.Add(contact);
      await _context.SaveChangesAsync();

      return CreatedAtAction(nameof(GetContact), new { id = contact.Id }, contact);
    }

    // PUT: api/Contacts/5
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateContact(int id, UpdateContactDto updateContactDto)
    {
      var contact = await _context.Contacts.FindAsync(id);

      if (contact == null)
      {
        return NotFound();
      }

      contact.FirstName = updateContactDto.FirstName;
      contact.LastName = updateContactDto.LastName;
      contact.Email = updateContactDto.Email;
      contact.Phone = updateContactDto.Phone;
      contact.Company = updateContactDto.Company;
      contact.JobTitle = updateContactDto.JobTitle;
      contact.Notes = updateContactDto.Notes;
      contact.AccountId = updateContactDto.AccountId;

      try
      {
        await _context.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (!ContactExists(id))
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

    // DELETE: api/Contacts/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteContact(int id)
    {
      var contact = await _context.Contacts.FindAsync(id);
      if (contact == null)
      {
        return NotFound();
      }

      _context.Contacts.Remove(contact);
      await _context.SaveChangesAsync();

      return NoContent();
    }

    private bool ContactExists(int id)
    {
      return _context.Contacts.Any(e => e.Id == id);
    }
  }
}
