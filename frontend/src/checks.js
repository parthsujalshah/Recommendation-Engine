export const validReader = () => {
    const reader = localStorage.getItem('readername');
    if (reader === null || reader === undefined || reader === '') {
        return false;
    }
    return true;
}