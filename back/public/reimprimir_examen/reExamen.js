async function pdfExterno() {
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    try {

        const { data } = await axios.get(
            "/api/espejo/get-externos-pdf",
            { params: { id } }
        );
        document.getElementById("pdfExternoEmbed").src = data;

    } catch (error) {

    }
}

async function reimprimirExamen() {
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    try {

        const { data } = await axios.get(
            "/api/espejo/reimpresion-examen",
            { params: { id } }
        );
        //document.getElementById("pdfExternoEmbed").src = data;

    } catch (error) {

    }
}