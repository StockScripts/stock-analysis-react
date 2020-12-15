import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine } from '@fortawesome/free-solid-svg-icons'
import CompanySearch from '../companySearch/CompanySearch'

function NavBar() {
  return (
    <nav className="bg-white pt-2 md:pt-1 pb-1 px-1 mt-0 h-auto fixed w-full z-20 top-0">
      <div className="flex flex-wrap items-center">
        <div class="flex flex-shrink md:w-1/3 justify-center md:justify-start text-white ml-3">
          <a className="text-palette-green-dark no-underline hover:no-underline font-bold text-2xl lg:text-4xl"  href="/"> 
            {/* <FontAwesomeIcon icon={faChartLine} /> */}
            <span className="ml-4">GrasshopperStocks</span>
          </a>
        </div>
        <div className="flex flex-1 md:w-1/3 justify-center md:justify-start text-white px-2">
          <span className="relative w-full">
            <CompanySearch />
              {/* <input type="search" placeholder="Search" className="w-full bg-gray-800 text-sm text-white transition border border-transparent focus:outline-none focus:border-gray-700 rounded py-1 px-2 pl-10 appearance-none leading-normal"/> */}
              {/* <div className="absolute search-icon">
                <svg className="fill-current pointer-events-none text-white w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
                </svg>
              </div> */}
          </span>
			  </div>

        <div className="flex w-full pt-2 content-center justify-between md:w-1/3 md:justify-end">
          <ul className="list-reset flex justify-between flex-1 md:flex-none items-center">
            {/* <li className="flex-1 md:flex-none md:mr-3">
              <a className="inline-block py-2 px-4 text-gray no-underline" href="#">Active</a>
            </li> */}
            <li className="flex-1 md:flex-none md:mr-3">
              <a className="inline-block text-palette-green-dark no-underline hover:text-palette-green-med py-2 px-4" href="http://blog.grasshopperstocks.com">Blog</a>
            </li>
            <li className="flex-1 md:flex-none md:mr-3">
              <div className="relative inline-block">
                <div id="myDropdown" className="dropdownlist absolute bg-gray-900 text-white right-0 mt-3 p-3 overflow-auto z-30 invisible">
                    <input type="text" className="drop-search p-2 text-gray-600" placeholder="Search.." id="myInput" onkeyup="filterDD('myDropdown','myInput')"/>
                    <a href="#" className="p-2 hover:bg-gray-800 text-white text-sm no-underline hover:no-underline block"><i className="fa fa-user fa-fw"></i> Profile</a>
                    <a href="#" className="p-2 hover:bg-gray-800 text-white text-sm no-underline hover:no-underline block"><i className="fa fa-cog fa-fw"></i> Settings</a>
                    <div className="border border-gray-800"></div>
                    <a href="#" className="p-2 hover:bg-gray-800 text-white text-sm no-underline hover:no-underline block"><i class="fas fa-sign-out-alt fa-fw"></i> Log Out</a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>

     /* <nav class="bg-gray-900 pt-2 md:pt-1 pb-1 px-1 mt-0 h-auto fixed w-full z-20 top-0">
       <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">
          
         <div className="pl-4 flex items-center">
           <a className="toggleColour text-white no-underline hover:no-underline font-bold text-2xl lg:text-4xl"  href="/"> 
             <FontAwesomeIcon icon={faChartLine} />
             <span className="ml-4">PixyStocks</span>
           </a>
         </div>

         <div className="block lg:hidden pr-4">
           <button id="nav-toggle" className="flex items-center p-1 text-orange-800 hover:text-gray-900">
             <svg className="fill-current h-6 w-6" viewBox="0 0 20 20" xmlns="http:www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
           </button>
         </div>

         <div className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block mt-2 lg:mt-0 bg-white lg:bg-transparent text-black p-4 lg:p-0 z-20" id="nav-content">
           <ul className="list-reset lg:flex justify-end flex-1 items-center">
             <li className="mr-3">
               <a className="inline-block py-2 px-4 text-black font-bold no-underline" href="/">Active</a>
             </li>
             <li className="mr-3">
               <a className="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4" href="/">link</a>
             </li>
             <li className="mr-3">
               <a className="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4" href="/">link</a>
             </li>
           </ul>
           <button id="navAction" className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full mt-4 lg:mt-0 py-4 px-8 shadow opacity-75">Action</button>
           <div>
           <CompanySearch />
         </div>
         </div>
       </div>

       <hr className="border-b border-gray-100 opacity-25 my-0 py-0" />
     </nav>

     <nav className="flex items-center justify-between flex-wrap bg-indigo-600 p-6">
     <div className="flex items-center flex-shrink-0 text-white mr-6">
       <svg className="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http:www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"/></svg>
       <span className="font-semibold text-xl tracking-tight">PixyStox</span>
     </div>
     <div className="block lg:hidden">
       <button className="flex items-center px-3 py-2 border rounded text-indigo-200 border-indigo-400 hover:text-white hover:border-white">
         <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http:www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
       </button>
     </div>
     <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
       <div className="text-sm lg:flex-grow">
         <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-indigo-200 hover:text-white mr-4">
           About
         </a>
       </div>
       <div>
         <CompanySearch />
       </div>
     </div>
   </nav> */
  )
}

export default NavBar