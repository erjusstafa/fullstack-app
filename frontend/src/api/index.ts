export const endpointAPI = 'http://localhost:1337/api';

export const handleCustomAPI = async <T>(
  url: string, 
  method: "GET" | "POST" | "PUT" | "DELETE",
  body?: unknown
): Promise<T> => {
  const options: RequestInit = {
    method,
    headers: { 'Content-Type': 'application/json' },
  };

  if (body) options.body = JSON.stringify(body);

  const response = await fetch(`${endpointAPI}/${url}`, options);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json() as Promise<T>;
};