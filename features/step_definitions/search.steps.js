const { Given, When, Then, Before, After } = require("cucumber");
const puppeteer = require("puppeteer");
const { clickElement, getText } = require("../../lib/commands");
const { expect } = require("expect");

let browser;
let page;

Before(async () => {
  browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  page = await browser.newPage();
});

After(async () => {
  await page.close();
  await browser.close();
});

Given("I open the cinema website", async () => {
  await page.goto("https://qamid.tmweb.ru/client/index.php");
});

When("I select the showtime {string}", async (timeStamp) => {
  await clickElement(page, `a[data-time-stamp='${timeStamp}']`);
});

When("I choose the seance {string}", async (seanceId) => {
  await clickElement(page, `[data-seance-id='${seanceId}']`);
});

When("I select the seat in row {int} seat {int}", async (row, seat) => {
  await clickElement(
    page,
    `div.buying-scheme__row:nth-child(${row}) > span.buying-scheme__chair:nth-child(${seat})`
  );
});

When("I select the seats {string} and {string}", async (seat1, seat2) => {
  const [row1, col1] = seat1.split("-");
  const [row2, col2] = seat2.split("-");
  await clickElement(
    page,
    `div.buying-scheme__row:nth-child(${row1}) > span.buying-scheme__chair:nth-child(${col1})`
  );
  await clickElement(
    page,
    `div.buying-scheme__row:nth-child(${row2}) > span.buying-scheme__chair:nth-child(${col2})`
  );
});

When("I select the taken seat {string}", async (seat) => {
  const [row, col] = seat.split("-");
  await clickElement(
    page,
    `div.buying-scheme__row:nth-child(${row}) > span.buying-scheme__chair:nth-child(${col})`
  );
});

When("I confirm the purchase", async () => {
  await clickElement(page, ".acceptin-button");
});

Then("I should see the ticket price {string}", async (price) => {
  const actualPrice = await getText(page, "span.ticket__details.ticket__cost");
  expect(actualPrice).toBe(price);
});

Then("the confirm button should be disabled", async () => {
  const isDisabled = await page.$eval(
    ".acceptin-button",
    (btn) => btn.disabled
  );
  expect(isDisabled).toBe(true);
});