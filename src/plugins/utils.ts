
/**
 * Get an environment variable that is required. If not found then it will throw an error.
 */
export function getEnvVarOrThrow(name: string) : string {
    const value = process.env[name];
    if(!value) {
        throw new Error(`Missing environment variable ${name}`);
    }
    return value;
}

/**
 * Get an environment variable that is optional. If not found then it will return the default value.
 */
export function getEnvVarOrDefault(name: string, defaultValue: string) : string {
    const value = process.env[name];
    if(!value) {
        return defaultValue;
    }
    return value;
}
