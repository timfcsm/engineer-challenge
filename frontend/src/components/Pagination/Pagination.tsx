import React from 'react';
import times from '../../helpers/times';

type Props = {
  pages: number
  currentPage: number
  onPageChange: (page: number) => void
}

const Pagination: React.FC<Props> = ({ pages, currentPage, onPageChange }) => {
  const prevDisabled = currentPage === 1
  const nextDisabled = currentPage >= pages

  const onPrevClick = () => onPageChange(Math.max(0, currentPage - 1))
  const onNextClick = () => onPageChange(Math.min(pages, currentPage + 1))

  return (
    <div>
      <div className="inline-flex flex-row border divide-x rounded overflow-hidden">
          <button 
            disabled={prevDisabled} 
            className={`w-10 font-light text-sm py-2 text-center ${prevDisabled ? 'cursor-not-allowed' : ''}`}
            onClick={onPrevClick}
          >
            {'<'}
          </button>
        {times(i => (
          <button
            key={i}
            className={`w-10 font-light text-sm py-2 text-center ${currentPage === i + 1 ? 'bg-indigo-300' : ''}`}
            onClick={() => onPageChange(i + 1)}
          >
            {i + 1}
          </button>
        ), pages)}
          <button
            disabled={currentPage >= pages}
            className={`w-10 font-light text-sm py-2 text-center ${nextDisabled ? 'cursor-not-allowed' : ''}`}
            onClick={onNextClick}
          >
            {'>'}
          </button>
      </div>
    </div>
  )
}

export default Pagination
