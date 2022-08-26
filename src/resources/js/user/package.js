const imgDiv = document.querySelector('.column-left-img'),
    img = document.querySelector('#photo'),
    file = document.querySelector('#file'),
    uploadBtn = document.querySelector('#uploadBtn');



//if user hover on img div 
imgDiv.addEventListener('mouseenter', function () {
    uploadBtn.style.display = "block";
});


//if we hover out from img div

imgDiv.addEventListener('mouseleave', function () {
    uploadBtn.style.display = "none";

});

file.addEventListener('change', function () {
    const choosedFile = this.files[0];

    if (choosedFile) {

        const reader = new FileReader(); //FileReader is a predefined function of JS

        reader.addEventListener('load', function () {
            img.setAttribute('src', reader.result);
        });

        reader.readAsDataURL(choosedFile);
    }
});






