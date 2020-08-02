const baseUrl = 'http://localhost:3000/companies'

export const getCompanies = (identifier) => {
  return fetch(`${baseUrl}/search?identifier=${identifier}`)
    .then(res => res.json())
    .then(response => response)
}

export const getCompany = (symbol) => {
  return fetch(`${baseUrl}/${symbol}`)
    .then(res => res.json())
    .then(response => response.company)
}