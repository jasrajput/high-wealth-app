
import tronWeb from 'tronweb';
import * as solanaWeb3 from "@solana/web3.js";

const rpcUrls = [
    {
        name: 'binancecoin',
        rpcUrl: 'https://bsc-dataseed.binance.org/',
        decimals: 18, // Native token (BNB) uses 18 decimals
    },
    {
        name: 'tether',
        rpcUrl: 'https://bsc-dataseed.binance.org/',
        decimals: 18, // Native token (USDT) uses 18 decimals
    },
    {
        name: 'ethereum',
        rpcUrl: 'https://eth.llamarpc.com',
        decimals: 18, // Native token (ETH) uses 18 decimals
    },
    {
        name: 'matic-network',
        rpcUrl: 'https://polygon.drpc.org',
        decimals: 18, // Native token (MATIC) uses 18 decimals
    },
    {
        name: 'solana',
        rpcUrl: 'https://neon-proxy-mainnet.solana.p2p.org',
        decimals: 9, // Native token (SOL) uses 9 decimals
    },
    {
        name: 'dogecoin',
        rpcUrl: 'https://rpc-us.dogechain.dog',
        decimals: 8, // Native token (DOGE) uses 8 decimals
    },
    {
        name: 'tron',
        rpcUrl: 'https://api.trongrid.io',
        decimals: 6, // Native token (TRX) uses 6 decimals
    },
];


const fetchBalanceEVM = async (walletAddress, rpcUrl, decimals) => {
    const body = JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'eth_getBalance',
        params: [walletAddress, 'latest'],
    });

    try {
        const response = await fetch(rpcUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body,
        });

        const data = await response.json();
        const balance = data.result;

        return balance ? parseInt(balance, 16) / Math.pow(10, decimals) : 0;


    } catch (error) {
        console.error(`EVM Balance Fetch Error:`, error);
        return 0;
    }
};

const fetchBalanceBitcoin = async (walletAddress) => {
    try {
        const response = await fetch(`https://blockchain.info/q/addressbalance/${walletAddress}`);
        const satoshis = await response.text();
        return satoshis / 1e8; // Convert Satoshis to BTC
    } catch (error) {
        console.error(`Bitcoin Balance Fetch Error:`, error);
        return 0;
    }
};

const fetchBalanceDogecoin = async (walletAddress) => {
    try {
        const response = await fetch(`https://dogechain.info/api/v1/address/balance/${walletAddress}`);
        const { balance } = await response.json();
        return parseFloat(balance);
    } catch (error) {
        console.error(`Dogecoin Balance Fetch Error:`, error);
        return 0;
    }
};

const fetchBalanceSolana = async (walletAddress) => {
    try {
        const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl("mainnet-beta"));
        const balance = await connection.getBalance(new solanaWeb3.PublicKey(walletAddress));
        return balance / Math.pow(10, 9); // Convert Lamports to SOL
    } catch (error) {
        console.error(`Solana Balance Fetch Error:`, error);
        return 0;
    }
};

const fetchBalanceTron = async (walletAddress) => {
    try {
        const tronInstance = new tronWeb({
            fullHost: 'https://api.trongrid.io',
        });
        const balance = await tronInstance.trx.getBalance(walletAddress);
        return balance / 1e6;
    } catch (error) {
        console.error(`Tron Balance Fetch Error:`, error);
        return 0;
    }
};


export const fetchBalance = async (tokenName, walletAddress) => {
    const rpcDetails = rpcUrls.find((chain) => chain.name === tokenName);

    switch (tokenName.toLowerCase()) {
        case "ethereum":
            return fetchBalanceEVM(walletAddress, rpcDetails.rpcUrl, rpcDetails.decimals);

        case "binancecoin":
            return fetchBalanceEVM(walletAddress, rpcDetails.rpcUrl, rpcDetails.decimals);

        case "tether":
            return fetchBalanceEVM(walletAddress, rpcDetails.rpcUrl, rpcDetails.decimals);

        case "matic-network":
            return fetchBalanceEVM(walletAddress, rpcDetails.rpcUrl, rpcDetails.decimals);

        case "bitcoin":
            return fetchBalanceBitcoin(walletAddress);

        case "dogecoin":
            return fetchBalanceDogecoin(walletAddress);

        case "solana":
            return fetchBalanceSolana(walletAddress);

        case "tron":
            return fetchBalanceTron(walletAddress);

        default:
            console.error(`Unsupported token: ${tokenName}`);
            return 0;
    }
};