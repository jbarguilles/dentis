"use server";

import { cookies } from "next/headers";
import {
  getAllUsersApi,
  getActiveUsersApi,
  getUserByIdApi,
  updateUserApi,
  deleteUserApi,
  activateUserApi,
  deactivateUserApi,
  searchUsersByNameApi,
  signUpApi,
  loginApi,
  type User,
  type SignUpRequest,
  type UpdateUserRequest,
  type ApiResponse,
  type LoginRequest,
  type LoginResponse,
} from "@/services/userService";
import { revalidatePath } from "next/cache";

export interface ActionResult<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

// Get all users
export async function getAllUsersAction(): Promise<ActionResult<User[]>> {
  try {
    // Get cookies from the request to forward to API
    const cookieStore = cookies();
    const cookieHeader = cookieStore.toString();

    const users = await getAllUsersApi(cookieHeader);
    return { success: true, data: users };
  } catch (error) {
    console.error("Error fetching all users:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch users",
    };
  }
}

// Get active users only
export async function getActiveUsersAction(): Promise<ActionResult<User[]>> {
  try {
    const users = await getActiveUsersApi();
    return { success: true, data: users };
  } catch (error) {
    console.error("Error fetching active users:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch active users",
    };
  }
}

// Get user by ID
export async function getUserByIdAction(userId: number): Promise<ActionResult<User>> {
  try {
    const user = await getUserByIdApi(userId);
    return { success: true, data: user };
  } catch (error) {
    console.error(`Error fetching user ${userId}:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch user",
    };
  }
}

// Create new user
export async function createUserAction(userData: SignUpRequest): Promise<ActionResult<User>> {
  try {
    const user = await signUpApi(userData);
    revalidatePath("/users");
    return { success: true, data: user };
  } catch (error) {
    console.error("Error creating user:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create user",
    };
  }
}

// Update user
export async function updateUserAction(
  userId: number,
  userData: UpdateUserRequest,
): Promise<ActionResult<User>> {
  try {
    const user = await updateUserApi(userId, userData);
    revalidatePath("/users");
    return { success: true, data: user };
  } catch (error) {
    console.error(`Error updating user ${userId}:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update user",
    };
  }
}

// Delete user (soft delete)
export async function deleteUserAction(userId: number): Promise<ActionResult<ApiResponse>> {
  try {
    const response = await deleteUserApi(userId);
    revalidatePath("/users");
    return { success: true, data: response };
  } catch (error) {
    console.error(`Error deleting user ${userId}:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete user",
    };
  }
}

// Freeze/Deactivate user account
export async function freezeUserAction(userId: number): Promise<ActionResult<ApiResponse>> {
  try {
    const response = await deactivateUserApi(userId);
    revalidatePath("/users");
    return { success: true, data: response };
  } catch (error) {
    console.error(`Error freezing user ${userId}:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to freeze user account",
    };
  }
}

// Unfreeze/Activate user account
export async function unfreezeUserAction(userId: number): Promise<ActionResult<ApiResponse>> {
  try {
    const response = await activateUserApi(userId);
    revalidatePath("/users");
    return { success: true, data: response };
  } catch (error) {
    console.error(`Error unfreezing user ${userId}:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to unfreeze user account",
    };
  }
}

// Search users by name
export async function searchUsersAction(
  firstName = "",
  lastName = "",
): Promise<ActionResult<User[]>> {
  try {
    const users = await searchUsersByNameApi(firstName, lastName);
    return { success: true, data: users };
  } catch (error) {
    console.error("Error searching users:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to search users",
    };
  }
}

// Login user
export async function loginUserAction(
  credentials: LoginRequest,
): Promise<ActionResult<LoginResponse>> {
  try {
    const response = await loginApi(credentials);
    return { success: true, data: response };
  } catch (error) {
    console.error("Error logging in:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Login failed",
    };
  }
}
