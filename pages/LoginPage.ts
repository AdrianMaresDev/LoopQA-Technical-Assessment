import { type Page, type Locator, expect } from '@playwright/test';

export default class LoginPage {
    readonly page: Page;
    readonly loginHeader: Locator;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly signInButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginHeader = page.getByRole('heading', { name: 'Project Board Login' });
        this.usernameInput = page.getByRole('textbox', { name: 'Username' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.signInButton = page.getByRole('button', { name: 'Sign in' });
    }

    async login(username: string, password: string) {
        await this.page.goto('/');
        await this.loginHeader.waitFor();
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.signInButton.click();
        // The page URL remains the same after login, so ensure the login page header is no longer visible
        await expect(this.loginHeader).toBeHidden();
    }
}