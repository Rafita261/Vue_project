const AddTeacher = {
    template: `
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
            <h1 style="text-align: center; color: #333;">Ajouter un enseignant</h1>
            <form @submit.prevent="addTeacher" style="display: flex; flex-direction: column; gap: 15px;">
                <div style="display: flex; flex-direction: column;">
                    <label for="nom" style="font-weight: bold; margin-bottom: 5px;">Nom :</label>
                    <input type="text" id="nom" v-model="newTeacher.nom" required 
                        style="padding: 10px; border: 1px solid #ccc; border-radius: 4px; font-size: 16px;" />
                </div>
                <div style="display: flex; flex-direction: column;">
                    <label for="nbheures" style="font-weight: bold; margin-bottom: 5px;">Nombre d'heures :</label>
                    <input type="number" id="nbheures" v-model="newTeacher.nbheures" required 
                        style="padding: 10px; border: 1px solid #ccc; border-radius: 4px; font-size: 16px;" />
                </div>
                <div style="display: flex; flex-direction: column;">
                    <label for="tauxhoraire" style="font-weight: bold; margin-bottom: 5px;">Taux horaire :</label>
                    <input type="number" id="tauxhoraire" v-model="newTeacher.tauxhoraire" required 
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
                num_ens: null,
                nom: '',
                nbheures: '',
                tauxhoraire: ''
            }
        };
    },
    methods: {
        async addTeacher() {
            if (this.newTeacher.nom && this.newTeacher.nbheures && this.newTeacher.tauxhoraire) {
            try {
                const teacherData = {
                num_ens: null, 
                nom: this.newTeacher.nom,
                nbheures: this.newTeacher.nbheures,
                tauxhoraire: this.newTeacher.tauxhoraire
                };
                console.log(teacherData);
                
                const response = await fetch('http://localhost/vue_back/Controllers/index.php/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(teacherData)
                });
                if (response.ok) {
                const result = await response.json();
                if (result.error) {
                    alert(result.error);
                } else {
                    alert(`Enseignant créé avec succès. Numéro: ${result.num_ens}`);
                    this.newTeacher.num_ens = null;
                    this.newTeacher.nom = '';
                    this.newTeacher.nbheures = '';
                    this.newTeacher.tauxhoraire = '';
                }
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

export default AddTeacher;