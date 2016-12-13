# My-Sorts
My attempt to create a numeric sort algorithm in JavaScript

## Filter-Merge Sort
The underlying mechanism for my sort is to filter out the unsorted data items, leaving an (incrementally) ordered list. The process repeats on the unsorted list to extract more sorted and unsorted lists. The two sorted lists are merged to form a single sorted output. This process continues using a recursive call until all the unsorted data is exhausted. Using recursion is useful because it makes reasoning of the algorithms easy but it is wasteful in terms of memory being passed from one call to the next. It would not be difficult to re-work the algorithms to use additional loops in place of the recursive calls, however many sort algorithms employ this technique. 

                                  _______________
        Input ====>              /               \
                   \            /     (initially) |___________
          (prepare) \          /        (empty)  /            \
                     \        /                 /              \
                      Unsorted,           Sorted                |
                         |                   |      (recursive) ^
                         |                   |                  |
                      FILTER                \|/              -->|
                     /      \                |              /   |
                    /        \               |             /    |
            Unsorted          Sorted ----> MERGE ----> Sorted ==|==> Output
                    \                                          /
                     \ (terminate when empty)                 /
                      \______________________________________/

It is also important to note this method uses several blocks of memory (array) but their use is very simple; no shuffling or repeated swapping of values. As we move from version 1 to 3, the primary driver is to reduce the dependence on additional memory but that used for the merge operation is unavoidable.

---
###Version 1: Divide and Conquer
The first mechanism uses a simple solution that creates two new arrays, one containing the sorted data, the other the unsorted data. In total there are five arrays:

+ Unsorted input
+ Sorted input (initially empty)
+ Unsorted store (used on next cycle until empty)
+ Sorted store (temporary holding)
+ Merged output (the consolidation of both Sorted arrays as output)

---
###Version 2: Extract and Consolidate
We can reduce the number of 'store' arrays by one by keeping the Sorted data in the original array and only moving out the unsorted values into their own array. This requires sorted values to be shifted left to fill the gap formed by removing the unsorted values. There is still a need for a Merge array to consolidate the Sorted values.

One nice feature of both of the first two versions of the Filter-Merge sort is that the unsorted store is created in reverse order so each cycle in effects attacks the unsorted data from the opposite end to the previous cycle.

---
###Version 3: Top and Tail
The final approach eliminates the need for any 'store' arrays by keeping both sorted and unsorted data in the same array, but a merge array is unavoidable. This approach has a preparatory step to improve performance.

+ The first and last data item are swapped so the lowest is at the front.
+ With 3-digit datasets the middle digit is considered and swapped if necessary.
+ Only 4+ digit datasets go on for further processing.

Two indexes are kept, the first to the location of the highest sorted value in the array (front), the other to the last evaluated unsorted value (rear). We start by comparing values from the front to ensure they are in incremental order. When the comparison fails, values from the rear are compared to the current front index until either, a higher value is found and swapped or there are no unsorted values left to compare.

---
This project came about following my project implementing [12 documented Sort Alogrithms](https://github.com/TracyGJG/All_Sorts/blob/master/README.md) in JS.
