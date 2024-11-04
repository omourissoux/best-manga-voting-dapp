export const CONTRACT_ADDRESS = "YOUR_CONTRACT_ADDRESS";
export const CONTRACT_ABI = [
  "function addProposal(string memory _name) external",
  "function setVotingStatus(bool _isOpen) external",
  "function vote(uint256 _proposalId, uint256 _amount) external",
  "function getProposal(uint256 _proposalId) external view returns (string memory name, uint256 voteCount)",
  "function votingOpen() external view returns (bool)",
  "function proposalCount() external view returns (uint256)",
  "function owner() external view returns (address)",
  "event ProposalAdded(uint256 indexed proposalId, string name)",
  "event Voted(address indexed voter, uint256 indexed proposalId, uint256 amount)",
  "event VotingStatusChanged(bool isOpen)"
];