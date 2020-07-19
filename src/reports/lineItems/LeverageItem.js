import React from 'react';
import ReactDOM from 'react-dom';
import { formatValue } from './utils'

function LeverageItem({data}) {
  const {year1, year2, year3, year4} = data

  const _leveragePassFailClass = (value) => {
    let classColor = 'text-green-600'

    if (value > 2) {
      classColor = 'text-orange-600'
    }
    return `border-t font-semibold px-8 py-4 ${classColor}`
  }

  const _debtPassFailClass = (value) => {
    let classColor = 'text-green-600'

    if (value > 40) {
      classColor = 'text-orange-600'
    }
    return `border-t font-semibold px-8 py-4 ${classColor}`
  }

  return <>
    <tr>
      <td colspan="5" class="text-left text-lg border border-r-0 px-8 py-4 font-bold text-indigo-500">Do they owe too much?</td>
    </tr>
    <tr>
      <td class="border-t border-l border-r-0 px-8 py-4 font-bold text-left pl-12 text-indigo-800 text-opacity-75">Leverage Ratio</td>
      <td class={_leveragePassFailClass(year1.leverage_ratio)}>{year1.leverage_ratio}</td>
      <td class={_leveragePassFailClass(year2.leverage_ratio)}>{year2.leverage_ratio}</td>
      <td class={_leveragePassFailClass(year3.leverage_ratio)}>{year3.leverage_ratio}</td>
      <td class={_leveragePassFailClass(year4.leverage_ratio)}>{year4.leverage_ratio}</td>
    </tr>
    <tr>
      <td class="border-t border-l border-r-0 px-8 py-4 font-bold text-left pl-12 text-indigo-800 text-opacity-75">Long Term Debt to Equity</td>
      <td class={_debtPassFailClass(year1.long_term_debt_to_equity)}>{year1.long_term_debt_to_equity}%</td>
      <td class={_debtPassFailClass(year2.long_term_debt_to_equity)}>{year2.long_term_debt_to_equity}%</td>
      <td class={_debtPassFailClass(year3.long_term_debt_to_equity)}>{year3.long_term_debt_to_equity}%</td>
      <td class={_debtPassFailClass(year4.long_term_debt_to_equity)}>{year4.long_term_debt_to_equity}%</td>
    </tr>
  </>
}

export default LeverageItem