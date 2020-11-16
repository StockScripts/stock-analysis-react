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
import { faMoneyCheckAlt } from '@fortawesome/free-solid-svg-icons'

function RevenueItem({revenueItems}) {
  const [unit, setUnit] = React.useState(null)
  const [pass, setPass] = React.useState(true)

  React.useEffect(() => {
    if (revenueItems && revenueItems[0]) {
      setUnit(getUnit(revenueItems[0].totalRevenue))
      revenueItems.forEach((item) => {
        if (item.totalRevenue < 0 || item.totalRevenueYOY < 0) {
          setPass(false)
        }
      })
    }
  }, [revenueItems])

  const _passFailClass = (value1, value2) => {
    let classColor = 'text-green-600'

    if (value1 < 0 || value2 < 0) {
      classColor = 'text-orange-600'
    }
    return `text-center text-sm py-1 ${classColor}`
  }

  const yearLabels = revenueItems.map((item) => {
    return fiscalDateYear(item.fiscalDate)
  })

  const revenueData = revenueItems.map((item) => {
    return formatValue(item.totalRevenue, unit)
  })

  const revenueYOY = revenueItems.map((item) => {
    return item.totalRevenueYOY
  })

  const revenueChartData = () => {
    return {
      labels: yearLabels,
      datasets: [
        {
          type: 'bar',
          data: revenueData,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          barPercentage: .6,
        },
        {
          type: 'line',
          data: revenueData,
          fill: false,
          borderColor: '#718096',
          borderWidth: 1.5,
        },
        {
          label: 'revenue yoy',
          data: revenueYOY,
          hidden: true,
        }
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
          return `Revenue: ${data['datasets'][0]['data'][tooltipItem['index']]} ${unit}`;
        },
        afterLabel: function(tooltipItem, data) {
          let growth = data['datasets'][2]['data'][tooltipItem['index']]
          if (growth) {
            return `YOY Growth: ${data['datasets'][2]['data'][tooltipItem['index']]}%`
          }
        }
      }
    },

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
            labelString: `Revenue (${unit})`
          }
        },
      ],
    },
  }

  const totalRevenueData = () => {
    return revenueItems.map((item, index) => {
      return <td className={_passFailClass(item.totalRevenue, item.totalRevenueYOY ? item.totalRevenueYOY : null)} key={index}>
        {formatValue(item.totalRevenue, unit)}
      </td>
    })
  }

  const totalRevenueYOYData = () => {
    return revenueItems.map((item, index) => {
      return <td className={_passFailClass(item.totalRevenue, item.totalRevenueYOY ? item.totalRevenueYOY : null)} key={index}>
        {item.totalRevenueYOY ? `${item.totalRevenueYOY}%` : ''}
      </td>
    })
  }

  const displayYears = () => {
    return <YearsTableHeader years={revenueItems.map(item => fiscalDateYear(item.fiscalDate))}/>
  }

  const borderColor = pass ? 'border-green-600' : 'border-orange-600'
  
  return (
    <div className="w-full md:w-1/2 xl:w-1/3 p-3">
      <div class={`h-full border-b-4 bg-white ${borderColor} rounded-md shadow-lg p-5`}>
        <div className="p-3">
          <ItemTitle
            title='Revenue'
            subtitle='Are you getting a raise every year?'
            pass={pass}
            icon={faMoneyCheckAlt}
          />
        </div>
        <Bar data={revenueChartData} options={options} />
        <table className="w-full table-auto">
          <tbody>
            <tr>
              <th></th>
              {displayYears()}
            </tr>
            <tr>
              <RowHeader itemName={`Revenue (${unit})`} />
              {totalRevenueData()}
            </tr>
            <tr>
              <RowHeader itemName='YOY Growth' />
              {totalRevenueYOYData()}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RevenueItem