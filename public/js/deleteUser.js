document.addEventListener("click", async function (e) {

    const btn = e.target.closest(".btn-delete-user");
    if (!btn) return;

    const id = btn.dataset.id;
    const nombre = btn.dataset.name;

    const confirmar = confirm(`¿Eliminar usuario ${nombre}?`);
    if (!confirmar) return;

    try {

        const response = await fetch(`/users/${id}`, {
            method: "DELETE"
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        alert(data.message);

        location.reload();

    } catch (err) {

        console.error(err);
        alert("Error al eliminar usuario");

    }

});
