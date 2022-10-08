import fetch from 'node-fetch';
// const fs = require('fs');
import fs from 'fs'


const fetchMetaData = async (i) => {

    let obj = {};

    // const baseUrl = "https://ipfs.io/ipfs/bafybeihpjhkeuiq3k6nqa3fkgeigeri7iebtrsuyuey5y6vy36n345xmbi/" + i;

    // const baseUrl = "https://gateway.pinata.cloud/ipfs/Qmdu6QgAMJqiwRcGGMadPMkkdSCDv6NoQG2neTN8fYirN9/" + i;
    // // console.log(baseUrl,"DFADSFADS");

    const baseUrl = "https://cloudflare-ipfs.com/ipfs/Qmdu6QgAMJqiwRcGGMadPMkkdSCDv6NoQG2neTN8fYirN9/" + i


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

    for (let i = 1301; i <= 5500; i++) {
        let obj = await fetchMetaData(i);
        console.log("OBJ -: ", i, obj);
        metadataList.push(obj);
    }

    // save to file
    fs.writeFileSync('metadata3.json', JSON.stringify(metadataList));

    console.timeEnd('codezup')


}

// main()