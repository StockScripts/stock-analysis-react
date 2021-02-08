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
  chartProps as chart,
  fiscalDateYear,
 } from './utils'
 import { faFunnelDollar } from '@fortawesome/free-solid-svg-icons'

function NetIncomeItem({unit, netIncomeItems}) {
  const [pass, setPass] = React.useState(true)
  const [tipDisplay, setTipDisplay] = React.useState(false)

  React.useEffect(() => {
    if (netIncomeItems && netIncomeItems[0].netIncome) {
      netIncomeItems.forEach((item) => {
        if (checkFail(item.netIncome, item.netIncomeYOY)) {
          setPass(false)
        }
      })
    }
  }, [netIncomeItems])

  const checkFail = (netIncome, netIncomeYOY) => (netIncome < 0 || netIncomeYOY < 0)

  const passFailClass = (netIncome, netIncomeYOY) => {
    return getPassFailClass(checkFail(netIncome, netIncomeYOY))
  }

  // Begin chart data
  const yearLabels = netIncomeItems.map((item) => {
    return fiscalDateYear(item.fiscalDate)
  })

  const netIncomeDataset = netIncomeItems.map((item) => {
    return item.netIncome
  })
  
  const revenueDataset = netIncomeItems.map((item) => {
    return item.revenue
  })

  const netMarginDataset = netIncomeItems.map((item) => {
    return item.netMargin
  })

  const netIncomeLabel = `Net Income (${unit})`
  const revenueLabel = `Revenue (${unit})`

  const netIncomeChartData = () => {
    return {
      labels: yearLabels,
      datasets: [
        {
          label: netIncomeLabel,
          data: netIncomeDataset,
          backgroundColor:chart.color.green,
          borderColor: chart.color.greenBorder,
          borderWidth: chart.bar.borderWidth,
          barPercentage: chart.bar.percentage,
        },
        {
          label: revenueLabel,
          data: revenueDataset,
          backgroundColor: chart.color.blue,
          borderColor: chart.color.blueBorder,
          borderWidth: chart.bar.borderWidth,
          barPercentage: chart.bar.percentage,
        },
        {
          label: 'Net Margin',
          hidden: true,
          data: netMarginDataset,
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
          let netIncomeData = data['datasets'][0]['data'][tooltipItem['index']]
          let revenueData = data['datasets'][1]['data'][tooltipItem['index']]
          switch (label) {
            case netIncomeLabel:
              return `Net Income: ${netIncomeData} ${unit}`
            case revenueLabel:
              return `Revenue: ${revenueData} ${unit}`
            default:
              break
          }
        },
        afterLabel: function(tooltipItem, data) {
          return `Net Margin: ${data['datasets'][2]['data'][tooltipItem['index']]}%`
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
    //         labelString: `Net Income / Revenue (${unit})`
    //       }
    //     },
    //   ],
    // },
  }
  // End chart data

  // Begin table data
  const displayYears = () => {
    return <YearsTableHeader years={netIncomeItems.map(item => fiscalDateYear(item.fiscalDate))}/>
  }
  
  const netMarginData = () => {
    return netIncomeItems.map((item, index) => {
      return <td className={passFailClass(item.netMargin)} key={index}>
        {item.netMargin}%
      </td>
    })
  }

  const netIncomeData = () => {
    return netIncomeItems.map((item, index) => {
      return <td className={passFailClass(item.netIncome, item.netIncomeYOY ? item.netIncomeYOY : null)} key={index}>
        {item.netIncome}
      </td>
    })
  }

  const netIncomeYOYData = () => {
    return netIncomeItems.map((item, index) => {
      return <td className={passFailClass(item.netIncome, item.netIncomeYOY ? item.netIncomeYOY : null)} key={index}>
        {item.netIncomeYOY != null ? `${item.netIncomeYOY}%` : ''}
      </td>
    })
  }
  // End table data

  const guidance = (pass) => {
    if (pass) {
      return "YOY growth values are positive which means net income has been increasing each year."
    }
    return "Net income has decreased. Ideally, it should be increasing every year."
  }

  const closeTip = () => {
    setTipDisplay(false)
  }

  const profitsTip = <ItemTip
    guidance={guidance(pass)}
    definition="Net income is known as the bottom line, and it's what's left of the revenue after a
      company pays off all the expenses. Net profit margin is the percentage of revenue remaining."
    importance="Net income indicates whether a company is profitable and it's used to calculate the EPS,
      which can drive the stock price. Net margin measures how good a company is at converting revenue into profits."
    caution="If net margin is increasing significantly, it could be due to a decrease in tax rate
      or from reducing expenses. Constantly cutting costs may not be sustainable in the long term."
    onClose={closeTip}
  />

  let itemTitle = <ItemTitle
    title="Net Income"
    pass={pass}
    icon={faFunnelDollar}
    tip={profitsTip}
    setDisplay={setTipDisplay}
    tipDisplay={tipDisplay}
  />

  let itemChart = <Bar data={netIncomeChartData} options={options} />

  let tableBody = <tbody>
    <tr>
      <th className="w-1/5"></th>
      {displayYears()}
    </tr>
    <tr>
      <RowHeader itemName='Net Margin' />
      {netMarginData()}
    </tr>
    <tr>
      <RowHeader itemName={`Net Income (${unit})`} />
      {netIncomeData()}
    </tr>
    <tr>
      <RowHeader itemName='YOY Growth' />
      {netIncomeYOYData()}
    </tr>
  </tbody>

  return <ReportItem 
    itemTitle={itemTitle}
    borderColor={getBorderColor(pass)}
    itemChart={itemChart}
    tableBody={tableBody}
  />
}

export default NetIncomeItem