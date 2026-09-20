// CAPSTONE — Interactive library catalog
const books = [
	{
		title: "Laskar Pelangi",
		author: "Andrea Hirata",
		rentPrice: 15000,
		category: "Novel",
		isBorrowed: true,
		onDiscount: true,
		discount: 0.1,
	},
	{
		title: "Islam ala Prabowo",
		author: "Prabowo Subianto",
		rentPrice: 12500,
		category: "Novel",
		isBorrowed: true,
		onDiscount: true,
		discount: 0.05,
	},
	{
		title: "Doraemon",
		author: "Fujiko F. Fujio",
		rentPrice: 10000,
		category: "Komik",
		isBorrowed: false,
		onDiscount: false,
		discount: 0,
	},
	{
		title: "Bumi",
		author: "Tere Liye",
		rentPrice: 18000,
		category: "Novel",
		isBorrowed: false,
		onDiscount: true,
		discount: 0.2,
	},
	{
		title: "Naruto",
		author: "Masashi Kishimoto",
		rentPrice: 12000,
		category: "Komik",
		isBorrowed: true,
		onDiscount: true,
		discount: 0.15,
	},
	{
		title: "National Geographic",
		author: "National Geographic Society",
		rentPrice: 20000,
		category: "Majalah",
		isBorrowed: false,
		onDiscount: false,
		discount: 0,
	},
	{
		title: "Intisari",
		author: "Kompas Gramedia",
		rentPrice: 10000,
		category: "Majalah",
		isBorrowed: true,
		onDiscount: true,
		discount: 0.25,
	},
];

// State
let searchTerm = "";
let activeCategory = "All";
let isSorted = false;
let showAvailableOnly = false;

// Helper: format a number as Rupiah
const rupiah = (n) => "Rp " + Math.round(n).toLocaleString("id-ID");

// Elements
const grid = document.getElementById("grid");
const countEl = document.getElementById("count");
const totalEl = document.getElementById("total");
const saleEl = document.getElementById("sale-total");
const searchEl = document.getElementById("search");
const catEl = document.getElementById("category");
const sortEl = document.getElementById("sort");
const availableEl = document.getElementById("available");

// TODO 1: create function makeCard(p)
function makeCard(p) {
	const card = document.createElement("div");
	card.classList.add("card");

	let badgeAvailabilty = "sale";
	if (p.isBorrowed) {
		badgeAvailabilty = "";
		card.classList.add("out");
	}

	p.priceDiscount = p.rentPrice * (1 - p.discount);

	card.innerHTML = `
    <h3>${p.title}</h3>
    <p class="cat">${p.author}</p>
    <p class="cat">${p.category}</p>
    ${
		p.onDiscount
			? `
        <p class="price discount">${rupiah(p.rentPrice)}</p>
        <p class="price">${rupiah(p.priceDiscount)}</p>
        <span class="badge sale">Discount: ${p.discount * 100}% </span>
        `
			: `<p class="price">${rupiah(p.rentPrice)}</p>`
	}
    ${p.isBorrowed ? `<span class="badge ${badgeAvailabilty}">Tidak Tersedia</span>` : `<span class="badge ${badgeAvailabilty}">Tersedia</span>`}
  `;

	return card;
}

// TODO 2: create function getVisible()1
function getVisible() {
	const filter = books
		.filter((b) => (showAvailableOnly ? !b.isBorrowed : true))
		.filter((b) => activeCategory == "All" || b.category == activeCategory)
		.filter((b) => b.title.toLowerCase().includes(searchTerm));
	return filter;
}

// TODO 3: create function render()
function render() {
	grid.innerHTML = ``;
	const visible = getVisible();
	const visibleLength = visible.length;
	console.log(visible);

	if (visibleLength == 0) {
		grid.innerHTML = `
        <p class="empty">No Books</p>
      `;
	} else {
		if (isSorted) {
			console.log("sorting");
			visible.sort((a, b) => a.priceDiscount - b.priceDiscount);
		}

		visible.forEach((element) => {
			grid.appendChild(makeCard(element));
		});
	}

	countEl.textContent = visibleLength;

	const availableBook = visible
		.filter((b) => !b.isBorrowed)
		.reduce((sum, b) => sum + 1, 0);
	totalEl.textContent = availableBook;

	const saleBook = visible.reduce(
		(sum, b) => sum + b.rentPrice * (1 - b.discount),
		0,
	);
	saleEl.textContent = rupiah(saleBook);
}

// TODO 5: events
catEl.addEventListener("change", (e) => {
	activeCategory = e.target.value;
	render();
});

searchEl.addEventListener("input", (e) => {
	searchTerm = e.target.value.toLowerCase();
	render();
});

sortEl.addEventListener("click", (e) => {
	e.target.classList.toggle("btn-click");
	isSorted = !isSorted;
	render();
});

availableEl.addEventListener("change", (e) => {
	showAvailableOnly = e.target.checked;
	render();
});

// TODO 6: initial paint
render();
