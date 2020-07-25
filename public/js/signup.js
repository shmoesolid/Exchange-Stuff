$(document).ready(function() {

    // references
    var signUpForm = $("form.signup");
    var emailInput = $("input#email-input");
    var passwordInput = $("input#password-input");

    // submit listener
    signUpForm.on("submit", function(event) {

        event.preventDefault();

        // set data obj
        var userData = {
            email: emailInput.val().trim(),
            password: passwordInput.val().trim()
        };

        // clear inputes
        emailInput.val("");
        passwordInput.val("");

        // check if empty
        if (!userData.email || !userData.password)
            return;

        // attempt signup
        signUpUser(userData.email, userData.password);
        
    });

    // attempt user signup
    function signUpUser(email, password) 
    {
        $.post("/api/signup", {
            email: email,
            password: password
        })
        .then(function(data) {
            window.location.replace("/dashboard");

            // handle any other errors
        })
        .catch(handleLoginErr);
    }

    // handle error
    function handleLoginErr(err) 
    {
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
    }
});