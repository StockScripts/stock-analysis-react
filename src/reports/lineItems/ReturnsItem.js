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
import Modal from '../../components/modal/Modal'
import { faHandHoldingUsd } from '@fortawesome/free-solid-svg-icons'

function Returns({returnsItems}) {
  const [unit, setUnit] = React.useState(null)
  const [pass, setPass] = React.useState(true)

  React.useEffect(() => {
    if (returnsItems && returnsItems[0].netIncome) {
      setUnit(getUnit(returnsItems[0].netIncome))
      returnsItems.forEach((item) => {
        if (item.roe < 10 ) {
          setPass(false)
        }
      })
    }
  }, [returnsItems])

  const [displayInfo, setDisplayInfo] = React.useState(false);

  const onClose = () => {
    setDisplayInfo(false)
  }

  const _passFailClass = (value) => {
    let classColor = 'text-green-600'

    if (value < 0) {
      classColor = 'text-orange-600'
    }
    return `text-sm py-1 ${classColor}`
  }

  const yearLabels = returnsItems.map((item) => {
    return fiscalDateYear(item.fiscalDate)
  })

  const roeDataset = returnsItems.map((item) => {
    console.log(item.roe)
    return item.roe
  })

  const netIncomeDataset = returnsItems.map((item) => {
    return formatValue(item.netIncome, unit)
  })

  const equityDataset = returnsItems.map((item) => {
    return formatValue(item.equity, unit)
  })

  const roeChartData = () => {
    return {
      labels: yearLabels,
      datasets: [
        {
          label: 'roe',
          data: roeDataset,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
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
    tooltips: {
      callbacks: {
        title: function(tooltipItem, data) {
          return data['labels'][tooltipItem[0]['index']];
        },
        label: function(tooltipItem, data) {
          return `ROE: ${data['datasets'][0]['data'][tooltipItem['index']]}%`;
        },
        // afterLabel: function(tooltipItem, data) {
        //   return `Net Income: ${data['datasets'][1]['data'][tooltipItem['index']]} ${unit} \
        //   \nEquity: ${data['datasets'][2]['data'][tooltipItem['index']]} ${unit}`
        // }
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
            labelString: `ROE (%)`
          }
        },
      ],
    },
  }

  const displayYears = () => {
    return <YearsTableHeader years={returnsItems.map(item => fiscalDateYear(item.fiscalDate))}/>
  }

  const roeData = () => {
    return returnsItems.map((item, index) => {
      return <td className={_passFailClass(item.roe)} key={index}>
        {item.roe}%
      </td>
    })
  }

  const borderColor = pass ? 'border-green-600' : 'border-orange-600'

  const roeTip = <ROETip />

  return <>
    {/* {displayInfo ? <Modal onClose={onClose} /> : null} */}
    <div class="w-full md:w-1/2 xl:w-1/3 p-3">
      <div class={`h-full border-b-4 bg-white ${borderColor} rounded-md shadow-lg p-5`}>
        <div className="p-3">
          <ItemTitle
            title='ROE'
            pass={pass}
            icon={faHandHoldingUsd}
            tip={roeTip}
          />
        </div>
        <Bar data={roeChartData} options={options} />
        <table className="w-full table-auto">
          <tbody>
            <tr>
              <th></th>
              {displayYears()}
            </tr>
            <tr>
              <RowHeader itemName='ROE' />
              {roeData()}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </>
}

function ROETip() {
  return (
    <div>
      <div className="text-right font-bold mt-1 mr-1">x</div>
      <div className="font-semibold text-sm ml-1">What is it:</div>
        <div className="text-sm mb-1 ml-1">
          Return on Equity is the net income divided by shareholders equity.
          It tells you how much the shareholders get for their investment in the company.
        </div>
      <div className="font-semibold text-sm ml-1">Why it's important:</div>
        <div className="text-sm mb-1 ml-1">
          Companies with high ROE and little debt are able to raise money for growth. 
          It means they can invest back into the business without needing more capital.
        </div>
      <div className="font-semibold text-sm ml-1">What to look for:</div>
        <div className="text-sm mb-1 ml-1">
          ROE should be at least 10% and should not be decreasing.
        </div>
      <div className="font-semibold text-sm ml-1">What to watch for:</div>
        <div className="text-sm mb-1 ml-1">
          ROE can increase if the company is acquiring more debt. If liabilities increase,
          equity decreases, which boosts ROE. Check the Liabilities item and see if the company
          is becoming too leveraged.
        </div>
    </div>
  )
}

export default Returns