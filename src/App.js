import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import NavBar from './navBar/NavBar'
import Home from './home/Home'
import PerformanceReport from './reports/PerformanceReport'

export const CompanyContext = React.createContext()

function App() {
  const [company, setCompany] = React.useState()

  useEffect(() => {
    document.addEventListener('scroll', function() {
      var scrollpos = window.scrollY;
      var header = document.getElementById("header");
      var navcontent = document.getElementById("nav-content");
      var navaction = document.getElementById("navAction");
      // var brandname = document.getElementById("brandname");
      var toToggle = document.querySelectorAll(".toggleColour");

      /*Apply classes for slide in bar*/
      scrollpos = window.scrollY;
    
      if(scrollpos > 10) {
        header.classList.add("bg-white");
        navaction.classList.remove("bg-white");
        navaction.classList.add("gradient");
        navaction.classList.remove("text-indigo-800");
        navaction.classList.add("text-white");
        //Use to switch toggleColour colours
        for (var i = 0; i < toToggle.length; i++) {
          toToggle[i].classList.add("text-indigo-800");
          toToggle[i].classList.remove("text-white");
        }

        header.classList.add("shadow");
        navcontent.classList.remove("bg-indigo-100");
        navcontent.classList.add("bg-white");
      } else {
        header.classList.remove("bg-white");
        navaction.classList.remove("gradient");
        navaction.classList.add("bg-white");
        navaction.classList.remove("text-white");
        navaction.classList.add("text-indigo-800");
        //Use to switch toggleColour colours
          for (i = 0; i < toToggle.length; i++) {
            toToggle[i].classList.add("text-white");
          toToggle[i].classList.remove("text-indigo-800");
        }
        
        header.classList.remove("shadow");
        navcontent.classList.remove("bg-white");
        navcontent.classList.add("bg-gray-100");
      }
    })
  })

  return (
    <div className="App">
      <CompanyContext.Provider value={setCompany}>
        <Router>
          <NavBar />
          <Switch>
            <Route exact path="/"><Home /></Route>
            <Route path="/report"><PerformanceReport company={company} /></Route>
          </Switch>
        </Router>
      </CompanyContext.Provider>
    </div>
  );
}

export default App;
