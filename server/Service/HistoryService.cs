using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Services
{
    public class HistoryService : IHistoryService
    {
        private readonly AppDbContext _context;

        public HistoryService(AppDbContext context)
        {
            _context = context;
        }

        public async Task CreateHistoryAsync(History history)
        {
            _context.Histories.Add(history);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<History>> GetHistoriesByContactIdAsync(int contactId)
        {
            return await _context.Histories
                .Where(h => h.ContactId == contactId)
                .ToListAsync();
        }
    }
}