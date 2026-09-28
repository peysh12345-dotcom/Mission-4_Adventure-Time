
const loginPage = document.getElementById("loginPage");
const dashboard = document.getElementById("dashboard");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const correctUsername = "Peyshwara";
const correctPassword = "Ramen";
const loginButton = document.getElementById("loginButton");
const loginMessage = document.getElementById("loginMessage");
const generateButton = document.getElementById("generateButton");
const saveButton = document.getElementById("saveButton");
const activityName = document.getElementById("activityName");
const activityType = document.getElementById("activityType");
const activityParticipants = document.getElementById("activityParticipants");
const savedActivities = document.getElementById("savedActivities");
const statusMessage = document.getElementById("statusMessage");


//variables

let currentActivity = null;

let savedList = [];


// Login Page

loginButton.onclick = function () {
    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    if (username === "" || password === "") {
        loginMessage.textContent = "Enter thy username and password.";
        return;    }

    if (username !== correctUsername || password !== correctPassword) {
        loginMessage.textContent = "The username or password is incorrect.";
        return;    }

    loginPage.classList.add("d-none");
    dashboard.classList.remove("d-none");
};


// get adventure function

function getActivity() {

    statusMessage.textContent = "Oracle is finding your fate...";
    fetch("https://random-activity-sigmo.vercel.app/api/random")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            currentActivity = data;
            activityName.textContent = data.activity;
            activityType.textContent = `Type: ${data.type}`;
            activityParticipants.textContent = `Traveller(s) required: ${data.participants}`;
            statusMessage.textContent = "Here lies thy adventure!";
        })

        .catch(error => {
            console.log(error);
            statusMessage.textContent = "Wizard Sigmo needs a break. Try again!";
        });

}


// get button

generateButton.onclick = function () {
    getActivity();
};


//save adventure function

saveButton.onclick = function () {
    if (currentActivity === null) {
        statusMessage.textContent = "Generate a mission first!";
        return;
    }
    savedList.push(currentActivity);
    displaySavedActivities();
    statusMessage.textContent = "Quest added to your archive!";
};


// Display saved adventure

function displaySavedActivities() {
    savedActivities.innerHTML = "";
    for (let i = 0; i < savedList.length; i++) {
        const li = document.createElement("li");
        li.textContent = savedList[i].activity;
        savedActivities.appendChild(li);

    }
};
