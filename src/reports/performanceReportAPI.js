const baseUrl = 'http://localhost:3000/performance_reports'

export const getPerformanceReportById = (companyId) => {
  return fetch(`${baseUrl}?reports_for=${companyId}`)
    .then(res => res.json())
    .then(response => response)
}

export const getPerformanceReportByTicker = (ticker) => {
  return fetch(`${baseUrl}?reports_for=${1}`)
    .then(res => res.json())
    .then(response => response)
}