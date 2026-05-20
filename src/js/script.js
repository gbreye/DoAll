const form = document.getElementById('form');
const notes = document.getElementById('notes');
const p = document.createElement('p');
form.addEventListener('submit', function(event){
    event.preventDefault();
    const mainText = document.getElementById('input').value;
    if(mainText=== '') {
        console.log("Cannot add null")
        p.textContent = "Cannot add null";
        p.style.color = 'red';
        form.appendChild(p);
        const noteDiv = document.createElement('')
        const textNote = document.createElement('')
    }
    else {
        p.remove();
        console.log(mainText);
        const noteDiv = document.createElement('div')
        const textNote = document.createElement('p')
        noteDiv.classList.add('noteMain');
        textNote.textContent = mainText;
        noteDiv.appendChild(textNote);
        notes.appendChild(noteDiv);
    }
    
})

notes.addEventListener('mouseenter', () => {
    
});