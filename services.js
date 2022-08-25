const baseUrl = "http://localhost:3000"

function getForm(form_id) {
    let url = baseUrl + "/form/" + form_id

    $.getJSON(url, createForm)

    function createForm(json) {
        const form = json.form
        const form_name = form.name
        const form_description = form.description
        const form_y_column_names = form["y_column_names"]
        const form_x_column_names = form["x_column_names"]
        const form_references = form.references

        form_html =`
            <h2 class="element-center">${form_name}</h2>
            <p class="form-descriprion my-4">${form_description}</p>
            <div class="my-4">
                ${createYColumnsList(form_y_column_names)}
            </div>
            <div class="my-4">
                ${createXColumnsList(form_x_column_names)}
            </div>
            <div class="my-4">
                ${form_references}
            </div>
            <div class="form-row text-center my-4">
                <button class="btn btn-primary element-center" type="submit">Gimme</button>
            </div>
        `
        $('#form').html(form_html)

        changeButtonStyle()
    }
}

function createYColumnsList(form_y_column_names) {
    if (form_y_column_names.length > 1) {
        html = `<p>Choose the quantities to compute:</p>`
        for (i = 0; i < form_y_column_names.length; i++) {
            let button = `
            <label class="btn btn-outline-light">
                <span class="ms-3">
                    ${form_y_column_names[i]}
                    <input class="form-check-input ms-5" type="checkbox"></input>
                </span>
            </label>
            `
            html += button
        }
    } else {
        html = `
        <p>The quantity to compute is:</p>
        <div class="btn btn-light">
            ${form_y_column_names[0]}
        </div>
        `
    }

    return html
}

function createXColumnsList(form_x_column_names) {
    let html = `
        <p>Choose your independent variable and values for the fixed variables:</p>
        <div class="my-3">
            <div class="input-group">
                <label class="form-check-label btn btn-outline-light" id="XButton">
                    <span class="ms-3">
                        ${form_x_column_names[0]}
                        <input class="form-check-input" type="radio" name="exampleRadios">
                    </span>
                </label>
                <input type="text" placeholder="Min" class="form-control">
                <input type="text" placeholder="Max" class="form-control">
                <input type="text" placeholder="Increment" class="form-control">
            </div>
        </div>
        <div>
            ${fixedXColumnsList(form_x_column_names)}
        </div>
    `
    function fixedXColumnsList(XList) {
        var html = ``
        for (i = 1; i < XList.length; i++) {
            let button = `
            <div class="input-group my-2">
                <label class="form-check-label btn btn-outline-light" id="XButton">
                    <span class="ms-3">
                        ${XList[i]}
                        <input class="form-check-input" type="radio" name="exampleRadios">
                    </span>
                </label>
                <input type="text" placeholder="Value" class="form-control">
            </div>
            `
            html += button
        }
        return html
    }

    return html
}

function changeButtonStyle() {
    $(".form-check-input").on("click", function () {
        if ($(this).is(":checked")) {
            this.closest("label").style.background = "#e9ecef"
        } else {
            this.closest("label").style.background = ""
        }
    })
}


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
            let form_id = form["id"]

            // Each form: construct an array of html li elements
            let form_html = `
            <a onclick="getForm(${form_id})">
                <li class='dropdown-item'>&nbsp&nbsp&nbsp&nbsp
                    <span class='material-symbols-outlined'>description</span>
                    ${form_name}
                </li>
            </a>
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
