const championNames = require('./championNames.json');
const fs = require('node:fs');
const rawChampionsData = [
    fs.readFileSync(`./rawChampionsData/top.txt`, 'utf8'),
    fs.readFileSync(`./rawChampionsData/jungle.txt`, 'utf8'),
    fs.readFileSync(`./rawChampionsData/mid.txt`, 'utf8'),
    fs.readFileSync(`./rawChampionsData/bottom.txt`, 'utf8'),
    fs.readFileSync(`./rawChampionsData/support.txt`, 'utf8')
]


const translateRawChampionsData = () => {
    const hashMap = new Map()
    championNames.map((item) => {
        hashMap.set(item.key, item.val)
    })

    const lanes = ['top', 'jungle', 'mid', 'bottom', 'support']
    let translatedData = []

    for (let i = 0; i < 5; i++) {
        const dataArr = rawChampionsData[i].toString().trim().split('\n\n').map((champion) => {
            const temp = champion.split('\n')
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
                    winRate: champion.winRate,
                    pickRate: champion.pickRate,
                    banRate: champion.banRate
                })
            }
        }
    }
    return translatedData
}

module.exports = translateRawChampionsData


