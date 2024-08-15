document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('multiStepForm');
    const steps = form.querySelectorAll('.step');
    const prevButton = form.querySelector('.prev');
    const nextButton = form.querySelector('.next');
    let currentStep = 0;

    updateButtons();

    nextButton.addEventListener('click', () => {
        if (validateForm()) {
            steps[currentStep].classList
                                .remove('active');
            currentStep++;
            steps[currentStep].classList
                                .add('active');
            updateButtons();
        }
    });

    prevButton.addEventListener('click', () => {
        steps[currentStep].classList
                            .remove('active');
        currentStep--;
        steps[currentStep].classList
                            .add('active');
        updateButtons();
    });

    form.addEventListener('submit', (event) => {
        if (!validateForm()) {
            event.preventDefault();
        }
    });

    function validateForm() {
        const currentInputs = steps[currentStep]
            .querySelectorAll('input, textarea');
        let valid = true;
        currentInputs.forEach(input => {
            if (!input.checkValidity()) {
                input.reportValidity();
                valid = false;
            }
        });
        return valid;
    }

    function updateButtons() {
        if (currentStep === 0) {
            prevButton.style.display = 'none';
        } else {
            prevButton.style.display = 'inline-block';
        }

        if (currentStep === steps.length - 1) {
            nextButton.style.display = 'none';
            form.querySelector('button[type="submit"]')
                  .style.display = 'inline-block';
        } else {
            nextButton.style.display = 'inline-block';
            form.querySelector('button[type="submit"]')
                  .style.display = 'none';
        }
    }
});