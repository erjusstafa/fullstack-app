export const endpointAPI = 'http://localhost:1337/api'


export const handleCustomAPI = async (url: string, method: string, body?: any) => {
    const response = await fetch(`${endpointAPI}/${url}`, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return data;
}