// Exercise 35

function changeImage () {

    const imageUrl = prompt("Enter the new image URL:");

    const borderColor = prompt("Enter the border color:");

    const width = prompt("Enter image width (px):");

    const height = prompt("Enter image height (px):");

    const borderRadius = prompt("Enter border radius (px):");


    const image = document.querySelector('#img');

    image.setAttribute('src', imageUrl);

    image.style.border = `3px solid ${borderColor}`;

    image.style.width = `${width}px`;

    image.style.height = `${height}px`;

    image.style.borderRadius = `${borderRadius}px`


    // url = prompt('Enter your link Image');

    // wd = prompt('Enter Ur whidth')

    // hg = prompt('Enter Ur height')

    // brd = prompt('Enter ur border ')

    // br = prompt('Enter Ur border radius');

    // image.setAttribute('src', url);

    // image.setAttribute('width', wd);

    // image.setAttribute('height', hg);

    // image.setAttribute('borderRadius', br)

    // image.setAttribute('border', brd) ;



    // image.setAttribute('src', 'https://images.unsplash.com/photo-1599837565318-67429bde7162?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGh0bWx8ZW58MHx8MHx8fDA%3D')
}