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

            vehicleData.appendChild(yearLabel);
            vehicleData.appendChild(year);

            vehicleData.appendChild(makeLabel);
            vehicleData.appendChild(make);

            vehicleData.appendChild(modelLabel);
            vehicleData.appendChild(model);

            //Fuel type
            //Drivetrain
            //Transmission
            //Cylinders and displacement

            //If data is null, make readOnly false
        }
    });
}