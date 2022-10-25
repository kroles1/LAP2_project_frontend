const addHabitForm = document.getElementById("addHabitForm");

addHabitForm.addEventListener("submit", submitNewHabit);

async function submitNewHabit(e) {
  e.preventDefault();
  try {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: e.target.name.value,
          difficulty: e.target.difficulty.value,
          frequency: e.target.frequency.value,
          number_of_reps: e.target.reps.value,
        })
    }
    const newHabit = await fetch("http://localhost:3000/habits", options)
    const data = await r.json()
    if (data.err){ throw Error(data.err); }
} catch (err) {
    console.warn(`Error: ${err}`);
}

  location.href = `http://127.0.0.1:5500/dashboard.html`; //Should connect to the user dashboard
}
