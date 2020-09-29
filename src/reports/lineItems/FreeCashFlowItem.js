import React from 'react';
import {
  Bar,
  Tooltip,
  Legend,
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
  getUnit,
  formatValue,
 } from './utils'
import Modal from '../../components/modal/Modal'

function FreeCashFlowTooltip(props) {
  const { active, payload, label} = props
  if (active) {
    const freeCashFlow = payload[0].payload.freeCashFlow
    return (
      <div className="h-24 w-40 bg-gray-300 text-left text-indigo-800 opacity-90 font-bold">
        <div className="pt-2 pl-2">{label}</div>
        <div className="pl-2">Free Cash Flow: {freeCashFlow}%</div>
      </div>
    )
  }
  return null
}

function FreeCashFlowItem({freeCashFlowItems}) {
  const [displayInfo, setDisplayInfo] = React.useState(false);

  const [unit, setUnit] = React.useState(null)

  React.useEffect(() => {
    if (freeCashFlowItems && freeCashFlowItems[0]) {
      setUnit(getUnit(freeCashFlowItems[0]))
    }
  })

  const onClose = () => {
    setDisplayInfo(false)
  }

  const displayYears = () => {
    return <YearsTableHeader years={freeCashFlowItems.map(item => item.fiscalDate)}/>
  }

  const _passFailClass = (value) => {
    let classColor = 'text-green-600'

    if (value < 0) {
      classColor = 'text-orange-600'
    }
    return `border-t font-semibold px-8 py-4 ${classColor}`
  }

  const freeCashFlowChartData = freeCashFlowItems.map((item) => {
    return {
      year: item.fiscalDate.split('-')[0],
      freeCashFlow: formatValue(item.freeCashFlow, unit),
    }
  })

  const freeCashFlowData = () => {
    return freeCashFlowItems.map((item) => {
      return <td className={_passFailClass(item.freeCashFlow)}>
        {formatValue(item.freeCashFlow, unit)}
      </td>
    })
  }

  const renderFreeCashFlowTooltip = (props) => {
    const { active, payload, label} = props
      if (active) {
        const freeCashflow = {
          label: 'Free Cash Flow',
          value: `${payload[0].payload.freeCashFlow} ${unit}`,
          fontColor: 'text-indigo-400'
        }
        return (
          <TooltipContent
            label={label}
            chartItems={[freeCashflow]}
          />
        )
      }
      return null
  }

  return <>
    <div className="w-full h-full md:w-1/2 p-3">
      <div className="bg-white border rounded shadow">
        <div className="border-b p-3">
            <h5 className="font-bold text-indigo-600 text-opacity-75">Free Cash Flow - Do you have spending money?</h5>
        </div>
        <div className="p-5">
          <Chart 
            data={freeCashFlowChartData}
            yAxisLabel={`Free Cash Flow (${unit})`}
            tooltipRenderer={renderFreeCashFlowTooltip}
          >
            <Bar name="Free Cash Flow" dataKey="freeCashFlow" barSize={35} fill="#a3bffa" />
          </Chart>
          <table className="w-full table-auto">
            <tbody>
              <tr>
                <th></th>
                {displayYears()}
              </tr>
              <tr>
                <RowHeader itemName={`Free Cash Flow (${unit})`} />
                {freeCashFlowData()}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    {displayInfo ? <Modal onClose={onClose} /> : null}

    {/* <div class="flex flex-row flex-wrap items-stretchmb-2">
      <div class="w-1/4 text-xl font-bold text-indigo-500">
        <button
          href=""
          className="text-lg font-bold text-indigo-500 hover:text-indigo-400 focus:outline-none"
          onClick={() => setDisplayInfo(true)}
        >
          Do they have spending money?
        </button>
      </div>
    </div> */}
  </>
}

export default FreeCashFlowItem