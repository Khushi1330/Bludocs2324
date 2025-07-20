import axios from "axios";

const api = axios.create({
  baseURL: "http://BluDocs-ALB-1669896389.ap-south-1.elb.amazonaws.com", 
});

export interface User {
  email: string;
  name: string;
  isVerified: boolean;
}


export interface Document {
  fileKey: string;
  fileName: string;
  fileUrl: string;
  fileSize:number,
  fileType:string,
  userId: string;
  timestamp: string;
}

export default api;
