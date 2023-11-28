(function() {
    "use strict";

    let forms = document.querySelectorAll('.php-email-form');

    forms.forEach(function(e) {
        e.addEventListener('submit', function(event) {
            event.preventDefault();

            let thisForm = this;

            let method = thisForm.getAttribute('method');
            // let recaptcha = thisForm.getAttribute('data-recaptcha-site-key');

            if (!method) {
                displayError(thisForm, 'The form action property is not set!')
                return;
            }
            // thisForm.querySelector('.loading').classList.add('d-block');
            thisForm.querySelector('.loading').classList.add('d-block');
            setTimeout(() => {
                thisForm.querySelector('.loading').classList.remove('d-block');
                thisForm.querySelector('.sent-message').classList.add('d-block');
                thisForm.reset();

            }, 300);
            setTimeout(() => {
                thisForm.querySelector('.sent-message').classList.remove('d-block');
            }, 3000);



        });
    });

})();