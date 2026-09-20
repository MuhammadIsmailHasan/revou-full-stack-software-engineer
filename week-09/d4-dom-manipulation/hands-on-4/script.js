// EXERCISE — Interactive task list. Array is the single source of truth.

// 1) Data: start with a couple of tasks
let tasks = [{ text: "Learn the DOM" }, { text: "Practice events" }];

const list = document.getElementById("task-list");

function render(items = tasks) {
	list.innerHTML = "";
	if (items.length === 0) {
		list.innerHTML = `
			<li class="empty">No task yet</li>
		`;
	}

	console.log(`items from render`);
	console.log(items);
	items.forEach((item) => {
		const task = document.createElement("li");
		task.innerHTML = `
			<span>${item.text}</span>
			<button class="btn-remove">x</button>
		`;
		task.classList.add("task");

		list.appendChild(task);
	});
}
render();

// 3) SUBMIT — add a task
const form = document.getElementById("task-form");
form.addEventListener("submit", (event) => {
	event.preventDefault();
	tasks.push({
		text: event.target.text.value,
	});

	event.target.reset();

	console.log(`items from submit`);
	console.log(tasks);
	render();
});

// 4) INPUT — filter tasks live
const filter = document.getElementById("filter");
filter.addEventListener("input", (event) => {
	console.log(event);
	const term = event.target.value.toLowerCase();

	render(tasks.filter((t) => t.text.toLowerCase().includes(term)));
});

// 5) CLICK — toggle dark mode
document.getElementById("theme-btn").addEventListener("click", (event) => {
	document.body.classList.toggle("dark");
});

// 6) DELEGATION — remove a task when its Remove button is clicked
list.addEventListener("click", (e) => {
	if (e.target.matches(".btn-remove")) {
		const text = e.target.closest("li").querySelector("span").textContent;
		tasks = tasks.filter((t) => t.text !== text);
		render(tasks);
	}
});
