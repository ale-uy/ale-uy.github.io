// Obtener elementos de la lista y los proyectos
const projectList = document.querySelector('.project-list');
const projects = document.querySelectorAll('.project');

// Función para mostrar un proyecto específico y ocultar los demás
function showProject(projectId) {
    projects.forEach(project => {
        if (project.id === projectId) {
            project.classList.remove('hidden');
        } else {
            project.classList.add('hidden');
        }
    });
}

// Función para seleccionar un proyecto de la lista
function selectProject(selectedItem) {
    // Remover la clase 'selected' de todos los elementos de la lista
    projectList.querySelectorAll('li').forEach(item => {
        item.classList.remove('selected');
        item.style.transform = "scale(1)";
    });

    // Añadir la clase 'selected' al elemento seleccionado
    selectedItem.classList.add('selected');

    // Obtener el ID del proyecto seleccionado
    const projectId = selectedItem.getAttribute('data-project');

    // Mostrar el proyecto seleccionado en la columna derecha
    showProject(projectId);

    // Agrandar el elemento seleccionado
    selectedItem.style.transform = "scale(1.4)";
}

// Añadir evento click a los elementos de la lista
projectList.addEventListener('click', e => {
    const target = e.target;
    if (target.tagName === 'LI') {
        selectProject(target);
    }
});

// Seleccionar el primer proyecto de la lista al cargar la página
selectProject(projectList.querySelector('li'));

// hacer una solicitud AJAX para recuperar los datos del archivo JSON
var xhr = new XMLHttpRequest();
xhr.open("GET", "../static/data/proyectos.json", true);
xhr.onload = function() {
	if (xhr.status === 200) {
		var proyectos = JSON.parse(xhr.responseText);

		// llenar la lista de proyectos
		var projectList = document.querySelector(".project-list");
		for (var i = 0; i < proyectos.length; i++) {
			var project = proyectos[i];
			var listItem = document.createElement("li");
			listItem.textContent = project.name;
			listItem.dataset.project = "project-" + (i + 1);
			if (i === 0) {
				listItem.classList.add("selected");
			}
			projectList.appendChild(listItem);
		}

		// llenar la descripción del proyecto seleccionado
		var projectDescription = document.querySelector(".right-column .project p");
		projectDescription.textContent = proyectos[0].description;
	}
};
xhr.send();

// agregar un controlador de eventos al hacer clic en un proyecto
var projectList = document.querySelector(".project-list");
projectList.addEventListener("click", function(event) {
	var selectedProject = document.querySelector(".selected");
	selectedProject.classList.remove("selected");
	event.target.classList.add("selected");

	// mostrar la descripción del proyecto seleccionado
	var projectId = event.target.dataset.project;
	var projectDescription = document.querySelector(".right-column #" + projectId + " p");
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "../static/data/" + projectId + ".md", true);
	xhr.onload = function() {
		if (xhr.status === 200) {
			projectDescription.innerHTML = xhr.responseText;
		}
	};
	xhr.send();
});
