import React from 'react';
import {
  YearsTableHeader,
  RowHeader,
} from './components/TableComponents'
import {
  Chart,
  TooltipContent,
  LegendFormatter,
} from './components/ChartComponents'
import {
  ComposedChart,
  ReferenceLine,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
  ResponsiveContainer
} from 'recharts';
import { 
  getUnit,
  formatValue,
 } from './utils'

function LeverageItem({liabilitiesItems}) {
  const [unit, setUnit] = React.useState(null)
  const [displayInfo, setDisplayInfo] = React.useState(false);

  React.useEffect(() => {
    if (liabilitiesItems && liabilitiesItems[0].totalLiabilities) {
      setUnit(getUnit(liabilitiesItems[0].totalLiabilities))
    }
  })

  const onClose = () => {
    setDisplayInfo(false)
  }

  const _leveragePassFailClass = (value) => {
    let classColor = 'text-green-600'

    if (value > 2) {
      classColor = 'text-orange-600'
    }
    return `font-semibold px-8 py-4 ${classColor}`
  }

  const _debtPassFailClass = (value) => {
    let classColor = 'text-green-600'

    if (value > 40) {
      classColor = 'text-orange-600'
    }
    return `font-semibold px-8 py-4 ${classColor}`
  }

  const _debtRepaymentPassFailClass = (value) => {
    let classColor = 'text-green-600'

    if (value < 0.2) {
      classColor = 'text-orange-600'
    }
    return `font-semibold px-8 py-4 ${classColor}`
  }

  const displayYears = () => {
    return <YearsTableHeader years={liabilitiesItems.map(item => item.fiscalDate)}/>
  }

  const leverageRatioChartData = liabilitiesItems.map((item) => {
    return {
      year: item.fiscalDate.split('-')[0],
      totalLiabilities: formatValue(item.totalLiabilities, unit),
      shareholderEquity: formatValue(item.shareholderEquity, unit),
      leverageRatio: item.leverageRatio,
    }
  })

  const leverageRatioData = () => {
    return liabilitiesItems.map((item) => {
      return <td className={_leveragePassFailClass(item.leverageRatio)}>
        {item.leverageRatio}
      </td>
    })
  }

  const longTermDebtToEquityChartData = liabilitiesItems.map((item) => {
    return {
      year: item.fiscalDate.split('-')[0],
      longTermDebt: formatValue(item.longTermDebt, unit),
      shareholderEquity: formatValue(item.shareholderEquity, unit),
      longTermDebtToEquity: item.longTermDebtToEquity,
    }
  })

  const longTermDebtToEquityData = () => {
    return liabilitiesItems.map((item) => {
      return <td className={_debtPassFailClass(item.longTermDebtToEquity)}>
        {item.longTermDebtToEquity}%
      </td>
    })
  }

  const netIncomeToDebtChartData = liabilitiesItems.map((item) => {
    return {
      year: item.fiscalDate.split('-')[0],
      longTermDebt: formatValue(item.longTermDebt, unit),
      netIncome: formatValue(item.netIncome, unit),
      netIncomeToDebt: item.netIncomeToLongTermDebt,
    }
  })

  const netIncomeToLongTermDebtData = () => {
    return liabilitiesItems.map((item) => {
      return <td className={_debtRepaymentPassFailClass(item.netIncomeToLongTermDebt)}>
        {item.netIncomeToLongTermDebt}
      </td>
    })
  }

  const renderLeverageRatioTooltip = (props) => {
    const { active, payload, label} = props
      if (active) {
        const shareholderEquity = {
          label: 'Equity',
          value: `${payload[0].payload.shareholderEquity} ${unit}`,
          fontColor: 'text-indigo-400'
        }
        const totalLiabilities = {
          label: 'Liabilities',
          value: `${payload[0].payload.totalLiabilities} ${unit}`,
          fontColor: 'text-orange-400'
        }
        const leverageRatio = {
          label: 'Leverage Ratio',
          value: payload[0].payload.leverageRatio,
        }
        return (
          <TooltipContent
            label={label}
            chartItems={[totalLiabilities, shareholderEquity, leverageRatio]}
          />
        )
      }
      return null
  }

  const renderLongTermDebtTooltip = (props) => {
    const { active, payload, label} = props
      if (active) {
        const shareholderEquity = {
          label: 'Equity',
          value: `${payload[0].payload.shareholderEquity} ${unit}`,
          fontColor: 'text-indigo-400'
        }
        const longTermDebt = {
          label: 'Long Term Debt',
          value: `${payload[0].payload.longTermDebt} ${unit}`,
          fontColor: 'text-orange-400'
        }
        const longTermDebtToEquity = {
          label: 'Long Term Debt to Equity',
          value: `${payload[0].payload.longTermDebtToEquity}%`,
        }
        return (
          <TooltipContent
            label={label}
            chartItems={[longTermDebt, shareholderEquity, longTermDebtToEquity]}
          />
        )
      }
      return null
  }

  const renderNetIncomeToDebtTooltip = (props) => {
    const { active, payload, label} = props
      if (active) {
        const netIncome = {
          label: 'Net Income',
          value: `${payload[0].payload.netIncome} ${unit}`,
          fontColor: 'text-indigo-400'
        }
        const longTermDebt = {
          label: 'Long Term Debt',
          value: `${payload[0].payload.longTermDebt} ${unit}`,
          fontColor: 'text-orange-400'
        }
        const netIncomeToDebt = {
          label: 'Net Income to Long Term Debt',
          value: `${payload[0].payload.netIncomeToDebt}`,
        }
        return (
          <TooltipContent
            label={label}
            chartItems={[netIncome, longTermDebt, netIncomeToDebt]}
          />
        )
      }
      return null
  }

  return <>
    <div class="w-full p-3">
      <div class="bg-white border rounded shadow">
        <div class="border-b p-3">
            <h5 class="font-bold text-gray-600">Liabilities - Do you owe too much?</h5>
        </div>
        <div class="p-5">
          <div className="flex flex-row flex-wrap flex-grow mt-2">
            <div className="w-full md:w-1/2 p-3">
              <Chart 
                data={leverageRatioChartData}
                yAxisLabel={`Liabilities / Equity (${unit})`}
                tooltipRenderer={renderLeverageRatioTooltip}
              >
                <Bar name="Liabilities" dataKey="totalLiabilities" barSize={35} fill="#fbd38d" />
                <Bar name="Equity" dataKey="shareholderEquity" barSize={35} fill="#a3bffa" />
                <Legend formatter={LegendFormatter}/>
              </Chart>
            </div>
            <div class="w-full md:w-1/2 p-3 self-center">
              <table className="w-full table-fixed">
                <tbody>
                  <tr>
                    <th className="w-1/5"></th>
                    {displayYears()}
                  </tr>
                  <tr>
                    <RowHeader itemName='Leverage Ratio' />
                    {leverageRatioData()}
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="w-full md:w-1/2 p-3">
              <Chart 
                data={longTermDebtToEquityChartData}
                yAxisLabel={`Long Term Debt / Equity (${unit})`}
                tooltipRenderer={renderLongTermDebtTooltip}
              >
                <Bar name="Long Term Debt" dataKey="longTermDebt" barSize={35} fill="#fbd38d" />
                <Bar name="Equity" dataKey="shareholderEquity" barSize={35} fill="#a3bffa" />
                <Legend formatter={LegendFormatter}/>
              </Chart>
            </div>
            <div class="w-full md:w-1/2 p-3 self-center">
              <table className="w-full table-fixed">
                <tbody>
                  <tr>
                    <th className="w-1/5"></th>
                    {displayYears()}
                  </tr>
                  <tr>
                    <RowHeader itemName='Long Term Debt to Equity' />
                    {longTermDebtToEquityData()}
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="w-full md:w-1/2 p-3">
            <Chart 
                data={netIncomeToDebtChartData}
                yAxisLabel={`Net Income / Long Term Debt (${unit})`}
                tooltipRenderer={renderNetIncomeToDebtTooltip}
              >
                <Bar name="Net Income" dataKey="netIncome" barSize={35} fill="#a3bffa" />
                <Bar name="Long Term Debt" dataKey="longTermDebt" barSize={35} fill="#fbd38d" />
                <Legend formatter={LegendFormatter}/>
              </Chart>
            </div>
            <div class="w-full md:w-1/2 p-3 self-center">
              <table className="w-full table-fixed">
                <tbody>
                  <tr>
                    <th className="w-1/5"></th>
                    {displayYears()}
                  </tr>
                  <tr>
                    <RowHeader itemName='Net Income to Long Term Debt' />
                    {netIncomeToLongTermDebtData()}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
}

export default LeverageItem