export function isValidCpf(cpf: string): boolean {
    const digits = cpf.replace(/\D/g, '');

    if (digits.length !== 11 || /^(\d)\1{10}$/.test(digits)) return false;

    for (const length of [9, 10]) {
        const sum = digits
            .slice(0, length)
            .split('')
            .reduce((acc, digit, i) => acc + parseInt(digit) * (length + 1 - i), 0);

        const expected = ((sum * 10) % 11) % 10;
        if (expected !== parseInt(digits[length])) return false;
    }

    return true;
}
