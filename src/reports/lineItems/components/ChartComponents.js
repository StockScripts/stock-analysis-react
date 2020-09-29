import React from 'react';
import {
  ComposedChart,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
  ResponsiveContainer
} from 'recharts';

export function TooltipContent({label, chartItems}) {
  const items = chartItems.map((item) => {
    return (
      <tr className="pb-2 text-left">
        <td className={`px-2 ${item.fontColor}`}>{item.label}</td>
        <td className={`px-2 pb-2 font-bold ${item.fontColor}`}>{item.value}</td>
      </tr>
    )
  })
  return (
    <table className="shadow-md bg-gray-200 text-indigo-500 opacity-80 table-auto">
      <tbody className="py-4">
        <tr>
          <th colSpan="2" className="pt-2 text-center text-sm">{label}</th>
        </tr>
        {items}
      </tbody>
    </table>
  )
}

export function LegendFormatter(value, entry) {
  const { color } = entry;
  return <span style={{ color }}>{value}</span>;
}

export function Chart({data, yAxisLabel, tooltipRenderer, children}) {
  return (
    <ResponsiveContainer height={250}>
      <ComposedChart
        data={data}
        margin={{
          top: 20, right: 20, bottom: 20, left: 20,
        }}
        barGap={1}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="year" />
        <YAxis>
          <Label angle={270} position='left' style={{ textAnchor: 'middle', fontSize: '.8em', fill: "#434190" }}>
              {yAxisLabel}
          </Label>
        </YAxis>
        <Tooltip content={tooltipRenderer} />
        {children}
      </ComposedChart>
    </ResponsiveContainer>
  )
}

export function LineCharts({data, yAxisLabel, xAxisData='year', tooltipRenderer, children}) {
  return (
    <ResponsiveContainer height={250}>
      <LineChart
        data={data}
        margin={{
          top: 20, right: 20, bottom: 20, left: 20,
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey={xAxisData} />
        <YAxis>
          <Label angle={270} position='left' style={{ textAnchor: 'middle', fontSize: '.8em', fill: "#434190" }}>
              {yAxisLabel}
          </Label>
        </YAxis>
        <Tooltip content={tooltipRenderer} />
        {children}
      </LineChart>
    </ResponsiveContainer>
  )
}