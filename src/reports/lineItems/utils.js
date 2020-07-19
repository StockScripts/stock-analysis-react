export const formatValue = (value) => {
  const numDigits = value.toString().length
  if (numDigits > 9) {
    return `${(value/1000000000).toString()}B`
  } else if (numDigits > 6) {
    return `${(value/1000000).toString()}M`
  }
  return value
}