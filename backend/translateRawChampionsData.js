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
    1. make sure last element in uploadDates is the correct date FOR THE PATCH
    2. make sure rawChampionsData have the correct data FOR THE PATCH
    3. update version in frontend constants folder
    4. update footer's Last updated on
*/
const uploadDates = [
    "2024-05-16", //5.1B
    "2024-06-14", //5.1C
    "2024-07-03", //5.1D
]
const currentDate = uploadDates[uploadDates.length - 1]

const translateRawChampionsData = () => {
    const hashMap = new Map()
    championNames.map((item) => {
        hashMap.set(item.key, item.val)
    })

    const lanes = ['baron', 'jungle', 'mid', 'bottom', 'support']
    let translatedData = []

    for (let i = 0; i < 5; i++) {
        const dataArr = rawChampionsData[i].toString().trim().split('\n\n').map((champion) => {
            const temp = champion.replaceAll('%', '').split('\n')
            return {
                label: temp[0],
                winRate: temp[1],
                pickRate: temp[2],
                banRate: temp[3]
            }
        })
        for (let j = 0; j < dataArr.length; j++) {
            const champion = dataArr[j]
            if (hashMap.has(champion.label)) {
                const item = hashMap.get(champion.label)
                translatedData.push({
                    label: item.label,
                    name: item.name,
                    role: i + 1,
                    gameplayData: {
                        winRate: champion.winRate,
                        pickRate: champion.pickRate,
                        banRate: champion.banRate,
                        date: new Date(currentDate)
                    }
                })
            }
        }
    }
    return translatedData
}

module.exports = translateRawChampionsData


