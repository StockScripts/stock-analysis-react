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
 import { faBalanceScale } from '@fortawesome/free-solid-svg-icons'

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

  // const liabilitiesData = () => {
  //   return liabilitiesItems.map((item, index) => {
  //     return <td className={_debtPassFailClass(item.liabilities)} key={index}>
  //       {formatValue(item.totalLiabilities, unit)} {unit}
  //     </td>
  //   })
  // }

  // const equityData = () => {
  //   return liabilitiesItems.map((item, index) => {
  //     return <td className={_debtPassFailClass(item.liabilities)} key={index}>
  //       {formatValue(item.shareholderEquity, unit)} {unit}
  //     </td>
  //   })
  // }

  // const longTermDebtData = () => {
  //   return liabilitiesItems.map((item, index) => {
  //     return <td className={_debtPassFailClass(item.longTermDebt)} key={index}>
  //       {formatValue(item.longTermDebt, unit)} {unit}
  //     </td>
  //   })
  // }

  const longTermDebtToEquityData = () => {
    return liabilitiesItems.map((item, index) => {
      return <td className={_debtPassFailClass(item.longTermDebtToEquity)} key={index}>
        {item.longTermDebtToEquity}%
      </td>
    })
  }

  const yearLabels = liabilitiesItems.map((item) => {
    return fiscalDateYear(item.fiscalDate)
  })

  const longTermDebtDataset = liabilitiesItems.map((item) => {
    return formatValue(item.longTermDebt, unit)
  })

  const liabilitiesDataset = liabilitiesItems.map((item) => {
    return formatValue(item.totalLiabilities - item.longTermDebt, unit)
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
        {
          label: 'Long Term Debt',
          data: longTermDebtDataset,
          backgroundColor: 'rgba(255, 159, 64, 0.4)',
          borderColor: 'rgb(255, 159, 64)',
          borderWidth: 1,
          barPercentage: .6,
          stack: 1,
        },
        {
          label: 'Total Liabilities',
          data: liabilitiesDataset,
          backgroundColor: 'rgba(255, 159, 64, 0.2)',
          borderColor: 'rgb(255, 159, 64)',
          borderWidth: 1,
          barPercentage: .6,
          stack: 1,
        },
        {
          label: 'Equity',
          data: equityDataset,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          barPercentage: .6,
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
          let label = data.datasets[tooltipItem.datasetIndex].label || '';
          let longTermDebtData = data['datasets'][0]['data'][tooltipItem['index']]
          let totalLiabilitiesData = parseFloat(data['datasets'][1]['data'][tooltipItem['index']]) + parseFloat(longTermDebtData)
          let equityData = data['datasets'][2]['data'][tooltipItem['index']]
          switch (label) {
            case 'Long Term Debt':
              return `Long Term Debt: ${longTermDebtData} ${unit}`;
            case 'Total Liabilities':
              return `Total Liabilities: ${totalLiabilitiesData} ${unit}`;
            case 'Equity':
              return `Equity: ${equityData} ${unit}`;
          }
        },
      }
    },
    legend: {
      display: false
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

  const borderColor = pass ? 'border-green-600' : 'border-orange-600'
  const liabilitiesTip = <LiabilitiesTip />

  return (
    <>
    <div className="w-full md:w-1/2 xl:w-1/3 p-3">
      <div class={`h-full border-b-4 bg-white ${borderColor} rounded-md shadow-lg p-5`}>
        <div className="p-3">
          <ItemTitle
            title="Liabilities "
            pass={pass}
            icon={faBalanceScale}
            tip={liabilitiesTip}
          />
        </div>
        <Bar data={leverageChartData} options={options} />
        <table className="w-full table-auto">
          <tbody>
            <tr>
              <th className="w-1/5"></th>
              {displayYears()}
            </tr>
            {/* <tr>
              <RowHeader itemName='Liabilities' />
              {liabilitiesData()}
            </tr> */}
            <tr>
              <RowHeader itemName='Leverage Ratio' />
              {leverageRatioData()}
            </tr>
            {/* <tr>
              <RowHeader itemName='Long Term Debt' />
              {longTermDebtData()}
            </tr> */}
            <tr>
              <RowHeader itemName='Long Term Debt to Equity' />
              {longTermDebtToEquityData()}
            </tr>
            {/* <tr>
              <RowHeader itemName='Equity' />
              {equityData()}
            </tr> */}
          </tbody>
        </table>
      </div>
    </div>
  </>
  )
}

function LiabilitiesTip() {
  return (
    <div>
      <div className="text-right font-bold mt-1 mr-1">x</div>
      <div className="font-semibold text-sm ml-1">What is it:</div>
        <div className="text-sm mb-1 ml-1">
          Financial leverage means you're using money to make money. One measure is to
          divide total liabilities by equity, which we're calling leverage ratio.
          Another is to focus on long term debt, referred to here as long term
          debt to equity.
        </div>
      <div className="font-semibold text-sm ml-1">Why it's important:</div>
        <div className="text-sm mb-1 ml-1">
          Increased leverage can lead to potential profitability, but also potential risk.
        </div>
      <div className="font-semibold text-sm ml-1">What to look for:</div>
        <div className="text-sm mb-1 ml-1">
          Some industries have high leverage ratios, but in general, a 
          value greater than 2 is considered risky. This means for every
          dollar of equity, the company has 2 dollars of liability. When looking at long term
          debt to equity, a value greater than 50% is considered risky.
        </div>
      <div className="font-semibold text-sm ml-1">What to watch for:</div>
        <div className="text-sm mb-1 ml-1">
          Increasing ROE may be due to increasing debt.
        </div>
    </div>
  )
}

export default LeverageItem