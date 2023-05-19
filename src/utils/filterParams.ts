export const filterParams = (searchParams: Record<string, string>) => {

    const params: Record<string, string> = searchParams

    for (let param in params) {
        if (params[param] === '' || params[param] === '0') {
            delete params[param]
        }
    }
    return params
}