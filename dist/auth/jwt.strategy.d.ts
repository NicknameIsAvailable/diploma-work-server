import { UserService } from './../user/user.service';
import { ConfigService } from '@nestjs/config';
declare const JwtStrategy_base: new (...args: any) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    private userService;
    constructor(configService: ConfigService, userService: UserService);
    validate({ id }: {
        id: string;
    }): Promise<{
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
    }>;
}
export {};
