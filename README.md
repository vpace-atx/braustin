How to Install Playwright:
    To install Playwright on your machine with:
        npm - run command 'npm init playwright@latest'
        yarn - run command 'yarn create playwright'
        pnpm - run command - 'pnpm create playwright'


How to run tests:
    To run all tests, run 'npx playwright test'. By default, tests will run in headless
    mode unless you add the '--headed' flag, while will run tests in the UI.

    

About this project:

    All tests are housed under the tests folder of the project, with the individual 
    test files named to explain the piece of the application under test

    All pages are housed under the pages folder of the project. Individual page files 
    are named accordingly, based off the piece of the application (page) that the page 
    object is implementing


References:
    Installation - https://playwright.dev/docs/intro
    Writing tests - https://playwright.dev/docs/writing-tests
    Generating tests - https://playwright.dev/docs/codegen-intro
    Running tests - https://playwright.dev/docs/running-tests
    Page Objects (Playwright) - https://playwright.dev/docs/pom

