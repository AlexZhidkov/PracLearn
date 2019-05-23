import { UserShort } from './user-short';

export interface UserProfile extends UserShort {
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
