import React from 'react';

function DebtRepaymentItem({data}) {
  const {year1, year2, year3, year4} = data

  const _passFailClass = (value) => {
    let classColor = 'text-green-600'

    if (value < 0.2) {
      classColor = 'text-orange-600'
    }
    return `border-t font-semibold px-8 py-4 ${classColor}`
  }

  return <>
    <tr>
      <td colspan="5" class="text-left text-lg border border-r-0 px-8 py-4 font-bold text-indigo-500">Can they afford their debt?</td>
    </tr>
    <tr>
      <td class="border-t border-l border-r-0 px-8 py-4 font-bold text-left pl-12 text-indigo-800 text-opacity-75">Net Income to Long Term Debt</td>
      <td class={_passFailClass(year1.net_income_to_long_term_debt)}>{year1.net_income_to_long_term_debt}</td>
      <td class={_passFailClass(year2.net_income_to_long_term_debt)}>{year2.net_income_to_long_term_debt}</td>
      <td class={_passFailClass(year3.net_income_to_long_term_debt)}>{year3.net_income_to_long_term_debt}</td>
      <td class={_passFailClass(year4.net_income_to_long_term_debt)}>{year4.net_income_to_long_term_debt}</td>
    </tr>
  </>
}

export default DebtRepaymentItem