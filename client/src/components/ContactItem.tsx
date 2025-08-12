import React from 'react';
import { Contact } from '../types/types';

interface ContactItemProps {
  contact: Contact;
  onDelete?: (id: number) => void;
  onEdit?: (Contact: Contact) => void;
}

const ContactItem: React.FC<ContactItemProps> = ({ contact }) => {
  return (
    <>
      <tr key={contact.id} className="Contact-row">

        <td className="Contact-cell">{formatField(contact.id, 4)}</td>
        <td className="Contact-cell">{formatField(contact.firstName, 15)}</td>
        <td className="Contact-cell">{formatField(contact.lastName, 15)}</td>
        <td className="Contact-cell">{formatField(contact.phone, 14)}</td>
        <td className="Contact-cell">{formatField(contact.email, 25)}</td>
        <td className="Contact-cell">{formatField(contact.createdAt, 10)}</td>
        <td className="Contact-cell">{formatField(contact.updatedAt, 10)}</td>
      </tr>

    </>
  );
};
export default ContactItem;

function formatField(value: any, length: number): string {

  const resevedValue = typeof (value) !== 'string' ? String(value) : value;
  const formattedValue = resevedValue.length > length
    ? resevedValue.slice(0, length)
    : resevedValue.padEnd(length, '');
  console.log('Formatted Value:', formattedValue.length); // Debugging line

  return formattedValue + ' ';
}



