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
                const response = await fetch('http://localhost/vue_back/Controllers/index.php/enseignants');
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

export default Chart;