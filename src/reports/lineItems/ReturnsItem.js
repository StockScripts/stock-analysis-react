import React from 'react';

function Returns({data}) {
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
      <td colspan="5" class="text-left text-lg border border-r-0 px-8 py-4 font-bold text-indigo-500">Can they manage their money?</td>
    </tr>
    <tr>
      <td class="border-t border-l border-r-0 px-8 py-4 font-bold text-left pl-12 text-indigo-800 text-opacity-75">ROE</td>
      <td class={_passFailClass(year1.roe)}>{year1.roe}%</td>
      <td class={_passFailClass(year2.roe)}>{year2.roe}%</td>
      <td class={_passFailClass(year3.roe)}>{year3.roe}%</td>
      <td class={_passFailClass(year4.roe)}>{year4.roe}%</td>
    </tr>
    <tr>
      <td class="border-t border-l border-r-0 px-8 py-4 font-bold text-left pl-12 text-indigo-800 text-opacity-75">ROCE</td>
      <td class={_passFailClass(year1.roce)}>{year1.roce}%</td>
      <td class={_passFailClass(year2.roce)}>{year2.roce}%</td>
      <td class={_passFailClass(year3.roce)}>{year3.roce}%</td>
      <td class={_passFailClass(year4.roce)}>{year4.roce}%</td>
    </tr>
  </>
}

export default Returns