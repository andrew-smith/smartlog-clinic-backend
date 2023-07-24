import { badRequest } from "@hapi/boom";
import { UploadDataRequest } from "../types/UploadDataRequest";

export async function uploadData(data: UploadDataRequest) {

    if(data.cmd !== "uploadData") {
        throw badRequest('Invalid command');
    }

    const records = data.data;

    console.log(`received ${records.length} records`);

    return {
        return: {
            code: "OK"
        }
    };
}