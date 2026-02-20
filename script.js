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
    card.innerHTML = `
      <div class="card-main">
        <img src="${project.image}">
        <div class="text-col">
          <div class="project-text">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <p class="full-description">${project.fullDescription}</p>
            <a class="project-link" href="${project.Link}" target="_blank">View Project →</a>
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
  document.body.offsetHeight; // Force browser to recalculate layout
  window.dispatchEvent(new Event('resize')); // Tell scroll snap to remeasure
}

renderProjects();

const addBtn = document.getElementById("add-btn");
const form = document.getElementById("project-form");

addBtn.addEventListener("click", () => {
  form.style.display = "block";
});


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
    title:titleValue,
    description:descriptionValue,
    image:imageValue,
    fullDescription:fullDes,
    Link:linkVal,
  };

projects.push(newProject);

localStorage.setItem("projects",JSON.stringify(projects));

renderProjects();

form.reset();
form.style.display = "none";

});





// const audio = document.getElementById("bg-music");

// document.addEventListener("click", () => {
//   audio.volume = 0.2;
//   audio.play();
// }, { once: true });

// Add this to your JS
