import React from 'react';
import {
  YearsTableHeader,
  RowHeader,
} from './components/TableComponents'
// import {
//   Chart,
//   LineCharts,
//   TooltipContent,
//   LegendFormatter,
// } from './components/ChartComponents'
import { 
  getUnit,
  formatValue,
 } from './utils'

// function DividendTooltip(props) {
//   const { active, payload, label} = props
//   if (active) {
//     const dividendsPerShare = payload[0].payload.dividendsPerShare
//     const dividendsPerShareYOY = payload[0].payload.dividendsPerShareYOY
//     return (
//       <div className="h-24 w-40 bg-gray-300 text-left text-indigo-800 opacity-90 font-bold">
//         <div className="pt-2 pl-2">{label}</div>
//         <div className="pl-2">Dividends Per Share: {dividendsPerShare}</div>
//         <div className="pl-2">{dividendsPerShareYOY ? `YOY Growth: ${dividendsPerShareYOY}%` : null}</div>
//       </div>
//     )
//   }
//   return null
// }

function DividendItem({dividendItems, dividends}) {
  const [unit, setUnit] = React.useState(null)

  React.useEffect(() => {
    if (dividendItems && dividendItems[0].netIncome) {
      setUnit(getUnit(dividendItems[0].netIncome))
    }
  })

  const _passFailClass = (value) => {
    let classColor = 'text-green-600'

    if (value < 0) {
      classColor = 'text-orange-600'
    }
    return `border-t font-semibold px-8 py-4 ${classColor}`
  }

  const dividendPayoutRatioChartData = dividendItems.map((item) => {
    return {
      year: item.fiscalDate.split('-')[0],
      dividendPayoutRatio: item.dividendPayoutRatio,
      dividendsPaid: formatValue(item.dividendsPaid, unit),
      netIncome: formatValue(item.netIncome, unit),
    }
  })

  const dividendPayoutRatioData = () => {
    return dividendItems.map((item) => {
      return <td className={_passFailClass(item.dividendsPerShare, item.dividendsPerShareYOY ? item.dividendsPerShareYOY : null)}>
        {item.dividendPayoutRatio}
      </td>
    })
  }

  // const renderDividendPayoutRatioTooltip = (props) => {
  //   const { active, payload, label} = props
  //     if (active) {
  //       const dividendsPaid = {
  //         label: 'Dividends Paid',
  //         value: `${payload[0].payload.dividendsPaid} ${unit}`,
  //         fontColor: 'text-indigo-400'
  //       }
  //       const netIncome = {
  //         label: 'Net Income',
  //         value: `${payload[0].payload.netIncome} ${unit}`,
  //         fontColor: 'text-indigo-400'
  //       }
  //       const dividendPayoutRatio = {
  //         label: 'Dividend Payout Ratio',
  //         value: `${payload[0].payload.dividendPayoutRatio}`,
  //         fontColor: 'text-indigo-400'
  //       }

  //       return (
  //         <TooltipContent
  //           label={label}
  //           chartItems={[dividendsPaid, netIncome, dividendPayoutRatio]}
  //         />
  //       )
  //     }
  //     return null
  // }

  const dividendHistoryLineChartData = dividends.map((item) => {
    return {
      date: item.date,
      amount: item.amount,
    }
  })

  const renderDividendHistoryTooltip = (props) => {
    const { active, payload, label} = props
      if (active) {
        const amount = {
          label: 'Dividends per Share',
          value: `${payload[0].payload.amount}`,
          fontColor: 'text-indigo-400'
        }
        const paymentDate = {
          label: 'Payment date',
          value: `${payload[0].payload.date}`,
          fontColor: 'text-indigo-400'
        }

        return (
          <TooltipContent
            label={label}
            chartItems={[amount, paymentDate]}
          />
        )
      }
      return null
  }

  const dividendsPerShareChartData = dividendItems.map((item) => {
    return {
      year: item.fiscalDate.split('-')[0],
      dividendsPerShare: item.dividendsPerShare,
      dividendsPerShareYOY: item.dividendsPerShareYOY,
    }
  })

  const dividendsPerShareData = () => {
    return dividendItems.map((item) => {
      return <td className={_passFailClass(item.dividendsPerShare, item.dividendsPerShareYOY ? item.dividendsPerShareYOY : null)}>
        {item.dividendsPerShare}
      </td>
    })
  }

  const dividendsPerShareYOYData = () => {
    return dividendItems.map((item) => {
      return <td className={_passFailClass(item.dividendsPerShare, item.dividendsPerShareYOY ? item.dividendsPerShareYOY : null)}>
        {item.dividendsPerShareYOY ? `${item.dividendsPerShareYOY}%` : ''}
      </td>
    })
  }

  const displayYears = () => {
    return <YearsTableHeader years={dividendItems.map(item => item.fiscalDate)}/>
  }

  return <>
    <div className="w-full p-3">
      <div className="bg-white border rounded shadow">
        <div className="border-b p-3">
            <h5 className="font-bold text-indigo-600 text-opacity-75">Dividends - Are you able to give out an allowance?</h5>
        </div>
        <div className="p-5">
          <div className="flex flex-row flex-wrap flex-grow mt-2">
            <div className="w-full md:w-1/2 p-3">
              <Chart 
                data={dividendPayoutRatioChartData}
                yAxisLabel={`Dividends Paid / Net Income (${unit})`}
                tooltipRenderer={renderDividendPayoutRatioTooltip}
              >
                <Bar name="Dividends Paid" dataKey="dividendsPaid" barSize={35} fill="#fbd38d" />
                <Bar name="Net Income" dataKey="netIncome" barSize={35} fill="#a3bffa" />
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
                    <RowHeader itemName='Dividend Payout Ratio' />
                    {dividendPayoutRatioData()}
                  </tr>
                </tbody>
              </table>
            </div>
            <LineCharts 
                data={dividendHistoryLineChartData}
                yAxisLabel={`Dividends per Share`}
                xAxisData='date'
                tooltipRenderer={renderDividendHistoryTooltip}
              >
                <Line type="monotone" name="Dividends per Share" dataKey="amount" stroke="#8884d8" />
                <Legend formatter={LegendFormatter}/>
              </LineCharts>
          </div>
        </div>
      </div>
    </div>
  </>
}

export default DividendItem