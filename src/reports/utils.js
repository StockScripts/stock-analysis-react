export const getDisplayedUnit = (unit) => {
  switch (unit) {
    case 'Billion':
      return 'B'
    case 'Million':
      return 'M'
    case 'Thousand':
      return 'Th'
    default:
      break
  }
}

export const getBorderColor = (pass) => {
  if (pass) {
    return 'border-green-600'
  }
  return 'border-orange-600'
}

export const getPassFailClass = (fail) => {
  let classColor = 'text-green-600'

  if (fail) {
    classColor = 'text-orange-600'
  }
  return `text-center text-sm py-1 ${classColor}`
}
