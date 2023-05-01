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

// Añadir evento click a los elementos de la lista
projectList.addEventListener('click', e => {
	const target = e.target;
	if (target.tagName === 'LI') {
		const projectId = target.getAttribute('data-project');
		showProject(projectId);

		// Cambiar la selección actual en la lista
		projectList.querySelector('.selected').classList.remove('selected');
		projectList.querySelector([data-project="${projectId}"]).classList.add('selected');
	}
});
