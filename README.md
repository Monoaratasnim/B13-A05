
### 🛠️ GitHub Issue Tracker (Vanilla JS)

A high-performance, dependency-free web application that interacts with the GitHub REST API to manage and visualize repository issues.

-----

## 🚀 Overview

The **GitHub Issue Tracker** is a technical showcase of **Asynchronous JavaScript** and **DOM Architecture**. By avoiding frameworks like React or Next.js, this project demonstrates a deep understanding of core web mechanics, resulting in a lightweight, near-instant user experience.

## ✨ Key Features

  * **Live API Integration:** Uses the modern `Fetch API` with `async/await` to pull real-time data from the GitHub REST API.
  * **Dynamic DOM Management:** Updates the UI instantly by creating and injecting elements based on user input and API responses.
  * **Efficient Search:** A high-speed search-as-you-type feature implemented using ES6 array methods (`.filter()`, `.includes()`).
  * **Status Filtering:** Toggle seamlessly between `Open` and `Closed` issues without page refreshes.
  * **Modern UI:** Built with **Tailwind CSS** and **DaisyUI** to ensure a professional, responsive, and mobile-friendly design.

## 🛠️ Technical Deep Dive

### 1\. Document Object Model (DOM)

I utilized the DOM to create a seamless "Single Page" application flow. By utilizing `document.querySelector` and dynamic templates, the app updates state and visibility without ever reloading the browser.

### 2\. ES6+ Features

The codebase follows modern standards to ensure clean, maintainable logic:

  * **Arrow Functions** for concise event handling.
  * **Template Literals** for rendering clean, readable HTML components inside JavaScript.
  * **Destructuring** to pull specific issue data (titles, labels, authors) from JSON objects.

### 3\. API Communication

The application handles the full request-response cycle, including:

  * **Loading States:** Providing visual feedback while data is being fetched.
  * **Error Handling:** Gracefully managing 404s (repo not found) and API rate limits.
  * **Data Mapping:** Transforming complex JSON responses into interactive UI cards.



## 🧠 What I Learned

  * Mastered the handling of **Promises** and asynchronous code.
  * Developed a robust system for **Event Delegation** to manage high-frequency user interactions.
  * Learned to architect a clean frontend structure using a **Utility-first CSS** approach.

-----

Developed with ❤️ by [Monoara Tasnim](https://www.google.com/search?q=https://github.com/your-username)
