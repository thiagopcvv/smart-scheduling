export function maskCpf(value: string) {
    if (value.length > 14) {
        return value.substring(0, 14);
    }
    return value
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})/, "$1-$2");
}
