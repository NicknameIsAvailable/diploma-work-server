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
    }>;
}
export {};
