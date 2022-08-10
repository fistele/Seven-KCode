/**
 * Auto Write
 */
 (function(){
    var i = 0;
    var txt = "ienvenu à Seven Kids Code !!!";
    var element = document.getElementById("write");

    typeWriter()
    function typeWriter () {
        if (i < txt.length) {
            element.innerHTML += txt.charAt(i);
            i++;
            setTimeout(typeWriter, 200);
        }

        if (i >= txt.length) {
            element.innerHTML = "B";
            i = 0;
        }
    }

    // const appForm = document.querySelector('.js-app-form');
    // if (appForm) {
        
    //     appForm.addEventListener("submit", function(e)  {

    //         e.preventDefault();

    //         const name = appForm.querySelector('input').value;
    //         const categorie = appForm.querySelector('select').value;
    //     });
    // } else {
        
    // }
})();