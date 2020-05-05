import React from 'react';

const PaginationItem = (props) => {
  const { goToPage, id, className } = props;
  return (
    <div className={className} onClick={() => goToPage(props.children - 1)}>
      <div id={id}>{props.children}</div>
    </div>
  );
};

export default PaginationItem;
