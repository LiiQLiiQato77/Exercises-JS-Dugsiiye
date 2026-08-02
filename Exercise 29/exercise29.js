// Exercise

async function fetcData () {

    console.log("Start fetching user data");

    const result = await fetch ('./data.json');

    const data = await result.json();

    console.log(data);

};

fetcData()