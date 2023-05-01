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
	});

	// Añadir la clase 'selected' al elemento seleccionado
	selectedItem.classList.add('selected');

	// Obtener el ID del proyecto seleccionado
	const projectId = selectedItem.getAttribute('data-project');

	// Mostrar el proyecto seleccionado en la columna derecha
	showProject(projectId);
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

