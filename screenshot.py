import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={"width": 1280, "height": 720})
        await page.goto("http://localhost:5173/")
        await page.wait_for_selector('h1', timeout=10000)
        # Capture full page screenshot
        await page.screenshot(path="screenshot.png", full_page=True)
        await browser.close()

asyncio.run(main())
