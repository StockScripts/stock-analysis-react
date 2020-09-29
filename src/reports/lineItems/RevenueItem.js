import React from 'react';
import {
  Bar,
  Line,
} from 'recharts';
import {
  Chart,
  TooltipContent,
} from './components/ChartComponents'
import {
  YearsTableHeader,
  RowHeader,
} from './components/TableComponents'
import {
  ItemTitle
} from './components/ReportComponents'
import { 
  getUnit,
  formatValue,
 } from './utils'

function RevenueItem({revenueItems}) {
  const [unit, setUnit] = React.useState(null)

  React.useEffect(() => {
    if (revenueItems && revenueItems[0]) {
      setUnit(getUnit(revenueItems[0].totalRevenue))
    }
  })

  const _passFailClass = (value1, value2) => {
    let classColor = 'text-green-600'

    if (value1 < 0 || value2 < 0) {
      classColor = 'text-orange-600'
    }
    return `font-semibold px-4 py-4 ${classColor}`
  }

  const revenueChartData = revenueItems.map((item) => {
    return {
      year: item.fiscalDate.split('-')[0],
      revenue: formatValue(item.totalRevenue, unit),
      revenueYOY: item.totalRevenueYOY,
    }
  })

  const totalRevenueData = () => {
    return revenueItems.map((item) => {
      return <td className={_passFailClass(item.totalRevenue, item.totalRevenueYOY ? item.totalRevenueYOY : null)}>
        {formatValue(item.totalRevenue, unit)}
      </td>
    })
  }

  const totalRevenueYOYData = () => {
    return revenueItems.map((item) => {
      return <td className={_passFailClass(item.totalRevenue, item.totalRevenueYOY ? item.totalRevenueYOY : null)}>
        {item.totalRevenueYOY ? `${item.totalRevenueYOY}%` : ''}
      </td>
    })
  }

  const renderRevenueTooltip = (props) => {
    const { active, payload, label} = props
      if (active) {
        const revenue = {
          label: 'Revenue',
          value: `${payload[0].payload.revenue} ${unit}`,
          fontColor: 'text-indigo-400'
        }
        const revenueYOY = {
          label: 'Revenue YOY',
          value: `${payload[0].payload.revenueYOY}%`,
          fontColor: 'text-indigo-400'
        }
        return (
          <TooltipContent
            label={label}
            chartItems={[revenue, revenueYOY]}
          />
        )
      }
      return null
  }

  const displayYears = () => {
    return <YearsTableHeader years={revenueItems.map(item => item.fiscalDate)}/>
  }

  return (
    <div className="w-full h-full md:w-1/2 p-3">
      <div className="bg-white border rounded shadow">
        <div className="border-b p-3">
            <ItemTitle title='Revenue - Are you getting a raise every year?' />
        </div>
        <div className="p-5">
          <Chart 
            data={revenueChartData}
            yAxisLabel={`Revenue (${unit})`}
            tooltipRenderer={renderRevenueTooltip}
          >
            <Bar name="Revenue" dataKey="revenue" barSize={35} fill="#a3bffa" unit={unit} />
            <Line type="monotone" dataKey="revenue" stroke="#718096" />
          </Chart>
          <table className="w-full table-auto">
            <tbody>
              <tr>
                <th></th>
                {displayYears()}
              </tr>
              <tr>
                <RowHeader itemName='Revenue' />
                {totalRevenueData()}
              </tr>
              <tr>
                <RowHeader itemName='YOY Growth' />
                {totalRevenueYOYData()}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default RevenueItem