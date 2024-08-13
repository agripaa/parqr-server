declare class UserPayloadDto {
    username: string;
    password: string;
    image?: any;
}
export declare class OperatorPayloadDto extends UserPayloadDto {
    NIK: string;
}
export declare class OwnerPayloadDto extends UserPayloadDto {
    email: string;
}
export {};
