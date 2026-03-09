//The comments are added by me not chatgpt and the reason is to satisfy my OCDs.


//These are the stuff that retrives data from the DOM.
const container = document.querySelector(".projects-container");
const planks = document.querySelectorAll(".plank");
const popup = document.getElementById("popup");
const addbtn = document.getElementById("add-btn");
const form = document.getElementById("project-form");
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const imageInput = document.getElementById("image");
const fullDescription =document.getElementById("full-description");
const linkValue = document.getElementById("link");


//This block of code is used to store projects and check their existence.
const storedProjects = localStorage.getItem("projects");
const projects = storedProjects
  ? JSON.parse(storedProjects)
  :[];


//This block of code build the actual cards.
function renderProjects() {
  container.innerHTML = "";

  if (projects.length === 0){
    const msg = document.createElement("p");
    msg.textContent ="NO PROJECTS";
    container.appendChild(msg);
    return
  }

  projects.forEach((project,index) => {
    const card = document.createElement("div");
    card.classList.add("project-card");
    card.dataset.id = project.id;
    card.innerHTML = `
      <div class="card-main">
        <img src="${project.image}">
        <div class="text-col">
          <div class="project-text">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <p class="full-description">${project.fullDescription}</p>
            <a class="project-link" href="${project.link}" target="_blank">View Project →</a>
          </div>
        </div>
      </div>
`;


  //This block of code makes it so that the buttons actually work.
  
  //Card exapansion control.
  card.addEventListener("click" , (e) => {
    if(e.target.closest("button,a"))return;
    document.querySelectorAll(".project-card").forEach(c =>{
      if(c!== card) c.classList.remove("expand");
    })
    card.classList.toggle("expand");
  })

  //Delete button.
  const deletebtn = document.createElement("button");
  deletebtn.textContent = "Delete";

  deletebtn.addEventListener("click", () => {
    const id = card.dataset.id;
    const updatedlist = projects.filter(p => p.id !== id);

    projects.length = 0;
    projects.push(...updatedlist);

    localStorage.setItem("projects",JSON.stringify(updatedlist));
    renderProjects();
  })

  card.appendChild(deletebtn);
  container.appendChild(card);
  });
}


//This block of code takes the info and then adds them to the actual cards
form.addEventListener("submit", (event) =>{
  event.preventDefault();
  const titleValue = titleInput.value;
  const descriptionValue = descriptionInput.value;
  const imageValue = imageInput.value;
  const fullDes = fullDescription.value;
  const linkVal = linkValue.value;


  const newProject = {
    id:crypto.randomUUID(),
    title:titleValue,
    description:descriptionValue,
    image:imageValue,
    fullDescription:fullDes,
    link:linkVal,
  };

projects.push(newProject);

localStorage.setItem("projects",JSON.stringify(projects));
renderProjects();

form.reset();
popup.classList.remove("active");
});

//Form popup.
addbtn.addEventListener("click", () =>{
  popup.classList.add("active");
});

popup.addEventListener("click", (e) =>{
  if(e.target === popup){
    popup.classList.remove("active");
  }
});
//Hero container animation
const observer = new IntersectionObserver((entries) =>{
  entries.forEach(entry =>{
    if(entry.isIntersecting){
      entry.target.classList.add("animate");
    }
  });
},{
  threshold:0.8
});
planks.forEach(plank => observer.observe(plank));


renderProjects();
document.body.offsetHeight;
window.dispatchEvent(new Event('resize')); 
