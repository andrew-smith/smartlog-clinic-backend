import { SmartlogClinicPlugin } from "../types/Plugin";

export class Nightscout implements SmartlogClinicPlugin {

    async init() {
        console.log("Nightscout plugin initializing...");



        console.log("Nightscout plugin initialized");
    }
}
