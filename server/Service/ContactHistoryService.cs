using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Models;

namespace Server.Services
{
    public class ContactHistoryService : IContactHistoryService
    {
        private readonly AppDbContext _context;

        public ContactHistoryService(AppDbContext context)
        {
            _context = context;
        }

        public async Task CreateContactHistoryAsync(ContactHistory contactHistory)
        {
            _context.ContactHistory.Add(contactHistory);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<ContactHistory>> GetContactHistoriesByContactIdAsync(Guid contactId)
        {
            return await _context.ContactHistory
                .Where(h => h.ContactId == contactId)
                .ToListAsync();
        }
    }
}