import React from 'react';
import { Lead } from '../types/types';

interface LeadItemProps {
  lead: Lead;
  onDelete?: (id: number) => void;
  onEdit?: (lead: Lead) => void;
}

const LeadItem: React.FC<LeadItemProps> = ({ lead }) => {
  return (
    <>
      <tr key={lead.id} className="lead-row">

        <td className="lead-cell">{formatField(lead.id, 4)}</td>
        <td className="lead-cell">{formatField(lead.firstName, 15)}</td>
        <td className="lead-cell">{formatField(lead.lastName, 15)}</td>
        <td className="lead-cell">{formatField(lead.phone, 14)}</td>
        <td className="lead-cell">{formatField(lead.email, 25)}</td>
        <td className="lead-cell">{formatField(lead.createdAt, 10)}</td>
        <td className="lead-cell">{formatField(lead.updatedAt, 10)}</td>
      </tr>

    </>
  );
};
export default LeadItem;

function formatField(value: any, length: number): string {

  const resevedValue = typeof (value) !== 'string' ? String(value) : value;
  const formattedValue = resevedValue.length > length
    ? resevedValue.slice(0, length)
    : resevedValue.padEnd(length, '');
  console.log('Formatted Value:', formattedValue.length); // Debugging line

  return formattedValue + ' ';
}



