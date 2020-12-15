import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export function ChecklistItem({title, subtitle, icon, content}) {
  return (
    <div className="w-full md:w-1/2 p-3">
      <div class={`h-full border-b-4 bg-white border-palette-green-dark rounded-md shadow-lg p-5`}>
        <div className="p-3">
          <div className={`text-palette-green-dark flex mb-2`}>
            <div>
              <FontAwesomeIcon icon={icon} size="3x"/>
            </div>
            <div className={`font-bold text-xl ml-6`}>{title}</div>
          </div>
          <div className={`font-bold text-gray-500 mt-3 ml-2 text-xl`}>{subtitle}</div>
          <div className={`text-gray-500 mt-1 ml-2`}>{content}</div>
        </div>
      </div>
    </div>
  )
}