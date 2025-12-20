import React, { useEffect, useState } from 'react';
import { getRequests, approveRequest, rejectRequest, getFeedback } from '../api/adminApi';

const AdminDashboard = ({ onLogout }) => {
     const [activeTab, setActiveTab] = useState('requests');
     const [requests, setRequests] = useState([]);
     const [feedback, setFeedback] = useState([]);
     const [loading, setLoading] = useState(true);

     const fetchData = async () => {
          setLoading(true);
          try {
               const reqs = await getRequests();
               const feeds = await getFeedback();
               setRequests(reqs);
               setFeedback(feeds.data || []);
               setLoading(false);
          } catch (error) {
               console.error("Failed to fetch data", error);
               setLoading(false);
          }
     };

     useEffect(() => {
          fetchData();
     }, []);

     const handleApprove = async (id) => {
          if (window.confirm('Approve this outfit?')) {
               await approveRequest(id);
               fetchData();
          }
     };

     const handleReject = async (id) => {
          if (window.confirm('Reject this outfit?')) {
               await rejectRequest(id);
               fetchData();
          }
     };

     return (
          <div className="min-h-screen bg-transparent py-14 px-4 sm:px-6 lg:px-8">
               <div className="max-w-5xl mx-auto space-y-10">
                    {/* Header Section */}
                    <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/5 backdrop-blur-2xl border border-white/10 p-8 rounded-[2rem] shadow-2xl">
                         <div>
                              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
                                   Admin Dashboard
                              </h1>
                              <p className="text-blue-200/60 mt-2 font-medium">
                                   Manage your application content and reviews
                              </p>
                         </div>
                         <div className="flex items-center gap-3">
                              <button
                                   onClick={fetchData}
                                   className="group flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all text-sm font-semibold text-blue-100"
                              >
                                   <span className="text-lg group-hover:rotate-180 transition-transform duration-500">↻</span>
                                   Refresh Data
                              </button>
                              <button
                                   onClick={onLogout}
                                   className="px-6 py-2.5 bg-rose-500/80 hover:bg-rose-500 rounded-xl transition-all text-sm font-bold text-white shadow-lg shadow-rose-500/20"
                              >
                                   Logout
                              </button>
                         </div>
                    </header>

                    {/* Navigation Tabs */}
                    <nav className="flex items-center p-1.5 bg-white/5 backdrop-blur-md border border-white/5 rounded-2xl w-fit mx-auto md:mx-0">
                         <button
                              onClick={() => setActiveTab('requests')}
                              className={`px-8 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${activeTab === 'requests'
                                   ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                                   : 'text-blue-200/40 hover:text-blue-100 hover:bg-white/5'
                                   }`}
                         >
                              Pending Requests
                              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${activeTab === 'requests' ? 'bg-white/20' : 'bg-white/10'}`}>
                                   {requests.length}
                              </span>
                         </button>
                         <button
                              onClick={() => setActiveTab('feedback')}
                              className={`px-8 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${activeTab === 'feedback'
                                   ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                                   : 'text-blue-200/40 hover:text-blue-100 hover:bg-white/5'
                                   }`}
                         >
                              User Feedback
                              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${activeTab === 'feedback' ? 'bg-white/20' : 'bg-white/10'}`}>
                                   {feedback.length}
                              </span>
                         </button>
                    </nav>

                    {/* Content Area */}
                    <main className="min-h-[400px]">
                         {loading ? (
                              <div className="flex flex-col items-center justify-center py-20 animate-pulse">
                                   <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
                                   <p className="mt-6 text-blue-200/40 font-semibold tracking-wide uppercase text-sm">Synchronizing Data...</p>
                              </div>
                         ) : (
                              <div className="space-y-6">
                                   {activeTab === 'requests' ? (
                                        requests.length === 0 ? (
                                             <div className="flex flex-col items-center justify-center py-24 bg-white/5 border border-white/5 rounded-3xl text-center px-6">
                                                  <div className="text-5xl mb-4 opacity-20">📥</div>
                                                  <h3 className="text-xl font-bold text-blue-100">All caught up!</h3>
                                                  <p className="text-blue-200/40 mt-2">No new outfit requests in the queue.</p>
                                             </div>
                                        ) : (
                                             <div className="grid gap-6">
                                                  {requests.map(req => (
                                                       <div key={req._id} className="group bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl hover:bg-white/[0.08] transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
                                                            <div className="flex gap-6 items-center">
                                                                 <div className="relative">
                                                                      <img
                                                                           src={req.imageUrl}
                                                                           alt={req.name}
                                                                           className="w-24 h-24 object-cover rounded-2xl border border-white/10 shadow-lg group-hover:scale-105 transition-transform"
                                                                           onError={(e) => e.target.src = 'https://via.placeholder.com/150'}
                                                                      />
                                                                 </div>
                                                                 <div className="space-y-1.5">
                                                                      <h4 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{req.name}</h4>
                                                                      <p className="text-sm text-blue-200/60 leading-relaxed font-medium">
                                                                           <span className="text-xs uppercase tracking-wider text-blue-400 mr-2">Items:</span>
                                                                           {req.items.join(', ')}
                                                                      </p>
                                                                      <div className="flex items-center gap-3 pt-1">
                                                                           <span className="text-xs px-2.5 py-1 bg-blue-500/20 text-blue-400 rounded-lg border border-blue-500/20 font-bold uppercase tracking-tighter">
                                                                                {req.category}
                                                                           </span>
                                                                           <span className="text-xs px-2.5 py-1 bg-indigo-500/20 text-indigo-400 rounded-lg border border-indigo-500/20 font-bold uppercase tracking-tighter">
                                                                                {req.season.join(', ')}
                                                                           </span>
                                                                      </div>
                                                                 </div>
                                                            </div>
                                                            <div className="flex items-center gap-2 pt-4 md:pt-0">
                                                                 <button onClick={() => handleApprove(req._id)} className="flex-1 md:flex-none px-6 py-3 bg-emerald-500/10 hover:bg-emerald-500 border border-emerald-500/20 text-emerald-400 hover:text-white rounded-xl transition-all font-bold text-sm">
                                                                      Approve
                                                                 </button>
                                                                 <button onClick={() => handleReject(req._id)} className="flex-1 md:flex-none px-6 py-3 bg-rose-500/10 hover:bg-rose-500 border border-rose-500/20 text-rose-400 hover:text-white rounded-xl transition-all font-bold text-sm">
                                                                      Reject
                                                                 </button>
                                                            </div>
                                                       </div>
                                                  ))}
                                             </div>
                                        )
                                   ) : (
                                        feedback.length === 0 ? (
                                             <div className="flex flex-col items-center justify-center py-24 bg-white/5 border border-white/5 rounded-3xl text-center px-6">
                                                  <div className="text-5xl mb-4 opacity-20">💬</div>
                                                  <h3 className="text-xl font-bold text-blue-100">Silence is Golden</h3>
                                                  <p className="text-blue-200/40 mt-2">No user feedback has been submitted yet.</p>
                                             </div>
                                        ) : (
                                             <div className="grid gap-6">
                                                  {feedback.map(item => (
                                                       <div key={item._id} className="group bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl hover:bg-white/[0.08] transition-all shadow-xl">
                                                            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                                                                 <div>
                                                                      <h4 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors uppercase tracking-tight">{item.name}</h4>
                                                                      <p className="text-sm text-blue-200/40 font-medium lowercase italic">{item.email}</p>
                                                                 </div>
                                                                 <div className="flex gap-1 py-2 px-4 bg-white/5 rounded-2xl border border-white/10">
                                                                      {Array.from({ length: 5 }).map((_, i) => (
                                                                           <span
                                                                                key={i}
                                                                                className={`text-xl leading-none transition-all ${i < item.rating ? 'text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]' : 'text-white/10'}`}
                                                                           >
                                                                                ★
                                                                           </span>
                                                                      ))}
                                                                 </div>
                                                            </div>
                                                            <p className="text-blue-100/80 leading-relaxed text-lg font-medium py-4 border-y border-white/5 italic">
                                                                 "{item.message}"
                                                            </p>
                                                            <div className="mt-6 flex items-center justify-between text-xs text-blue-200/30 font-bold uppercase tracking-widest">
                                                                 <span>Verified Submission</span>
                                                                 <span>{new Date(item.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                                            </div>
                                                       </div>
                                                  ))}
                                             </div>
                                        )
                                   )}
                              </div>
                         )}
                    </main>
               </div>
          </div>
     );
};

export default AdminDashboard;
