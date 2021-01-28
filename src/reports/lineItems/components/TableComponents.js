import React from 'react';

export function YearsTableHeader({years}) {
  return years.map((year) => {
    return <th key={year} className="border-b border-dotted text-center text-gray-700 text-opacity-75 px-2 text-xs font-normal">{year}</th>
  })
}

export function RowHeader({itemName}) {
  const classes = `text-gray-700 text-opacity-75 text-xs text-left`
  return <td className={classes}>{itemName}</td>
}