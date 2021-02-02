import React from 'react';
import {
  Bar,
} from 'react-chartjs-2'
import {
  YearsTableHeader,
  RowHeader,
} from './components/TableComponents'
import {
  ReportItem,
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

  const grossProfitLabel = `Gross Profit (${unit})`
  const revenueLabel = `Revenue (${unit})`

  const grossProfitsChartData = () => {
    return {
      labels: yearLabels,
      datasets: [
        {
          label: grossProfitLabel,
          data: grossProfitsDataset,
          backgroundColor: chart.color.green,
          borderColor: chart.color.greenBorder,
          borderWidth: chart.bar.borderWidth,
          barPercentage: chart.bar.percentage,
        },
        {
          label: `Revenue (${unit})`,
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
    legend: {
      display: chart.legend.display,
      position: chart.legend.position,
      labels: {
        boxWidth: chart.legend.boxWidth,
        fontSize: chart.legend.fontSize,
        padding: chart.legend.padding,
        filter: function(legendItem, _) {
          return legendItem.datasetIndex != 2 
        }
      }
    },
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
            case grossProfitLabel:
              return `Gross Profit: ${grossProfitData} ${unit}`
            case revenueLabel:
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
    // scales: {
    //   yAxes: [
    //     {
    //       ticks: {
    //         beginAtZero: true,
    //       },
    //       scaleLabel: {
    //         display: true,
    //         labelString: `Gross Profit / Revenue (${unit})`
    //       }
    //     },
    //   ],
    // },
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

  const guidance = (pass) => {
    if (pass) {
      return "Gross margin is consistently above 20% which means the company can make its products \
        at a reasonable cost."
    }
    return "A gross margin of less than 20% usually means the company is in a \
    competitive industry where it may be hard to keep a competitive advantage, \
    but consistency is also key."
  }

  const grossProfitsTip = <ItemTip
    guidance={guidance(pass)}
    definition="Gross profit is the amount left after subtracting the cost to make products
      from the revenue. It's how much of the revenue they're keeping after making the product.
      Gross margin is the percentage of revenue remaining. The higher the value, the more profit
      they're keeping."
    importance="A company that can make products at a low cost is at an advantage."
    caution="Gross margin can vary greatly between different companies, but the value should be consistent
      for each company."
  />

  let itemTitle = <ItemTitle
    title="Gross Profits"
    pass={pass}
    icon={faCoins}
    tip={grossProfitsTip}
  />

  let itemChart = <Bar data={grossProfitsChartData} options={options} />

  let tableBody = <tbody>
      <tr>
        <th className="w-1/5"></th>
        {displayYears()}
      </tr>
      <tr>
        <RowHeader itemName='Gross Margin' />
        {grossMarginData()}
      </tr>
    </tbody>

  return <ReportItem 
    itemTitle={itemTitle}
    borderColor={getBorderColor(pass)}
    itemChart={itemChart}
    tableBody={tableBody}
  />
}

export default GrossProfitItem