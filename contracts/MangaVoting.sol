// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MangaVoting is Ownable {
    IERC20 public votingToken;
    
    struct Proposal {
        string name;
        uint256 voteCount;
        bool exists;
    }
    
    mapping(uint256 => Proposal) public proposals;
    mapping(address => mapping(uint256 => uint256)) public votes;
    uint256 public proposalCount;
    bool public votingOpen;
    
    event ProposalAdded(uint256 indexed proposalId, string name);
    event Voted(address indexed voter, uint256 indexed proposalId, uint256 amount);
    event VotingStatusChanged(bool isOpen);
    
    constructor(address _votingToken) {
        votingToken = IERC20(_votingToken);
    }
    
    function addProposal(string memory _name) external onlyOwner {
        proposalCount++;
        proposals[proposalCount] = Proposal(_name, 0, true);
        emit ProposalAdded(proposalCount, _name);
    }
    
    function setVotingStatus(bool _isOpen) external onlyOwner {
        votingOpen = _isOpen;
        emit VotingStatusChanged(_isOpen);
    }
    
    function vote(uint256 _proposalId, uint256 _amount) external {
        require(votingOpen, "Voting is not open");
        require(proposals[_proposalId].exists, "Proposal does not exist");
        require(votingToken.balanceOf(msg.sender) >= _amount, "Insufficient token balance");
        
        // Transfer tokens from voter to contract
        require(votingToken.transferFrom(msg.sender, address(this), _amount), "Token transfer failed");
        
        votes[msg.sender][_proposalId] += _amount;
        proposals[_proposalId].voteCount += _amount;
        
        emit Voted(msg.sender, _proposalId, _amount);
    }
    
    function getProposal(uint256 _proposalId) external view returns (string memory name, uint256 voteCount) {
        require(proposals[_proposalId].exists, "Proposal does not exist");
        Proposal memory proposal = proposals[_proposalId];
        return (proposal.name, proposal.voteCount);
    }
}