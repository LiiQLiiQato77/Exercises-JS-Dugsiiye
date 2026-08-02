// Exercise 31

async function fetchUsersdData () {
    try {
        const respond = await fetch('https://jsonplaceholder.typicode.com/users');

        if (!respond.ok) {
            throw new Error(`HTTP failed! Status: ${respond.status}`);
            
        };

        const data = await respond.json();
        console.log(data);
        
    } catch (error) {
        console.log(error)
    }
};
fetchUsersdData()