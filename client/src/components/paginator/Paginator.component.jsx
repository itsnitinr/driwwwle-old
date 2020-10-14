import React from "react";
import Pagination from "rc-pagination";
import "./Paginator.styles.css";

function Paginator({ onChange, current, total, pageSize }) {
  return (
    <Pagination
      onChange={onChange}
      current={current}
      pageSize={pageSize}
      total={total}
    />
  );
}

export default Paginator;
