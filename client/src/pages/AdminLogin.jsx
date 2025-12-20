import React, { useState } from 'react';
import { loginAdmin } from '../api/adminApi';

const AdminLogin = ({ onLogin }) => {
     const [username, setUsername] = useState('');
     const [password, setPassword] = useState('');
     const [error, setError] = useState('');

     const handleSubmit = async (e) => {
          e.preventDefault();
          try {
               const data = await loginAdmin(username, password);
               // Save to local storage
               localStorage.setItem('adminUser', JSON.stringify(data));
               onLogin(data);
          } catch (err) {
               setError('Invalid Credentials');
          }
     };

     return (
          <div className="flex flex-col items-center justify-center min-h-[50vh] pt-20">
               <div className="w-full max-w-md p-8 bg-black/50 border border-white/20 rounded-xl backdrop-blur-sm shadow-2xl">
                    <h2 className="text-3xl font-bold mb-8 text-center text-white tracking-wider">Admin Access</h2>
                    {error && <p className="text-red-400 text-center mb-4">{error}</p>}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                         <input
                              type="text"
                              placeholder="Username"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                              required
                              className="p-4 rounded-md bg-white text-black border-none focus:ring-2 focus:ring-white/50 outline-none placeholder-gray-500"
                         />
                         <input
                              type="password"
                              placeholder="Password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                              className="p-4 rounded-md bg-white text-black border-none focus:ring-2 focus:ring-white/50 outline-none placeholder-gray-500"
                         />
                         <button 
                              type="submit" 
                              className="p-4 mt-2 bg-white text-black font-bold uppercase tracking-widest rounded-md hover:bg-gray-200 transition-colors"
                         >
                              Login
                         </button>
                    </form>
               </div>
          </div>
     );
};

export default AdminLogin;
