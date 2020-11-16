import React from 'react';
import {
  YearsTableHeader,
  RowHeader,
} from './components/TableComponents'
import {
  ItemTitle
} from './components/ReportComponents'
import {
  Bar
} from 'react-chartjs-2'
import { 
  getUnit,
  formatValue,
  fiscalDateYear,
 } from './utils'
 import { faCoins } from '@fortawesome/free-solid-svg-icons'

function LeverageItem({liabilitiesItems}) {
  const [unit, setUnit] = React.useState(null)
  const [displayInfo, setDisplayInfo] = React.useState(false);
  const [pass, setPass] = React.useState(true)

  React.useEffect(() => {
    if (liabilitiesItems && liabilitiesItems[0].totalLiabilities) {
      setUnit(getUnit(liabilitiesItems[0].totalLiabilities))
      liabilitiesItems.forEach((item) => {
        if (item.leverageRatio > 2) {
          setPass(false)
        }
      })
    }
  }, [liabilitiesItems])

  const onClose = () => {
    setDisplayInfo(false)
  }

  const _leveragePassFailClass = (value) => {
    let classColor = 'text-green-600'

    if (value > 2) {
      classColor = 'text-orange-600'
    }
    return `text-sm py-1 ${classColor}`
  }

  const _debtPassFailClass = (value) => {
    let classColor = 'text-green-600'

    if (value > 40) {
      classColor = 'text-orange-600'
    }
    return `text-sm py-1 ${classColor}`
  }

  const _debtRepaymentPassFailClass = (value) => {
    let classColor = 'text-green-600'

    if (value < 0.2) {
      classColor = 'text-orange-600'
    }
    return `text-sm py-1 ${classColor}`
  }

  const displayYears = () => {
    return <YearsTableHeader years={liabilitiesItems.map(item => fiscalDateYear(item.fiscalDate))}/>
  }

  const leverageRatioData = () => {
    return liabilitiesItems.map((item, index) => {
      return <td className={_leveragePassFailClass(item.leverageRatio)} key={index}>
        {item.leverageRatio}
      </td>
    })
  }

  const liabilitiesData = () => {
    return liabilitiesItems.map((item, index) => {
      return <td className={_debtPassFailClass(item.liabilities)} key={index}>
        {formatValue(item.totalLiabilities, unit)} {unit}
      </td>
    })
  }

  const equityData = () => {
    return liabilitiesItems.map((item, index) => {
      return <td className={_debtPassFailClass(item.liabilities)} key={index}>
        {formatValue(item.shareholderEquity, unit)} {unit}
      </td>
    })
  }

  const longTermDebtData = () => {
    return liabilitiesItems.map((item, index) => {
      return <td className={_debtPassFailClass(item.liabilities)} key={index}>
        {formatValue(item.longTermDebt, unit)} {unit}
      </td>
    })
  }

  const netIncomeData = () => {
    return liabilitiesItems.map((item, index) => {
      return <td className={_debtPassFailClass(item.liabilities)} key={index}>
        {formatValue(item.netIncome, unit)} {unit}
      </td>
    })
  }

  const netIncomeToLongTermDebtData = () => {
    return liabilitiesItems.map((item, index) => {
      return <td className={_debtRepaymentPassFailClass(item.netIncomeToLongTermDebt)} key={index}>
        {item.netIncomeToLongTermDebt}
      </td>
    })
  }

  const yearLabels = liabilitiesItems.map((item) => {
    return fiscalDateYear(item.fiscalDate)
  })

  const leverageRatioDataset = liabilitiesItems.map((item) => {
    return item.leverageRatio
  })

  const liabilitiesDataset = liabilitiesItems.map((item) => {
    return formatValue(item.totalLiabilities, unit)
  })

  const equityDataset = liabilitiesItems.map((item) => {
    return formatValue(item.shareholderEquity, unit)
  })

  const debtDataset = liabilitiesItems.map((item) => {
    return formatValue(item.longTermDebt, unit)
  })

  const netIncomeDataset = liabilitiesItems.map((item) => {
    return formatValue(item.netIncome, unit)
  })

  const leverageChartData = () => {
    return {
      labels: yearLabels,
      datasets: [
        // {
        //   label: 'Leverage Ratio',
        //   data: leverageRatioDataset,
        //   backgroundColor: 'rgba(54, 162, 235, 0.2)',
        //   borderColor: 'rgba(54, 162, 235, 1)',
        //   borderWidth: 1,
        //   barPercentage: .6,
        // },
        {
          label: 'Liabilities',
          data: liabilitiesDataset,
          backgroundColor: 'rgba(255, 159, 64, 0.2)',
          borderColor: 'rgb(255, 159, 64)',
          borderWidth: 1,
          barPercentage: .6,
        },
        {
          label: 'Equity',
          data: equityDataset,
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
            labelString: `Liabilities / Equity (${unit})`
          }
        },
      ],
    },
  }

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

  const borderColor = pass ? 'border-green-600' : 'border-orange-600'

  return (
    <>
    <div className="w-full md:w-1/2 xl:w-1/3 p-3">
      <div class={`h-full border-b-4 bg-white ${borderColor} rounded-md shadow-lg p-5`}>
        <div className="p-3">
          <ItemTitle
            title="Liabilities "
            subtitle="Do you owe too much?"
            pass={pass}
            icon={faCoins}
          />
        </div>
        <Bar data={leverageChartData} options={options} />
        <table className="w-full table-auto">
          <tbody>
            <tr>
              <th className="w-1/5"></th>
              {displayYears()}
            </tr>
            <tr>
              <RowHeader itemName='Leverage Ratio' />
              {leverageRatioData()}
            </tr>
            <tr>
              <RowHeader itemName='Liabilities' />
              {liabilitiesData()}
            </tr>
            <tr>
              <RowHeader itemName='Equity' />
              {equityData()}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </>
  )
}

export default LeverageItem