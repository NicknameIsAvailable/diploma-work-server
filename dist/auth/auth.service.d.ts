import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
import { RegistrationDto } from './dto/registration.dto';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private jwt;
    private readonly userService;
    private configService;
    constructor(jwt: JwtService, userService: UserService, configService: ConfigService);
    EXPIRE_DAY_REFRESH_TOKEN: number;
    REFRESH_TOKEN_NAME: string;
    login(dto: AuthDto): Promise<{
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
        accessToken: string;
        refreshToken: string;
    }>;
    getProfile(accessToken: string): Promise<{
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
    }>;
    register(dto: RegistrationDto): Promise<{
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
        accessToken: string;
        refreshToken: string;
    }>;
    private issueTokens;
    private validateUser;
    getNewTokens(refreshToken: string): Promise<{
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
        accessToken: string;
        refreshToken: string;
    }>;
    addTokensToResponse(res: Response, accessToken: string, refreshToken: string): void;
    removeRefreshTokenToResponse(res: Response): void;
}
