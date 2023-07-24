import { badRequest } from "@hapi/boom";
import { UploadDataRequest } from "../types/UploadDataRequest";
import { EventType, CLINIC_EVENTS } from "../services/Events";

export async function uploadData(data: UploadDataRequest) {

    if(data.cmd !== "uploadData") {
        throw badRequest('Invalid command');
    }

    const records = data.data;

    console.log(`received ${records.length} records`);

    records.forEach(record => {
        CLINIC_EVENTS.emit(EventType.NEW_RECORD, record);
    });

    return {
        return: {
            code: "OK"
        }
    };
}
