

const uploadPatchData = require('./uploadPatchData')

const getCurrentISODate = () => {
    let currentDate = new Date()
    const offset = currentDate.getTimezoneOffset()
    currentDate = new Date(currentDate.getTime() - (offset*60*1000))

    const dateParsed = currentDate.toISOString().split('T')[0]
    return dateParsed
}

const updateUploadDates = () => {
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
            });
        } catch (parseErr) {
            console.error('Error parsing JSON:', parseErr);
        }
    });
}

if (require.main === module) {

    // scrape latest gameplay data
    updateUploadDates()
    // call uploadPatchData
}


