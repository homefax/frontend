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

        // Generate different mock reports based on the report ID
        let content = "";
        let contentType = "text/plain";

        // Home Inspection Report
        if (reportId === "1") {
          content = `
# HomeFax Property Inspection Report

**Property Address:** 123 Main Street, Denver, CO 80202
**Inspection Date:** February 15, 2025
**Inspector:** Joe Smith, Certified Home Inspector #12345

## Executive Summary

This property is in overall good condition with some minor issues noted. The home was built in 1998 and has been well-maintained. The roof was replaced in 2020, and the HVAC system was updated in 2022.

### Key Findings:
- **Foundation**: Solid, no major cracks or settling issues
- **Roof**: Excellent condition, recently replaced (5-year warranty remaining)
- **Electrical**: Up to code, 200 amp service
- **Plumbing**: Good condition, copper pipes throughout
- **HVAC**: High-efficiency system installed in 2022
- **Appliances**: All in working order, refrigerator is 2 years old

## Areas of Concern

1. **Minor water damage** in the basement corner near the utility room. Recommend further evaluation by a waterproofing specialist.
2. **Garage door opener** is functioning but making unusual noise. May need servicing soon.
3. **Deck railings** show signs of weathering and should be treated or replaced within the next year.

## Blockchain Verification

This report has been verified on the Ethereum blockchain with transaction hash:
0x7f9e8f7e6b5a4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8

## Recommendations

1. Address water damage in basement
2. Service garage door opener
3. Treat or replace deck railings
4. Consider updating bathroom fixtures (cosmetic only)

---

This report is provided as a general assessment of the property's condition at the time of inspection. HomeFax recommends addressing all issues marked as concerns and consulting with specialized contractors for detailed evaluations where noted.
`;
        }
        // Title History Report
        else if (reportId === "2") {
          content = `
# HomeFax Title History Report

**Property Address:** 123 Main Street, Denver, CO 80202
**Report Generated:** February 20, 2025
**Report ID:** THR-2025-02-20-7842

## Ownership History

| Owner | Purchase Date | Sale Date | Purchase Price | Notes |
|-------|--------------|-----------|----------------|-------|
| Smith Family Trust | 01/15/2020 | Present | $425,000 | Current owner |
| Johnson, Robert & Mary | 06/10/2010 | 01/15/2020 | $310,000 | No liens or encumbrances |
| Denver Properties LLC | 03/22/2005 | 06/10/2010 | $245,000 | Commercial to residential conversion |
| Commercial Holdings Inc. | 11/05/1998 | 03/22/2005 | $180,000 | Original construction |

## Title Status

**Current Status:** Clear
**Last Title Search:** February 18, 2025
**Title Insurance:** Available

## Liens & Encumbrances

No active liens or encumbrances found on this property.

### Historical Liens (Resolved)
- Construction lien filed 04/15/2006, resolved 07/22/2006
- Property tax lien filed 11/30/2008, resolved 02/15/2009

## Easements & Rights of Way

- Utility easement along the north property line (5 feet)
- Shared driveway agreement with neighboring property (123B Main Street)

## Blockchain Verification

This title history has been verified on the Ethereum blockchain with transaction hash:
0x8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b

## Legal Description

Lot 7, Block 12, Denver Heights Subdivision, City of Denver, County of Denver, State of Colorado, according to the recorded plat thereof.

---

This report provides a comprehensive history of the property's ownership and title status. All information has been verified through public records and blockchain technology. HomeFax guarantees the accuracy of this information as of the report generation date.
`;
        }
        // Renovation Records Report
        else if (reportId === "3") {
          content = `
# HomeFax Renovation History Report

**Property Address:** 123 Main Street, Denver, CO 80202
**Report Generated:** February 25, 2025
**Report ID:** RHR-2025-02-25-3921

## Major Renovations

### Kitchen Remodel (2021)
- **Contractor:** Mountain View Kitchens
- **Permit #:** DEN-2021-05-1234
- **Cost:** $45,000
- **Scope:** Complete kitchen renovation including new cabinets, countertops, appliances, flooring, and lighting
- **Verified:** Yes (Building inspection passed 07/15/2021)

### Bathroom Upgrades (2022)
- **Contractor:** Luxury Bath Systems
- **Permit #:** DEN-2022-03-5678
- **Cost:** $28,000
- **Scope:** Master bathroom and guest bathroom renovation with new fixtures, tile work, and ventilation
- **Verified:** Yes (Building inspection passed 05/10/2022)

### Basement Finishing (2023)
- **Contractor:** Homeowner (DIY with licensed electrical and plumbing)
- **Permit #:** DEN-2023-01-9012
- **Cost:** $32,000
- **Scope:** Conversion of unfinished basement to recreation room, home office, and 3/4 bathroom
- **Verified:** Yes (Building inspection passed 04/22/2023)

## Minor Improvements

1. **Exterior Painting** (2020) - $8,500
2. **Deck Replacement** (2021) - $12,000
3. **Smart Home System Installation** (2022) - $5,500
4. **Landscaping & Irrigation System** (2023) - $15,000
5. **Energy-Efficient Window Replacement** (2024) - $22,000

## Energy Efficiency Upgrades

- Solar panel installation (2022) - 5.8 kW system
- Attic insulation upgrade to R-60 (2021)
- Smart thermostat installation (2022)
- LED lighting throughout (2021-2022)

## Blockchain Verification

This renovation history has been verified on the Ethereum blockchain with transaction hash:
0x9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e

## Warranty Information

- Kitchen appliances: Manufacturer warranty valid until 06/15/2026
- Bathroom fixtures: Manufacturer warranty valid until 04/10/2027
- Solar panels: 25-year warranty valid until 05/20/2047
- Windows: Lifetime warranty (transferable to new owners)

---

This report documents all major renovations and improvements made to the property. All information has been verified through building permits, contractor records, and blockchain technology. HomeFax guarantees the accuracy of this information as of the report generation date.
`;
        }
        // Default report for any other ID
        else {
          content = `
# HomeFax Property Report

**Property Address:** 123 Main Street, Denver, CO 80202
**Report Generated:** February 28, 2025
**Report ID:** PR-2025-02-28-${Math.floor(Math.random() * 10000)}

## Property Overview

This report contains detailed information about the property, including its history, condition, and relevant documentation. The information has been verified using blockchain technology to ensure accuracy and immutability.

### Key Information
- **Year Built:** 1998
- **Square Footage:** 2,450
- **Lot Size:** 0.25 acres
- **Zoning:** Residential (R-1)
- **Last Sale Date:** January 15, 2020
- **Last Sale Price:** $425,000

## Blockchain Verification

This report has been verified on the Ethereum blockchain with transaction hash:
0x${Array(64)
            .fill(0)
            .map(() => Math.floor(Math.random() * 16).toString(16))
            .join("")}

---

This is a sample report generated for demonstration purposes. In a production environment, this would contain comprehensive property information verified through blockchain technology.
`;
        }

        return {
          content,
          contentType: "text/plain",
        };
      }

      // Real API call
      const token = localStorage.getItem("token");
      const response = await fetchAPI(
        `/blockchain/report/${reportId}/content`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // If the response contains base64 content, decode it
      if (response.content && typeof response.content === "string") {
        try {
          // Convert base64 to string
          const decodedContent = atob(response.content);
          return {
            content: decodedContent,
            contentType: response.contentType || "application/json",
          };
        } catch (error) {
          console.error("Error decoding base64 content:", error);
          return response;
        }
      }

      return response;
    },
  },

  // Blockchain endpoints
  blockchain: {
    createProperty: async (propertyData: {
      propertyAddress: string;
      city: string;
      state: string;
      zipCode: string;
    }) => {
      if (USE_MOCK_DATA) {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        return {
          success: true,
          propertyId: Math.floor(Math.random() * 1000) + 1,
          message: "Property created successfully on the blockchain",
        };
      }

      // Real API call
      const token = localStorage.getItem("token");
      return fetchAPI("/blockchain/property", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(propertyData),
      });
    },

    createReport: async (reportData: {
      propertyId: number;
      reportType: string;
      reportContent: string;
      authorAddress: string;
      ownerAddress: string;
      price: string;
    }) => {
      if (USE_MOCK_DATA) {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        return {
          success: true,
          reportId: Math.floor(Math.random() * 1000) + 1,
          message: "Report created successfully on the blockchain",
          author: reportData.authorAddress,
          owner: reportData.ownerAddress,
        };
      }

      // Real API call
      const token = localStorage.getItem("token");
      return fetchAPI("/blockchain/report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(reportData),
      });
    },

    purchaseReport: async (reportId: number, price: string) => {
      if (USE_MOCK_DATA) {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        return {
          success: true,
          message: "Report purchased successfully on the blockchain",
        };
      }

      // Real API call
      const token = localStorage.getItem("token");
      return fetchAPI(`/blockchain/report/${reportId}/purchase`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ price }),
      });
    },

    getProperty: async (propertyId: number) => {
      if (USE_MOCK_DATA) {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        return {
          success: true,
          property: {
            id: propertyId,
            propertyAddress: "123 Blockchain Street",
            city: "Crypto City",
            state: "CA",
            zipCode: "94105",
            owner: "0x1234567890abcdef1234567890abcdef12345678",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            isVerified: true,
          },
        };
      }

      // Real API call
      const token = localStorage.getItem("token");
      return fetchAPI(`/blockchain/property/${propertyId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },

    getReport: async (reportId: number) => {
      if (USE_MOCK_DATA) {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        return {
          success: true,
          report: {
            id: reportId,
            propertyId: 1,
            reportType: "inspection",
            reportHash: "QmXzYgaP5L9Eqhwgy5ygEwNnfPkqvVeHsAjWBfM4E1KHEv",
            creator: "0x1234567890abcdef1234567890abcdef12345678",
            price: "0.1",
            createdAt: new Date().toISOString(),
            isVerified: true,
          },
        };
      }

      // Real API call
      const token = localStorage.getItem("token");
      return fetchAPI(`/blockchain/report/${reportId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },

    getUserProperties: async () => {
      if (USE_MOCK_DATA) {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        return {
          success: true,
          propertyIds: [1, 2, 3],
        };
      }

      // Real API call
      const token = localStorage.getItem("token");
      return fetchAPI("/blockchain/user/properties", {
        headers: { Authorization: `Bearer ${token}` },
      });
    },

    getPropertyReports: async (propertyId: number) => {
      if (USE_MOCK_DATA) {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        return {
          success: true,
          reportIds: [1, 2, 3],
        };
      }

      // Real API call
      const token = localStorage.getItem("token");
      return fetchAPI(`/blockchain/property/${propertyId}/reports`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
  },
};

export default apiService;
