// SPDX-License-Identifier: MIT
pragma solidity >0.7.0;

contract Voting {
    string[] public candidateList;
    mapping(string => uint8) public votesReceived;

    constructor(string[] memory candidateListName) {
        candidateList = candidateListName;
    }

    function validateCandidate(string memory candidateName) internal view returns (bool) {
        for (uint8 i = 0; i < candidateList.length; i++) {
            if (keccak256(bytes(candidateList[i])) == keccak256(bytes(candidateName))) {
                return true;
            }
        }
        return false;
    }

    function vote(string memory candidateName) public {
        require(validateCandidate(candidateName), "Candidate not found");
        votesReceived[candidateName] += 1;
    }

    function totalVotesFor(string memory candidateName) public view returns (uint8) {
        require(validateCandidate(candidateName), "Candidate not found");
        return votesReceived[candidateName];
    }
}
