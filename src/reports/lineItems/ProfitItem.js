import React from 'react';
import Modal from '../../components/modal/Modal'
import {
  Bar,
  Line,
} from 'recharts';
import {
  YearsTableHeader,
  RowHeader,
} from './components/TableComponents'
import {
  Chart,
  TooltipContent,
} from './components/ChartComponents'
import {
  ItemTitle
} from './components/ReportComponents'
import { 
  getUnit,
  formatValue,
 } from './utils'

function RevenueTooltip(props) {
  const { active, payload, unit, label} = props
  if (active) {
    const revenue = payload[0].payload.revenue
    const revenueYOY = payload[0].payload.revenueYOY
    return (
      <div className="h-24 w-40 bg-gray-300 text-left text-indigo-800 opacity-90 font-bold">
        <div className="pt-2 pl-2">{label}</div>
        <div className="pl-2">Revenue: {revenue} {unit}</div>
        <div className="pl-2">{revenueYOY ? `YOY Growth: ${revenueYOY}%` : null}</div>
      </div>
    )
  }
  return null
}

function ProfitItem({profitItems}) {
  const [unit, setUnit] = React.useState(null)

  React.useEffect(() => {
    if (profitItems && profitItems[0].netIncome) {
      setUnit(getUnit(profitItems[0].netIncome))
    }
  })

  const [displayInfo, setDisplayInfo] = React.useState(false);

  const netIncomeChartData = profitItems.map((item) => {
    return {
      year: item.fiscalDate.split('-')[0],
      netIncome: formatValue(item.netIncome, unit),
      netIncomeYOY: item.netIncomeYOY,
    }
  })

  const renderNetIncomeTooltip = (props) => {
    const { active, payload, label} = props
      if (active) {
        const netIncome = {
          label: 'NetINcome',
          value: `${payload[0].payload.netIncome} ${unit}`,
          fontColor: 'text-indigo-400'
        }
        const netIncomeYOY = {
          label: 'Net Income YOY',
          value: `${payload[0].payload.netIncomeYOY}%`,
          fontColor: 'text-indigo-400'
        }
        return (
          <TooltipContent
            label={label}
            chartItems={[netIncome, netIncomeYOY]}
          />
        )
      }
      return null
  }

  const netMarginChartData = profitItems.map((item) => {
    return {
      year: item.fiscalDate.split('-')[0],
      netMargin: item.netMargin,
      netIncome: formatValue(item.netIncome, unit),
      revenue: formatValue(item.revenue, unit)
    }
  })

  const renderNetMarginTooltip = (props) => {
    const { active, payload, label} = props
      if (active) {
        const netMargin = {
          label: 'Net Margin',
          value: `${payload[0].payload.netMargin} ${unit}`,
          fontColor: 'text-indigo-400'
        }
        const netIncome = {
          label: 'Net Income',
          value: `${payload[0].payload.netIncome}%`,
          fontColor: 'text-indigo-400'
        }
        const revenue = {
          label: 'Revenue',
          value: `${payload[0].payload.revenue}%`,
          fontColor: 'text-indigo-400'
        }
        return (
          <TooltipContent
            label={label}
            chartItems={[netMargin, netIncome, revenue]}
          />
        )
      }
      return null
  }

  const _passFailClass = (value1, value2) => {
    let classColor = 'text-green-600'

    if (value1 < 0 || value2 < 0) {
      classColor = 'text-orange-600'
    }
    return `border-t font-semibold px-8 py-4 ${classColor}`
  }

  const onClose = () => {
    setDisplayInfo(false)
  }

  const netIncomeData = () => {
    return profitItems.map((item) => {
      return <td className={_passFailClass(item.netIncome, item.netIncomeYOY ? item.netIncomeYOY : null)}>
        {formatValue(item.netIncome, unit)}
      </td>
    })
  }

  const netIncomeYOYData = () => {
    return profitItems.map((item) => {
      return <td className={_passFailClass(item.netIncome, item.netIncomeYOY ? item.netIncomeYOY : null)}>
        {item.netIncomeYOY ? `${item.netIncomeYOY}%` : ''}
      </td>
    })
  }

  const displayYears = () => {
    return <YearsTableHeader years={profitItems.map(item => item.fiscalDate)}/>
  }

  const netMarginData = () => {
    return profitItems.map((item) => {
      return <td className={_passFailClass(item.netMargin)}>
        {item.netMargin}%
      </td>
    })
  }

  return <>
    {displayInfo ? <Modal onClose={onClose} /> : null}

    <div class="w-full p-3">
      <div class="bg-white border rounded shadow">
        <div class="border-b p-3">
          <ItemTitle title="Profits - Are you keeping the money you're making?" />
        </div>
        <div class="p-5">
          <div className="flex flex-row flex-wrap flex-grow mt-2">
            <div class="w-full md:w-1/2 p-3">
              <Chart
                data={netIncomeChartData}
                yAxisLabel={`NetIncome (${unit})`}
                tooltipRenderer={renderNetIncomeTooltip}
              >
                <Bar dataKey="netIncome" barSize={40} fill="#a3bffa" unit={unit} />
                <Line type="monotone" dataKey="netIncome" stroke="#718096" />
              </Chart>
            </div>
            <div class="w-full md:w-1/2 p-3 self-center">
              <table className="w-full table-auto">
                <tbody>
                  <tr>
                    <th></th>
                    {displayYears()}
                  </tr>
                  <tr>
                    <td className="text-indigo-800 text-opacity-75 text-sm text-left">Net Income</td>
                    {netIncomeData()}
                  </tr>
                  <tr>
                    <td className="text-indigo-800 text-opacity-75 text-sm text-left">YOY Growth</td>
                    {netIncomeYOYData()}
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="w-full md:w-1/2 p-3">
              <Chart
                  data={netMarginChartData}
                  yAxisLabel={`Net Margin (%)`}
                  tooltipRenderer={renderNetMarginTooltip}
                >
                  <Bar dataKey="netMargin" barSize={40} fill="#a3bffa" unit={unit} />
                </Chart>
            </div>
            <div class="w-full md:w-1/2 p-3 self-center">
              <table className="w-full table-auto">
                <tbody>
                  <tr>
                    <th></th>
                    {displayYears()}
                  </tr>
                  <tr>
                    <td className="text-indigo-800 text-opacity-75 text-sm text-left">Net Margin</td>
                    {netMarginData()}
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

export default ProfitItem