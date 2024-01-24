const subirImagen = async () => {
  try {
    const imagen = document.getElementById("file");

    console.log("🚀 ~ subirImagen ~ imagen.files[0]:", imagen.files[0]);
    const reader = new FileReader();
    reader.readAsDataURL(imagen.files[0]);

    reader.onload = async () => {
      const imgRes = reader.result;
      console.log("🚀 ~ reader.onload= ~ imgRes:", imgRes);

      const { data } = await axios.post(urlsv + "/api/users/imagen", {
        cedula: "123",
        nombre: "Fabian Silva",
        colegio: "111",
        img: imgRes,
      });
      console.log("🚀 ~ reader.onload= ~ data:", data);

      var imageUrl = await new Blob([new Uint8Array(data.img.data)], {
        type: "image/jpeg",
      }).text();

      const imgPrueba = document.getElementById("imgPrueba");
      imgPrueba.src = imageUrl;
    };
  } catch (error) {
    console.log(error);
  }
};
