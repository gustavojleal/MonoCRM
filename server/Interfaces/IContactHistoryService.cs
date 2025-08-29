
using Server.Models;


public interface IContactHistoryService
{
    Task CreateContactHistoryAsync(ContactHistory contactHistory);
    Task<IEnumerable<ContactHistory>> GetContactHistoriesByContactIdAsync(Guid contactId);
}
