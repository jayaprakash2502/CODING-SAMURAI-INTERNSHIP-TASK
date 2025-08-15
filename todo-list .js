let tasklist=JSON.parse(localStorage.getItem("tasklist") || "[]");


const result=document.getElementById('result');
    document.getElementById("addbtn").addEventListener('click',()=>{
    let task=document.getElementById('task').value.trim();
    let date=document.getElementById('date').value;
    let priority=document.getElementById('priority').value;
    let msg=document.getElementById('msg');

    if(task==="" || date==""){
        msg.textContent="Please Enter Task And Date...";
        return;

    }
    msg.textContent="";
    tasklist.push({task,date,priority,completed:false})
    localStorage.setItem('tasklist', JSON.stringify(tasklist))
    showtasks();

    document.getElementById('task').value="";
    document.getElementById('date').value="";
})

function showtasks(){
    result.innerHTML="";

    tasklist.forEach((item,index)=>{

        const today=new Date().toISOString().split('T')[0];
        let taskclass="";
        if(item.completed)
            taskclass='completed';
        else if(item.date<today)
            taskclass='overdue';
        else if(item.date===today)
            taskclass='soon';
        else
            taskclass='upcomming'

       result.innerHTML += `
      <div class="task">
        <div>
          <input type="checkbox" ${item.completed ? "checked" : ""} onchange="togglecomplete(${index})">
          <span class="${taskclass} ${item.completed ? 'completed' : ''}">
            ${item.task} (${item.date}) [${item.priority}]
          </span>
        </div>
        <button onclick="deletetask(${index})">🗑️</button>
      </div>
    `;
})
}

function deletetask(index){
    tasklist.splice(index,1);
    localStorage.setItem('tasklist',JSON.stringify(tasklist));
    showtasks();
}


function tonglecompletee(){
    tasklist[index].completed=!tasklist[index].completed;
    localStorage.setItem('tasklist',JSON.stringify(tasklist));
    showtasks();
}



function darkmode(){
    const mode= localStorage.getItem('darkmode');
    if(mode==="on"){
        document.body.classList.add('dark')
    }
}

document.getElementById("darkmode").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("darkmode", document.body.classList.contains("dark") ? "on" : "off");
});

darkmode();
showtasks();
    

