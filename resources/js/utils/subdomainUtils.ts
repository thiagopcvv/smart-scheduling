export function SubdomainUtils() {
    const { host } = window.location;
    const baseUrl = import.meta.env.VITE_API_URL.replace("*.", "");
    const [subdomain] = host.split(".");

    function replaceSubdomain(baseUrl) {
        return baseUrl.replace("*", subdomain);
    }

    function cleanUrl(url) {
        return url.replace(/^https?:\/\/|:\d+/g, "");
    }

    const hasSubdomain =
        subdomain !== cleanUrl(baseUrl) &&
        host.includes(`.${cleanUrl(baseUrl)}`);

    return { subdomain, replaceSubdomain, hasSubdomain };
}
