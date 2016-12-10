const arrRandData = [
  61, 20, 56, 25, 73, 2, 57, 27, 73, 95, 1, 34, 4, 99, 75, 59, 96, 54, 59, 10,
  69, 74, 93, 94, 89, 94, 11, 25, 29, 71, 37, 80, 75, 39, 83, 68, 90, 94, 63, 32,
  16, 85, 15, 42, 97, 60, 34, 11, 69, 64, 50, 74, 40, 93, 91, 40, 0, 39, 16, 59,
  69, 71, 26, 53, 39, 60, 69, 77, 95, 53, 99, 16, 72, 17, 83, 84, 70, 69, 21, 48,
  37, 31, 25, 51, 71, 41, 49, 82, 24, 93, 57, 85, 40, 24, 90, 56, 30, 16, 64, 17,
  23, 24, 46, 3, 27, 4, 94, 76, 74, 60, 34, 5, 16, 0, 32, 84, 4, 64, 61, 15]

console.log('Final:', FMSort(arrRandData).join())

/* Version 1: Uses 2 new arrays plus the merge array
  [U1,S1] => U1->U2,S2 => [S1,S2]->S3 => [U2,S3]

  Filter
    Move Unsorted data to a new array
    Move Sorted data to another array
  Merge: Consolidate any Sorted arrays
  Repeat until there is no unsorted data.
*/

function FMSort (arrInput) {
  'use strict'
  let numCycle = 0

  function _filter (arrData, arrCollated) {
    let arrSorted = []
    let arrUnsorted = []
    let arrMerged = []
    let numSorted = arrData[0]

    arrData.forEach(function (data) {
      if (data < numSorted) {
        arrUnsorted.unshift(data)
      } else {
        numSorted = data
        arrSorted.push(numSorted)
      }
    })
    console.log(`Cycle ${++numCycle}:`, arrSorted.join())
    arrMerged = (arrCollated.length) ? _merge(arrSorted, arrCollated) : arrSorted
    return (arrUnsorted.length) ? _filter(arrUnsorted, arrMerged) : arrMerged
  }

  function _merge (arr1, arr2) {
    const dataMax = arr2.length
    let arrMerged = []
    let numIndex = 0
    arr1.forEach(function (data) {
      while ((numIndex < dataMax) && (data > arr2[numIndex])) {
        arrMerged.push(arr2[numIndex++])
      }
      arrMerged.push(data)
    })
    if (numIndex < dataMax) {
      arrMerged = arrMerged.concat(arr2.slice(numIndex))
    }
    console.log('Merged:', arrMerged.join())
    return arrMerged
  }

  console.log('Initial:', arrInput.join())
  return _filter(arrInput, [])
}
