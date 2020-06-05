const pad = (num, n) => {
  var tbl = []
  var len = n - num.toString().length
  if (len <= 0) return num
  if (!tbl[len]) tbl[len] = new Array(len + 1).join('0')
  return tbl[len] + num
}

export default pad
