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

export const fiscalDateYear = (fiscalDate) => fiscalDate.split('-')[0]

export const chartProps = {
  color: {
    blue: "rgba(54, 162, 235, 0.2)",
    blueBorder: "rgba(54, 162, 235, 1)",
    greyBorder: "#718096",
    green: "rgba(75, 192, 192, 0.2)",
    greenBorder: "rgb(75, 192, 192)",
    orange: "rgba(255, 159, 64, 0.2)",
    darkOrange: "rgba(255, 159, 64, 0.4)",
    orangeBorder: "rgb(255, 159, 64)"
  },
  bar: {
    borderWidth: 1,
    percentage: 0.6
  }
}
