const { clickElement, getText } = require("./lib/commands");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("https://qamid.tmweb.ru/client/index.php");
});

afterEach(async () => {
  await page.close();
});

describe("We are going to the cinema", () => {
  test("Сталкер", async () => {
    await clickElement(page, "a[data-time-stamp='1759784400']");
    await clickElement(page, '[data-seance-id="217"]');    
    await clickElement(
      page,
      "div.buying-scheme__row:nth-child(5) > span.buying-scheme__chair:nth-child(6)"
    );
    await clickElement(page, ".acceptin-button");
    const price = await getText(page, "span.ticket__details.ticket__cost");
    expect(price).toBe("100");
  });

  test("Ведьмак", async () => {
    await clickElement(page, "a[data-time-stamp='1759698000']");
    await clickElement(page, '[data-seance-id="223"]');
    await clickElement(
      page,
      "div.buying-scheme__row:nth-child(5) > span.buying-scheme__chair:nth-child(6)"
    );
   await clickElement(
      page,
      "div.buying-scheme__row:nth-child(5) > span.buying-scheme__chair:nth-child(7)"
    );
    await clickElement(page, ".acceptin-button");
    const price = await getText(page, "span.ticket__details.ticket__cost");
    expect(price).toBe("200");
  });

  test("Ведьмак", async () => {
    await clickElement(page, "a[data-time-stamp='1759698000']");
    await clickElement(page, '[data-seance-id="223"]');
    const seat =
      "div.buying-scheme__row:nth-child(5) > span.buying-scheme__chair:nth-child(7)";
    await clickElement(page, seat);
    await clickElement(page, seat);
    const isDisabled = await page.$eval(
      ".acceptin-button",
      (btn) => btn.disabled
    );
    expect(isDisabled).toBe(true);
  });
});