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

//
//
// Carga el archivo JSON
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		// Convierte los datos en un objeto JavaScript
		var data = JSON.parse(this.responseText);

		// Actualiza el contenido de la página con los datos del primer proyecto
		document.getElementById("project-info").innerHTML = `
			<h2>${data[0].name}</h2>
			<p>${data[0].description}</p>
		`;

		// Agrega un listener de eventos para actualizar el contenido de la página cuando se haga clic en un proyecto
		var projectList = document.getElementsByClassName("project-list")[0].getElementsByTagName("li");
		for (var i = 0; i < projectList.length; i++) {
			projectList[i].addEventListener("click", function() {
				var projectIndex = this.getAttribute("data-project").replace("project-", "") - 1;
				document.getElementById("project-info").innerHTML = `
					<h2>${data[projectIndex].name}</h2>
					<p>${data[projectIndex].description}</p>
				`;

				// Actualiza la clase "selected" en la lista de proyectos
				var selectedProject = document.getElementsByClassName("selected")[0];
				selectedProject.classList.remove("selected");
				this.classList.add("selected");
			});
		}
	}
};
xhttp.open("GET", "../static/data/web.json", true);
