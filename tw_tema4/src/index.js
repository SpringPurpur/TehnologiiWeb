

//obiecte si programare asincrona

class Ascending {
    #value;
    #nextValue;
    static #count = 0;
    constructor(value) {
        this.#value = value % 2 === 0 ? value : value + 1;
        this.#nextValue = this.#value + 2;
        Ascending.#count++;
    }

    get next() {
        this.#value = this.#nextValue;
        return this.#value;
    }
}

// const objct = new Ascending(3);
// console.log(objct.next)

class Software {
    #name;
    constructor(name){
        this.#name = name;
    }
    run() {}
}

class PlugIn {
    name;
    constructor(name){
        this.name = name;
    }

    get name(){
        return this.name;
    }
}

class Browser extends Software {
    #pluginList = [];

    constructor(name){
        super(name);
    }

    addPlugin(plugin){
        this.#pluginList.push(plugin);
    }

    get pluginList() {
        return this.#pluginList;
    }
}

// const browserObj = new Browser('Chrome');
// browserObj.addPlugin(new PlugIn('UBlock origin'));
// console.log(browserObj.pluginList);

function recursiveExp() {
    const cache = [1];

    const rex = (n, pow) => {
        if (cache[pow] !== undefined) {
            console.log('Extras din cache!');
            return cache[pow];
        }

        if (pow === 0) return 1;

        cache[pow] = n * rex(n, pow - 1);
        return cache[pow];
    };
    return rex;
}

// const func = recursiveExp();
// console.log(func(2, 3));
// console.log(func(2, 4));
// console.log(func(2, 5));
// console.log(func(2, 4));
// console.log(func(2, 9));

Number.prototype.times = function(funct) {
    for(let i = 0; i < this; i++){
        funct();
    }
}

// Number(4).times(() => {console.log("Executed");});

const increaseSalary = (salaries, percent) => {
    if(!Array.isArray(salaries) || typeof percent !== 'number'){
        throw new Error("Invalid datatype");
    }
    else {
        salaries.forEach((element, index, arr) => {
            arr[index] = element * (percent+100)/100;
        });
    }
}

// const salaries = [1000, 2000, 2500, 3000];
// const percent = 15;
// increaseSalary(salaries, percent);
// console.log(salaries);

class Student {
    id;
    name;
    year;

    constructor(id, name, year){
        this.id = id;
        this.name = name;
        this.year = year;
    }

    static copyConstructor(stud){
        const newStud = new Student();
        newStud.id = stud.id;
        newStud.name = stud.name;
        newStud.year = stud.year;
        return newStud;
    }
}

const stud1 = new Student(1, "Vasile", 2);
const stud2 = Student.copyConstructor(stud1);

// console.log(stud1);
// console.log(stud2);

const rle = (text, operation) => {
    if((typeof text !== 'string' && !(text instanceof String)) || typeof operation !== 'boolean')
        throw Error('InvalidType')

    if(operation === true){
        if(/\d/.test(text))
            throw Error('InvalidInput')

        let c = 1;
        let result = '';
        if(text.length === 1) return `${text}1`;
        for(let i = 0; i < text.length - 1; i++){
            if(text[i] === text[i+1]) c++;
            else {
                result += `${text[i]}${c}`;
                c = 1;
            }
        }
        result += `${text[text.length-1]}${c}`;
        return result;
    }
    else {
        let result = '';
        let letter = text[0];
        let number = '';
        for(let i = 1; i < text.length; i++){
            if(/^\d+$/.test(text[i])){
                number += text[i];
            }
            else {
                result += letter.repeat(Number(number));
                number = '';
                letter = text[i];
            }
        }
        result += letter.repeat(Number(number));
        return result;
    }
}

// console.log(rle('W12B1W12B3W24B1W14', false));
// W12B1W12B3W24B1W14
// WWWWWWWWWWWWBWWWWWWWWWWWWBBBWWWWWWWWWWWWWWWWWWWWWWWWBWWWWWWWWWWWWWW

function shiftCharacter(char, shift) {
    const isUpperCase = char >= 'A' && char <= 'Z';
    const isLowerCase = char >= 'a' && char <= 'z';
    
    if (!isUpperCase && !isLowerCase) {
        return char;
    }

    const baseCode = isUpperCase ? 'A'.charCodeAt(0) : 'a'.charCodeAt(0);
    const charPosition = char.charCodeAt(0) - baseCode;
    const newPosition = (charPosition + shift + 26) % 26;
    
    return String.fromCharCode(baseCode + newPosition);
}

const caesar = (text, operation, options) => {
    if((typeof text !== 'string' && !(text instanceof String)) || typeof operation !== 'boolean')
        throw Error('InvalidType')
    if(!/^[a-zA-Z\s]+$/.test(text) || !options.hasOwnProperty('shift'))
        throw Error('InvalidInput');
    else if(typeof options['shift'] !== 'number' || options['shift'] < 0 || options['shift'] > 26)
        throw Error('InvalidInput');

    let shift = options['shift'];
    let result = '';
    if(operation === true){
        for(let i = 0; i < text.length; i++){
            result += shiftCharacter(text[i], shift);
        }
    }
    else {
        for(let i = 0; i < text.length; i++){
            result += shiftCharacter(text[i], -shift);
        }
    }
    return result;
}

console.log(caesar("rovvy gybvn", false, {shift: 10}))