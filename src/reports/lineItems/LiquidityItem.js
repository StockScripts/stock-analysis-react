import React from 'react';
import ReactDOM from 'react-dom';
import { formatValue } from './utils'

function LiquidityItem({data}) {
  const {year1, year2, year3, year4} = data

  const _passFailClass = (value) => {
    let classColor = 'text-green-600'

    if (value < 1) {
      classColor = 'text-orange-600'
    }
    return `border-t font-semibold px-8 py-4 ${classColor}`
  }

  return <>
   <tr>
      <td colspan="5" class="text-left text-lg border border-r-0 px-8 py-4 font-bold text-indigo-500">Can they pay their bills?</td>
    </tr>
    <tr>
      <td class="border-t border-l border-r-0 px-8 py-4 font-semibold text-left pl-12 text-indigo-800 text-opacity-75">Quick Ratio</td>
      <td class={_passFailClass(year4.quick_ratio)}>{year1.quick_ratio}</td>
      <td class={_passFailClass(year4.quick_ratio)}>{year2.quick_ratio}</td>
      <td class={_passFailClass(year4.quick_ratio)}>{year3.quick_ratio}</td>
      <td class={_passFailClass(year4.quick_ratio)}>{year4.quick_ratio}</td>
    </tr>
  </>
}

export default LiquidityItem