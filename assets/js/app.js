/* ========================= Header Section =============================================== */

/* ========================== Part A => Navigation Bar ==================================== */
/* Navigation Bar */
const allLinks = document.querySelectorAll('.main-header nav ul li a');

allLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        allLinks.forEach(link => link.closest('li').classList.remove('active'));
        e.target.closest('li').classList.add('active');
        if (e.target.closest('ul').classList.contains('openned')) {
            e.target.closest('ul').classList.remove('openned');
            e.target.closest('ul').classList.add('closed');
        }
        const secId = e.target.getAttribute('href');
        document.querySelector(secId).scrollIntoView({ behavior: 'smooth' });
    })
})

/* Navigation Bar in Mobile Screens */
const spanBtn = document.querySelector('.main-header nav span:last-of-type');

spanBtn.addEventListener('click', e => {
    e.preventDefault();
    const list = e.target.closest('nav').querySelector('ul');
    if (list.classList.contains('closed')) {
        list.classList.remove('closed');
        list.classList.add('openned');
    } else {
        list.classList.remove('openned');
        list.classList.add('closed');
    }
})

/* ========================== Part A => Navigation Bar ==================================== */


/* ========================== Part B => settingsBtn ====================================== */
// B- Settings Btn
const settingsBtn = document.querySelector('.main-header nav + span.settings');
// console.log(settingsBtn);
settingsBtn.addEventListener('click', e => {
    e.preventDefault();
    e.currentTarget.classList.toggle('clicked');
});
/* ========================== Part B => settingsBtn ====================================== */



/* =========================== Part C => Change Image Slider ================================= */

// Change Image Slider 
const imageElement = document.querySelector('main header .background img');
let currentIndex = 0;
let intervalId = null;
const imgsPath = ['01.jpg', '02.jpg', '03.jpg', '04.jpg',
    '05.jpg', '06.png', '07.jpg', '08.jpg',
    '09.jpg', '10.jpg']
    
    
// Update Image Slider Function
function updateImgSlider(change = true) {
    const changeImage = () => {
        const imgUrl = new URL(`assets/img/${imgsPath[currentIndex]}`, window.location.href);
        imageElement.setAttribute('src', imgUrl.href);
        currentIndex = (currentIndex < imgsPath.length - 1 ? currentIndex + 1 : 0);
        // console.log(currentIndex);
        // console.log(imgUrl.href);
    }
    
    if(change)
        intervalId = window.setInterval(changeImage, 5000);
    else
        window.clearInterval(intervalId);
    // console.log(change);

}

/* =========================== Part C => Change Image Slider ================================= */



/* =========================== Part D => localStorage ==================================== */
// Create User Object To Save Data in Local Storage
// Create Item of localStorage as constant string variable userDataStr equals UserData
// So in localStorage will see this UserData
const userDataStr = 'UserData';

// Create UserData Object the below code will executed only when user visit website at firist time only
// Convert UserData in Local STorage From STring TO JSON JavaScript Object Notation { propertyKey: propertyValue }
let userDataObj = JSON.parse(window.localStorage.getItem(userDataStr)) || {
    userId: crypto.randomUUID(),
    userCustomId: Math.random().toString(36).substring(2,Math.random().toString(36).length-1).concat('-',new Date().toISOString()),
    lastVisit: new Date().toISOString(),
    numOfVisit: 1,
    currentTheme: window.getComputedStyle(document.documentElement).getPropertyValue('--current-theme-master'),
    previousTheme: window.getComputedStyle(document.documentElement).getPropertyValue('--current-theme-1'),
    ChangeSlider: true,
    showBullets: true
};

// When User visit website Second Time or more Thats Mean UserData is Save in localStorage
// So window.localStorage.getItem(userDataStr) is True Not Equal NUll or False and
// So should be below steps
// increment number of visit Then
// Change Last Visit by Current Date Then
// Load Data of User from Local Storage after update only num of visit + last visit date
if(window.localStorage.getItem(userDataStr)) {
    userDataObj.numOfVisit++;
    userDataObj.lastVisit = new Date().toISOString();
}

// Convert JSON to string and save data in local storage
function saveAtLocalStorage() {
    window.localStorage.setItem(userDataStr, JSON.stringify(userDataObj));
}

