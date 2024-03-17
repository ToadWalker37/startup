let vehicle;
const vehicles = new Array();
let user = {};
if (localStorage.getItem("email@example.com") == null) { localStorage.setItem("email@example.com", "password"); }
if (localStorage.getItem("signedIn") == null) { localStorage.setItem("signedIn", 0); }

if ("1".localeCompare(localStorage.getItem("signedIn")) === 0) { document.querySelector("span").innerHTML = `${JSON.parse(localStorage.getItem("currentUser")).Username}<a href="#" style="text-align:center; text-decoration:none;" onclick="signOut()"><i style="padding-left: 0.5em; padding-right: 0.5em; font-size: 2vh;" class="fa">&#xf08b;</i></a>`; }

function sanitize(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }

function processVehicleData(input) {
    let vin = input;
    let url = `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValuesExtended/${vin}?format=json`;
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        vehicle = JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(data, null, "  ")).Results))[0]));
        
        const vehicleData = document.querySelector("#vehicleData");
        while (vehicleData.firstChild) { vehicleData.removeChild(vehicleData.lastChild); }

        if (vehicle.ErrorCode != 0) {
            const vinError = document.createElement('p');
            vinError.textContent = "Hold up! That's not a real car! Try once more.";
            vehicleData.appendChild(vinError);
        }
        
        else {
            let yearLabel = document.createElement('label');
            yearLabel.textContent = "Year:";
            let year = document.createElement('input');
            year.value = vehicle.ModelYear;
            if ("".localeCompare(vehicle.ModelYear) !== 0) { year.readOnly = true; }

            vehicleData.appendChild(yearLabel);
            vehicleData.appendChild(year);

            let makeLabel = document.createElement('label');
            makeLabel.textContent = "Make:";
            let make = document.createElement('input');
            if ("GMC".localeCompare(vehicle.Make) === 0 || "BMW".localeCompare(vehicle.Make) === 0) { make.value = vehicle.Make; }
            else { make.value = vehicle.Make.toLowerCase().charAt(0).toUpperCase() + vehicle.Make.toLowerCase().slice(1); }
            vehicle.Make = make.value;
            if ("".localeCompare(vehicle.Make) !== 0) { make.readOnly = true; }

            vehicleData.appendChild(makeLabel);
            vehicleData.appendChild(make);

            let modelLabel = document.createElement('label');
            modelLabel.textContent = "Model:";
            let model = document.createElement('input');
            model.value = vehicle.Model;
            if ("".localeCompare(vehicle.Model) !== 0) { model.readOnly = true; }

            vehicleData.appendChild(modelLabel);
            vehicleData.appendChild(model);

            let fuelLabel = document.createElement('label');
            fuelLabel.textContent = "Fuel type:";
            vehicleData.appendChild(fuelLabel);
            let fuel = document.createElement('input');
            if ("".localeCompare(vehicle.FuelTypeSecondary) === 0) { fuel.value = vehicle.FuelTypePrimary; }
            else {
                let fuelTypeSecondary;
                if ("Flexible Fuel Vehicle (FFV)".localeCompare(vehicle.FuelTypeSecondary) === 0) { fuelTypeSecondary = "Flex Fuel"; }
                else { fuelTypeSecondary = vehicle.FuelTypeSecondary; }
                fuel.value = `${vehicle.FuelTypePrimary} & ${fuelTypeSecondary}`;
                vehicle.FuelTypePrimary = fuel.value;
            }      
            if ("".localeCompare(vehicle.FuelTypePrimary) !== 0) {
                fuel.readOnly = true;
                vehicleData.appendChild(fuel);
            }
            else {
                let fuelSelect = document.createElement('select');
                fuelSelect.required = true;
                let select = document.createElement('option');
                select.textContent = "Select";
                let gasoline = document.createElement('option');
                gasoline.textContent = "Gasoline";
                let electric = document.createElement('option');
                electric.textContent = "Electric";
                let hybrid = document.createElement('option');
                hybrid.textContent = "Hybrid";
                let diesel = document.createElement('option');
                diesel.textContent = "Diesel";
                let fuelCell = document.createElement('option');
                fuelCell.textContent = "Fuel cell";
                fuelSelect.id = "fuel";
                vehicleData.appendChild(fuelSelect);
                fuelSelect.appendChild(select);
                fuelSelect.appendChild(gasoline);
                fuelSelect.appendChild(electric);
                fuelSelect.appendChild(hybrid);
                fuelSelect.appendChild(diesel);
                fuelSelect.appendChild(fuelCell);
            }


            let drivetrainLabel = document.createElement('label');
            drivetrainLabel.textContent = "Drivetrain:";
            vehicleData.appendChild(drivetrainLabel);
            let drivetrain = document.createElement('input');
            let driveType;
            if ("4WD/4-Wheel Drive/4x4".localeCompare(vehicle.DriveType) === 0) { driveType = "4x4"; }
            else { driveType = vehicle.DriveType; }
            drivetrain.value = driveType;            
            if ("".localeCompare(vehicle.DriveType) !== 0) {
                drivetrain.readOnly = true;
                vehicleData.appendChild(drivetrain);
            }
            else {
                let drivetrainSelect = document.createElement('select');
                drivetrainSelect.required = true;
                let select = document.createElement('option');
                select.textContent = "Select";
                let fwd = document.createElement('option');
                fwd.textContent = "FWD/Front-Wheel Drive";
                let rwd = document.createElement('option');
                rwd.textContent = "RWD/Rear-Wheel Drive";
                let awd = document.createElement('option');
                awd.textContent = "AWD/All-Wheel Drive";
                let fourxfour = document.createElement('option');
                fourxfour.textContent = "4x4/Four-Wheel Drive";
                drivetrainSelect.id = "drivetrain";
                vehicleData.appendChild(drivetrainSelect);
                drivetrainSelect.appendChild(select);
                drivetrainSelect.appendChild(fwd);
                drivetrainSelect.appendChild(rwd);
                drivetrainSelect.appendChild(awd);
                drivetrainSelect.appendChild(fourxfour);
            }


            let transmissionLabel = document.createElement('label');
            transmissionLabel.textContent = "Transmission:";
            vehicleData.appendChild(transmissionLabel);
            let transmission = document.createElement('input');
            transmission.value = vehicle.TransmissionStyle;            
            if ("".localeCompare(vehicle.TransmissionStyle) !== 0) {
                transmission.readOnly = true;
                vehicleData.appendChild(transmission);
            }
            else {
                let transmissionSelect = document.createElement('select');
                transmissionSelect.required = true;
                let select = document.createElement('option');
                select.textContent = "Select";
                let automatic = document.createElement('option');
                automatic.textContent = "Automatic";
                let manual = document.createElement('option');
                manual.textContent = "Manual";
                let automanual = document.createElement('option');
                automanual.textContent = "Automanual";
                let cvt = document.createElement('option');
                cvt.textContent = "CVT (Continuously variable transmission)";
                let singleSpeed = document.createElement('option');
                singleSpeed.textContent = "Single-speed (EV transmission)";
                transmissionSelect.id = "transmission";
                vehicleData.appendChild(transmissionSelect);
                transmissionSelect.appendChild(select);
                transmissionSelect.appendChild(automatic);
                transmissionSelect.appendChild(manual);
                transmissionSelect.appendChild(automanual);
                transmissionSelect.appendChild(cvt);
                transmissionSelect.appendChild(singleSpeed);
            }


            let engineLabel = document.createElement('label');
            engineLabel.textContent = "Engine:";
            let engine = document.createElement('input');
            let vehicleDisplacement;
            if ("".localeCompare(vehicle.DisplacementL) !== 0) {
                if (vehicle.DisplacementL.indexOf(".") === -1) { vehicleDisplacement = `${vehicle.DisplacementL}.0` }
                else {
                    const round = (num) => Math.round(num * 10)/10;
                    vehicleDisplacement = round(vehicle.DisplacementL);
                }
            }
            if ("In-Line".localeCompare(vehicle.EngineConfiguration) === 0) { engine.value = `${vehicleDisplacement}L I-${vehicle.EngineCylinders}`; }
            else if ("V-Shaped".localeCompare(vehicle.EngineConfiguration) === 0) { engine.value = `${vehicleDisplacement}L V${vehicle.EngineCylinders}`; }
            else { engine.value = `${vehicleDisplacement}L ${vehicle.EngineCylinders}-cyl` }
            if ("".localeCompare(vehicle.DisplacementL) !== 0 || "".localeCompare(vehicle.EngineCylinders) !== 0) {
                engine.readOnly = true;
                vehicleData.appendChild(engineLabel);
                vehicleData.appendChild(engine);
            }
            else {
                let displacementLabel = document.createElement('label');
                displacementLabel.textContent = "Displacement:";    
                let displacement = document.createElement('input');
                displacement.type = "number";
                displacement.min = 1.0;
                displacement.max = 10.0;
                displacement.step = 0.1;
                displacement.required = true;
                displacement.id = "displacement";
                vehicleData.appendChild(displacementLabel);
                vehicleData.appendChild(displacement);

                let cylinderLabel = document.createElement('label');
                cylinderLabel.textContent = "Cylinders:";
                let cylinders = document.createElement('input');
                cylinders.type = "number";
                cylinders.min = 3;
                cylinders.max = 12;
                cylinders.step = 1;
                cylinders.required = true;
                cylinders.id = "cylinders";
                vehicleData.appendChild(cylinderLabel);
                vehicleData.appendChild(cylinders);
                
            }


            let doorsLabel = document.createElement('label');
            doorsLabel.textContent = "Doors:";
            vehicleData.appendChild(doorsLabel);
            let doors = document.createElement('input');
            doors.value = vehicle.Doors;            
            if ("".localeCompare(vehicle.Doors) !== 0) {
                doors.readOnly = true;
                vehicleData.appendChild(doors);
            }
            else {
                let doors = document.createElement('input');
                doors.type = "number";
                doors.min = 1;
                doors.max = 12;
                doors.step = 1;
                doors.required = true;
                doors.id = "doors";
                vehicleData.appendChild(doors);
            }
            const areYouSure = document.createElement('p');
            areYouSure.style.fontStyle = "italic";
            areYouSure.textContent = "Be sure it's all correct. You can only change the mileage, description, and photos later.";
            vehicleData.appendChild(areYouSure);
        }
    });
}

