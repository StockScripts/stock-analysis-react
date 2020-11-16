import React from 'react';
import {
  Bar
} from 'react-chartjs-2'
import { 
  getUnit,
  formatValue,
  fiscalDateYear,
 } from './utils'
 import {
  YearsTableHeader,
  RowHeader,
} from './components/TableComponents'
 import {
  ItemTitle
} from './components/ReportComponents'
import { faCreditCard } from '@fortawesome/free-solid-svg-icons'

function DebtItem({debtItems}) {
  const [unit, setUnit] = React.useState(null)
  const [displayInfo, setDisplayInfo] = React.useState(false);
  const [pass, setPass] = React.useState(true)

  React.useEffect(() => {
    if (debtItems && debtItems[0].longTermDebt) {
      setUnit(getUnit(debtItems[0].longTermDebt))
      debtItems.forEach((item) => {
        if (item.netIncomeToLongTermDebt > 2) {
          setPass(false)
        }
      })
    }
  }, [debtItems])

  const _passFailClass = (value) => {
    let classColor = 'text-green-600'

    if (value < 0.2) {
      classColor = 'text-orange-600'
    }
    return `text-sm py-1 ${classColor}`
  }

  // const netIncomeToLongTermDebtData = () => {
  //   return debtRepaymentItems.map((item) => {
  //     return <td className={_passFailClass(item.netIncomeToLongTermDebt)}>
  //       {item.netIncomeToLongTermDebt}%
  //     </td>
  //   })
  // }

  const displayYears = () => {
    return <YearsTableHeader years={debtItems.map(item => fiscalDateYear(item.fiscalDate))}/>
  }

  const longTermDebtData = () => {
    return debtItems.map((item, index) => {
      return <td className={_passFailClass(item.netIncomeToLongTermDebt)} key={index}>
        {formatValue(item.longTermDebt, unit)} {unit}
      </td>
    })
  }

  const netIncomeData = () => {
    return debtItems.map((item, index) => {
      return <td className={_passFailClass(item.netIncomeToLongTermDebt)} key={index}>
        {formatValue(item.netIncome, unit)} {unit}
      </td>
    })
  }

  const netIncomeToLongTermDebtData = () => {
    return debtItems.map((item, index) => {
      return <td className={_passFailClass(item.netIncomeToLongTermDebt)} key={index}>
        {item.netIncomeToLongTermDebt}
      </td>
    })
  }

  const yearLabels = debtItems.map((item) => {
    return fiscalDateYear(item.fiscalDate)
  })

  const debtDataset = debtItems.map((item) => {
    return formatValue(item.longTermDebt, unit)
  })

  const netIncomeDataset = debtItems.map((item) => {
    return formatValue(item.netIncome, unit)
  })

  const debtChartData = () => {
    return {
      labels: yearLabels,
      datasets: [
        {
          label: 'Long Term Debt',
          data: debtDataset,
          backgroundColor: 'rgba(255, 159, 64, 0.2)',
          borderColor: 'rgb(255, 159, 64)',
          borderWidth: 1,
          barPercentage: .6,
        },
        {
          label: 'Net Income',
          data: netIncomeDataset,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          barPercentage: .6,
        },
      ],
    }
  }

  const options = {
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
            labelString: `Net Income /  Debt (${unit})`
          }
        },
      ],
    },
  }

  const borderColor = pass ? 'border-green-600' : 'border-orange-600'

  return <>
    <div className="w-full md:w-1/2 xl:w-1/3 p-3">
      <div class={`h-full border-b-4 bg-white ${borderColor} rounded-md shadow-lg p-5`}>
        <div className="p-3">
          <ItemTitle
            title="Debt"
            subtitle="Can you afford your debt?"
            pass={pass}
            icon={faCreditCard}
          />
          <Bar data={debtChartData} options={options} />
          <table className="w-full table-auto">
        <tbody>
          <tr>
            <th className="w-1/5"></th>
            {displayYears()}
          </tr>
          <tr>
            <RowHeader itemName='Debt' />
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
    {/* <div className="w-full h-full md:w-1/2 p-3">
      <div className="bg-white border rounded shadow">
        <div className="border-b p-3">
            <h5 className="font-bold text-indigo-600 text-opacity-75">Debt - Can you afford your debt?</h5>
        </div>
        <div className="p-5">
          <table className="shadow-lg bg-white mb-10">
            <tbody>
              <tr>
                <th className="bg-indigo-100 border-t border-l border-r-0 text-left px-8 py-4"></th>
                {displayYears()}
              </tr>
              <tr>
                <td className="border-t border-l border-r-0 px-8 py-4 font-bold text-left pl-12 text-indigo-800 text-opacity-75">Net Income to Long Term Debt</td>
                {netIncomeToLongTermDebtData()}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div> */}
  </>
}

export default DebtItem