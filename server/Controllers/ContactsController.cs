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
    private readonly AppDbContext _context;

    public ContactsController(AppDbContext context)
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
      if (await _context.Contacts.AnyAsync(c => 
          (!string.IsNullOrEmpty(createContactDto.Email) && c.Email == createContactDto.Email) ||
          (!string.IsNullOrEmpty(createContactDto.Phone) && c.Phone == createContactDto.Phone)))
      {
        return BadRequest(new { 
            Message = "Já existe um contato com o mesmo e-mail ou telefone" 
        });
      }
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
      if (await _context.Contacts.AnyAsync(c => 
          c.Id != id && 
          (!string.IsNullOrEmpty(updateContactDto.Email) && c.Email == updateContactDto.Email ||
          (!string.IsNullOrEmpty(updateContactDto.Phone) && c.Phone == updateContactDto.Phone))))
      {
        return BadRequest(new { 
            Message = "Já existe um contato com o mesmo e-mail ou telefone" 
        });
      }
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
