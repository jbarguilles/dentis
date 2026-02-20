// src/services/userService.ts

import { apiRequest } from "./api";

export interface User {
  userId: number;
  username: string;
  email: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  role: "ADMIN" | "STAFF" | "FACULTY" | "CLINICIAN" | "SUPERADMIN";
  createdDate: string;
  updatedDate?: string;
  isActive: boolean;
}

export interface SignUpRequest {
  username: string;
  email: string;
  password: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  role: "ADMIN" | "STAFF" | "FACULTY" | "CLINICIAN" | "SUPERADMIN";
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  user?: User;
  success: boolean;
}

export interface UpdateUserRequest {
  email?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  role?: "ADMIN" | "STAFF" | "FACULTY" | "CLINICIAN" | "SUPERADMIN";
  isActive?: boolean;
}

export interface ApiResponse {
  message: string;
  success: boolean;
}

// Authentication APIs
export async function signUpApi(userData: SignUpRequest): Promise<User> {
  return apiRequest("/user/signup", {
    method: "POST",
    body: JSON.stringify(userData),
  });
}

export async function loginApi(credentials: LoginRequest): Promise<LoginResponse> {
  return apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

// User management APIs
export async function getAllUsersApi(forwardedCookies?: string): Promise<User[]> {
  return apiRequest("/user/all", { forwardedCookies });
}

export async function getActiveUsersApi(): Promise<User[]> {
  return apiRequest("/user/active");
}

export async function getUserByIdApi(userId: number): Promise<User> {
  return apiRequest(`/user/${userId}`);
}

export async function getUserByUsernameApi(username: string): Promise<User> {
  return apiRequest(`/user/username/${username}`);
}

export async function getUsersByRoleApi(role: string): Promise<User[]> {
  return apiRequest(`/user/role/${role}`);
}

export async function updateUserApi(userId: number, userData: UpdateUserRequest): Promise<User> {
  return apiRequest(`/user/${userId}`, {
    method: "PUT",
    body: JSON.stringify(userData),
  });
}

export async function deleteUserApi(userId: number): Promise<ApiResponse> {
  return apiRequest(`/user/${userId}`, {
    method: "DELETE",
  });
}

export async function activateUserApi(userId: number): Promise<ApiResponse> {
  return apiRequest(`/user/${userId}/activate`, {
    method: "PUT",
  });
}

export async function deactivateUserApi(userId: number): Promise<ApiResponse> {
  return apiRequest(`/user/${userId}/deactivate`, {
    method: "PUT",
  });
}

// Utility APIs
export async function checkUsernameExistsApi(username: string): Promise<boolean> {
  return apiRequest(`/user/check/username/${username}`);
}

export async function checkEmailExistsApi(email: string): Promise<boolean> {
  return apiRequest(`/user/check/email/${email}`);
}

export async function searchUsersByNameApi(firstName = "", lastName = ""): Promise<User[]> {
  const params = new URLSearchParams();
  if (firstName) params.append("firstName", firstName);
  if (lastName) params.append("lastName", lastName);

  return apiRequest(`/user/search?${params.toString()}`);
}
