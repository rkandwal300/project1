export function isCCA() {
    if (typeof window === 'undefined') return false;
    return window.location.href.includes('cca') || window.location.hostname.includes('cca');
}

export function isEIA() {
    if (typeof window === 'undefined') return false;
    return window.location.href.includes('eia') || window.location.hostname.includes('eia');
}