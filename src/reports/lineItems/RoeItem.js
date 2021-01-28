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
import { faHandHoldingUsd } from '@fortawesome/free-solid-svg-icons'

function ROE({unit, roeItems}) {
  const [pass, setPass] = React.useState(true)

  React.useEffect(() => {
    if (roeItems && roeItems[0].netIncome) {
      roeItems.forEach((item) => {
        let fail = item.roe < 10
        if (fail) {
          setPass(false)
        }
      })
    }
  }, [roeItems])

  const passFailClass = (roe) => {
    const fail = roe < 10
    return getPassFailClass(fail)
  }

  // Begin chart data
  const yearLabels = roeItems.map((item) => {
    return fiscalDateYear(item.fiscalDate)
  })

  const roeDataset = roeItems.map((item) => {
    return item.roe
  })

  const netIncomeDataset = roeItems.map((item) => {
    return item.netIncome
  })

  const equityDataset = roeItems.map((item) => {
    return item.equity
  })

  const roeChartData = () => {
    return {
      labels: yearLabels,
      datasets: [
        {
          label: 'roe',
          data: roeDataset,
          backgroundColor: chart.color.blue,
          borderColor: chart.color.blueBorder,
          borderWidth: chart.bar.borderWidth,
          barPercentage: chart.bar.percentage,
        },
        {
          label: 'net income',
          data: netIncomeDataset,
          hidden: true,
        },
        {
          label: 'equity',
          data: equityDataset,
          hidden: true,
        }
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
          return `ROE: ${data['datasets'][0]['data'][tooltipItem['index']]}%`;
        },
        afterLabel: function(tooltipItem, data) {
          return `Net Income: ${data['datasets'][1]['data'][tooltipItem['index']]} ${unit} \
          \nEquity: ${data['datasets'][2]['data'][tooltipItem['index']]} ${unit}`
        }
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
            labelString: `ROE (%)`
          }
        },
      ],
    },
  }
  // End chart data

  // Begin table data
  const displayYears = () => {
    return <YearsTableHeader years={roeItems.map(item => fiscalDateYear(item.fiscalDate))}/>
  }

  const roeData = () => {
    return roeItems.map((item, index) => {
      return <td className={passFailClass(item.roe)} key={index}>
        {item.roe}%
      </td>
    })
  }
  // End table data

  const borderColor = getBorderColor(pass)

  const roeTip = <ItemTip
    guidance="ROE should be at least 10% and should not be continuously decreasing."
    definition="Return on Equity is the net income divided by shareholders equity.
      It tells you how much the shareholders get for their investment."
    importance="Companies with high ROE and low debt are able to raise money for growth. 
      It means they can invest back into the business without needing more capital."
    caution="ROE can increase if the company is acquiring more debt. If liabilities increase,
      equity decreases, which boosts ROE. Check the Liabilities item and see if the company
      is becoming too leveraged."
  />

  return <>
    <div className="w-full md:w-1/2 xl:w-1/3 p-3">
      <div className={`h-full border-b-4 bg-white ${borderColor} rounded-md shadow-lg p-5`}>
        <div className="p-3">
          <ItemTitle
            title='ROE'
            pass={pass}
            icon={faHandHoldingUsd}
            tip={roeTip}
          />
        </div>
        <Bar data={roeChartData} options={options} />
        <table className="w-full table-auto">
          <tbody>
            <tr>
              <th></th>
              {displayYears()}
            </tr>
            <tr>
              <RowHeader itemName='ROE' />
              {roeData()}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </>
}

export default ROE