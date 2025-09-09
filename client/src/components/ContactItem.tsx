import React from 'react';
import { Contact } from '../types/types';

interface ContactItemProps {
  contact: Contact;
  index: number;
  onDelete?: (id: number) => void;
  onEdit: (contact: Contact) => void;
}

const ContactItem: React.FC<ContactItemProps> = ({ contact, index, onEdit }) => {
  return (
    <>
      <tr key={contact.id} className={`${index}`} onClick={() => onEdit(contact)}>
        <div className="contact-info">
          <div className="contact-avatar">JJ</div>
          <div>
              <div className="contact-name">
                  {formatField(contact.firstName, 15)} {formatField(contact.lastName, 15)}</div>
              <div className="contact-email">{formatField(contact.email, 25)}</div>
          </div>  
        </div>  
        <td className="Contact-cell">{formatField(contact.phone, 14)}</td>
        <td className="Contact-cell">{contact.company}</td>
        <td className="Contact-cell">{formatField(contact.jobTitle, 10)}</td>
        <td><span className={`status-badge status-${contact.status}`}>{formatField(contact.status ? contact.status : "New", 10)}</span></td>
        <td className="Contact-cell">{formatField(contact.createdAt, 10)}</td>
        <td className="Contact-cell">{formatField(contact.updatedAt, 10)}</td>
        <td>
            <button className="action-btn btn-edit"><i className="fas fa-edit"></i></button>
           {contact.status === "new" ? 
            <button className="action-btn btn-delete"><i className="fas fa-trash"></i></button>
            : null
            }
        </td>
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

  return formattedValue + ' ';
}



