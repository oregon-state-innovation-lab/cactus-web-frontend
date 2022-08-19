QUnit.module("Project Browser", function(hooks) {
    hooks.beforeEach(function() {
        const fixture = document.getElementById('qunit-fixture')
        fixture.innerHTML = expected_project_browser_html
    })


    QUnit.test('addHighlightingToList: click outside the list', function(assert) {
        // Given
        const tag_outside_the_list = document.getElementById('outside-project-area')
        const list_items = document.getElementsByClassName('dropdown-item')

        // When 
        addHighlightingToList(list_items)
        list_items[0].click()
        tag_outside_the_list.click()

        // Then
        const highlighted_items_number = document.getElementsByClassName('dropdown-item active').length
        assert.equal(highlighted_items_number, 0, 'No elements are highlighted')
    })


    QUnit.test('addHighlightingToList: multiple clicks', function(assert) {
        // Given
        const list_items = document.getElementsByClassName('dropdown-item')

        // When
        addHighlightingToList(list_items)
        list_items[0].click()
        list_items[2].click()

        // Then
        const highlighted_items_number = document.getElementsByClassName('dropdown-item active').length
        assert.equal(highlighted_items_number, 1, 'Only 1 element is highlighted')
    })


    QUnit.test('addHighlightingToList: click on the element', function(assert) {
        // Given
        const list_items = document.getElementsByClassName('dropdown-item')
        const amplitudes = list_items[1]
        assert.equal(amplitudes.classList.contains('active'), false, '"Amplitudes" element is not highlighted')

        // When
        addHighlightingToList(list_items)
        amplitudes.click()

        // Then
        assert.equal(amplitudes.classList.contains('active'), true, '"Amplitudes" element is highlighted')
    })


    QUnit.test('makeListExpandableCollapsible: close -> open', function(assert) {
        // Given
        const project_span_element = document.getElementsByClassName('project-name')
        const expected_project_name_before = '<span class="material-symbols-outlined">folder</span> electrons'
        const expected_project_name_after = '<span class="material-symbols-outlined">folder_open</span> electrons'
        const electrons = project_span_element[0]
        const electrons_forms = document.getElementsByClassName('forms-list')[0]
        const electrons_forms_class = electrons_forms.classList

        assert.equal(electrons.innerHTML, expected_project_name_before, 'Project "electrons`" icon is closed')
        assert.equal(electrons_forms_class, 'forms-list', 'Project "electrons`" forms are closed')

        // When
        makeListExpandableCollapsible(project_span_element)
        electrons.click()

        // Then
        assert.equal(electrons.innerHTML, expected_project_name_after, 'Project "electrons`" icon is opened')
        assert.equal(electrons_forms_class, 'forms-list open', 'Project "electrons`" forms are opened')
    })


    QUnit.test('makeListExpandableCollapsible: open -> close', function(assert) {
        // Given
        const project_span_element = document.getElementsByClassName('project-name')
        const expected_project_name_after = '<span class="material-symbols-outlined">folder</span> electrons'
        const electrons = project_span_element[0]
        const electrons_forms = document.getElementsByClassName('forms-list')[0]
        const electrons_forms_class = electrons_forms.classList

        // When
        makeListExpandableCollapsible(project_span_element)
        electrons.click()
        electrons.click()

        // Then
        assert.equal(electrons.innerHTML, expected_project_name_after, 'Project "electrons`" icon is closed')
        assert.equal(electrons_forms_class, 'forms-list', 'Project "electrons`" forms are closed')
    })


    QUnit.test('createStaticList: projects json -> <ul> html', function(assert) {
        // Given
        const json = {"projects":[{"id":"1","name":"electrons","forms":[{"id":"11","name":"Amplitudes"},{"id":"12","name":"Electromagnetic Multipoles"}]},{"id":"2","name":"frogs","forms":[{"id":"21","name":"green frogs!"}]},{"id":"2","name":"frogs","forms":[]}]}
        const projects_dictionary = json["projects"]

        // When
        const list_html = createStaticList(projects_dictionary)

        // Then
        assert.equal(list_html, expected_list_html)
    })


const expected_list_html = `<ul>
            <li class='project'>
                <span class='project-name dropdown-item'><span class='material-symbols-outlined'>folder</span> electrons</span>
                <ul class='forms-list'>
                    
                <li class='dropdown-item'>&nbsp&nbsp&nbsp&nbsp
                    <span class='material-symbols-outlined'>description</span>
                    Amplitudes
                </li>
            
                <li class='dropdown-item'>&nbsp&nbsp&nbsp&nbsp
                    <span class='material-symbols-outlined'>description</span>
                    Electromagnetic Multipoles
                </li>
            
                </ul>
            </li>
        
            <li class='project'>
                <span class='project-name dropdown-item'><span class='material-symbols-outlined'>folder</span> frogs</span>
                <ul class='forms-list'>
                    
                <li class='dropdown-item'>&nbsp&nbsp&nbsp&nbsp
                    <span class='material-symbols-outlined'>description</span>
                    green frogs!
                </li>
            
                </ul>
            </li>
        
            <li class='project'>
                <span class='project-name dropdown-item'><span class='material-symbols-outlined'>folder</span> frogs</span>
                <ul class='forms-list'>
                    
                </ul>
            </li>
        </ul>`


const expected_project_browser_html =`
    <div class="split a">
        <div id="a-title">Project Browser</div>
        <div id="projects">
            <!-- The list here gets filled in dynamically by the results fetched from the server -->
            <ul>
            <li class='project'>
                <span class='project-name dropdown-item'><span class='material-symbols-outlined'>folder</span> electrons</span>
                
                <ul class='forms-list'>  
                    <li class='dropdown-item'>
                        <span class="material-symbols-outlined">description</span>
                        Amplitudes
                    </li>
                
                    <li class='dropdown-item'>
                        <span class="material-symbols-outlined">description</span>
                        Electromagnetic Multipoles
                    </li>
                </ul>
            </li>

            <li class='project'>
                <span class='project-name dropdown-item'><span class='material-symbols-outlined'>folder</span> frogs</span>
                
                <ul class='forms-list'>
                    <li class='dropdown-item'>
                        <span class="material-symbols-outlined">description</span>
                        green frogs!
                    </li>
                </ul>
            </li>

            <li class='project'>
                <span class='project-name dropdown-item'><span class='material-symbols-outlined'>folder</span> workers</span>
                
                <ul class='forms-list'>
                </ul>
            </li>
            </ul>
        </div>
        <div id="outside-project-area"></div>
    </div>`
})
