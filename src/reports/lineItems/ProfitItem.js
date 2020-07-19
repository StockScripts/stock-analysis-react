import React from 'react';
import ReactDOM from 'react-dom';
import { formatValue } from './utils'

function ProfitItem({data}) {
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
      <td colspan="5" class="text-left text-lg border border-r-0 px-8 py-4 font-bold text-indigo-500">Are they keeping the money they're making?</td>
    </tr>
    <tr>
      <td class="border-t border-l border-r-0 px-8 py-4 font-bold text-left pl-12 text-indigo-800 text-opacity-75">Net Income</td>
      <td class={_passFailClass(year1.net_income_yoy)}>{formatValue(year1.net_income)}</td>
      <td class={_passFailClass(year2.net_income_yoy)}>{formatValue(year2.net_income)}</td>
      <td class={_passFailClass(year3.net_income_yoy)}>{formatValue(year3.net_income)}</td>
      <td class={_passFailClass(year4.net_income_yoy)}>{formatValue(year4.net_income)}</td>
    </tr>
    <tr>
      <td class="border-t border-l border-r-0 px-8 py-4 font-bold text-left pl-12 text-indigo-800 text-opacity-75">YOY Growth</td>
      <td class={_passFailClass(year1.net_income_yoy)}>{year1.net_income_yoy}</td>
      <td class={_passFailClass(year2.net_income_yoy)}>{year2.net_income_yoy}%</td>
      <td class={_passFailClass(year3.net_income_yoy)}>{year3.net_income_yoy}%</td>
      <td class={_passFailClass(year4.net_income_yoy)}>{year4.net_income_yoy}%</td>
    </tr>
    <tr>
      <td class="border-t border-l border-r-0 px-8 py-4 font-bold text-left pl-12 text-indigo-800 text-opacity-75">Net Margin</td>
      <td class={_passFailClass(year1.net_margin)}>{year1.net_margin}%</td>
      <td class={_passFailClass(year2.net_margin)}>{year2.net_margin}%</td>
      <td class={_passFailClass(year3.net_margin)}>{year3.net_margin}%</td>
      <td class={_passFailClass(year4.net_margin)}>{year4.net_margin}%</td>
    </tr>
  </>
}

export default ProfitItem