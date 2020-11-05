import React from 'react';
import {
  YearsTableHeader,
  RowHeader,
} from './components/TableComponents'
import {
  LineCharts,
  TooltipContent,
} from './components/ChartComponents'
import {
  Line,
} from 'recharts';
import { 
  getUnit,
  formatValue,
 } from './utils'

function RedFlags({redFlagsItems}) {
  const [unit, setUnit] = React.useState(null)

  React.useEffect(() => {
    if (redFlagsItems && redFlagsItems[0].totalRevenue) {
      setUnit(getUnit(redFlagsItems[0].totalRevenue))
    }
  }, [redFlagsItems])

  const _passFailClass = (value1, value2) => {
    let classColor = 'text-green-600'

    if (Math.abs(value2 - value1) > 0.2) {
      classColor = 'text-orange-600'
    }
    return `border-t font-semibold px-8 py-4 ${classColor}`
  }

  const displayYears = () => {
    return <YearsTableHeader years={redFlagsItems.map(item => item.fiscalDate)}/>
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

  const renderReceivablesToSalesTooltip = (props) => {
    const { active, payload, label} = props
      if (active) {
        const sales = {
          label: 'Sales',
          value: `${payload[0].payload.totalRevenue} ${unit}`,
          fontColor: 'text-indigo-400'
        }
        const receivables = {
          label: 'Receivables',
          value: `${payload[0].payload.receivables} ${unit}`,
          fontColor: 'text-orange-400'
        }
        const receivablesToSales = {
          label: 'Receivables to Sales',
          value: `${payload[0].payload.receivablesToSales}`,
        }
        return (
          <TooltipContent
            label={label}
            chartItems={[sales, receivables, receivablesToSales]}
          />
        )
      }
      return null
  }

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

  const renderInventoryToSalesTooltip = (props) => {
    const { active, payload, label} = props
      if (active) {
        const sales = {
          label: 'Sales',
          value: `${payload[0].payload.totalRevenue} ${unit}`,
          fontColor: 'text-indigo-400'
        }
        const inventory = {
          label: 'Inventory',
          value: `${payload[0].payload.inventory} ${unit}`,
          fontColor: 'text-orange-400'
        }
        const inventoryToSales = {
          label: 'Inventory to Sales',
          value: `${payload[0].payload.inventoryToSales}`,
        }
        return (
          <TooltipContent
            label={label}
            chartItems={[sales, inventory, inventoryToSales]}
          />
        )
      }
      return null
  }

  const opExToSalesChartData = redFlagsItems.map((item) => {
    return {
      year: item.fiscalDate.split('-')[0],
      opEx: formatValue(item.opEx, unit),
      totalRevenue: formatValue(item.totalRevenue, unit),
      opExToSales: item.opExToSales,
    }
  })

  const renderOpExToSalesTooltip = (props) => {
    const { active, payload, label} = props
      if (active) {
        const sales = {
          label: 'Sales',
          value: `${payload[0].payload.totalRevenue} ${unit}`,
          fontColor: 'text-indigo-400'
        }
        const opEx = {
          label: 'Operating Expense',
          value: `${payload[0].payload.opEx} ${unit}`,
          fontColor: 'text-orange-400'
        }
        const opExToSales = {
          label: 'Op Ex to Sales',
          value: `${payload[0].payload.opExToSales}`,
        }
        return (
          <TooltipContent
            label={label}
            chartItems={[sales, opEx, opExToSales]}
          />
        )
      }
      return null
  }

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

  const renderSgaToSalesTooltip = (props) => {
    const { active, payload, label} = props
      if (active) {
        const sales = {
          label: 'Sales',
          value: `${payload[0].payload.totalRevenue} ${unit}`,
          fontColor: 'text-indigo-400'
        }
        const sga = {
          label: 'Operating Expense',
          value: `${payload[0].payload.sga} ${unit}`,
          fontColor: 'text-orange-400'
        }
        const sgaToSales = {
          label: 'Op Ex to Sales',
          value: `${payload[0].payload.sgaToSales}`,
        }
        return (
          <TooltipContent
            label={label}
            chartItems={[sales, sga, sgaToSales]}
          />
        )
      }
      return null
  }

  return (
    <div className="w-full p-3">
      <div className="bg-white border rounded shadow">
        <div className="border-b p-3">
            <h5 className="font-bold text-gray-600">Red Flags - Are you financially stable?</h5>
        </div>
        <div className="p-5">
          <div className="flex flex-row flex-wrap flex-grow mt-2">
            <div className="w-full md:w-1/2 p-3">
              <LineCharts
                data={receivablesToSalesChartData}
                yAxisLabel={`Receivables / Sales (${unit})`}
                tooltipRenderer={renderReceivablesToSalesTooltip}
              >
                <Line type="monotone" dataKey="receivablesToSales" stroke="#8884d8" />
              </LineCharts>
            </div>
            <div className="w-full md:w-1/2 p-3 self-center">
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
                </tbody>
              </table>
            </div>
            <div className="w-full md:w-1/2 p-3">
              <LineCharts
                data={inventoryToSalesChartData}
                yAxisLabel={`Inventory / Sales (${unit})`}
                tooltipRenderer={renderInventoryToSalesTooltip}
              >
                <Line type="monotone" dataKey="inventoryToSales" stroke="#8884d8" />
              </LineCharts>
            </div>
            <div className="w-full md:w-1/2 p-3 self-center">
              <table className="w-full table-fixed">
                <tbody>
                  <tr>
                    <th className="w-1/5"></th>
                    {displayYears()}
                  </tr>
                  <tr>
                    <RowHeader itemName='Inventory to Sales' />
                    {inventoryToSalesData()}
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="w-full md:w-1/2 p-3">
              <LineCharts
                data={opExToSalesChartData}
                yAxisLabel={`Operating Expense / Sales`}
                tooltipRenderer={renderOpExToSalesTooltip}
              >
                <Line type="monotone" dataKey="opExToSales" stroke="#8884d8" />
              </LineCharts>
            </div>
            <div className="w-full md:w-1/2 p-3 self-center">
              <table className="w-full table-fixed">
                <tbody>
                  <tr>
                    <th className="w-1/5"></th>
                    {displayYears()}
                  </tr>
                  <tr>
                    <RowHeader itemName='Operating Expense to Sales' />
                    {opExToSalesData()}
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="w-full md:w-1/2 p-3">
              <LineCharts
                data={sgaToSalesChartData}
                yAxisLabel={`SGA / Sales`}
                tooltipRenderer={renderSgaToSalesTooltip}
              >
                <Line type="monotone" dataKey="sgaToSales" stroke="#8884d8" />
              </LineCharts>
            </div>
            <div className="w-full md:w-1/2 p-3 self-center">
              <table className="w-full table-fixed">
                <tbody>
                  <tr>
                    <th className="w-1/5"></th>
                    {displayYears()}
                  </tr>
                  <tr>
                    <RowHeader itemName='SGA to Sales' />
                    {sgaToSalesData()}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RedFlags