document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('leadForm');
    const steps = document.querySelectorAll('.form-step');
    const nextBtns = document.querySelectorAll('.btn-next');
    const prevBtns = document.querySelectorAll('.btn-prev');
    const stepIndicator = document.getElementById('step-indicator');
    const stepInfo = document.getElementById('step-info');
    const submitBtn = document.getElementById('submit-btn');
    let currentStep = 0;

    // Fonction principale pour afficher l'étape
    function showStep(stepIndex) {
        // Cacher toutes les étapes
        steps.forEach(step => step.classList.remove('active'));

        // Afficher l'étape désirée
        steps[stepIndex].classList.add('active');
        currentStep = stepIndex;

        // Mise à jour visuelle de la progression
        const stepNumber = currentStep + 1;
        stepInfo.textContent = `Étape ${stepNumber} sur 3 - ${steps[stepIndex].querySelector('h2').textContent.split('. ')[1]}`;
        stepIndicator.className = `step-${stepNumber}`; // Application des classes CSS pour l'animation
    }

    // Gestion du bouton SUIVANT
    nextBtns.forEach(button => {
        button.addEventListener('click', function() {
            const currentFields = steps[currentStep].querySelectorAll('[required]');
            let allValid = true;

            // 1. Validation de l'étape actuelle
            currentFields.forEach(field => {
                if (!field.checkValidity()) {
                    allValid = false;
                    field.reportValidity();
                }
            });

            // 2. Si valide, on passe à l'étape suivante
            if (allValid && currentStep < steps.length - 1) {
                showStep(currentStep + 1);
            }
        });
    });

    // Gestion du bouton RETOUR
    prevBtns.forEach(button => {
        button.addEventListener('click', function() {
            if (currentStep > 0) {
                showStep(currentStep - 1);
            }
        });
    });

    // Gestion de l'envoi final
    form.addEventListener('submit', function(e) {
        // Désactiver le bouton et indiquer le chargement pour éviter les doubles soumissions
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ENVOI EN COURS...';
        
        // La soumission Formspree gère l'envoi des données à votre email (arennaoui5@gmail.com)
        // et la redirection vers la page de remerciement spécifiée dans le HTML.
    });

    // Afficher la première étape au chargement
    showStep(0);
});
