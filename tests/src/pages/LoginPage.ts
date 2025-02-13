import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

// muốn dùng được class này thì phải thêm export
export class LoginPage extends BasePage{
    readonly userNameEle: Locator; // không thay đổi giá trị trong hàm, khởi tạo giá trị trong constructor
    readonly passwordEle: Locator;
    readonly loginButtonEle: Locator;

    constructor(page: Page){
        super(page);
        this.userNameEle = this.page.getByPlaceholder('Username'); // chua tim ele ma chi define 1 stragery cho cai locator
        this.passwordEle = this.page.getByPlaceholder('Password');
        this.loginButtonEle = this.getLocator("//input[@id='login-button']");
    }

    async login(username: string, password: string){
        await this.userNameEle.fill(username);
        await this.passwordEle.fill(password);
        await this.loginButtonEle.click();
    }

}