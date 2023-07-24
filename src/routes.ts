import { Boom, badRequest } from "@hapi/boom";
import { loginRequest } from "./apis/login";
import { LoginRequest } from "./types/LoginRequest";
import { SmartClinicGenericRequest } from "./types/SmartClinicGenericRequest";
import { uploadData } from "./apis/uploadData";
import { UploadDataRequest } from "./types/UploadDataRequest";


/**
 * Handles POST requests to this server
 */
export async function handlePost(body: SmartClinicGenericRequest) {

    console.log(body);

    switch(body.cmd) {
        case 'loginDoctor': return loginRequest(body as LoginRequest);
        case 'uploadData': return uploadData(body as UploadDataRequest);
        default: return invalidCommand(body);

    }

}

async function invalidCommand(body: any) {

    console.log("Unknown command: " + body.cmd);
    throw badRequest('Invalid command');
}
