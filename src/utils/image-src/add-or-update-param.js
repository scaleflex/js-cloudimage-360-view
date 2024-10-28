export const addOrUpdateParam = (url, paramName, paramValue) => {
  const [base, query] = url.split('?');
  const newParam = `${paramName}=${encodeURIComponent(paramValue)}`;

  if (!query) {
    return `${base}?${newParam}`;
  }

  const params = new URLSearchParams(query);

  params.set(paramName, paramValue);

  return `${base}?${params.toString()}`;
};
