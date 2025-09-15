import React, { useState, useEffect } from 'react';
import { AppLayout } from '../layouts/AppLayout';
import NotificationContainer from '../components/core/Notifications';
import { LeadService } from '../services/PublicApi';
import { useNotification } from '../context/NotificationContext';
import LeadItem from '../components/LeadItem';
import { Lead } from '../common/types/types';

const LeadList: React.FC = () => {
  const { notifications, removeNotification } = useNotification();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const data = await LeadService.getAll();
      setLeads(data);
    } catch (err) {
      setError('Failed to load leads');
    } finally {
      setLoading(false);
    }
  };

  const filteredLeads = leads.filter(lead =>
    `${lead.firstName} ${lead.lastName}`.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id: number) => {
    await LeadService.delete(id);
    setLeads(leads.filter(l => l.id !== id));
  };

  return (
    <AppLayout>


      <div className="max-w-7xl mx-auto p-4">
        <NotificationContainer notifications={notifications} removeNotification={removeNotification} autoClose autoCloseDuration={4000} />

        <input
          type="text"
          placeholder="Buscar por nome..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="mb-4 w-full p-2 border rounded"
        />

        <div className="leadlist-container">
          <table className="LeadListTable">
            <thead className="lead-table-header">
              <tr>
                <th style={{ width: '5%' }}>ID</th>
                <th style={{ width: '10%' }}>First Name</th>
                <th style={{ width: '10%' }}>Last Name</th>
                <th style={{ width: '10%' }}>Phone</th>
                <th style={{ width: '15%' }}>Company</th>
                <th style={{ width: '15%' }}>Email</th>
                <th style={{ width: '15%' }}>Notes</th>
                <th style={{ width: '10%' }}>Job Title</th>
                <th style={{ width: '10%' }}>Created At</th>
                <th style={{ width: '10%' }}>Updated At</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.length > 0 ? (
                filteredLeads.map((lead, index) => (
                  <LeadItem
                    key={lead.id}
                    lead={lead}
                    onDelete={handleDelete}
                    onEdit={setEditingLead}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={10} className="text-center py-4">
                    Nenhum lead encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>


      </div>
    </AppLayout >
  );
};

export default LeadList;