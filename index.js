// Web Page Colors
const white = '#fdffff';
const blue = '#010081';
const teal = '#008080';
const black = '#000000';
const darkGray = '#818181';
const lightGray = '#c3c3c3';
const pink = '#ff0081';

// File names for every image on the page
const imageFileNames = [
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

// Labels for every image on the page
const imageLabels = [
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

// Holds a list of every image used on the page
const PageImages = [];

// Image related elements
var MainImage;
var MainCanvas;
var MainCanvasContext;
var OriginalImageData;
var ImageLabel;

// Image processing elements
var invertToggle;
var thresholdToggle;
var thresholdSlider;

// Morphological ilter max dimensions
var numberOfRows = 5;
var numberOfCols = 5;

function OnLoadEvent() {
    // Setting the "Home" tab active on the Nav Bar
    document.getElementById("Default-Nav").style.backgroundColor = white;

    // Grabbing the Image related elements
    MainImage = document.getElementById('Image1');
    MainCanvas = document.getElementById('Canvas1');
    MainCanvasContext = MainCanvas.getContext("2d", {willReadFrequently: true});
    ImageLabel = document.getElementById("Image1Label");

    // Grabbing the Image Processing related elements
    thresholdToggle = document.getElementById("T-Toggle");
    thresholdSlider = document.getElementById("T-Range");

    // Draw the loaded image onto the canvas
    UpdateImageDisplay();

    // Preloading every image the user can select
    for (let i = 0; i < imageFileNames.length; i++) 
    {
        PageImages[i] = new Image();
        PageImages[i].src = ("Images/" + imageFileNames[i]);
    }

    // Setting the Image Label to reflect the default image
    ImageLabel.textContent = imageLabels[0];

    // Making the default DIP tab to visible
    //let content = document.getElementsByClassName("dip-content dip-basic"); // Basics-tab
    let content = document.getElementsByClassName("dip-content dip-morph"); // Morph-tab
    for (let i = 0; i < content.length; i++) {
        content[i].style.display = "block";
    }

    // Making our morphological grid
    makeButtons();
}

// Highlights the current nav tab
function SelectNav(element) {
    let Options = document.getElementsByClassName("nav-li");
    
    for (let i = 0; i < Options.length; i++)
    {
        if (Options[i].style.backgroundColor == "rgb(253, 255, 255)")
        { 
            Options[i].style.backgroundColor = lightGray;
            break;
        }
    }

    element.style.backgroundColor = white;
}

function ToggleButton(elm) {
    let cls = elm.className;

    if (cls.includes(" active"))
    {
        elm.className = elm.className.replace(" active", "");
    } 
    else
    {
        elm.className += " active";
    }
}

// Highlights the now active image tab and loads the corresponding image
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
            MainImage.src = PageImages[i].src;    
            
            // Draw the loaded image onto the canvas
            UpdateImageDisplay();
            
            // Update image label
            ImageLabel.textContent = imageLabels[i];
        }
    }

    evt.currentTarget.className += " active";

    // Checking which Processes are active
    checks = document.getElementsByClassName("dip-checkbox");

    for (let i = 0; i < checks.length; i++) 
    {
        if (checks[i].children[0].checked == true)
        {
            checks[i].children[0].onchange();
        }
    }
}

function UpdateImageDisplay() {

    // Logging the scale of the new image compared to the canvas
    var scaleWidth = MainCanvas.width / MainImage.width;
    var scaleHeight = MainCanvas.height / MainImage.height;

    // Wipping and then drawing the new image
    MainCanvasContext.clearRect(0, 0, MainCanvas.width, MainCanvas.height);
    MainCanvasContext.drawImage(MainImage, 0, 0, MainImage.width*scaleWidth, MainImage.height*scaleHeight);

    // Grabbing the new canvas data
    var imageData = MainCanvasContext.getImageData(0, 0, MainCanvas.width, MainCanvas.height);

    // Store the new image's OG pixel values
    OriginalImageData = [];

    for (let i = 0; i < imageData.data.length; i+=4) {
        OriginalImageData[i] = imageData.data[i];
    }

}

function dipSelect(evt) {
    let tabs = document.getElementsByClassName("tablinks");
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].className = tabs[i].className.replace(" active", "");
    }

    evt.currentTarget.className += " active";

    // Displaying the correct conent
    let content = document.getElementsByClassName("dip-content ");

    let classFlag = "";
    if (evt.currentTarget.id == "Basics-Tab") {
        classFlag = "dip-content dip-basic";
    } 
    else {
        classFlag = "dip-content dip-morph";
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

function invertImage() {
    var imageData = MainCanvasContext.getImageData(0, 0, MainCanvas.width, MainCanvas.height);

    for (let i = 0; i < imageData.data.length; i+=4) {
        imageData.data[i] = 255 - imageData.data[i];
        imageData.data[i + 1] = 255 - imageData.data[i + 1];
        imageData.data[i + 2] = 255 - imageData.data[i + 2];
        imageData.data[i + 3] = 255;

        OriginalImageData[i] = 255 - OriginalImageData[i];
    }

    MainCanvasContext.putImageData(imageData, 0, 0);
}

function thresholdImage() {

    var imageData = MainCanvasContext.getImageData(0, 0, MainCanvas.width, MainCanvas.height);

    if (thresholdToggle.checked == true) 
    {
        var thresholdValue = thresholdSlider.value;

        for (let i = 0; i < imageData.data.length; i+=4) {
            if (OriginalImageData[i] > thresholdValue)
            {
                imageData.data[i] = 255;
                imageData.data[i + 1] = 255;
                imageData.data[i + 2] = 255;
            }
            else
            {
                imageData.data[i] = 0;
                imageData.data[i + 1] = 0;
                imageData.data[i + 2] = 0;
            }

            imageData.data[i + 3] = 255;
            
        }
    }

    else
    {
        for (let i = 0; i < imageData.data.length; i+=4) {
            imageData.data[i] = OriginalImageData[i];
            imageData.data[i + 1] = OriginalImageData[i];
            imageData.data[i + 2] = OriginalImageData[i];
            imageData.data[i + 3] = 255;
        }
    }

    MainCanvasContext.putImageData(imageData, 0, 0);
}

function SetActive(evt) {
    btn = evt.currentTarget;

    if (btn.className == "")
    {
        btn.className += "active";
    }
    else
    {
        btn.className = "";
    }
}


const observer = new MutationObserver(FilterButtonCallBack);
const options = {
    attributes: true
}

function makeButtons() {
    let btnHolder = document.getElementById("Button_Holder");

    for (var i = 0; i < numberOfRows; i++) {
        for (var j = 0; j < numberOfCols; j++) {
            let btn = document.createElement("button");
            btn.setAttribute("onclick","ToggleButton(this)");
            btn.setAttribute("class", "Filter-Gate-Button");
            btnHolder.append(btn);

            observer.observe(btn, options)
        }

        let brk = document.createElement("br");
        btnHolder.append(brk);
    }
}

function FilterButtonCallBack(mutationRecord){
    for (let i = 0; i < mutationRecord.length; i++)
    {
        console.log(mutationRecord[i].target.className);
    }
}



/*
* Image Processing Flow
* 
* 1. Load image
* 2. Save a copy of the image's original pixel values to an array
* 4. Reference 'OriginalPixelArray' to perform thresholding
* 5. If the image is currently inverted. Invert the OG pixel values prior to thesholding
* 
*/