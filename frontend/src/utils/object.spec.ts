import { keys } from './object'

describe('keys', () => {
  it("should return all keys from object literal", () => {
    const obj = {
      test1: '',
      test2: '',
      test3: '',
    }

    expect(keys(obj)).toEqual(['test1', 'test2', 'test3'])
  })

  it('should not return non enumerable properties', () => {
    const obj = {
      test: '',
    }
    Object.defineProperty(obj, 'skipped', {
      enumerable: false,
    })

    expect(keys(obj)).not.toContain('skipped')
  })

  it('should return empty array for object without own keys', () => {
    const obj = {}

    expect(keys(obj)).toHaveLength(0)
  })
})
