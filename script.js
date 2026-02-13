const defaultProjects = [
  {
    title: "Life Of",
    description: "A reflective personal project",
    image: "assets/images/lifeof.png"
  }
];


const container = document.querySelector(".projects-container");

const storedProjects = localStorage.getItem("projects");

const projects = storedProjects
  ? JSON.parse(storedProjects)
  : [...defaultProjects];


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
    card.innerHTML = `
      <div class="card-main">
        <img src="${project.image}">
        <div class="text-col">
          <div class="project-text">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
          </div>
        </div>
      </div>
    `;
    const deletebtn = document.createElement("button");
    deletebtn.textContent = "Delete";

    deletebtn.addEventListener("click", () => {
      projects.splice(index,1);
      localStorage.setItem("projects",JSON.stringify(projects));
      renderProjects();
    })

    card.appendChild(deletebtn);
    container.appendChild(card);
  });
}

renderProjects();

const addBtn = document.getElementById("add-btn");
const form = document.getElementById("project-form");

addBtn.addEventListener("click", () => {
  form.style.display = "block";
});


const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const imageInput = document.getElementById("image")

form.addEventListener("submit", (event) =>{
  event.preventDefault();
  const titleValue = titleInput.value;
  const descriptionValue = descriptionInput.value;
  const imageValue = imageInput.value;


  const newProject = {
    title:titleValue,
    description:descriptionValue,
    image:imageValue
  };

projects.push(newProject);

localStorage.setItem("projects",JSON.stringify(projects));

renderProjects();

form.reset();
form.style.display = "none";

});
























