import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getCompanies, getCompany } from './companyAPI'
import Notification from '../components/modal/Notification'

function CompanySearch(props) {
  let history = useHistory()
  const [ticker, setTicker] = useState()
  const  [companies, setCompanies] = useState()
  const  [error, setError] = useState()
  const  [selectedCompany, setSelectedCompany] = useState()

  const errorMessage = "Something went wrong and we couldn't process your request."
  useEffect(() => {
    if (!ticker) {
      setCompanies([])
      return
    }

    getCompanies(ticker)
      .then(response => {
        if (response.hasOwnProperty('companies')) {
          setCompanies(response.companies)
          setError(null)
        } else {
          // setError(response.status)
          setError(errorMessage)
        }
      })
      .catch(error => {
        setError(errorMessage)
      })
  }, [ticker])

  useEffect(() => {
    if (selectedCompany) {
      getCompany(selectedCompany).then(data => {
        history.push(`/report/${data.company.symbol}`)
      })
    }
  }, [selectedCompany, history])

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
    setSelectedCompany(selectedCompany.symbol)
    clearEntry()
  }

  const onClose = () => {
    setError(null)
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

  let displayError = error ? 'Error' : null
  return (
    <>
      {displayError ? <Notification title='Oops' notification={error} onClose={onClose} /> : null}
      <div className="relative">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <input 
            className="md:w-full bg-white text-palette-dark focus:outline-none focus:shadow-outline border border-gray-300 rounded shadow py-2 px-4 m-2 appearance-none leading-normal"
            placeholder="Enter ticker or company"
            value={ticker}
            onChange={handleChange}
            type="text"
          />
          {renderDropdown()}
          {/* <button
            id="navAction"
            className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full mt-4 lg:mt-0 py-4 px-8 shadow opacity-75"
            type="submit"
          >
            Search
          </button> */}
          {/* <button
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 border border-indigo-400 rounded shadow m-2"
            type="submit"
          >
            Search
          </button> */}
        </form>
      </div>
    </>
  )
}

export default CompanySearch