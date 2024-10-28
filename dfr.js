const fs = require('fs'); 


function fileExists(filename) {
  // returns true or false
  return fs.existsSync(filename) ? true : false
}


function validNumber(value) { // value can be string or numeric
 // returns a boolean 
  return /^-?\d*\.?\d+$/.test(value.toString())
}


function dataDimensions(dataframe) {
  // returns a list [rows (int), cols (int)]
  let rows = 0, cols = 0
  if (dataframe == undefined) {
    return [-1,-1]
  }
  if (!Array.isArray(dataframe[0])) {
    rows = dataframe.length
    cols = 0
  }
  else{ 
    dataframe.forEach(row => {
      rows++ 
      cols = row.length 
    });
  }
  
  return rows== 0 && cols == 0 ? [-1,-1] :
  rows == 0 && cols != 0 ? [-1, cols] :
  rows != 0 && cols == 0 ? [rows, -1] : 
  [rows, cols]
}


function calculateMean(dataset) {
  // returns a float or false
  let total = 0
  let count = 0
  if (dataset.length===0|| (Array.isArray(dataset[0]) && dataset.length === 1)){return false}
    dataset.forEach(row => {
      if (Array.isArray(row)) {
        row.forEach(value => {
          if (validNumber(value)){
            total+=parseFloat(value)
            count++
          }
        })
      }
      else{
        if (validNumber(row)){
          total+=parseFloat(row)
          count++
        }
      }
    })
    return total/count
}


function findTotal(dataset) {
  // returns float or false
  let total = 0
  if (dataset.length===0|| (Array.isArray(dataset[0]) && dataset.length === 1)){return false}
    dataset.forEach(row => {
      if (Array.isArray(row)) {
        row.forEach(value => {
          if (validNumber(value)){
            total+=parseFloat(value)
          }
        })
      }
      else{
        if (validNumber(row)){
          total+=parseFloat(row)
        }
      }
    })
    return total
  
} 


function convertToFloat(dataframe, col){ //dataframe, integer
  // returns an integer, which is the number that were  converted to floats.
  let count = 0;

  for (const row of dataframe) {
    originalValue = row[col]
  
    // Check if the original value is a valid number but not already a float
    if (validNumber(originalValue) && typeof originalValue !== 'number') {
      row[col] = parseFloat(originalValue);
      count++;
    }
  }

  // Return the count of values converted
  return count;
  
}


function flatten(dataframe) {
  // returns a dataset (a flattened dataframe)
  let newArray = []
  if (dataDimensions(dataframe)[1] == 1) {
    for(row in dataframe){
      newArray.push(dataframe[row][0])
    }
  }
  return newArray
}


function loadCSV(csvFile, ignorerows, ignorecols) {  // string, dataset, dataset
  // returns a list comprising of [dataframe, rows (integer), cols (integer)]

}


function calculateMedian(dataset) {
  // filters dataset to only include valid numbers
  dataset = dataset.filter(element => validNumber(element))
  // returns false if dataset is not valid
  if (dataset.length===0|| (Array.isArray(dataset[0]) && dataset.length === 1)){return false}
  dataset.sort((a, b) => a - b);
  let i = (dataset.length)/2
  // find average of middle 2 numbers if length is even, if odd then returns the value in the middle as a float
  return dataset.length%2 === 0 ? ( dataset[i] +  dataset[i -1])/2 : parseFloat(dataset[i - 0.5])
}



function createSlice(dataframe, colindex, colpattern, exportcols = []) { // dataframe, integer, string/numeric, dataset
  // returns a dataframe
  
}







module.exports = {
  fileExists, validNumber, dataDimensions, calculateMean, findTotal, convertToFloat, flatten, 
  loadCSV, calculateMedian, createSlice,
} 