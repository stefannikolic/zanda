# 🧪 Zanda Health QA Automation Project

This is an automated test suite developed using **Playwright** for testing key e-commerce flows on [Magento Demo Site](https://magento.softwaretestingboard.com/).

---

## 🚀 Tech Stack

- **Test Runner**: [Playwright](https://playwright.dev/)
- **Language**: JavaScript / TypeScript (based on your setup)
- **Node Version**: v24.2.0
- **Package Manager**: Yarn (recommended)

---

## 📦 Installation

1. Clone the repository:
   git clone [https://github.com/stefannikolic/zanda.git]

2. Install dependencies:

yarn install

3. Create a .env file in the root directory with the following content:

URL=https://magento.softwaretestingboard.com/
USER_EMAIL=your-test-email@example.com
USER_PASSWORD=your-test-password

4. To run the full test suite in headless mode:
npx playwright test --project=chromium --grep @end2end

5. To open the interactive test runner:
npx playwright test --project=chromium --headed --grep @end2end


Tests are written to simulate realistic user behavior including login, product search, cart, and wishlist functionality.

Make sure you’re connected to the internet as tests run against a live public site.

Default environment points to: https://magento.softwaretestingboard.com/

👤 Author
Stefan Nikolić
QA Automation Engineer