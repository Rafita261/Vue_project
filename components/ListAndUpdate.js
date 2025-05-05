const ListAndUpdate = {
    template: `
        <div>
            <h1>Listage et mise à jour</h1>
            <table style="width: 100%; text-align: left; border-collapse: collapse;">
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Nb Heures</th>
                        <th>Taux Horaire</th>
                        <th>Salaire</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(teacher, index) in teachers" :key="teacher.num_ens">
                        <td>{{ teacher.nom }}</td>
                        <td>{{ teacher.nbheures }}</td>
                        <td>{{ teacher.tauxhoraire }}</td>
                        <td>{{ teacher.salaire }}</td>
                        <td>
                            <button @click="updateTeacher(teacher)" style="padding: 5px 10px; background-color: #4CAF50; color: white; border: none; cursor: pointer;">
                                Mettre à jour
                            </button>
                            <button @click="deleteTeacher(teacher.num_ens)" style="padding: 5px 10px; background-color: #f44336; color: white; border: none; cursor: pointer;">
                                Supprimer
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    `,
    data() {
        return {
            teachers: []
        };
    },
    methods: {
        async fetchTeachers() {
            try {
                const response = await fetch('http://localhost/vue_back/Controllers/index.php/enseignants');
                if (response.ok) {
                    this.teachers = await response.json();
                } else {
                    alert('Erreur lors de la récupération des enseignants.');
                }
            } catch (error) {
                console.error('Erreur:', error);
                alert('Erreur de connexion au serveur.');
            }
        },
        async updateTeacher(teacher) {
            const newNbHeures = prompt(`Nouveau nombre d'heures pour ${teacher.nom}:`, teacher.nbheures);
            const newTauxHoraire = prompt(`Nouveau taux horaire pour ${teacher.nom}:`, teacher.tauxhoraire);
            if (newNbHeures && newTauxHoraire) {
                try {
                    const response = await fetch(`http://localhost/vue_back/Controllers/index.php/update`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ 
                            num_ens: teacher.num_ens,
                            nom: teacher.nom,
                            nbheures: newNbHeures, 
                            tauxhoraire: newTauxHoraire 
                        })
                    });
                    if (response.ok) {
                        teacher.nbheures = newNbHeures;
                        teacher.tauxhoraire = newTauxHoraire;
                        teacher.salaire = newNbHeures * newTauxHoraire; // Recalculer le salaire
                        alert(`Informations mises à jour pour ${teacher.nom}`);
                    } else {
                        alert('Erreur lors de la mise à jour.');
                    }
                } catch (error) {
                    console.error('Erreur:', error);
                    alert('Erreur de connexion au serveur.');
                }
            }
        },
        async deleteTeacher(num_ens) {
            if (confirm('Êtes-vous sûr de vouloir supprimer cet enseignant ?')) {
                try {
                    const response = await fetch(`http://localhost/vue_back/Controllers/index.php/delete/${num_ens}`, {
                        method: 'DELETE'
                    });
                    if (response.ok) {
                        this.teachers = this.teachers.filter(teacher => teacher.num_ens !== num_ens);
                        alert('Enseignant supprimé.');
                    } else {
                        alert('Erreur lors de la suppression.');
                    }
                } catch (error) {
                    console.error('Erreur:', error);
                    alert('Erreur de connexion au serveur.');
                }
            }
        }
    },
    mounted() {
        this.fetchTeachers();
    }
};

export default ListAndUpdate;