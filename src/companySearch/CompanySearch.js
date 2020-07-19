import React, { useState, useEffect, useContext } from 'react';
import { getCompanies } from './companyAPI'
import { CompanyContext } from '../App'

function CompanySearch() {
  const [ticker, setTicker] = useState()
  const  [companies, setCompanies] = useState()

  const setCompany = useContext(CompanyContext)

  useEffect(() => {
    if (!ticker) {
      setCompanies([])
      return
    }

    getCompanies(ticker).then(data => {
      setCompanies(data.companies)
    })
  }, [ticker])

  const handleChange = (e) => {
    setTicker(e.target.value)
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (ticker) {
      const selectedCompany = companies.find(company => (
        company.ticker.toLowerCase() == ticker.toLowerCase()
      ))
      setCompany(selectedCompany)
      clearEntry()
    }
  }

  const clearEntry = () => {
    setCompanies([])
    setTicker('')
  }

  const selectCompany = (e) => {
    const selectedCompany = companies.find(company => (company.id == e.target.value))
    setCompany(selectedCompany)
    clearEntry()
  }

  const renderDropdown = () => {
    if (!!companies && companies.length > 0) {
      let companyItems = companies.map(company =>
        <option
          className="block px-4 py-2 text-md leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900 whitespace-normal"
          value={company.id} onClick={selectCompany}
        >
          {company.ticker} - {company.name}
        </option>
      )
      companyItems.unshift(<option hidden></option>)  //first option is automatically selected when user presses enter
      return (
        <div
          className="absolute left-0 mt-2 w-56 shadow-lg rounded bg-white"
        >
          {companyItems}
        </div>
      )
    }
  }

  return (
    <div className="relative">
      <form autocomplete="off" onSubmit={handleSubmit}>
        <input 
          className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded shadow py-2 px-4 m-2 appearance-none leading-normal"
          placeholder="Ticker or Company"
          value={ticker}
          onChange={handleChange}
          type="text"
        />
        {renderDropdown()}
        <button
        className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 border border-indigo-400 rounded shadow m-2"
          type="submit"
        >
          Search
        </button>
      </form>
    </div>
  )
}

export default CompanySearch