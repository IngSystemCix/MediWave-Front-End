![banner-mediwave](./public/mediwave-banner.png)

### 📜 **Project Overview**  
**MediWave** is a modern healthcare application designed to streamline medical record management, appointment scheduling, and patient monitoring. Built with **Angular**, it provides an intuitive and responsive user interface, ensuring a seamless experience for both patients and healthcare professionals.  

Key features include:  
- Secure authentication and user management.  
- Real-time appointment scheduling and notifications.  
- Interactive patient history and medical records.  
- Integration with external healthcare APIs for enhanced functionality.  

MediWave aims to improve efficiency in medical workflows, reducing administrative burdens while enhancing patient care. 🚀

### 📂 **Folder Structure**  

```
└── 📁src
        └── 📁app
            └── app.component.css
            └── app.component.html
            └── app.component.spec.ts
            └── app.component.ts
            └── app.config.ts
            └── app.routes.ts
            └── 📁core
                └── 📁config
                └── core.module.ts
                └── 📁guards
                └── 📁interceptors
                └── 📁services
            └── 📁features
            └── 📁pages
                └── index.ts
                └── 📁private
                    └── 📁admin
                    └── 📁user
                        └── 📁doctor
                        └── 📁patient
                └── 📁public
            └── 📁shared
                └── 📁components
                └── 📁directives
                └── 📁pipes
            └── 📁utils
        └── index.html
        └── main.ts
        └── styles.css
    └── .editorconfig
    └── .gitignore
    └── .postcssrc.json
    └── angular.json
    └── biome.json
    └── bun.lockb
    └── package-lock.json
    └── package.json
    └── README.md
    └── tsconfig.app.json
    └── tsconfig.json
    └── tsconfig.spec.json
```

### ⚙️ **Technologies Used**  
MediWave leverages a modern tech stack to ensure scalability, performance, and a great user experience. The key technologies used in this project include:  

- **Frontend:** Angular, TypeScript, Tailwind CSS  
- **Backend:** Spring Boot, Java  
- **Database:** MariaDB
- **Authentication:** JSON Web Tokens (JWT)  
- **API Integration:** RESTful APIs

This stack ensures a responsive, secure, and efficient application for healthcare management. 🚀  

### 🚀 **Installation**  
Instrucciones paso a paso para clonar el repositorio e instalar dependencias.  

```bash
git clone https://github.com/IngSystemCix/mediwave.git
cd mediwave
npm install
```

### 🔐 **Authentication & Security**  
MediWave implements robust authentication and security measures to protect user data and ensure secure access.  

- **Authentication Method:** The application uses **JSON Web Tokens (JWT)** for secure user authentication.  
- **Login Flow:**  
  1. The user submits their credentials (DNI, verification digit, birth date, and password).  
  2. The backend validates the credentials and generates a JWT upon successful authentication.  
  3. The JWT is sent to the client and stored securely (e.g., in **localStorage** or **sessionStorage**).  
  4. For each subsequent request, the client includes the JWT in the **Authorization** header.  

- **Security Features:**  
  - **Role-Based Access Control (RBAC):** Restricts access to specific features based on user roles.  
  - **Token Expiration & Refresh Mechanism:** Ensures session security by automatically logging out expired sessions.  
  - **Password Encryption:** User passwords are securely hashed using **bcrypt** before storage.  
  - **HTTPS Enforcement:** Protects data in transit by requiring secure connections.  

These measures ensure a high level of security while providing a seamless authentication experience. 🔒

### 📌 **API Integration**  
MediWave interacts with a **Spring Boot** backend through a set of **RESTful APIs** to manage authentication, user data, and medical records. The integration follows best practices to ensure efficiency and security.  

#### 🔗 **How MediWave Communicates with the API**  
- **HTTP Requests:** The frontend makes **GET**, **POST**, **PUT**, and **DELETE** requests using Angular’s **HttpClient** module.  
- **Authentication:**  
  - Users authenticate via a **login endpoint**, which returns a **JWT token**.  
  - The token is included in the **Authorization** header for secured requests.  
- **Data Fetching & Updates:**  
  - Retrieves user medical history, appointments, and notifications from the backend.  
  - Sends form data (e.g., user profile updates, medical check-ins) via **POST/PUT requests**.  

#### 🔒 **Security & Error Handling**  
- Uses **interceptors** to attach authentication tokens to requests.  
- Implements **retry mechanisms** for failed requests.  
- Handles **error responses** (e.g., invalid credentials, expired tokens) gracefully with UI notifications.  

This seamless API integration ensures MediWave provides real-time and reliable healthcare data management.  

### 📝 **License**  
This project is **proprietary** and **not open-source**. All rights are reserved. Unauthorized copying, distribution, or modification of this code is strictly prohibited.  

If you wish to use or reference any part of this project, please contact the owner for permission.
