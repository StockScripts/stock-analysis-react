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
  ItemTitle
  ,
  ItemTip
} from './components/ReportComponents'
import { faCreditCard } from '@fortawesome/free-solid-svg-icons'

function DebtItem({unit, debtItems}) {
  const [pass, setPass] = React.useState(true)

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

  const debtChartData = () => {
    return {
      labels: yearLabels,
      datasets: [
        {
          label: 'Net Income',
          data: netIncomeDataset,
          backgroundColor: chart.color.blue,
          borderColor: chart.color.blueBorder,
          borderWidth: chart.bar.borderWidth,
          barPercentage: chart.bar.percentage,
        },
        {
          label: 'Long Term Debt',
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
      display: false
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
            case 'Net Income':
              return `Net Income: ${netIncomeData} ${unit}`
            case 'Long Term Debt':
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
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
          scaleLabel: {
            display: true,
            labelString: `Net Income /  Debt (${unit})`
          }
        },
      ],
    },
  }
  // End chart data

  // Begin table data
  const displayYears = () => {
    return <YearsTableHeader years={debtItems.map(item => fiscalDateYear(item.fiscalDate))}/>
  }

  const longTermDebtData = () => {
    return debtItems.map((item, index) => {
      return <td className={passFailClass(item.netIncomeToLongTermDebt, item.longTermDebt)} key={index}>
        {item.longTermDebt} {unit}
      </td>
    })
  }

  const netIncomeData = () => {
    return debtItems.map((item, index) => {
      return <td className={passFailClass(item.netIncomeToLongTermDebt, item.longTermDebt)} key={index}>
        {item.netIncome} {unit}
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

  const borderColor = getBorderColor(pass)
  const debtTip = <ItemTip
    guidance="A company should have enough earnings to pay off all their long term debt within 5 years.
      This means net income to long term debt should be greater than 0.2."
    definition="Long term debt is debt that matures past a year. Long term debt to net income is
      a measure of how long it would take a company to pay off debt based on its income."
    importance="Companies can use debt to improve profitability,
    but profitable companies shouldn't need large amounts of debt. More importantly,
    a company should be able to afford their debt."
    caution="Increasing ROE may be due to increasing debt."
  />

  return <>
    <div className="w-full md:w-1/2 xl:w-1/3 p-3">
      <div class={`h-full border-b-4 bg-white ${borderColor} rounded-md shadow-lg p-5`}>
        <div className="p-3">
          <ItemTitle
            title="Debt"
            pass={pass}
            icon={faCreditCard}
            tip={debtTip}
          />
          <Bar data={debtChartData} options={options} />
          <table className="w-full table-auto">
        <tbody>
          <tr>
            <th className="w-1/5"></th>
            {displayYears()}
          </tr>
          <tr>
            <RowHeader itemName={`Long Term Debt (${unit})`} />
            {longTermDebtData()}
          </tr>
          <tr>
            <RowHeader itemName='Net Income' />
            {netIncomeData()}
          </tr>
          <tr>
            <RowHeader itemName='Net Income to Debt' />
            {netIncomeToLongTermDebtData()}
          </tr>
        </tbody>
      </table>
        </div>
      </div>
    </div>
  </>
}

export default DebtItem