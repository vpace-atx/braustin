How to Install Playwright:
    To install Playwright on your machine with:
        npm - run command 'npm init playwright@latest'
        yarn - run command 'yarn create playwright'
        pnpm - run command - 'pnpm create playwright'


How to run tests:
    To run all tests, run 'npx playwright test'. By default, tests will run in headless
    mode unless you add the '--headed' flag, while will run tests in the UI.

    To run only tests in a specific test file, specify the path to that file from the root of 
    the project, following 'npx playwright test'
        ex. 'npx playwright test tests/allModels/allModelsSearch.spec.ts' will run all tests in 
            allModelsSearch.spec.ts file

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


Painpoints:
    I had some difficulty gathering optimal or efficient locators from the DOM. There were 
    very limited ID's and descriptive class names to leverage for locators, as can be seen in 
    page objects.

    I also had a harder time getting tests to pass on WebKit (browser) due to it being slower. 
    Because of this I had to add some waits/assertions to slow the tests down a bit to account 
    for this latency.