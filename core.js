window.onload = () => {
    const addTask = document.getElementById('add');
    const textInputName = document.getElementById('input_name');
    const textInputDescr = document.getElementById('input_descr');
    const taskContainer = document.getElementById('taskscont');
    let tasks = JSON.parse(localStorage.getItem('tasks')) ?? [];
    let TasksEl = [];
    let date = new Date();
    let options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        timezone: 'UTC',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      };


    const taskComplete = index => {
        tasks[index].completed = !tasks[index].completed;
        if (tasks[index].completed) {
            TasksEl[index].classList.remove('block_done');
        }
        else {
            TasksEl[index].classList.add('block_done');
        }
        updateLS();
        fillHtml();
    }

    const taskDelete = index => {
        TasksEl[index].classList.add('deleted');
        setTimeout(() => {
            tasks.splice(index, 1);

            updateLS();
            fillHtml();    
        }, 200)
    }

    const addTemp = (task, index) => {
        const blockDiv = document.createElement('div');
        blockDiv.classList.add('block');

        if (task.completed) {
            blockDiv.classList.add('checked');
        }
        const block = document.createElement('div');
        block.classList.add('block_ch');
        blockDiv.appendChild(block);

        const arrow = document.createElement('div');
        arrow.classList.add('arrow');
        arrow.addEventListener('click', () => OpenDescr());
        block.appendChild(arrow);
        

        const title = document.createElement('p');
        title.classList.add('title');
        title.textContent = task.title;

        block.appendChild(title);

        const buttons = document.createElement('div');
        buttons.classList.add('buttons');

        const input = document.createElement('input');
        input.classList.add('check');
        input.type = 'checkbox';
        input.checked = task.completed;
        input.addEventListener('click', () => taskComplete(index));
        buttons.appendChild(input);

        const img = document.createElement('img');
        img.src = "remove2.svg";
        img.classList.add('delete');
        img.addEventListener('click', () => taskDelete(index));
        buttons.appendChild(img);

        block.appendChild(buttons);

        const contents = document.createElement('div');
        contents.classList.add('contents');
        contents.style.display = 'none';
        blockDiv.appendChild(contents);

        const descr = document.createElement('p');
        descr.classList.add('descr');
        descr.textContent = task.description;
        contents.appendChild(descr);

        const date_info = document.createElement('p');
        date_info.classList.add('dateinf');
        date_info.textContent = task.data;
        contents.appendChild(date_info);``
        
        function OpenDescr() {
            if (contents.style.display == 'none') {
                contents.style.opacity = '1';
                contents.style.display = 'flex';
                arrow.style.transform = 'rotate(90deg)';
                arrow.style.transition = '.2s';
                contents.transition = '.2s'
            }
            else {
                contents.style.display = 'none';
                arrow.style.transform = 'rotate(0deg)';
                contents.style.opacity = '0';
            }    
        }

        return blockDiv;
    }

    const taskFilter = () => {
        const activeTask = tasks.length && tasks.filter(item => item.completed == false);
        const completedTask = tasks.length && tasks.filter(item => item.completed == true);
        tasks = [...activeTask,...completedTask];
    }

    const fillHtml = () => {
        taskContainer.innerHTML = "";
        taskFilter();
        tasks.forEach((item, index) => {
            taskContainer.appendChild(addTemp(item, index));
        })
        if (tasks.length > 0) {
            TasksEl = document.querySelectorAll('.block');
        }
    };

    const updateLS = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    addTask.addEventListener('click', () => {
        if (textInputName.value.length > 0) {
            tasks.push({title: textInputName.value, description: textInputDescr.value, completed: false, data: date.toLocaleString("en-US", options)});
        }
        
        updateLS();
        fillHtml();

        textInputName.value = "";
        textInputDescr.value = '';
    });



    fillHtml();
    console.log(tasks);
}