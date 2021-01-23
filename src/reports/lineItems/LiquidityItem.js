import React from 'react';
import {
  Bar,
} from 'react-chartjs-2'
import {
  YearsTableHeader,
  RowHeader,
} from './components/TableComponents'
import {
  ItemTitle
} from './components/ReportComponents'
import { 
  getUnit,
  formatValue,
  fiscalDateYear,
 } from './utils'
 import { faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons'

function LiquidityItem({liquidityItems}) {
  const [unit, setUnit] = React.useState(null)
  const [pass, setPass] = React.useState(true)

  React.useEffect(() => {
    if (liquidityItems && liquidityItems[0].currentLiabilities) {
      setUnit(getUnit(liquidityItems[0].currentLiabilities))
      liquidityItems.forEach((item) => {
        if (item.currentRatio < 1) {
          setPass(false)
        }
      })
    }
  }, [liquidityItems])

  const _passFailClass = (value) => {
    let classColor = 'text-green-600'

    if (value < 1) {
      classColor = 'text-orange-600'
    }
    return `text-sm py-1 ${classColor}`
  }

  const yearLabels = liquidityItems.map((item) => {
    return fiscalDateYear(item.fiscalDate)
  })

  const currentRatioDataset = liquidityItems.map((item) => {
    return item.currentRatio
  })

  const currentAssetsDataset = liquidityItems.map((item) => {
    return formatValue(item.currentAssets, unit)
  })

  const currentLiabilitiesDataset = liquidityItems.map((item) => {
    return formatValue(item.currentLiabilities, unit)
  })

  const displayYears = () => {
    return <YearsTableHeader years={liquidityItems.map(item => fiscalDateYear(item.fiscalDate))}/>
  }

  const currentAssetsData = () => {
    return liquidityItems.map((item, index) => {
      return <td className={_passFailClass(item.currentRatio)} key={index}>
        {formatValue(item.currentAssets, unit)}
      </td>
    })
  }

  const currentLiabilitiesData = () => {
    return liquidityItems.map((item, index) => {
      return <td className={_passFailClass(item.currentRatio)} key={index}>
        {formatValue(item.currentLiabilities, unit)}
      </td>
    })
  }

  const currentRatioData = () => {
    return liquidityItems.map((item, index) => {
      return <td className={_passFailClass(item.currentRatio)} key={index}>
        {item.currentRatio}
      </td>
    })
  }

  const currentRatioChartData = () => {
    return {
      labels: yearLabels,
      datasets: [
        {
          label: 'Current Assets',
          data: currentAssetsDataset,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          barPercentage: .6,
        },
        {
          label: 'Current Liabilities',
          data: currentLiabilitiesDataset,
          backgroundColor: "rgba(255, 159, 64, 0.2)",
          borderColor: "rgb(255, 159, 64)",
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
            labelString: `Current Assets / Liabilities (${unit})`
          }
        },
      ],
    },
  }

  const borderColor = pass ? 'border-green-600' : 'border-orange-600'
  const liquidityTip = <LiquidityTip />
  return (
    <div className="w-full md:w-1/2 xl:w-1/3 p-3">
      <div class={`h-full border-b-4 bg-white ${borderColor} rounded-md shadow-lg p-5`}>
        <div className="p-3">
          <ItemTitle
            title="Liquidity"
            pass={pass}
            icon={faFileInvoiceDollar}
            tip={liquidityTip}
          />
        </div>
        <div className="p-5">
          <Bar data={currentRatioChartData} options={options} />
          <table className="w-full table-auto">
            <tbody>
              <tr>
                <th></th>
                {displayYears()}
              </tr>
              <tr>
                <RowHeader itemName='Current Ratio' />
                {currentRatioData()}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function LiquidityTip() {
  return (
    <div>
      <div className="text-right font-bold mt-1 mr-1">x</div>
      <div className="font-semibold text-sm ml-1">What is it:</div>
        <div className="text-sm mb-1 ml-1">
          It's a measure of the current assets against the current liabilities of a company. It indicates the
          company's abilities to meet its obligations, aka pay the bills.
        </div>
      <div className="font-semibold text-sm ml-1">Why it's important:</div>
        <div className="text-sm mb-1 ml-1">
          It helps determine a company's financial strength and gives an idea of whether it has too
          much or too little cash on hand.
        </div>
      <div className="font-semibold text-sm ml-1">What to look for:</div>
        <div className="text-sm mb-1 ml-1">
          A value between 1 and 2 means they have just the right amount of liquid assets to pay
          current liabilities.
        </div>
      <div className="font-semibold text-sm ml-1">What to watch for:</div>
        <div className="text-sm mb-1 ml-1">
          The lower the ratio, the more likely it is for a company to struggle paying their bills,
          but a high liquidity ratio can also indicate that the company isn't investing their cash
          efficiently.
        </div>
    </div>
  )
}

export default LiquidityItem