// // Displays every data feature as a string 
// d3.csv("cities.csv").then(function(data) {
//     console.log(data[0]);
//     // console.log(data[1]);
// });


// // Convert numerical data from string to a number using the + operator 
// d3.csv("cities.csv").then(function(data) {
//     data.forEach(function(d) {
//         d.population = +d.population;
//         d["land area"] = +d["land area"];
//     });
//     console.log(data[0]);
// });

//dot notation makes it easy to extract variables from a file 
d3.csv("cities.csv", function(d) {
    return {
        city: d.city,
        state: d.state, // easy to extract only data features that you need 
        population: +d.population,
        land_area: +d["land area"] // can rename properties such as "land_area" instead of "land area" 
    };
}).then(function(data) {
    // console.log(d3.min(data, function(d) { // Iterates over the data and returns the minimum value
    //     return d.land_area
    // }));
    // console.log(d3.max(data, function(d) { // Iterates over the data and returns the maximum value
    //     return d.land_area
    // }));
    // console.log(d3.extent(data, function(d) {
    //     return d.land_area // Includes the min and the max 
    // }));
    console.log(d3.mean(data, function(d) { // Iterates and returns the mean value 
        return d.land_area
    }));
    console.log(d3.median(data, function(d) { // Iterates and returns the median 
        return d.land_area
    }));
    console.log(d3.deviation(data, function(d) { // Iterates and returns the standard deviation 
        return d.land_area
    }));
});


var data = [{
    "city": "seattle",
    "state": "WA",
    "population": 652405,
    "land_area": 83.9
}, {
    "city": "new york",
    "state": "NY",
    "population": 8405837,
    "land_area": 302.6
}, {
    "city": "boston",
    "state": "MA",
    "population": 645966,
    "land_area": 48.3
}, {
    "city": "kansas city",
    "state": "MO",
    "population": 467007,
    "land_area": 315
}, {
    "city": "SFO",
    "state": "CA",
    "population": 467007,
    "land_area": 315
}];

var count = 0;

data.forEach(function(d) {
    count += 1;
});

console.log("This array contains " + count + " elements");

// Or you could just use the .length to get the length of the array ¯\_(ツ)_/¯
console.log(data.length);