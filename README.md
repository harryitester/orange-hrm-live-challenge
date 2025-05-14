# CPP Test Automation E2E with Playwright and Typescript
This is the repository to run the test for weather.com with playwright tyepscript and page object model

# Getting Start
1. [Playwright](https://playwright.dev/)
2. [Execute test parallel](https://playwright.dev/docs/test-parallel)
3. [HTML Report](https://playwright.dev/docs/test-reporters)
4. [Allure Report](https://testersdock.com/allure-playwright/)
5. [Page Object Model](https://playwright.dev/docs/pom)
6. [Cross Environment](https://www.npmjs.com/package/cross-env)

# Installation
The following softwares are required:
- [NodeJS](https://nodejs.org/en/download)
- [JDK 19](https://docs.oracle.com/en/java/javase/18/install/overview-jdk-installation.html)


# Set up
1. CLone this repository to your machine
2. Running npm install to download and create node_modules section
 
```
npm install
```
3. Download playwright supported browsers by below command
```
npx playwright install --with-deps
```
4. If "cross-env" cannot be found on your machine, execute below command to install globaly
```
npm install -g cross-env
```
- Running with specific environment, country by passing the process environments (using country to get the correct localization to navigate or url)
```
// environment = [test, production, prerelease]
// scriptFilePath = copy relative path of the test spec file
cross-env test_env=${envionment} npx playwright test ${scriptFilePath}

```
- Running with specific grep
@smoke
@sanity
@regression
cross-env test_env=${envionment} npx playwright test ${scriptFilePath} --grep ${grep}

```
```
5. To generate the allure report also open.
```
npm run allure:generate
```
