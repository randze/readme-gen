const inquirer = require('inquirer');
const fs = require('fs');
const fetch = require('node-fetch')



console.clear()
console.log(`
                 _           ___          
 _ _ ___ __ _ __| |_ __  ___|_  )__ ____ 
| \'_/ -_) _\` / _\` | \'  \\/ -_)/ // _\`/ _ \\
|_| \\___\\__,_\\__,_|_|_|_\\___/___\\__,\\___/
                                |___/     
`)

async function main(){


    var response = await inquirer.prompt([
        {
            type: 'input',
            message: 'What is your GitHub username?\n',
            name: 'username'
        },
        {
            type: 'input',
            message: 'What is the title of your project?\n',
            name: 'title'
        },
        {
            type: 'input',
            message: 'Enter a brief description of your project.\n',
            name: 'description'
        },
        {
            type: 'input',
            message: 'Enter directions of how to install your app.\n',
            name: 'installation',
        },
        {
            type: 'input',
            message: 'Enter directions of how to use your app.\n',
            name: 'usage',
        },
        {
            type: 'list',
            message: 'Project License:\n',
            name: 'license',
            choices: [
                'MIT License',
                'GNUv3.0',
                'The Unlicense'
            ]
        },
        {
            type: 'input',
            message: 'Is the project open to contributions and what are the requirements?\n',
            name: 'contributing',
        },
        {
            type: 'input',
            message: 'Have any tests been done?\n',
            name: 'tests',
        }
    ])

    // create filename with no spaces.
    const filename = response.title.toLowerCase().split(' ').join('-')+'.md';

    // fetch github user data
    let url = `https://api.github.com/users/${response.username}`
    const data = await fetch(url).then(data => data.json())

    // appends README input
    let readmeOutput =
`# ${response.title}

${response.description}

## Table of contents
[${response.title}](#${filename})

${response.installation ? '[Installation](#installation)' : ''}

${response.usage ? '[Usage](#usage)' : ''}

${response.license ? '[License](#license)' : ''}

${response.contributing ? '[Contributing](#contributing)' : ''}

${response.tests ? '[Tests](#tests)' : ''}

[Questions](#questions)


## Installation
${response.installation}

## Usage
${response.usage}

## License
${response.license}

## Contributing
${response.contributing}

## Test
${response.tests}

## Questions
![gitpic](${data.avatar_url}?raw=true)
For any questions, they can be can be sent to the repo owner [${data.login}](${data.html_url})

`
    console.log('response:', response)

    writeMyReadme(filename,readmeOutput)
}

async function writeMyReadme(filename,output) {
    await fs.writeFile(filename,output,function(err){
        if (err){
            return console.log('SORRY WE FAILED YOU !')
        }
        console.log('The work is done !!')
    })
}

main()