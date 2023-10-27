/* Do you use class or interface,
 * For the most part, data objects like DTO does not require additional logic so we don't need to use a class
 * If you need to give a certain data object additional logic and methods like toString and still want to maintain that objects specificity
 * Convert the object "type/interface" to a class
 * */
export interface AuthTO {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    refreshToken: string;
    accessToken: string;
}

/* Referring to the commented code below, we always choose the appropriate type using the interface below to model our data*/

// export interface AuthExtendedTO extends  AuthTO {
//     // Will have the additional properties above as well
//     somethingStr: string;
//     somethingNum: number;
// }

// export interface AuthOtherExtendedTO extends  AuthTO {
//     // Will have the additional properties above as well
//     something1: string;
//     something2: number;
// }
