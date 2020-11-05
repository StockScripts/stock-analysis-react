import React from 'react';
import {
  Bar,
  Legend,
} from 'recharts';
import {
  Chart,
  TooltipContent,
  LegendFormatter,
} from './components/ChartComponents'
import {
  YearsTableHeader,
  RowHeader,
} from './components/TableComponents'
import { 
  getUnit,
  formatValue,
 } from './utils'

function LiquidityItem({liquidityItems}) {
  const [unit, setUnit] = React.useState(null)

  React.useEffect(() => {
    if (liquidityItems && liquidityItems[0].currentLiabilities) {
      setUnit(getUnit(liquidityItems[0].currentLiabilities))
    }
  }, [liquidityItems])

  const _passFailClass = (value) => {
    let classColor = 'text-green-600'

    if (value < 1) {
      classColor = 'text-orange-600'
    }
    return `border-t font-semibold px-8 py-4 ${classColor}`
  }

  const quickRatioChartData = liquidityItems.map((item) => {
    return {
      year: item.fiscalDate.split('-')[0],
      quickAssets: formatValue(item.quickAssets, unit),
      currentLiabilities: formatValue(item.currentLiabilities, unit),
      quickRatio: item.quickRatio,
    }
  })

  const displayYears = () => {
    return <YearsTableHeader years={liquidityItems.map(item => item.fiscalDate)}/>
  }

  const quickRatioData = () => {
    return liquidityItems.map((item, index) => {
      return <td className={_passFailClass(item.quickRatio)} key={index}>
        {item.quickRatio}
      </td>
    })
  }

  const renderQuickRatioTooltip = (props) => {
    const { active, payload, label} = props
      if (active) {
        const quickAssets = {
          label: 'Quick Assets',
          value: `${payload[0].payload.quickAssets} ${unit}`,
          fontColor: 'text-indigo-400'
        }
        const currentLiabilities = {
          label: 'Current Liabilities',
          value: `${payload[0].payload.currentLiabilities} ${unit}`,
          fontColor: 'text-orange-400'
        }
        const quickRatio = {
          label: 'Quick Ratio',
          value: `${payload[0].payload.quickRatio}`,
        }
        return (
          <TooltipContent
            label={label}
            chartItems={[quickAssets, currentLiabilities, quickRatio]}
          />
        )
      }
      return null
  }
  
  return (
    <div className="w-full h-full md:w-1/2 p-3">
      <div className="bg-white border rounded shadow">
        <div className="border-b p-3">
            <h5 className="font-bold text-indigo-600 text-opacity-75">Liquidity - Can you pay your bills?</h5>
        </div>
        <div className="p-5">
          <Chart 
            data={quickRatioChartData}
            yAxisLabel='Quick Assets / Current Liabilities'
            tooltipRenderer={renderQuickRatioTooltip}
          >
            <Bar name="Quick Assets" dataKey="quickAssets" barSize={35} fill="#a3bffa" />
            <Bar name="Current Liabilities" dataKey="currentLiabilities" barSize={35} fill="#fbd38d" />
            <Legend formatter={LegendFormatter}/>
          </Chart>
          <table className="w-full table-auto">
            <tbody>
              <tr>
                <th></th>
                {displayYears()}
              </tr>
              <tr>
                <RowHeader itemName='Quick Ratio' />
                {quickRatioData()}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default LiquidityItem