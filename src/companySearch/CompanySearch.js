import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { getCompanies, getCompany } from './companyAPI'
import { CompanyContext } from '../App'

function CompanySearch(props) {
  let history = useHistory()
  const [ticker, setTicker] = useState()
  const  [companies, setCompanies] = useState()
  const  [selectedCompany, setSelectedCompany] = useState()

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

  useEffect(() => {
    if (selectedCompany) {
      getCompany(selectedCompany).then(company => {
        setCompany(company)
        history.push('/report')
      })
    }
  }, [selectedCompany])

  const handleChange = (e) => {
    setTicker(e.target.value)
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (ticker) {
      setSelectedCompany(ticker)
      clearEntry()
    }
  }

  const clearEntry = () => {
    setCompanies([])
    setTicker('')
  }

  const selectCompany = (e) => {
    const value = e.target.value
    let selectedCompany = companies.find(company => {
      if (company.id) {
        return company.id.toString() === value
      }
      return company.symbol === value
    })
    if (selectedCompany.id) {
      setCompany(selectedCompany)
      history.push('/report')
    } else {
      setSelectedCompany(selectedCompany.symbol)
    }
    clearEntry()
  }

  const renderDropdown = () => {
    if (!!companies && companies.length > 0) {
      let companyItems = companies.map(company =>
        <option
          key={company.symbol}
          className="block px-4 py-2 text-md leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900 whitespace-normal"
          value={company.id || company.symbol} onClick={selectCompany}
        >
          {company.symbol} - {company.name || company.securityName}
        </option>
      )
      companyItems.unshift(<option key='hidden' hidden></option>)  //first option is automatically selected when user presses enter
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
      <form autoComplete="off" onSubmit={handleSubmit}>
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