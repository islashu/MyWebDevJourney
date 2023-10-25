/* This is interface is used as TO for signing and decoding of jwt token */
export interface JwtObject {
    userInfo: {
        username: string;
    };
}
