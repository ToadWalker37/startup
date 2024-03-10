function processVehicleData(input) {
    let vin = input;
    let url = `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValuesExtended/${vin}?format=json`;
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        const vehicle = JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(data, null, "  ")).Results))[0]));

        if (vehicle.ErrorCode != 0) {
            const error = document.createElement('p');
            error.textContent = "Hold up! That's not a real car! Try once more.";
            document.querySelector('#vehicleData').appendChild(error);
        }
        
        else {
        const yearLabel = document.createElement('label');
        yearLabel.textContent = "Year:";
        const year = document.createElement('input');
        year.value = vehicle.ModelYear;
        year.readOnly = true;

        const makeLabel = document.createElement('label');
        makeLabel.textContent = "Make:";
        const make = document.createElement('input');
        make.value = vehicle.NCSAMake;
        make.readOnly = true;

        const modelLabel = document.createElement('label');
        modelLabel.textContent = "Model:";
        const model = document.createElement('input');
        model.value = vehicle.Model;
        model.readOnly = true;

        

        document.querySelector('#vehicleData').appendChild(yearLabel);
        document.querySelector('#vehicleData').appendChild(year);

        document.querySelector('#vehicleData').appendChild(makeLabel);
        document.querySelector('#vehicleData').appendChild(make);

        document.querySelector('#vehicleData').appendChild(modelLabel);
        document.querySelector('#vehicleData').appendChild(model);

        //Fuel type
        //Drivetrain
        //Transmission
        //Cylinders and displacement


        console.log(vehicle)}
    });
}