document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('addUserForm');
    const usuariosTableBody = document.querySelector('#usuariosTable');

    const fetchUsuarios = () => {
        fetch('/api/employers')
            .then(response => response.json())
            .then(data => {
                usuariosTableBody.innerHTML = '';
                data.forEach(usuario => {
                    const row = `
                    <tr class="bg-white border-b hover:bg-gray-100">
                        <td class="px-4 py-2">${usuario.id}</td>
                        <td class="px-4 py-2">${usuario.nome}</td>
                        <td class="px-4 py-2">${usuario.email}</td>
                        <td class="px-4 py-2">${usuario.situacao}</td>
                        <td class="px-4 py-2">${usuario.data_admissao}</td>
                        <td class="px-4 py-2">${new Date(usuario.created_at).toLocaleString()}</td>
                        <td class="px-4 py-2">${new Date(usuario.updated_at).toLocaleString()}</td>
                    </tr>
                    `;
                    usuariosTableBody.insertAdjacentHTML('beforeend', row);
                });
            });
    };

    form.addEventListener('submit', e => {
        e.preventDefault();
        const data = Array.from(form.elements)
            .filter(input => input.name) // Filtra inputs com nome
            .reduce((acc, input) => {
                acc[input.name] = input.value;
                return acc;
            }, {});

        fetch('/api/create/employer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(() => {
            fetchUsuarios(); 
            form.reset(); 
        })
        .catch(error => console.error('Error:', error));
    });

    fetchUsuarios(); 
});
