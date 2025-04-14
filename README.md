# URL-Shortener
A full-stack URL Shortener built with Node.js, Express, and MongoDB. Includes authentication, authorization, and cookie-based session handling.

## 🔗 URL Shortener

This is a URL Shortener web application built using **Node.js**, **Express**, and **MongoDB**. It allows users to create short links for long URLs, manage them via a dashboard, and track access. The project includes key security features like:

- **User Authentication** (sign up, login, logout)
- **Authorization** (only logged-in users can manage their own links)
- **Cookie-based Sessions** for persistent login
- **Hashing passwords** securely with bcrypt
- **Protected Routes** with middleware
- **MongoDB** for storing users and shortened links

### 🔐 Features
- Shorten long URLs with a unique short code
- User registration and login system
- Sessions handled securely with HTTP-only cookies
- Only the owner can edit/delete their URLs
- RESTful API design

---


