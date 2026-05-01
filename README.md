# 🏥 Hospital Emergency Alert System (Admin Portal)

A mission-critical, real-time communication platform designed to minimize emergency response times in hospital environments. This system provides a centralized dashboard for managing hospital infrastructure, monitoring live alerts, and auditing historical responses.

## 🚀 Key Modules & Features

### 📊 Real-Time Admin Dashboard
- **Live Monitoring**: Instant Socket.io-driven updates for all emergency alerts (Code Blue, Red, Yellow, etc.).
- **Quick Action Hub**: One-click access to add staff, manage departments, or configure protocols.
- **Visual Analytics**: Interactive pie charts showing the current month's alert distribution.

### 📈 Reports & Analytics
- **Data Visualization**: Advanced Line and Donut charts (via Recharts) tracking alert trends and frequency.
- **KPI Tracking**: Real-time monitoring of Average Response Time, Resolution Rates, and Total Volume.
- **Filterable Insights**: Audit performance by Date, Code Type, or Hospital Department.

### 🏢 Infrastructure Management
- **Department CRUD**: Full control over hospital units and departmental heads.
- **Ward & Room Layout**: Multi-view management of hospital capacity (By Ward or individual Room Grid).
- **Bed Tracking**: Monitor bed counts and room availability across the facility.

### 🛡️ Protocol & Security
- **Alert Codes Library**: Customizable emergency protocol library with visual color-coded identifiers.
- **User Audit**: Role-based access control (RBAC) for Admins, Doctors, and Nurses.
- **System Settings**: Global facility configuration including Hospital Name, Timezones, and Security Policies.

## 🛠️ Technology Stack
- **Frontend**: React.js, Lucide React (Icons), Recharts (Data Viz)
- **Backend**: Node.js, Express.js
- **Real-Time**: Socket.io
- **Database**: MySQL
- **Styling**: Vanilla CSS (Premium Modern Design)

## ⚖️ The "Fair Data" Standard
This system is built on a **Strict Fair Data** architecture. 
- All transactional modules (Users, Wards, History) are delivered as a **Clean Slate**.
- No mock/dummy data is pre-populated in production-ready modules.
- Every metric displayed is derived from **real live hospital activity**.

## ⚙️ Setup & Installation

### 1. Database Initialization
Ensure MySQL is running and create the database:
```bash
# In the backend directory
node src/seed.js
```

### 2. Environment Variables
Create a `.env` file in the `/backend` directory:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=hospital_alert_db
JWT_SECRET=your_secret_key
```

### 3. Run the Application
```bash
# Start Backend
cd backend
npm run dev

# Start Admin Portal
cd admin
npm run dev

# Start Frontend (Nurse Terminal)
cd frontend
npm run dev
```

## 🔐 Default Credentials
- **Email**: `[EMAIL_ADDRESS]`
- **Password**: `[PASSWORD]`

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author
Sruthi Alex (UI/UX Designer)
https://www.linkedin.com/in/sruthi-alex-b7784b37a

