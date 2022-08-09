const baseUrl = "http://localhost:3000";

function getProjects(elementID) {
    let url = baseUrl + "/projects";

    // Fetch a list of projects and forms from the server
    $.getJSON(url, createList);

    function createList(json) {
        var items = [];

        // Parse each project
        let projects = json["projects"];
        $.each(projects, function (key, value) {
            let project = value;
            let project_name = project["name"];
            let project_forms = project["forms"];

            // Parse each project's form
            var form_items = [];
            $.each(project_forms, function (key, value) {
                let form = value;
                let form_name = form["name"];

                // Each form: construct an array of html li elements
                let form_html = `
                            <li class='dropdown-item'>&nbsp;&nbsp;&nbsp;&nbsp;
                            <span class="material-symbols-outlined">description</span>
                            ${form_name}</li>
                        `
                form_items.push(form_html);
            });

            // All the forms: construct the html (by concatenating the array of li elements together)
            let all_forms_in_this_project_html = form_items.join("");

            // Each project: construct an array of html li elememtns
            let project_html = `
                        <li class='project'>
                            <span class='project-name dropdown-item'><span class='material-symbols-outlined'>folder</span> ${project_name}</span>
                            <ul class='forms-list'>
                                ${all_forms_in_this_project_html}
                            </ul>
                        </li>
                    `;

            items.push(project_html);
        });


        // All the projects: construct the html (by concatenating the array of li elements together)
        let html = "<ul>" + items.join("") + "</ul>"
        var selected_projects = []

        $(elementID).html(html)


        var projects_tags = document.getElementsByClassName('project-name');

        for (var i = 0; i < projects_tags.length; i++) {
            projects_tags[i].addEventListener("click", function () {
                if (this.closest('li').querySelector('ul').classList == "forms-list") {
                    this.closest('li').querySelector('ul').classList.add("open");
                    this.innerHTML = "<span class='material-symbols-outlined'>folder_open</span>" + this.innerHTML.slice(53);
                    
                }
                else {
                    this.closest('li').querySelector('ul').classList.remove("open");
                    this.innerHTML = "<span class='material-symbols-outlined'>folder</span>" + this.innerHTML.slice(58);
                }
            });
        }


        var active_tags = document.getElementsByClassName('dropdown-item');

        for (var i = 0; i < active_tags.length; i++) {
            active_tags[i].addEventListener("click", function () {
                for (i = 0; i < active_tags.length; i++) {
                    if(active_tags[i].classList.contains('active')) {
                        active_tags[i].classList.remove('active')
                    }
                }
                this.classList.add("active");

                document.addEventListener('click', (e) => {
                    const clicked_on_list = e.composedPath().includes(document.querySelector('#projects'));
                    const clicked_on_a = e.composedPath().includes(document.querySelector('.a'));
                    if (!clicked_on_list && clicked_on_a) {
                        this.classList.remove("active");
                    }
                })
            });
        }
    }
}