# My Blog Site

This is a full-stack blog application with a **React frontend**, **Node.js & Express backend**, and **MongoDB database**.  
It allows creating, reading, updating, and deleting blog posts, along with user comments, enabling a dynamic blogging experience.

## 🛠 Tech Stack
- **Frontend:** React, Vite
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Other:** dotenv for environment configs, ESLint for code linting

## Screenshots

![image](https://github.com/user-attachments/assets/f95628f7-c01e-40f7-af7d-1f9c9c2db5b7)

![image](https://github.com/user-attachments/assets/ce025194-3f57-4ba5-87fe-f9977db02e4d)

![image](https://github.com/user-attachments/assets/80a1225d-9344-420b-b7dc-79ca4f12ed1f)

![image](https://github.com/user-attachments/assets/d498d21d-5eec-492d-92e6-3a255a1cb76e)

![image](https://github.com/user-attachments/assets/6b84fa41-70c7-4725-b47d-27d9ffb3763e)

![image](https://github.com/user-attachments/assets/6366dd4b-0969-4e41-b642-74b8551f245a)

![image](https://github.com/user-attachments/assets/83f913bf-ebbe-41a6-acd3-2cf335239b72)

## 📁 Project Structure
my-blog-site/
│
├── my-blog/                 # React frontend
│   ├── src/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── my-blog-backend/         # Node.js & Express backend
│   ├── src/
│   ├── dist/
│   ├── server.js
│   ├── package.json
│   └── app.yaml / prod-env.yaml
│
└── README.md


## Getting Started

### Prerequisites
- Node.js and npm installed
- MongoDB running locally or via Atlas

---

### Backend Setup
1. Navigate to the backend folder:
    ```bash
    cd my-blog-backend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Create a `.env` file with your MongoDB URI and other configs:
    ```
    MONGODB_URI=mongodb://localhost:27017/my-blog
    PORT=5000
    ```
4. Start the backend server:
    ```bash
    npm start
    ```

---

### Frontend Setup
1. Navigate to the frontend folder:
    ```bash
    cd my-blog
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the React development server:
    ```bash
    npm run dev
    ```

The app will typically be available at [http://localhost:5173](http://localhost:5173).

---

## ✍ Features
- Add, edit, delete blog posts
- Comment on posts
- REST API built with Express
- Persistent data with MongoDB
- Environment configs managed with `.env`
- Code linting with ESLint

---

## 💡 Author
- **Swaathi B**  
  [GitHub](https://github.com/Swaathi1409)
