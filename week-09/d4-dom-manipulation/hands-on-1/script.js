// TODO 1: Select the <h1> and change its text
const heading = document.querySelector("h1");
heading.textContent = "Welcome Ismail!";
console.log(heading);

const subBio = document.getElementsByClassName("sub-bio");
console.log(subBio);
subBio.innerHTML = "<b>Replacing text</b>";
// TODO 2: Select the price by id and change its displayed value
const price = document.getElementById("price");
price.textContent = "Rp 20.000.000";
console.log(price);

// TODO 3: Toggle dark mode by adding the "dark" class to <body>
document.body.classList.toggle("dark");

// TODO 4: Set the alt attribute on the avatar image
document.querySelector("img").setAttribute("alt", "placeholder image");

// TODO 5 (bonus): Change the bio paragraph colour with an inline style
document.querySelector(".bio").style.color = "red";

const textSelector = document.querySelectorAll(".product-text");
console.log(textSelector);
