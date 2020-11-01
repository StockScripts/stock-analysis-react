import React from 'react';
import { useParams } from 'react-router-dom'
import {
  getPerformanceReportById,
  getPerformanceReportBySymbol
} from './performanceReportAPI'
import RevenueItem from './lineItems/RevenueItem'
import ProfitItem from './lineItems/ProfitItem'
import ReturnsItem from './lineItems/ReturnsItem'
import FreeCashFlowItem from './lineItems/FreeCashFlowItem'
import LiabilitiesItem from './lineItems/LiabilitiesItem'
import LiquidityItem from './lineItems/LiquidityItem'
import DividendItem from './lineItems/DividendItem'
import RedFlagsItem from './lineItems/RedFlagsItem'

function PerformanceReport() {
  let { company } = useParams()

  const [reportData, setReportData] = React.useState(null)
  const [sortedReportData, setSortedReportData] = React.useState(null)
  const [sortedDividendData, setSortedDividendData] = React.useState(null)

  React.useEffect(() => {
    if (!!company) {
      if (typeof company === 'string') {
        getPerformanceReportBySymbol(company).then(reportData => {
          setReportData(reportData)
        })
      } else if (company.id) {
        getPerformanceReportById(company.id).then(reportData => {
          setReportData(reportData)
        })
      }
      return
    }
  }, [company])

  // React.useEffect(() => {
  //   if (reportData) {
  //     let sorted = reportData.performance_reports.sort((a, b) => (a.fiscal_date > b.fiscal_date) ? 1 : -1)
  //     setSortedReportData(sorted)

  //     if (reportData.dividends) {
  //       const dividendHistory = reportData.dividends.history
  //       sorted = Object.keys(dividendHistory).sort((a, b) => (a > b) ? 1 : -1)
  //       sorted = sorted.map(item => {
  //         return {
  //           date: item,
  //           amount: dividendHistory[item]
  //         }
  //       })
  //       setSortedDividendData(sorted)
  //     } else {
  //       setSortedDividendData([])
  //     }
  //   }
  // }, [reportData])

  const renderRevenueItem = () => {
    const revenueItems = reportData.report.map((data) => {
      return {
        fiscalDate: data.fiscal_date,
        totalRevenue: data.revenue,
        totalRevenueYOY: data.revenue_yoy
      }
    })
    return (
      <RevenueItem revenueItems={revenueItems} />
    )
  }

  const renderProfitItem = () => {
    const profitItems = reportData.report.map((data) => {
      return {
        fiscalDate: data.fiscal_date,
        netIncome: data.net_income,
        netIncomeYOY: data.net_income_yoy,
        netMargin: data.net_margin,
        revenue: data.revenue
      }
    })
    return (
      <ProfitItem profitItems={profitItems} />
    )
  }

  const renderReturnsItem = () => {
    const returnsItems = reportData.report.map((data) => {
      return {
        fiscalDate: data.fiscal_date,
        roe: data.roe,
        netIncome: data.net_income,
        equity: data.equity,
        
      }
    })
    return (
      <ReturnsItem returnsItems={returnsItems} />
    )
  }

  const renderFreeCashFlowItem = () => {
    const freeCashFlowItems = reportData.report.map((data) => {
      return {
        fiscalDate: data.fiscal_date,
        freeCashFlow: data.free_cash_flow,
      }
    })
    return (
      <FreeCashFlowItem freeCashFlowItems={freeCashFlowItems} />
    )
  }

  const renderLiabilitiesItem = () => {
    const liabilitiesItems = reportData.report.map((data) => {
      return {
        fiscalDate: data.fiscal_date,
        totalLiabilities: data.total_liabilities,
        shareholderEquity: data.equity,
        leverageRatio: data.leverage_ratio,
        longTermDebt: data.long_term_debt,
        longTermDebtToEquity: data.long_term_debt_to_equity,
        netIncome: data.net_income,
        netIncomeToLongTermDebt: data.net_income_to_long_term_debt,
      }
    })
    return (
      <LiabilitiesItem liabilitiesItems={liabilitiesItems} />
    )
  }

  const renderLiquidityItem = () => {
    const liquidityItems = reportData.report.map((data) => {
      return {
        fiscalDate: data.fiscal_date,
        quickAssets: data.quick_assets,
        currentLiabilities: data.current_liabilities,
        quickRatio: data.quick_ratio,
      }
    })
    return (
      <LiquidityItem liquidityItems={liquidityItems} />
    )
  }

  const renderDividendItem = () => {
    const dividendItems = sortedReportData.map((report) => {
      return {
        fiscalDate: report.fiscal_date,
        dividendsPerShare: report.dividends_per_share,
        dividendsPerShareYOY: report.dividends_per_share_yoy,
        dividendPayoutRatio: report.dividend_payout_ratio,
        dividendsPaid: report.dividends_paid,
        netIncome: report.net_income,
      }
    })
    if (sortedDividendData.length > 0) {
      return (
        <DividendItem 
          dividendItems={dividendItems}
          dividends={sortedDividendData}
        />
      )
    }
    return null
  }

  const renderRedFlagsItem = () => {
    const redFlagsItems = reportData.report.map((data) => {
      return {
        fiscalDate: data.fiscal_date,
        totalRevenue: data.total_revenue,
        receivables: data.receivables,
        receivablesToSales: data.receivables_to_sales,
        inventory: data.inventory,
        inventoryToSales: data.inventory_to_sales,
        opEx: data.operating_expense,
        opExToSales: data.operating_expense_to_sales,
        sga: data.sga,
        sgaToSales: data.sga_to_sales,
      }
    })
    return (
      <RedFlagsItem redFlagsItems={redFlagsItems} />
    )
  }

  const renderItems = () => {
    if (reportData) {
      return (
        <>
          {renderRevenueItem()}
          {renderReturnsItem()}
          {renderProfitItem()}
          {renderLiabilitiesItem()}
          {renderLiquidityItem()}
          {renderFreeCashFlowItem()}
          {/* {renderDividendItem()} */}
          {renderRedFlagsItem()}
        </>
      )
    }
    return null
  }

  return (
    company ? <div className="static mt-45 bg-white">
      <div className="text-center">
        <div className="inline-block">
          <div className="text-left text-indigo-800 text-xl font-bold m-3">
            {`${company.name } (${company.symbol})`}
          </div>
          <div className="w-full container mx-auto flex flex-wrap items-center mt-0 pt-3 pb-3 md:pb-0">
            <div className="flex flex-row flex-wrap flex-grow mt-2">
              {renderItems()}
            </div>
          </div>
        </div>
      </div>
    </div>
    : null
  )
}

export default PerformanceReport