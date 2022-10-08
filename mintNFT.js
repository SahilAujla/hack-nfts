import { CONTRACT_ADDRESS, CONTRACT_ABI } from "./constants/index.js"
import { ethers, utils } from 'ethers'
import 'dotenv/config'

// console.log(process.env.ALCHEMY_API_KEY_URL)

let provider
let walletWithProvider
let contract

let nftsmintedCountInterval
let nftMintedCount
let brought = false
const rareIds = [114, 116];
let minting = false;

const init = async () => {
    provider = ethers.getDefaultProvider(
        process.env.ALCHEMY_API_KEY_URL,
        {
            chainId: 4,
            name: 'rinkeby',
        })

    walletWithProvider = new ethers.Wallet(
        process.env.WALLET_PRIVATE_KEY,
        provider,
    )

    contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        walletWithProvider,
    )

    nftsmintedCountInterval = setInterval(async () => {
        if (!minting) {
            nftMintedCount = await fetchTotalNFTMinted();
        }
    }, 1 * 1000);
}

const fetchTotalNFTMinted = async () => {
    try {
        nftMintedCount = await contract.totalSupply();

        if (nftMintedCount == 10000 || brought == true) {
            clearInterval(nftsmintedCountInterval);
            console.log("Clearing.............")
            process.exit();
        }
        else {
            await mintNFT();
        }
        // return totalSupply;

    } catch (err) {
        console.error("Error in fetching Total NFT minted", error)
    }
}

// @params rareId -> [] of rare NFTs
const mintNFT = async () => {
    try {
        console.log("NFT MINT COUNT:", parseInt(nftMintedCount))
        if (rareIds.includes(parseInt(nftMintedCount) + 1)) {
            clearInterval(nftsmintedCountInterval);
            console.log("MINTING................")
            minting = true;
            const tx = await contract.mint({ value: utils.parseEther("0.001") })
            await tx.wait();
            console.log("Successfully Minted NFT", parseInt(nftMintedCount) + 1)
            brought = true;
            process.exit();
        }
        else {
            console.log(`Yet ${rareIds} is not available to mint`)
        }
    } catch (error) {
        console.error("error in minting...", error)
    }
}


init()


// Objective: We need to call mint and fetchdata function of our contract every 1 sec
// and when we hit the api (mint our nft) then we need to stop this function