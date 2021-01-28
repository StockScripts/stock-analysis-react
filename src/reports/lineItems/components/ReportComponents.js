import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export function ReportItem({itemTitle, borderColor, itemChart, tableBody}) {
  return (
    <div className="w-full md:w-1/2 xl:w-1/3 p-3">
      <div class={`h-full border-b-4 bg-white ${borderColor} rounded-md shadow-lg p-5`}>
        <div className="p-3">
          {itemTitle}
          <div className="mt-4">
            {itemChart}
          </div>
          <table className="w-full table-auto mt-2">
            {tableBody}
          </table>
        </div>
      </div>
    </div>
  )
}

export function ItemTitle({title, subtitle, pass, tip, icon}) {
  const textColor = pass ? 'text-green-600' : 'text-orange-600'
  const tipBg = pass ? 'bg-palette-green-med' : 'bg-orange-500'
  const textHover = pass ? 'hover:text-palette-green-med' : 'hover:text-orange-500'
  let help = tip ? <span className={`${tipBg} tooltip-text text-white p-3 -mt-1 -ml-0 ml-1 rounded opacity-85`}>{tip}</span> : null
  const [displayHelp, setDisplayHelp] = React.useState(false)

  const toggleHelp = () => {
    setDisplayHelp(!displayHelp)
  }

  return (
    <div className={`${textColor} flex mb-2 cursor-pointer ${textHover}`} onClick={toggleHelp}>
      <div className="text-opacity-75 tooltip">
        <FontAwesomeIcon icon={icon} size="3x"/>
        {displayHelp ? help : null}
      </div>
      <div className={`font-bold mt-3 ml-6`}>{title}</div>
      <div className={`text-sm text-gray-600 mt-3 ml-2`}>{subtitle}</div>
    </div>
  )
}

export function ItemTip({definition, importance, guidance, caution}) {
  return (
    <div>
      <div className="text-right font-bold mt-1 mr-1">x</div>
      <div className="text-md font-bold mb-1 ml-1">
        {guidance}
      </div>
      <br></br>
      <div className="font-semibold text-sm ml-1">What is it:</div>
      <div className="text-sm mb-1 ml-1">
        {definition}
      </div>
      <div className="font-semibold text-sm ml-1">Why it's important:</div>
      <div className="text-sm mb-1 ml-1">
        {importance}
      </div>
      <div className="font-semibold text-sm ml-1">What to watch for:</div>
      <div className="text-sm mb-1 ml-1">
        {caution}
      </div>
    </div>
  )
}