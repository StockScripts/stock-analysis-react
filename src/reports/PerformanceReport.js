import React from 'react';
import {
  getPerformanceReportById,
  getPerformanceReportByTicker
} from './performanceReportAPI'
import RevenueItem from './lineItems/RevenueItem'
import ProfitItem from './lineItems/ProfitItem'
import ReturnsItem from './lineItems/ReturnsItem'
import FreeCashFlowItem from './lineItems/FreeCashFlowItem'
import LiabilitiesItem from './lineItems/LiabilitiesItem'
import LiquidityItem from './lineItems/LiquidityItem'
import DividendItem from './lineItems/DividendItem'
import RedFlagsItem from './lineItems/RedFlagsItem'

function PerformanceReport({company}) {
  const [reportData, setReportData] = React.useState(null)
  const [sortedReportData, setSortedReportData] = React.useState(null)
  const [sortedDividendData, setSortedDividendData] = React.useState(null)

  React.useEffect(() => {
    if (!!company) {
      if (typeof company === 'string') {
        getPerformanceReportByTicker(company).then(reportData => {
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

  React.useEffect(() => {
    if (reportData) {
      let sorted = reportData.performance_reports.sort((a, b) => (a.fiscal_date > b.fiscal_date) ? 1 : -1)
      setSortedReportData(sorted)

      if (reportData.dividends) {
        const dividendHistory = reportData.dividends.history
        sorted = Object.keys(dividendHistory).sort((a, b) => (a > b) ? 1 : -1)
        sorted = sorted.map(item => {
          return {
            date: item,
            amount: dividendHistory[item]
          }
        })
        setSortedDividendData(sorted)
      } else {
        setSortedDividendData([])
      }
    }
  }, [reportData])

  const renderRevenueItem = () => {
    const revenueItems = sortedReportData.map((report) => {
      return {
        fiscalDate: report.fiscal_date,
        totalRevenue: report.total_revenue,
        totalRevenueYOY: report.total_revenue_yoy,
      }
    })
    return (
      <RevenueItem revenueItems={revenueItems} />
    )
  }

  const renderProfitItem = () => {
    const profitItems = sortedReportData.map((report) => {
      return {
        fiscalDate: report.fiscal_date,
        netIncome: report.net_income,
        netIncomeYOY: report.net_income_yoy,
        netMargin: report.net_margin,
        revenue: report.total_revenue
      }
    })
    return (
      <ProfitItem profitItems={profitItems} />
    )
  }

  const renderReturnsItem = () => {
    const returnsItems = sortedReportData.map((report) => {
      return {
        fiscalDate: report.fiscal_date,
        roe: report.roe,
        netIncome: report.net_income,
        equity: report.shareholder_equity,
        
      }
    })
    return (
      <ReturnsItem returnsItems={returnsItems} />
    )
  }

  const renderFreeCashFlowItem = () => {
    const freeCashFlowItems = sortedReportData.map((report) => {
      return {
        fiscalDate: report.fiscal_date,
        freeCashFlow: report.free_cash_flow,
      }
    })
    return (
      <FreeCashFlowItem freeCashFlowItems={freeCashFlowItems} />
    )
  }

  const renderLiabilitiesItem = () => {
    const liabilitiesItems = sortedReportData.map((report) => {
      return {
        fiscalDate: report.fiscal_date,
        totalLiabilities: report.total_liabilities,
        shareholderEquity: report.shareholder_equity,
        leverageRatio: report.leverage_ratio,
        longTermDebt: report.long_term_debt,
        longTermDebtToEquity: report.long_term_debt_to_equity,
        netIncome: report.net_income,
        netIncomeToLongTermDebt: report.net_income_to_long_term_debt,
      }
    })
    return (
      <LiabilitiesItem liabilitiesItems={liabilitiesItems} />
    )
  }

  const renderLiquidityItem = () => {
    const liquidityItems = sortedReportData.map((report) => {
      return {
        fiscalDate: report.fiscal_date,
        quickAssets: report.quick_assets,
        currentLiabilities: report.current_liabilities,
        quickRatio: report.quick_ratio,
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
    const redFlagsItems = sortedReportData.map((report) => {
      return {
        fiscalDate: report.fiscal_date,
        totalRevenue: report.total_revenue,
        receivables: report.receivables,
        receivablesToSales: report.receivables_to_sales,
        inventory: report.inventory,
        inventoryToSales: report.inventory_to_sales,
        opEx: report.operating_expense,
        opExToSales: report.operating_expense_to_sales,
        sga: report.sga,
        sgaToSales: report.sga_to_sales,
      }
    })
    return (
      <RedFlagsItem redFlagsItems={redFlagsItems} />
    )
  }

  const renderItems = () => {
    if (sortedReportData) {
      return (
        <>
          {renderRevenueItem()}
          {renderReturnsItem()}
          {renderProfitItem()}
          {renderLiabilitiesItem()}
          {renderLiquidityItem()}
          {renderFreeCashFlowItem()}
          {renderDividendItem()}
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