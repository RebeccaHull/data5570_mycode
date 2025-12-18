# Maintenance Tracker – Full Stack App (React + Expo + Django + AWS)

This project is my final project for **DATA 5570 – Building Software with AI**.  
It is a full stack maintenance-tracking application built with **Expo (React Native)** on the front end and a **Django REST API** hosted on **AWS EC2** on the back end. The app lets users add maintenance tasks (car or home), stores them in a database, and displays a clean summary across pages.

This project continues the work started in Homework 4 and demonstrates frontend–backend communication, Redux middleware, persistence, and deployment skills.

---

## ✨ Features

### **Frontend (Expo + React Native + Expo Router)**
- Two-screen app:  
  - **Home Screen**: add tasks, view list, dynamic UI  
  - **Summary Screen**: aggregated stats on total tasks + completed tasks  
- **Responsive UI** with real-time updates using Redux  
- **User input** creates new tasks  
- **Navigation** via Expo Router  
- Ready for EAS Hosting / Expo Snack

---

### **Middleware (Redux Toolkit + Thunks)**
- Centralized Redux store  
- `fetchTasks` thunk → GET request to Django  
- `addTask` thunk → POST request to Django  
- Async loading + error states  
- Tasks auto-load on app start

---

### **Backend (Django REST Framework + EC2)**
- Hosted on **AWS EC2 (Ubuntu)**  
- Endpoints:
  - `GET /api/tasks/` — return all tasks  
  - `POST /api/tasks/` — add a new task  
- CORS enabled for Expo development  
- Django REST Framework views + serializers  
- Uses SQLite for persistence

---

### **Database**
- SQLite tracked by Django ORM  
- Automatically stores tasks and completed-status  
- Persists between server restarts  
- Could easily be swapped for AWS RDS

---

## 🏗 Tech Stack

### Frontend
- React Native (Expo)
- Expo Router
- Redux Toolkit
- TypeScript
- Snack / EAS Hosting

### Backend
- Python 3
- Django + Django REST Framework
- CORS Headers
- Gunicorn (optional)
- Hosted on AWS EC2

### Dev Tools
- ChatGPT
- VS Code
- PowerShell + SSH
- Cloudflare Tunnel (optional)

---

## 🤖 Use of Generative AI

I used **ChatGPT Plus** throughout development to:
- Help structure Redux thunks for GET/POST requests  
- Build Django views and serializers  
- Debug CORS issues, expo errors, and EC2 connection problems  
- Generate UI polish and layout patterns  
- Produce this README.md

This aligns with course policy encouraging AI-assisted development.

---

## 🚀 How to Run Locally (Frontend)

npm install
npx expo start


Or open the project directly in:  
**https://snack.expo.dev**

Replace the API URL in `tasksSlice.ts` with your Django server address.

---

## 🖥 How to Run Backend (EC2)

SSH into your EC2:

ssh -i your_key.pem ubuntu@<your-ec2-ip>


Activate the venv and run:

cd backend
source venv/bin/activate
python manage.py runserver 0.0.0.0:8000


Your API will be available at:

http://<your-ec2-ip>:8000/api/tasks/


---


## 🎯 Project Requirements Checklist

### ✔ Build your front end
- Two pages (Home + Summary)  
- UI responds to data  
- User can create tasks  
- Dynamic display of task list  

### ✔ Define your middleware
- Redux store  
- GET + POST thunks  
- Shared global state  

### ✔ Handle user data
- Django API receives & returns data  
- Endpoints defined in `urls.py` and `views.py`  
- Data persists to SQLite  

### ✔ Use a database
- SQLite holds task records  
- ORM handles creation + retrieval  

### ✔ Hosting (Extra credit vibe)
- Backend validated on AWS EC2  
- Frontend runs in Expo Snack (or EAS hosting)

---

## 💬 Notes

This app demonstrates end-to-end full stack development, from mobile UI to AWS-hosted API. It is intentionally simple but complete, fully satisfying the project rubric.
