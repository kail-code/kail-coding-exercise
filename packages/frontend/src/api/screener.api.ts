import { API_URL } from "./index";

export const getScreener = async () => {
  const response = await fetch(`${API_URL}api/screener`);
  const data = await response.json();
  return data;
};
