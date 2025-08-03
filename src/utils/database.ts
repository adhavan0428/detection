export const initializeDatabase = () => {
  // Initialize localStorage database structure
  if (!localStorage.getItem('cyberShieldHistory')) {
    localStorage.setItem('cyberShieldHistory', JSON.stringify([]));
  }
  
  if (!localStorage.getItem('cyberShieldSettings')) {
    localStorage.setItem('cyberShieldSettings', JSON.stringify({
      sensitivity: 'medium',
      enableFeedback: true,
      autoSave: true
    }));
  }
};

export const clearDatabase = () => {
  localStorage.removeItem('cyberShieldHistory');
  localStorage.removeItem('cyberShieldSettings');
  initializeDatabase();
};