const times = <T>(cb: (index: number) => T, n: number): T[] => {
  let i = 0
  const res: T[] = []

  while (i < n) {
    res.push(cb(i))
    i++
  }

  return res
}

export default times
