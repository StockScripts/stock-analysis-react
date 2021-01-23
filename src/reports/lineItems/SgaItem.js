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
 import { faFileInvoice } from '@fortawesome/free-solid-svg-icons'

function SgaItem({sgaItems}) {
  const [unit, setUnit] = React.useState(null)
  const [pass, setPass] = React.useState(true)

  React.useEffect(() => {
    if (sgaItems && sgaItems[0].grossProfit) {
      setUnit(getUnit(sgaItems[0].grossProfit))
      sgaItems.forEach((item) => {
        if (item.sga < 0 || item.sgaYOY < 0) {
          setPass(false)
        }
      })
    }
  }, [sgaItems])

  const [displayInfo, setDisplayInfo] = React.useState(false);

  const yearLabels = sgaItems.map((item) => {
    return fiscalDateYear(item.fiscalDate)
  })

  const grossProfitDataset = sgaItems.map((item) => {
    return formatValue(item.grossProfit, unit)
  })
  
  const sgaDataset = sgaItems.map((item) => {
    return formatValue(item.sga, unit)
  })

  const _passFailClass = (value) => {
    let classColor = 'text-green-600'

    if (value > 80) {
      classColor = 'text-orange-600'
    }
    return `text-sm py-1 ${classColor}`
  }

  const onClose = () => {
    setDisplayInfo(false)
  }

  const sgaChartData = () => {
    return {
      labels: yearLabels,
      datasets: [
        {
          label: 'SGA',
          data: sgaDataset,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          barPercentage: .6,
        },
        {
          label: 'Gross Profit',
          data: grossProfitDataset,
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
            labelString: `SGA / Gross Profit  (${unit})`
          }
        },
      ],
    },
  }

  const displayYears = () => {
    return <YearsTableHeader years={sgaItems.map(item => fiscalDateYear(item.fiscalDate))}/>
  }

  const sgaToGrossData = () => {
    return sgaItems.map((item, index) => {
      return <td className={_passFailClass(item.sgaToGross)} key={index}>
        {item.sgaToGross}%
      </td>
    })
  }

  const borderColor = pass ? 'border-green-600' : 'border-orange-600'

  const profitsTip = <ProfitsTip />

  return <>
    {displayInfo ? <Modal onClose={onClose} /> : null}
    <div class="w-full md:w-1/2 xl:w-1/3 p-3">
      <div class={`h-full border-b-4 bg-white ${borderColor} rounded-md shadow-lg p-5`}>
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
              <RowHeader itemName='SGA / Gross Profits' />
              {sgaToGrossData()}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </>
}

function ProfitsTip() {
  return (
    <div>
      <div className="text-right font-bold mt-1 mr-1">x</div>
      <div className="font-semibold text-sm ml-1">What is it:</div>
        <div className="text-sm mb-1 ml-1">
          Selling, General & Administrative expenses are the costs indirectly related to making the product.
          It includes salaries, rent, legal fees, commisions, and the like.
        </div>
      <div className="font-semibold text-sm ml-1">Why it's important:</div>
        <div className="text-sm mb-1 ml-1">
          It has an immense impact on the bottom line. When revenues fall, SGA costs remain and eats into
          the profits. 
        </div>
      <div className="font-semibold text-sm ml-1">What to look for:</div>
        <div className="text-sm mb-1 ml-1">
          Companies with consistently low SGA expenses are at an advantage. SGA to Gross Profits greater
          than 80% means a company is in a highly competitive industry.
        </div>
      <div className="font-semibold text-sm ml-1">What to watch for:</div>
        <div className="text-sm mb-1 ml-1">
          SGA costs can vary greatly between industries. Conistently low values are ideal, but sometimes a
          company can have low SGA costs, and high R&D costs or capital expenditures expenses.
        </div>
    </div>
  )
}


export default SgaItem