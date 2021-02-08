import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

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

export function ItemTitle({title, subtitle, pass, tip, icon, setDisplay, tipDisplay}) {
  const textColor = pass ? 'text-green-600' : 'text-orange-600'
  const tipBg = pass ? 'bg-palette-green-med' : 'bg-orange-500'
  const textHover = pass ? 'hover:text-palette-green-med' : 'hover:text-orange-500'
  let help = tip ? <span className={`${tipBg} tooltip-text text-white p-3 -mt-1 -ml-0 ml-1 rounded opacity-85`}>{tip}</span> : null
  
  return (
    <div className={`${textColor} flex mb-2 ${textHover}`}>
      <div className="text-opacity-75 tooltip cursor-pointer">
        <FontAwesomeIcon icon={icon} size="3x" onClick={() => setDisplay(true)}/>
        <span className="cursor-default">{tipDisplay ? help : null}</span>
      </div>
      <div className={`font-bold mt-3 ml-6 cursor-pointer`} onClick={() => setDisplay(true)}>{title}</div>
      <div className={`text-sm text-gray-600 mt-3 ml-2`}>{subtitle}</div>
    </div>
  )
}

export function ItemTip({definition, importance, guidance, caution, onClose}) {
  return (
    <div>
      <div className="text-right font-bold mt-1 mr-1 cursor-pointer mb-1" onClick={onClose}>
        <FontAwesomeIcon icon={faTimes}/>
      </div>
      <div className="text-md font-bold mb-4 ml-1">
        {guidance}
      </div>
      <Accordion allowZeroExpanded={true}>
        <AccordionItem>
          <AccordionItemHeading>
            <AccordionItemButton>What is it</AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <p>{definition}</p>
          </AccordionItemPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionItemHeading>
            <AccordionItemButton>Why it's important</AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel><p>{importance}</p></AccordionItemPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionItemHeading>
            <AccordionItemButton>What to watch for</AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel><p>{caution}</p></AccordionItemPanel>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
