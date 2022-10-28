const addHabitForm = document.getElementById("addHabitForm");

addHabitForm.addEventListener("submit", submitNewHabit);

async function submitNewHabit(e) {
  e.preventDefault();
  console.log('====================================');
  console.log(e.target.name.value);
  console.log(e.target.difficulty.value);
  console.log(e.target.frequency.value);
  console.log(e.target.reps.value);
  console.log('====================================');
  try {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 
        authorization:`Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify({
          name: e.target.name.value,
          difficulty: e.target.difficulty.value,
          frequency: e.target.frequency.value,
          number_of_rep: e.target.reps.value,
        })
    }
    const r = await fetch(`https://track-it-habit-backend.herokuapp.com/habits`, options)
    const data = await r.json()
    if (data.err){ throw Error(data.err); }
    window.location.href=`https://ittrack.netlify.app/dashboard.html`;
} catch (err) {
    console.warn(`Error: ${err}`);
}

  // location.href = `https://ittrack.netlify.app/dashboard`; //Should connect to the user dashboard
}
