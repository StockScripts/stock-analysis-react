import React from 'react';
import {
  ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Label, ResponsiveContainer
} from 'recharts';

function DebtRepaymentItem({debtRepaymentItems}) {

  const _passFailClass = (value) => {
    let classColor = 'text-green-600'

    if (value < 0.2) {
      classColor = 'text-orange-600'
    }
    return `border-t font-semibold px-8 py-4 ${classColor}`
  }

  const displayYears = () => {
    return debtRepaymentItems.map((item) => {
      return <th className="bg-indigo-100 border-t border-r-0 text-left px-8 py-4 text-indigo-800">{item.fiscalDate}</th>
    })
  }

  const netIncomeToLongTermDebtData = () => {
    return debtRepaymentItems.map((item) => {
      return <td className={_passFailClass(item.netIncomeToLongTermDebt)}>
        {item.netIncomeToLongTermDebt}%
      </td>
    })
  }

  return <>
    <div className="w-full h-full md:w-1/2 p-3">
      <div className="bg-white border rounded shadow">
        <div className="border-b p-3">
            <h5 className="font-bold text-indigo-600 text-opacity-75">Debt - Can you afford your debt?</h5>
        </div>
        <div className="p-5">
          <table className="shadow-lg bg-white mb-10">
            <tbody>
              <tr>
                <th className="bg-indigo-100 border-t border-l border-r-0 text-left px-8 py-4"></th>
                {displayYears()}
              </tr>
              <tr>
                <td className="border-t border-l border-r-0 px-8 py-4 font-bold text-left pl-12 text-indigo-800 text-opacity-75">Net Income to Long Term Debt</td>
                {netIncomeToLongTermDebtData()}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    {/* <div class="flex flex-row flex-wrap items-stretchmb-2">
      <div class="w-1/4 text-xl font-bold text-indigo-500">
        Can they afford their debt?
      </div>
      <div className="w-3/4 ">
        <table className="shadow-lg bg-white mb-10">
          <tbody>
            <tr>
              <th className="bg-indigo-100 border-t border-l border-r-0 text-left px-8 py-4"></th>
              {displayYears()}
            </tr>
            <tr>
              <td className="border-t border-l border-r-0 px-8 py-4 font-bold text-left pl-12 text-indigo-800 text-opacity-75">Net Income to Long Term Debt</td>
              {netIncomeToLongTermDebtData()}
            </tr>
          </tbody>
        </table>
      </div>
    </div> */}
  </>
}

export default DebtRepaymentItem