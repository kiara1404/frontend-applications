async function getDataSet(url) {

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;

    } catch (err) {
        console.log(err)

    }

}

export default getDataSet;