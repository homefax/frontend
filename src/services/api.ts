import { USE_MOCK_DATA, API_BASE_URL } from "../config";
// Import mock data
// We need to use require instead of import to avoid TypeScript errors
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { mockProperties } = require("./mockData");

// Define the Property interface here to avoid import issues
export interface Property {
  id: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  yearBuilt: number;
  totalReports: number;
  imageUrl: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  description: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

// Simple fetch wrapper
const fetchAPI = async (url: string, options?: RequestInit) => {
  const response = await fetch(`${API_BASE_URL}${url}`, options);
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  return response.json();
};

// API service functions
export const apiService = {
  // Auth endpoints
  auth: {
    login: async (email: string, password: string) => {
      if (USE_MOCK_DATA) {
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
      const data = await fetchAPI("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      localStorage.setItem("token", data.access_token);
      return data;
    },

    register: async (userData: any) => {
      if (USE_MOCK_DATA) {
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
      const data = await fetchAPI("/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      localStorage.setItem("token", data.access_token);
      return data;
    },

    loginWithGmail: async () => {
      if (USE_MOCK_DATA) {
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
      if (USE_MOCK_DATA) {
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
      const data = await fetchAPI("/auth/wallet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ walletAddress }),
      });
      localStorage.setItem("token", data.access_token);
      return data;
    },

    logout: () => {
      localStorage.removeItem("token");
    },

    getProfile: async () => {
      if (USE_MOCK_DATA) {
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
      const token = localStorage.getItem("token");
      return fetchAPI("/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
  },

  // Properties endpoints
  properties: {
    getAll: async (params?: any) => {
      if (USE_MOCK_DATA) {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Apply filters if provided
        let filteredProperties = [...mockProperties];

        if (params?.search) {
          const search = params.search.toLowerCase();
          filteredProperties = filteredProperties.filter(
            (property: Property) =>
              property.address.toLowerCase().includes(search) ||
              property.city.toLowerCase().includes(search) ||
              property.zipCode.includes(search)
          );
        }

        if (params?.state) {
          filteredProperties = filteredProperties.filter(
            (property: Property) => property.state === params.state
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
      const queryParams = new URLSearchParams();
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value) queryParams.append(key, String(value));
        });
      }
      return fetchAPI(`/properties?${queryParams.toString()}`);
    },

    getById: async (id: string) => {
      if (USE_MOCK_DATA) {
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
      return fetchAPI(`/properties/${id}`);
    },

    create: async (propertyData: Partial<Property>) => {
      if (USE_MOCK_DATA) {
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
      const token = localStorage.getItem("token");
      return fetchAPI("/properties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(propertyData),
      });
    },

    update: async (id: string, propertyData: Partial<Property>) => {
      if (USE_MOCK_DATA) {
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
      const token = localStorage.getItem("token");
      return fetchAPI(`/properties/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(propertyData),
      });
    },

    delete: async (id: string) => {
      if (USE_MOCK_DATA) {
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
      const token = localStorage.getItem("token");
      await fetchAPI(`/properties/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      return { success: true };
    },
  },

  // Reports endpoints
  reports: {
    getByPropertyId: async (propertyId: string) => {
      if (USE_MOCK_DATA) {
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
      const token = localStorage.getItem("token");
      return fetchAPI(`/reports?propertyId=${propertyId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },

    purchase: async (reportId: string, paymentData: any) => {
      if (USE_MOCK_DATA) {
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
      const token = localStorage.getItem("token");
      return fetchAPI(`/reports/${reportId}/purchase`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(paymentData),
      });
    },

    getContent: async (reportId: string) => {
      if (USE_MOCK_DATA) {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        return {
          content:
            "This is a mock report content. In a real application, this would be the actual report content or a link to download the report.",
          contentType: "text/plain",
        };
      }

      // Real API call
      const token = localStorage.getItem("token");
      return fetchAPI(`/reports/${reportId}/content`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
  },
};

export default apiService;
