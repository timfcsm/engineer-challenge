import { unique } from './array'

describe('unique', () => {
  it('should return same array if provided array is of unique values itself', () => {
    const input = [1, 2, 3, 4, 5]

    expect(unique(input)).toEqual(input)
  })

  it("should return unique values", () => {
    const input = [1, 1, 2, 2, 4, 5, 4, 5]
    const expected = [1, 2, 4, 5]

    expect(unique(input)).toEqual(expected)
  })

  it('should return empty array if input is empty array', () => {
    expect(unique([])).toHaveLength(0)
  })
})
