import { SmartlogClinicPlugin } from "../types/Plugin";

// load dotenv
import * as dotenv from "dotenv";
dotenv.config();

const LOADED_PLUGINS : SmartlogClinicPlugin[] = [];

export async function initPlugins() {

    if(process.env.ENABLE_NIGHTSCOUT) {
        LOADED_PLUGINS.push(new (await import("./Nightscout")).Nightscout());    
    }

    for(const plugin of LOADED_PLUGINS) {
        try {
            await plugin.init();
        }
        catch(e) {
            console.error(`Failed to initialize plugin ${plugin.constructor.name}`, e);
        }
    }
}