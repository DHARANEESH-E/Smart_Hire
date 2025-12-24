# HireSmart - Quick Start Guide

## ✅ Current Status

**Both servers are running successfully!**

- ✅ Frontend: http://127.0.0.1:5173/
- ✅ Backend: http://localhost:5000
- ✅ MongoDB: Connected

## 🚀 How to Access

### Option 1: Direct Browser Access
1. Open your web browser (Chrome, Edge, Firefox)
2. Type in the address bar: `http://127.0.0.1:5173/`
3. Press Enter

### Option 2: Click the link below
**[Click here to open HireSmart](http://127.0.0.1:5173/)**

## 🔐 Login Credentials

```
Email: test@example.com
Password: password123
```

## 📋 Step-by-Step Instructions

### 1. Open the Application
- Navigate to: http://127.0.0.1:5173/
- You should see the HireSmart homepage with a search bar

### 2. Sign In
- Click "Login" button in the top right
- Enter email: `test@example.com`
- Enter password: `password123`
- Click "Sign In"

### 3. Browse Jobs
- After login, click "Jobs" in the navigation menu
- You'll see 480+ job listings
- Use filters on the left sidebar:
  - **Categories**: AIML, IT, B.COM, Physics, Maths, etc.
  - **Locations**: Chennai, Coimbatore, Madurai, Hosur, etc.
- Search by job title in the search bar

## 🔧 Troubleshooting

### If the page doesn't load:

1. **Check if servers are running:**
   - Look for terminal windows showing:
     - `VITE v4.5.3 ready` (Frontend)
     - `Server is running on port 5000` (Backend)

2. **Try refreshing the page:**
   - Press `Ctrl + F5` (hard refresh)

3. **Clear browser cache:**
   - Press `Ctrl + Shift + Delete`
   - Clear cached images and files

4. **Check the URL:**
   - Make sure you're using `http://127.0.0.1:5173/`
   - NOT `https://` (no 's')
   - NOT `localhost:5173` (use 127.0.0.1)

### If login doesn't work:

1. **Check credentials exactly:**
   - Email: `test@example.com` (all lowercase)
   - Password: `password123` (all lowercase, no spaces)

2. **Open browser console:**
   - Press `F12`
   - Click "Console" tab
   - Look for any red error messages
   - Share those errors if you see any

3. **Test the API directly:**
   - Open: `d:\HIRESMART\test-api.html` in your browser
   - This will test if the backend is responding

### If jobs don't show:

1. **Make sure you're logged in first**
   - Jobs page works without login
   - But recommendations require login

2. **Check filters:**
   - Click "Reset Filters" button on the left sidebar
   - Try searching without any filters

3. **Check backend:**
   - Open: http://localhost:5000/api/jobs
   - You should see JSON data with job listings

## 📊 Available Features

Once logged in, you can access:

- **💼 Jobs** - Browse and apply for jobs
- **🎓 Internships** - Find internship opportunities  
- **📅 Events** - College events and job fairs
- **🧠 Skill Test** - Test your skills
- **⭐ Recommendations** - Personalized job recommendations
- **📄 ATS Scanner** - Check your resume ATS score
- **👤 Profile** - Manage your profile

## 🎯 What You Should See

### Homepage:
- Large heading: "Find Your Dream Job in Tamil Nadu's Top Tech Hubs"
- Search bar with location dropdown
- Category cards (AIML, IT, B.COM, Physics, Maths)
- ATS Resume Checker section

### Jobs Page (after clicking "Jobs"):
- Left sidebar with filters
- Search bar at top
- List of job cards showing:
  - Company logo
  - Job title
  - Location
  - Salary range
  - Skills required
  - "View Details" button

## 🆘 Still Not Working?

If you're still having issues, please tell me:

1. **What URL are you using?**
2. **What do you see on the screen?**
   - Blank page?
   - Error message?
   - Loading forever?
3. **Any error messages in the browser console?** (Press F12 to check)
4. **Which step is failing?**
   - Can't open the page?
   - Can't login?
   - Can't see jobs?

I'll help you fix it immediately!
