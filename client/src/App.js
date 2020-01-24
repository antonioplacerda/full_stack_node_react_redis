import React from 'react';
import './App.css';

import Jobs from './Jobs';

const mockjobs = [
  {
    "title": "SWE", 
    "company": "Google"
  }
];

function App() {
  return (
    <div className="App">
      <Jobs jobs={mockjobs}/>
    </div>
  );
}

export default App;
