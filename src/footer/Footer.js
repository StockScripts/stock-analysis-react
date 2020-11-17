import React from 'react';

function Footer() {
  return (
    <footer className="bg-white">
      <div className="container mx-auto px-6 pt-10 pb-6">
        <div className="text-right text-palette-green-med">
          Data provided by <a href="https://iexcloud.io">IEX Cloud</a>
        </div>
        <div className="text-palette-green-med text-sm italic">
          Disclaimer:
        </div>
        <div className="ml-4 text-palette-green-med text-sm italic">
          We are not financial advisors. Information here should not be considered investment advice.
        </div>
        {/* <div className="flex flex-wrap">
          <div className="w-full md:w-1/4 text-center md:text-left">
            <h5 className="uppercase mb-6 font-bold">Links</h5>
            <ul className="mb-4">
              <li className="mt-2">
                <a href="#" className="text-palette-dark hover:text-palette-green-med">FAQ</a>
              </li>
              <li className="mt-2">
                <a href="#" className="text-palette-dark hover:text-palette-green-med">Help</a>
              </li>
              <li className="mt-2">
                <a href="#" className="text-palette-dark hover:text-palette-green-med">Support</a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 text-center md:text-left">
            <h5 className="uppercase mb-6 font-bold">Legal</h5>
            <ul className="mb-4">
              <li className="mt-2">
                <a href="#" className="text-palette-dark hover:text-palette-green-med">Terms</a>
              </li>
              <li className="mt-2">
                <a href="#" className="text-palette-dark hover:text-palette-green-med">Privacy</a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 text-center md:text-left">
            <h5 className="uppercase mb-6 font-bold">Social</h5>
            <ul className="mb-4">
              <li className="mt-2">
                <a href="#" className="text-palette-dark hover:text-palette-green-med">Facebook</a>
              </li>
              <li className="mt-2">
                <a href="#" className="text-palette-dark hover:text-palette-green-med">Linkedin</a>
              </li>
              <li className="mt-2">
                <a href="#" className="text-palette-dark hover:text-palette-green-med">Twitter</a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 text-center md:text-left">
            <h5 className="uppercase mb-6 font-bold">Company</h5>
            <ul className="mb-4">
              <li className="mt-2">
                <a href="#" className="text-palette-dark hover:text-palette-green-med">Official Blog</a>
              </li>
              <li className="mt-2">
                <a href="#" className="text-palette-dark hover:text-palette-green-med">About Us</a>
              </li>
              <li className="mt-2">
                <a href="#" className="text-palette-dark hover:text-palette-green-med">Contact</a>
              </li>
            </ul>
          </div>
        </div> */}
      </div>
    </footer>
  )
}

export default Footer