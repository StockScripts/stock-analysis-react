import React from 'react';
import {
  Bar,
} from 'react-chartjs-2'
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
  fiscalDateYear,
 } from './utils'
import Modal from '../../components/modal/Modal'
import { faMoneyBillWave } from '@fortawesome/free-solid-svg-icons'

function FreeCashFlowItem({freeCashFlowItems}) {
  const [displayInfo, setDisplayInfo] = React.useState(false);
  const [pass, setPass] = React.useState(true)

  const [unit, setUnit] = React.useState(null)

  React.useEffect(() => {
    if (freeCashFlowItems && freeCashFlowItems[0]) {
      setUnit(getUnit(freeCashFlowItems[0]))
      freeCashFlowItems.forEach((item) => {
        if (item.freeCashFlow < 0) {
          setPass(false)
        }
      })
    }
  }, [freeCashFlowItems])

  const onClose = () => {
    setDisplayInfo(false)
  }

  const displayYears = () => {
    return <YearsTableHeader years={freeCashFlowItems.map(item => fiscalDateYear(item.fiscalDate))}/>
  }

  const _passFailClass = (value) => {
    let classColor = 'text-green-600'

    if (value < 0) {
      classColor = 'text-orange-600'
    }
    return `text-sm py-1 ${classColor}`
  }

  const yearLabels = freeCashFlowItems.map((item) => {
    return fiscalDateYear(item.fiscalDate)
  })

  const freeCashFlowDataset = freeCashFlowItems.map((item) => {
    return formatValue(item.freeCashFlow, unit)
  })

const freeCashFlowChartData = () => {
    return {
      labels: yearLabels,
      datasets: [
        {
          label: 'Free Cash Flow',
          data: freeCashFlowDataset,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          barPercentage: .6,
        },
      ],
    }
  }

  const options = {
    tooltips: {
      callbacks: {
        title: function(tooltipItem, data) {
          return data['labels'][tooltipItem[0]['index']];
        },
        label: function(tooltipItem, data) {
          return `Free Cash Flow: ${data['datasets'][0]['data'][tooltipItem['index']]} ${unit}`;
        },
      }
    },
    legend: {
      display: false
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
          scaleLabel: {
            display: true,
            labelString: `Free Cash Flow (${unit})`
          }
        },
      ],
    },
  }

  const freeCashFlowData = () => {
    return freeCashFlowItems.map((item, index) => {
      return <td className={_passFailClass(item.freeCashFlow)} key={index}>
        {formatValue(item.freeCashFlow, unit)}
      </td>
    })
  }

  const borderColor = pass ? 'border-green-600' : 'border-orange-600'

  const freeCashFlowTip = <FreeCashFlowTip />
  return <>
    <div class="w-full md:w-1/2 xl:w-1/3 p-3">
      <div class={`h-full border-b-4 bg-white ${borderColor} rounded-md shadow-lg p-5`}>
        <div className="p-3">
          <ItemTitle
            title='Free Cash Flow'
            icon={faMoneyBillWave}
            pass={pass}
            tip={freeCashFlowTip}
          />
        </div>
        <Bar data={freeCashFlowChartData} options={options} />
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
    {displayInfo ? <Modal onClose={onClose} /> : null}
  </>
}

function FreeCashFlowTip() {
  return (
    <div>
      <div className="text-right font-bold mt-1 mr-1">x</div>
      <div className="font-semibold text-sm ml-1">What is it:</div>
        <div className="text-sm mb-1 ml-1">
          This is cash that a company generates after paying expenses.
        </div>
      <div className="font-semibold text-sm ml-1">Why it's important:</div>
        <div className="text-sm mb-1 ml-1">
          It can allow a company to develop new products, make
          acquisitions, pay dividends, or reduce debt. Growing free cash flows frequently
          leads to increased earnings.
        </div>
      <div className="font-semibold text-sm ml-1">What to look for:</div>
        <div className="text-sm mb-1 ml-1">
          It should be increasing or consistent, and the recent year should be positive.
        </div>
      <div className="font-semibold text-sm ml-1">What to watch for:</div>
        <div className="text-sm mb-1 ml-1">
          It should not be continuously decreasing.
        </div>
    </div>
  )
}

export default FreeCashFlowItem