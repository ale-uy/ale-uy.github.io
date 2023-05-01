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

// función para cargar el contenido del archivo markdown
function loadMarkdownFile(projectId) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '../static/md/project-' + projectId + '.md');
  xhr.onload = function() {
    if (xhr.status === 200) {
      // convierte el contenido markdown a HTML
      var html = marked(xhr.responseText);
      // inserta el HTML generado en el elemento correspondiente del DOM
      document.getElementById('project-' + projectId).innerHTML = html;
    } else {
      console.error('Error al cargar el archivo markdown');
    }
  };
  xhr.send();
}

// llama a la función loadMarkdownFile() cuando se seleccione un proyecto
var projectListItems = document.querySelectorAll('.project-list li');
for (var i = 0; i < projectListItems.length; i++) {
  projectListItems[i].addEventListener('click', function(event) {
    // cambia la clase 'selected' del proyecto seleccionado
    var selectedListItem = document.querySelector('.project-list li.selected');
    selectedListItem.classList.remove('selected');
    event.target.classList.add('selected');
    // carga el contenido del archivo markdown correspondiente
    var projectId = event.target.getAttribute('data-project');
    loadMarkdownFile(projectId);
    // muestra el proyecto seleccionado y oculta los demás
    var projects = document.querySelectorAll('.project');
    for (var j = 0; j < projects.length; j++) {
      if (projects[j].id === 'project-' + projectId) {
        projects[j].classList.remove('hidden');
      } else {
        projects[j].classList.add('hidden');
      }
    }
  });
}
