const timeout = 5000;

describe('Application', () => {
  beforeEach(async () => {
    await page.goto('http://localhost:3000')
  });

  test('should display the header', async () => {
    await expect(page).toMatch('Organization\'s repositories');
  });

  test('should show fetched repositories and go to first one', async () => {
    await expect(page).toMatchElement('[data-testid=repositories-list]', {
      timeout,
    });

    await expect(page).toClick('[data-testid=repositories-list] tr:nth-child(1) a');

    await page.waitForNavigation();

    expect(page.url()).toMatch(/http:\/\/localhost:3000\/repository\//);
  });

  test('should show error message for organization which does not exist', async () => {
    await expect(page).toFill('input#organization', 'not-found-org');
    await expect(page).toMatch('Organization does not exist', {
      timeout,
    });
  });

  test('should fetch provided organization\'s repositories and filter by language', async () => {
    await expect(page).toFill('input#organization', 'microsoft');
    await expect(page).toMatch('TypeScript', {
      timeout,
    });

    await expect(page).toSelect('select#language', 'Ruby');

    await expect(page).toMatchElement('[data-testid=repositories-list] tr:nth-child(1)', {
      text: 'Ruby'
    });
  });
});
