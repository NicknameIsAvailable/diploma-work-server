import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { RegistrationDto } from './dto/registration.dto';
import { Request, Response } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(dto: AuthDto, res: Response): Promise<{
        user: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date | null;
            surname: string;
            login: string;
            email: string;
            role: import("@prisma/client").$Enums.UserRole;
            studentGroupId: string | null;
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
                speciality: {
                    number: string;
                    description: string | null;
                    title: string;
                    id: string;
                    createdAt: Date;
                    updatedAt: Date | null;
                    code: string;
                    locationId: string | null;
                };
                curator: {
                    name: string;
                    id: string;
                    createdAt: Date;
                    updatedAt: Date | null;
                    surname: string;
                    login: string;
                    email: string;
                    role: import("@prisma/client").$Enums.UserRole;
                    studentGroupId: string | null;
                    passwordHash: string;
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
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date | null;
            surname: string;
            login: string;
            email: string;
            role: import("@prisma/client").$Enums.UserRole;
            studentGroupId: string | null;
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
                speciality: {
                    number: string;
                    description: string | null;
                    title: string;
                    id: string;
                    createdAt: Date;
                    updatedAt: Date | null;
                    code: string;
                    locationId: string | null;
                };
                curator: {
                    name: string;
                    id: string;
                    createdAt: Date;
                    updatedAt: Date | null;
                    surname: string;
                    login: string;
                    email: string;
                    role: import("@prisma/client").$Enums.UserRole;
                    studentGroupId: string | null;
                    passwordHash: string;
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
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date | null;
            surname: string;
            login: string;
            email: string;
            role: import("@prisma/client").$Enums.UserRole;
            studentGroupId: string | null;
            passwordHash: string;
        };
    }>;
    register(res: Response, dto: RegistrationDto): Promise<{
        user: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date | null;
            surname: string;
            login: string;
            email: string;
            role: import("@prisma/client").$Enums.UserRole;
            studentGroupId: string | null;
        };
    }>;
    logout(res: Response): Promise<boolean>;
}
