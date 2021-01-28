import React from 'react';
import {
  Bar,
} from 'react-chartjs-2'
import {
  YearsTableHeader,
  RowHeader,
} from './components/TableComponents'
import {
  ItemTip,
  ItemTitle
} from './components/ReportComponents'
import { 
  getBorderColor,
  getPassFailClass,
  chartProps as chart,
  fiscalDateYear,
 } from './utils'
import { faMoneyCheckAlt } from '@fortawesome/free-solid-svg-icons'

function RevenueItem({unit, revenueItems}) {
  const [pass, setPass] = React.useState(true)

  React.useEffect(() => {
    if (revenueItems && revenueItems[0]) {
      revenueItems.forEach((item) => {
        let fail = item.totalRevenue < 0 || item.totalRevenueYOY < 0
        if (fail) {
          setPass(false)
        }
      })
    }
  }, [revenueItems])

  const passFailClass = (revenue, revenueYOY) => {
    const fail = revenue < 0 || revenueYOY < 0
    return getPassFailClass(fail)
  }

  // Begin chart data
  const yearLabels = revenueItems.map((item) => {
    return fiscalDateYear(item.fiscalDate)
  })

  const revenueDataset = revenueItems.map((item) => {
    return item.totalRevenue
  })

  const revenueYOYDataset = revenueItems.map((item) => {
    return item.totalRevenueYOY
  })

  const revenueChartData = () => {
    return {
      labels: yearLabels,
      datasets: [
        {
          type: 'bar',
          data: revenueDataset,
          backgroundColor: chart.color.blue,
          borderColor: chart.color.blueBorder,
          borderWidth: chart.bar.borderWidth,
          barPercentage: chart.bar.percentage,
        },
        {
          type: 'line',
          data: revenueDataset,
          fill: false,
          borderColor: chart.color.greyBorder,
          borderWidth: 1.5,
        },
        {
          label: 'revenue yoy',
          data: revenueYOYDataset,
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
  // End chart data

  // Begin table data
  const displayYears = () => {
    return <YearsTableHeader years={revenueItems.map(item => fiscalDateYear(item.fiscalDate))}/>
  }

  const revenueData = () => {
    return revenueItems.map((item, index) => {
      return <td className={passFailClass(item.totalRevenue, item.totalRevenueYOY ? item.totalRevenueYOY : null)} key={index}>
        {item.totalRevenue}
      </td>
    })
  }

  const revenueYOYData = () => {
    return revenueItems.map((item, index) => {
      return <td className={passFailClass(item.totalRevenue, item.totalRevenueYOY ? item.totalRevenueYOY : null)} key={index}>
        {item.totalRevenueYOY ? `${item.totalRevenueYOY}%` : ''}
      </td>
    })
  }
  // End table data

  const borderColor = getBorderColor(pass)
  
  const revenueTip = <ItemTip
      guidance="Revenue should be increasing each year so YOY growth values should be positive.
        Double digit growth values are a plus."
      definition="Revenue or sales is the income generated by a company from its business activities."
      importance="It's known as the company's top line, and it's the main reason a company goes into business.
        Stock growth starts with a company making money."
      caution="If net income is increasing significantly faster than revenue, it could mean the
        company is cutting costs. This may not be sustainable in the long term."
   />

  return (
    <div className="w-full md:w-1/2 xl:w-1/3 p-3">
      <div className={`h-full border-b-4 bg-white ${borderColor} rounded-md shadow-lg p-5`}>
        <div className="p-3">
          <ItemTitle
            title='Revenue'
            pass={pass}
            icon={faMoneyCheckAlt}
            tip={revenueTip}
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
              {revenueData()}
            </tr>
            <tr>
              <RowHeader itemName='YOY Growth' />
              {revenueYOYData()}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RevenueItem