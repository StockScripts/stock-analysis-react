import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export function ItemTitle({title, subtitle, pass, icon}) {
  const textColor = pass ? 'text-green-600' : 'text-orange-600'
  return (
    <div className={`${textColor} flex mb-2`}>
      <div className="text-opacity-75">
        <FontAwesomeIcon icon={icon} size="3x"/>
      </div>
      <div className={`font-bold mt-3 ml-6`}>{title}</div>
      <div className={`text-sm text-gray-600 mt-3 ml-2`}>{subtitle}</div>
    </div>
  )
}