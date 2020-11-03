const baseUrl = '/reports'

export const getPerformanceReportById = (companyId) => {
  return fetch(`${baseUrl}?company_id=${companyId}`)
    .then(res => res.json())
    .then(response => response)
}

export const getPerformanceReportBySymbol = (symbol) => {
  return fetch(`${baseUrl}/${symbol}`)
    .then(res => res.json())
    .then(response => response)
}