export const buildQueryString = params => {
  return Object.keys(params)
    .filter(k => undefined !== params[k])
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join('&');
}