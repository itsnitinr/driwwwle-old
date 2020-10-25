import { useState, useEffect } from "react";

function Paginate(items, currentPage, perPage) {
  if (!items.length) return [];
  return items.slice((currentPage - 1) * perPage, currentPage * perPage);
}

function usePaginator(values = []) {
  const [page, setPage] = useState({
    offset: 0,
    perPage: 6,
    currentPage: 1,
    pageCount: 0,
    items: [],
  });

  const updateItems = () => {
    const items = Paginate(values, page.currentPage, page.perPage);
    setPage((prevState) => ({
      ...prevState,
      items,
    }));
  };

  const setCurrentPage = (page) => {
    setPage((prevState) => ({
      ...prevState,
      currentPage: page,
    }));
  };

  useEffect(updateItems, [values, page.currentPage]);

  return {
    items: page.items,
    currentPage: page.currentPage,
    perPage: page.perPage,
    setCurrentPage,
  };
}

export default usePaginator;
