using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.DTOs;
using Server.Models;

namespace Server.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class AccountsController : ControllerBase
  {
    private readonly CrmDbContext _context;

    public AccountsController(CrmDbContext context)
    {
      _context = context;
    }

    // GET: api/Accounts
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Account>>> GetAccounts()
    {
      var accounts = await _context.Accounts.ToListAsync();
      return Ok(accounts);
    }

    // GET: api/Accounts/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Account>> GetAccount(int id)
    {
      var account = await _context.Accounts.FindAsync(id);

      if (account == null)
      {
        return NotFound();
      }

      return Ok(account);
    }

    // POST: api/Accounts
    [HttpPost]
    public async Task<ActionResult<Account>> CreateAccount(CreateAccountDto createAccountDto)
    {
      var account = new Account
      {
        Name = createAccountDto.Name,
        Industry = createAccountDto.Industry,
        Type = createAccountDto.Type,
        Email = createAccountDto.Email,
        Phone = createAccountDto.Phone,
        Website = createAccountDto.Website,
        Address = createAccountDto.Address,
        City = createAccountDto.City,
        State = createAccountDto.State,
        PostalCode = createAccountDto.PostalCode,
        Country = createAccountDto.Country,
        Description = createAccountDto.Description
      };

      _context.Accounts.Add(account);
      await _context.SaveChangesAsync();

      return CreatedAtAction(nameof(GetAccount), new { id = account.Id }, account);
    }

    // PUT: api/Accounts/5
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateAccount(int id, UpdateAccountDto updateAccountDto)
    {
      var account = await _context.Accounts.FindAsync(id);

      if (account == null)
      {
        return NotFound();
      }

      account.Name = updateAccountDto.Name;
      account.Industry = updateAccountDto.Industry;
      account.Type = updateAccountDto.Type;
      account.Email = updateAccountDto.Email;
      account.Phone = updateAccountDto.Phone;
      account.Website = updateAccountDto.Website;
      account.Address = updateAccountDto.Address;
      account.City = updateAccountDto.City;
      account.State = updateAccountDto.State;
      account.PostalCode = updateAccountDto.PostalCode;
      account.Country = updateAccountDto.Country;
      account.Description = updateAccountDto.Description;

      try
      {
        await _context.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (!AccountExists(id))
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

    // DELETE: api/Accounts/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAccount(int id)
    {
      var account = await _context.Accounts.FindAsync(id);
      if (account == null)
      {
        return NotFound();
      }

      _context.Accounts.Remove(account);
      await _context.SaveChangesAsync();

      return NoContent();
    }

    private bool AccountExists(int id)
    {
      return _context.Accounts.Any(e => e.Id == id);
    }
  }
}