function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

async function displaynullVehicleDataErrorMessage() { await sleep(2000); document.querySelector("#create-listing").style = "background-color: hsl(54, 100%, 50%); color: black"; }

function publishListing() {
    const nullVehicleData = document.querySelector("#null-vehicle");
    while (nullVehicleData.firstChild) { nullVehicleData.removeChild(nullVehicleData.lastChild); }

    if (vehicle == null) {
        const nullVehicleDataError = document.createElement('p');
        nullVehicleDataError.textContent = "We don't know what car you have yet! You must enter your VIN and click \"Find my car\" before we can list it.";
        nullVehicleData.appendChild(nullVehicleDataError);
        document.querySelector("#create-listing").style = "background-color:red; color: white";
        displaynullVehicleDataErrorMessage();
    }
    else {
        vehicle.EditableFields = new Array();
        let cantPublish = false;

        if ("".localeCompare(vehicle.ModelYear) === 0) {
            vehicle.EditableFields.push("ModelYear");
            if ("".localeCompare(document.querySelector("#year").value) === 0 ) { cantPublish = true; emptyVehicleListingInputError("year"); }
            else { vehicle.ModelYear = sanitize(document.querySelector("#year").value); }
        }

        if ("".localeCompare(vehicle.Make) === 0) {
            vehicle.EditableFields.push("Make");
            if ("".localeCompare(document.querySelector("#make").value) === 0 ) { cantPublish = true; emptyVehicleListingInputError("make"); }
            else { vehicle.Make = sanitize(document.querySelector("#make").value); }
        }
        
        if ("".localeCompare(vehicle.Model) === 0) {
            vehicle.EditableFields.push("Model");
            if ("".localeCompare(document.querySelector("#model").value) === 0 ) { cantPublish = true; emptyVehicleListingInputError("model"); }
            else { vehicle.Model = sanitize(document.querySelector("#model").value); }
        }
        
        if ("".localeCompare(vehicle.FuelTypePrimary) === 0) {
            vehicle.EditableFields.push("FuelTypePrimary");
            let invalid = ("".localeCompare(document.querySelector("#fuel").value) === 0 || "Select".localeCompare(document.querySelector("#fuel").value) === 0);
            if (invalid) { cantPublish = true; emptyVehicleListingInputError("fuel type"); }
            else { vehicle.FuelTypePrimary = sanitize(document.querySelector("#fuel").value); }
        }
        
        if ("".localeCompare(vehicle.DriveType) === 0) {
            let invalid = ("".localeCompare(document.querySelector("#drivetrain").value) === 0 || "Select".localeCompare(document.querySelector("#drivetrain").value) === 0);
            if (invalid) { cantPublish = true; emptyVehicleListingInputError("drivetrain type"); }
            else { vehicle.DriveType = sanitize(document.querySelector("#drivetrain").value); }
        }
        
        if ("".localeCompare(vehicle.TransmissionStyle) === 0) {
            vehicle.EditableFields.push("TransmissionStyle");
            let invalid = ("".localeCompare(document.querySelector("#transmission").value) === 0 || "Select".localeCompare(document.querySelector("#transmission").value) === 0);
            if (invalid) { cantPublish = true; emptyVehicleListingInputError("transmission type"); }
            else { vehicle.TransmissionStyle = sanitize(document.querySelector("#transmission").value); }
        }
        
        if ("".localeCompare(vehicle.DisplacementL) === 0) {
            vehicle.EditableFields.push("DisplacementL");
            if ("".localeCompare(document.querySelector("#displacement").value) === 0 ) { cantPublish = true; emptyVehicleListingInputError("engine displacement in liters"); }
            else { vehicle.DisplacementL = sanitize(document.querySelector("#displacement").value); }
        }
        
        if ("".localeCompare(vehicle.EngineCylinders) === 0) {
            vehicle.EditableFields.push("EngineCylinders");
            if ("".localeCompare(document.querySelector("#cylinders").value) === 0 ) { cantPublish = true; emptyVehicleListingInputError("amount of cylinders"); }
            else { vehicle.EngineCylinders = sanitize(document.querySelector("#cylinders").value); }
        }
        
        if ("".localeCompare(vehicle.Doors) === 0) {
            vehicle.EditableFields.push("Doors");
            if ("".localeCompare(document.querySelector("#doors").value) === 0 ) { cantPublish = true; emptyVehicleListingInputError("amount of doors"); }
            else { vehicle.Doors = sanitize(document.querySelector("#doors").value); }
        }
        
        vehicle.EditableFields.push("Mileage");
        if ("".localeCompare(document.querySelector("#mileage").value) === 0 ) { cantPublish = true; emptyVehicleListingInputError("mileage"); }
        else { vehicle.Mileage = sanitize(document.querySelector("#mileage").value); }
        
        vehicle.EditableFields.push("Title");
        let invalid = ("".localeCompare(document.querySelector("#title").value) === 0 || "Select".localeCompare(document.querySelector("#title").value) === 0);
        if (invalid) { cantPublish = true; emptyVehicleListingInputError("title status"); }
        else { vehicle.Title = sanitize(document.querySelector("#title").value); } // To do: title-checker API
        
        vehicle.EditableFields.push("Description");
        if ("".localeCompare(document.querySelector("#description").value) === 0 ) { cantPublish = true; emptyVehicleListingInputError("description"); }
        else { vehicle.Description = sanitize(document.querySelector("#description").value); }
        
        if (cantPublish === false) {
            vehicle.Date = new Date();
            vehicle.Favorites = 0;
            vehicle.Views = 0;
            vehicle.ListingID = validateID(6);
            if (localStorage.getItem("vehicles") == null) { localStorage.setItem("vehicles", JSON.stringify(vehicles)); }
            let localVehicles = JSON.parse(localStorage.getItem("vehicles"));
            localVehicles.push(vehicle.ListingID);
            localStorage.setItem("vehicles", JSON.stringify(localVehicles));
            localStorage.setItem(`${vehicle.ListingID}`, JSON.stringify(vehicle));
            window.location.assign("dashboard.html");
        }
        
        cantPublish = false;
    }
}

