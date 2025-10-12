let strConcat = (arg1, arg2) => {
  if (arg1 === undefined) {
    return "Missing arguments";
  } else if (arg2 === undefined) {
    return arg1;
  } else {
    return arg1 + arg2;
  }
};

// console.log(strConcat(process.argv[2], process.argv[3]))

function checkStrEq(arg1, arg2) {
  if (arg1.length !== arg2.length) {
    return -1;
  }
  let arr1 = arg1.split("");
  let arr2 = arg2.split("");
  let diff = 0;
  for (let i = 0; i < arr1.length; i++) {
    diff = arr1[i] !== arr2[i] ? diff + 1 : diff;
  }
  return diff;
}

// console.log(checkStrEq(process.argv[2], process.argv[3]))

function generateNumArray() {
  let arr = [];
  for (let e of process.argv.slice(2)) {
    arr.push(e);
  }
  return arr;
}

// console.log(generateNumArray())

function intercalateArrays(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return "The arrays do not have the same length";
  }
  let res = [];
  for (let i = 0; i < arr1.length; i++) {
    res.push(arr1[i]);
    res.push(arr2[i]);
  }
  return res;
}

// console.log(intercalateArrays([1,3,5], [2,4,6]))

function fibonacciSequence(n) {
  if (n === 0) {
    return 0;
  } else if (n === 1) {
    return 1;
  } else {
    return fibonacciSequence(n - 1) + fibonacciSequence(n - 2);
  }
}

// let n = Number(process.argv[2])
// console.log(fibonacciSequence(n));

function letterAppearances(letters, text){
    let freq = new Array(letters.length);
    freq.fill(0);
    for(let l of text){
        for(let index in letters){
            if(l.toLowerCase() === letters[index].toLowerCase()){
                freq[index]++;
            }
        }
    }
    return freq;
}

// console.log(letterAppearances(['l', 'o', 'x'], "Lorem ipsum dolor sit amet"))