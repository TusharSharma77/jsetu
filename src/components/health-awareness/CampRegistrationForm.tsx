import React, { useState } from 'react';

const CampRegistrationForm: React.FC<{ onClose: () => void; type?: 'camp' | 'slot' }> = ({ onClose, type = 'camp' }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    camp: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(onClose, 2000); 
  };

  if (submitted) {
    return (
      <div className="p-8 bg-white rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4">{type === 'slot' ? 'Slot Booked!' : 'Registration Successful!'}</h2>
        <p className="text-gray-700">Thank you for {type === 'slot' ? 'booking your slot.' : 'joining the health camp.'}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md mx-auto text-gray-900 dark:text-white">
      <h2 className="text-2xl font-bold mb-6">{type === 'slot' ? 'Book Slot' : 'Health Camp Registration'}</h2>
      
      {/* Name section */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Name</label>
        <input 
          name="name" 
          value={form.name} 
          onChange={handleChange} 
          required 
          className="w-full px-3 py-2 border rounded-md text-gray-900 dark:text-white dark:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-500" 
        />
      </div>
      
      {/* Email section */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Email</label>
        <input 
          name="email" 
          value={form.email} 
          onChange={handleChange} 
          required 
          type="email" 
          className="w-full px-3 py-2 border rounded-md text-gray-900 dark:text-white dark:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-500" 
        />
      </div>
      
      {/* Phone number section */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Phone Number</label>
        <input 
          name="phone" 
          value={form.phone} 
          onChange={handleChange} 
          required 
          type="tel" 
          className="w-full px-3 py-2 border rounded-md text-gray-900 dark:text-white dark:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-500" 
        />
      </div>
      
      {/* Camp/Slot selection section */}
      <div className="mb-6">
        <label className="block mb-1 font-medium">Select Camp/Slot</label>
        <select 
          name="camp" 
          value={form.camp} 
          onChange={handleChange} 
          required 
          className="w-full px-3 py-2 border rounded-md text-gray-900 dark:text-white dark:bg-gray-700"
        >
          <option value="">Choose...</option>
          <option value="General Health">General Health</option>
          <option value="Eye Checkup">Eye Checkup</option>
          <option value="Dental">Dental</option>
          <option value="Women Health">Women Health</option>
        </select>
      </div>
      
      {/* Submit and Cancel buttons */}
      <div className="flex justify-between">
        <button 
          type="submit" 
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          {type === 'slot' ? 'Book Slot' : 'Register'}
        </button>
        <button 
          type="button" 
          onClick={onClose} 
          className="bg-gray-300 px-4 py-2 rounded-md"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CampRegistrationForm;
