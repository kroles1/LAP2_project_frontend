const userID = localStorage.getItem('userId');
const level = document.getElementById('level');
const expAmount = document.getElementById('expAmount');
const exp = document.getElementById('exp')

async function fetchUserData() {
  try {
    const rawData = await fetch(`http://localhost:3000/users/${userID}`);
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

const noHabits = document.getElementById("noHabits");

async function fetchHabitData() {
  try {
    // const rawData = await fetch(`http://localhost:3000/habits/${id}`);
    const options = {
      method: 'GET',
      headers: { authorization:`Bearer ${localStorage.getItem('token')}` },
      // body: JSON.stringify(Object.fromEntries(new FormData(e.target)))
  }
    const rawData = await fetch(`http://localhost:3000/habits`, options)
    console.log(rawData);
    if(rawData.ok) {
      const habitData = await rawData.json();
      noHabits.classList.toggle('hide')
      console.log(habitData);
      appendNewHabit(habitData);
    } else {
      console.log('No habits to append');
      noHabits.classList.remove('hide')
    }
    // const habitData = await rawData.json();
    // console.log(habitData);
    // appendNewHabit(habitData);
  } catch (err) {
    console.log('catching error')
    console.log(err.message);
  }
}
fetchHabitData();

function appendNewHabit(habitData) {
  const { name, difficulty, frequency, streak } = habitData;
  console.log(habitData)
  document.getElementById("name").textContent = name;

  const habit = document.createElement("div");
  habit.classList.add("habit");
  const plus= document.createElement("div");
  // plus.classList.add("plus easy")
  plus.classList.add("plus")
  switch(difficulty){
    case 'easy':
      plus.classList.add('easy')
      break;
    case 'medium':
      plus.classList.add('medium')
      break;
    case 'hard':
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

const logOut = document.getElementById('out');
logOut.addEventListener('click', () => {
  window.location.href='./index.html';
  localStorage.clear();
})
