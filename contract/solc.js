const fs = require('fs');
const solc = require('solc');

const contractPath = './Voting.sol';
const source = fs.readFileSync(contractPath, 'utf8');

const input = {
    language: 'Solidity',
    sources: {
        'Voting.sol': {
            content: source,
        },
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['abi', 'evm.bytecode'],
            },
        },
        evmVersion: 'london',
    },
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));

const abi = output.contracts['Voting.sol']['Voting'].abi;
const bytecode = output.contracts['Voting.sol']['Voting'].evm.bytecode.object;

fs.writeFileSync('VotingABI.json', JSON.stringify(abi, null, 2));
fs.writeFileSync('VotingBytecode.txt', bytecode);

console.log('ABI and Bytecode have been saved!');
