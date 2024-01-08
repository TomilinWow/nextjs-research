import fs from "fs";

const express = require("express");
const app = express();
const port = 9000;
app.get("/test", (req: any, res: any) => {
  const puppeteer = require("puppeteer");
  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const testName = 'Next'


    await page.goto('http://localhost:3000');
    let totalFirstPaintTime = 0;
    let totalRenderingTime = 0;
    let totalMemoryUsage = 0;
    let totalLoadTime = 0;
    let totalActionResult = 0;

    for (let i = 0; i < 10; i++) {

      await page.goto('http://localhost:3000/');
      const loadTime = await page.evaluate(() => performance.now());
      await page.waitForSelector('#home-element');
      const loadTimeResult = `Время загрузки страницы: ${loadTime} ms`;
      totalLoadTime += loadTime

      const firstPaintTime = await page.evaluate(() => {
        const performanceTiming = performance.timing;
        return performanceTiming.responseStart - performanceTiming.navigationStart;
      });
      const performanceTimingResult = `Время первой отрисовки: ${firstPaintTime} ms`;
      totalFirstPaintTime += firstPaintTime

      const renderingTime = await page.evaluate(() => {
        const performanceTiming = performance.timing;
        return performanceTiming.loadEventEnd - performanceTiming.responseStart;
      });
      const renderingTimeResult = `Время рендеринга: ${renderingTime} ms`
      totalRenderingTime += renderingTime

      const memoryUsage = await page.evaluate(() => {
        if ('memory' in window.performance) {
          return (window.performance as any).memory.usedJSHeapSize / (1024 * 1024);

        } else {
          console.error('Браузер не поддерживает свойство memory в объекте Performance.');
        }
      });

      const memoryUsageResult = `Потребление памяти: ${memoryUsage} MB`
      totalMemoryUsage += memoryUsage

      const startActions = Date.now();
      await page.click("#post-link");
      await page.waitForSelector('#posts #post:nth-child(10)');
      await page.click('#posts #post:nth-child(10)');
      await page.waitForSelector('#post-body');
      await page.goto('http://localhost:3000/');
      await page.waitForSelector('#home-element');
      await page.click("#photo-link");
      await page.waitForSelector("#photo10");
      await page.click("#photo10");
      await page.waitForSelector('#real-photo');
      await page.goto('http://localhost:3000/');
      await page.waitForSelector('#home-element');
      await page.goto('http://localhost:3000/post');
      await page.waitForSelector('#posts #post:nth-child(10)');
      await page.goto('http://localhost:3000/photo');
      await page.waitForSelector("#photo10");
      await page.goto('http://localhost:3000/');
      await page.waitForSelector('#home-element');
      const endActions = Date.now();
      const actionsResult = `Время выполнения различных действий на сайте: ${endActions - startActions} мс`;
      totalActionResult += endActions - startActions


      const testResults = {
        url: 'http://localhost:3000/',
        name: testName,
        loadTimeResult,
        performanceTimingResult,
        renderingTimeResult,
        memoryUsageResult,
        actionsResult,
      };
      fs.appendFileSync('testResults.json', JSON.stringify(testResults) + ',\n');
    }

    await browser.close();

    let content = fs.readFileSync('testResults.json', 'utf-8');
    if (content.length === 0) {
      fs.appendFileSync('testResults.json', '[\n');
    } else {
      content = content.slice(0, -2);
      fs.writeFileSync('testResults.json', content + ',\n', 'utf-8');
    }

  })();
});



app.listen(port, () => {});
