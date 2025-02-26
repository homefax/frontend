import axios from "axios";
import { mockProperties, Property } from "./mockData";

// Check if we should use mock data
const useMockData = process.env.REACT_APP_USE_MOCK_DATA === "true";

// Create axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// API service functions
export const apiService = {
  // Auth endpoints
  auth: {
    login: async (email: string, password: string) => {
      if (useMockData) {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // Return mock data
        const token = "mock-jwt-token";
        localStorage.setItem("token", token);
        return {
          token,
          user: {
            id: "1",
            email,
            name: "Mock User",
          },
        };
      }

      // Real API call
      const response = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", response.data.access_token);
      return response.data;
    },

    register: async (userData: any) => {
      if (useMockData) {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // Return mock data
        const token = "mock-jwt-token";
        localStorage.setItem("token", token);
        return {
          token,
          user: {
            id: "1",
            ...userData,
          },
        };
      }

      // Real API call
      const response = await api.post("/auth/register", userData);
      localStorage.setItem("token", response.data.access_token);
      return response.data;
    },

    loginWithGmail: async () => {
      if (useMockData) {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // Return mock data
        const token = "mock-jwt-token";
        localStorage.setItem("token", token);
        return {
          token,
          user: {
            id: "1",
            email: "user@gmail.com",
            name: "Gmail User",
          },
        };
      }

      // In a real app, this would redirect to Google OAuth
      // For now, just return a mock response
      return {
        token: "mock-jwt-token",
        user: {
          id: "1",
          email: "user@gmail.com",
          name: "Gmail User",
        },
      };
    },

    loginWithWallet: async (walletAddress: string) => {
      if (useMockData) {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // Return mock data
        const token = "mock-jwt-token";
        localStorage.setItem("token", token);
        return {
          token,
          user: {
            id: "1",
            walletAddress,
            name: "Wallet User",
          },
        };
      }

      // Real API call
      const response = await api.post("/auth/wallet", { walletAddress });
      localStorage.setItem("token", response.data.access_token);
      return response.data;
    },

    logout: () => {
      localStorage.removeItem("token");
    },

    getProfile: async () => {
      if (useMockData) {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // Return mock data
        return {
          id: "1",
          email: "user@example.com",
          name: "Mock User",
        };
      }

      // Real API call
      const response = await api.get("/auth/profile");
      return response.data;
    },
  },

  // Properties endpoints
  properties: {
    getAll: async (params?: any) => {
      if (useMockData) {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Apply filters if provided
        let filteredProperties = [...mockProperties];

        if (params?.search) {
          const search = params.search.toLowerCase();
          filteredProperties = filteredProperties.filter(
            (property) =>
              property.address.toLowerCase().includes(search) ||
              property.city.toLowerCase().includes(search) ||
              property.zipCode.includes(search)
          );
        }

        if (params?.state) {
          filteredProperties = filteredProperties.filter(
            (property) => property.state === params.state
          );
        }

        return {
          items: filteredProperties,
          meta: {
            totalItems: filteredProperties.length,
            itemCount: filteredProperties.length,
            itemsPerPage: 10,
            totalPages: 1,
            currentPage: 1,
          },
        };
      }

      // Real API call
      const response = await api.get("/properties", { params });
      return response.data;
    },

    getById: async (id: string) => {
      if (useMockData) {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Find property in mock data
        const property = mockProperties.find((p: Property) => p.id === id);

        if (!property) {
          throw new Error("Property not found");
        }

        return property;
      }

      // Real API call
      const response = await api.get(`/properties/${id}`);
      return response.data;
    },

    create: async (propertyData: Partial<Property>) => {
      if (useMockData) {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Create mock property
        const newProperty = {
          id: (mockProperties.length + 1).toString(),
          ...propertyData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        } as Property;

        // In a real app, we would add this to the mock data
        // mockProperties.push(newProperty);

        return newProperty;
      }

      // Real API call
      const response = await api.post("/properties", propertyData);
      return response.data;
    },

    update: async (id: string, propertyData: Partial<Property>) => {
      if (useMockData) {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Find property in mock data
        const propertyIndex = mockProperties.findIndex(
          (p: Property) => p.id === id
        );

        if (propertyIndex === -1) {
          throw new Error("Property not found");
        }

        // Update property
        const updatedProperty = {
          ...mockProperties[propertyIndex],
          ...propertyData,
          updatedAt: new Date().toISOString(),
        };

        // In a real app, we would update the mock data
        // mockProperties[propertyIndex] = updatedProperty;

        return updatedProperty;
      }

      // Real API call
      const response = await api.patch(`/properties/${id}`, propertyData);
      return response.data;
    },

    delete: async (id: string) => {
      if (useMockData) {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Find property in mock data
        const propertyIndex = mockProperties.findIndex(
          (p: Property) => p.id === id
        );

        if (propertyIndex === -1) {
          throw new Error("Property not found");
        }

        // In a real app, we would remove from the mock data
        // mockProperties.splice(propertyIndex, 1);

        return { success: true };
      }

      // Real API call
      await api.delete(`/properties/${id}`);
      return { success: true };
    },
  },

  // Reports endpoints
  reports: {
    getByPropertyId: async (propertyId: string) => {
      if (useMockData) {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Find property in mock data
        const property = mockProperties.find(
          (p: Property) => p.id === propertyId
        );

        if (!property) {
          throw new Error("Property not found");
        }

        // Generate mock reports
        const mockReports = [
          {
            id: "1",
            propertyId,
            title: "Home Inspection Report",
            reportType: "inspection",
            description:
              "Comprehensive inspection of the property structure, systems, and components.",
            creator: {
              id: "2",
              name: "Inspector Joe",
            },
            price: 49.99,
            createdAt: "2024-12-15T00:00:00.000Z",
            isVerified: true,
            purchased: false,
          },
          {
            id: "2",
            propertyId,
            title: "Title History",
            reportType: "title",
            description:
              "Complete ownership history and title status verification.",
            creator: {
              id: "3",
              name: "Title Company Inc.",
            },
            price: 29.99,
            createdAt: "2024-12-10T00:00:00.000Z",
            isVerified: true,
            purchased: false,
          },
          {
            id: "3",
            propertyId,
            title: "Renovation Records",
            reportType: "renovation",
            description:
              "Detailed records of all major renovations and improvements.",
            creator: {
              id: "4",
              name: "Previous Owner",
            },
            price: 19.99,
            createdAt: "2024-11-28T00:00:00.000Z",
            isVerified: true,
            purchased: false,
          },
        ];

        return mockReports;
      }

      // Real API call
      const response = await api.get(`/reports?propertyId=${propertyId}`);
      return response.data;
    },

    purchase: async (reportId: string, paymentData: any) => {
      if (useMockData) {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        return {
          id: "1",
          reportId,
          user: {
            id: "1",
            name: "Mock User",
          },
          amount: 49.99,
          paymentMethod: paymentData.paymentMethod,
          transactionHash:
            paymentData.transactionHash || "mock-transaction-hash",
          createdAt: new Date().toISOString(),
        };
      }

      // Real API call
      const response = await api.post(
        `/reports/${reportId}/purchase`,
        paymentData
      );
      return response.data;
    },

    getContent: async (reportId: string) => {
      if (useMockData) {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        return {
          content:
            "This is a mock report content. In a real application, this would be the actual report content or a link to download the report.",
          contentType: "text/plain",
        };
      }

      // Real API call
      const response = await api.get(`/reports/${reportId}/content`);
      return response.data;
    },
  },
};

export default apiService;
