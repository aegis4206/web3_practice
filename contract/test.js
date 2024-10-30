const { Web3 } = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));


// const _from = web3.eth.accounts[0];
// const _from = "0x83f6d0d155743f5bf1b4dfb08cbceb1e4b389ff7";
let _from;
const _to = "0xfAd726F17080F4B05d89E0514D33e58282a9ca47";

const _value = 5000000000000000000;

async function checkAccounts() {
    const accounts = await web3.eth.getAccounts();
    if (accounts.length > 0) {
        _from = accounts[0];
        sendTransaction();
    } else {
        console.log('No accounts found.');
    }
}

checkAccounts();

const sendTransaction = () => {
    web3.eth.sendTransaction({ from: _from, to: _to, value: _value },
        (err, res) => {
            if (err)
                console.log(err);
            else
                console.log(res);
        }
    )
}
