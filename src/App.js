import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import NavBar from './navBar/NavBar'
import Footer from './footer/Footer'
import Home from './home/Home'
import PerformanceReport from './reports/PerformanceReport'

export const CompanyContext = React.createContext()

function App() {
  // useEffect(() => {
  //   document.addEventListener('scroll', function() {
  //     var scrollpos = window.scrollY;
  //     var header = document.getElementById("header");
  //     var navcontent = document.getElementById("nav-content");
  //     var navaction = document.getElementById("navAction");
  //     // var brandname = document.getElementById("brandname");
  //     var toToggle = document.querySelectorAll(".toggleColour");

  //     /*Apply classes for slide in bar*/
  //     scrollpos = window.scrollY;
    
  //     if(scrollpos > 10) {
  //       header.classList.add("bg-white");
  //       navaction.classList.remove("bg-white");
  //       navaction.classList.add("gradient");
  //       navaction.classList.remove("text-indigo-800");
  //       navaction.classList.add("text-white");
  //       //Use to switch toggleColour colours
  //       for (var i = 0; i < toToggle.length; i++) {
  //         toToggle[i].classList.add("text-indigo-800");
  //         toToggle[i].classList.remove("text-white");
  //       }

  //       header.classList.add("shadow");
  //       navcontent.classList.remove("bg-indigo-100");
  //       navcontent.classList.add("bg-white");
  //     } else {
  //       header.classList.remove("bg-white");
  //       navaction.classList.remove("gradient");
  //       navaction.classList.add("bg-white");
  //       navaction.classList.remove("text-white");
  //       navaction.classList.add("text-indigo-800");
  //       //Use to switch toggleColour colours
  //         for (i = 0; i < toToggle.length; i++) {
  //           toToggle[i].classList.add("text-white");
  //         toToggle[i].classList.remove("text-indigo-800");
  //       }
        
  //       header.classList.remove("shadow");
  //       navcontent.classList.remove("bg-white");
  //       navcontent.classList.add("bg-gray-100");
  //     }
  //   })

  //   var navMenuDiv = document.getElementById("nav-content");
  //   var navMenu = document.getElementById("nav-toggle");
    
  //   document.onclick = check;
  //   function check(e){
  //     var target = (e && e.target);
      
  //     //Nav Menu
  //     if (!checkParent(target, navMenuDiv)) {
  //     // click NOT on the menu
  //     if (checkParent(target, navMenu)) {
  //       // click on the link
  //       if (navMenuDiv.classList.contains("hidden")) {
  //       navMenuDiv.classList.remove("hidden");
  //       } else {navMenuDiv.classList.add("hidden");}
  //     } else {
  //       // click both outside link and outside menu, hide menu
  //       navMenuDiv.classList.add("hidden");
  //     }
  //     }
      
  //   }
  //   function checkParent(t, elm) {
  //     while(t.parentNode) {
  //     if( t == elm ) {return true;}
  //     t = t.parentNode;
  //     }
  //     return false;
  //   }
  // })

  return (
    <div className="flex flex-col h-screen">
      {/* <CompanyContext.Provider> */}
        <Router>
          <NavBar />
          <Switch>
            <Route exact path="/"><Home /></Route>
            {/* <Route path="/report"><PerformanceReport company={company} /></Route> */}
            <Route path="/report/:company"><PerformanceReport /></Route>
          </Switch>
        </Router>
        <Footer />
      {/* </CompanyContext.Provider> */}
    </div>
  );
}

export default App;
