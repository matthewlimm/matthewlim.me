const counter = document.querySelector('.counter-number');

async function updateCounter() {
    let data;

    // Check if the view has already been counted in this session
    if (!localStorage.getItem('viewCounted')) {
        console.log("Session not counted yet. Incrementing counter...");

        // If not counted, send a POST request to increment the counter
        let response = await fetch('https://fa3ikps5tkrdenqxnnrx5huqtq0jbkfy.lambda-url.us-west-1.on.aws/', {
            method: 'POST'
        });
        let result = await response.json(); // Parse the JSON response
        console.log(result)
        data = result.views; // Extract the views count

        // Mark session as counted
        localStorage.setItem('viewCounted', 'true');
        console.log("Session marked as counted.");
    } else {
        console.log("Session already counted. Fetching current count...");

        // If already counted, send a GET request to retrieve the current count
        let response = await fetch('https://fa3ikps5tkrdenqxnnrx5huqtq0jbkfy.lambda-url.us-west-1.on.aws/');
        let result = await response.json(); // Parse the JSON response
        data = result.views; // Extract the views count
    }

    // Display the view count with an ordinal suffix
    let view = ordinal_suffix_of(data);
    counter.innerHTML = `<i class="fa-solid fa-eye"></i>&nbsp;You are the ${view} viewer of my website!`;

    // For debugging: log the current view count
    console.log(`Current view count: ${data}`);
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