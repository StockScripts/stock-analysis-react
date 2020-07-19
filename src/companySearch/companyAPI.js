const baseUrl = 'http://localhost:3000/companies'

export const getCompanies = (identifier) => {
  return fetch(`${baseUrl}?identifier=${identifier}`)
    .then(res => res.json())
    .then(response => response)
}