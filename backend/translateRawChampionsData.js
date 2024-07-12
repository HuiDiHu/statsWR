const championNames = require('./championNames.json');
const fs = require('node:fs');
const rawChampionsData = [
    fs.readFileSync(`./rawChampionsData/baron.txt`, 'utf8'),
    fs.readFileSync(`./rawChampionsData/jungle.txt`, 'utf8'),
    fs.readFileSync(`./rawChampionsData/mid.txt`, 'utf8'),
    fs.readFileSync(`./rawChampionsData/bottom.txt`, 'utf8'),
    fs.readFileSync(`./rawChampionsData/support.txt`, 'utf8')
]

//IMPORTANT!!! READ this before populate or uploadPatchData
/* Checklist
    1. make sure last element in constants.json upload_dates is the correct date FOR THE PATCH
    2. make sure rawChampionsData have the correct data FOR THE PATCH
        //do the last 3 if the patch you are uploading is the last avaliable patch
    3. update version in frontend constants folder
    4. update footer's Last updated on
    5. (if new champion introduced) add to frontend constants and backend championNames.json)


*/
const uploadDates = require('./constants.json')["upload_dates"]
const currentDate = uploadDates[uploadDates.length - 1]

const translateRawChampionsData = () => {
    const hashMap = new Map()
    championNames.map((item) => {
        hashMap.set(item.key, item.val)
    })

    const lanes = ['baron', 'jungle', 'mid', 'bottom', 'support']
    let translatedData = []

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

    function weightCmp(a, b, aWR, bWR) {
        if (a === b) {
            return aWR < bWR ? 1 : -1
        }
        return a < b ? 1 : -1
    }

    for (let i = 0; i < 5; i++) {
        const dataArr = rawChampionsData[i].toString().trim().split('\n\n').map((champion) => {
            const temp = champion.replaceAll('%', '').split('\n')
            return {
                label: temp[0],
                winRate: Number(temp[1]),
                pickRate: Number(temp[2]),
                banRate: Number(temp[3])
            }
        })
        let tempTranslatedData = []
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
                        weight: (champion.winRate - 50) * 0.75 + champion.pickRate * 0.175 + champion.banRate * 0.075, //0.75 weight for win rate
                                                                                                                       //0.175 weight for pick rate
                                                                                                                       //0.075
                        date: new Date(currentDate)
                    }
                })
            }
        }
        
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
        
        translatedData.push(...tempTranslatedData)
    }
    return translatedData
}

module.exports = translateRawChampionsData


