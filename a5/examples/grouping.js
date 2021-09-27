var expenses =
    [{
        "name": "jim",
        "amount": 34,
        "date": "11/12/2015"
    }, {
        "name": "carl",
        "amount": 120.11,
        "date": "11/12/2015"
    }, {
        "name": "jim",
        "amount": 45,
        "date": "12/01/2015"
    }, {
        "name": "carl",
        "amount": 145,
        "date": "12/01/2015"
    }, {
        "name": "stacy",
        "amount": 12.00,
        "date": "01/04/2016"
    }, {
        "name": "stacy",
        "amount": 34.10,
        "date": "01/04/2016"
    }, {
        "name": "stacy",
        "amount": 44.80,
        "date": "01/05/2016"
    }];

// Group by unique names 
var expensesByName = d3.group(expenses, function(d) {
    return d.name
});
console.log(expensesByName)

// // Count the number of expenses per individual and create a list of objects with name and count 
// var expensesCount = d3.rollup(expenses,
//     function(v) {
//         return v.length
//     },
//     function(d) {
//         return d.name
//     });
// console.log(expensesCount)

// // Iterate through the data and create an object that contains the name and total expenses per person 
// var expensesTotal = d3.rollup(expenses,
//     function(v) {
//         return d3.sum(v, function(d) {
//             return d.amount;
//         })
//     },
//     function(d) {
//         return d.name;
//     });
// console.log(expensesTotal);


// // Iterate thru the data, calculate avg expenses, and create a list of objects with name & avg expense
// var expensesAvgAmount = d3.rollup(expenses,
//     function(v) {
//         return d3.mean(v, function(d) { // Remember we use d3.mean in the prev example ٩(^‿^)۶
//             return d.amount;
//         })
//     },
//     function(d) {
//         return d.name;
//     });
// console.log(expensesAvgAmount)


// // OMG! This time we're creating an object with the name, the count, the sum of all exp, and the mean ◕_◕
// var expenseMetrics = d3.rollup(expenses,
//     function(v) {
//         return {
//             count: v.length,
//             total: d3.sum(v, function(d) {
//                 return d.amount;
//             }),
//             avg: d3.mean(v, function(d) {
//                 return d.amount;
//             })
//         }
//     },
//     function(d) {
//         return d.name;
//     }
// );
// console.log(expenseMetrics);