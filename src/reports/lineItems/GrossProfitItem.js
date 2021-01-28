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
 import { faCoins } from '@fortawesome/free-solid-svg-icons'

function GrossProfitItem({unit, grossProfitItems}) {
  const [pass, setPass] = React.useState(true)

  React.useEffect(() => {
    if (grossProfitItems && grossProfitItems[0].grossProfit) {
      grossProfitItems.forEach((item) => {
        let fail = item.grossMargin < 20
        if (fail) {
          setPass(false)
        }
      })
    }
  }, [grossProfitItems])

  const passFailClass = (grossMargin) => {
    let fail = grossMargin < 20
    return getPassFailClass(fail)
  }

  // Begin chart data
  const yearLabels = grossProfitItems.map((item) => {
    return fiscalDateYear(item.fiscalDate)
  })

  const revenueDataset = grossProfitItems.map((item) => {
    return item.revenue
  })
  
  const grossProfitsDataset = grossProfitItems.map((item) => {
    return item.grossProfit
  })

  const grossMarginDataset = grossProfitItems.map((item) => {
    return item.grossMargin
  })

  const grossProfitsChartData = () => {
    return {
      labels: yearLabels,
      datasets: [
        {
          label: 'Gross Profit',
          data: grossProfitsDataset,
          backgroundColor: chart.color.green,
          borderColor: chart.color.greenBorder,
          borderWidth: chart.bar.borderWidth,
          barPercentage: chart.bar.percentage,
        },
        {
          label: 'Revenue',
          data: revenueDataset,
          backgroundColor: chart.color.blue,
          borderColor: chart.color.blueBorder,
          borderWidth: chart.bar.borderWidth,
          barPercentage: chart.bar.percentage,
        },
        {
          label: 'Gross Margin',
          hidden: true,
          data: grossMarginDataset,
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
          let label = data.datasets[tooltipItem.datasetIndex].label || '';
          let grossProfitData = data['datasets'][0]['data'][tooltipItem['index']]
          let revenueData = data['datasets'][1]['data'][tooltipItem['index']]
          switch (label) {
            case 'Gross Profit':
              return `Gross Profit: ${grossProfitData} ${unit}`
            case 'Revenue':
              return `Revenue: ${revenueData} ${unit}`
            default:
              break
          }
        },
        afterLabel: function(tooltipItem, data) {
          return `Gross Margin: ${data['datasets'][2]['data'][tooltipItem['index']]}%`
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
            labelString: `Gross Profit / Revenue (${unit})`
          }
        },
      ],
    },
  }
  // End chart data

  // Begin table data
  const displayYears = () => {
    return <YearsTableHeader years={grossProfitItems.map(item => fiscalDateYear(item.fiscalDate))}/>
  }

  const grossMarginData = () => {
    return grossProfitItems.map((item, index) => {
      return <td className={passFailClass(item.grossMargin)} key={index}>
        {item.grossMargin}%
      </td>
    })
  }
  // End table data

  const borderColor = getBorderColor(pass)

  const grossProfitsTip = <ItemTip
    guidance="A gross margin of less than 20% usually means a company is in a very
      competitive industry where it may be hard to sustain a competitive advantage."
    definition="Gross profit is the amount left after subtracting the cost to make products
      from the revenue. Gross margin is the percentage of revenue remaining."
    importance="A company that can make products at a low cost is at an advantage."
    caution="Gross margin can vary greatly between different companies, but the value should be consistent
      for each company."
  />

  return <>
    <div className="w-full md:w-1/2 xl:w-1/3 p-3">
      <div className={`h-full border-b-4 bg-white ${borderColor} rounded-md shadow-lg p-5`}>
        <div className="p-3">
          <ItemTitle
            title="Gross Profits"
            pass={pass}
            icon={faCoins}
            tip={grossProfitsTip}
          />
        </div>
        <Bar data={grossProfitsChartData} options={options} />
        <table className="w-full table-auto">
          <tbody>
            <tr>
              <th className="w-1/5"></th>
              {displayYears()}
            </tr>
            <tr>
              <RowHeader itemName='Gross Margin' />
              {grossMarginData()}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </>
}

export default GrossProfitItem