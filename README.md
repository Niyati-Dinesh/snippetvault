# SnippetVault

<p align="center">
  <img src="public/hero.png" height="180px" width="320px" alt="Hero Screenshot" />
  <img src="public/snippetvault.png" height="180px" width="320px" alt="Dashboard Screenshot" />
  <img src="public/search.png" height="180px" width="320px" alt="Search Snippets" />
  <img src="public/user.png" height="180px" width="320px" alt="User Profile" />
</p>

**SnippetVault** is a sleek, dark‑themed snippet management app built with React, Redux, Context API and Express.js/MongoDB. Securely sign up or log in, create, search, edit, and delete your personalized code snippets in a blazing‑fast, Tailwind‑powered interface.

---

##  Features

- **Authentication**  
  • Sign up / Sign in with email & password  
  • JWT‑protected routes, auto‑logout on token expiry  

- **Snippet CRUD**  
  • Create & edit rich snippets (title, about, code, tags, follow‑up notes)  
  • Delete unwanted snippets instantly  

- **Search & Filter**  
  • Live, client‑side search across titles, descriptions, tags  
  • Category‑based color‑coded snippet cards  

- **State Management**  
  • Global auth state via Redux (persistent across reloads)  
  • Snippet data via Context API for local updates  

- **Responsive Design**  
  • Mobile‑friendly layouts  
  • Tailwind CSS for rapid styling  

- **Error Handling & Feedback**  
  • React‑Hot‑Toast for success/error notifications  
  • Axios interceptors for automatic 401 redirect on session expiry  

---

## 🚀 Tech Stack

| Frontend                        | Backend             | Database   |
|---------------------------------|---------------------|------------|
| React (Vite)                    | Node.js + Express   | MongoDB    |
| React Router v6                 | Mongoose            |            |
| Redux Toolkit + React‑Redux     | JSON Web Tokens     |            |
| React Context API               | bcrypt.js           |            |
| Tailwind CSS                    |                     |            |
| Axios                           |                     |            |

---

## 💾 Installation

1. **Clone the Repo**  
```bash
git clone https://github.com/Niyati-Dinesh/snippetvault.git
cd snippetvault
```
2. **Server Setup**

```bash
cd backend
npm install
```

3.**Create .env with your MONGO_URI and JWT_SECRET**

4.**Client Setup**
```bash
cd ..
npm install
npm run both
```
3. **Open in Browser**
```bash
Go to http://localhost:5173
```
4. **Run Backend seperately**
```bash
npx nodemon index.js
```
5. **Run frontend seperately**
```bash
npm run dev
```
