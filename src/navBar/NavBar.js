import React from 'react';
import CompanySearch from '../companySearch/CompanySearch'

function NavBar() {
  return (
    <nav id="header" className="fixed w-full z-30 top-0 text-white font-sans">

    <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">
        
      <div className="pl-4 flex items-center">
        <a className="toggleColour text-white no-underline hover:no-underline font-bold text-2xl lg:text-4xl"  href="/"> 
          <svg className="fill-current h-8 w-8 mr-2 inline" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"/></svg>
          PixyStocks
        </a>
      </div>

      <div className="block lg:hidden pr-4">
        <button id="nav-toggle" className="flex items-center p-1 text-orange-800 hover:text-gray-900">
          <svg className="fill-current h-6 w-6" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
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

  //   <nav className="flex items-center justify-between flex-wrap bg-indigo-600 p-6">
  //   <div className="flex items-center flex-shrink-0 text-white mr-6">
  //     <svg className="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"/></svg>
  //     <span className="font-semibold text-xl tracking-tight">PixyStox</span>
  //   </div>
  //   <div className="block lg:hidden">
  //     <button className="flex items-center px-3 py-2 border rounded text-indigo-200 border-indigo-400 hover:text-white hover:border-white">
  //       <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
  //     </button>
  //   </div>
  //   <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
  //     <div className="text-sm lg:flex-grow">
  //       <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-indigo-200 hover:text-white mr-4">
  //         About
  //       </a>
  //     </div>
  //     <div>
  //       <CompanySearch />
  //     </div>
  //   </div>
  // </nav>
  )
}

export default NavBar