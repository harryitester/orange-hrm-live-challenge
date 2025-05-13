# Test info

- Name: TC_SEARCH_NEG_04 - Search with SQL injection string
- Location: /Users/admin/Desktop/automation-challenge/orange-hrm-live-challenge/tests/search/search.spec.ts:182:5

# Error details

```
Error: browserType.launch: Chromium distribution 'msedge' is not found at /Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge
Run "npx playwright install msedge"
```

# Test source

```ts
   82 |
   83 |     await test.step('Navigate to Admin page', async () => {
   84 |       await dashboardPage.navigateTo();
   85 |     });
   86 |
   87 |     await test.step('Search for "E123"', async () => {
   88 |       await dashboardPage.searchByUsername('E123'); // Replace 'E123' with a real ID if needed
   89 |       const usernames = await dashboardPage.getUsernames();
   90 |       expect(usernames.join(' ')).toContain('E123');
   91 |     });
   92 |
   93 |     await context.close();
   94 |   }
   95 | );
   96 |
   97 | // TC_SEARCH_NEG_01: Search with non-existent name
   98 | test(
   99 |   'TC_SEARCH_NEG_01 - Search with non-existent name',
  100 |   { tag: ['@automation', '@search'] },
  101 |   async ({ browser }) => {
  102 |     const context = await browser.newContext();
  103 |     const page = await context.newPage();
  104 |
  105 |     await test.step('Login as Admin', async () => {
  106 |       await loginAsAdmin(page);
  107 |     });
  108 |
  109 |     const dashboardPage = new DashboardPage(page);
  110 |
  111 |     await test.step('Navigate to Admin page', async () => {
  112 |       await dashboardPage.navigateTo();
  113 |     });
  114 |
  115 |     await test.step('Search for "Ghost User"', async () => {
  116 |       await dashboardPage.searchByUsername('Ghost User');
  117 |       const noRecordsMsg = await dashboardPage.getNoRecordsMessage();
  118 |       expect(noRecordsMsg).toMatch(/No Records Found|No Records/);
  119 |     });
  120 |
  121 |     await context.close();
  122 |   }
  123 | );
  124 |
  125 | // TC_SEARCH_NEG_02: Search with empty input
  126 | test(
  127 |   'TC_SEARCH_NEG_02 - Search with empty input',
  128 |   { tag: ['@automation', '@search'] },
  129 |   async ({ browser }) => {
  130 |     const context = await browser.newContext();
  131 |     const page = await context.newPage();
  132 |
  133 |     await test.step('Login as Admin', async () => {
  134 |       await loginAsAdmin(page);
  135 |     });
  136 |
  137 |     const dashboardPage = new DashboardPage(page);
  138 |
  139 |     await test.step('Navigate to Admin page', async () => {
  140 |       await dashboardPage.navigateTo();
  141 |     });
  142 |
  143 |     await test.step('Search with empty input', async () => {
  144 |       await dashboardPage.searchByUsername('');
  145 |       const usernames = await dashboardPage.getUsernames();
  146 |       expect(usernames.length).toBeGreaterThan(0); // Should show all or a validation
  147 |     });
  148 |
  149 |     await context.close();
  150 |   }
  151 | );
  152 |
  153 | // TC_SEARCH_NEG_03: Search with special characters
  154 | test(
  155 |   'TC_SEARCH_NEG_03 - Search with special characters',
  156 |   { tag: ['@automation', '@search'] },
  157 |   async ({ browser }) => {
  158 |     const context = await browser.newContext();
  159 |     const page = await context.newPage();
  160 |
  161 |     await test.step('Login as Admin', async () => {
  162 |       await loginAsAdmin(page);
  163 |     });
  164 |
  165 |     const dashboardPage = new DashboardPage(page);
  166 |
  167 |     await test.step('Navigate to Admin page', async () => {
  168 |       await dashboardPage.navigateTo();
  169 |     });
  170 |
  171 |     await test.step('Search with special characters', async () => {
  172 |       await dashboardPage.searchByUsername('!@#$%');
  173 |       const noRecordsMsg = await dashboardPage.getNoRecordsMessage();
  174 |       expect(noRecordsMsg).toMatch(/No Records Found|No Records/);
  175 |     });
  176 |
  177 |     await context.close();
  178 |   }
  179 | );
  180 |
  181 | // TC_SEARCH_NEG_04: Search with SQL injection string
> 182 | test(
      |     ^ Error: browserType.launch: Chromium distribution 'msedge' is not found at /Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge
  183 |   'TC_SEARCH_NEG_04 - Search with SQL injection string',
  184 |   { tag: ['@automation', '@search'] },
  185 |   async ({ browser }) => {
  186 |     const context = await browser.newContext();
  187 |     const page = await context.newPage();
  188 |
  189 |     await test.step('Login as Admin', async () => {
  190 |       await loginAsAdmin(page);
  191 |     });
  192 |
  193 |     const dashboardPage = new DashboardPage(page);
  194 |
  195 |     await test.step('Navigate to Admin page', async () => {
  196 |       await dashboardPage.navigateTo();
  197 |     });
  198 |
  199 |     await test.step('Search with SQL injection string', async () => {
  200 |       await dashboardPage.searchByUsername("' OR 1=1 --");
  201 |       const noRecordsMsg = await dashboardPage.getNoRecordsMessage();
  202 |       expect(noRecordsMsg).toMatch(/No Records Found|No Records/);
  203 |     });
  204 |
  205 |     await context.close();
  206 |   }
  207 | );
```