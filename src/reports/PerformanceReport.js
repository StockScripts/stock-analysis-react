import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom'
import {
  getPerformanceReportBySymbol
} from './performanceReportAPI'
import ScaleLoader from "react-spinners/ScaleLoader";
import RevenueItem from './lineItems/RevenueItem'
import NetIncomeItem from './lineItems/NetIncomeItem'
import GrossProfitItem from './lineItems/GrossProfitItem'
import SgaItem from './lineItems/SgaItem'
import RoeItem from './lineItems/RoeItem'
import FreeCashFlowItem from './lineItems/FreeCashFlowItem'
import LiabilitiesItem from './lineItems/LiabilitiesItem'
import DebtItem from './lineItems/DebtItem'
import LiquidityItem from './lineItems/LiquidityItem'
import Notification from '../components/modal/Notification'
import { getDisplayedUnit } from './utils'

function PerformanceReport() {
  let { company } = useParams()
  let history = useHistory()

  const [reportData, setReportData] = useState(null)
  const [companyInfo, setCompanyInfo] = useState(null)
  const [unit, setUnit] = useState(null)
  const [loading, setLoading] = useState(false)
  const  [error, setError] = useState()

  const errorMessage = "We couldn't find data for this company."
  useEffect(() => {
    if (!!company) {
      if (typeof company === 'string') {
        setLoading(true)
        getPerformanceReportBySymbol(company).then(response => {
          if (response.hasOwnProperty('errors')) {
            setError(response.errors)
          } else {
            let report = response.report
            if (report.items.length > 0) {
              setUnit(getDisplayedUnit(report.items[0].unit))
              setReportData(report.items)
              setCompanyInfo(report.company)
              setError(null)
            } else {
              setError(errorMessage)
            }
          }
          setLoading(false)
        })
      } 
      return
    }
  }, [company, history])

  const renderRevenueItem = () => {
    const revenueItems = reportData.map((data) => {
      return {
        fiscalDate: data.fiscal_date,
        totalRevenue: data.revenue,
        totalRevenueYOY: data.revenue_yoy,
      }
    })
    return (
      <RevenueItem unit={unit} revenueItems={revenueItems} />
    )
  }

  const renderROEItem = () => {
    const roeItems = reportData.map((data) => {
      return {
        fiscalDate: data.fiscal_date,
        roe: data.roe,
        netIncome: data.net_income,
        equity: data.equity,
      }
    })
    return (
      <RoeItem unit={unit} roeItems={roeItems} />
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
      <FreeCashFlowItem unit={unit} freeCashFlowItems={freeCashFlowItems} />
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
      <GrossProfitItem unit={unit} grossProfitItems={grossProfitItems} />
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
      <SgaItem unit={unit} sgaItems={sgaItems} />
    )
  }

  const renderNetIncomeItem = () => {
    const netIncomeItems = reportData.map((data) => {
      return {
        fiscalDate: data.fiscal_date,
        netIncome: data.net_income,
        netIncomeYOY: data.net_income_yoy,
        netMargin: data.net_margin,
        revenue: data.revenue
      }
    })
    return (
      <NetIncomeItem unit={unit} netIncomeItems={netIncomeItems} />
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
      <LiquidityItem unit={unit} liquidityItems={liquidityItems} />
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
      }
    })
    return (
      <LiabilitiesItem unit={unit} liabilitiesItems={liabilitiesItems} />
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
      <DebtItem unit={unit} debtItems={debtItems} />
    )
  }

  const renderItems = () => {
    if (reportData) {
      return (
        <>
          {renderRevenueItem()}
          {renderROEItem()}
          {renderFreeCashFlowItem()}
          {renderGrossProfitItem()}
          {renderSgaItem()}
          {renderNetIncomeItem()}
          {renderLiquidityItem()}
          {renderLiabilitiesItem()}
          {renderDebtItem()}
        </>
      )
    }
    return null
  }

  const onClose = () => {
    setError(null)
    history.push(`/report`)
    setReportData(null)
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

  let displayError = error ? true : false
  return (
    <div className="flex-1 bg-palette-light mt-24 sm:mt-16 md:mt-4 pb-24 md:pb-5">
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