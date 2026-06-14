var tasks = JSON.parse(localStorage.getItem('mytasks')) || [];

function saveTasks() {
  localStorage.setItem('mytasks', JSON.stringify(tasks));
}

function addTask() {
  var input = document.getElementById('taskInput');
  var text = input.value.trim();

  if (text == '') {
    input.focus();
    return;
  }

  var newTask = {
    id: Date.now(),
    text: text,
    done: false
  };

  tasks.push(newTask);
  input.value = '';
  saveTasks();
  showTasks();
  input.focus();
}

function deleteTask(id) {
  tasks = tasks.filter(function(t) {
    return t.id != id;
  });
  saveTasks();
  showTasks();
}

function toggleDone(id) {
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id == id) {
      tasks[i].done = !tasks[i].done;
    }
  }
  saveTasks();
  showTasks();
}

function clearAll() {
  tasks = [];
  saveTasks();
  showTasks();
}

function showTasks() {
  var list = document.getElementById('taskList');
  var emptyMsg = document.getElementById('emptyMsg');
  var counter = document.getElementById('counter');

  list.innerHTML = '';

  if (tasks.length == 0) {
    emptyMsg.style.display = 'block';
  } else {
    emptyMsg.style.display = 'none';
  }

  for (var i = 0; i < tasks.length; i++) {
    var t = tasks[i];
    var li = document.createElement('li');

    if (t.done) {
      li.className = 'done';
    }

    li.innerHTML =
      '<input type="checkbox" ' + (t.done ? 'checked' : '') + ' onchange="toggleDone(' + t.id + ')">' +
      '<span>' + t.text + '</span>' +
      '<button onclick="deleteTask(' + t.id + ')">&#x2715;</button>';

    list.appendChild(li);
  }

  var doneCount = tasks.filter(function(t) { return t.done; }).length;
  if (tasks.length > 0) {
    counter.textContent = doneCount + ' of ' + tasks.length + ' done';
  } else {
    counter.textContent = '';
  }
}

document.addEventListener('DOMContentLoaded', function() {
  var input = document.getElementById('taskInput');
  input.addEventListener('keydown', function(e) {
    if (e.key == 'Enter') {
      addTask();
    }
  });
  showTasks();
});

function clearDone() {
  tasks = tasks.filter(function(t) {
    return t.done == false;
  });
  saveTasks();
  showTasks();
}