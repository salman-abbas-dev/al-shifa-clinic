import { test, expect } from '@playwright/test';

test.describe('Bilingual Navigation and RTL Tests', () => {
  
  test('should load English homepage by default (LTR)', async ({ page }) => {
    await page.goto('/');
    
    // Check if redirect to /en happened
    await expect(page).toHaveURL(/\/en/);
    
    // Check HTML dir attribute
    const htmlDir = await page.getAttribute('html', 'dir');
    expect(htmlDir).toBe('ltr');
    
    // Check English text
    await expect(page.locator('h1').first()).toContainText('Dr. Ahmed Ali');
  });

  test('should switch to Urdu and enable RTL layout', async ({ page }) => {
    await page.goto('/en');
    
    // Click the language switcher (find button with 'اردو')
    await page.getByRole('button', { name: 'اردو' }).click();
    
    // Verify URL changed to /ur
    await expect(page).toHaveURL(/\/ur/);
    
    // Verify HTML dir attribute changed to RTL
    const htmlDir = await page.getAttribute('html', 'dir');
    expect(htmlDir).toBe('rtl');
    
    // Verify Urdu translation loaded
    await expect(page.locator('h1').first()).toContainText('ڈاکٹر احمد علی');
  });

  test('should preserve current page when switching languages', async ({ page }) => {
    await page.goto('/en/about');
    
    // Switch to Urdu
    await page.getByRole('button', { name: 'اردو' }).click();
    
    // Verify URL changed to /ur/about
    await expect(page).toHaveURL(/\/ur\/about/);
  });

  test('mobile navigation should open and close correctly', async ({ page, isMobile }) => {
    if (!isMobile) return; // Skip on desktop
    
    await page.goto('/en');
    
    // Open menu
    await page.getByLabel('Toggle Menu').click();
    await expect(page.getByRole('navigation').last()).toBeVisible();
    
    // Click a link and ensure menu closes and navigates
    await page.getByRole('navigation').last().getByText('About Doctor').click();
    await expect(page).toHaveURL(/\/en\/about/);
    await expect(page.getByRole('navigation').last()).toBeHidden();
  });
});