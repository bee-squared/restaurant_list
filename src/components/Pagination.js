import React from 'react';
import PaginationItem from './PaginationItem';

import '../assets/css/style.css';

const Pagination = ({
  numItems,
  numItemsPerPage,
  currentPage,
  addPage,
  subtractPage,
  goToPage,
}) => {
  const numPages = Math.ceil(numItems / numItemsPerPage);
  let pages = [...Array(numPages).keys()]

  return (
    <div className='pagination-container'>
      {currentPage > 0 ? (
        <button
          id='pagination-arrow-left'
          className='pagination-arrow'
          onClick={() => subtractPage()}
        />
      ) : (
        <button
          disabled={true}
          id='pagination-arrow-left-disabled'
          className='pagination-arrow'
        />
      )}
      {pages.map((page, i) => (
        <PaginationItem
          key={`page-${i + 1}`}
          id={`page-${i + 1}`}
          className={
            currentPage === i
              ? 'pagination-value-container-active'
              : 'pagination-value-container'
          }
          goToPage={goToPage}
        >
          {i + 1}
        </PaginationItem>
      ))}
      {currentPage < numPages - 1 ? (
        <button
          id='pagination-arrow-right'
          className='pagination-arrow'
          onClick={() => addPage()}
        />
      ) : (
        <button
          disabled={true}
          id='pagination-arrow-right-disabled'
          className='pagination-arrow'
          onClick={() => addPage()}
        />
      )}
    </div>
  );
};

export default Pagination;
