import fetch from 'node-fetch';
// const fs = require('fs');
import fs from 'fs'


const randomNumber = () => {
    // create random number between 0 and 1
    var min = 1;
    var max = 10;

    var diff = max - min; // return 5
    // console.log(`Difference between ${max} and ${min} is:`, diff);

    // Math.floor() function returns the largest integer less than or equal to a given number

    var randomNumber = Math.random(); // function returns integers between from 0 -> 1 [ex: 0.001,0.2]
    // console.log("Random Number:", randomNumber);

    // Return number in specific range
    var randomNumnerInRange = Math.floor(randomNumber * diff + min);

    // if (randomNumber > 0.5) return 1
    // else return 0


    // console.log(randomNumnerInRange);
    return randomNumnerInRange;
}

// console.log(randomNumber());

const fetchMetaData = async (i) => {

    let obj = {};

    // const baseUrl = "https://ipfs.io/ipfs/bafybeihpjhkeuiq3k6nqa3fkgeigeri7iebtrsuyuey5y6vy36n345xmbi/" + i;

    // const baseUrl = "https://gateway.pinata.cloud/ipfs/Qmdu6QgAMJqiwRcGGMadPMkkdSCDv6NoQG2neTN8fYirN9/" + i;
    // console.log(baseUrl,"DFADSFADS");

    const baseUrls = [
        "https://cloudflare-ipfs.com/ipfs/Qmdu6QgAMJqiwRcGGMadPMkkdSCDv6NoQG2neTN8fYirN9/",
        "https://gateway.pinata.cloud/ipfs/Qmdu6QgAMJqiwRcGGMadPMkkdSCDv6NoQG2neTN8fYirN9/",
        "https://ipfs.fleek.co/ipfs/Qmdu6QgAMJqiwRcGGMadPMkkdSCDv6NoQG2neTN8fYirN9/",
        "https://gateway.ipfs.io/ipfs/Qmdu6QgAMJqiwRcGGMadPMkkdSCDv6NoQG2neTN8fYirN9/",
        "https://via0.com/ipfs/Qmdu6QgAMJqiwRcGGMadPMkkdSCDv6NoQG2neTN8fYirN9/",
        "https://ipfs.smartholdem.io/ipfs/Qmdu6QgAMJqiwRcGGMadPMkkdSCDv6NoQG2neTN8fYirN9/",
        "https://bafybeihhf3zmdzulp5jhsc5pj463dbfuippnprdy4irjz3rijiqlf76uay.ipfs.cf-ipfs.com/",
        "https://bafybeihhf3zmdzulp5jhsc5pj463dbfuippnprdy4irjz3rijiqlf76uay.ipfs.nftstorage.link/",
        "https://bafybeihhf3zmdzulp5jhsc5pj463dbfuippnprdy4irjz3rijiqlf76uay.ipfs.storry.tv/",
        "https://crustwebsites.net/ipfs/Qmdu6QgAMJqiwRcGGMadPMkkdSCDv6NoQG2neTN8fYirN9/"
    ]


    let baseUrl = baseUrls[i % 10] + i;

    try {
        const response = await fetch(baseUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        // console.log("RESPONSE", response);
        const data = await response.json();
        // console.log("DATA", data);
        obj = {
            name: data.name ? data.name : "No Name",
            description: data.description ? data.description : "No Description",
            attributes: data.attributes ? data.attributes : "No Attributes",
        }

    }
    catch (error) {
        obj = {
            name: "No Name",
            description: "No Description",
            attributes: "No Attributes",
        }
        console.log("ERROR In Fetching.......", error)
    }
    return obj;
}


const main = async () => {
    console.time('codezup')

    let metadataList = [];

    for (let i = 1200; i <= 5500; i++) {
        let obj = await fetchMetaData(i);
        console.log("OBJ -: ", i, obj);
        metadataList.push(obj);
    }

    // save to file
    fs.writeFileSync('metadata10.json', JSON.stringify(metadataList));

    console.timeEnd('codezup')

}



const findRare = async () => {
    // Read json file
    let json = fs.readFileSync('metadata10.json');
    let metadataList = JSON.parse(json);


    const allUniqueTraits = {};



    // for (let j = 0; j < metadataList[i].attributes.length; j++) {
    //     if (!allUniqueTraits[metadataList[i].attributes[j].trait_type]) {
    //         allUniqueTraits[metadataList[i].attributes[j].trait_type] = 1;
    //     } else {
    //         allUniqueTraits[metadataList[i].attributes[j].trait_type] += 1;
    //     }

    // }
    // }


    for (let i = 0; i < metadataList.length; i++) {
        for (let j = 0; j < metadataList[i].attributes.length; j++) {
            if (!allUniqueTraits[metadataList[i].attributes[j].value]) {
                allUniqueTraits[metadataList[i].attributes[j].value] = 1;
            } else {
                allUniqueTraits[metadataList[i].attributes[j].value] += 1;
            }
        }
    }




    // console.log(allUniqueTraits);



    let totalNFTs = metadataList.length
    let keys = Object.keys(allUniqueTraits);

    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        let value = allUniqueTraits[key];
        let percentage = (value / totalNFTs) * 100;
        allUniqueTraits[key] = percentage;
    }

    // console.log(allUniqueTraits);

    console.log(keys.length)

    const NFTs = [];

    for (let i = 0; i < metadataList.length; i++) {
        const obj = {};
        obj.name = metadataList[i].name;
        obj.traits = [];
        // for (let j = 0; j < metadataList[i].traits.length; j++) {
        //     obj.traits.push(metadataList[i].traits[j].name);
        // }

        for (let j = 0; j < metadataList[i].attributes.length; j++) {
            obj.traits.push(allUniqueTraits[metadataList[i].attributes[j].value]);
        }

        NFTs.push(obj);
    }

    // console.log(NFTs.slice(0, 10));


    const finalNFTs = [];

    for (let i = 0; i < NFTs.length; i++) {
        // console.log(NFTs[i].name);
        // console.log(NFTs[i].traits);
        // console.log('\n');

        // const sum = NFTs[i].traits.reduce((a, b) => a + b, 0);
        let sum = 0;
        let final = 0;
        const obj = {}

        for (let j = 0; j < NFTs[i].traits.length; j++) {
            // NFTs[i].traits[j] = NFTs[i].traits[j] / ;
            sum = sum + NFTs[i].traits[j];
            final = sum / NFTs[i].traits.length;
        }

        obj.name = NFTs[i].name;
        obj.traits = final;

        finalNFTs.push(obj);

    }


    // const sortedNFTs = [];

    finalNFTs.sort((a, b) => {
        return a.traits - b.traits;
    })

    console.log(finalNFTs.slice(0, 20));
}


async function father() {
    await main()
    await findRare()
}

// father()
