import { Boom, badRequest } from "@hapi/boom";
import { LoginRequest } from "../types/LoginRequest";


export async function loginRequest(login: LoginRequest) {

    if(login.cmd !== "loginDoctor") {
        throw badRequest('Invalid command');
    }

    // expecting user_id and user_pw_hashed
    if(login.data.length !== 1) {
        throw badRequest('Invalid data');
    }

    const { user_id, user_pw_hashed } = login.data[0];

    // automatically log in
    return {
        return: {
            code: "OK"
        },
        doctor: {
            access_token: "aaaa",
            refresh_token: "bbbb",
            user_idx: "123"
        }
    };
}

