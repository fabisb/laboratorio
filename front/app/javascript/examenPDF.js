const imprimir = async () => {
  document.getElementById("prueba").innerText = "modificacion";
  try {
      await imprimirPDF();
    
  } catch (error) {
    console.log("🚀 ~ imprimir ~ error:", error)
    
  }
};
