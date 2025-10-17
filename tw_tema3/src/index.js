const yearArray = [2013, 2007, 1980, 1987, 2008, 2016, 1969, 1945, 2010, 1999];

const over18 = yearArray.map((value) => 2025 - value).filter((value) => value > 18);

// console.log(over18);

const getSpecialSum = (arr, num) => arr.filter(x => x % num === 0).reduce((x, y) => x + y)

// console.log(getSpecialSum([13, 12, 10, 15, 14], 2))

function formatStr(text, substantiv, adjectiv){
    let modified = text;
    modified = modified.replace('{substantiv}', substantiv);
    modified = modified.replace('{adjectiv}', adjectiv);
    return modified;
}

// console.log(formatStr('un {substantiv} este {adjectiv}', 'catel', 'dragut'));

const reduceNew = (arr, operation) => {
    let result = arr[0];
    for(let el of arr.slice(1)){
        result = operation(result, el);
    }
    return result;
}

// console.log(reduceNew([12, 24, 36], (a, b) => a + b))

const cenzuraCNA = (text, dict) =>{
    console.log(words);
    for(let i = 0; i < words.length; i++){
        if(dict.includes(words[i])){
            words[i] = words[i].replace(words[i].slice(1, -1), '*'.repeat(words[i].length-2));
        }
    }
    text = words.join(' ').trim();
    return text;
}

// console.log(cenzuraCNA('muie garda crede ca ne-a luat banii de cuie, nu cumparam plantam deci muie...', ['muie', 'cuie']));

const objArray = [
    {
        name: 'Lapte',
        pret: 5.2,
    },
    {
        name: 'Oua',
        pret: 4.7,
    },
    {
        name: 'Bormasina Miluawkee',
        pret: 427.77,
    },
    {
        name: 'Sampon',
        pret: 8,
    },
    {
        name: 'Cirese',
        pret: 2.9,
    },
]

const sortingObjects = (arr, key) =>
    arr.sort((obj1, obj2) => 
        typeof obj1[key] === 'string' ? String(obj1[key]).localeCompare(String(obj2[key]))
                                : obj1[key] - obj2[key]);

// console.log(sortingObjects(objArray, 'name'));

const meanNew = (arr) => arr.reduce((x, y) => x + y)/arr.length;

// console.log(meanNew([1, 2, 4, 6, 7]));

//functii si array-uri