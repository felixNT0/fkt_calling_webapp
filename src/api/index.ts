import axios from "axios";

// We use relative Next.js API paths
const baseUrl = "/api/meeting";

export const createMeeting = async (data: any) => {
    const response = await axios.post(`${baseUrl}`, data);
    return response.data;
};

export const getAllMeeting = async () => {
    const response = await axios.get(`${baseUrl}`);
    return response.data;
};

export const getMeetingByIdMeeting = async (id: string) => {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
};

export const editMeeting = async (id: string, data: any) => {
    const response = await axios.put(`${baseUrl}/${id}`, data);
    return response.data;
};

export const deleteMeeting = async (id: string) => {
    const response = await axios.delete(`${baseUrl}/${id}`);
    return response.data;
};

export const generateAgoraToken = async (
  channelName: string,
  startDate: string | Date
) => {
    const response = await axios.post(`${baseUrl}/agora/token`, {
      channelName,
      startDate,
    });
    return response.data;
};