function emptyVehicleListingInputError(fail) {
    const nullVehicleData = document.querySelector("#null-vehicle");
    const nullVehicleDataError = document.createElement('p');
    let possiblyMistyped = ("engine displacement in liters".localeCompare(fail) === 0 || "amount of cylinders".localeCompare(fail) === 0 || "amount of doors".localeCompare(fail) === 0 || "mileage".localeCompare(fail) === 0);
    if (possiblyMistyped == true) { nullVehicleDataError.textContent = `The ${fail} of your car is missing or mistyped! Please fill that in.`; }
    else { nullVehicleDataError.textContent = `The ${fail} of your car is missing! Please fill that in.`; }
    nullVehicleData.appendChild(nullVehicleDataError);

    document.querySelector("#create-listing").style = "background-color:red; color: white";
    displaynullVehicleDataErrorMessage();
}

function validateID(length) {
    let potentialID = generateID(length);
    if (localStorage.getItem(`${potentialID}`) == null) { return potentialID; }
    else { return validateID(length); }

    function generateID(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (let i = 0; i < length; i++) { result += characters.charAt(Math.floor(Math.random() * charactersLength)); }
        return result;
    }
}

function displayInGarage() {
    let localVehicles = JSON.parse(localStorage.getItem("vehicles"));
    let garage = document.querySelector("#garage");
    if (localVehicles == null) {
        let noVehicles = document.createElement("p");
        noVehicles.innerHTML = `Your garage is empty! Add a vehicle <a href="create-listing.html" style="text-decoration: none;">here</a>.`;
        garage.appendChild(noVehicles);
        let emptyGarage = document.createElement("img");
        emptyGarage.src = "images/empty_garage.jpg";
        emptyGarage.style.width = "150px";
        garage.appendChild(emptyGarage);
    }
    else {
        for (let i = 0; i < localVehicles.length; i++) {
            let vehicleID = localVehicles[i];
            vehicle = JSON.parse(localStorage.getItem(`${vehicleID}`));
            
            let anchor = document.createElement("a");
            anchor.href = `listing.html?id=${vehicle.ListingID}`;
            anchor.style = "color: white; text-decoration: none;"
            let displayCard = document.createElement("div");
            displayCard.classList.add("display-card");
            
            let title = document.createElement("h4");
            let snippets = document.createElement("p");
            let vin = document.createElement("p");
            
            kify = (x) => `${Math.floor(x/1000)}k`;
            title.innerHTML = `${vehicle.ModelYear} ${vehicle.Make} ${vehicle.Model} &middot; ${vehicle.Favorites} &starf; &middot; ${vehicle.Views} <span class="fa">&#xf06e; &nbsp;</span> <a href="#" id="${vehicle.ListingID}" onclick="displayEditScreen(this)">Edit</a>`;
            snippets.innerHTML = `<span>${kify(vehicle.Mileage)} mi</span> &middot; <span>${vehicle.TransmissionStyle}</span> &middot; <span>${vehicle.FuelTypePrimary}</span> &middot; <span>${vehicle.DriveType.slice(0,3)}</span></span>`;
            vin.innerHTML = `${vehicle.VIN}`;

            let image = document.createElement("img");
            image.style.width = "150px";
            image.src = "images/Coming Soon.png";

            garage.appendChild(anchor);
            anchor.appendChild(displayCard);
            displayCard.appendChild(title);
            displayCard.appendChild(snippets);
            displayCard.appendChild(vin);
            displayCard.appendChild(image);
        }
    }
}

