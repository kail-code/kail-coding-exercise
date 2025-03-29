export const getScreener = async () => {
  const response = await fetch("http://localhost:3000/api/screener");
  const data = await response.json();
  return data;
};
