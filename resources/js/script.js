import Swal from 'sweetalert2';
window.Swal = Swal;

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('addEmployerForm');
    const employersTableBody = document.querySelector('#employersTable');

    const fetchEmployers = () => {
        fetch('/api/employers')
            .then(response => response.json())
            .then(data => {
               employersTableBody.innerHTML = '';
                data.forEach(employer => {
                    const row = `
                    <tr class="bg-white border-b hover:bg-gray-100">
                        <td class="px-4 py-2">${employer.id}</td>
                        <td class="px-4 py-2">${employer.nome}</td>
                        <td class="px-4 py-2">${employer.email}</td>
                        <td class="px-4 py-2">${employer.situacao}</td>
                        <td class="px-4 py-2">${employer.data_admissao}</td>
                        <td class="px-4 py-2">${new Date(employer.created_at).toLocaleString()}</td>
                        <td class="px-4 py-2">${new Date(employer.updated_at).toLocaleString()}</td>
                    </tr>
                    `;
                   employersTableBody.insertAdjacentHTML('beforeend', row);
                });
            });
    };

    form.addEventListener('submit', e => {
        e.preventDefault();
        const data = Array.from(form.elements)
            .filter(input => input.name) 
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
            Swal.fire({
                icon: 'success',
                title: `Novo Empregado adicionado com sucesso`,
                text: `Foi adicionado o usuário ${data.nome}`,
                confirmButtonText: 'Fechar',
                confirmButtonColor: "green"

            });
            fetchEmployers(); 
            form.reset(); 
        })
        .catch(error => {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Erro!',
                text: 'Não foi possível adicionar o usuário. Tente novamente.',
                confirmButtonText: 'Fechar',
                confirmButtonColor: "red"
            });
        });
    });

    fetchEmployers(); 
});
