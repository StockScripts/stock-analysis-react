import React from 'react';
import {
  Bar,
} from 'react-chartjs-2'
import {
  YearsTableHeader,
  RowHeader,
} from './components/TableComponents'
import {
  ReportItem,
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
  const [tipDisplay, setTipDisplay] = React.useState(false)

  React.useEffect(() => {
    if (sgaItems && sgaItems[0].grossProfit) {
      sgaItems.forEach((item) => {
        if (checkFail(item.sgaToGross)) {
          setPass(false)
        }
      })
    }
  }, [sgaItems])

  const checkFail = (sgaToGross) => (sgaToGross > 80)

  const passFailClass = (sgaToGross) => {
    return getPassFailClass(checkFail(sgaToGross))
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

  const sgaLabel = `SGA (${unit})`
  const grossProfitLabel = `Gross Profit (${unit})`

  const sgaChartData = () => {
    return {
      labels: yearLabels,
      datasets: [
        {
          label: sgaLabel,
          data: sgaDataset,
          backgroundColor: chart.color.green,
          borderColor: chart.color.greenBorder,
          borderWidth: chart.bar.borderWidth,
          barPercentage: chart.bar.percentage,
        },
        {
          label: grossProfitLabel,
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
    legend: {
      display: chart.legend.display,
      position: chart.legend.position,
      labels: {
        boxWidth: chart.legend.boxWidth,
        fontSize: chart.legend.fontSize,
        padding: chart.legend.padding,
        filter: function(legendItem, _) {
          return legendItem.datasetIndex != 2 
        }
      }
    },
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
            case grossProfitLabel:
              return `Gross Profit: ${grossProfitData} ${unit}`
            case sgaLabel:
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
    // scales: {
    //   yAxes: [
    //     {
    //       ticks: {
    //         beginAtZero: true,
    //       },
    //       scaleLabel: {
    //         display: true,
    //         labelString: `SGA / Gross Profit (${unit})`
    //       }
    //     },
    //   ],
    // },
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

  const sgaData = () => {
    return sgaItems.map((item, index) => {
      return <td className={passFailClass(item.sgaToGross)} key={index}>
        {item.sga}
      </td>
    })
  }
  // End table data

  const guidance = (pass) => {
    if (pass) {
      return "SGA as a percentage of gross profits is less than 80% which is fairly reasonable."
    }
    return "SGA is greater than 80% of Gross Profits which means a company is in a highly competitive industry and \
      may be at a disadvantage."
  }

  const closeTip = () => {
    setTipDisplay(false)
  }

  const profitsTip = <ItemTip
    guidance={guidance(pass)}
    definition="Selling, General & Administrative expenses are the costs indirectly related to making the product.
      It includes salaries, rent, legal fees, commisions, and the like. It's subtracted from gross profits so SGA 
      to gross profits tells you how much of the gross profits are used for these types of expenses. A high value means
      they're using a lot of their profits for these expenses." 
    importance="It has an immense impact on the bottom line. When revenues fall, SGA costs remain and eats into
      the profits. Companies with consistently low SGA expenses are at an advantage."
    caution="SGA costs can vary greatly between industries. Conistently low values are ideal, but sometimes a
      company can have low SGA costs, and high R&D costs or capital expenditures expenses."
    onClose={closeTip}
  />

  let itemTitle = <ItemTitle
    title="SGA"
    pass={pass}
    icon={faFileInvoice}
    tip={profitsTip}
    setDisplay={setTipDisplay}
    tipDisplay={tipDisplay}
  />

  let itemChart = <Bar data={sgaChartData} options={options} />

  let tableBody = <tbody>
    <tr>
      <th className="w-1/5"></th>
      {displayYears()}
    </tr>
    <tr>
      <RowHeader itemName='SGA / Gross Profit' />
      {sgaToGrossData()}
    </tr>
    <tr>
      <RowHeader itemName={`SGA (${unit})`} />
      {sgaData()}
    </tr>
  </tbody>

  return <ReportItem 
    itemTitle={itemTitle}
    borderColor={getBorderColor(pass)}
    itemChart={itemChart}
    tableBody={tableBody}
  />
}

export default SgaItem