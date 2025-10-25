import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Types
export interface MenuItem {
  id: number;
  name: string;
  description: string;
  category: string;
  price: string;
  imageUrl: string | null;
  available: boolean;
  ingredients: string[] | null;
  allergens: string[] | null;
  isVegetarian: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  location: string;
  address: string;
  latitude: string | null;
  longitude: string | null;
  startTime: string;
  endTime: string;
  status: string;
  imageUrl: string | null;
  maxCapacity: number;
  currentAttendees: number;
  createdAt: string;
  updatedAt: string;
}

export interface CateringRequest {
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  eventType: string;
  guestCount: number;
  location: string;
  message?: string;
  menuPreferences?: string[];
  dietaryRestrictions?: string;
  budget?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
}

// Menu API
export const menuApi = {
  getAll: async (params?: { category?: string; available?: boolean }) => {
    const { data } = await apiClient.get<ApiResponse<MenuItem[]>>('/menu', { params });
    return data;
  },

  getById: async (id: number) => {
    const { data } = await apiClient.get<ApiResponse<MenuItem>>(`/menu/${id}`);
    return data;
  },
};

// Events API
export const eventsApi = {
  getAll: async (params?: { status?: string; upcoming?: boolean }) => {
    const { data } = await apiClient.get<ApiResponse<Event[]>>('/events', { params });
    return data;
  },

  getById: async (id: number) => {
    const { data } = await apiClient.get<ApiResponse<Event>>(`/events/${id}`);
    return data;
  },
};

// Catering API
export const cateringApi = {
  submit: async (request: CateringRequest) => {
    const { data } = await apiClient.post<ApiResponse<{ id: number; status: string; message: string }>>('/catering', request);
    return data;
  },
};
