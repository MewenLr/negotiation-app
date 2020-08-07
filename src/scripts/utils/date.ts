export function date(lang: string, separator: string) {
  const today = new Date()

  let dd: number|string = today.getDate()
  let mm: number|string = today.getMonth() + 1
  const yyyy = today.getFullYear()

  if (dd < 10) dd = `0${dd}`
  if (mm < 10) mm = `0${mm}`

  if (lang === 'en') return `${mm}${separator}${dd}${separator}${yyyy}`

  if (lang === 'fr') return `${dd}${separator}${mm}${separator}${yyyy}`

  return new Error('Invalid language format')
}

export function hour() {
  const today = new Date()

  let h: number|string = today.getHours()
  let min: number|string = today.getMinutes()
  let sec: number|string = today.getSeconds()

  if (h < 10) h = `0${h}`
  if (min < 10) min = `0${min}`
  if (sec < 10) sec = `0${sec}`

  return `${h}:${min}:${sec}`
}