function displayEditScreen(editOriginator) {
    let vehicleID = editOriginator.id;
    vehicle = JSON.parse(localStorage.getItem(`${vehicleID}`));
    document.querySelector("#dashboard").style = "display:none";
    
    let announcementBig = document.createElement("h2");
    announcementBig.style = "text-align: center; padding: 1vh;";
    announcementBig.textContent = "Let's make things right on your";
    let announcementLittle = document.createElement("p");
    announcementLittle.textContent = `${vehicle.ModelYear} ${vehicle.Make} ${vehicle.Model}`;
    
    let listing = document.querySelector("#listing");
    listing.appendChild(announcementBig);
    listing.appendChild(announcementLittle);

    let mileageLabel = document.createElement('label');
    mileageLabel.textContent = "Mileage:";
    let mileage = document.createElement('input');
    mileage.type = "number";
    mileage.min = 1;
    mileage.max = 999999;
    mileage.step = 1;
    mileage.required = true;
    mileage.id = "edit-mileage";
    mileage.value = vehicle.Mileage;
    listing.appendChild(mileageLabel);
    listing.appendChild(mileage);

    let descriptionLabel = document.createElement('label');
    descriptionLabel.textContent = "Description:";
    let description = document.createElement('textarea');
    description.required = true;
    description.id = "edit-description";
    description.value = vehicle.Description;
    listing.appendChild(descriptionLabel);
    listing.appendChild(description);

    // To do: Add image-editing functionality

    let nullVehicleDataContainer = document.createElement('div');
    nullVehicleDataContainer.id = 'null-vehicle';
    listing.appendChild(nullVehicleDataContainer);

    let editButton = document.createElement('button');
    editButton.classList.add('btn');
    editButton.classList.add('edit');
    editButton.textContent = "Save and update";
    editButton.id = `${vehicleID}`;
    editButton.onclick = editListing;
    listing.appendChild(editButton);

    let orText = document.createElement('p');
    orText.textContent = "or, delete my listing.";
    orText.style = "margin: 2vh";
    listing.appendChild(orText);

    let deleteButton = document.createElement('button');
    deleteButton.classList.add('btn');
    deleteButton.classList.add('delete');
    deleteButton.textContent = "Delete";
    deleteButton.id = `${vehicleID}`;
    deleteButton.onclick = deleteListing;
    listing.appendChild(deleteButton);

    function editListing() {
        const nullVehicleData = document.querySelector("#null-vehicle");
        while (nullVehicleData.firstChild) { nullVehicleData.removeChild(nullVehicleData.lastChild); }
        let cantEdit = false;
    
        let vehicleID = document.getElementsByClassName('btn edit').item(0).id;
        vehicle = JSON.parse(localStorage.getItem(`${vehicleID}`));
        
        if ("".localeCompare(document.querySelector("#edit-mileage").value) === 0 ) { cantEdit = true; emptyVehicleListingInputError("mileage"); }
        else { vehicle.Mileage = sanitize(document.querySelector("#edit-mileage").value); }
        
        if ("".localeCompare(document.querySelector("#edit-description").value) === 0 ) { cantEdit = true; emptyVehicleListingInputError("description"); }
        else { vehicle.Description = sanitize(document.querySelector("#edit-description").value); }
        
        if (cantEdit === false) {
            localStorage.setItem(`${vehicle.ListingID}`, JSON.stringify(vehicle));
            const listing = document.querySelector("#listing");
            window.location.assign("dashboard.html");
        }
        cantEdit = false;
    }

    function deleteListing() {
        let vehicleID = document.getElementsByClassName('btn edit').item(0).id;
        let localVehicles = JSON.parse(localStorage.getItem("vehicles"));
        if (localVehicles.length === 1) { localStorage.removeItem("vehicles"); }
        else {
            let index = localVehicles.indexOf(vehicleID);
            const localVehiclesInterator = localVehicles.entries();
            localVehicles = [];
            for (let vehicleInList of localVehiclesInterator) {
                if (vehicleInList[0] !== index) { localVehicles.push(vehicleInList[1]); }
            }
            localStorage.setItem("vehicles", JSON.stringify(localVehicles));
        }
        localStorage.removeItem(`${vehicleID}`);
        window.location.assign("dashboard.html");
    }
}

