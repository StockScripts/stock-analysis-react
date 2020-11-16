// export const formatValue = (value) => {
//   const numDigits = value.toString().length
//   if (numDigits > 9) {
//     return `${(value/1000000000).toFixed(2).toString()}B`
//   } else if (numDigits > 6) {
//     return `${(value/1000000).toFixed(2).toString()}M`
//   }
//   return value
// }

export const formatValue = (value, unit) => {
  switch (unit) {
    case 'B':
      return (value/1000000000).toFixed(1)
    case 'M':
      return (value/1000000).toFixed(1)
    case 'T':
      return (value/1000).toFixed(1)
    default:
      return value
  }
}

export const getUnit = (value) => {
  const numDigits = value.toString().length
  if (numDigits > 9) {
    return 'B'
  } else if (numDigits > 6) {
    return 'M'
  } else if (numDigits > 3) {
    return 'T'
  }
}

export const fiscalDateYear = (fiscalDate) => fiscalDate.split('-')[0]