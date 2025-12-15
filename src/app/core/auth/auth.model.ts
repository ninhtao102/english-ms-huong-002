export interface AuthRequest {
    username?: string;
    password?: string;
}
export interface AuthResponse {
    accessToken?: string;
    refreshToken?: string;
}
export interface ForgotPasswordRequest {
    username?: string;
    email?: string;
}
export interface RegisterRequest {
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    fullName?: string;
}
