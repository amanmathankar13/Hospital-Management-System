
# 🏥 Hospital Management System

A comprehensive, full-stack Hospital Management System (HMS) built using **Spring Boot (Backend)** and **React.js with Tailwind CSS (Frontend)**. This project streamlines hospital operations including patient records, doctor schedules, appointments, billing, pharmacy, and laboratory management.

---

## 🚀 Features

### 👤 User Management
- **Admin**: Create/update/delete users (doctors, nurses, staff, patients)
- **Role-Based Access Control**
- **Doctor**: Manage appointments, view medical records
- **Patient**: View records, book/reschedule/cancel appointments

### 🧑‍⚕️ Patient Management
- Register patients with personal, insurance, and emergency details
- Maintain complete medical history and treatment plans
- Upload reports and prescriptions

### 📅 Appointment Scheduling
- Calendar-based appointment booking with real-time doctor availability
- Status tracking (Scheduled, Completed, Cancelled)
- Doctor availability management

### 💳 Billing & Invoicing
- Generate invoices for consultations, tests, and treatments
- Integration with payment gateways
- Track payment history and dues

### 📊 Reporting & Analytics
- Dashboard for visual insights: revenue, patients, appointments
- Filter by date, doctor, or department
- Custom reports on performance and outcomes

### 💊 Pharmacy Management
- Manage medicine and equipment inventory
- Expiry and low-stock notifications
- Link prescriptions directly to inventory

### 🧪 Laboratory Management
- Manage test requests and results
- Upload test results to patient records

### 🔔 Notifications & Communication
- Email/SMS alerts for appointments and billing
- Real-time chat system between patients and staff

---

## 🔧 Optional Enhancements
- Kafka-based notification system
- WebSocket-based real-time chat

---

## 🛠️ Tech Stack

### 🖥️ Frontend
- **React.js**
- **Tailwind CSS**
- **Redux Toolkit** (State management)
- **Mantine / PrimeReact** (UI components)
- **Tabler Icons / Heroicons**

### 🧠 Backend
- **Spring Boot**
- **Spring Security + JWT Authentication**
- **MySQL Database**

### 📈 Additional Libraries
- **Nivo / ApexCharts** for analytics and data visualization

---

## 🎨 Theme & Styling

### Fonts
- **Poppins**: For body and general text
- **Merriweather**: For headings

### Tailwind Theme Colors

```js
primary: {
  '50': '#f1fcfa',
  '100': '#cff8ef',
  '200': '#9ff0e1',
  '300': '#67e1cf',
  '400': '#32b9a9',
  '500': '#1fad9f',
  '600': '#168b82',
  '700': '#166f69',
  '800': '#165955',
  '900': '#174a47',
  '950': '#072c2b',
},
neutral: {
  '50': '#f6f6f6',
  '100': '#e7e7e7',
  '200': '#d1d1d1',
  '300': '#b0b0b0',
  '400': '#888888',
  '500': '#6d6d6d',
  '600': '#5d5d5d',
  '700': '#4f4f4f',
  '800': '#454545',
  '900': '#3d3d3d',
  '950': '#000000',
},
dark: '#212529',
light: '#F0F3FB',
```

---

## ✅ Non-Functional Requirements
- **Performance**: Server-side rendering, optimized DB queries
- **Security**: JWT Authentication, data encryption
- **Responsive Design**: Mobile-first, tablet & desktop compatibility

---

## 📦 Setup Instructions

> Instructions below are a placeholder. Update as per your actual project structure.

### Backend (Spring Boot)
```bash
cd backend
./mvnw spring-boot:run
```

### Frontend (React + Tailwind)
```bash
cd frontend
npm install
npm run dev
```

---

## 📌 License
This project is open-source and available under the [MIT License](LICENSE).

---

## 🙌 Contributions
Feel free to fork the repo, open issues, and submit pull requests!

---

## 🔗 Connect
Maintained by [@amanmathankar13](https://github.com/amanmathankar13)
