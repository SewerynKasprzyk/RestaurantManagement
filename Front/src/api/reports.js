import axios from 'axios';

const API_URL = '/api/reports';

export default const getReportData = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching report data:', error);
    throw error;
  }
};
