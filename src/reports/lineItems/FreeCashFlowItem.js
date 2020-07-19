import React from 'react';
import ReactDOM from 'react-dom';
import { formatValue } from './utils'

function FreeCashFlowItem({data}) {
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
      <td colspan="5" class="text-left text-lg border border-r-0 px-8 py-4 font-bold text-indigo-500">Do they have spending money?</td>
    </tr>
    <tr>
      <td class="border-t border-l border-r-0 px-8 py-4 font-bold text-left pl-12 text-indigo-800 text-opacity-75">Free Cash Flow</td>
      <td class={_passFailClass(year4.free_cash_flow)}>{formatValue(year1.free_cash_flow)}</td>
      <td class={_passFailClass(year4.free_cash_flow)}>{formatValue(year2.free_cash_flow)}</td>
      <td class={_passFailClass(year4.free_cash_flow)}>{formatValue(year3.free_cash_flow)}</td>
      <td class={_passFailClass(year4.free_cash_flow)}>{formatValue(year4.free_cash_flow)}</td>
    </tr>
  </>
}

export default FreeCashFlowItem