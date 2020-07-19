import React from 'react';
import NavBar from './navBar/NavBar'
import PerformanceReport from './reports/PerformanceReport'

export const CompanyContext = React.createContext()

function App() {
  const [company, setCompany] = React.useState()

  return (
    <div className="App">
      <CompanyContext.Provider value={setCompany}>
        <NavBar />
        <PerformanceReport company={company} />
      </CompanyContext.Provider>
    </div>
  );
}

export default App;
