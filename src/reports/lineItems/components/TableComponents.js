import React from 'react';

export function YearsTableHeader({years}) {
  return years.map((year) => {
    return <th key={year} className="border-b border-dotted text-left text-gray-600 text-opacity-75 px-2 text-sm font-normal">{year}</th>
  })
}

export function RowHeader({itemName}) {
  const classes = `text-gray-600 text-opacity-75 text-sm text-left`
  return <td className={classes}>{itemName}</td>
}