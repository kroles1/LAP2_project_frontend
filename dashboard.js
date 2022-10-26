const userID = localStorage.getItem('userID');
const level = document.getElementById('level');
const expAmount = document.getElementById('expAmount');
const exp = document.getElementById('exp')

async function fetchUserData() {
  try {
    const rawData = await fetch(`https://track-it-backend.onrender.com/users/${userID}`);
    const userData = await rawData.json();
    const userLevel = userData.level;
    const userExp = userData.exp;
    level.textContent = `Level ${userLevel}`;
    expAmount.textContent = `${userExp} exp`;
    exp.style.width = `${userExp}%`;
  } catch (err) {
    console.log(err);
  }
}
fetchUserData()

const id = localStorage.getItem('id');
const allHabits = document.getElementById("allHabits");

async function fetchHabitData() {
  try {
    const rawData = await fetch(`https://track-it-backend.onrender.com/habits/${id}`);
    const habitData = await rawData.json();
    appendNewHabit(habitData);
  } catch (err) {
    console.log(err);
  }
}
fetchHabitData();

function appendNewHabit(habitData) {
  const { name, difficulty, frequency, streak } = habitData;
  document.getElementById("name").textContent = name;

  const habit = document.createElement("div");
  habit.classList.add("habit");
  const plus= document.createElement("div");
  // plus.classList.add("plus easy")
  plus.classList.add("plus")
  switch(difficulty){
    case 'e':
      plus.classList.add('easy')
      break;
    case 'm':
      plus.classList.add('medium')
      break;
    case 'h':
      plus.classList.add('hard')
  }
  plus.textContent = "+";
  const habitDetails = document.createElement("div");
  habitDetails.classList.add("habitDetails");

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
        location.href = "./editHabit.html";
    }, 250);
});
  const displayedStreak = document.createElement("p");
  displayedStreak.classList.add('streak');
  const freq = frequency.toUpperCase();
  displayedStreak.textContent = `${freq} ${streak} 🔥`;

//appending
  allHabits.appendChild(habit);
  habit.appendChild(plus);
  habit.appendChild(habitDetails);
  habitDetails.appendChild(sameLine);
  habitDetails.appendChild(displayedStreak);
  sameLine.appendChild(newName);
  sameLine.appendChild(pencil);
}
