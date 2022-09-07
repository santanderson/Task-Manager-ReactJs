import { useRef, useEffect } from "react";

function App() {
  const tasks = useRef();
  const title = useRef();
  const task = useRef();
  let arr = [];

  useEffect(() => {

    if (localStorage.getItem('arr')) {

      let localObj = JSON.parse(localStorage.getItem('arr'));
      arr = localObj;

      arr.forEach(e => {
        tasks.current.innerHTML += `
            <li>
              <h1>${e.title}</h1>
              <span>${e.task}</span>
              <button class="removeBtn">remove</button>
            </li>
          `
        tasks.current.addEventListener('click', removeTask);
      })
    }
  }, [tasks.current])

  const removeTask = (e) => {
    const element = e.target;
    if (element.classList.contains('removeBtn')) {
      const li = element.parentNode;
      const btns = document.getElementsByClassName('removeBtn');

      for(let c = 0; c< btns.length; c++){
        btns[c].className = 'removeBtn ' + c;
      }
      const idx = element.classList[1];

      arr.splice(idx, 1);
      localStorage.clear();
      localStorage.setItem('arr', JSON.stringify(arr));
      li.parentNode.removeChild(li);
    }
  }


  const createTask = (e) => {

    e.preventDefault();
    const obj = {
      title,
      task
    }
    obj.title = title.current.value;
    obj.task = task.current.value;
    arr.push(obj);
    localStorage.setItem('arr', JSON.stringify(arr));

    tasks.current.innerHTML += `
      <li>
        <h1>${arr[arr.length - 1].title}</h1>
        <span>${arr[arr.length - 1].task}</span>
        <button class="removeBtn">remove</button>
      </li>`
    tasks.current.addEventListener('click', removeTask);
  }

  return (
    <div className="App">

      <form onSubmit={createTask}>
        <input ref={title} type='text' placeholder="title" />
        <textarea ref={task} cols='20' rows="10" placeholder="task"></textarea>
        <button type="submit">Add</button>
      </form>

      <ul ref={tasks} className='ul'>
      </ul>
    </div>
  )
}

export default App
