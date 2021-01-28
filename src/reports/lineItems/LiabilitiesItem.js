import React from 'react';
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
  Bar
} from 'react-chartjs-2'
import { 
  getBorderColor,
  getPassFailClass,
  chartProps as chart,
  fiscalDateYear,
 } from './utils'
 import { faBalanceScale } from '@fortawesome/free-solid-svg-icons'

function LeverageItem({unit, liabilitiesItems}) {
  const [pass, setPass] = React.useState(true)

  React.useEffect(() => {
    if (liabilitiesItems && liabilitiesItems[0].totalLiabilities) {
      liabilitiesItems.forEach((item) => {
        if (checkFail(item.leverageRatio, item.longTermDebtToEquity)) {
          setPass(false)
        }
      })
    }
  }, [liabilitiesItems])

  const checkFail = (leverageRatio, longTermDebtToEquity) => {
    return (leverageRatio > 2 && longTermDebtToEquity > 50) 
  } 

  const passFailClass = (leverageRatio, longTermDebtToEquity) => {
    return getPassFailClass(checkFail(leverageRatio, longTermDebtToEquity))
  }

  // Begin chart data
  const yearLabels = liabilitiesItems.map((item) => {
    return fiscalDateYear(item.fiscalDate)
  })

  const longTermDebtDataset = liabilitiesItems.map((item) => {
    return item.longTermDebt
  })

  const liabilitiesDataset = liabilitiesItems.map((item) => {
    return item.totalLiabilities - item.longTermDebt
  })

  const equityDataset = liabilitiesItems.map((item) => {
    return item.shareholderEquity
  })

  const leverageChartData = () => {
    return {
      labels: yearLabels,
      datasets: [
        {
          label: 'Long Term Debt',
          data: longTermDebtDataset,
          backgroundColor: chart.color.darkOrange,
          borderColor: chart.color.orangeBorder,
          borderWidth: chart.bar.borderWidth,
          barPercentage: chart.bar.percentage,
          stack: 1,
        },
        {
          label: 'Total Liabilities',
          data: liabilitiesDataset,
          backgroundColor: chart.color.orange,
          borderColor: chart.color.orangeBorder,
          borderWidth: chart.bar.borderWidth,
          barPercentage: chart.bar.percentage,
          stack: 1,
        },
        {
          label: 'Equity',
          data: equityDataset,
          backgroundColor: chart.color.blue,
          borderColor: chart.color.blueBorder,
          borderWidth: chart.bar.borderWidth,
          barPercentage: chart.bar.percentage,
          stack: 2,
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
          let label = data.datasets[tooltipItem.datasetIndex].label || ''
          let longTermDebtData = data['datasets'][0]['data'][tooltipItem['index']]
          let totalLiabilitiesData = parseFloat(data['datasets'][1]['data'][tooltipItem['index']]) + parseFloat(longTermDebtData)
          let equityData = data['datasets'][2]['data'][tooltipItem['index']]
          switch (label) {
            case 'Long Term Debt':
              return `Long Term Debt: ${longTermDebtData} ${unit}`
            case 'Total Liabilities':
              return `Total Liabilities: ${totalLiabilitiesData} ${unit}`
            case 'Equity':
              return `Equity: ${equityData} ${unit}`
            default:
              return null
          }
        },
      }
    },
    legend: {
      display: chart.legend.display,
      position: chart.legend.position,
      labels: {
        boxWidth: chart.legend.boxWidth,
        fontSize: chart.legend.fontSize,
        padding: chart.legend.padding,
        filter: function(legendItem, _) {
          return legendItem.datasetIndex != 0 
        }
      }
    },
    scales: {
      yAxes: [
        {
          stacked: true,
          ticks: {
            beginAtZero: true,
          },
          scaleLabel: {
            display: true,
            labelString: `Liabilities / Equity (${unit})`
          }
        },
      ],
    },
  }
  // End chart data

  // Begin table data
  const displayYears = () => {
    return <YearsTableHeader years={liabilitiesItems.map(item => fiscalDateYear(item.fiscalDate))}/>
  }

  const leverageRatioData = () => {
    return liabilitiesItems.map((item, index) => {
      return <td className={passFailClass(item.leverageRatio, item.longTermdebtToEquity)} key={index}>
        {item.leverageRatio}
      </td>
    })
  }

  const longTermDebtToEquityData = () => {
    return liabilitiesItems.map((item, index) => {
      return <td className={passFailClass(item.leverageRatio, item.longTermDebtToEquity)} key={index}>
        {item.longTermDebtToEquity}%
      </td>
    })
  }
  // End table data

  const guidance = (pass) => {
    if (pass) {
      return "Some industries have high leverage ratios, but in general, a leverage ratio of less \
        than 2 and a debt to equity of less than 50% is a good sign."
    }
    return "Some industries have high leverage ratios, but in general, a leverage ratio greater \
      than 2 and a debt to equity greater than 50% is considered risky."
  }

  const liabilitiesTip = <ItemTip
    guidance={guidance(pass)}
    definition="Financial leverage means you're using money to make money. One measure is to
      divide total liabilities by equity, which we're calling leverage ratio. For example,
      a leverage ratio of 2 means for every dollar of equity, the company has 2 dollars of
      liability. Some investors focus on long term debt, referred to here as long term
      debt to equity."
    importance="Increased leverage can lead to potential profitability, but also potential risk."
    caution="Increasing ROE may be due to increasing debt."
  />

  let itemTitle = <ItemTitle
    title="Liabilities "
    pass={pass}
    icon={faBalanceScale}
    tip={liabilitiesTip}
  />

  let itemChart = <Bar data={leverageChartData} options={options} />

  let tableBody = <tbody>
      <tr>
        <th className="w-1/5"></th>
        {displayYears()}
      </tr>
      <tr>
        <RowHeader itemName='Leverage Ratio' />
        {leverageRatioData()}
      </tr>
      <tr>
        <RowHeader itemName='Long Term Debt to Equity' />
        {longTermDebtToEquityData()}
      </tr>
    </tbody>

  return <ReportItem 
    itemTitle={itemTitle}
    borderColor={getBorderColor(pass)}
    itemChart={itemChart}
    tableBody={tableBody}
  />
}

export default LeverageItem