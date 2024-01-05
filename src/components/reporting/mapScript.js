function gotLocation(position) {
    const latitude = position?.coords?.latitude;
    const longitude = position.coords.longitude;

    const response = { latitude: latitude, longitude: longitude };

    return response;
}

function failedToGet() {
    return Promise.reject("Geolocation is not supported by this browser!");
}

const getLocation = () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve(gotLocation(position));
            },
            () => {
                reject(failedToGet());
            }
        );
    });
};

export default getLocation;