// When Load DOM Document Object Module which equal load HTML + CSS Should be below Steps
// Read Data From Local Storage then if update any data should Save It In UserObject Then
// Convert UserObject To String To Save It in Local Storage
document.addEventListener('DOMContentLoaded', () => {
    // Read Data From LocalStorage
    // =============================
    // A- Read Data of background Colors
    const colorBtns = document.querySelector('.main-header nav ~ .themes .themes-color .colors');
    const root = document.documentElement;
    const newTheme = userDataObj.currentTheme;
    root.style.setProperty('--current-theme-master', newTheme);
    let arrColors = [], index = 0;
    
    while(index <= 5)
        arrColors[index] = window.getComputedStyle(root).getPropertyValue(`--current-theme-${++index}`);
    // console.log(arrColors);
    // console.log(userDataObj.currentTheme);
    
    arrColors.forEach((color, index) => {
        if(userDataObj.currentTheme === color.toString().trim()){
            colorBtns.querySelector(`span:nth-child(${index + 1})`).classList.add('clicked');
            return;
        }
    });

    // B- Read Random Background Images Slider
    const bgcImgBtns = document.querySelectorAll('.main-header .themes-background .btns button');    
    bgcImgBtns.forEach(imgbtn => {
        userDataObj.ChangeSlider && imgbtn.innerText === 'yes' ? imgbtn.classList.add('clicked') :  
        !userDataObj.ChangeSlider && imgbtn.innerText === 'no' ? imgbtn.classList.add('clicked') : ""; 
    });


    // D- Create bullets Elements 
    const parentEle = document.createElement('div');
    parentEle.classList.add('bullets');
    const oldDiv = document.querySelector('.main-header div.bullets');
    if(oldDiv !== null) oldDiv.remove();
    for (let i = 0; i < 6; i++) {
        const element = document.createElement('div');
        element.classList.add(`bullet-${i + 1}`);
        parentEle.appendChild(element);
    }
    if(userDataObj?.showBullets) document.querySelector('header.main-header').appendChild(parentEle);
    document.querySelectorAll('.main-header div.bullets div').forEach((bullet, index) => {
        bullet.addEventListener('click', e => {
            e.preventDefault();
            const secId = allLinks[index].getAttribute('href');
            document.querySelector(secId).scrollIntoView({ behavior: 'smooth' });
        })
    })

    // D- Read Show or Hidden Bullets Button
    const allBtns = document.querySelectorAll('.main-header .themes .themes-bullets .btns button');
    const themesDiv = document.querySelector('.main-header .themes');
    allBtns.forEach(bulletbtn => {
        if(bulletbtn.innerText === 'yes' && userDataObj.showBullets) {
            bulletbtn.classList.add('clicked');
            themesDiv.classList.add('active');
        }
        else if (bulletbtn.innerText === 'no' && !userDataObj.showBullets){
            bulletbtn.classList.add('clicked');
            themesDiv.classList.add('inactive');
        }
    })

    // E- Update Change Image Slider
    updateImgSlider(userDataObj.ChangeSlider);
    
});

/* =========================== Part D => localStorage ========================================== */

/* =========================== Part E => Change backgroundColor ================================ */
// Change Background Color
const colorBtns = document.querySelectorAll('.main-header nav ~ .themes .themes-color .colors span');
colorBtns.forEach(btn => {
    btn.addEventListener('click', e => {
        e.preventDefault();
        colorBtns.forEach(innerbtn => innerbtn.classList.remove('clicked'));
        e.target.classList.add('clicked');
        const rootElement = document.documentElement;
        const newTheme = window.getComputedStyle(e.target).backgroundColor;
        userDataObj.previousTheme = window.getComputedStyle(rootElement).getPropertyValue('--current-theme-master');
        rootElement.style.setProperty('--current-theme-master', newTheme);
        userDataObj.currentTheme = newTheme;
        saveAtLocalStorage();
    })
});

/* =========================== Part E => Change backgroundColor ================================ */


/* ========================== Part F => Show Bullets ======================================= */
/* Show or Hidden Bullets Button */
const allBtns = document.querySelectorAll('.main-header .themes .themes-bullets .btns button');
const themesDiv = document.querySelector('.main-header .themes'); //bullets

allBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        allBtns.forEach(innerbtn => innerbtn.classList.remove('clicked'));
        e.target.classList.add('clicked');
        if(e.target.innerText === 'Yes') {
            themesDiv.classList.remove('active','inactive');
            themesDiv.classList.add('active');
            userDataObj.showBullets = true;
            // Recall Event of DOMContentLoaded again by using dispatchEvent(new Event('EventName'));
            document.dispatchEvent(new Event('DOMContentLoaded'));
            saveAtLocalStorage();
        } else {
            themesDiv.classList.remove('active','inactive');
            themesDiv.classList.add('inactive');
            userDataObj.showBullets = false;
            // Recall Event of DOMContentLoaded
            document.dispatchEvent(new Event('DOMContentLoaded'));
            saveAtLocalStorage();
        }
    })
})

