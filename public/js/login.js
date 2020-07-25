$(document).ready(function() {
    
    // get references
    var loginForm = $("form.login");
    var emailInput = $("input#email-input");
    var passwordInput = $("input#password-input");

    // form submission listener
    loginForm.on("submit", function(event) {

        event.preventDefault();
        
        // get user input data
        var userData = {
            email: emailInput.val().trim(),
            password: passwordInput.val().trim()
        };

        // clear inputs
        emailInput.val("");
        passwordInput.val("");

        // validate data not empty TODO more exact data validation
        if (!userData.email || !userData.password)
            return;

        // attempt login
        loginUser(userData.email, userData.password);
    });

    // login user function api call
    function loginUser(email, password) {
        $.post("/api/login", {
            email: email,
            password: password
        })
        .then(function() { 
            window.location.replace("/dashboard");
        })
        .catch(function(err) { 
            console.log(err);
            // do more stuff with error
        });
    }
});
  