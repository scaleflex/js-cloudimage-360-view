export const removeParamByRegex = (url, paramToRemove) => {
  const [base, query] = url.split('?');
  if (!query) return url;

  const regex = new RegExp(`^${paramToRemove}=|&${paramToRemove}=`);
  const cleanedQuery = query
    .split('&')
    .filter((param) => !regex.test(param))
    .join('&');

  return cleanedQuery ? `${base}?${cleanedQuery}` : base;
};
