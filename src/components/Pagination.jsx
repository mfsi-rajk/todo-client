import React, { useState } from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;
  const [goToPage, setGoToPage] = useState('');

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  const handleGoToPage = () => {
    const newPage = parseInt(goToPage, 10);
    if (!isNaN(newPage)) {
      handlePageChange(newPage);
      setGoToPage('');
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const range = 5; 

    for (let i = currentPage - range; i <= currentPage + range; i++) {
      if (i >= 1 && i <= totalPages) {
        pageNumbers.push(i);
      }
    }

    return pageNumbers.map((pageNumber) => (
      <button
        key={pageNumber}
        onClick={() => handlePageChange(pageNumber)}
        className={`bg-gray-200 rounded-md px-2 py-1 mx-1 ${
          pageNumber === currentPage ? 'bg-blue-500 text-white' : 'hover:bg-gray-300'
        }`}
      >
        {pageNumber}
      </button>
    ));
  };

  return (
    <>
      <div className='flex items-center justify-center my-4'>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className={`bg-gray-200 rounded-md px-4 py-2 ${
            isFirstPage ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300'
          }`}
          disabled={isFirstPage  || totalPages === 0}
        >
          Previous
        </button>
        {renderPageNumbers()}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className={`bg-gray-200 rounded-md px-4 py-2 ${
            isLastPage ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300'
          }`}
          disabled={isLastPage || totalPages === 0}
        >
          Next
        </button>
      </div>
      <span className='mx-4 -my-14 float-right'>
        Go to page:
        <input
          type='number'
          min='1'
          max={totalPages}
          value={goToPage}
          onChange={(e) => setGoToPage(e.target.value)}
          className='border rounded-md px-2 py-1 ml-2'
        />
        <button
          onClick={handleGoToPage}
          className='bg-gray-200 rounded-md px-3 py-1 ml-2 hover:bg-gray-300'
        >
          Go
        </button>
      </span>
    </>
  );
};

export default Pagination;
