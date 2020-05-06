import React from 'react';

import '../assets/css/style.css';

const PaginationItem = (props) => {
  const { goToPage, id, className } = props;
  return (
    <div className={className} onClick={() => goToPage(props.children - 1)}>
      <div id={id}>{props.children}</div>
    </div>
  );
};

export default PaginationItem;
