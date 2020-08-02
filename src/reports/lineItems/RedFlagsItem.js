import React from 'react';

function RedFlags({data}) {
  const {
    receivablesToSales,
    inventoryToSales,
    opExToSales,
    sgaToSales,
  } = data

  const _passFailClass = (value1, value2) => {
    let classColor = 'text-green-600'

    if (Math.abs(value2 - value1) > 0.2) {
      classColor = 'text-orange-600'
    }
    return `border-t font-semibold px-8 py-4 ${classColor}`
  }

  return <>
    <tr>
      <td colspan="5" class="text-left text-lg border border-r-0 px-8 py-4 font-bold text-indigo-500">Are they legit?</td>
    </tr>
    <tr>
      <td class="border-t border-l border-r-0 px-8 py-4 font-bold text-left pl-12 text-indigo-800 text-opacity-75">Receivables to Sales</td>
      <td class={_passFailClass(receivablesToSales.year1, receivablesToSales.year2)}>{receivablesToSales.year1}</td>
      <td class={_passFailClass(receivablesToSales.year2, receivablesToSales.year3)}>{receivablesToSales.year2}</td>
      <td class={_passFailClass(receivablesToSales.year3, receivablesToSales.year4)}>{receivablesToSales.year3}</td>
      <td class={_passFailClass(receivablesToSales.year4, receivablesToSales.year3)}>{receivablesToSales.year4}</td>
    </tr>
    <tr>
      <td class="border-t border-l border-r-0 px-8 py-4 font-bold text-left pl-12 text-indigo-800 text-opacity-75">Inventory to Sales</td>
      <td class={_passFailClass(inventoryToSales.year1, inventoryToSales.year2)}>{inventoryToSales.year1}</td>
      <td class={_passFailClass(inventoryToSales.year2, inventoryToSales.year3)}>{inventoryToSales.year2}</td>
      <td class={_passFailClass(inventoryToSales.year3, inventoryToSales.year4)}>{inventoryToSales.year3}</td>
      <td class={_passFailClass(inventoryToSales.year4, inventoryToSales.year3)}>{inventoryToSales.year4}</td>
    </tr>
    <tr>
      <td class="border-t border-l border-r-0 px-8 py-4 font-bold text-left pl-12 text-indigo-800 text-opacity-75">Operating Expense to Sales</td>
      <td class={_passFailClass(opExToSales.year1, opExToSales.year2)}>{opExToSales.year1}</td>
      <td class={_passFailClass(opExToSales.year2, opExToSales.year3)}>{opExToSales.year2}</td>
      <td class={_passFailClass(opExToSales.year3, opExToSales.year4)}>{opExToSales.year3}</td>
      <td class={_passFailClass(opExToSales.year4, opExToSales.year3)}>{opExToSales.year4}</td>
    </tr>
    <tr>
      <td class="border-t border-l border-r-0 px-8 py-4 font-bold text-left pl-12 text-indigo-800 text-opacity-75">SGA to Sales</td>
      <td class={_passFailClass(sgaToSales.year1, sgaToSales.year2)}>{sgaToSales.year1}</td>
      <td class={_passFailClass(sgaToSales.year2, sgaToSales.year3)}>{sgaToSales.year2}</td>
      <td class={_passFailClass(sgaToSales.year3, sgaToSales.year4)}>{sgaToSales.year3}</td>
      <td class={_passFailClass(sgaToSales.year4, sgaToSales.year3)}>{sgaToSales.year4}</td>
    </tr>
  </>
}

export default RedFlags