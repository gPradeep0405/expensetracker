const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    console.log("Starting Puppeteer...");
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        headless: 'new'
    });
    
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    const baseUrl = 'http://localhost:5175';
    
    try {
        console.log("Navigating to Login...");
        await page.goto(`${baseUrl}/login`, { waitUntil: 'networkidle2' });
        await new Promise(r => setTimeout(r, 2000));
        await page.screenshot({ path: 'login.png', fullPage: true });

        console.log("Navigating to Register...");
        await page.goto(`${baseUrl}/register`, { waitUntil: 'networkidle2' });
        await new Promise(r => setTimeout(r, 2000));
        await page.screenshot({ path: 'register.png', fullPage: true });

        console.log("Registering test user...");
        await page.type('input[type="text"]', 'Test User');
        await page.type('input[type="email"]', `testuser_${Date.now()}@example.com`);
        await page.type('input[type="password"]', 'password123');
        await page.click('button[type="submit"]');
        
        console.log("Waiting for navigation to Dashboard...");
        await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 10000 }).catch(() => console.log("Navigation timeout, proceeding..."));
        await new Promise(r => setTimeout(r, 3000));
        await page.screenshot({ path: 'dashboard.png', fullPage: true });

        console.log("Navigating to Expenses...");
        await page.goto(`${baseUrl}/expenses`, { waitUntil: 'networkidle2' });
        await new Promise(r => setTimeout(r, 2000));
        await page.screenshot({ path: 'expenses.png', fullPage: true });

        console.log("Navigating to Budgets...");
        await page.goto(`${baseUrl}/budgets`, { waitUntil: 'networkidle2' });
        await new Promise(r => setTimeout(r, 2000));
        await page.screenshot({ path: 'budgets.png', fullPage: true });

        console.log("Switching to Mobile View...");
        await page.setViewport({ width: 375, height: 812, isMobile: true });
        await page.goto(`${baseUrl}/`, { waitUntil: 'networkidle2' });
        await new Promise(r => setTimeout(r, 2000));
        await page.screenshot({ path: 'dashboard-mobile.png', fullPage: true });

        console.log("Screenshots captured successfully!");
    } catch (error) {
        console.error("Error capturing screenshots:", error);
    } finally {
        await browser.close();
    }
})();
