import axios from "axios";

const api = axios.create({
  baseURL:process.env.REACT_APP_API_BASE_URL, 
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
