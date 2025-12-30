import React from 'react';

const SettingsModal = ({
  isOpen,
  onClose,
  pendingUnit,
  setPendingUnit,
  pendingGender,
  setPendingGender,
  onSave
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-[var(--bg-secondary)] backdrop-blur-xl border border-[var(--border-color)] rounded-3xl p-8 max-w-md w-full shadow-2xl animate-fade-in-up text-[var(--text-primary)]">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold tracking-wide">Settings</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[var(--card-hover)] transition text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Settings Options */}
        <div className="space-y-8">
          
          {/* Unit Selection */}
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-3 uppercase tracking-wider">Temperature Unit</label>
            <div className="flex bg-[var(--card-bg)] rounded-xl p-1 border border-[var(--border-color)] gap-2">
              <button
                onClick={() => setPendingUnit('C')}
                className={`flex-1 py-2 rounded-lg font-bold transition-all ${
                  pendingUnit === 'C' 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'bg-transparent text-[var(--text-secondary)] hover:bg-[var(--card-hover)]'
                }`}
              >
                Celsius (°C)
              </button>
              <button
                onClick={() => setPendingUnit('F')}
                className={`flex-1 py-2 rounded-lg font-bold transition-all ${
                  pendingUnit === 'F' 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'bg-transparent text-[var(--text-secondary)] hover:bg-[var(--card-hover)]'
                }`}
              >
                Fahrenheit (°F)
              </button>
            </div>
          </div>

          {/* Gender Selection */}
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-3 uppercase tracking-wider">Outfit Preference</label>
            <div className="flex bg-[var(--card-bg)] rounded-xl p-1 border border-[var(--border-color)] gap-2">
              <button
                onClick={() => setPendingGender('female')}
                className={`flex-1 py-2 rounded-lg font-bold transition-all ${
                  pendingGender === 'female' 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'bg-transparent text-[var(--text-secondary)] hover:bg-[var(--card-hover)]'
                }`}
              >
                Female
              </button>
              <button
                onClick={() => setPendingGender('male')}
                className={`flex-1 py-2 rounded-lg font-bold transition-all ${
                  pendingGender === 'male' 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'bg-transparent text-[var(--text-secondary)] hover:bg-[var(--card-hover)]'
                }`}
              >
                Male
              </button>
            </div>
            <p className="text-xs text-[var(--text-tertiary)] mt-2 text-center">Customize outfit suggestions based on your style.</p>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="flex gap-4 mt-8 pt-6 border-t border-[var(--border-color)]">
          <button 
            onClick={onClose}
            className="flex-1 py-3 rounded-full hover:bg-white/10 transition font-medium text-white/80"
          >
            Cancel
          </button>
          <button 
            onClick={onSave}
            className="flex-1 py-3 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold shadow-lg shadow-indigo-600/30 transition hover:scale-105"
          >
            Save Changes
          </button>
        </div>

      </div>
    </div>
  );
};

export default SettingsModal;
