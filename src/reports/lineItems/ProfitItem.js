import React from 'react';
import Modal from '../../components/modal/Modal'
import {
  Bar,
} from 'react-chartjs-2'
import {
  YearsTableHeader,
} from './components/TableComponents'
import {
  ItemTitle
} from './components/ReportComponents'
import { 
  getUnit,
  formatValue,
  fiscalDateYear,
 } from './utils'
 import { faFunnelDollar } from '@fortawesome/free-solid-svg-icons'

function ProfitItem({profitItems}) {
  const [unit, setUnit] = React.useState(null)
  const [pass, setPass] = React.useState(true)

  React.useEffect(() => {
    if (profitItems && profitItems[0].netIncome) {
      setUnit(getUnit(profitItems[0].netIncome))
      profitItems.forEach((item) => {
        if (item.netIncome < 0 || item.netIncomeYOY < 0) {
          setPass(false)
        }
      })
    }
  }, [profitItems])

  const [displayInfo, setDisplayInfo] = React.useState(false);

  const yearLabels = profitItems.map((item) => {
    return fiscalDateYear(item.fiscalDate)
  })

  const netIncomeDataset = profitItems.map((item) => {
    return formatValue(item.netIncome, unit)
  })
  
  const revenueDataset = profitItems.map((item) => {
    return formatValue(item.revenue, unit)
  })

  const _passFailClass = (value1, value2) => {
    let classColor = 'text-green-600'

    if (value1 < 0 || value2 < 0) {
      classColor = 'text-orange-600'
    }
    return `text-sm py-1 ${classColor}`
  }

  const onClose = () => {
    setDisplayInfo(false)
  }

  const profitsChartData = () => {
    return {
      labels: yearLabels,
      datasets: [
        {
          label: 'Net Income',
          data: netIncomeDataset,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          barPercentage: .6,
        },
        {
          label: 'Revenue',
          data: revenueDataset,
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
            labelString: `Net Income / Revenue (${unit})`
          }
        },
      ],
    },
  }

  const netIncomeData = () => {
    return profitItems.map((item, index) => {
      return <td className={_passFailClass(item.netIncome, item.netIncomeYOY ? item.netIncomeYOY : null)} key={index}>
        {formatValue(item.netIncome, unit)}
      </td>
    })
  }

  const netIncomeYOYData = () => {
    return profitItems.map((item, index) => {
      return <td className={_passFailClass(item.netIncome, item.netIncomeYOY ? item.netIncomeYOY : null)} key={index}>
        {item.netIncomeYOY ? `${item.netIncomeYOY}%` : ''}
      </td>
    })
  }

  const displayYears = () => {
    return <YearsTableHeader years={profitItems.map(item => fiscalDateYear(item.fiscalDate))}/>
  }

  const netMarginData = () => {
    return profitItems.map((item, index) => {
      return <td className={_passFailClass(item.netMargin)} key={index}>
        {item.netMargin}%
      </td>
    })
  }

  const borderColor = pass ? 'border-green-600' : 'border-orange-600'

  return <>
    {displayInfo ? <Modal onClose={onClose} /> : null}
    <div class="w-full md:w-1/2 xl:w-1/3 p-3">
      <div class={`h-full border-b-4 bg-white ${borderColor} rounded-md shadow-lg p-5`}>
        <div className="p-3">
          <ItemTitle
            title="Profits"
            subtitle="Are you keeping the money you're making?"
            pass={pass}
            icon={faFunnelDollar}
          />
        </div>
        <Bar data={profitsChartData} options={options} />
        <table className="w-full table-auto">
          <tbody>
            <tr>
              <th className="w-1/5"></th>
              {displayYears()}
            </tr>
            <tr>
              <td className="text-indigo-800 text-opacity-75 text-sm text-left">Net Income</td>
              {netIncomeData()}
            </tr>
            <tr>
              <td className="text-indigo-800 text-opacity-75 text-sm text-left">YOY Growth</td>
              {netIncomeYOYData()}
            </tr>
            <tr>
              <td className="text-indigo-800 text-opacity-75 text-sm text-left">Net Margin</td>
              {netMarginData()}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </>
}

export default ProfitItem