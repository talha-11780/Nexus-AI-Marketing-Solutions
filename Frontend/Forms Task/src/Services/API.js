import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

API.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("authToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) sessionStorage.removeItem("authToken");
    return Promise.reject(error);
  },
);

export async function RegistrationAxiosFunction(data) {
  return await API.post("/Registration", data);
}

export const LoginAxiosFunction = (data) => API.post("/Login", data);
export const ContactQueryAxiosFunction = (data) =>
  API.post("/ContactUs", {
    fullName: data.fullName,
    email: data.exampleInputEmail1,
    phone: data.phone,
    website: data.website,
    services: data.services,
    query: data.query,
    confirmContact: data.confirmContact,
  });
export const CallBookingAxiosFunction = (data) => API.post("/BookFreeCall", data);
export const CampaignAxiosFunction = (data) => API.post("/CampaignCreation", data);
export const TeamMemberAxiosFunction = (data) => API.post("/AddTeamMember", data);
export const ServiceAxiosFunction = (data) => API.post("/AddService", data);
export const DeleteServiceAxiosFunction = (data) =>
  API.post("/DeleteService", {
    serviceSelect: data.serviceSelect,
    confirmDelete: data.confirmDelete,
  });
export const EditServiceAxiosFunction = (data) =>
  API.post("/EditService", {
    serviceSelect: data.serviceSelect,
    serviceName: data.serviceName,
    serviceDescription: data.serviceDescription,
    price: data.price,
  });
export const ContentApprovalAxiosFunction = (data) =>
  API.post("/ContentApproval", data);
export const FeedbackAxiosFunction = (data) => API.post("/Feedback", data);
export const ScheduledPostAxiosFunction = (data) =>
  API.post("/PostScheduler", data);