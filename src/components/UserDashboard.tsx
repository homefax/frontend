import { useState } from "react";

// Mock data for demonstration
const mockAccounts = [
    {
        networkName: "Ethereum",
        address: "0x1234567890abcdef1234567890abcdef12345678"
    },
    {
        networkName: "Base",
        address: "0xabcdef1234567890abcdef1234567890abcdef12"
    }
];

const mockPortfolio = {
    totalValue: "$1,234.56",
    assets: [
        {
            name: "Ethereum",
            symbol: "ETH",
            balance: "0.5",
            value: "$900.00"
        },
        {
            name: "USD Coin",
            symbol: "USDC",
            balance: "334.56",
            value: "$334.56"
        }
    ]
};

interface UserDashboardProps {
    userAddress?: string;
}

export function UserDashboard({ userAddress = "0x1234...5678" }: UserDashboardProps) {
    const [accounts] = useState(mockAccounts);
    const [portfolio] = useState(mockPortfolio);

    return (
        <div className="user-dashboard">
            <h2>Welcome {userAddress}</h2>
            
            <h3>Your Accounts:</h3>
            {accounts.length > 0 ? (
                accounts.map((account, index) => (
                    <div key={index} className="account-card">
                        <p><strong>Network:</strong> {account.networkName}</p>
                        <p><strong>Address:</strong> {account.address}</p>
                    </div>
                ))
            ) : (
                <p>No accounts found</p>
            )}

            <h3>Portfolio:</h3>
            {portfolio ? (
                <pre className="portfolio-data">{JSON.stringify(portfolio, null, 2)}</pre>
            ) : (
                <p>No portfolio data available</p>
            )}
        </div>
    );
}

export default UserDashboard;