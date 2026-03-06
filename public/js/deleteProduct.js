document.addEventListener("click", async function (e) {
    const btn = e.target.closest(".btn-delete-product");
    if (!btn) return;

    const id = btn.dataset.id;
    const nombre = btn.dataset.nombre;

    const confirmado = confirm(`¿Eliminar producto ${nombre}?`);
    if (!confirmado) return;

    try {
        const response = await fetch(`/api/productos/${id}`, {
            method: "DELETE"
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Error al eliminar producto");
        }

        alert(data.message || "Producto eliminado correctamente");
        window.location.reload();
    } catch (error) {
        console.error("Error al eliminar:", error);
        alert("No se pudo eliminar el producto");
    }
});
