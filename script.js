const container = document.querySelector(".projects-container");

const storedProjects = localStorage.getItem("projects");

const projects = storedProjects
  ? JSON.parse(storedProjects)
  :[];

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

    card.addEventListener("click" , (e) => {
      if(e.target.closest("button,a"))return;
      document.querySelectorAll(".project-card").forEach(c =>{
        if(c!== card) c.classList.remove("expand");
      })
      card.classList.toggle("expand");
    })


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
  document.body.offsetHeight;
  window.dispatchEvent(new Event('resize')); 
}

renderProjects();

const popup = document.getElementById("popup");
const addbtn = document.getElementById("add-btn");
const form = document.getElementById("project-form");




const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const imageInput = document.getElementById("image");
const fullDescription =document.getElementById("full-description");
const linkValue = document.getElementById("link");

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


addbtn.addEventListener("click", () =>{
  popup.classList.add("active");
});

popup.addEventListener("click", (e) =>{
  if(e.target === popup){
    popup.classList.remove("active");
  }
});




