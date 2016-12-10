const arrRandData = [
  61, 20, 56, 25, 73, 2, 57, 27, 73, 95, 1, 34, 4, 99, 75, 59, 96, 54, 59, 10,
  69, 74, 93, 94, 89, 94, 11, 25, 29, 71, 37, 80, 75, 39, 83, 68, 90, 94, 63, 32,
  16, 85, 15, 42, 97, 60, 34, 11, 69, 64, 50, 74, 40, 93, 91, 40, 0, 39, 16, 59,
  69, 71, 26, 53, 39, 60, 69, 77, 95, 53, 99, 16, 72, 17, 83, 84, 70, 69, 21, 48,
  37, 31, 25, 51, 71, 41, 49, 82, 24, 93, 57, 85, 40, 24, 90, 56, 30, 16, 64, 17,
  23, 24, 46, 3, 27, 4, 94, 76, 74, 60, 34, 5, 16, 0, 32, 84, 4, 64, 61, 15]
const arrSortedData = FMSort(arrRandData)
console.log('Final:', arrSortedData.join(), `[${arrSortedData.length}]`)

/* Version 3: Uses only an additional merge array
  Prepare the input data
    Swap first and last if A[0] > A[n]
    If n=3 then
    If A[0] > A[1] then Swap A[0], A[1]
    If A[1] > A[2] then Swap A[1], A[2]
    Exit if n < 4.

  [U1,S1] => U1->U1',S1' => [S1,S1']->S2 => [U1',S2]

  Filter
    Move Unsorted data to the end of the array
    Keep Sorted data at the front of the array

  Merge: Consolidate any Sorted arrays

  Repeat until there is no unsorted data.
*/

function FMSort (arrInput) {
  'use strict'
  let cycle = 0

  function _filter (arrData, arrCollated) {
    const numDataMax = arrData.length
    let arrProcessed = [...arrData]
    let numUnsortedIndex = 1
    let numSortedIndex = 1

    /* Eliminate any small arrays or prep larger ones (>3 items) */
    if (!arrCollated.length) {
      if (arrInput[0] > arrInput[numDataMax - 1]) _swap(arrProcessed, 0, numDataMax - 1)
      if (arrInput.length === 3) {
        if (arrProcessed[0] > arrProcessed[1]) _swap(arrProcessed, 0, 1)
        if (arrProcessed[1] > arrProcessed[2]) _swap(arrProcessed, 1, 2)
      }
      console.log('Datasets prepared:', arrProcessed.join(), '\n')
      if (arrInput.length < 4) return arrProcessed
    } else {
      if (!arrData.length) return arrCollated
    }
    console.log(`Cycle ${++cycle}`)

    /* Separarte into Sorted (front) and Unsorted (rear) elements */
    while ((numSortedIndex + numUnsortedIndex) < numDataMax) {
      console.log(`${numSortedIndex}, ${numUnsortedIndex}, ${arrProcessed.join()}`)

      if (arrProcessed[numSortedIndex] < arrProcessed[numSortedIndex - 1]) {
        if (arrProcessed[numSortedIndex - 1] < arrProcessed[numDataMax - numUnsortedIndex]) {
          _swap(arrProcessed, numDataMax - numUnsortedIndex, numSortedIndex)
          numSortedIndex++
        }
        numUnsortedIndex++
      } else {
        numSortedIndex++
      }
    }

    /* Further processing if required */
    let arrSorted = arrProcessed.slice(0, numSortedIndex)
    let arrUnsorted = arrProcessed.slice(numSortedIndex)
    console.log('Sorted:', arrSorted.join())
    console.log('Unsorted:', arrUnsorted.join(), '\n')
    let arrMerged = (arrCollated.length) ? _merge(arrSorted, arrCollated) : arrSorted
    console.log('Merged:', arrMerged.join())
    return (numUnsortedIndex) ? _filter(arrUnsorted, arrMerged) : arrMerged
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
    return (numIndex < dataMax) ? arrMerged.concat(arr2.slice(numIndex)) : arrMerged
  }

  function _swap (arr, src, tgt) {
    const swp = arr[src]
    arr[src] = arr[tgt]
    arr[tgt] = swp
  }

  console.log('Initial:', arrInput.join(), `[${arrInput.length}]`)
  return (arrInput.length > 1) ? _filter(arrInput, []) : arrInput
}
