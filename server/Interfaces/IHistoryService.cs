using Server.Models;

public interface IHistoryService
{
  Task CreateHistoryAsync(History history);
  Task<IEnumerable<History>> GetHistoriesByContactIdAsync(int contactId);
}

