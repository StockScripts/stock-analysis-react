import React from 'react';
import { useParams } from 'react-router-dom'
import {
  getPerformanceReportBySymbol
} from './performanceReportAPI'
import ScaleLoader from "react-spinners/ScaleLoader";
import RevenueItem from './lineItems/RevenueItem'
import ProfitItem from './lineItems/ProfitItem'
import ReturnsItem from './lineItems/ReturnsItem'
import FreeCashFlowItem from './lineItems/FreeCashFlowItem'
import LiabilitiesItem from './lineItems/LiabilitiesItem'
import LiquidityItem from './lineItems/LiquidityItem'
// import DividendItem from './lineItems/DividendItem'
import RedFlagsItem from './lineItems/RedFlagsItem'

function PerformanceReport() {
  let { company } = useParams()

  const [reportData, setReportData] = React.useState(null)
  const [companyInfo, setCompanyInfo] = React.useState(null)
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    if (!!company) {
      if (typeof company === 'string') {
        setLoading(true)
        getPerformanceReportBySymbol(company).then(reportData => {
          setReportData(reportData.report.items)
          setCompanyInfo(reportData.report.company)
          setLoading(false)
        })
      } 
      return
    }
  }, [company])

  const renderRevenueItem = () => {
    const revenueItems = reportData.map((data) => {
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
    const profitItems = reportData.map((data) => {
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
    const returnsItems = reportData.map((data) => {
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
    const freeCashFlowItems = reportData.map((data) => {
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
    const liabilitiesItems = reportData.map((data) => {
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
    const liquidityItems = reportData.map((data) => {
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

  // const renderDividendItem = () => {
  //   const dividendItems = sortedReportData.map((report) => {
  //     return {
  //       fiscalDate: report.fiscal_date,
  //       dividendsPerShare: report.dividends_per_share,
  //       dividendsPerShareYOY: report.dividends_per_share_yoy,
  //       dividendPayoutRatio: report.dividend_payout_ratio,
  //       dividendsPaid: report.dividends_paid,
  //       netIncome: report.net_income,
  //     }
  //   })
  //   if (sortedDividendData.length > 0) {
  //     return (
  //       <DividendItem 
  //         dividendItems={dividendItems}
  //         dividends={sortedDividendData}
  //       />
  //     )
  //   }
  //   return null
  // }

  const renderRedFlagsItem = () => {
    const redFlagsItems = reportData.map((data) => {
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

  let displayed = null

  if (loading) {
    displayed = <div className="sweet-loading">
      <ScaleLoader
        size={250}
        color={"#5a67d8"}
        loading={true}
        height={90}
        width={9}
        margin={7}
      />
    </div>
  } else {
    displayed = <>
        <div className="text-left text-indigo-800 text-xl font-bold m-3">
          {companyInfo ? `${companyInfo.name } (${companyInfo.symbol})` : null}
        </div>
        <div className="w-full container mx-auto flex flex-wrap items-center mt-0 pt-3 pb-3 md:pb-0">
          <div className="flex flex-row flex-wrap flex-grow mt-2">
            {renderItems()}
          </div>
        </div>
      </>
  }

  return (
    <div className="static mt-45 bg-white">
      <div className="text-center">
        <div className="inline-block">
          {displayed}
        </div>
      </div>
    </div>
  )
}

export default PerformanceReport