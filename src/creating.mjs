import setText, { appendText } from "./results.mjs";

export function timeout(){
    const wait = new Promise((resolve) => {
        setTimeout(() => {
            resolve("Timeout!"); // Set state to fulfill
        }, 1500);
    });// pending state

    wait.then(text => setText(text));
}

export function interval(){
    let counter = 0;
    const wait = new Promise((resolve) => {
        setInterval(() => {
            console.log("Interval")
            resolve(`Timeout! ${++counter}` ); // Set state to fulfill
        }, 1500);
    });// pending state

    wait.then(text => setText(text)).finally(() => appendText(` -- Done ${counter}`));
}

export function clearIntervalChain(){
    let counter = 0;
    let interval;
    const wait = new Promise((resolve) => {
        interval = setInterval(() => {
            console.log("Interval")
            resolve(`Timeout! ${++counter}` ); // Set state to fulfill
        }, 1500);
    });// pending state

    wait.then(text => setText(text)).finally(() => clearInterval(interval));
}

export function xhr(){
    let request = new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:3000/users/7');
        xhr.onload = () => {
            if (xhr.status === 200) {
                resolve(xhr.responseText);
            } else {
                reject(xhr.statusText)
            }
        }
        xhr.onerror = () => reject("Request failed")
        xhr.send();
    });
    request.then((result) => setText(result)).catch(err => setText(err))
}

export function allPromises(){
    let categories = axios.get('http://localhost:3000/itemCategories')
    let statuses = axios.get('http://localhost:3000/orderStatuses')
    let userTypes = axios.get('http://localhost:3000/userTypes')
    let addressTypes = axios.get('http://localhost:3000/addressTypes')

    Promise.all([categories, statuses, userTypes, addressTypes ])
        .then(([ cat, stat, type, addressTypes ]) => {
            setText("");

            appendText(JSON.stringify(cat.data));
            appendText(JSON.stringify(stat.data));
            appendText(JSON.stringify(type.data));
        }).catch(err => appendText(err))
}

export function allSettled(){
    let categories = axios.get('http://localhost:3000/itemCategories')
    let statuses = axios.get('http://localhost:3000/orderStatuses')
    let userTypes = axios.get('http://localhost:3000/userTypes')
    let addressTypes = axios.get('http://localhost:3000/addressTypes')

    Promise.allSettled([categories, statuses, userTypes, addressTypes ])
        .then((values) => {
            let results = values.map(v => {
                if (v.status === 'fulfilled') {
                    return `FULFILLED: ${JSON.stringify(v.value.data[0])} `;
                }

                return `REJECTED ${v.reason.message} `;
            })
            setText(results);
           
        })
}

export function race(){
}