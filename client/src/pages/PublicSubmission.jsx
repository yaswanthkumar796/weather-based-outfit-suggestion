import React, { useState } from 'react';
import { createOutfit } from '../api/outfitApi';
import './AdminPage.css'; // Reusing existing CSS or rename file if preferred

const PublicSubmission = () => {
     const [formData, setFormData] = useState({
          name: '',
          category: 'Casual',
          items: '',
          imageUrl: '',
          season: 'Summer',
          gender: 'Unisex'
     });
     const [message, setMessage] = useState('');

     const handleChange = (e) => {
          setFormData({ ...formData, [e.target.name]: e.target.value });
     };

     const handleSubmit = async (e) => {
          e.preventDefault();
          try {
               // Prepare data for backend
               const payload = {
                    ...formData,
                    items: formData.items.split(',').map(item => item.trim()),
                    season: [formData.season],
               };

               await createOutfit(payload);
               setMessage('✅ Outfit Submitted for Approval!'); // Message updated

               // Reset form fields
               setFormData({
                    ...formData,
                    name: '',
                    items: '',
                    imageUrl: ''
               });

               setTimeout(() => setMessage(''), 3000);

          } catch (error) {
               console.error(error);
               setMessage('❌ Error submitting outfit.');
          }
     };

     return (
          <div className="admin-container">
               <h2>Submit New Outfit</h2>
               <p style={{ textAlign: 'center', marginBottom: '20px', color: '#666' }}>
                    Your outfit will be reviewed by an admin before appearing on the site.
               </p>
               {message && <p className="msg">{message}</p>}

               <form onSubmit={handleSubmit}>
                    <input
                         name="name"
                         placeholder="Outfit Name (e.g. Sunny Day Look)"
                         value={formData.name}
                         onChange={handleChange}
                         required
                    />

                    <input
                         name="imageUrl"
                         placeholder="Image URL (http://...)"
                         value={formData.imageUrl}
                         onChange={handleChange}
                         required
                    />

                    <input
                         name="items"
                         placeholder="Items (comma separated: Shirt, Jeans)"
                         value={formData.items}
                         onChange={handleChange}
                         required
                    />

                    <div className="row">
                         <label>Category:
                              <select name="category" value={formData.category} onChange={handleChange}>
                                   <option>Casual</option>
                                   <option>Formal</option>
                                   <option>Sport</option>
                              </select>
                         </label>

                         <label>Season:
                              <select name="season" value={formData.season} onChange={handleChange}>
                                   <option>Summer</option>
                                   <option>Winter</option>
                                   <option>Spring</option>
                                   <option>Fall</option>
                              </select>
                         </label>

                         <label>Gender:
                              <select name="gender" value={formData.gender} onChange={handleChange}>
                                   <option>Unisex</option>
                                   <option>Male</option>
                                   <option>Female</option>
                              </select>
                         </label>
                    </div>





                    <button type="submit">Submit Outfit</button>
               </form>
          </div>
     );
};

export default PublicSubmission;
