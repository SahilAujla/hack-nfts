import fs from 'fs'

// Read json file
let json = fs.readFileSync('metadata2.json');
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

finalNFTs.sort((a,b)=>{
    return a.traits - b.traits;
})

console.log(finalNFTs.slice(0,20));


