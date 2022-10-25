const editHabitForm = document.getElementById('editHabitForm');
editHabitForm.addEventListener('submit', editHabit);

const habitName = document.getElementById('name');

const difficulty = document.getElementsByName('difficulty');
let difficultyValue;
for (let i = 0; i < difficulty.length; i++) {
    if (difficulty[i].checked) {
        difficultyValue = difficulty[i].value;
    }
}

const frequency = document.getElementsByName('frequency');
let frequencyValue;
for (let i = 0; i < frequency.length; i++) {
    if (frequency[i].checked) {
        frequencyValue = frequency[i].value;
    }
}

const reps = document.getElementById('reps');

const Delete = document.getElementById('delete');
Delete.addEventListener('click', deleteHabit);

async function deleteHabit(e) {
    e.preventDefault();
    if(confirm('Are you sure you want to delete this habit?')) {
        try {
            const r = await fetch(`http://localhost:3000/habits/${id}`, {
                method: 'DELETE',
            });
            if (r.err){ 
                throw Error(r.err); 
            } else {
                alert('Deleted habit.');
            }
        } catch (err) {
            console.warn(`Error: ${err}`);
        }
    }
}

async function editHabit(e) {
    e.preventDefault();
    const id = localStorage.getItem('id');
    try {
        const options = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: habitName,
                difficulty: difficultyValue,
                frequency: frequencyValue,
                number_of_rep: reps
            })
        }
        const r = await fetch(`http://localhost:3000/habits/${id}`, options)
        const data = await r.json()
        if (data.err){ throw Error(data.err); }
    } catch (err) {
        console.warn(`Error: ${err}`);
    }
}