function displayListing() {
    let vehicleID = window.location.href.slice(38,44);
    vehicle = JSON.parse(localStorage.getItem(`${vehicleID}`));
    let date = new Date(vehicle.Date.toLocaleString());

    document.querySelector("title").textContent = `${vehicle.ModelYear} ${vehicle.Make} ${vehicle.Model} - Dynamic Garage`;
    document.querySelector("#title").textContent = `${vehicle.ModelYear} ${vehicle.Make} ${vehicle.Model}`;
    
    document.querySelector("#stats").innerHTML = `Location &middot; ${vehicle.Favorites} &starf; &middot; ${vehicle.Views} <span class="fa">&#xf06e;`;
    vehicle.Views += 1;

    document.querySelector("#posted-when").textContent = `Posted ${date}`;
    
    let engine;
    let vehicleDisplacement;
    if ("".localeCompare(vehicle.DisplacementL) !== 0) {
        if (vehicle.DisplacementL.indexOf(".") === -1) { vehicleDisplacement = `${vehicle.DisplacementL}.0` }
        else {
            const round = (num) => Math.round(num * 10)/10;
            vehicleDisplacement = round(vehicle.DisplacementL);
        }
    }
    if ("In-Line".localeCompare(vehicle.EngineConfiguration) === 0) { engine = `${vehicleDisplacement}L I-${vehicle.EngineCylinders}`; }
    else if ("V-Shaped".localeCompare(vehicle.EngineConfiguration) === 0) { engine = `${vehicleDisplacement}L V${vehicle.EngineCylinders}`; }
    else { engine = `${vehicleDisplacement}L ${vehicle.EngineCylinders}-cyl` }

    commify = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    document.querySelector("#mileage").textContent = `Miles: ${commify(vehicle.Mileage)}`;
    document.querySelector("#transmission").textContent = `Transmission: ${vehicle.TransmissionStyle}`;
    document.querySelector("#drivetrain").textContent = `Drivetrain: ${vehicle.DriveType}`;
    document.querySelector("#engine").textContent = `Engine: ${engine}`;
    document.querySelector("#fuel").textContent = `Fuel type: ${vehicle.FuelTypePrimary}`;
    document.querySelector("#title-status").textContent = `Title status: ${vehicle.Title}`;
    document.querySelector("#location").textContent = `Location: 11 miles from zip code 99999`;
    document.querySelector("#vin").textContent = `VIN: ${vehicle.VIN}`;
    document.querySelector("#description").textContent = `${vehicle.Description}`;

    localStorage.setItem(`${vehicle.ListingID}`, JSON.stringify(vehicle));
}

