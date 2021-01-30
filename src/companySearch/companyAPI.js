const baseUrl = '/companies'

export const getCompanies = (identifier) => {
  return fetch(`${baseUrl}?identifier=${identifier}`)
    .then(response => {
      if (!response.ok) {
        return response
      }
      return response.json()
    })
}

export const getCompany = (symbol) => {
  return fetch(`${baseUrl}/${symbol}`)
    .then(response => {
      return response.json()
    })
}