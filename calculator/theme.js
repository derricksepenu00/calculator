const $theme1 = document.getElementById("theme1");
const $theme2 = document.getElementById("theme2");
const $theme3 = document.getElementById("theme3");

//console.log($theme1, $theme2, $theme3);
[$theme1, $theme2, $theme3].forEach(function(each) {
    each.addEventListener('click', function() {
        //console.log(this);
        document.body.classList.remove("theme1");
        $theme1.classList.add("hidden");
        document.body.classList.remove("theme2");
        $theme2.classList.add("hidden");
        document.body.classList.remove("theme3");
        $theme3.classList.add("hidden");

        //document.body.id = "theme6"
        //console.log(this.id);
        document.body.classList.add(this.id);
        this.classList.remove("hidden");

    })
});