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
  fiscalDateYear,
  chartProps as chart,
 } from './utils'
import { faMoneyBillWave } from '@fortawesome/free-solid-svg-icons'

function FreeCashFlowItem({unit, freeCashFlowItems}) {
  const [pass, setPass] = React.useState(true)
  const [tipDisplay, setTipDisplay] = React.useState(false)

  React.useEffect(() => {
    if (freeCashFlowItems && freeCashFlowItems[0]) {
      freeCashFlowItems.forEach((item) => {
        let fail = item.freeCashFlow < 0
        if (fail) {
          setPass(false)
        }
      })
    }
  }, [freeCashFlowItems])

  const passFailClass = (freeCashFlow) => {
    const fail = freeCashFlow < 0
    return getPassFailClass(fail)
  }

  // Begin chart data
  const yearLabels = freeCashFlowItems.map((item) => {
    return fiscalDateYear(item.fiscalDate)
  })

  const freeCashFlowDataset = freeCashFlowItems.map((item) => {
    return item.freeCashFlow
  })

  const freeCashFlowChartData = () => {
    return {
      labels: yearLabels,
      datasets: [
        {
          label: `Free Cash Flow (${unit})`,
          data: freeCashFlowDataset,
          backgroundColor: chart.color.blue,
          borderColor: chart.color.blueBorder,
          borderWidth: chart.bar.borderWidth,
          barPercentage: chart.bar.percentage,
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
      }
    },
    tooltips: {
      callbacks: {
        title: function(tooltipItem, data) {
          return data['labels'][tooltipItem[0]['index']];
        },
        label: function(tooltipItem, data) {
          return `Free Cash Flow: ${data['datasets'][0]['data'][tooltipItem['index']]} ${unit}`;
        },
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
    //         labelString: `Free Cash Flow (${unit})`
    //       }
    //     },
    //   ],
    // },
  }
  // End chart data

  // Begin table data
  const displayYears = () => {
    return <YearsTableHeader years={freeCashFlowItems.map(item => fiscalDateYear(item.fiscalDate))}/>
  }

  const freeCashFlowData = () => {
    return freeCashFlowItems.map((item, index) => {
      return <td className={passFailClass(item.freeCashFlow)} key={index}>
        {item.freeCashFlow}
      </td>
    })
  }
  // End table data

  const guidance = (pass) => {
    if (pass) {
      return "Free cash flow is consistently positive, which means the company can reinvest back into the \
      company."
    }
    return "Negative free cash flow is not necessarily bad, but ideally, it should be consistently \
      positive, which means the company can reinvest back into the company."
  }

  const closeTip = () => {
    setTipDisplay(false)
  }

  const freeCashFlowTip = <ItemTip
    guidance={guidance(pass)}
    definition="This is cash that a company generates after paying expenses."
    importance="It can allow a company to develop new products, make
    acquisitions, pay dividends, or reduce debt. Growing free cash flows frequently
    leads to increased earnings."
    caution="It should not be continuously decreasing."
    onClose={closeTip}
  />

  let itemTitle = <ItemTitle
    title='Free Cash Flow'
    icon={faMoneyBillWave}
    pass={pass}
    tip={freeCashFlowTip}
    setDisplay={setTipDisplay}
    tipDisplay={tipDisplay}
  />

  let itemChart = <Bar data={freeCashFlowChartData} options={options} />

  let tableBody = <tbody>
    <tr>
      <th></th>
      {displayYears()}
    </tr>
    <tr>
      <RowHeader itemName={`Free Cash Flow (${unit})`} />
      {freeCashFlowData()}
    </tr>
  </tbody>

  return <ReportItem 
    itemTitle={itemTitle}
    borderColor={getBorderColor(pass)}
    itemChart={itemChart}
    tableBody={tableBody}
  />
}

export default FreeCashFlowItem