$(document).ready(function() {
    var ajaxRequest; // The variable that makes Ajax possible!
    function ajaxFunction() {
        try {

            // Opera 8.0+, Firefox, Safari
            ajaxRequest = new XMLHttpRequest();
        } catch (e) {

            // Internet Explorer Browsers
            try {
                ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {

                try {
                    ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e) {

                    // Something went wrong
                    alert("Your browser broke!");
                    return false;
                }
            }
        }
    }

    function postLogin() {
        ajaxFunction();

        // Here processRequest() is the callback function.
        ajaxRequest.onreadystatechange = processRequest;

        var url = "/ajax/user/login";
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;

        ajaxRequest.open("POST", "/ajax/user/login", true);
        ajaxRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        ajaxRequest.send("email=" + email + "&password=" + password);

    }

    function processRequest() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("error_login").innerHTML = this.responseText;
        }
    }

    $("#btn_submit").click(postLogin);
});