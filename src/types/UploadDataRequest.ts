import { SmartClinicGenericLoggedInRequest } from "./SmartClinicGenericRequest";

export type UploadDataRequest = SmartClinicGenericLoggedInRequest & {
    data: UploadData[];
};

export type UploadData = {
    user_idx: string;
    dDate: string;
    time: string;
    exercise: string;
    exercise_value: string;
    exercise_unit: string;
    flag_fasting: string;
    flag_ketone: string;
    flag_meal: string;
    meal_slot: string;
    flag_nomark: string;
    glucose_data: string;
    manual_entry: string;
    device_id: string;
    flag_hilo: string;
    flag_cs: string;
    kt_manual_entry: string;
    glucose_unit: string;
    carb_value: string;
    carb_unit: string;
    insulin_type: string;
    insulin_amount: string;
    flag_delete: string;
}
