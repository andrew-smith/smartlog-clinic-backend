import { SmartClinicGenericRequest } from "./SmartClinicGenericRequest";

export type LoginRequest  = SmartClinicGenericRequest & {
    cmd: 'loginDoctor';
    data: {
        user_id: string;
        user_pw_hashed: string;
    }[];
};
