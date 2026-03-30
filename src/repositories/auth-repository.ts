export interface RegisterUser {
  name: string;
  email: string;
  password: string;
  role: "CUSTOMER" | "PROFESSIONAL";
}

export interface Login {
  email: string;
  password: string;
}

export interface AuthResponse {
  id: string;
  name: string;
  role: "CUSTOMER" | "PROFESSIONAL";
}

export interface AuthRepository {
  registerUser(data: RegisterUser): Promise<AuthResponse>;
  login(data: Login): Promise<AuthResponse>;
}
