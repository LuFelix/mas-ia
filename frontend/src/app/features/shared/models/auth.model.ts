export interface LoginResponse {
  access_token: string;
}

export interface LoginCredentials {
  identifier: string; 
  password: string;
}

export interface RegistrationData {
  name: string;
  email: string;
  password: string;
  //cpf?: string;
}