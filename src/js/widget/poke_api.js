export const webHelperFetch = async (payload) => {
    let result = null;
    await fetch(payload)
        .then(response => response.json())
        .then((data) => { result = data });
    return result
}

export default {}