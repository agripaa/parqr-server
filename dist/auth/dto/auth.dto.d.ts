declare class AuthPayloadDto {
    username: string;
    password: string;
}
export declare class OperatorPayloadDto extends AuthPayloadDto {
    NIK: string;
}
export declare class OwnerPayloadDto extends AuthPayloadDto {
    email: string;
    username: string;
}
export declare class OperatorSignPayloadDto extends AuthPayloadDto {
    NIK: string;
}
export declare class OwnerSignInPayloadDto extends AuthPayloadDto {
    email: string;
}
export {};
