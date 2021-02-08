import React from 'react';
import {
  Bar
} from 'react-chartjs-2'
import { 
  getBorderColor,
  getPassFailClass,
  chartProps as chart,
  fiscalDateYear,
 } from './utils'
 import {
  YearsTableHeader,
  RowHeader,
} from './components/TableComponents'
 import {
  ReportItem,
  ItemTitle,
  ItemTip
} from './components/ReportComponents'
import { faCreditCard } from '@fortawesome/free-solid-svg-icons'

function DebtItem({unit, debtItems}) {
  const [pass, setPass] = React.useState(true)
  const [tipDisplay, setTipDisplay] = React.useState(false)

  React.useEffect(() => {
    if (debtItems) {
      debtItems.forEach((item) => {
        if (checkFail(item.netIncomeToLongTermDebt, item.longTermDebt)) {
          setPass(false)
        }
      })
    }
  }, [debtItems])

  const checkFail = (netIncomeToLongTermDebt, longTermDebt) => {
    if (longTermDebt == 0) {
      return false
    }
    return (netIncomeToLongTermDebt < 0.2)
  }

  const passFailClass = (netIncomeToLongTermDebt, longTermDebt) => {
    return getPassFailClass(checkFail(netIncomeToLongTermDebt, longTermDebt))
  }

  // Begin chart data
  const yearLabels = debtItems.map((item) => {
    return fiscalDateYear(item.fiscalDate)
  })

  const debtDataset = debtItems.map((item) => {
    return item.longTermDebt
  })

  const netIncomeDataset = debtItems.map((item) => {
    return item.netIncome
  })

  const netIncometoDebtDataset = debtItems.map((item) => {
    return item.netIncomeToLongTermDebt
  })

  const netIncomeLabel = `Net Income (${unit})`
  const longTermDebtLabel = `Long Term Debt (${unit})`

  const debtChartData = () => {
    return {
      labels: yearLabels,
      datasets: [
        {
          label: netIncomeLabel,
          data: netIncomeDataset,
          backgroundColor: chart.color.blue,
          borderColor: chart.color.blueBorder,
          borderWidth: chart.bar.borderWidth,
          barPercentage: chart.bar.percentage,
        },
        {
          label: longTermDebtLabel,
          data: debtDataset,
          backgroundColor: chart.color.orange,
          borderColor: chart.color.orangeBorder,
          borderWidth: chart.bar.borderWidth,
          barPercentage: chart.bar.percentage,
        },
        {
          label: 'Net Income to Long Term Debt',
          hidden: true,
          data: netIncometoDebtDataset,
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
          let longTermDebtData = data['datasets'][1]['data'][tooltipItem['index']]
          switch (label) {
            case netIncomeLabel:
              return `Net Income: ${netIncomeData} ${unit}`
            case longTermDebtLabel:
              return `Long Term Debt: ${longTermDebtData} ${unit}`
            default:
              return 'n/a'
          }
        },
        afterLabel: function(tooltipItem, data) {
          let incomeToDebt = data['datasets'][2]['data'][tooltipItem['index']]
          return `Net Income to Debt: ${incomeToDebt || '--'}`
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
    //         labelString: `Net Income /  Debt (${unit})`
    //       }
    //     },
    //   ],
    // },
  }
  // End chart data

  // Begin table data
  const displayYears = () => {
    return <YearsTableHeader years={debtItems.map(item => fiscalDateYear(item.fiscalDate))}/>
  }

  const longTermDebtData = () => {
    return debtItems.map((item, index) => {
      return <td className={passFailClass(item.netIncomeToLongTermDebt, item.longTermDebt)} key={index}>
        {item.longTermDebt}
      </td>
    })
  }

  const netIncomeData = () => {
    return debtItems.map((item, index) => {
      return <td className={passFailClass(item.netIncomeToLongTermDebt, item.longTermDebt)} key={index}>
        {item.netIncome}
      </td>
    })
  }

  const netIncomeToLongTermDebtData = () => {
    return debtItems.map((item, index) => {
      return <td className={passFailClass(item.netIncomeToLongTermDebt, item.longTermDebt)} key={index}>
        {item.netIncomeToLongTermDebt || '--'}
      </td>
    })
  }
  // End table data

  const guidance = (pass) => {
    if (pass) {
      return "Net income to long term debt is consistently greater than 0.2, which means the \
      company has enough earnings to pay off all their long term debt within 5 years. "
    }
    return "A company should have enough earnings to pay off all their long term debt within 5 \
    years. This means net income to long term debt should be greater than 0.2."
  }

  const closeTip = () => {
    setTipDisplay(false)
  }

  const debtTip = <ItemTip
    guidance={guidance(pass)}
    definition="Long term debt is debt that matures past a year. Long term debt to net income is
      a measure of how long it would take a company to pay off debt based on its income."
    importance="Companies can use debt to improve profitability,
    but profitable companies shouldn't need large amounts of debt. More importantly,
    a company should be able to afford their debt."
    caution="Increasing ROE may be due to increasing debt."
    onClose={closeTip}
  />

  let itemTitle = <ItemTitle
    title="Debt"
    pass={pass}
    icon={faCreditCard}
    tip={debtTip}
    setDisplay={setTipDisplay}
    tipDisplay={tipDisplay}
  />

  let itemChart = <Bar data={debtChartData} options={options} />

  let tableBody = <tbody>
    <tr>
      <th className="w-1/5"></th>
      {displayYears()}
    </tr>
    <tr>
      <RowHeader itemName={`Long Term Debt (${unit})`} />
      {longTermDebtData()}
    </tr>
    <tr>
      <RowHeader itemName={`Net Income (${unit})`} />
      {netIncomeData()}
    </tr>
    <tr>
      <RowHeader itemName='Net Income to Debt' />
      {netIncomeToLongTermDebtData()}
    </tr>
  </tbody>

  return <ReportItem 
    itemTitle={itemTitle}
    borderColor={getBorderColor(pass)}
    itemChart={itemChart}
    tableBody={tableBody}
  />
}

export default DebtItem