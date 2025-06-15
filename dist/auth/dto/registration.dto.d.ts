export declare enum EUserRole {
    TEACHER = "TEACHER",
    STUDENT = "STUDENT",
    ADMIN = "ADMIN"
}
export declare class RegistrationDto {
    name: string;
    surname: string;
    login: string;
    email: string;
    password: string;
    repeatPassword: string;
    groupId: string;
    role: EUserRole;
}
