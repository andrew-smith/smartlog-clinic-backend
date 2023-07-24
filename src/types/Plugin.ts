

export interface SmartlogClinicPlugin {

    /** Called once on startup */
    init(): Promise<void>;
}
