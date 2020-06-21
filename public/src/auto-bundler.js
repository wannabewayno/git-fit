const fs = require('fs');
const path = require('path');
const directories = require('./bundler.config').directories;

// Reads all directories defined in the bundler.config
function readTargetDir(directories) {
   const fileBundle = {};
    
    directories.forEach(directory => {
        const directoryPath = path.join(__dirname,directory);

        const files = fs.readdirSync(directoryPath);

        // stores the files using the directory as the key
        fileBundle[directory] = files;
    });
    
    return fileBundle;
}

// checks to see if the src file is included, removes references to app.js, auto-bundler and bundler.config
function sortFileBundle(fileBundle) {
    // to develop later, at the moment this will be a pass through
    //TODO: remove any file called app.js, auto-bundler.js and bundler.config.js from the src file.
    
    const sortedFileBundle = fileBundle;

    return sortedFileBundle
}

// creates a string to include in the app.js file. 
// creates import statements for webpack to use
function convertBundleToText(sortedFileBundle) {
    console.log(sortedFileBundle);
    let importStatements = ''
    let declareFunctions = ''

    for (directory in sortedFileBundle ) {
        sortedFileBundle[directory].forEach(fileName => {
            console.log(fileName);
            const trimmedFileName = fileName.replace('.js','');
            importStatements += `import ${trimmedFileName} from "${directory}/${fileName}";\n`;
            declareFunctions += `${trimmedFileName}();\n`;
        })
    }
    const textToWrite = importStatements + '\n' + declareFunctions;
    return textToWrite;
}

// writes the content to the app.js file
function writeWebpackEntryFile(textToWrite) {

    fs.writeFile(path.join(__dirname,'/app.js'), textToWrite,'utf8', error => {
        if (error) throw 'ERROR WRITING TO app.js'
        console.log('Success!, app.js configured with all changes');
    });
}

// executes all functions in succesfuly build order
function execute(directories) {
    const fileBundle = readTargetDir(directories);
    const sortedFileBundle = sortFileBundle(fileBundle);
    const textToWrite = convertBundleToText(sortedFileBundle);
    writeWebpackEntryFile(textToWrite);
}

// executes auto-bundler
execute(directories);