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
 import { faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons'

function LiquidityItem({unit, liquidityItems}) {
  const [pass, setPass] = React.useState(true)
  const [tipDisplay, setTipDisplay] = React.useState(false)

  React.useEffect(() => {
    if (liquidityItems && liquidityItems[0].currentLiabilities) {
      liquidityItems.forEach((item) => {
        if (checkFail(item.currentRatio)) {
          setPass(false)
        }
      })
    }
  }, [liquidityItems])

  const checkFail = (currentRatio) => (currentRatio < 1)

  const passFailClass = (currentRatio) => {
    return getPassFailClass(checkFail(currentRatio))
  }

  // Begin chart data
  const yearLabels = liquidityItems.map((item) => {
    return fiscalDateYear(item.fiscalDate)
  })

  const currentAssetsDataset = liquidityItems.map((item) => {
    return item.currentAssets
  })

  const currentLiabilitiesDataset = liquidityItems.map((item) => {
    return item.currentLiabilities
  })

  const currentRatioDataset = liquidityItems.map((item) => {
    return item.currentRatio
  })

  const currentAssetsLabel = `Current Assets (${unit})`
  const currentLiabilitiesLabel = `Current Liabilities (${unit})`

  const currentRatioChartData = () => {
    return {
      labels: yearLabels,
      datasets: [
        {
          label: currentAssetsLabel,
          data: currentAssetsDataset,
          backgroundColor: chart.color.blue,
          borderColor: chart.color.blueBorder,
          borderWidth: chart.bar.borderWidth,
          barPercentage: chart.bar.percentage,
        },
        {
          label: currentLiabilitiesLabel,
          data: currentLiabilitiesDataset,
          backgroundColor: chart.color.orange,
          borderColor: chart.color.orangeBorder,
          borderWidth: chart.bar.borderWidth,
          barPercentage: chart.bar.percentage,
        },
        {
          label: 'Current Ratio',
          hidden: true,
          data: currentRatioDataset,
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
          let currentAssets = data['datasets'][0]['data'][tooltipItem['index']]
          let currentLiabilitiesData = data['datasets'][1]['data'][tooltipItem['index']]
          switch (label) {
            case currentAssetsLabel:
              return `Current Assets: ${currentAssets} ${unit}`
            case currentLiabilitiesLabel:
              return `Current Liabilities: ${currentLiabilitiesData} ${unit}`
            default:
              break
          }
        },
        afterLabel: function(tooltipItem, data) {
          return `Current Ratio: ${data['datasets'][2]['data'][tooltipItem['index']]}`
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
    //         labelString: `Assets / Liabilities (${unit})`
    //       }
    //     },
    //   ],
    // },
  }
  // End chart data

  // Begin table data
  const displayYears = () => {
    return <YearsTableHeader years={liquidityItems.map(item => fiscalDateYear(item.fiscalDate))}/>
  }

  const currentAssetsData = () => {
    return liquidityItems.map((item, index) => {
      return <td className={passFailClass(item.currentRatio)} key={index}>
        {item.currentAssets}
      </td>
    })
  }

  const currentLiabilitiesData = () => {
    return liquidityItems.map((item, index) => {
      return <td className={passFailClass(item.currentRatio)} key={index}>
        {item.currentLiabilities}
      </td>
    })
  }

  const currentRatioData = () => {
    return liquidityItems.map((item, index) => {
      return <td className={passFailClass(item.currentRatio)} key={index}>
        {item.currentRatio}
      </td>
    })
  }
  // End table data

  const guidance = (pass) => {
    if (pass) {
      return "Current ratio is consistently greater than 1, which means the company has \
       enough capital on hand to pay for its short term obligations."
    }
    return "Current ratio has dropped below 1. Ideally, this should consistently be above 1."
  }

  const closeTip = () => {
    setTipDisplay(false)
  }
  
  const liquidityTip = <ItemTip
    guidance={guidance(pass)}
    definition="It's a measure of the current assets against the current liabilities of a company. It
      indicates the company's abilities to meet its obligations, aka pay the bills."
    importance="It helps determine a company's financial strength and gives an idea of whether it has too
      much or too little cash on hand."
    caution="The lower the ratio, the more likely it is for a company to struggle paying their bills,
      but a high liquidity ratio can also indicate that the company isn't investing their cash
      efficiently."
    onClose={closeTip}
  />

  let itemTitle = <ItemTitle
    title="Liquidity"
    pass={pass}
    icon={faFileInvoiceDollar}
    tip={liquidityTip}
    setDisplay={setTipDisplay}
    tipDisplay={tipDisplay}
  />

  let itemChart = <Bar data={currentRatioChartData} options={options} />

  let tableBody = <tbody>
    <tr>
      <th></th>
      {displayYears()}
    </tr>
    <tr>
      <RowHeader itemName='Current Ratio' />
      {currentRatioData()}
    </tr>
  </tbody>

  return <ReportItem 
    itemTitle={itemTitle}
    borderColor={getBorderColor(pass)}
    itemChart={itemChart}
    tableBody={tableBody}
  />
}

export default LiquidityItem