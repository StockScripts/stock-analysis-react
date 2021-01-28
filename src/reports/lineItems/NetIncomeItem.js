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
  chartProps as chart,
  fiscalDateYear,
 } from './utils'
 import { faFunnelDollar } from '@fortawesome/free-solid-svg-icons'

function NetIncomeItem({unit, netIncomeItems}) {
  const [pass, setPass] = React.useState(true)

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

  const netIncomeChartData = () => {
    return {
      labels: yearLabels,
      datasets: [
        {
          label: 'Net Income',
          data: netIncomeDataset,
          backgroundColor:chart.color.green,
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
          label: 'Net Margin',
          hidden: true,
          data: netMarginDataset,
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
          let netIncomeData = data['datasets'][0]['data'][tooltipItem['index']]
          let revenueData = data['datasets'][1]['data'][tooltipItem['index']]
          switch (label) {
            case 'Net Income':
              return `Net Income: ${netIncomeData} ${unit}`
            case 'Revenue':
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
            labelString: `Net Income / Revenue (${unit})`
          }
        },
      ],
    },
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
        {item.netIncomeYOY ? `${item.netIncomeYOY}%` : ''}
      </td>
    })
  }
  // End table data

  const borderColor = getBorderColor(pass)

  const profitsTip = <ItemTip
    guidance="Net income should be increasing and net margin should be stable or increasing. "
    definition="Net income is known as the bottom line, and it's what's left of the revenue after a
      company pays off all the expenses. Net profit margin is the percentage of revenue remaining."
    importance="Net margin measures how good a company is at converting revenue into profits."
    caution="If net margin is increasing significantly, it could be due to a decrease in tax rate
      or from reducing expenses. Constantly cutting costs may not be sustainable in the long term."
  />

  return <>
    <div class="w-full md:w-1/2 xl:w-1/3 p-3">
      <div class={`h-full border-b-4 bg-white ${borderColor} rounded-md shadow-lg p-5`}>
        <div className="p-3">
          <ItemTitle
            title="Net Income"
            pass={pass}
            icon={faFunnelDollar}
            tip={profitsTip}
          />
        </div>
        <Bar data={netIncomeChartData} options={options} />
        <table className="w-full table-auto">
          <tbody>
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
        </table>
      </div>
    </div>
  </>
}

export default NetIncomeItem