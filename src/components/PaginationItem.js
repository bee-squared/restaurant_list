import React from 'react';

const PaginationItem = (props) => {
  const { goToPage } = props;
  return (
    <div id='pagination-value' onClick={() => goToPage(props.children - 1)}>
      <div>{props.children}</div>
    </div>
  );
};

export default PaginationItem;
