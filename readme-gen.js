const inquirer = require("inquirer");
const fs = require('fs');
const fetch = require('node-fetch')

// let url = `https://api.github.com/users/${username}`

// const data = await fetch(url).then(data => data.json())

// * Title
// * Description
// * Table of Contents
// * Installation
// * Usage
// * License
// * Contributing
// * Tests
// * Questions

console.clear()
console.log(`
                     _           ___          
     _ _ ___ __ _ __| |_ __  ___|_  )__ ____ 
    | \'_/ -_) _\` / _\` | \'  \\/ -_)/ // _\`/ _ \\
    |_| \\___\\__,_\\__,_|_|_|_\\___/___\\__,\\___/
                                    |___/     
`)

async function main(){
  var hubName = "randze"
  var repoName = "readme-gen"
  var response = await inquirer.prompt([
    {
      type: "checkbox",
      message: "What would you like to include in your README?",
      name: "include",
      choices: [
        "Installation", 
        "Usage", 
        "License", 
        "Contributing",
        "Tests", 
        "Authors and contributors", 
        "Questions",
        "Links", 
      ]
    },
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
      type: "input",
      message: "",
      name: "contribution",
      when: response => response.include == "Contributing"
    },
    {
        type: "input",
        message: "Is the project open to contributions and what are the requirements.",
        name: "contribution",
        when: response => response.include == "Contributing"
    },
    {
      type: "list",
      message: "Project License:",
      name: "license",
      when: response => response.include == "License"
      choices: [
        "MIT License",
        "GNUv3.0",
        "The Unlicense"
      ]
    }
  ])

  // .then(function(response) {}
  const filename = response.title.toLowerCase().split(' ').join('-')+".md";
  let readmeOutput = 
`# ${response.title}

${response.description}

### Table of contents
[${response.title}](#${filename})

[Installation](#installation)

[Usage](#usage)

[License](#license)

[Contributing](#contributing)

[Tests](#tests)

[Questions](#questions)

[Links](#links)

## Installation

## Usage

## License

## Contributing

## Test

## Questions

## Links

···· Questions
`
console.log(`include:`, response.include)
}


// async function appendInfo( data ) {
  
//   if () {}
// }

async function writeMyReadme() {
        fs.writeFile(filename,readmeOutput,function(err){
            if (err){return console.log(`SORRY WE FAILED YOU !`)}
            console.log(`The work is done !!`)
        })
}

main()


// {
//     type: "checkbox",
//     message: "",
//     name: "",
//     choices: [
//       "", 
//       "", 
//       "", 
//       ""
//     ]
//   },