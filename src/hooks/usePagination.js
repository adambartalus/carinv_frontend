import { useState } from "react"


export const usePagination = (initLimit, initOffset) => {
  const [limit, setLimit] = useState(initLimit);
  const [offset, setOffset] = useState(initOffset);

  return [
    limit,
    offset,
    setLimit,
    setOffset
  ];
}