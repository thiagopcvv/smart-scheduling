import axios from "axios";
import {SubdomainUtils} from '@/utils/subdomainUtils';

const { replaceSubdomain, hasSubdomain } = SubdomainUtils();

const baseURL = hasSubdomain
    ? replaceSubdomain(import.meta.env.VITE_API_URL)
    : import.meta.env.VITE_API_URL.replace("*.", "");

const api = axios.create({
    baseURL,
});

export default api;
