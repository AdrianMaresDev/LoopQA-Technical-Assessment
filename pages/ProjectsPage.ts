import { type Page, type Locator } from '@playwright/test';

export default class ProjectsPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    projectNavButton(project: string): Locator {
        return this.page.getByRole('button', { name: project });
    }

    projectHeader(project: string): Locator {
        return this.page.locator('header').getByRole('heading', { name: project, exact: true });
    }

    // There are no roles or test IDs on the columns or task cards, so use a Tailwind class for both
    // Scope via the status heading using RegExp, since headings have a dynamic count included
    // Note: Column titles on this board are fixed (To Do, In Progress, Review, Done), so the status is not
    // regex-escaped. If users could name their own columns or if headers were dynamic, escape it with RegExp.escape(status)
    projectColumn(status: string): Locator {
        return this.page.locator('.bg-gray-50')
            .filter({
                has: this.page.getByRole('heading', {
                    name: new RegExp(`^${status}`)
                })
            });
    }

    taskCard(status: string, task: string): Locator {
        return this.projectColumn(status)
            .locator('.shadow-sm')
            .filter({ has: this.page.getByRole('heading', { name: task, exact: true }) });
    }

    // Use { exact: true } as some tag names like "Design" and "Bug" also appear in the task titles
    taskTag(status: string, task: string, tagName: string): Locator {
        return this.taskCard(status, task)
            .getByText(tagName, { exact: true });
    }
}