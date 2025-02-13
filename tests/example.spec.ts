import { test, expect, chromium, Page, BrowserContext, Browser } from '@playwright/test';
import { LoginPage } from './src/pages/LoginPage';

test.describe('Suite 1', () => {
  test.describe.configure({mode: 'serial'}); //chạy riêng cái bộ này tuần tự, run sequence

  // test.beforeEach chay cho tung test
  // test.beforeAll chay cho ca bo testsuite
  // let khai bao su dung trong func duoc thoi, let chua can init
  let page:Page;
  let context:BrowserContext;
  let browser:Browser;
  let loginPage: LoginPage;

  test.beforeAll('Setup browser', async() => {
    browser = await chromium.launch({ headless: false });
    context = await browser.newContext();
    page = await context.newPage();
    loginPage = new LoginPage(page);
  })

  test.afterAll('Teardown browser', async () => {
    await context.close();
    await browser.close();
  })

  // async function login(){
  //   const userNameEle = page.getByPlaceholder('Username'); // chua tim ele ma chi define 1 stragery cho cai locator
  //   const passwordEle = page.getByPlaceholder('Password');
  //   const loginButtonEle = page.locator("//input[@id='login-button']");

  //   await userNameEle.fill('standard_user'); //xuong day bat dau tim ele, phuong thuc giong findby
  //   await passwordEle.fill('secret_sauce');
  //   await loginButtonEle.click();
  // }

  async function validateTitleOfPage(title:string) {

    await expect(page.getByText(title)).toBeInViewport();
    
  }

  test('Open saucedemo.com test', async () => {
    await test.step('Navigate to Saucedemo', async function() {
      await page.goto('https://saucedemo.com/');
    })

    // Expect a title "to contain" a substring.
    await test.step('Validate title of Saucedemo is Swag Labs', async function () {
      await expect(page).toHaveTitle('Swag Labs');
    })

    //Login page
    // await login();
    // let loginPage = new LoginPage(page);
    await test.step('Login to saucedemo.com', async function () {
      await loginPage.login('standard_user', 'secret_sauce');
    })
    
    //Validate title
    await test.step('Login successfully', async function () {
      await validateTitleOfPage('Products');
    })
    
  });

  async function clickCartIcon(){
    const cartIconEle = page.locator("css=.shopping_cart_link");
    await cartIconEle.click();
  }

  test('Validate Your Cart title', async () => {
    await clickCartIcon();
    await validateTitleOfPage('Your Cart');
  });
// test new PR
});