async function displayAuthenticationError(buttonID) { await sleep(2000); document.querySelector(`#${buttonID}`).style = "background-color: hsl(54, 100%, 50%); color: black"; }

function emptyAuthenticationError(fail, nullDiv, authenticationErrorType) {
    const nullAuthenticationDataError = document.createElement('p');
    nullAuthenticationDataError.textContent = `${fail}`;
    nullDiv.appendChild(nullAuthenticationDataError);
    document.querySelector(`#${authenticationErrorType}`).style = "background-color:red; color: white";
    displayAuthenticationError(authenticationErrorType);
}

function signIn() {   
    const nullSignInData = document.querySelector("#null-sign-in");
    while (nullSignInData.firstChild) { nullSignInData.removeChild(nullSignInData.lastChild); }
    
    if ("".localeCompare(document.querySelector("#signInUsername").value) === 0) { emptyAuthenticationError("Username missing! Please fill that in.", nullSignInData, "sign-in"); }
    else if ("".localeCompare(document.querySelector("#signInPassword").value) === 0) { emptyAuthenticationError("Password missing! Please fill that in.", nullSignInData, "sign-in"); }
    else {
        if (localStorage.getItem(`${document.querySelector("#signInUsername").value}`) == null || document.querySelector("#signInPassword").value.localeCompare(JSON.parse(localStorage.getItem(`${document.querySelector("#signInUsername").value}`)).Password) !== 0) { emptyAuthenticationError("Email or password invalid.", nullSignInData, "sign-in"); }
        else {
            localStorage.setItem("signedIn", 1);
            localStorage.setItem("currentUser", localStorage.getItem(`${document.querySelector("#signInUsername").value}`));
            window.location.reload();
        }
    }
}

