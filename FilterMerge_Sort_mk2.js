const arrRandData = [
  61, 20, 56, 25, 73, 2, 57, 27, 73, 95, 1, 34, 4, 99, 75, 59, 96, 54, 59, 10,
  69, 74, 93, 94, 89, 94, 11, 25, 29, 71, 37, 80, 75, 39, 83, 68, 90, 94, 63, 32,
  16, 85, 15, 42, 97, 60, 34, 11, 69, 64, 50, 74, 40, 93, 91, 40, 0, 39, 16, 59,
  69, 71, 26, 53, 39, 60, 69, 77, 95, 53, 99, 16, 72, 17, 83, 84, 70, 69, 21, 48,
  37, 31, 25, 51, 71, 41, 49, 82, 24, 93, 57, 85, 40, 24, 90, 56, 30, 16, 64, 17,
  23, 24, 46, 3, 27, 4, 94, 76, 74, 60, 34, 5, 16, 0, 32, 84, 4, 64, 61, 15]

console.log('Final:', FMSort(arrRandData).join())

/* Version 2: Uses 1 new array plus the marge array
  [U1,S1] => U1->U2,S1' => [S1,S1']->S2 => [U2,S2]

  Filter
    Move Unsorted data to a new array
    Move Sorted data forward to take up any gap resulting from removing
      unsorted data, and truncate the Sorted data before the next cycle.
  Merge: Consolidate any Sorted arrays
  Repeat until there is no unsorted data.
*/

function FMSort (arrInput) {
  'use strict'
  let numCycle = 0

  function _filter (arrData, arrCollated) {
    let arrSorted = [...arrData]
    let arrUnsorted = []
    let numSorted = arrData[0]
    let numIndex = 0

    arrSorted.forEach(function (data, indx) {
      if (data < numSorted) {
        arrUnsorted.unshift(data)
      } else {
        numSorted = data
        if (numIndex !== indx) {
          arrSorted[numIndex] = arrSorted[indx]
        }
        numIndex++
      }
    })
    arrSorted = arrSorted.slice(0, numIndex)
    console.log(`Cycle ${++numCycle}:`, arrSorted.join())
    let arrMerged = (arrCollated.length) ? _merge(arrSorted, arrCollated) : arrSorted
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
