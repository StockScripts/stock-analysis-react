import React from 'react';
import {
  YearsTableHeader,
  RowHeader,
} from './components/TableComponents'
import {
  ItemTitle
} from './components/ReportComponents'
import {
  Line,
} from 'react-chartjs-2'
import { 
  getUnit,
  formatValue,
  fiscalDateYear
 } from './utils'
 import { faFlag } from '@fortawesome/free-solid-svg-icons'

function RedFlags({redFlagsItems}) {
  const [unit, setUnit] = React.useState(null)
  const [pass, setPass] = React.useState(true)

  React.useEffect(() => {
    if (redFlagsItems && redFlagsItems[0].totalRevenue) {
      setUnit(getUnit(redFlagsItems[0].totalRevenue))
      redFlagsItems.forEach((item) => {

        setPass(false)
      })
    }
  }, [redFlagsItems])

  const _passFailClass = (value1, value2) => {
    let classColor = 'text-green-600'

    if (Math.abs(value2 - value1) > 0.2) {
      classColor = 'text-orange-600'
    }
    return `text-sm px-2 py-1 ${classColor}`
  }

  const displayYears = () => {
    return <YearsTableHeader years={redFlagsItems.map(item => fiscalDateYear(item.fiscalDate))}/>
  }

  const receivablesToSalesChartData = redFlagsItems.map((item) => {
    return {
      year: item.fiscalDate.split('-')[0],
      receivables: formatValue(item.receivables, unit),
      totalRevenue: formatValue(item.totalRevenue, unit),
      receivablesToSales: item.receivablesToSales,
    }
  })

  const receivablesToSalesData = () => {
    return redFlagsItems.map((item, index) => {
      return <td className={_passFailClass(item.receivablesToSales)} key={index}>
        {item.receivablesToSales}
      </td>
    })
  }

  // const renderReceivablesToSalesTooltip = (props) => {
  //   const { active, payload, label} = props
  //     if (active) {
  //       const sales = {
  //         label: 'Sales',
  //         value: `${payload[0].payload.totalRevenue} ${unit}`,
  //         fontColor: 'text-indigo-400'
  //       }
  //       const receivables = {
  //         label: 'Receivables',
  //         value: `${payload[0].payload.receivables} ${unit}`,
  //         fontColor: 'text-orange-400'
  //       }
  //       const receivablesToSales = {
  //         label: 'Receivables to Sales',
  //         value: `${payload[0].payload.receivablesToSales}`,
  //       }
  //       return (
  //         <TooltipContent
  //           label={label}
  //           chartItems={[sales, receivables, receivablesToSales]}
  //         />
  //       )
  //     }
  //     return null
  // }

  const inventoryToSalesChartData = redFlagsItems.map((item) => {
    return {
      year: item.fiscalDate.split('-')[0],
      inventory: formatValue(item.inventory, unit),
      totalRevenue: formatValue(item.totalRevenue, unit),
      inventoryToSales: item.inventoryToSales,
    }
  })

  const inventoryToSalesData = () => {
    return redFlagsItems.map((item, index) => {
      return <td className={_passFailClass(item.inventoryToSales)} key={index}>
        {item.inventoryToSales}
      </td>
    })
  }

  // const renderInventoryToSalesTooltip = (props) => {
  //   const { active, payload, label} = props
  //     if (active) {
  //       const sales = {
  //         label: 'Sales',
  //         value: `${payload[0].payload.totalRevenue} ${unit}`,
  //         fontColor: 'text-indigo-400'
  //       }
  //       const inventory = {
  //         label: 'Inventory',
  //         value: `${payload[0].payload.inventory} ${unit}`,
  //         fontColor: 'text-orange-400'
  //       }
  //       const inventoryToSales = {
  //         label: 'Inventory to Sales',
  //         value: `${payload[0].payload.inventoryToSales}`,
  //       }
  //       return (
  //         <TooltipContent
  //           label={label}
  //           chartItems={[sales, inventory, inventoryToSales]}
  //         />
  //       )
  //     }
  //     return null
  // }

  const opExToSalesChartData = redFlagsItems.map((item) => {
    return {
      year: item.fiscalDate.split('-')[0],
      opEx: formatValue(item.opEx, unit),
      totalRevenue: formatValue(item.totalRevenue, unit),
      opExToSales: item.opExToSales,
    }
  })

  // const renderOpExToSalesTooltip = (props) => {
  //   const { active, payload, label} = props
  //     if (active) {
  //       const sales = {
  //         label: 'Sales',
  //         value: `${payload[0].payload.totalRevenue} ${unit}`,
  //         fontColor: 'text-indigo-400'
  //       }
  //       const opEx = {
  //         label: 'Operating Expense',
  //         value: `${payload[0].payload.opEx} ${unit}`,
  //         fontColor: 'text-orange-400'
  //       }
  //       const opExToSales = {
  //         label: 'Op Ex to Sales',
  //         value: `${payload[0].payload.opExToSales}`,
  //       }
  //       return (
  //         <TooltipContent
  //           label={label}
  //           chartItems={[sales, opEx, opExToSales]}
  //         />
  //       )
  //     }
  //     return null
  // }

  const opExToSalesData = () => {
    return redFlagsItems.map((item, index) => {
      return <td className={_passFailClass(item.opExToSales)} key={index}>
        {item.opExToSales}
      </td>
    })
  }

  const sgaToSalesChartData = redFlagsItems.map((item) => {
    return {
      year: item.fiscalDate.split('-')[0],
      sga: formatValue(item.sga, unit),
      totalRevenue: formatValue(item.totalRevenue, unit),
      sgaToSales: item.sgaToSales,
    }
  })

  const sgaToSalesData = () => {
    return redFlagsItems.map((item, index) => {
      return <td className={_passFailClass(item.sgaToSales)} key={index}>
        {item.sgaToSales}
      </td>
    })
  }

  // const renderSgaToSalesTooltip = (props) => {
  //   const { active, payload, label} = props
  //     if (active) {
  //       const sales = {
  //         label: 'Sales',
  //         value: `${payload[0].payload.totalRevenue} ${unit}`,
  //         fontColor: 'text-indigo-400'
  //       }
  //       const sga = {
  //         label: 'Operating Expense',
  //         value: `${payload[0].payload.sga} ${unit}`,
  //         fontColor: 'text-orange-400'
  //       }
  //       const sgaToSales = {
  //         label: 'Op Ex to Sales',
  //         value: `${payload[0].payload.sgaToSales}`,
  //       }
  //       return (
  //         <TooltipContent
  //           label={label}
  //           chartItems={[sales, sga, sgaToSales]}
  //         />
  //       )
  //     }
  //     return null
  // }

  const yearLabels = redFlagsItems.map((item) => {
    return fiscalDateYear(item.fiscalDate)
  })

  const receivablesToSalesDataset = redFlagsItems.map((item) => {
    return item.receivablesToSales
  })

  const inventoryToSalesDataset = redFlagsItems.map((item) => {
    return item.inventoryToSales
  })

  const opExToSalesDataset = redFlagsItems.map((item) => {
    return item.opExToSales
  })

  const sgaToSalesDataset = redFlagsItems.map((item) => {
    return item.sgaToSales
  })

  const redFlagsChartData = () => {
    return {
      labels: yearLabels,
      datasets: [
        {
          label: 'Receivables to Sales',
          data: receivablesToSalesDataset,
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          fill: false,
        },
        {
          label: 'Inventory to Sales',
          data: inventoryToSalesDataset,
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          fill: false,
        },
        {
          label: 'OpEx to Sales',
          data: opExToSalesDataset,
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          fill: false,
        },
        {
          label: 'SGA to Sales',
          data: sgaToSalesDataset,
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          fill: false,
        },
      ],
    }
  }

  const options = {
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
            labelString: `Item / Sales`
          }
        },
      ],
    },
  }

  const borderColor = pass ? 'border-green-600' : 'border-orange-600'

  const redFlagsTip = <RedFlagsTip />
        
  return (
    <div class="w-full md:w-1/2 xl:w-1/3 p-3">
      <div class={`h-full border-b-4 bg-white ${borderColor} rounded-md shadow-lg p-5`}>
        <div className="p-3">
          <ItemTitle
            title="Red Flags"
            pass={pass}
            icon={faFlag}
            tip={redFlagsTip}
          />
        </div>
        <Line data={redFlagsChartData} options={options} />
        <table className="w-full table-fixed">
          <tbody>
            <tr>
              <th className="w-1/5"></th>
              {displayYears()}
            </tr>
            <tr>
              <RowHeader itemName='Receivables to Sales' />
              {receivablesToSalesData()}
            </tr>
            <tr>
              <RowHeader itemName='Inventory to Sales' />
              {inventoryToSalesData()}
            </tr>
            <tr>
              <RowHeader itemName='OpEx to Sales' />
              {opExToSalesData()}
            </tr>
            <tr>
              <RowHeader itemName='SGA to Sales' />
              {sgaToSalesData()}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

function RedFlagsTip() {
  return (
    <div>
      <div className="text-right font-bold mt-1 mr-1">x</div>
      <div className="font-semibold text-sm ml-1">What is it:</div>
        <div className="text-sm mb-1 ml-1">
          Sales or Revenue is the income generated by a company from its business activities.
        </div>
      <div className="font-semibold text-sm ml-1">Why it's important:</div>
        <div className="text-sm mb-1 ml-1">
          Known as the company's top line, it's the main reason a company goes into business.
          Stock growth starts with a company making money.
        </div>
      <div className="font-semibold text-sm ml-1">What to look for:</div>
        <div className="text-sm mb-1 ml-1">
          Revenue should be increasing each year so YOY growth values should be positive.
          Double digit growth values are a plus.
        </div>
      <div className="font-semibold text-sm ml-1">What to watch for:</div>
        <div className="text-sm ml-1">
          If net income is increasing significantly faster than revenue, it could mean the
          company is cutting costs. This may not be sustainable in the long term.
        </div>
    </div>
  )
}

export default RedFlags