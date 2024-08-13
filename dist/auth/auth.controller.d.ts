import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { OperatorPayloadDto, OwnerPayloadDto } from './dto/auth.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    operatorLogin(payload: OperatorPayloadDto, res: Response): Promise<Response<any, Record<string, any>>>;
    ownerLogin(payload: OwnerPayloadDto, res: Response): Promise<Response<any, Record<string, any>>>;
    registerOperator(payload: OperatorPayloadDto, req: Request, file: Express.Multer.File): Promise<import("../entities/users.entity").Users>;
    registerOwner(payload: OwnerPayloadDto): Promise<import("../entities/users.entity").Users>;
    profileOwner(req: Request): Promise<import("../entities/users.entity").Users>;
}
