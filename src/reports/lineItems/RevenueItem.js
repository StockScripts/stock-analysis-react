import React from 'react';
import ReactDOM from 'react-dom';
import { formatValue } from './utils'

function RevenueItem({data}) {
  const {year1, year2, year3, year4} = data

  const _passFailClass = (value) => {
    let classColor = 'text-green-600'

    if (value < 0) {
      classColor = 'text-orange-600'
    }
    return `border-t font-semibold px-8 py-4 ${classColor}`
  }

  return <>
    <tr>
      <td colspan="5" class="text-left text-lg border border-r-0 px-8 py-4 font-bold text-indigo-500">Are you getting a raise every year?</td>
    </tr>
    <tr>
      <td class="border-t border-l border-r-0 px-8 py-4 font-bold text-left pl-12 text-indigo-800 text-opacity-75">Revenue</td>
      <td class={_passFailClass(year1.total_revenue_yoy)}>{formatValue(year1.total_revenue)}</td>
      <td class={_passFailClass(year2.total_revenue_yoy)}>{formatValue(year2.total_revenue)}</td>
      <td class={_passFailClass(year3.total_revenue_yoy)}>{formatValue(year3.total_revenue)}</td>
      <td class={_passFailClass(year4.total_revenue_yoy)}>{formatValue(year4.total_revenue)}</td>
    </tr>
    <tr>
      <td class="border-t border-l border-r-0 px-8 py-4 font-bold text-left pl-12 text-indigo-800 text-opacity-75">YOY Growth</td>
      <td class={_passFailClass(year1.total_revenue_yoy)}>{year1.total_revenue_yoy}</td>
      <td class={_passFailClass(year2.total_revenue_yoy)}>{year2.total_revenue_yoy}%</td>
      <td class={_passFailClass(year3.total_revenue_yoy)}>{year3.total_revenue_yoy}%</td>
      <td class={_passFailClass(year4.total_revenue_yoy)}>{year4.total_revenue_yoy}%</td>
    </tr>
  </>
}

export default RevenueItem