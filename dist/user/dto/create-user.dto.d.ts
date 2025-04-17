export declare enum EUserRole {
    TEACHER = "TEACHER",
    STUDENT = "STUDENT",
    ADMIN = "ADMIN"
}
export declare class CreateUserDto {
    name: string;
    surname: string;
    groupId: string;
    role: EUserRole;
}
