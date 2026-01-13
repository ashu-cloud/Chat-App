
# 💬 QuickChat – Real-Time Chat Application

QuickChat is a **full-stack real-time chat application** built using the **MERN stack** with **Socket.IO** for instant messaging and online presence.
It supports authentication, real-time messaging, online/offline status, unread message tracking, and profile management.

---

## 🚀 Features

### 🔐 Authentication

* User signup & login with JWT authentication
* Protected routes using middleware
* Persistent login using tokens

### 💬 Real-Time Chat

* One-to-one messaging
* Instant message delivery using **Socket.IO**
* Messages stored securely in MongoDB

### 👀 Online / Offline Status

* Live online presence using WebSockets
* Automatically updates when users connect/disconnect

### 📩 Unseen Message Count

* Unread message badge in sidebar
* Automatically clears when chat is opened
* Messages marked as **seen** in database

### 🧑 Profile Management

* Update name, bio, and profile picture
* Profile images uploaded via **Cloudinary**

### 🎨 Modern UI

* Clean and responsive UI
* Tailwind CSS for styling
* Mobile-friendly layout

---

## 📸 Screenshots
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/782169e8-d4ad-498c-86df-c912e970416e" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/396bf209-1726-4d60-b96c-a2bf9db1f5a6" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/137566e1-1bea-4caa-9f06-e24c7c240e1f" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/5f6ca7a2-0324-44d7-9927-8ee42b1b1b1f" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/3bf10f90-8e7e-4d97-b37a-13040e7e6844" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/e97a98f5-e9a8-4995-adca-f4a60a56551a" />


### 🔐 Authentication Pages

![Login Page](screenshots/login.png)
![Signup Page](screenshots/signup.png)

### 💬 Chat Interface

![Chat Page](screenshots/chat.png)

### 🧑 User Profile

![Profile Page](screenshots/profile.png)

### 📱 Responsive Design

![Mobile View](screenshots/mobile.png)

> ℹ️ **Tip:**
>
> * Create a folder named `screenshots/` in the root of your project
> * Add images there
> * Update filenames if needed

Example:

```bash
quickchat/
├── screenshots/
│   ├── login.png
│   ├── signup.png
│   ├── chat.png
│   ├── profile.png
│   └── mobile.png
```

---

## 🛠️ Tech Stack

### Frontend

* **React**
* **React Context API**
* **React Router**
* **Tailwind CSS**
* **Socket.IO Client**
* **Axios**

### Backend

* **Node.js**
* **Express.js**
* **MongoDB**
* **Mongoose**
* **Socket.IO**
* **JWT Authentication**
* **Cloudinary**

---

## 📁 Project Structure

```bash
Chat-App/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── lib/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── assets/
│   │   └── App.jsx
│
├── screenshots/
│   └── *.png
│
└── README.md
```

---

## ⚙️ Environment Variables

### Backend (`.env`)

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Frontend (`.env`)

```env
VITE_BACKEND_URL=http://localhost:5000
```

---

## 🧑‍💻 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/quickchat.git
cd quickchat
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
npm run dev
```

Server runs at:

```
http://localhost:5000
```

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## 🔌 Socket.IO Workflow

* User connects with `userId` in socket query
* Server tracks online users using `userSocketMap`
* Online users are broadcast using `getOnlineUsers`
* Messages delivered instantly in real time

---

## 🧠 Key Learnings

* Global state management with Context API
* Real-time communication using Socket.IO
* JWT-based authentication
* Backend–frontend synchronization
* Debugging real-world socket issues
* Scalable MERN architecture

---

## 🧪 Future Improvements

* Typing indicators
* Read receipts (✓✓)
* Group chats
* Message search
* Push notifications
* Last seen timestamps

---

## 🤝 Contributing

Contributions are welcome!
Fork the repo and submit a pull request.

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 👤 Author

**Ashu Panchal**
B.Tech (IT) Student
Passionate about Full-Stack Development & Real-Time Applications

---

## ⭐ Support

If you like this project:

* Give it a ⭐ on GitHub
* Share feedback
* Use it as a learning reference

---

Just say 👍
