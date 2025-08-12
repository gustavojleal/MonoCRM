using Server.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

public interface IContactService
{
  Task<IEnumerable<Contact>> GetAllContactsAsync();
  Task<Contact?> GetContactByIdAsync(int id);
  Task<Contact> CreateContactAsync(Contact contact);
  Task UpdateContactAsync(Contact contact);
  Task<bool> DeleteContactAsync(int id);
}
