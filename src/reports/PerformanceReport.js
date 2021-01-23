import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import {
  getPerformanceReportBySymbol
} from './performanceReportAPI'
import ScaleLoader from "react-spinners/ScaleLoader";
import RevenueItem from './lineItems/RevenueItem'
import ProfitItem from './lineItems/ProfitItem'
import GrossProfitItem from './lineItems/GrossProfitItem'
import SgaItem from './lineItems/SgaItem'
import ReturnsItem from './lineItems/ReturnsItem'
import FreeCashFlowItem from './lineItems/FreeCashFlowItem'
import LiabilitiesItem from './lineItems/LiabilitiesItem'
import DebtItem from './lineItems/DebtItem'
import LiquidityItem from './lineItems/LiquidityItem'
// import DividendItem from './lineItems/DividendItem'
import RedFlagsItem from './lineItems/RedFlagsItem'
import Notification from '../components/modal/Notification'

function PerformanceReport() {
  let { company } = useParams()

  const [reportData, setReportData] = useState(null)
  const [companyInfo, setCompanyInfo] = useState(null)
  const [loading, setLoading] = useState(false)
  const  [error, setError] = useState()

  const errorMessage = "We couldn't find data for this company."
  useEffect(() => {
    if (!!company) {
      if (typeof company === 'string') {
        setLoading(true)
        getPerformanceReportBySymbol(company).then(reportData => {
          let report = reportData.report
          if (report.items.length > 0) {
            setReportData(report.items)
            setCompanyInfo(report.company)
            setError(null)
          } else {
            setError(errorMessage)
          }
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

  const renderGrossProfitItem = () => {
    const grossProfitItems = reportData.map((data) => {
      return {
        fiscalDate: data.fiscal_date,
        grossProfit: data.gross_profit,
        grossMarginYOY: data.gross_margin_yoy,
        grossMargin: data.gross_margin,
        revenue: data.revenue
        
      }
    })
    return (
      <GrossProfitItem grossProfitItems={grossProfitItems} />
    )
  }

  const renderSgaItem = () => {
    const sgaItems = reportData.map((data) => {
      return {
        fiscalDate: data.fiscal_date,
        grossProfit: data.gross_profit,
        sga: data.sga,
        sgaToGross: data.sga_to_gross,
        
      }
    })
    return (
      <SgaItem sgaItems={sgaItems} />
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

  const renderDebtItem = () => {
    const debtItems = reportData.map((data) => {
      return {
        fiscalDate: data.fiscal_date,
        longTermDebt: data.long_term_debt,
        netIncome: data.net_income,
        netIncomeToLongTermDebt: data.net_income_to_long_term_debt,
      }
    })
    return (
      <DebtItem debtItems={debtItems} />
    )
  }

  const renderLiquidityItem = () => {
    const liquidityItems = reportData.map((data) => {
      return {
        fiscalDate: data.fiscal_date,
        currentAssets: data.current_assets,
        currentLiabilities: data.current_liabilities,
        currentRatio: data.current_ratio,
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
        totalRevenue: data.revenue,
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
          {renderFreeCashFlowItem()}
          {renderGrossProfitItem()}
          {renderSgaItem()}
          {renderProfitItem()}
          {renderLiquidityItem()}
          {renderLiabilitiesItem()}
          {renderDebtItem()}
          {/* {renderRedFlagsItem()} */}
          {/* {renderDividendItem()} */}
        </>
      )
    }
    return null
  }

  const onClose = () => {
    setError(null)
  }
  
  let displayed = null

  if (loading) {
    displayed = <div className="sweet-loading text-center mt-5">
      <ScaleLoader
        size={250}
        color={"#57BA98"}
        loading={true}
        height={90}
        width={9}
        margin={7}
      />
    </div>
  } else {
    displayed = <>
        <div className="text-left bg-palette-green-med text-palette-light text-xl font-bold p-4">
          {companyInfo ? `${companyInfo.name } (${companyInfo.symbol})` : null}
        </div>
        {/* <div className="flex flex-row flex-wrap flex-grow mt-2">
            {renderItems()}
        </div> */}
        {/* <div className="flex flex-col md:flex-row">
          <div className="w-full container mx-auto flex flex-wrap items-center mt-0 pt-3 pb-3 md:pb-0"> */}
            <div className="flex flex-row flex-wrap flex-grow mt-2">
              {renderItems()}
            </div>
          {/* </div>
        </div> */}
      </>
  }

  let displayError = error ? 'Error' : null
  return (
    <div className="main-content flex-1 bg-palette-light mt-24 sm:mt-16 md:mt-4 pb-24 md:pb-5">
      {displayError ? <Notification title='Oops' notification={error} onClose={onClose} /> : null}
      {displayed}
    </div>
    // <div className="static mt-45 bg-white">
    //   <div className="text-center">
    //     <div className="inline-block">
    //       {displayed}
    //     </div>
    //   </div>
    // </div>
  )
}

export default PerformanceReport