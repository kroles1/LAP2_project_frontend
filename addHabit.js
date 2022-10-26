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
    const r = await fetch("https://track-it-backend.onrender.com/habits", options)
    const data = await r.json()
    if (data.err){ throw Error(data.err); }
} catch (err) {
    console.warn(`Error: ${err}`);
}

  // location.href = `https://ittrack.netlify.app/dashboard`; //Should connect to the user dashboard
}
