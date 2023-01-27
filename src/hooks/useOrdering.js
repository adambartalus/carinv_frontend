import { useState } from "react"


export const useOrdering = (initOrderBy, initOrder) => {
  const [orderBy, setOrderBy] = useState(initOrderBy);
  const [order, setOrder] = useState(initOrder);

  const sort = by => {
    const asc = orderBy === by && order === 'asc';
    setOrder(asc ? 'desc' : 'asc');
    setOrderBy(by);
  }

  return [orderBy, order, sort];
}