/* ========================== Part F => Show Bullets ======================================= */

/* ========================== Part G => Change Image Slider =============================== */
// Change Image Slider
const bgcImgBtns = document.querySelectorAll('.main-header .themes-background .btns button');

bgcImgBtns.forEach(btn => {
    btn.addEventListener('click', e => {
        e.preventDefault();
        bgcImgBtns.forEach(innerbtn => innerbtn.classList.remove('clicked'));
        if(e.target.innerText === 'Yes'){
            e.target.classList.add('clicked');
            userDataObj.ChangeSlider = true;
            updateImgSlider(userDataObj.ChangeSlider);
            saveAtLocalStorage();
        } else {
            e.target.classList.add('clicked');
            userDataObj.ChangeSlider = false;
            updateImgSlider(userDataObj.ChangeSlider);
            saveAtLocalStorage();
        }
    })
})

/* ========================== Part G => Change Image Slider =============================== */

/* ========================== Part H => Reset Button ====================================== */
/* Reset Local Storage Button */
const resetBtn = document.querySelector('.main-header button.reset');

resetBtn.addEventListener('click', e => {
    e.preventDefault();
    if (localStorage.getItem(userDataStr))
        localStorage.removeItem(userDataStr);
    // When Reading and Writing CSS Variables From JavaScript Using Below Notes
    // Change Current Theme To Default Theme
    // Note When get Style from UI using below
    // window.getComputedStyle(document.documentElement).getPropertyValue('--current-theme-master');
    // Note When set Style To UI using Below
    // document.documentElement.style.setProperty('--current-theme-master', newValue);
    const rootElement = document.documentElement;
    const defaultTheme = window.getComputedStyle(rootElement).getPropertyValue('--current-theme-1');
    rootElement.style.setProperty('--current-theme-master', defaultTheme);
    // A- Reset All Settings
    resetAllSettings();
})


function resetAllSettings() {
    // A- Reset of background Colors Button
    const colorBtns = document.querySelectorAll('.main-header nav ~ .themes .themes-color .colors span');
    const firstColorBtn = document.querySelector('.main-header nav ~ .themes .themes-color .colors span:first-of-type');
    colorBtns.forEach(btn => btn.classList.remove('clicked'));
    firstColorBtn.classList.add('clicked');

    // console.log(colorBtns.querySelector(`span:first-of-type`).classList.add('clicked'));

    // B- Reset Show Bullets Button
    const bullettBtns = document.querySelectorAll('.main-header .themes .themes-bullets .btns button');
    const firstBullettBtn = document.querySelector('.main-header .themes .themes-bullets .btns button:first-of-type');
    const themesDiv = document.querySelector('.main-header .themes');
    bullettBtns.forEach(btn => btn.classList.remove('clicked'));
    firstBullettBtn.classList.add('clicked');
    themesDiv.classList.add('active');

    // C- Reset Image Slider
    const bgcImgBtns = document.querySelectorAll('.main-header .themes-background .btns button');
    const firstBgcImgBtn = document.querySelector('.main-header .themes-background .btns button:first-of-type');
    bgcImgBtns.forEach(btn => btn.classList.remove('clicked'));
    firstBgcImgBtn.classList.add('clicked');
    // Update Image Slider
    updateImgSlider();

    // D- Reset Settings Btn
    const settingsBtn = document.querySelector('.main-header nav + span.settings');
    settingsBtn.classList.remove('clicked');
}

/* ========================== Part H => Reset Button ====================================== */


/* ========================= Header Section =============================================== */



/* ============================ Gallery Images ============================================ */
const galleryElement = document.querySelector('main .gallery'); 
const imageElements = document.querySelectorAll('main .gallery figure a img'); 

document.addEventListener('DOMContentLoaded', () => {
    imageElements.forEach((ele, index) => {
        ele.addEventListener('click', e => {
            e.preventDefault();
            const sliderDiv = document.createElement('div');
            sliderDiv.classList.add('clicked');
            const oldGallery = document.querySelector('main .gallery figure + div.clicked');
            if(oldGallery !== null) oldGallery.remove();
            const closeBtn = document.createElement('button');
            const sliderSpan = document.createElement('span');
            sliderSpan.innerText = `Image 0${index + 1}`;
            const sliderImg = document.createElement('img'); 
            const imgUrl = new URL(`${ele.getAttribute('src')}`, window.location.href);
            // console.log(imgUrl.href);
            sliderImg.setAttribute('src', imgUrl.href);
            // console.log(imgUrl.sliderImg);
            sliderDiv.appendChild(sliderImg);
            sliderDiv.appendChild(closeBtn);
            sliderDiv.appendChild(sliderSpan);
            galleryElement.appendChild(sliderDiv);
            sliderDiv.parentElement.classList.add('clicked');
            /* Close Btn */
            closeBtn.addEventListener('click', e => {
                e.preventDefault();
                sliderDiv.parentElement.classList.remove('clicked');
                e.currentTarget.parentElement.remove();
            })
        })
    });
    
});
/* ============================ Gallery Images ============================================ */

