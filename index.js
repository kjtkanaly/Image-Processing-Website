const white = '#fdffff';
const blue = '#010081';
const teal = '#008080';
const black = '#000000';
const darkGray = '#818181';
const lightGray = '#c3c3c3';
const pink = '#ff0081';

var MainImage;
var ImageLabel
const newImgs = [];
const newImgsNames = [
    "lena.jpg",
    "peppers.jpg",
    "suzi.jpg",
    "ct_scan.jpg",
    "boat.jpg",
    "lady.jpg",
    "actontown.jpg",
    "johnny.jpg",
    "cameraman.jpg",
    "salesman.jpg",
    "head.jpg",
    "tiffany.jpg"
];
const newImgsLabels = [
    "Lena",
    "Peppers",
    "Suzi",
    "CT-Scan",
    "Boat",
    "Lady",
    "Actontown",
    "Johnny",
    "Cameraman",
    "Salesman",
    "Head",
    "Tiffany"
];

function OnLoadEvent() {
    document.getElementById("Default-Image").style.backgroundColor = white;
    document.getElementById("Default-Nav").style.backgroundColor = white;

    // Grabbing the Main image element
    MainImage = document.getElementById('Image1');
    MainImage.width = "516";

    // Preloading all image options
    for (let i = 0; i < 12; i++) 
    {
        newImgs[i] = new Image();
        newImgs[i].src = ("Images/" + newImgsNames[i]);
    }

    // Grabbing the image label
    ImageLabel = document.getElementById("Image1Label");
    ImageLabel.textContent = newImgsLabels[0];

}

function SelectImage(element) {
    let Options = document.getElementsByClassName("img-li");
    
    // De-Highlighing the previous image
    for (let i = 0; i < Options.length; i++)
    {
        // Debug
        //console.log(Options[i].textContent + " " + Options[i].style.backgroundColor);

        if (Options[i].style.backgroundColor == "rgb(253, 255, 255)")
        { 
            Options[i].style.backgroundColor = lightGray;
            break;
        }
    }

    // Highlighting the current image
    element.style.backgroundColor = white;

    // Displaying the current image
    for (let i = 0; i < Options.length; i++)
    {
        if (Options[i] == element)
        {
            MainImage.src = newImgs[i].src;    
            MainImage.width = "516";

            ImageLabel.textContent = newImgsLabels[i];
        }
    }
}

function SelectNav(element) {
    let Options = document.getElementsByClassName("nav-li");
    
    for (let i = 0; i < Options.length; i++)
    {
        // Debug
        //console.log(Options[i].textContent + " " + Options[i].style.backgroundColor);

        if (Options[i].style.backgroundColor == "rgb(253, 255, 255)")
        { 
            Options[i].style.backgroundColor = lightGray;
            break;
        }
    }

    element.style.backgroundColor = white;
}

function HighlightImage(element) {
    if (element.style.backgroundColor != "rgb(253, 255, 255)")
    {
        element.style.backgroundColor = darkGray;
    }
}

function DeHighlightImage(element) {
    if (element.style.backgroundColor != "rgb(253, 255, 255)")
    {
        element.style.backgroundColor = lightGray;
    }
}

function dipSelect(evt) {
    tabs = document.getElementsByClassName("tablinks");
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].className = tabs[i].className.replace(" active", "");
    }

    evt.currentTarget.className += " active";
}