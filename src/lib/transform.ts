export const transform = (num: number): string => {
  let value = Math.trunc(num).toString()
  switch (value.length) {
    case 7:
      value = value[0] + 'M'
      break
    case 8:
      value = value[0] + value[1] + 'M'
      break
    case 9:
      value = value[0] + value[1] + value[2] + 'M'
      break
    case 10:
      value = value[0] + 'B'
      break
    case 11:
      value = value[0] + value[1] + 'B'
      break
    case 12:
      value = value[0] + value[1] + value[2] + 'B'
      break
    case 13:
      value = value[0] + 'T'
      break
    case 14:
      value = value[0] + value[1] + 'T'
      break
    case 15:
      value = value[0] + value[1] + value[2] + 'T'
      break
    default:
      value = num.toFixed(2).toString()
      break
  }
  return value
}
