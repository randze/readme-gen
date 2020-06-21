const inquirer = require("inquirer");
const fs = require('fs');


// * Title
// * Description
// * Table of Contents
// * Installation
// * Usage
// * License
// * Contributing
// * Tests
// * Questions

async function main(){
    var response = await inquirer.prompt([
        {
            type: "input",
            message: "What is the title of your project?",
            name: "title"
        },
        {
            type: "input",
            message: "Enter a brief description of your project.",
            name: "description"
        },
        {
          type: "checkbox",
          message: "",
          name: "",
          choices: [
            "", 
            "", 
            "", 
            ""
          ]
        },
        {
          type: "list",
          message: "Project License:",
          name: "license",
          choices: [
            "Apache License 2.0",
            "GNUv3.0",
            "MIT License",
            "BSD2",
            "BSD3",
            "Creative Commons Zero v1.0 Universal",
            "Eclipse Public License 2.0",
            "GNUv2.0",
            "GNU Lesser v2.1",
            "GNU Lesser v3.0",
            "Mozilla Public License 2.0",
            "The Unlicense"
          ]
        }
      ]).then(function(response) {
        var filename = response.title.toLowerCase().split(' ').join('-')+".md";
        var readmeOutput = 
`# ${response.title}

${response.description}

···· Table of contents
···· Installation
···· Usage
···· License
···· Contributing
···· Tests
···· Questions
`
        fs.writeFile(filename,readmeOutput,function(err){
            if (err){return console.log(`SORRY BRO WE FAILED YOU !`)}
            console.log(`The work is done !!`)
        })
      })
} 

main()