import React from 'react';
import {
  getPerformanceReportById,
  getPerformanceReportByTicker
} from './performanceReportAPI'
import RevenueItem from './lineItems/RevenueItem'
import ProfitItem from './lineItems/ProfitItem'
import ReturnsItem from './lineItems/ReturnsItem'
import FreeCashFlowItem from './lineItems/FreeCashFlowItem'
import LeverageItem from './lineItems/LeverageItem'
import DebtRepaymentItem from './lineItems/DebtRepaymentItem'
import LiquidityItem from './lineItems/LiquidityItem'
import DividendItem from './lineItems/DividendItem'
import RedFlagsItem from './lineItems/RedFlagsItem'

function PerformanceReport({company}) {
  const [reportData, setReportData] = React.useState(null)

  React.useEffect(() => {
    if (!!company) {
      getPerformanceReportById(company.id).then(reportData => {
        setReportData(reportData)
      })
      return
    }
  }, [company])

  const formatValue = (value) => {
    const numDigits = value.toString().length
    if (numDigits > 9) {
      return `${(value/1000000000).toString()}B`
    } else if (numDigits > 6) {
      return `${(value/1000000).toString()}M`
    }
    return value
  }

  const renderTable = (data) => {
    const {performance_reports} = data
    const year1 = performance_reports.find(obj => obj.year_number === 1)
    const year2 = performance_reports.find(obj => obj.year_number === 2)
    const year3 = performance_reports.find(obj => obj.year_number === 3)
    const year4 = performance_reports.find(obj => obj.year_number === 4)
    return (
      <div>
        <table className="shadow-lg bg-white mb-10">
          <tr>
            <th className="bg-indigo-100 border-t border-l border-r-0 text-left px-8 py-4"></th>
            <th className="bg-indigo-100 border-t border-r-0 text-left px-8 py-4 text-indigo-800">{year1.fiscal_date}</th>
            <th className="bg-indigo-100 border-t border-r-0 text-left px-8 py-4 text-indigo-800">{year2.fiscal_date}</th>
            <th className="bg-indigo-100 border-t border-r-0 text-left px-8 py-4 text-indigo-800">{year3.fiscal_date}</th>
            <th className="bg-indigo-100 border-t border-r text-left px-8 py-4 text-indigo-800">{year4.fiscal_date}</th>
          </tr>
          <RevenueItem data={{year1, year2, year3, year4}} />
          <ProfitItem data={{year1, year2, year3, year4}} />
          <ReturnsItem data={{year1, year2, year3, year4}} />
          <FreeCashFlowItem data={{year1, year2, year3, year4}} />
          <LeverageItem data={{year1, year2, year3, year4}} />
          <DebtRepaymentItem data={{year1, year2, year3, year4}} />
          <LiquidityItem data={{year1, year2, year3, year4}} />
          <DividendItem data={{year1, year2, year3, year4}} />
          <RedFlagsItem
            data={{
              receivablesToSales: {
                year1: year1.receivables_to_sales,
                year2: year2.receivables_to_sales,
                year3: year3.receivables_to_sales,
                year4: year4.receivables_to_sales
              },
              inventoryToSales: {
                year1: year1.inventory_to_sales,
                year2: year2.inventory_to_sales,
                year3: year3.inventory_to_sales,
                year4: year4.inventory_to_sales
              },
              opExToSales: {
                year1: year1.operating_expense_to_sales,
                year2: year2.operating_expense_to_sales,
                year3: year3.operating_expense_to_sales,
                year4: year4.operating_expense_to_sales
              },
              sgaToSales: {
                year1: year1.sga_to_sales,
                year2: year2.sga_to_sales,
                year3: year3.sga_to_sales,
                year4: year4.sga_to_sales
              }
            }}
          />
        </table>
      </div>
    )
  }

  return (
    company ? <div className="static">
      <div className="text-center">
        <div className="inline-block">
          <div className="text-left text-indigo-800 text-xl font-bold m-3">
            {`${company.name} (${company.ticker})`}
          </div>
          <div>{reportData ? renderTable(reportData) : null}</div>
        </div>
      </div>
    </div>
    : null
  )
}

export default PerformanceReport