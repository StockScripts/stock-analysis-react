import React from 'react';
import {
  Bar,
} from 'react-chartjs-2'
import {
  YearsTableHeader,
  RowHeader,
} from './components/TableComponents'
import {
  ItemTitle,
  ItemTip
} from './components/ReportComponents'
import { 
  getBorderColor,
  getPassFailClass,
  chartProps as chart,
  fiscalDateYear,
 } from './utils'
 import { faFileInvoice } from '@fortawesome/free-solid-svg-icons'

function SgaItem({unit, sgaItems}) {
  const [pass, setPass] = React.useState(true)

  React.useEffect(() => {
    if (sgaItems && sgaItems[0].grossProfit) {
      sgaItems.forEach((item) => {
        let fail = item.sga_to_gross > 80
        if (fail) {
          setPass(false)
        }
      })
    }
  }, [sgaItems])

  const passFailClass = (sgaToGross) => {
    const fail = sgaToGross > 80
    return getPassFailClass(fail)
  }

  // Begin chart data
  const yearLabels = sgaItems.map((item) => {
    return fiscalDateYear(item.fiscalDate)
  })

  const grossProfitDataset = sgaItems.map((item) => {
    return item.grossProfit
  })
  
  const sgaDataset = sgaItems.map((item) => {
    return item.sga
  })

  const sgaToGrossDataset = sgaItems.map((item) => {
    return item.sgaToGross
  })

  const sgaChartData = () => {
    return {
      labels: yearLabels,
      datasets: [
        {
          label: 'SGA',
          data: sgaDataset,
          backgroundColor: chart.color.green,
          borderColor: chart.color.greenBorder,
          borderWidth: chart.bar.borderWidth,
          barPercentage: chart.bar.percentage,
        },
        {
          label: 'Gross Profit',
          data: grossProfitDataset,
          backgroundColor: chart.color.blue,
          borderColor: chart.color.blueBorder,
          borderWidth: chart.bar.borderWidth,
          barPercentage: chart.bar.percentage,
        },
        {
          label: 'SGA to Gross Profit',
          hidden: true,
          data: sgaToGrossDataset,
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
          let sgaData = data['datasets'][0]['data'][tooltipItem['index']]
          let grossProfitData = data['datasets'][1]['data'][tooltipItem['index']]
          switch (label) {
            case 'Gross Profit':
              return `Gross Profit: ${grossProfitData} ${unit}`
            case 'SGA':
              return `SGA: ${sgaData} ${unit}`
            default:
              break
          }
        },
        afterLabel: function(tooltipItem, data) {
          if (data.datasets[tooltipItem.datasetIndex].label === 'Gross Profit') {
            return `SGA to Gross Profit: ${data['datasets'][2]['data'][tooltipItem['index']]}%`
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
            labelString: `SGA / Gross Profit (${unit})`
          }
        },
      ],
    },
  }
  // End chart data

  // Begin table data
  const displayYears = () => {
    return <YearsTableHeader years={sgaItems.map(item => fiscalDateYear(item.fiscalDate))}/>
  }

  const sgaToGrossData = () => {
    return sgaItems.map((item, index) => {
      return <td className={passFailClass(item.sgaToGross)} key={index}>
        {item.sgaToGross}%
      </td>
    })
  }
  // End table data

  const borderColor = getBorderColor(pass)

  const profitsTip = <ItemTip
    guidance="SGA to Gross Profits greater than 80% means a company is in a highly competitive industry and
      may be at a disadvantage."
    definition="Selling, General & Administrative expenses are the costs indirectly related to making the product.
      It includes salaries, rent, legal fees, commisions, and the like. SGA to gross profits tells you how much of
      the gross profits are used for these types of expenses." 
    importance="It has an immense impact on the bottom line. When revenues fall, SGA costs remain and eats into
      the profits. Companies with consistently low SGA expenses are at an advantage."
    caution="SGA costs can vary greatly between industries. Conistently low values are ideal, but sometimes a
      company can have low SGA costs, and high R&D costs or capital expenditures expenses."
  />

  return <>
    <div className="w-full md:w-1/2 xl:w-1/3 p-3">
      <div className={`h-full border-b-4 bg-white ${borderColor} rounded-md shadow-lg p-5`}>
        <div className="p-3">
          <ItemTitle
            title="SGA"
            pass={pass}
            icon={faFileInvoice}
            tip={profitsTip}
          />
        </div>
        <Bar data={sgaChartData} options={options} />
        <table className="w-full table-auto">
          <tbody>
            <tr>
              <th className="w-1/5"></th>
              {displayYears()}
            </tr>
            <tr>
              <RowHeader itemName='SGA / Gross Profit' />
              {sgaToGrossData()}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </>
}

export default SgaItem