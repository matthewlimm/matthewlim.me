const counter = document.querySelector('.counter-number');
async function updateCounter() {
    let response = await fetch('https://fa3ikps5tkrdenqxnnrx5huqtq0jbkfy.lambda-url.us-west-1.on.aws/') // AWS lambda function
    let data = await response.json(); // storing response in data
    view = ordinal_suffix_of(data)
    counter.innerHTML = `<i class="fa-solid fa-eye"></i>&nbsp;You are the ${view} viewer of my website!`;
}

function ordinal_suffix_of(i) {
    let j = i % 10,
        k = i % 100;
    if (j === 1 && k !== 11) {
        return i + "st"; 
    }
    if (j === 2 && k !== 12) {
        return i + "nd";
    }
    if (j === 3 && k !== 13) {
        return i + "rd";
    }
    return i + "th";
}

updateCounter(); 