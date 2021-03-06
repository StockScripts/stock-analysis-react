import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getCompanies, getCompany } from './companyAPI'
import Notification from '../components/modal/Notification'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

function CompanySearch(props) {
  let history = useHistory()
  const [ticker, setTicker] = useState()
  const  [companies, setCompanies] = useState()
  const  [error, setError] = useState()
  const  [selectedCompany, setSelectedCompany] = useState()
  const  [displayDropdown, setDisplayDropdown] = useState(false)

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
          setError(errorMessage)
        }
      })
      .catch(_error => {
        setError(errorMessage)
      })
  }, [ticker])

  useEffect(() => {
    if (selectedCompany) {
      getCompany(selectedCompany).then(response => {
        if (response.hasOwnProperty('errors')) {
          setError(response.errors)
        } else {
          history.push(`/report/${response.company.symbol}`)
          setSelectedCompany(null)
        }
      })
    }
  }, [selectedCompany, history])

  const handleChange = (e) => {
    setDisplayDropdown(true)
    setTicker(e.target.value)
  }

  const handleInputClick = (e) => {
    e.preventDefault()
    if (ticker) {
      return
    }
    setDisplayDropdown(false)
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
          className="block px-4 py-2 text-md leading-5 text-gray-700 hover:bg-gray-100 hover:text-palette-green-dark focus:outline-none focus:bg-gray-100 focus:text-gray-900 whitespace-normal"
          value={company.id || company.symbol} onClick={selectCompany}
        >
          {company.symbol} - {company.name || company.securityName}
        </option>
      )
      companyItems.unshift(<option key='hidden' hidden></option>)  //first option is automatically selected when user presses enter
      return (
        <div
          className="absolute left-0 mt-2 w-56 shadow-lg rounded bg-white cursor-pointer"
        >
          {companyItems}
        </div>
      )
    }
  }

  let displayError = error ? true : false
  return (
    <>
      {displayError ? <Notification title='Oops' notification={error} onClose={onClose} /> : null}
      <div className="relative">
        <form className="flex w-full" autoComplete="off" onSubmit={handleSubmit}>
          <input 
            className="flex-grow bg-white text-palette-dark focus:outline-none focus:shadow-outline border border-gray-300 rounded shadow py-2 px-4 m-2 mr-0 appearance-none leading-normal"
            placeholder="Enter ticker or company"
            value={ticker}
            onChange={handleChange}
            onClick={handleInputClick}
            type="text"
          />
          <button
            className="py-2 px-4 text-palette-green-dark border rounded shadow m-2 ml-0"
            type="submit"
          >
            <FontAwesomeIcon icon={faSearch} size="lg"/>
          </button>
        </form>
        {displayDropdown ? renderDropdown() : null}
      </div>
    </>
  )
}

export default CompanySearch