import React from 'react';
import styles from './Pagination.module.css';

const Pagination = ({ totalPages, currentPage, onPageChange, totalItems, itemsPerPage }) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(startItem + itemsPerPage - 1, totalItems);

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className={styles.pagination}>
      <span>{startItem}-{endItem} din {totalItems}</span>
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={styles.arrow}
      >
        &lt;
      </button>
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={styles.arrow}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
