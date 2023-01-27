import { buildQueryString } from "../utils/QueryStringBuilder";

const API_URL = 'http://localhost:8080/cars';

const requestOptions = {
  method: 'GET',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
};

export const getCars = async (paginationOptions, orderOptions, filterOptions, signal) => {
  const params = {
    limit: paginationOptions.limit,
    offset: paginationOptions.offset,
    sort: `${orderOptions.orderBy},${orderOptions.order}`,
    make: 0 == filterOptions.makes.length ? undefined : filterOptions.makes?.map(m => m.id).join(','),
    model: filterOptions.model,
    minModelYear: filterOptions.minModelYear,
    maxModelYear: filterOptions.maxModelYear,
    minQuantity: filterOptions.minQuantity,
    maxQuantity: filterOptions.maxQuantity
  }
  const response = await fetch(`${API_URL}?${buildQueryString(params)}`, { signal, ...requestOptions });
  if (!response.ok) throw response;
  return response.json();
}
export const getCar = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, requestOptions);
  if (!response.ok) throw response;
  return response.json();
}
export const deleteCar = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if(!response.ok) throw response;
  return response;
}
export const deleteCars = async (ids) => {
  let query = '';
  if(ids.length > 0) {
    query = '?ids=' + ids.join(',');
  }
  const response = await fetch('http://localhost:8080/cars' + query, {
    method: 'DELETE',
    credentials: 'include'
  });
  if(!response.ok) throw response;
  return response;
}
