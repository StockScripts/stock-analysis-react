import React from 'react';
import {
  Bar,
} from 'react-chartjs-2'
import {
  YearsTableHeader,
  RowHeader,
} from './components/TableComponents'
import {
  ItemTitle,
  ItemTip
} from './components/ReportComponents'
import { 
  getBorderColor,
  getPassFailClass,
  fiscalDateYear,
  chartProps as chart,
 } from './utils'
import { faMoneyBillWave } from '@fortawesome/free-solid-svg-icons'

function FreeCashFlowItem({unit, freeCashFlowItems}) {
  const [pass, setPass] = React.useState(true)

  React.useEffect(() => {
    if (freeCashFlowItems && freeCashFlowItems[0]) {
      freeCashFlowItems.forEach((item) => {
        let fail = item.freeCashFlow < 0
        if (fail) {
          setPass(false)
        }
      })
    }
  }, [freeCashFlowItems])

  const passFailClass = (freeCashFlow) => {
    const fail = freeCashFlow < 0
    return getPassFailClass(fail)
  }

  // Begin chart data
  const yearLabels = freeCashFlowItems.map((item) => {
    return fiscalDateYear(item.fiscalDate)
  })

  const freeCashFlowDataset = freeCashFlowItems.map((item) => {
    return item.freeCashFlow
  })

  const freeCashFlowChartData = () => {
    return {
      labels: yearLabels,
      datasets: [
        {
          label: 'Free Cash Flow',
          data: freeCashFlowDataset,
          backgroundColor: chart.color.blue,
          borderColor: chart.color.blueBorder,
          borderWidth: chart.bar.borderWidth,
          barPercentage: chart.bar.percentage,
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
  // End chart data

  // Begin table data
  const displayYears = () => {
    return <YearsTableHeader years={freeCashFlowItems.map(item => fiscalDateYear(item.fiscalDate))}/>
  }

  const freeCashFlowData = () => {
    return freeCashFlowItems.map((item, index) => {
      return <td className={passFailClass(item.freeCashFlow)} key={index}>
        {item.freeCashFlow}
      </td>
    })
  }
  // End table data

  const borderColor = getBorderColor(pass)

  const freeCashFlowTip = <ItemTip
    guidance="Free cash flow should be increasing or consistent, and the recent year should be positive."
    definition="This is cash that a company generates after paying expenses."
    importance="It can allow a company to develop new products, make
    acquisitions, pay dividends, or reduce debt. Growing free cash flows frequently
    leads to increased earnings."
    caution="It should not be continuously decreasing."
  />

  return <>
    <div className="w-full md:w-1/2 xl:w-1/3 p-3">
      <div className={`h-full border-b-4 bg-white ${borderColor} rounded-md shadow-lg p-5`}>
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
  </>
}

export default FreeCashFlowItem