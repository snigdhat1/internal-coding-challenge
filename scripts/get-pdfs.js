// yarn swc-node scripts/get-pdfs.js --input data/templates.json

const lodash = require('lodash')
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const fs = require('fs')
const path = require('path')
const Anvil = require('@anvilco/anvil')
const { run } = require('./env')

const argv = yargs(hideBin(process.argv))
  .option('input', {
    alias: 'i',
    type: 'string',
    description: 'Path to the input JSON file',
    demandOption: true,
  })
  .help().argv

const apiKey = "spF1SmX3G24WPjnhJ9UxXHlEEpngtZts"

async function main() {
  const anvilClient = new Anvil({ apiKey })

  try {
    const inputPath = path.resolve(argv.input)

    if (!fs.existsSync(inputPath)) {
      throw new Error(`Input file not found: ${inputPath}`)
    }

    const data = JSON.parse(fs.readFileSync(inputPath, 'utf-8'))

    console.log(`Processing ${data.length} templates from ${argv.input}`)

    // Process the data here
    // TODO: Add your PDF processing logic

    for (const employee of data) {
      const formsToFill = employee["formsToFill"]
      // TODO: check for empty or null formsToFill
      for (const formEid of formsToFill) {
        const result = await anvilClient.requestGraphQL({
          query: `
            query FormDataQuery ($eid: String!) {
              cast (eid: $eid) {
                eid
                title
              }
            }
          `,
          variables: { eid: formEid },
        })
        // Error check 
        const resultData = result.data.data.cast
        const title = resultData["title"]


        //Fill PDF

        const payload = {
          "title": title,
          "fontSize": 10,
          "textColor": "#CC0000",
          "data": employee
        }
        const { statusCode, data } = await anvilClient.fillPDF(formEid, payload)
        // check status code before filling pdf 


        // Check if title is usps 1583
        if (title === "USPS 1583"){
          fs.writeFileSync(`pdfs/${formEid}.pdf`, data, { encoding: null })
        }
        
        fs.writeFileSync(`pdfs/${title}.pdf`, data, { encoding: null })
      
        
        

      }

    }

    // for loop it would through employees 
    
  } catch (error) {
    console.error('Error:', error.message)
    process.exit(1)
  }
}

run(main)
