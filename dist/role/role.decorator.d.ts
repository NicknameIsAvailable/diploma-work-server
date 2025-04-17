import { EUserRole } from 'src/user/dto/create-user.dto';
export declare const ROLES_KEY = "roles";
export declare const Roles: (...roles: EUserRole[]) => import("@nestjs/common").CustomDecorator<string>;
