import * as dotenv from 'dotenv';

dotenv.config()

export default {
    UserBaseUrl: process.env.API_KEY ?? '',
    EtlUrl: process.env.API_KEY_SECRET ?? '',
    BearerToken: process.env.BEARER_TOKEN ?? '',
    EndpointUrl: process.env.ENDPOINT_URL ?? '',
}