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
            if ("".localeCompare(vehicle.ModelYear) !== 0) { year.readOnly = true; }

            vehicleData.appendChild(yearLabel);
            vehicleData.appendChild(year);

            let makeLabel = document.createElement('label');
            makeLabel.textContent = "Make:";
            let make = document.createElement('input');
            make.value = vehicle.Make.toLowerCase().charAt(0).toUpperCase() + vehicle.Make.toLowerCase().slice(1);
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
                fwd.textContent = "FWD (front-wheel drive)";
                let rwd = document.createElement('option');
                rwd.textContent = "RWD (rear-wheel drive)";
                let awd = document.createElement('option');
                awd.textContent = "AWD (all-wheel drive)";
                let fourxfour = document.createElement('option');
                fourxfour.textContent = "4x4 (four-wheel drive)";
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
            if ("In-Line".localeCompare(vehicle.EngineConfiguration) === 0) { engine.value = `${vehicle.DisplacementL}L I-${vehicle.EngineCylinders}`; }
            else if ("V-Shaped".localeCompare(vehicle.EngineConfiguration) === 0) { engine.value = `${vehicle.DisplacementL}L V${vehicle.EngineCylinders}`; }
            else { engine.value = `${vehicle.DisplacementL}L ${vehicle.EngineCylinders}-cyl` }
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
                vehicleData.appendChild(doors);
            }
        }
    });
}