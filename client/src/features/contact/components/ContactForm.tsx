import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../../../app/hooks';
import { fetchContacts } from '../contactsSlice';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../app/store';

type FormData = {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	company: string;
	jobTitle: string;
	status: string;
	history?: string;
};

const ContactForm: React.FC = () => {
  const dispatch = useAppDispatch();
  
  const selectedContact = useSelector((state: RootState) => state.contacts.selectedContact);

  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<FormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      jobTitle: '',
      status: 'new',
      history: ''
    }
  });
  
  const isDeletable = watch('status') === 'new';
  
  useEffect(() => {
    if(selectedContact) {
      reset(selectedContact);
    } else {
      reset({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        jobTitle: '',
        status: 'new',
        history: ''
      });
    }
  }, [selectedContact, reset]);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const onSubmit = (data: FormData) => {
    // If a history note is provided, wrap it in an array with a generated ContactHistory object
    const historyArray = data.history?.trim()
      ? [{
          id: Date.now().toString(),
          action: "note",
          contactId: selectedContact ? selectedContact.id : "",
          userId: "", // Assume the user id will come from elsewhere (e.g., user state)
          timestamp: new Date().toISOString(),
          details: data.history.trim()
        }]
      : [];
    
    dispatch({ type: 'contacts/addContact', payload: { ...data, history: historyArray } });
  };

  const toDelete = () => {
    if(selectedContact) {
      dispatch({ type: 'contacts/removeContact', payload: selectedContact.id });
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input 
          placeholder="First Name" 
          {...register('firstName', { required: 'First name is required' })} 
        />
        {errors.firstName && <span>{errors.firstName.message}</span>}
      </div>
      <div>
        <input 
          placeholder="Last Name" 
          {...register('lastName', { required: 'Last name is required' })} 
        />
        {errors.lastName && <span>{errors.lastName.message}</span>}
      </div>
      <div>
        <input 
          placeholder="Email" 
          {...register('email', { 
            required: 'Email is required', 
            pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email' } 
          })} 
        />
        {errors.email && <span>{errors.email.message}</span>}
      </div>
      <div>
        <input 
          placeholder="Phone" 
          {...register('phone', { 
            pattern: { value: /^\d{10,11}$/, message: 'Invalid phone' } 
          })} 
        />
        {errors.phone && <span>{errors.phone.message}</span>}
      </div>
      <div>
        <input 
          placeholder="Company" 
          {...register('company')} 
        />
      </div>
      <div>
        <input 
          placeholder="Job Title" 
          {...register('jobTitle')} 
        />
      </div>
      <div>
        <select {...register('status')}>
          <option value="new">New</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <div>
        <input 
          placeholder="Notes" 
          {...register('history')} 
        />
      </div>
      <button type="submit">Submit</button>
      {isDeletable && <button type="button" onClick={toDelete}>Delete</button>}
    </form>
  );
};

export default ContactForm;
