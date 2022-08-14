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