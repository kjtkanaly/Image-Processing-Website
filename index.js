const white = '#fdffff';
const blue = '#010081';
const teal = '#008080';
const black = '#000000';
const darkGray = '#818181';
const lightGray = '#c3c3c3';
const pink = '#ff0081';

var MainImage;
var MainCanvas;
var MainCanvasCtx;
var OriginalImageData;
var ImageLabel;

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

// Page Elements
var invertToggle;
var thresholdToggle;
var thresholdSlider;

function OnLoadEvent() {
    document.getElementById("Default-Nav").style.backgroundColor = white;

    // Grabbing the Main image elements
    MainImage = document.getElementById('Image1');
    MainCanvas = document.getElementById('Canvas1');
    MainCanvasCtx = MainCanvas.getContext("2d", {willReadFrequently: true});

    // Draw the loaded image onto the canvas
    UpdateImageDisplay();

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
    //let content = document.getElementsByClassName("dip-content dip-basic");
    let content = document.getElementsByClassName("dip-content dip-morph");

    for (let i = 0; i < content.length; i++) {
        content[i].style.display = "block";
    }

    // Grabbing the processes toggles for later
    thresholdToggle = document.getElementById("T-Toggle");

    // Grabbing the Threshold slider for later
    thresholdSlider = document.getElementById("T-Range");
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
            
            // Draw the loaded image onto the canvas
            UpdateImageDisplay();
            
            ImageLabel.textContent = newImgsLabels[i];
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
    MainCanvasCtx.clearRect(0, 0, MainCanvas.width, MainCanvas.height);
    MainCanvasCtx.drawImage(MainImage, 0, 0, MainImage.width*scaleWidth, MainImage.height*scaleHeight);

    // Grabbing the new canvas data
    var imageData = MainCanvasCtx.getImageData(0, 0, MainCanvas.width, MainCanvas.height);

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
    var imageData = MainCanvasCtx.getImageData(0, 0, MainCanvas.width, MainCanvas.height);

    for (let i = 0; i < imageData.data.length; i+=4) {
        imageData.data[i] = 255 - imageData.data[i];
        imageData.data[i + 1] = 255 - imageData.data[i + 1];
        imageData.data[i + 2] = 255 - imageData.data[i + 2];
        imageData.data[i + 3] = 255;

        OriginalImageData[i] = 255 - OriginalImageData[i];
    }

    MainCanvasCtx.putImageData(imageData, 0, 0);
}

function thresholdImage() {

    var imageData = MainCanvasCtx.getImageData(0, 0, MainCanvas.width, MainCanvas.height);

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

    MainCanvasCtx.putImageData(imageData, 0, 0);
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