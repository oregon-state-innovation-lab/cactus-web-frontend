const baseUrl = "http://localhost:3000"

function getProjects(elementID) {
    let url = baseUrl + "/projects"

    // Fetch a list of projects and forms from the server
    $.getJSON(url, createList)    
    
    function createList(json) {
        // Parse each project
        const projects_dictionary = json["projects"]
        const list_html = createStaticList(projects_dictionary)    
        $(elementID).html(list_html)

        const project_tags = document.getElementsByClassName('project-name')
        makeListExpandableCollapsible(project_tags)

        var active_tags = document.getElementsByClassName('dropdown-item')
        addHighlightingToList(active_tags)
    }
}

function createStaticList(projects_dictionary) {
    var items = []

    for (const [key, value] of Object.entries(projects_dictionary)) {
        let project = value
        let project_name = project["name"]
        let project_forms = project["forms"]

        // Parse each project's form
        var form_items = []

        for (const [key, value] of Object.entries(project_forms)) {
            let form = value
            let form_name = form["name"]

            // Each form: construct an array of html li elements
            let form_html = `
                <li class='dropdown-item'>&nbsp&nbsp&nbsp&nbsp
                    <span class='material-symbols-outlined'>description</span>
                    ${form_name}
                </li>
            `
            form_items.push(form_html)
        }

        // All the forms: construct the html (by concatenating the array of li elements together)
        let all_forms_in_this_project_html = form_items.join("")

        // Each project: construct an array of html li elememtns
        let project_html = `
            <li class='project'>
                <span class='project-name dropdown-item'><span class='material-symbols-outlined'>folder</span> ${project_name}</span>
                <ul class='forms-list'>
                    ${all_forms_in_this_project_html}
                </ul>
            </li>
        `

        items.push(project_html)
    }

    // All the projects: construct the html (by concatenating the array of li elements together)
    let html = "<ul>" + items.join("") + "</ul>"
    return html 
}

function makeListExpandableCollapsible(project_tags) {
    for (var i = 0; i < project_tags.length; i++) {
        project_tags[i].addEventListener("click", function() {
            if (this.closest('li').querySelector('ul').classList == "forms-list") {
                this.closest('li').querySelector('ul').classList.add("open")
                this.innerHTML = "<span class='material-symbols-outlined'>folder_open</span>" + this.innerHTML.slice(53)
            } else {
                this.closest('li').querySelector('ul').classList.remove("open")
                this.innerHTML = "<span class='material-symbols-outlined'>folder</span>" + this.innerHTML.slice(58)
            }
        })
    }
}

function addHighlightingToList(active_tags) {
    for (var i = 0; i < active_tags.length; i++) {
        active_tags[i].addEventListener("click", function() {        
            removeHighlighting()
            highlightSelectedListItem(this)
            handleUserClickOutsideTheList(this)
        })
    }

    // Helpers

    function removeHighlighting() {
        for (i = 0; i < active_tags.length; i++) { 
            if (active_tags[i].classList.contains('active')) {
                active_tags[i].classList.remove('active')
            }
        }
    }

    function highlightSelectedListItem(element) {
        element.classList.add("active")
    }
    
    function handleUserClickOutsideTheList(element) {
        document.addEventListener('click', (e) => {
            // Remove highlighting from selected list item when user clicks outside the list
            const clicked_on_list = e.composedPath().includes(document.querySelector('#projects'))
            const clicked_on_a = e.composedPath().includes(document.querySelector('.a'))
            if (!clicked_on_list && clicked_on_a) {
                element.classList.remove("active")
            }
        })    
    }
}