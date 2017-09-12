# IoT Reporting UI ( Javascript, html & CSS)

How to Install & build the project [instructions](https://github.com/Neustar-TDI/node-reporting-ui)
---

#### Installation

Checkout the source code from https://github.com/Neustar-TDI/node-reporting-ui/tree/feature/psl/dashboard-0.1

---
#### Without build.

Rename the index_dev.html to index.html, move the folder under your webserver of choise and create a website/ virtual host and access index.html from browser.


#### : Workflow

Make sure that:
  1. Open local branch or feature for [https://github.com/Neustar-TDI/node-reporting-ui/tree/feature/psl/dashboard-0.1)
  2. API calls are not blocked by network proxy.
  2. Browser used is Chrome – 57 on windows or Safari 10 on Mac.
  
  
#### Build using Npm with Webpack

**NPM**

Install the NPM
You may have run below commands first if you are behind the proxy
npm config set proxy http://ngproxy.exmaple.com:8080
npm config set https-proxy http://ngproxy.example.com:8080

To create the build

Ensure that package.json & webpack.config.js are present with configuration

Use "npm run build": This will install and the run the compilation process. 
Use "npm run compile": This will deploy everything inside dist folder. 

Webpack package manager comes with a small development server on localhost:4000 

Use "npm run startDev": This will run a local Node server and deploy the application.
