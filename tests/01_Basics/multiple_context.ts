import {chromium} from "playwright";

async function multiUserTest() {

    let browser = await chromium.launch();

    //Admin
let adminContext = await browser.newContext();
let adminPage = await adminContext.newPage();
await adminPage.goto('https://app.vwo.com/login');

    //User
let userContext = await browser.newContext();
let userPage = await userContext.newPage();
await userPage.goto('https://app.vwo.com/login');
console.log('Admin and User contexts created successfully.');

    // Perform actions in Admin context
    await adminContext.close();
    await userContext.close();
    await browser.close();
}   
