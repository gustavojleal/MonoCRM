using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Models;


namespace Server.Services
{
    public class ContactService : IContactService
    {
        private readonly AppDbContext _context;
        private readonly ILogger<ContactService> _logger;

        public ContactService(AppDbContext context, ILogger<ContactService> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<IEnumerable<Contact>> GetAllContactsAsync()
        {
            return await _context.Contacts
            .Include(c => c.ContactHistories)
            .ToListAsync();
        }

        public async Task<Contact?> GetContactByIdAsync(Guid id)
        {

            var retorno = await _context.Contacts
              .Include(c => c.ContactHistories)
              .FirstOrDefaultAsync(c => c.Id == id);

            return retorno;
        }

        public async Task<Contact> CreateContactAsync(Contact contact)
        {
            _context.Contacts.Add(contact);
            await _context.SaveChangesAsync();
            return contact;
        }

        public async Task UpdateContactAsync(Contact contact)
        {
            _context.Entry(contact).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task<bool> DeleteContactAsync(Guid id)
        {
            var contact = await _context.Contacts.FindAsync(id);
            if (contact == null)
            {
                return false;
            }

            _context.Contacts.Remove(contact);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}