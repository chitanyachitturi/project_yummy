const puppeteer = require('puppeteer');
describe('Yummy Recipe Sharing', () => {
    let browser;
    let page;

    beforeAll(async() => {
        browser = await puppeteer.launch();
        page = await browser.newPage();
        await page.setViewport({ width: 1552, height: 832 });
    });

    afterAll(async() => {
        await browser.close();
    });

    beforeEach(async() => {
        await page.goto('http://127.0.0.1:5500/index.html');

    });

    it('should successfully share a recipe', async() => {


        // Click on the 'Send Your Recipe' link
        const sendRecipeLink = await page.$('a[href="#book-a-table"]');
        await sendRecipeLink.click();

        // Fill out and submit the recipe sharing form
        await page.type('#name', 'Shivani');
        await page.type('#email', 'poreshivani@gmail.com');
        await page.type('#phone', '1234567890');
        await page.type('#date', 'Chicken Recipe');
        await page.type('#recipe-category', 'Main Course')
        await page.type('#people', '4');
        await page.type('#message', 'Here is my yummy recipe!');
        const submitButton = await page.$('button[type="submit"]');
        await submitButton.click();

        // Wait for the success message to appear
        await page.waitForSelector('.sent-message', { visible: true });

        // Check that the success message contains the recipe name
        const successMessage = await page.$('.sent-message');
        const successMessageText = await page.evaluate(successMessage => successMessage.textContent, successMessage);
        expect(successMessageText).toContain('Your recipe was sent. We will look into it and share it on the website. Thank you!');
    });

    it('Search Recipe', async() => {
        // Click on the 'Search' link
        const searchRecipeLink = await page.$('a[href="search.html"]');
        await searchRecipeLink.click();
        await page.waitForNavigation(); // Wait for navigation to complete
        await page.click('#search-input');
        await page.type('#search-input', 'chicken');
        await page.click('#search-btn');
    });

    it('Watch Recipe', async() => {
        // Click on the 'Search' link
        const searchRecipeLink = await page.$('a[href="search.html"]');
        await searchRecipeLink.click();
        await page.waitForNavigation(); // Wait for navigation to complete
        await page.click('#search-input');
        await page.type('#search-input', 'chicken');
        await page.click('#search-btn');
        // watch a recipe video
        await page.waitForXPath("(//a[contains(text(),'Get Recipe')])[3]");
        const [getRecipeButton] = await page.$x("(//a[contains(text(),'Get Recipe')])[3]");
        await getRecipeButton.click();
        await browser.close();
    });

});