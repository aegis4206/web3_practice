const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

const abi = JSON.parse(`[
  {
    "inputs": [
      {
        "internalType": "string[]",
        "name": "candidateListName",
        "type": "string[]"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "candidateList",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "candidateName",
        "type": "string"
      }
    ],
    "name": "totalVotesFor",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "candidateName",
        "type": "string"
      }
    ],
    "name": "vote",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "name": "votesReceived",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]`);
const contractAddress = "0xB50487e04675AdDa9619072e0875Db7E65dD0391";
const contract = new web3.eth.Contract(abi, contractAddress)
// const votingContract = web3.eth.contract(abi);
// const contractInstance = votingContract.at(contractAddress);

const candidates = {
	Alice: "candidate-1",
	Bob: "candidate-2",
	Cary: "candidate-3"
}

$(document).ready(() => {
	handleGetTotal();
});

const handleGetTotal = async () => {
	const candidateList = Object.keys(candidates);
	candidateList.forEach(async (candidate) => {
		const count = await contract.methods.totalVotesFor(candidate).call();
		$("#" + candidates[candidate]).html(count.toString())
	})
}

const handleVote = async (candidate) => {
	const accounts = await web3.eth.getAccounts();
	const account = accounts[0];
	contract.methods.vote(candidate).send({
		from: account
	}).then((res) => {
		console.log(res);
		handleGetTotal();
	}).catch((err) => { console.log(err) });

}

$("button").click((event) => {
	console.log($(event.target).attr('id'));
	handleVote($(event.target).attr('id'));
})