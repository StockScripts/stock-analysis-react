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
        if (item.quickRatio < 1) {
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

  const quickRatioDataset = liquidityItems.map((item) => {
    return item.quickRatio
  })

  const displayYears = () => {
    return <YearsTableHeader years={liquidityItems.map(item => fiscalDateYear(item.fiscalDate))}/>
  }

  const quickRatioData = () => {
    return liquidityItems.map((item, index) => {
      return <td className={_passFailClass(item.quickRatio)} key={index}>
        {item.quickRatio}
      </td>
    })
  }

  const quickRatioChartData = () => {
    return {
      labels: yearLabels,
      datasets: [
        {
          label: 'Quick Ratio',
          data: quickRatioDataset,
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
            labelString: `Quick Ratio`
          }
        },
      ],
    },
  }

  const borderColor = pass ? 'border-green-600' : 'border-orange-600'

  return (
    <div className="w-full md:w-1/2 xl:w-1/3 p-3">
      <div class={`h-full border-b-4 bg-white ${borderColor} rounded-md shadow-lg p-5`}>
        <div className="p-3">
          <ItemTitle
            title="Liquidity"
            subtitle="Can you pay your bills?"
            pass={pass}
            icon={faFileInvoiceDollar}
          />
        </div>
        <div className="p-5">
          <Bar data={quickRatioChartData} options={options} />
          <table className="w-full table-auto">
            <tbody>
              <tr>
                <th></th>
                {displayYears()}
              </tr>
              <tr>
                <RowHeader itemName='Quick Ratio' />
                {quickRatioData()}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default LiquidityItem