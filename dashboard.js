const userID = localStorage.getItem('userId');
const level = document.getElementById('level');
const expAmount = document.getElementById('expAmount');
const exp = document.getElementById('exp')

async function fetchUserData() {
  try {
    const rawData = await fetch(`http://localhost:3000/users/${userID}`);
    const userData = await rawData.json();
    console.log(userData)
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
      const habitsData = await rawData.json();
      noHabits.classList.toggle('hide')
      console.log(habitsData);
      habitsData.forEach(habit => {
        appendNewHabit(habit);
      })
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
    const { id, name, difficulty, frequency, streak } = habitData;
    const habit = document.createElement("div");
    habit.classList.add("habit");

    const plus = document.createElement("div");
    plus.classList.add("plus")
    switch(difficulty){
      case 'easy':
        plus.classList.add('easyPlus')
        plus.classList.remove('medPlus')
        plus.classList.remove('hardPlus')
        break;
      case 'medium':
        plus.classList.add('medPlus')
        plus.classList.remove('easyPlus')
        plus.classList.remove('hardPlus')
        break;
      case 'hard':
        plus.classList.add('hardPlus')
        plus.classList.remove('medPlus')
        plus.classList.remove('easyPlus')
    }
    plus.textContent = "+";
    plus.addEventListener("click", () => { 
      localStorage.setItem("id", id)
      updateExp(localStorage.getItem('id'));
    });

    const habitDetails = document.createElement("div");
    habitDetails.classList.add("habitDetails");

    const sameLine = document.createElement("div");
    sameLine.classList.add("sameLine");

    const habitName = document.createElement("h3");
    habitName.textContent = name;

    const pencil = document.createElement("img");
    pencil.src = "./assets/pencil.png";
    pencil.alt = "edit habit icon";
    pencil.style.width = "40px";
    pencil.style.height = "40px";
    pencil.addEventListener("click", () => {
      // Store
      localStorage.setItem("id", id); //to fix the path
      // go to editHabit.html
      setTimeout(() => {
          location.href = "./editHabit.html";
      }, 250);
  });
    const displayedStreak = document.createElement("p");
    displayedStreak.classList.add('streak');
    // const span = document.createElement('span')
    displayedStreak.textContent = `${frequency.toUpperCase()} ${streak} 🔥`;
    // span.appendChild(displayedStreak)

  //appending
    allHabits.appendChild(habit);
    habit.appendChild(plus);
    habit.appendChild(habitDetails);
    habitDetails.appendChild(sameLine);
    habitDetails.appendChild(displayedStreak);
    sameLine.appendChild(habitName);
    sameLine.appendChild(pencil);
}

const logOut = document.getElementById('out');
logOut.addEventListener('click', () => {
  window.location.href='./index.html';
  localStorage.clear();
})

async function updateExp(id) {
  try {
      const options = {
          method: 'PATCH',
          headers: {  authorization:`Bearer ${localStorage.getItem('token')}` },
      }
      const r = await fetch(`http://localhost:3000/habits/${id}`, options)
      console.log(r)
      const data = await r.json()
      console.log(data)
      if(data.streak === 1){
// need to call function to update user level, exp
        fetchUserData()
        document.getElementsByClassName('streak').textContent = `${data.frequency.toUpperCase()} ${data.streak} 🔥`;
        location.reload()
      }
      if (data.err){ throw Error(data.err); }
  } catch (err) {
      console.warn(`Error: ${err}`);
  }
}
