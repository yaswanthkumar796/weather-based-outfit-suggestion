import React, { useEffect, useState } from 'react';
import { getRequests, approveRequest, rejectRequest } from '../api/adminApi';

const AdminDashboard = ({ onLogout }) => {
     const [requests, setRequests] = useState([]);
     const [loading, setLoading] = useState(true);

     const fetchRequests = async () => {
          try {
               const data = await getRequests();
               setRequests(data);
               setLoading(false);
          } catch (error) {
               console.error("Failed to fetch requests", error);
               setLoading(false);
          }
     };

     useEffect(() => {
          fetchRequests();
     }, []);

     const handleApprove = async (id) => {
          if (window.confirm('Approve this outfit?')) {
               await approveRequest(id);
               fetchRequests(); // Refresh list
          }
     };

     const handleReject = async (id) => {
          if (window.confirm('Reject this outfit?')) {
               await rejectRequest(id);
               fetchRequests(); // Refresh list
          }
     };

     return (
          <div className="admin-container" style={{ maxWidth: '800px' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h2>Admin Dashboard</h2>
                    <button onClick={onLogout} style={{ background: '#ff6b6b', padding: '8px 15px', borderRadius: '5px', border: 'none', color: 'white', cursor: 'pointer' }}>Logout</button>
               </div>

               <h3>Pending Requests</h3>

               {loading ? <p>Loading requests...</p> : (
                    requests.length === 0 ? <p>No pending requests.</p> : (
                         <div className="requests-list">
                              {requests.map(req => (
                                   <div key={req._id} style={{ background: 'rgba(255,255,255,0.1)', padding: '15px', borderRadius: '10px', marginBottom: '15px', border: '1px solid rgba(255,255,255,0.2)' }}>
                                        <div style={{ display: 'flex', gap: '15px' }}>
                                             <img src={req.imageUrl} alt={req.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '5px' }} onError={(e) => e.target.src = 'https://via.placeholder.com/150'} />
                                             <div style={{ flex: 1 }}>
                                                  <h4 style={{ margin: '0 0 5px 0' }}>{req.name}</h4>
                                                  <p style={{ fontSize: '0.9em', margin: '0' }}><strong>Items:</strong> {req.items.join(', ')}</p>
                                                  <p style={{ fontSize: '0.9em', margin: '0' }}><strong>Category:</strong> {req.category} | <strong>Season:</strong> {req.season.join(', ')}</p>
                                                  <p style={{ fontSize: '0.9em', margin: '0' }}><strong>Weather:</strong> {req.weatherCondition.join(', ')} ({req.tempMin}°C - {req.tempMax}°C)</p>
                                             </div>
                                        </div>
                                        <div style={{ marginTop: '10px', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                                             <button onClick={() => handleApprove(req._id)} style={{ background: '#51cf66', padding: '8px 15px', border: 'none', borderRadius: '5px', color: 'white', cursor: 'pointer' }}>Approve</button>
                                             <button onClick={() => handleReject(req._id)} style={{ background: '#ff6b6b', padding: '8px 15px', border: 'none', borderRadius: '5px', color: 'white', cursor: 'pointer' }}>Reject</button>
                                        </div>
                                   </div>
                              ))}
                         </div>
                    )
               )}
          </div>
     );
};

export default AdminDashboard;
