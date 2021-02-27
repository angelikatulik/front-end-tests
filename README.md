# Setting up:
1. Install Node.js v14.X.X LTS => https://nodejs.org/en/. IMPORTANT: While installing Node.js UNCHECK "Automatically install the necessary tools..." checkbox. Remember to restart system after node instalation
2. Install/update Chrome browser to version matching version of package "chromedriver" from `package.json` file (only first number of the version must be matching, i.e. for Chrome v87.0.4280.88 the chromedriver will be v87.0.0)
3. Clone repo
4. Run `npm install` in repo root
5. Run `npm install -g allure-commandline` in repo root
6. If you use PowerShell as default command line in VS Code, open PowerShell as admin and run `set-executionpolicy remotesigned` and than choose `Yes to all` option. If it doesn't work switch default command line to `Command Prompt` in VS Code
7. Install Java Development Kit => https://www.oracle.com/java/technologies/javase-downloads.html (in order to avoid registering an account, accept conditions and open the link in a new tab). Make sure that JAVA_HOME variable path is set in environment variables with a correct path

# Running tests:
Running all tests with default configuration: run `npx wdio wdio.conf.js` in repo root
Running single test spec with default env and target: run `npx wdio wdio.conf.js --spec .\tests\test.spec.js`

# Creating custom npm script for running tests
1. Open `package.json` file
2. In "Scrpits" add new line with path to config file you need, including path to the wdio config file

# Debugging tests (VS Code):
0. Create `.vscode\lanuch.json` file if you don't have it (go to Run and Debug and click `create a launch.json file`)
1. Add following part to "configurations" array in `.vscode\launch.json` file
```
    {
            "name": "Run selected local",
            "type": "node",
            "request": "launch",
            "args": [
                "wdio.conf.js",
                "--spec",
                "${file}"
            ],
            "cwd": "${workspaceFolder}",
            "autoAttachChildProcesses": true,
            "program": "${workspaceRoot}/node_modules/@wdio/cli/bin/wdio.js",
            "console": "integratedTerminal",
            "skipFiles": [
                "${workspaceFolder}/node_modules/**/*.js",
                "${workspaceFolder}/lib/**/*.js",
                "<node_internals>/**/*.js"
            ]
        }
```
2. In Run and Debug window choose "run selected spec" from dropdown list and click "Start debugging"

If you need to create custom run setting copy whole object and change name and path to wdio configuration file in args array