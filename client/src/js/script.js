const form = document.getElementById('form');
const notes = document.getElementById('notes');
const p = document.createElement('p');
const noteClass = document.querySelectorAll('.my-class');

let noteid = 1;
const notesStorage = []


if (notesStorage.length > 0) {
  noteId = notesStorage[notesStorage.length - 1].id + 1;
}

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
        const userNotes = {
        id: noteid++,
        text: mainText
        }
        notesStorage.push(userNotes);
        console.log(notesStorage);
        localStorage.setItem("notesStorage", JSON.stringify(notesStorage));

        const noteDiv = document.createElement('div')
        const textNote = document.createElement('p')
        const id = document.createElement('p')
        const icon = document.createElement('i')
        icon.classList.add('fa-solid');
        noteDiv.classList.add('noteMain');
        textNote.textContent = userNotes.text;
        id.textContent = userNotes.id;
        console.log(userNotes.id)
        noteDiv.appendChild(textNote);
        notes.appendChild(noteDiv);
    }

    function deleteNote() {
    const icon = document.createElement('i')
    icon.classList.add('fa-bars');
    noteDiv.appendChild(icon);
    noteClass.forEach(noteClass => {
    noteClass.addEventListener('mouseleave', () => {
        icon.style.display = 'none';
    });
    noteClass.addEventListener('mouseenter', () => {
        icon.style.display = 'block';
    });
});
}    
});

const draggables = document.querySelectorAll('.draggable');
        let isDragging = false;

        
        function dragElement(event, element) {
            let leftValue = parseInt(window.getComputedStyle(element).left);
            let topValue = parseInt(window.getComputedStyle(element).top);
            element.style.left = `${leftValue + event.movementX}px`;
            element.style.top = `${topValue + event.movementY}px`;
            draggables.forEach((el) => {
                el.style.zIndex = '1';
            });
            element.style.zIndex = '10';
            
        }

         draggables.forEach((element) => {
            element.addEventListener("mousedown", (e) => {
                const onMove = (event) => dragElement(event, element);
                element.style.userSelect = 'none';
                document.addEventListener("mousemove", onMove);
                document.addEventListener("mouseup", () => {
                    document.removeEventListener("mousemove", onMove);
                    element.style.userSelect = 'auto';
                }, { once: true });
            });
        });

