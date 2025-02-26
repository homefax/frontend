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

// Mock data for properties
export const mockProperties: Property[] = [
  {
    id: "1",
    address: "123 Blockchain Street",
    city: "Crypto City",
    state: "CA",
    zipCode: "94105",
    yearBuilt: 2005,
    totalReports: 3,
    imageUrl:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    price: 750000,
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 2100,
    description:
      "Beautiful home in a quiet neighborhood with modern amenities and recent renovations.",
    isVerified: true,
    createdAt: "2025-01-15T00:00:00.000Z",
    updatedAt: "2025-02-10T00:00:00.000Z",
  },
  {
    id: "2",
    address: "456 Ethereum Avenue",
    city: "Blockchain Heights",
    state: "NY",
    zipCode: "10001",
    yearBuilt: 1998,
    totalReports: 5,
    imageUrl:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    price: 1250000,
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: 2800,
    description:
      "Spacious family home with large backyard and updated kitchen.",
    isVerified: true,
    createdAt: "2025-01-10T00:00:00.000Z",
    updatedAt: "2025-02-05T00:00:00.000Z",
  },
  {
    id: "3",
    address: "789 Bitcoin Boulevard",
    city: "DeFi District",
    state: "TX",
    zipCode: "75001",
    yearBuilt: 2015,
    totalReports: 2,
    imageUrl:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    price: 550000,
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 1800,
    description:
      "Modern townhouse with smart home features and energy-efficient design.",
    isVerified: false,
    createdAt: "2025-01-20T00:00:00.000Z",
    updatedAt: "2025-01-20T00:00:00.000Z",
  },
  {
    id: "4",
    address: "101 NFT Lane",
    city: "Metaverse City",
    state: "CA",
    zipCode: "90210",
    yearBuilt: 1985,
    totalReports: 7,
    imageUrl:
      "https://images.unsplash.com/photo-1576941089067-2de3c901e126?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    price: 895000,
    bedrooms: 5,
    bathrooms: 3,
    squareFeet: 3200,
    description:
      "Classic California home with pool and recently renovated interior.",
    isVerified: true,
    createdAt: "2024-12-05T00:00:00.000Z",
    updatedAt: "2025-01-15T00:00:00.000Z",
  },
  {
    id: "5",
    address: "202 Smart Contract Court",
    city: "Token Town",
    state: "WA",
    zipCode: "98101",
    yearBuilt: 2020,
    totalReports: 1,
    imageUrl:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    price: 1100000,
    bedrooms: 4,
    bathrooms: 3.5,
    squareFeet: 2600,
    description:
      "Newly built luxury home with high-end finishes and mountain views.",
    isVerified: true,
    createdAt: "2025-01-25T00:00:00.000Z",
    updatedAt: "2025-02-15T00:00:00.000Z",
  },
  {
    id: "6",
    address: "303 Wallet Way",
    city: "Crypto City",
    state: "CA",
    zipCode: "94107",
    yearBuilt: 2000,
    totalReports: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    price: 680000,
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 1950,
    description: "Charming home with character in a desirable neighborhood.",
    isVerified: false,
    createdAt: "2025-01-05T00:00:00.000Z",
    updatedAt: "2025-02-01T00:00:00.000Z",
  },
];
