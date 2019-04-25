export interface UserProfile {
    uid?: string;
    displayName: string;
    fcmToken?: string;
    email: string;
    photoURL: string;
    primaryRole: string;
    university?: string;
    faculty?: string;
    isStudent?: boolean;
    isBusiness?: boolean;
    isUniversity?: boolean;
    isAdmin?: boolean;
}
