import React from 'react';
import Modal from '../../components/modal/Modal'
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
 import { faCoins } from '@fortawesome/free-solid-svg-icons'

function GrossProfitItem({grossProfitItems}) {
  const [unit, setUnit] = React.useState(null)
  const [pass, setPass] = React.useState(true)

  React.useEffect(() => {
    if (grossProfitItems && grossProfitItems[0].grossProfit) {
      setUnit(getUnit(grossProfitItems[0].grossProfit))
      grossProfitItems.forEach((item) => {
        if (item.grossMargin < 20) {
          setPass(false)
        }
      })
    }
  }, [grossProfitItems])

  const [displayInfo, setDisplayInfo] = React.useState(false);

  const yearLabels = grossProfitItems.map((item) => {
    return fiscalDateYear(item.fiscalDate)
  })

  const revenueDataset = grossProfitItems.map((item) => {
    return formatValue(item.revenue, unit)
  })
  
  const grossProfitsDataset = grossProfitItems.map((item) => {
    return formatValue(item.grossProfit, unit)
  })

  const _passFailClass = (value) => {
    let classColor = 'text-green-600'

    if (value < 20) {
      classColor = 'text-orange-600'
    }
    return `text-sm py-1 ${classColor}`
  }

  const onClose = () => {
    setDisplayInfo(false)
  }

  const grossProfitsChartData = () => {
    return {
      labels: yearLabels,
      datasets: [
        {
          label: 'Revenue',
          data: revenueDataset,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          barPercentage: .6,
        },
        {
          label: 'Gross Profit',
          data: grossProfitsDataset,
          backgroundColor: "rgba(255, 159, 64, 0.2)",
          borderColor: "rgb(255, 159, 64)",
          borderWidth: 1,
          barPercentage: .6,
        },
        // {
        //   label: 'net income',
        //   data: netIncomeDataset,
        //   hidden: true,
        // },
        // {
        //   label: 'equity',
        //   data: equityDataset,
        //   hidden: true,
        // }
      ],
    }
  }

  const options = {
    // tooltips: {
    //   callbacks: {
    //     title: function(tooltipItem, data) {
    //       return data['labels'][tooltipItem[0]['index']];
    //     },
    //     label: function(tooltipItem, data) {
    //       return `ROE: ${data['datasets'][0]['data'][tooltipItem['index']]}%`;
    //     },
    //   }
    // },
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
            labelString: `Gross Profit / Revenue  (${unit})`
          }
        },
      ],
    },
  }

  const grossMarginYOYData = () => {
    return grossProfitItems.map((item, index) => {
      return <td className={_passFailClass(item.grossMargin)} key={index}>
        {item.grossMarginYOY ? `${item.grossMarginYOY}%` : ''}
      </td>
    })
  }

  const displayYears = () => {
    return <YearsTableHeader years={grossProfitItems.map(item => fiscalDateYear(item.fiscalDate))}/>
  }

  const grossMarginData = () => {
    return grossProfitItems.map((item, index) => {
      return <td className={_passFailClass(item.grossMargin)} key={index}>
        {item.grossMargin}%
      </td>
    })
  }

  const borderColor = pass ? 'border-green-600' : 'border-orange-600'

  const grossProfitsTip = <GrossProfitsTip />

  return <>
    {displayInfo ? <Modal onClose={onClose} /> : null}
    <div class="w-full md:w-1/2 xl:w-1/3 p-3">
      <div class={`h-full border-b-4 bg-white ${borderColor} rounded-md shadow-lg p-5`}>
        <div className="p-3">
          <ItemTitle
            title="Gross Profits"
            pass={pass}
            icon={faCoins}
            tip={grossProfitsTip}
          />
        </div>
        <Bar data={grossProfitsChartData} options={options} />
        <table className="w-full table-auto">
          <tbody>
            <tr>
              <th className="w-1/5"></th>
              {displayYears()}
            </tr>
            <tr>
              <RowHeader itemName='Gross Margin' />
              {grossMarginData()}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </>
}

function GrossProfitsTip() {
  return (
    <div>
      <div className="text-right font-bold mt-1 mr-1">x</div>
      <div className="font-semibold text-sm ml-1">What is it:</div>
        <div className="text-sm mb-1 ml-1">
          Gross profit is how the amount left after subtracting the cost to make products from the revenue.
          Gross margin is the percentage of revenue remaining.
        </div>
      <div className="font-semibold text-sm ml-1">Why it's important:</div>
        <div className="text-sm mb-1 ml-1">
          A company that can make products at a low cost is at an advantage.
        </div>
      <div className="font-semibold text-sm ml-1">What to look for:</div>
        <div className="text-sm mb-1 ml-1">
          If a company that keeps less than 20% of its profits after subtracting the cost of goods, it
          usually means it's in a very competitive industry where it may be hard to sustain a competitive
          advantage.
        </div>
      <div className="font-semibold text-sm ml-1">What to watch for:</div>
        <div className="text-sm mb-1 ml-1">
          Gross margin can vary greatly between different companies, but another thing to 
          look out for is consistency.
        </div>
    </div>
  )
}


export default GrossProfitItem