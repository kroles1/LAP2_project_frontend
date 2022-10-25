const id = localStorage.getItem('id');
const allHabits = document.getElementById("allHabits");

async function fetchHabitData() {
  try {
    const rawData = await fetch(`http://localhost:3000/users/habits/${id}`); //to be changed
    const habitData = await rawData.json();
    appanedNewHabit(habitData);
  } catch (err) {
    console.log(err);
  }
}
fetchHabitData();
function appanedNewHabit(habitData) {
  const { name, difficulty, frequency, reps } = habitData;
  document.getElementById("name").textContent = name;

  const habit = document.createElement("div");
  habit.classList.add("habit");
  const plus= document.createElement("div");
  plus.classList.add("plus easy")
  plus.textContent = "+";
  const habitDetails = document.createElement("div");
  habitDetails.classList.ass("habitDetails");

  const sameLine = document.createElement("div");
  sameLine.classList.add("sameLine");
  const newName = document.createElement("h3");
  newName.textContent = name;
  const pencil = document.createElement("img");
  pencil.src = "./assets/pencil.png";
  pencil.alt = "edit habit icon";
  pencil.style.width = "40";
  pencil.style.height = "40";
  pencil.addEventListener("click", () => {
    // Store
    localStorage.setItem("id", habit.id); //to fix the path
    // go to editHabit.html
    setTimeout(() => {
        location.href = "editHabit.html";
    }, 250);
});
// const newStreak = document.createElement("p");
// newStreak.innerHTML = streak

//appending
allHabits.appendChild(habit);
  habit.appendChild(plus);
  habit.appendChild(habitDetails);
  habitDetails.appendChild(sameLine);
  sameLine.appendChild(newName);
  sameLine.appendChild(pencil);
}
