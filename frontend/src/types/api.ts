import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000", 
});

export interface User {
  email: string;
  name: string;
  isVerified: boolean;
}


export interface Document {
  key: string;
  url: string;
  type: string;
  createdAt: string | Date;
  size: number;
  name: string;
  id: string;
  fileName: string;
  fileUrl: string;
  fileSize:number,
  fileType:string,
  userId: string;
  uploadedAt: string | Date;
}

export default api;