function signUp() {
    const nullSignUpData = document.querySelector("#null-sign-up");
    while (nullSignUpData.firstChild) { nullSignUpData.removeChild(nullSignUpData.lastChild); }
    let cantAuthenticate = false;
    
    if ("".localeCompare(document.querySelector("#signUpFirstName").value) === 0) { cantAuthenticate = true; emptyAuthenticationError("First name missing! Please fill that in.", nullSignUpData, "sign-up"); }
    if ("".localeCompare(document.querySelector("#signUpLastName").value) === 0) { cantAuthenticate = true; emptyAuthenticationError("Last name missing! Please fill that in.", nullSignUpData, "sign-up"); }
    if ("".localeCompare(document.querySelector("#signUpUsername").value) === 0) { cantAuthenticate = true; emptyAuthenticationError("Username missing! Please fill that in.", nullSignUpData, "sign-up"); }
    if ("".localeCompare(document.querySelector("#signUpEmail").value) === 0) { cantAuthenticate = true; emptyAuthenticationError("Email missing! Please fill that in.", nullSignUpData, "sign-up"); }
    if ("".localeCompare(document.querySelector("#signUpPhone").value) === 0) { cantAuthenticate = true; emptyAuthenticationError("Phone number missing! Please fill that in.", nullSignUpData, "sign-up"); }
    if ("".localeCompare(document.querySelector("#signUpZipCode").value) === 0) { cantAuthenticate = true; emptyAuthenticationError("Zip code missing! Please fill that in.", nullSignUpData, "sign-up"); }
    if ("".localeCompare(document.querySelector("#signUpPassword").value) === 0) { cantAuthenticate = true; emptyAuthenticationError("Password missing! Please fill that in.", nullSignUpData, "sign-up"); }

    if (localStorage.getItem(`${document.querySelector("#signUpUsername").value}`) != null) { cantAuthenticate = true; emptyAuthenticationError("Username taken! Please pick a different one.", nullSignUpData, "sign-up"); }

    if (cantAuthenticate === false) {
        user.FirstName = sanitize(document.querySelector("#signUpFirstName").value);
        user.LastName = sanitize(document.querySelector("#signUpLastName").value);
        user.Username = sanitize(document.querySelector("#signUpUsername").value);
        user.Email = sanitize(document.querySelector("#signUpEmail").value);
        user.Phone = sanitize(document.querySelector("#signUpPhone").value);
        user.ZipCode = sanitize(document.querySelector("#signUpZipCode").value);
        user.Password = document.querySelector("#signUpPassword").value;
        localStorage.setItem(`${user.Username}`, JSON.stringify(user));
        localStorage.setItem("currentUser", JSON.stringify(user));
        localStorage.setItem("signedIn", 1);
        window.location.reload();
    }
}

function signOut() {
    localStorage.setItem("signedIn", "0");
    localStorage.setItem("currentUser", {});
    window.location.reload();
}