//This file reads all the text files from the rawChampionsData folder. It defines the translateRawChampionsData function, which is called by uploadPatchData.js and populate.js.

// PLEASE EXECUTE within the root directory of the backend

const championNames = require('../championNames.json'); //championNames is an array filled with dictionaries each containing a Champion's Chinese name and uppercase/lowercase English name
const fs = require('node:fs'); //import the fs module to read text files
const rawChampionsData = [ //create an array with each index holding a txt file. 
    fs.readFileSync(`./rawChampionsData/baron.txt`, 'utf8'),
    fs.readFileSync(`./rawChampionsData/jungle.txt`, 'utf8'),
    fs.readFileSync(`./rawChampionsData/mid.txt`, 'utf8'),
    fs.readFileSync(`./rawChampionsData/bottom.txt`, 'utf8'),
    fs.readFileSync(`./rawChampionsData/support.txt`, 'utf8')
]

//IMPORTANT!!! READ this before autoUpdate
/* Checklist
    1. (optional) update version in frontend constants folder
    2. (optional) update footer's Last updated on (/frontend/src/components/Footer.jsx)
    3. (if new champion introduced) add to frontend constants and backend championNames.json) (https://lolm.qq.com/v2/champions.html)
                                    championAbilities.json
                                    upload new champion icon to assets
*/

const uploadDates = require('../constants.json')["upload_dates"]
const currentDate = uploadDates[uploadDates.length - 1]

const translateRawChampionsData = (currentPatchDate = null) => {
    
    //Make the dictionary hashMap 1 large dictionary with all of championNames.json keys/values (item.key is a champion name in chinese, and item.val is another dictionary)
    const hashMap = new Map()
    championNames.map((item) => {
        hashMap.set(item.key, item.val)
    })

    const lanes = ['baron', 'jungle', 'mid', 'bottom', 'support']
    let translatedData = [] //declare empty array which will eventually hold all the translated data and be returned at the end of the file

    //Determines each champions tier
    const selectRank = (percentile) => {
        if (percentile < 0.05) {
            return "S+"
        } else if (percentile < 0.1) {
            return "S"
        } else if (percentile < 0.2) {
            return "A"
        } else if (percentile < 0.35) {
            return "B"
        } else if (percentile < 0.65) {
            return "C"
        } else if (percentile < 0.8) {
            return "D"
        }
        return "F"
    }

    //If weight a and b are equal, sort by winrate
    function weightCmp(a, b, aWR, bWR) {
        if (a === b) {
            return aWR < bWR ? 1 : -1
        }
        return a < b ? 1 : -1
    }

    for (let i = 0; i < 5; i++) { //create loop to iterate over each txt file
        const dataArr = rawChampionsData[i].toString().trim().split('\n\n').map((champion) => {
            const temp = champion.replaceAll('%', '').split('\n')
            return { //take the first 4 lines (skip 5th line since its rank by winrate) for each champion entry
                label: temp[0],
                winRate: Number(temp[1]),
                pickRate: Number(temp[2]),
                banRate: Number(temp[3])
            }
        })
        let tempTranslatedData = [] //declare empty array to hold the data for 1 itereration (1 txt file)
        for (let j = 0; j < dataArr.length; j++) {
            const champion = dataArr[j]
            if (hashMap.has(champion.label)) {
                const item = hashMap.get(champion.label)
                tempTranslatedData.push({
                    label: item.label,
                    name: item.name,
                    role: i + 1,
                    gameplayData: {
                        winRate: champion.winRate,
                        pickRate: champion.pickRate,
                        banRate: champion.banRate,
                        weight: (champion.winRate - 50) + champion.pickRate * 0.1 + champion.banRate * 0.0667, //1 weight for win rate
                                                                                                              //0.1 weight for pick rate
                                                                                                              //0.067 weight for ban rate
                        date: new Date(currentPatchDate ?? currentDate)
                    }
                })
            }
        }

        //Sort tempTranslatedData by weight/winrate using the weightCmp function defined above, and apply selectRank function to determine tier. 
        tempTranslatedData = tempTranslatedData.sort(function (a, b) {
            return weightCmp(a.gameplayData.weight, b.gameplayData.weight, a.gameplayData.winRate, b.gameplayData.winRate)
        }).map((champion, index) => {
            return {
                label: champion.label,
                name: champion.name,
                role: champion.role,
                gameplayData: {
                    winRate: champion.gameplayData.winRate,
                    banRate: champion.gameplayData.banRate,
                    pickRate: champion.gameplayData.pickRate,
                    weight: champion.gameplayData.weight,
                    tier: selectRank((index + 1) / (tempTranslatedData.length - 1)) + "," + (index + 1) + "/" + (tempTranslatedData.length - 1),
                    date: champion.gameplayData.date
                }
            }
        })
        
        translatedData.push(...tempTranslatedData) //update the translatedData array for each iteration (5 total in this loop, 1 for each txt file) The "..." allows us to put all of the elements from tempTranslatedData into translatedData to keep it as a 1D array.
    }
    return translatedData //return translatedData array that holds the data to create all the Champion objects using the Champion schema in uploadPatchData.js
}

module.exports = translateRawChampionsData

if (require.main === module) {
    console.log("---- Raw Champions Data:", translateRawChampionsData())
    process.exit()
}