export const redirect = (history, target, params) => {
    let paramString = params ? Object.keys(params).map((p) => `${p}=${params[p]}`).join('&') : '';
    history.push(target + "?" + paramString);
};

export const createRedirect = (history, to, keys) => {
    return (data, index) =>
        redirect(history, to,
            keys.reduce((prev, curr) => { return { ...prev, [curr]: data[curr] } }, {})
        );
}