declare class UserPayloadDto {
    username: string;
    NIK: string;
    image?: any;
}
export declare class OperatorPayloadDto extends UserPayloadDto {
    NIK: string;
}
export declare class OwnerPayloadDto extends UserPayloadDto {
    email: string;
}
export {};
