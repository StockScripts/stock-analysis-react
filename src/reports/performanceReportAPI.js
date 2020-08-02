const baseUrl = 'http://localhost:3000/performance_reports'

export const getPerformanceReportById = (companyId) => {
  return fetch(`${baseUrl}?company_id=${companyId}`)
    .then(res => res.json())
    .then(response => response)
}

export const getPerformanceReportByTicker = (ticker) => {
  return fetch(`${baseUrl}?reports_by_ticker=${ticker}`)
    .then(res => res.json())
    .then(response => response)
}