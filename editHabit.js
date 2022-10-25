const editHabitForm = document.getElementById('editHabitForm');
editHabitForm.addEventListener('submit', editHabit);

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
                name: e.target.name.value,
                difficulty: e.target.difficulty.value,
                frequency: e.target.frequency.value,
                number_of_rep: e.target.reps.value
            })
        }
        const r = await fetch(`http://localhost:3000/habits/${id}`, options)
        const data = await r.json()
        if (data.err){ throw Error(data.err); }
    } catch (err) {
        console.warn(`Error: ${err}`);
    }
}
