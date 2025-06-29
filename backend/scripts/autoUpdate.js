

const uploadPatchData = require('./uploadPatchData')

const getCurrentDate = () => {
    let currentDate = new Date()
    const offset = currentDate.getTimezoneOffset()
    currentDate = new Date(currentDate.getTime() - (offset*60*1000))

    return currentDate
}

const getCurrentISODate = () => {
    const dateParsed = getCurrentDate().toISOString().split('T')[0]
    return dateParsed
}

const updateUploadDates = (cb = null) => {
    const fs = require('fs')
    const filePath = './constants.json'

    fs.readFile(filePath, 'utf8', (read_err, data) => {
        if (read_err) {
            console.error('Error reading file:', read_err);
            return;
        }
    
        try {
            let jsonData = JSON.parse(data);
    
            if (!("upload_dates" in jsonData))
                throw new Error("upload_dates not in jsonData")
    
            jsonData["upload_dates"].push(getCurrentISODate())
            const updatedJsonString = JSON.stringify(jsonData, null, 2)

            fs.writeFile(filePath, updatedJsonString, 'utf8', (write_err) => {
                if (write_err) {
                    console.error('Error writing file:', write_err);
                    return;
                }
                console.log('Data successfully added to the constants.json');
                if (cb) cb();
            });
        } catch (parseErr) {
            console.error('Error parsing JSON:', parseErr);
        }
    });
}

const spawnLolmWebScraper = () => {
    const spawn = require("child_process").spawn;
    const pythonProcess = spawn('python',["../webscraper/scraper.py"])
    return pythonProcess
}

if (require.main === module) {
    console.log("Auto Update started on:", getCurrentDate())
    spawnLolmWebScraper().on('close', async (exit_code) => {
        console.log("lolm scraper exit code: ", exit_code)
        updateUploadDates( uploadPatchData )
    })
}


