import React from 'react';
import {
  Bar,
  ReferenceLine,
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
import Modal from '../../components/modal/Modal'

function Returns({returnsItems}) {
  const [unit, setUnit] = React.useState(null)

  React.useEffect(() => {
    if (returnsItems && returnsItems[0].netIncome) {
      setUnit(getUnit(returnsItems[0].netIncome))
    }
  })

  const [displayInfo, setDisplayInfo] = React.useState(false);

  const onClose = () => {
    setDisplayInfo(false)
  }

  const _passFailClass = (value) => {
    let classColor = 'text-green-600'

    if (value < 0) {
      classColor = 'text-orange-600'
    }
    return `font-semibold px-8 py-4 ${classColor}`
  }

  const roeChartData = returnsItems.map((item) => {
    return {
      year: item.fiscalDate.split('-')[0],
      roe: item.roe,
      netIncome: formatValue(item.netIncome, unit),
      equity: formatValue(item.equity, unit)
    }
  })

  const displayYears = () => {
    return <YearsTableHeader years={returnsItems.map(item => item.fiscalDate)}/>
  }

  const roeData = () => {
    return returnsItems.map((item) => {
      return <td className={_passFailClass(item.roe)}>
        {item.roe}%
      </td>
    })
  }

  const renderROETooltip = (props) => {
    const { active, payload, label} = props
      if (active) {
        const ROE = {
          label: 'ROE',
          value: `${payload[0].payload.roe}%`,
          fontColor: 'text-indigo-400'
        }
        const netIncome = {
          label: 'Net Income',
          value: `${payload[0].payload.netIncome}  ${unit}`,
          fontColor: 'text-indigo-400'
        }
        const equity = {
          label: 'Equity',
          value: `${payload[0].payload.equity} ${unit}`,
          fontColor: 'text-indigo-400'
        }
        return (
          <TooltipContent
            label={label}
            chartItems={[ROE, netIncome, equity]}
          />
        )
      }
      return null
  }

  return <>
    {displayInfo ? <Modal onClose={onClose} /> : null}

    <div className="w-full md:w-1/2 p-3">
      <div className="h-full bg-white border rounded shadow">
        <div className="border-b p-3">
            <h5 className="font-bold text-indigo-600 text-opacity-75">ROE - Can you manage your money?</h5>
        </div>
        <div className="p-5">
          <Chart 
            data={roeChartData}
            yAxisLabel={`ROE (%)`}
            tooltipRenderer={renderROETooltip}
          >
            <Bar dataKey="roe" barSize={35} fill="#a3bffa" />
            <ReferenceLine y={10} label="min" stroke="gray" strokeDasharray="3 3" />
          </Chart>
          <table className="w-full table-auto">
            <tbody>
              <tr>
                <th></th>
                {displayYears()}
              </tr>
              <tr>
                <td className="text-indigo-800 text-opacity-75 text-sm text-left">ROE</td>
                {roeData()}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </>
}

export default Returns