import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { RegistrationDto } from './dto/registration.dto';
import { Request, Response } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(dto: AuthDto, res: Response): Promise<{
        user: {
            id: string;
            name: string;
            surname: string;
            studentGroupId: string | null;
            role: import("@prisma/client").$Enums.UserRole;
            createdAt: Date;
            updatedAt: Date | null;
            email: string;
            login: string;
        };
    }>;
    profile(req: Request): Promise<{
        user: {
            curatedGroups: {
                number: string;
                id: string;
                createdAt: Date;
                updatedAt: Date | null;
                curatorId: string | null;
                endYear: number | null;
                specialityId: string | null;
                startYear: number | null;
                course: number;
            }[];
            studentGroup: {
                curator: {
                    id: string;
                    name: string;
                    surname: string;
                    studentGroupId: string | null;
                    role: import("@prisma/client").$Enums.UserRole;
                    createdAt: Date;
                    passwordHash: string;
                    updatedAt: Date | null;
                    email: string;
                    login: string;
                };
                speciality: {
                    number: string;
                    id: string;
                    createdAt: Date;
                    updatedAt: Date | null;
                    title: string;
                    code: string;
                    description: string | null;
                    locationId: string | null;
                };
            } & {
                number: string;
                id: string;
                createdAt: Date;
                updatedAt: Date | null;
                curatorId: string | null;
                endYear: number | null;
                specialityId: string | null;
                startYear: number | null;
                course: number;
            };
            id: string;
            name: string;
            surname: string;
            studentGroupId: string | null;
            role: import("@prisma/client").$Enums.UserRole;
            createdAt: Date;
            updatedAt: Date | null;
            email: string;
            login: string;
        };
    }>;
    getNewTokens(req: Request, res: Response): Promise<{
        user: {
            curatedGroups: {
                number: string;
                id: string;
                createdAt: Date;
                updatedAt: Date | null;
                curatorId: string | null;
                endYear: number | null;
                specialityId: string | null;
                startYear: number | null;
                course: number;
            }[];
            studentGroup: {
                curator: {
                    id: string;
                    name: string;
                    surname: string;
                    studentGroupId: string | null;
                    role: import("@prisma/client").$Enums.UserRole;
                    createdAt: Date;
                    passwordHash: string;
                    updatedAt: Date | null;
                    email: string;
                    login: string;
                };
                speciality: {
                    number: string;
                    id: string;
                    createdAt: Date;
                    updatedAt: Date | null;
                    title: string;
                    code: string;
                    description: string | null;
                    locationId: string | null;
                };
            } & {
                number: string;
                id: string;
                createdAt: Date;
                updatedAt: Date | null;
                curatorId: string | null;
                endYear: number | null;
                specialityId: string | null;
                startYear: number | null;
                course: number;
            };
        } & {
            id: string;
            name: string;
            surname: string;
            studentGroupId: string | null;
            role: import("@prisma/client").$Enums.UserRole;
            createdAt: Date;
            passwordHash: string;
            updatedAt: Date | null;
            email: string;
            login: string;
        };
    }>;
    register(res: Response, dto: RegistrationDto): Promise<{
        user: {
            id: string;
            name: string;
            surname: string;
            studentGroupId: string | null;
            role: import("@prisma/client").$Enums.UserRole;
            createdAt: Date;
            updatedAt: Date | null;
            email: string;
            login: string;
        };
    }>;
    logout(res: Response): Promise<boolean>;
}
