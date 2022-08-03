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
                            <li>${form_name}</li>
                        `
                form_items.push(form_html);
            });

            // All the forms: construct the html (by concatenating the array of li elements together)
            let all_forms_in_this_project_html = form_items.join("");

            // Each project: construct an array of html li elememtns
            let project_html = `
                        <li>
                            ${project_name}
                            <ul>
                                ${all_forms_in_this_project_html}
                            </ul>
                        </li>
                    `;

            items.push(project_html);
        });

        // All the projects: construct the html (by concatenating the array of li elements together)
        let html = "<ul>" + items.join("") + "</ul>"

        $(elementID).html(html)
    }
}