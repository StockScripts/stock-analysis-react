import React from 'react';

function DividendItem({data}) {
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
      <td colspan="5" class="text-left text-lg border border-r-0 px-8 py-4 font-bold text-indigo-500">Is your allowance increasing every year?</td>
    </tr>
    <tr>
      <td class="border-t border-l border-r-0 px-8 py-4 font-semibold text-left pl-12 text-indigo-800 text-opacity-75">Dividends Per Share</td>
      <td class={_passFailClass(year1.dividends_per_share_yoy)}>{year1.dividends_per_share}</td>
      <td class={_passFailClass(year2.dividends_per_share_yoy)}>{year2.dividends_per_share}</td>
      <td class={_passFailClass(year3.dividends_per_share_yoy)}>{year3.dividends_per_share}</td>
      <td class={_passFailClass(year4.dividends_per_share_yoy)}>{year4.dividends_per_share}</td>
    </tr>
    <tr>
      <td class="border-t border-l border-r-0 px-8 py-4 font-semibold text-left pl-12 text-indigo-800 text-opacity-75">YOY Growth</td>
      <td class={_passFailClass(year1.dividends_per_share_yoy)}>{year1.dividends_per_share_yoy}</td>
      <td class={_passFailClass(year2.dividends_per_share_yoy)}>{year2.dividends_per_share_yoy ? `${year2.dividends_per_share_yoy}%` : '--'}</td>
      <td class={_passFailClass(year3.dividends_per_share_yoy)}>{year3.dividends_per_share_yoy ? `${year3.dividends_per_share_yoy}%` : '--'}</td>
      <td class={_passFailClass(year4.dividends_per_share_yoy)}>{year4.dividends_per_share_yoy ? `${year4.dividends_per_share_yoy}%` : '--'}</td>
    </tr>
  </>
}

export default DividendItem