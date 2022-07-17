import { shallow } from 'enzyme'
import TableHead from './TableHead'

describe('TableHead', () => {
  it("should render columns with titles", () => {
    const titles = [
      {
        key: 1,
        title: 'Title 1',
      },
      {
        key: 2,
        title: 'Title 2',
      },
      {
        key: 3,
        title: 'Title 3',
      },
    ]

    const thead = shallow(<TableHead columns={titles}/>)

    titles.forEach(({ title }, i) => {
      expect(thead.find('th').at(i).text()).toEqual(title)
    })
  })
})
