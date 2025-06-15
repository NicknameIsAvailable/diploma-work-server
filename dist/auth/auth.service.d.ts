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
    }>;
    register(dto: RegistrationDto): Promise<{
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
        accessToken: string;
        refreshToken: string;
    }>;
    addTokensToResponse(res: Response, accessToken: string, refreshToken: string): void;
    removeRefreshTokenToResponse(res: Response): void;
}
