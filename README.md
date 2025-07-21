# 📄 Bludocs: Secure Document Upload & Management System  

**Bludocs** is a cloud-native platform for secure document upload and management, built on AWS with a focus on **security**, **scalability**, and **fault tolerance**.  

![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white) 
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) 
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)  

## 🚀 Features  
- **Secure Authentication**: AWS Cognito for user registration/login.  
- **Encrypted File Storage**: Upload documents to AWS S3 with metadata tracking in DynamoDB.  
- **HTTPS Everywhere**: Cloudflare tunnels ensure secure communication (frontend + backend).  
- **Auto-Scalable**: AWS Amplify (frontend) + EC2 (backend) for seamless scaling.  
- **Audit Trails**: CloudWatch logs via ALB → S3 for monitoring and security.  

## 🧩 Tech Stack  
| **Category**       | **Technology**                          |  
|---------------------|----------------------------------------|  
| Frontend            | React (AWS Amplify)                     |  
| Backend             | Node.js + Express.js (EC2 + Cloudflare) |  
| Authentication      | AWS Cognito                             |  
| Storage             | AWS S3 (files) + DynamoDB (metadata)    |  
| CI/CD               | GitHub → Amplify (frontend)             |  
| Monitoring          | CloudWatch + ALB logs → S3              |  

## 🔐 Core Workflow  
1. **User Auth**:  
   - Register/login via Cognito → JWT tokens for secure API calls.  
2. **Document Upload**:  
   - Frontend (React) → Backend (EC2) → S3 bucket.  
   - Metadata (filename, user, timestamp) saved in DynamoDB.  
3. **HTTPS Security**:  
   - Cloudflare tunnels proxy EC2 backend to enforce HTTPS.  
4. **Deployment**:  
   - Frontend: GitHub → Amplify CI/CD.  
   - Backend: Manual deployment to EC2.  

## 🛠️ Installation & Setup  
### Prerequisites  
- AWS Account (Cognito, S3, DynamoDB, EC2, Amplify, CloudWatch)  
- Cloudflare account (for HTTPS tunneling)  
- Node.js ≥ 16.x  

### Frontend (React)  
```bash
git clone <this-repo-url>  
cd bludocs-frontend  
npm install  
npm start  # Dev mode (Amplify auto-deploys on Git push)  

## Backend (Node.js/Express)
cd bludocs-backend  
npm install  
node server.js  # Runs on EC2 (ensure Cloudflare tunnel is active)  
