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
    "salesman.jpg",
    "cameraman.jpg",
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
    "Salesman",
    "Camera Man",
    "Head",
    "Tiffany"
];

function OnLoadEvent() {
    document.getElementById("Default-Nav").style.backgroundColor = white;

    // Grabbing the Main image element
    MainImage = document.getElementById('Image1');
    MainImage.width = "516";

    // Preloading all image options
    for (let i = 0; i < newImgsNames.length; i++) 
    {
        newImgs[i] = new Image();
        newImgs[i].src = ("Images/" + newImgsNames[i]);
    }

    // Grabbing the image label
    ImageLabel = document.getElementById("Image1Label");
    ImageLabel.textContent = newImgsLabels[0];

    // Setting the initial content to visible
    let content = document.getElementsByClassName("dip-tab-content dip-basics");

    for (let i = 0; i < content.length; i++) {
        content[i].style.display = "block";
    }
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

function imageSelect(evt) {
    let options = document.getElementsByClassName("imageLinks");

    for (let i = 0; i < options.length; i++) {
        options[i].className = options[i].className.replace(" active", "");
    }

    // Displaying the current image
    for (let i = 0; i < options.length; i++)
    {
        if (options[i] == evt.currentTarget)
        {
            MainImage.src = newImgs[i].src;    
            MainImage.width = "516";

            ImageLabel.textContent = newImgsLabels[i];
        }
    }

    evt.currentTarget.className += " active";
}

function dipSelect(evt) {
    let tabs = document.getElementsByClassName("tablinks");
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].className = tabs[i].className.replace(" active", "");
    }

    evt.currentTarget.className += " active";

    // Displaying the correct conent
    let content = document.getElementsByClassName("dip-tab-content");

    let classFlag = "";
    if (evt.currentTarget.id == "Basics-Tab") {
        classFlag = "dip-tab-content dip-basics";
    } 
    else {
        classFlag = "dip-tab-content dip-morph";
    }
    
    for (let i = 0; i < content.length; i++) {
        if (content[i].className == classFlag) {
            content[i].style.display = "block";
        }
        else {
            content[i].style.display = "none";
        }
    }
}