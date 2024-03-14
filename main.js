let vehicle;
const vehicles = new Array();

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

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function displayNullVehicleErrorMessage() {
    await sleep(2000);
    document.querySelector("#create-listing").style = "background-color: hsl(54, 100%, 50%); color: black";
}

function publishListing() {
    const nullVehicle = document.querySelector("#null-vehicle");
    while (nullVehicle.firstChild) { nullVehicle.removeChild(nullVehicle.lastChild); }
    if (vehicle == null) {
        const nullVehicleError = document.createElement('p');
        nullVehicleError.textContent = "We don't know what car you have yet! You must enter your VIN and click \"Find my car\" before we can list it.";
        nullVehicle.appendChild(nullVehicleError);
        document.querySelector("#create-listing").style = "background-color:red; color: white";
        displayNullVehicleErrorMessage();
    }
    else {
        vehicle.EditableFields = new Array();

        if ("".localeCompare(vehicle.ModelYear) === 0) {
            vehicle.EditableFields.push("ModelYear");
            vehicle.ModelYear = sanitize(document.querySelector("#year").value);
        }

        if ("".localeCompare(vehicle.Make) === 0) {
            vehicle.EditableFields.push("Make");
            vehicle.Make = sanitize(document.querySelector("#make").value);
        }
        
        if ("".localeCompare(vehicle.Model) === 0) {
            vehicle.EditableFields.push("Model");
            vehicle.Model = sanitize(document.querySelector("#model").value);
        }
        
        if ("".localeCompare(vehicle.FuelTypePrimary) === 0) {
            vehicle.EditableFields.push("FuelTypePrimary");
            vehicle.FuelTypePrimary = sanitize(document.querySelector("#fuel").value);
        }
        
        if ("".localeCompare(vehicle.DriveType) === 0) {
            vehicle.EditableFields.push("DriveType");
            vehicle.DriveType = sanitize(document.querySelector("#drivetrain").value);
        }
        
        if ("".localeCompare(vehicle.TransmissionStyle) === 0) {
            vehicle.EditableFields.push("TransmissionStyle");
            vehicle.TransmissionStyle = sanitize(document.querySelector("#transmission").value);
        }
        
        if ("".localeCompare(vehicle.DisplacementL) === 0) {
            vehicle.EditableFields.push("DisplacementL");
            vehicle.DisplacementL = sanitize(document.querySelector("#displacement").value);
        }
        
        if ("".localeCompare(vehicle.EngineCylinders) === 0) {
            vehicle.EditableFields.push("EngineCylinders");
            vehicle.EngineCylinders = sanitize(document.querySelector("#cylinders").value);
        }
        
        if ("".localeCompare(vehicle.Doors) === 0) {
            vehicle.EditableFields.push("Doors");
            vehicle.Doors = sanitize(document.querySelector("#doors").value);
        }
        
        vehicle.EditableFields.push("Mileage");
        vehicle.Mileage = sanitize(document.querySelector("#mileage").value);
        
        vehicle.EditableFields.push("Title");
        vehicle.Title = sanitize(document.querySelector("#title").value); // To do: title-checker API
        
        vehicle.EditableFields.push("Description");
        vehicle.Description = sanitize(document.querySelector("#description").value); // To do: Disable empty fields possibility
    }
    vehicle.ListingID = validateID(6);
    if (localStorage.getItem("vehicles") == null) {
        localStorage.setItem("vehicles", JSON.stringify(vehicles));
    }
    let localVehicles = JSON.parse(localStorage.getItem("vehicles"));
    localVehicles.push(vehicle.ListingID);
    localStorage.setItem("vehicles", JSON.stringify(localVehicles));
    localStorage.setItem(`${vehicle.ListingID}`, JSON.stringify(vehicle));
    window.location.assign("dashboard.html");
}

function generateID(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (let i = 0; i < length; i++) { result += characters.charAt(Math.floor(Math.random() * charactersLength)); }
    return result;
}

function validateID(length) {
    let potentialID = generateID(length);
    if (localStorage.getItem(`${potentialID}`) == null) { return potentialID; }
    else { return validateID(length); }
}

function displayInGarage() {
    let localVehicles = JSON.parse(localStorage.getItem("vehicles"));
    for (let i = 0; i < localVehicles.length; i++) {
        let vehicleID = localVehicles[i];
        let vehicle = JSON.parse(localStorage.getItem(`${vehicleID}`));
        
        let anchor = document.createElement("a");
        anchor.href = `listings/${vehicle.ListingID}`;
        anchor.style = "color: white; text-decoration: none;"
        let displayCard = document.createElement("div");
        displayCard.classList.add("display-card");
        
        let title = document.createElement("h4");
        let snippets = document.createElement("p");
        let vin = document.createElement("p");
        
        title.innerHTML = `${vehicle.ModelYear} ${vehicle.Make} ${vehicle.Model} &middot; 25 &starf; &middot; 300 <span class="fa">&#xf06e; &nbsp; <a href="#" id="${vehicle.ListingID}" onclick="displayEditScreen(this)">Edit</a>`;
        snippets.innerHTML = `<span>${vehicle.Mileage} mi</span> &middot; <span>${vehicle.TransmissionStyle}</span> &middot; <span>${vehicle.FuelTypePrimary}</span> &middot; <span>${vehicle.DriveType.slice(0,3)}</span></span>`;
        vin.innerHTML = `${vehicle.VIN}`;

        let image = document.createElement("img");
        image.style.width = "150px";
        image.src = "images/Scion iQ.jpg";

        document.querySelector("#garage").appendChild(anchor);
        anchor.appendChild(displayCard);
        displayCard.appendChild(title);
        displayCard.appendChild(snippets);
        displayCard.appendChild(vin);
        displayCard.appendChild(image);
    }
}

function displayEditScreen(editOriginator) {
    let vehicleID = editOriginator.id;
    let vehicle = JSON.parse(localStorage.getItem(`${vehicleID}`));
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

    // To-do: Add image-editing functionality

    let editButton = document.createElement('button');
    editButton.classList.add('btn');
    // editButton.style = "margin-top: 2vh";
    editButton.textContent = "Save and update";
    editButton.id = `${vehicleID}`;
    editButton.onclick = editListing;
    listing.appendChild(editButton);
}

function editListing() {
    let vehicleID = document.getElementsByClassName('btn').item(0).id;
    let vehicle = JSON.parse(localStorage.getItem(`${vehicleID}`));
    vehicle.Mileage = sanitize(document.querySelector("#edit-mileage").value);
    vehicle.Description = sanitize(document.querySelector("#edit-description").value); // To do: Disable empty fields possibility
    localStorage.setItem(`${vehicle.ListingID}`, JSON.stringify(vehicle));
    const listing = document.querySelector("#listing");
    window.location.assign("dashboard.html");
}