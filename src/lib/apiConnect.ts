import axios from 'axios'

const BASE_URL = 'http://localhost:9000'

export interface Widget {
  description: string
  name: string
  price: number
}

export const fetchAllWidgets = (): Promise<Widget[]> => axios.get(`${BASE_URL}/v1/widgets`).then((response) => response.data)
// Create new widgets
export const createWidgets = (widgets: Widget): Promise<Widget[]> =>
  axios.post(`${BASE_URL}/v1/widgets`, widgets).then((response) => response.data)

// Fetch a widget by name
export const fetchWidgetByName = (name: string): Promise<Widget | null> =>
  axios
    .get(`${BASE_URL}/v1/widgets/${name}`)
    .then((response) => response.data)
    .catch(() => null);  

// Update a widget's description or price
export const updateWidget = (
  name: string,
  description?: string,
  price?: number
): Promise<Widget | null> => {
  const updateData: { description?: string; price?: number } = {};
  if (description) updateData.description = description;
  if (price) updateData.price = price;

  return axios
    .put(`${BASE_URL}/v1/widgets/${name}`, null, {
      params: updateData,
    })
    .then((response) => response.data)
    .catch(() => null); // Return null if the widget doesn't exist or update fails
}


// Delete a widget by name
export const deleteWidget = (name: string): Promise<number> => {
  console.log("Delete invoked for widget:", name);

  return axios
    .delete(`${BASE_URL}/v1/widgets/${encodeURIComponent(name)}`)
    .then((response) => {
      // Return the status code from the response (204 for success)
      return response.status;
    })
    .catch((error) => {
      // Return the error status code (404 for not found, 500 for server error, etc.)
      console.error("Error deleting widget:", error);
      return error.response ? error.response.status : 500;  // Default to 500 if no status available
    });
};
