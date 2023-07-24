import { CLINIC_EVENTS, EventType } from "../services/Events";
import { SmartlogClinicPlugin } from "../types/Plugin";
import { UploadData } from "../types/UploadDataRequest";
import { getEnvVarOrDefault, getEnvVarOrThrow } from "./utils";

export class Nightscout implements SmartlogClinicPlugin {



    async init() {
        console.log("Nightscout plugin initializing...");

        const host = getEnvVarOrThrow("NIGHTSCOUT_HOST");
        const port = getEnvVarOrDefault("NIGHTSCOUT_PORT", "1337");
        const token = getEnvVarOrThrow("NIGHTSCOUT_TOKEN");

        console.log(`Nightscout host: ${host}:${port}`);

        async function newRecord(record: UploadData) {
            console.log("New record received", record);

            const nightscoutUpload : NightscoutTreatment = {
                glucose: record.glucose_data,
                units: record.glucose_unit,
                created_at: record.time,
                enteredBy: record.device_id,
                glucoseType: "Finger"
            };

            fetch(`http://${host}:${port}/api/v1/treatments?token=${token}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(nightscoutUpload)
            });
        }
        
        CLINIC_EVENTS.on(EventType.NEW_RECORD, newRecord);

        console.log("Nightscout plugin initialized");
    }
}



export type NightscoutTreatment = {
    /** Internally assigned id. */
    _id?: string,

    /** The type of treatment event. */
    eventType?: string,

    /** The date of the event, might be set retroactively. */
    created_at?: string,

    /** Current glucose. */
    glucose?: string,

    /** Method used to obtain glucose, Finger or Sensor. */
    glucoseType?: string,

    /** Amount of carbs consumed in grams. */
    carbs?: number,

    /** Amount of protein consumed in grams. */
    protein?: number,

    /** Amount of fat consumed in grams. */
    fat?: number,

    /** Amount of insulin, if any. */
    insulin?: number,

    /** The units for the glucose value, mg/dl or mmol. */
    units?: string,

    /** The transmitter ID of the transmitter being started. */
    transmitterId?: string,

    /** The code used to start a Dexcom G6 sensor. */
    sensorCode?: string,

    /** Description/notes of treatment. */
    notes?: string,

    /** Who entered the treatment. */
    enteredBy?: string
};
