import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useWeb3React } from '@web3-react/core';

// Import ABI
import HomeFaxDAOABI from '../abis/HomeFaxDAO.json';
import HomeFaxTokenABI from '../abis/HomeFaxToken.json';

interface Proposal {
  id: string;
  description: string;
  proposer: string;
  status: string;
  forVotes: string;
  againstVotes: string;
  abstainVotes: string;
  deadline: Date;
  executed: boolean;
  eta: Date | null;
}

const DAOGovernance: React.FC = () => {
  const { account, provider } = useWeb3React();
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [tokenBalance, setTokenBalance] = useState<string>('0');
  const [votingPower, setVotingPower] = useState<string>('0');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // DAO contract addresses
  const homeFaxDAOAddress = process.env.REACT_APP_DAO_ADDRESS || '';
  const homeFaxTokenAddress = process.env.REACT_APP_TOKEN_ADDRESS || '';

  useEffect(() => {
    const fetchDAOData = async () => {
      if (!account || !provider) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Get contracts
        const signer = provider.getSigner();
        const daoContract = new ethers.Contract(homeFaxDAOAddress, HomeFaxDAOABI, signer);
        const tokenContract = new ethers.Contract(homeFaxTokenAddress, HomeFaxTokenABI, signer);

        // Get token balance
        const balance = await tokenContract.balanceOf(account);
        setTokenBalance(ethers.utils.formatEther(balance));

        // Get voting power
        const votes = await tokenContract.getVotes(account);
        setVotingPower(ethers.utils.formatEther(votes));

        // Get proposal count
        const proposalCount = await daoContract.proposalCount();
        
        // Fetch proposals
        const fetchedProposals: Proposal[] = [];
        
        for (let i = proposalCount.toNumber(); i > Math.max(0, proposalCount.toNumber() - 10); i--) {
          try {
            const proposalId = await daoContract.proposalIds(i - 1);
            const [
              proposalDetails,
              proposalState,
              proposalVotes
            ] = await Promise.all([
              daoContract.proposals(proposalId),
              daoContract.state(proposalId),
              daoContract.proposalVotes(proposalId)
            ]);

            const description = await daoContract.proposalDescriptions(proposalId);
            
            const stateMap = [
              'Pending',
              'Active',
              'Canceled',
              'Defeated',
              'Succeeded',
              'Queued',
              'Expired',
              'Executed'
            ];

            fetchedProposals.push({
              id: proposalId.toString(),
              description,
              proposer: proposalDetails.proposer,
              status: stateMap[proposalState] || 'Unknown',
              forVotes: ethers.utils.formatEther(proposalVotes.forVotes),
              againstVotes: ethers.utils.formatEther(proposalVotes.againstVotes),
              abstainVotes: ethers.utils.formatEther(proposalVotes.abstainVotes),
              deadline: new Date(proposalDetails.voteEnd.toNumber() * 1000),
              executed: proposalState === 7, // 7 = Executed
              eta: proposalDetails.eta.toNumber() > 0 
                ? new Date(proposalDetails.eta.toNumber() * 1000) 
                : null
            });
          } catch (err) {
            console.error(`Error fetching proposal ${i}:`, err);
          }
        }

        setProposals(fetchedProposals);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching DAO data:', err);
        setError('Failed to load DAO data. Please try again later.');
        setLoading(false);
      }
    };

    fetchDAOData();
  }, [account, provider, homeFaxDAOAddress, homeFaxTokenAddress]);

  const handleVote = async (proposalId: string, support: number) => {
    if (!account || !provider) {
      setError('Please connect your wallet to vote');
      return;
    }

    try {
      const signer = provider.getSigner();
      const daoContract = new ethers.Contract(homeFaxDAOAddress, HomeFaxDAOABI, signer);

      const tx = await daoContract.castVote(proposalId, support);
      await tx.wait();

      // Refresh proposals
      window.location.reload();
    } catch (err) {
      console.error('Error voting:', err);
      setError('Failed to cast vote. Please try again.');
    }
  };

  const handleDelegate = async () => {
    if (!account || !provider) {
      setError('Please connect your wallet to delegate');
      return;
    }

    try {
      const signer = provider.getSigner();
      const tokenContract = new ethers.Contract(homeFaxTokenAddress, HomeFaxTokenABI, signer);

      const tx = await tokenContract.delegate(account);
      await tx.wait();

      // Refresh voting power
      const votes = await tokenContract.getVotes(account);
      setVotingPower(ethers.utils.formatEther(votes));
    } catch (err) {
      console.error('Error delegating:', err);
      setError('Failed to delegate voting power. Please try again.');
    }
  };

  if (loading) {
    return <div className="text-center p-4">Loading DAO data...</div>;
  }

  if (!account) {
    return (
      <div className="text-center p-4">
        Please connect your wallet to interact with the DAO
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">HomeFax DAO Governance</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="bg-gray-100 p-4 rounded mb-6">
        <h2 className="text-xl font-semibold mb-2">Your DAO Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-3 rounded shadow">
            <div className="text-gray-600">HFX Balance</div>
            <div className="text-xl font-bold">{parseFloat(tokenBalance).toLocaleString()} HFX</div>
          </div>
          <div className="bg-white p-3 rounded shadow">
            <div className="text-gray-600">Voting Power</div>
            <div className="text-xl font-bold">{parseFloat(votingPower).toLocaleString()} Votes</div>
          </div>
          <div className="bg-white p-3 rounded shadow flex items-center justify-between">
            <div>
              <div className="text-gray-600">Delegate Votes</div>
              <div className="text-sm">Delegate to yourself to activate voting power</div>
            </div>
            <button 
              onClick={handleDelegate}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
            >
              Delegate
            </button>
          </div>
        </div>
      </div>
      
      <h2 className="text-xl font-semibold mb-4">Active Proposals</h2>
      
      {proposals.length === 0 ? (
        <div className="text-center p-4 bg-gray-50 rounded">
          No proposals found
        </div>
      ) : (
        <div className="space-y-4">
          {proposals.map((proposal) => (
            <div key={proposal.id} className="border rounded p-4 bg-white shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-medium">{proposal.description.split('\n')[0]}</h3>
                <span className={`px-2 py-1 rounded text-sm ${
                  proposal.status === 'Active' ? 'bg-green-100 text-green-800' :
                  proposal.status === 'Executed' ? 'bg-blue-100 text-blue-800' :
                  proposal.status === 'Succeeded' ? 'bg-purple-100 text-purple-800' :
                  proposal.status === 'Defeated' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {proposal.status}
                </span>
              </div>
              
              <div className="text-sm text-gray-500 mb-3">
                Proposal ID: {proposal.id.substring(0, 8)}...{proposal.id.substring(proposal.id.length - 6)}
              </div>
              
              <div className="mb-4">
                <div className="text-sm font-medium text-gray-700 mb-1">Votes</div>
                <div className="flex space-x-4">
                  <div>
                    <span className="text-green-600 font-medium">{parseFloat(proposal.forVotes).toLocaleString()}</span> For
                  </div>
                  <div>
                    <span className="text-red-600 font-medium">{parseFloat(proposal.againstVotes).toLocaleString()}</span> Against
                  </div>
                  <div>
                    <span className="text-gray-600 font-medium">{parseFloat(proposal.abstainVotes).toLocaleString()}</span> Abstain
                  </div>
                </div>
              </div>
              
              {proposal.status === 'Active' && (
                <div className="flex space-x-2 mt-3">
                  <button 
                    onClick={() => handleVote(proposal.id, 1)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                  >
                    Vote For
                  </button>
                  <button 
                    onClick={() => handleVote(proposal.id, 0)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                  >
                    Vote Against
                  </button>
                  <button 
                    onClick={() => handleVote(proposal.id, 2)}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                  >
                    Abstain
                  </button>
                </div>
              )}
              
              <div className="mt-3 text-sm text-gray-600">
                {proposal.status === 'Active' && (
                  <div>Voting ends: {proposal.deadline.toLocaleString()}</div>
                )}
                {proposal.eta && (
                  <div>Execution time: {proposal.eta.toLocaleString()}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DAOGovernance;