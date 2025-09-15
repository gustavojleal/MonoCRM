import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Contact } from './types';
import { ContactService } from '../../services/ContactService';

export const fetchContacts = createAsyncThunk<Contact[]>('contacts/fetchContacts', async () => {
  const contactsFromService = await ContactService.getAll();
  return contactsFromService.map(contact => ({
    id: contact.id,
    firstName: contact.firstName,
    lastName: contact.lastName,
    email: contact.email,
    phone: contact.phone,
    company: contact.company,
    jobTitle: contact.jobTitle,
    status: contact.status,
    source: contact.source,
    accountId: contact.accountId,
    createdAt: contact.createdAt,
    updatedAt: contact.updatedAt,
    history: contact.history,
  }));
});

interface ContactsState {
  selectedContact: Contact | null;
  list: Contact[];
  loading: boolean;
  error: string | null;
}

const initialState: ContactsState = {
  selectedContact: null,
  list: [],
  loading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<Contact>) => {
      const newContact = action.payload;
      if (!newContact.history) {
        newContact.history = [];
      }
      state.list.push(newContact);
    },
    removeContact: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((contact) => contact.id !== action.payload);
    },
    updateContact: (state, action: PayloadAction<Contact>) => {
      const updatedContact = action.payload;
      if (!updatedContact.history) {
        updatedContact.history = [];
      }
      const index = state.list.findIndex((contact) => contact.id === updatedContact.id);
      if (index !== -1) {
        state.list[index] = updatedContact;
      }
    },
    setSelectedContact: (state, action: PayloadAction<Contact | null>) => {
      state.selectedContact = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao buscar contatos';
      });
  },
});

export const { addContact, removeContact, updateContact, setSelectedContact } = contactsSlice.actions;

export default contactsSlice.reducer;