
export type SmartClinicGenericRequest = {
    cmd: string;
    ver: string;
    from: string;
}

export type SmartClinicGenericLoggedInRequest = SmartClinicGenericRequest & {
    access_token: string;
    refresh_token: string;
}
