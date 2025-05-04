const AddTeacher = {
    template: `
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
            <h1 style="text-align: center; color: #333;">Ajouter un enseignant</h1>
            <form @submit.prevent="addTeacher" style="display: flex; flex-direction: column; gap: 15px;">
                <div style="display: flex; flex-direction: column;">
                    <label for="name" style="font-weight: bold; margin-bottom: 5px;">Nom :</label>
                    <input type="text" id="name" v-model="newTeacher.name" required 
                        style="padding: 10px; border: 1px solid #ccc; border-radius: 4px; font-size: 16px;" />
                </div>
                <div style="display: flex; flex-direction: column;">
                    <label for="subject" style="font-weight: bold; margin-bottom: 5px;">Matière :</label>
                    <input type="text" id="subject" v-model="newTeacher.subject" required 
                        style="padding: 10px; border: 1px solid #ccc; border-radius: 4px; font-size: 16px;" />
                </div>
                <button type="submit" 
                    style="padding: 10px 20px; background-color: #4CAF50; color: white; border: none; border-radius: 4px; font-size: 16px; cursor: pointer;">
                    Ajouter
                </button>
            </form>
        </div>
    `,
    data() {
        return {
            newTeacher: {
                name: '',
                subject: ''
            }
        };
    },
    methods: {
        async addTeacher() {
            if (this.newTeacher.name && this.newTeacher.subject) {
                try {
                    const response = await fetch('http://localhost/vue_back/Controllers/enseignant.php/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(this.newTeacher)
                    });
                    if (response.ok) {
                        alert(`Enseignant ajouté : ${this.newTeacher.name} (${this.newTeacher.subject})`);
                        this.newTeacher.name = '';
                        this.newTeacher.subject = '';
                    } else {
                        alert('Erreur lors de l\'ajout de l\'enseignant.');
                    }
                } catch (error) {
                    console.error('Erreur:', error);
                    alert('Erreur de connexion au serveur.');
                }
            } else {
                alert('Veuillez remplir tous les champs.');
            }
        }
    }
};

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
                const response = await fetch('http://localhost/vue_back/Controllers/enseignant.php/');
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
                    const response = await fetch(`http://localhost/vue_back/Controllers/enseignant.php/${teacher.num_ens}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ 
                            ...teacher, 
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
                    const response = await fetch(`http://localhost/vue_back/Controllers/enseignant.php/${num_ens}`, {
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
const Home = {
    template: `
        <div style="text-align: center; padding: 20px;">
            <h1>Bienvenue sur le tableau de bord</h1>
            <p>Utilisez le menu pour naviguer.</p>
        </div>
    `
};
const Chart = {
    template: `
        <div style="text-align: center; padding: 20px;">
            <h1>Graphique des enseignants</h1>
            <canvas id="teacherChart" width="400" height="200"></canvas>
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
                const response = await fetch('http://localhost/vue_back/Controllers/enseignant.php/');
                if (response.ok) {
                    this.teachers = await response.json();
                    this.renderChart();
                } else {
                    alert('Erreur lors de la récupération des enseignants.');
                }
            } catch (error) {
                console.error('Erreur:', error);
                alert('Erreur de connexion au serveur.');
            }
        },
        renderChart() {
            const ctx = document.getElementById('teacherChart').getContext('2d');
            const labels = this.teachers.map(teacher => teacher.nom);
            const data = this.teachers.map(teacher => teacher.salaire);

            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Salaire des enseignants',
                        data: data,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    },
    mounted() {
        this.fetchTeachers();
    }
};
const routes = [
    { path: '/', component: Home },
    { path: '/chart', component: Chart },
    { path: '/add-teacher', component: AddTeacher },
    { path: '/list-update', component: ListAndUpdate }
];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes
});

const app = Vue.createApp({});
app.use(router);
app.mount('#app');