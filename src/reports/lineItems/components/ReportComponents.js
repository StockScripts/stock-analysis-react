import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export function ItemTitle({title, subtitle, pass, tip, icon}) {
  const textColor = pass ? 'text-green-600' : 'text-orange-600'
  const tipBg = pass ? 'bg-palette-green-med' : 'bg-orange-500'
  let help = tip ? <span className={`${tipBg} tooltip-text text-white p-3 -mt-1 -ml-0 ml-1 rounded opacity-85`}>{tip}</span> : null
  const [displayHelp, setDisplayHelp] = React.useState(false)

  const toggleHelp = () => {
    setDisplayHelp(!displayHelp)
  }

  return (
    <div className={`${textColor} flex mb-2 cursor-pointer`} onClick={toggleHelp}>
      <div className="text-opacity-75 tooltip">
        <FontAwesomeIcon icon={icon} size="3x"/>
        {displayHelp ? help : null}
      </div>
      <div className={`font-bold mt-3 ml-6`}>{title}</div>
      <div className={`text-sm text-gray-600 mt-3 ml-2`}>{subtitle}</div>
    </div>
  )
}