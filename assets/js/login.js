const mobileNavShow = document.querySelector('.mobile-nav-show');
const mobileNavHide = document.querySelector('.mobile-nav-hide');

document.querySelectorAll('.mobile-nav-toggle').forEach(el => {
    el.addEventListener('click', function(event) {
        event.preventDefault();
        mobileNavToogle();
    })
});

function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavShow.classList.toggle('d-none');
    mobileNavHide.classList.toggle('d-none');
}

document.querySelectorAll('#navbar a').forEach(navbarlink => {

    if (!navbarlink.hash) return;

    let section = document.querySelector(navbarlink.hash);
    if (!section) return;

    navbarlink.addEventListener('click', () => {
        if (document.querySelector('.mobile-nav-active')) {
            mobileNavToogle();
        }
    });

});

function validate() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    if (username == "admin" && password == "admin") {
        alert("Login successful");
        window.location.replace("index.html");
        return false;
    } else {
        alert("Please enter both username and password");
        return false;
    }
}