/* =========================== Form Validation =========================================== */
const form = document.querySelector('main .contact form');
const allInputs = document.querySelectorAll('main .contact form .left input');
const textarea = document.querySelector('main .contact form .right textarea');


// console.log(form.querySelector('input[placeholder="your name"]'));
// console.log(/^[\w\s]{8}$/.test(''));

function formValidation() {
    let isValid = true;

    allInputs.forEach(input => input.classList.remove('valid', 'invalid'));
    let inputs =  {
        inName: form.querySelector('input[placeholder="your name"]'),
        inPhone: form.querySelector('input[placeholder="your phone"]'),
        inEmail: form.querySelector('input[placeholder="your email"]'),
        inSubject: form.querySelector('input[placeholder="your subject"]'),
    }

    allInputs.forEach(input => {
        if(input === inputs.inName && /^[\w\s]{3,}$/.test(inputs.inName.value.trim())){
            input.classList.add('valid');
            input.parentElement.classList.add('valid');
        }
        else if (input === inputs.inName  && !/^[\w\s]{3,}$/.test(inputs.inName.value.trim())){
            input.classList.add('invalid');
            input.parentElement.classList.add('invalid');
            isValid &= false;
        }
        if(input === inputs.inPhone && /^[\d]{11}$/.test(inputs.inPhone.value.trim())){
            input.classList.add('valid');
            input.parentElement.classList.add('valid');
        }
        else if (input === inputs.inPhone && !/^[\d]{11}$/.test(inputs.inPhone.value.trim())){
            input.classList.add('invalid');
            input.parentElement.classList.add('invalid');
            isValid &= false;
        }
        if(input === inputs.inEmail  && /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(inputs.inEmail.value.trim() )){
            input.classList.add('valid');
            input.parentElement.classList.add('valid');
        }
        else if (input === inputs.inEmail  && !/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(inputs.inEmail.value.trim())){
            input.classList.add('invalid');
            input.parentElement.classList.add('invalid');
            isValid &= false;
        }
        if(input === inputs.inSubject  && /^[\w\s]+$/.test(inputs.inSubject.value.trim())){
            input.classList.add('valid');
            input.parentElement.classList.add('valid');
            // console.log('valid');
        }
        else if (input === inputs.inSubject  &&  !/^[\w\s]+$/.test(inputs.inSubject.value.trim())){
            input.classList.add('invalid');
            input.parentElement.classList.add('invalid');
            isValid &= false;
            // console.log('invalid');
        }
        // console.log(isValid);
    })

    if(/^[\w\s]{10,}$/.test(textarea.value.trim())) {
        textarea.classList.remove('valid');
        textarea.parentElement.classList.remove('valid');
        textarea.classList.add('valid');
        textarea.parentElement.classList.add('valid');
    }
    else {
        textarea.classList.remove('invalid');
        textarea.parentElement.classList.remove('invalid');
        textarea.classList.add('invalid');
        textarea.parentElement.classList.add('invalid');
        isValid &= false;
    }
    // console.log(isValid);
}

function resetForm() {
    const resetInput = () => {
        allInputs.forEach(input => {
            input.classList.remove('valid', 'invalid');
            input.parentElement.classList.remove('valid', 'invalid');
            input.value = ""
        });
        textarea.classList.remove('valid', 'invalid');
        textarea.parentElement.classList.remove('valid', 'invalid');
        textarea.value = "";
        form.querySelector('input[type=submit]').classList.remove('valid','invalid');
    }
    window.setTimeout(resetInput, 4000);
}

form.addEventListener('submit', e => {
    e.preventDefault();
    if(formValidation()){
        form.querySelector('input[type=submit]').classList.remove('valid','invalid');
        form.querySelector('input[type=submit]').classList.add('valid');
    } else {
        form.querySelector('input[type=submit]').classList.remove('valid','invalid');
        form.querySelector('input[type=submit]').classList.add('invalid');
    }
    resetForm();
    // console.log(/^[\w\s]{10,}$/.test(textarea.value.trim()));
    // console.log(textarea.value.trim());
})

/* =========================== Form Validation =========================================== */