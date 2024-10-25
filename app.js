// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyB-9qmV5b0q89bx4Em0FeNnlZnsteq5rjY",
    authDomain: "to-do-list-415bc.firebaseapp.com",
    projectId: "to-do-list-415bc",
    storageBucket: "to-do-list-415bc.appspot.com",
    messagingSenderId: "164338693293",
    appId: "1:164338693293:web:a9a51e42e85d36d55b8224",
    measurementId: "G-32HNB7DQJ7"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();

const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value.trim() === '') {
        alert("You must write something!");
    } else {
        const task = inputBox.value;
        db.collection('tasks').add({
            text: task,
            checked: false
        })
        .then(() => {
            console.log("Task added successfully");
            alert("Task uploaded successfully");
            fetchTasks(); // Refresh the task list after adding a task
        })
        .catch((error) => {
            console.error("Error adding task: ", error);
            alert("Task upload failed");
        });
        inputBox.value = ""; // Clear input field
    }
}


function displayTask(taskKey, taskText, isChecked) {
    const li = document.createElement("li");
    li.textContent = taskText;
    li.setAttribute("data-key", taskKey);
    if (isChecked) li.classList.add("checked");

    const span = document.createElement("span");
    span.textContent = "\u00d7";
    li.appendChild(span);
    listContainer.appendChild(li);
}

function fetchTasks() {
    db.collection("tasks").get().then((querySnapshot) => {
        listContainer.innerHTML = ''; // Clear the current list
        querySnapshot.forEach((doc) => {
            const taskData = doc.data(); // Get task data
            displayTask(doc.id, taskData.text, taskData.checked); // Use doc.id as the key
        });
    }).catch((error) => {
        console.error("Error fetching tasks: ", error);
    });
}

listContainer.addEventListener("click", function (e) {
    const taskKey = e.target.closest('li')?.getAttribute("data-key");
    if (!taskKey) return;

    if (e.target.tagName === "LI") {
        const taskDoc = db.collection('tasks').doc(taskKey); // Get document reference
        const isChecked = e.target.classList.toggle("checked");
        taskDoc.update({ checked: isChecked }) // Update Firestore document
            .then(() => {
                console.log("Task status updated");
            })
            .catch((error) => {
                console.error("Error updating task: ", error);
            });
    } else if (e.target.tagName === "SPAN") {
        const taskDoc = db.collection('tasks').doc(taskKey); // Get document reference
        taskDoc.delete() // Delete Firestore document
            .then(() => {
                e.target.parentElement.remove(); // Remove the task from the UI
                console.log("Task deleted");
            })
            .catch((error) => {
                console.error("Error deleting task: ", error);
            });
    }
});


fetchTasks();