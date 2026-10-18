import { test, expect } from '@playwright/test';
import { credentials } from '../data/credentials';
import testData from '../data/testData.json';
import LoginPage from '../pages/LoginPage';
import ProjectsPage from '../pages/ProjectsPage';

test.describe('Project board task card verification', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login(credentials.username, credentials.password);
    });

    for (const { project, task, status, tags } of testData) {
        test(`${project}: ${task} is in the ${status} column with tags ${tags.join(', ')}`, async ({ page }) => {
            const projectsPage = new ProjectsPage(page);
            await projectsPage.projectNavButton(project).click();
            // Confirm the selected project's board is shown
            await expect(projectsPage.projectHeader(project)).toBeVisible();
            await expect(projectsPage.taskCard(status, task)).toBeVisible();
            for (const tag of tags) {
                await expect(projectsPage.taskTag(status, task, tag)).toBeVisible();
            }
        });
    }
});