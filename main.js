function processVehicleData(input) {
    let vin = input;
    let url = `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValuesExtended/${vin}?format=json`;
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        const vehicle = JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(data, null, "  ")).Results))[0]));

        const vehicleData = document.querySelector("#vehicleData");
        while (vehicleData.firstChild) { vehicleData.removeChild(vehicleData.lastChild); }

        if (vehicle.ErrorCode != 0) {
            const error = document.createElement('p');
            error.textContent = "Hold up! That's not a real car! Try once more.";
            vehicleData.appendChild(error);
        }
        
        else {
            let yearLabel = document.createElement('label');
            yearLabel.textContent = "Year:";
            let year = document.createElement('input');
            year.value = vehicle.ModelYear;
            year.readOnly = true;

            let makeLabel = document.createElement('label');
            makeLabel.textContent = "Make:";
            let make = document.createElement('input');
            make.value = vehicle.NCSAMake;
            make.readOnly = true;

            let modelLabel = document.createElement('label');
            modelLabel.textContent = "Model:";
            let model = document.createElement('input');
            model.value = vehicle.Model;            
            model.readOnly = true;

            let fuelLabel = document.createElement('label');
            fuelLabel.textContent = "Fuel type:";
            let fuel = document.createElement('input');
            fuel.value = `${vehicle.FuelTypePrimary} and ${vehicle.FuelTypeSecondary}`;            
            fuel.readOnly = true;

            let drivetrainLabel = document.createElement('label');
            drivetrainLabel.textContent = "Drivetrain:";
            let drivetrain = document.createElement('input');
            drivetrain.value = vehicle.DriveType;            
            drivetrain.readOnly = true;

            let transmissionLabel = document.createElement('label');
            transmissionLabel.textContent = "Transmission:";
            let transmission = document.createElement('input');
            transmission.value = vehicle.TransmissionStyle;            
            transmission.readOnly = true;

            let engineLabel = document.createElement('label');
            engineLabel.textContent = "Engine:";
            let engine = document.createElement('input');
            let inline = "In-Line";
            let vshaped = "V-Shaped";
            if (inline.localeCompare(vehicle.EngineConfiguration) === 0) { engine.value = `${vehicle.DisplacementL}L I-${vehicle.EngineCylinders}`; }
            else if (vshaped.localeCompare(vehicle.EngineConfiguration) === 0) { engine.value = `${vehicle.DisplacementL}L V${vehicle.EngineCylinders}`; }
            else { engine.value = `${vehicle.DisplacementL}L ${vehicle.EngineCylinders} cyl` }
            engine.readOnly = true;

            let doorsLabel = document.createElement('label');
            doorsLabel.textContent = "Doors:";
            let doors = document.createElement('input');
            doors.value = vehicle.Doors;            
            doors.readOnly = true;

            vehicleData.appendChild(yearLabel);
            vehicleData.appendChild(year);

            vehicleData.appendChild(makeLabel);
            vehicleData.appendChild(make);

            vehicleData.appendChild(modelLabel);
            vehicleData.appendChild(model);

            vehicleData.appendChild(fuelLabel);
            vehicleData.appendChild(fuel);

            vehicleData.appendChild(drivetrainLabel);
            vehicleData.appendChild(drivetrain);

            vehicleData.appendChild(transmissionLabel);
            vehicleData.appendChild(transmission);

            vehicleData.appendChild(engineLabel);
            vehicleData.appendChild(engine);

            vehicleData.appendChild(doorsLabel);
            vehicleData.appendChild(doors);

            console.log(vehicle);

            //If data is null, make readOnly false
        }
    });
}