// Interfaces

// Main Interface
export interface User {
  id: string;
  fullName: string;
  username: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  university: string;
  career: string;
  avatar?: string;
}

// Register
export interface RegisterForm {
  fullName: string;
  username: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  university: string;
  career: string;
  password: string;
  confirmPassword: string;
}

// Login  && Response

export interface UserLoginForm {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface UpdateUserForm {
  fullName: string | null;
  username: string | null;
  email: string | null;
  phone: string | null;
  dateOfBirth: string | null;
  university: string | null;
  career: string | null;
  oldPassword: string | null;
  password: string | null;
  confirmPassword: string | null;
}

export interface UserProfile {
  id: string;
  fullName: string;
  username: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  university: string;
  career: string;
  avatar?: string;
}

export interface UserPostInfo {
  id: string;
  username: string;
  avatar: string;
}

// Forms
export const initialRegisterForm: RegisterForm = {
  fullName: "",
  username: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  university: "",
  career: "",
  password: "",
  confirmPassword: "",
};

export const initialLoginForm: UserLoginForm = {
  email: "",
  password: "",
};

export const initialUpdateForm: UpdateUserForm = {
  fullName: null,
  username: null,
  email: null,
  phone: null,
  dateOfBirth: null,
  university: null,
  career: null,
  password: null,
  oldPassword: null,
  confirmPassword: null,
};
