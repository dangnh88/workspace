// API通信を分離
import { APIResponse } from "../types/api";

const API_BASE_URL = 'http://localhost:4000';

export const pdfService = {
  async processPDF(file: File): Promise<APIResponse> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/process-pdf`, {
      method: 'POST',
      body: formData,
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
}; 