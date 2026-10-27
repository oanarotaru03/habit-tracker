const habitInput = document.getElementById("habitInput");
const addBtn = document.getElementById("addBtn");
const habitList = document.getElementById("habitList");
const progressDisplay = document.getElementById("progressDisplay");
let habits = [];

function saveHabits() {
    localStorage.setItem("habits", JSON.stringify(habits));
}

function loadHabits() {
    const saved = localStorage.getItem("habits");
    if (saved) {
        habits = JSON.parse(saved);
        renderHabits();
    }
}

function addHabit() {
    const name = habitInput.value;

    if (name === "") {
        return;
    }

    const habit = { name, done: false };
    habits.push(habit);
    saveHabits();

    renderHabits();

    habitInput.value = "";
}

function renderHabits() {
    habitList.innerHTML = "";

    let doneCount = 0;

    habits.forEach((habit, index) => {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = habit.name;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");

        if (habit.done) {
            li.classList.add("done");
            doneCount += 1;
        }

        span.addEventListener("click", () => {
            habit.done = !habit.done;
            saveHabits();
            renderHabits();
        });

        deleteBtn.addEventListener("click", () => {
            habits.splice(index, 1);
            saveHabits();
            renderHabits();
        });

        li.appendChild(span);
        li.appendChild(deleteBtn);
        habitList.appendChild(li);
    });

    progressDisplay.textContent = `${doneCount} / ${habits.length} done`;
}

addBtn.addEventListener("click", addHabit);
loadHabits();