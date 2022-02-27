import setText, {appendText, showWaiting, hideWaiting} from "./results.mjs";

export function get() {
    axios.get("http://localhost:3000/orders/1") // calling async function (http get request)
    .then(({data}) => { // chains a then function onto that request (after it completes, run this function next)
        setText(JSON.stringify(data))
    });
}

export function getCatch() {
    axios.get("http://localhost:3000/orders/1") // calling async function (http get request)
    .then(({data}) => { // chains a then function onto that request (after it completes, run this function next)
        setText(JSON.stringify(data));
    })
    .catch((err) => {setText(err)});
}

export function chain() {
    axios.get("http://localhost:3000/orders/1") // calling async function (http get request)
    .then(({data}) => { // chains a then function onto that request (after it completes, run this function next)
        return axios.get(`http://localhost:3000/addresses/${data.shippingAddress}`); // Returns another Promise object
    })
    .then(({ data }) => { // Consumes the previous promise object
        setText(`City: ${data.city}`);
    })
}

export function chainCatch() {
    axios.get("http://localhost:3000/orders/1") // calling async function (http get request)
    .then(({data}) => { // chains a then function onto that request (after it completes, run this function next)
        return axios.get(`http://localhost:3000/addresses/${data.shippingAddress}`); // Returns another Promise object
    })
    .then(({ data }) => { // Consumes the previous promise object
        setText(`City: ${data.city}`);
    })
    .catch(err => setText(err)) //  will catch any error in any of the previous calls
}

export function final() {
    showWaiting();
    axios.get("http://localhost:3000/orders/1") // calling async function (http get request)
    .then(({data}) => { // chains a then function onto that request (after it completes, run this function next)
        return axios.get(`http://localhost:3000/addresses/${data.shippingAddress}`); // Returns another Promise object
    })
    .then(({ data }) => { // Consumes the previous promise object
        setText(`City: ${data.city}`);
    })
    .catch(err => setText(err)) //  will catch any error in any of the previous calls
    .finally(() => {
        setTimeout(() => {
            hideWaiting();
        }, 1500);
        appendText(" == All Done!")
    });
}