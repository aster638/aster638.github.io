document.addEventListener('DOMContentLoaded', function() {
    
    const form = document.getElementById('intro-form');
    const formContainer = document.getElementById('form-container');
    const resultContainer = document.getElementById('result-container');
    const introContent = document.getElementById('intro-content');
    const resetBtn = document.getElementById('reset-btn');
    const addCourseBtn = document.getElementById('add-course-btn');

    function validateForm() {
        const requiredFields = [
            { id: 'name', message: 'Please enter your name.' },
            { id: 'mascot', message: 'Please enter your mascot.' },
            { id: 'imageCaption', message: 'Please enter an image caption.' },
            { id: 'personalBackground', message: 'Please enter your personal background.' },
            { id: 'professionalBackground', message: 'Please enter your professional background.' },
            { id: 'academicBackground', message: 'Please enter your academic background.' },
            { id: 'webdevBackground', message: 'Please enter your web development background.' },
            { id: 'platform', message: 'Please enter your primary computer platform.' }
        ];
        
        for (const field of requiredFields) {
            const element = document.getElementById(field.id);
            if (!element.value.trim()) {
                alert(field.message);
                element.focus();
                return false;
            }
        }
        
        const imageInput = document.getElementById('image');
        if (imageInput.files.length > 0) {
            const fileName = imageInput.files[0].name;
            const fileExt = fileName.split('.').pop().toLowerCase();
            
            if (fileExt !== 'jpg' && fileExt !== 'jpeg' && fileExt !== 'png') {
                alert('Please select a JPG or PNG image file.');
                imageInput.focus();
                return false;
            }
        } else {
            alert('Please select an image file.');
            imageInput.focus();
            return false;
        }
        
        if (!document.getElementById('consent').checked) {
            alert('Please check the consent box to proceed.');
            document.getElementById('consent').focus();
            return false;
        }
        
        const courseNameInputs = document.querySelectorAll('.course-name-input');
        const courseDescInputs = document.querySelectorAll('.course-desc-input');
        let hasCoursesEntered = false;
        
        for (const input of courseNameInputs) {
            if (input.value.trim()) {
                hasCoursesEntered = true;
                break;
            }
        }
        
        if (!hasCoursesEntered) {
            alert('Please enter at least one course.');
            courseNameInputs[0].focus();
            return false;
        }
        
        return true;
    }
    
    function displayResults() {
        const name = document.getElementById('name').value;
        const mascot = document.getElementById('mascot').value;
        const imageCaption = document.getElementById('imageCaption').value;
        const personalBackground = document.getElementById('personalBackground').value;
        const professionalBackground = document.getElementById('professionalBackground').value;
        const academicBackground = document.getElementById('academicBackground').value;
        const webdevBackground = document.getElementById('webdevBackground').value;
        const platform = document.getElementById('platform').value;
        const funnyThing = document.getElementById('funnyThing').value;
        const anythingElse = document.getElementById('anythingElse').value;
        
        const courseNameInputs = document.querySelectorAll('.course-name-input');
        const courseDescInputs = document.querySelectorAll('.course-desc-input');
        const courses = [];
        
        for (let i = 0; i < courseNameInputs.length; i++) {
            const courseName = courseNameInputs[i].value.trim();
            if (courseName) {
                const courseDesc = courseDescInputs[i].value.trim();
                courses.push({
                    name: courseName,
                    description: courseDesc
                });
            }
        }
        
        let imageUrl = '';
        const imageInput = document.getElementById('image');
        if (imageInput.files.length > 0) {
            imageUrl = URL.createObjectURL(imageInput.files[0]);
        }
        
        let html = `
            <h2>ITIS 3135 Introduction</h2>
            <h3> ${name} || ${mascot} </h3>
            <div class="centered-box">
                <figure>
                    <img src="${imageUrl}" alt="User uploaded image: ${imageCaption}">
                    <figcaption class="caption">${imageCaption}</figcaption>
                </figure>

                <ul class="bullets">
                    <li><strong>Personal Background:</strong> ${personalBackground}</li>
                    <li><strong>Professional Background:</strong> ${professionalBackground}</li>
                    <li><strong>Academic Background:</strong> ${academicBackground}</li>
                    <li><strong>Background in this Subject:</strong> ${webdevBackground}</li>
                    <li><strong>Primary Computer Platform:</strong> ${platform}</li>
                </ul>

                <ul class="bullets">
                    <li><strong>Courses Currently Taking:</strong>
                        <ul>`; 

        if (courses.length > 0) {
            courses.forEach(function(course) {
                html += `<li>${course.name}${course.description ? ': ' + course.description : ''}</li>`;
            });
        } else {
            html += `<li>No courses listed.<br><br></li>`; 
        }

        html += `
                        <br></ul>
                    </li>`; 

        if (funnyThing) {
            html += `<li><strong>Funny/Interesting Item about yourself:</strong> ${funnyThing}</li>`;
        }
        if (anythingElse) {
             html += `<li><strong>Anything Else:</strong> ${anythingElse}</li>`;
        }

        html += `
                </ul>
            </div>`; 

        introContent.innerHTML = html;
    }
    
    function deleteCourseField(event) {
        const courseEntry = event.target.parentElement;
        const coursesContainer = document.getElementById('courses-container');
        
        if (coursesContainer.children.length > 1) {
            courseEntry.remove();
        }
    }
    
    function addCourseField() {
        const coursesContainer = document.getElementById('courses-container');
        const courseEntry = document.createElement('div');
        courseEntry.className = 'course-entry';
        
        courseEntry.innerHTML = `
            <input type="text" class="course-name-input" name="courses[]" placeholder="Course Name">
            <input type="text" class="course-desc-input" name="courseDescriptions[]" placeholder="Course Description">
            <button type="button" class="delete-course-btn">Delete</button>
        `;
        
        coursesContainer.appendChild(courseEntry);
        
        courseEntry.querySelector('.delete-course-btn').addEventListener('click', deleteCourseField);
    }
    
    function prefillForm() {
        document.getElementById('name').value = 'Krish Iyer';
        document.getElementById('mascot').value = 'King-Sized Inchworm';
        document.getElementById('imageCaption').value = 'At the CCI research seminar';
        document.getElementById('personalBackground').value = 'I was born in New Haven, Connecticut but have been in Charlotte for the last 7 years.';
        document.getElementById('professionalBackground').value = 'I was a TA for Introduction to Computer Science II (Java) last semester, but now I am TA for Data Structures.';
        document.getElementById('academicBackground').value = 'Sophomore with Computer Science major and Computer Engineering minor at UNCC.';
        document.getElementById('webdevBackground').value = 'I have minimal knowledge about HTML and CSS.';
        document.getElementById('platform').value = 'Windows 11';
        document.getElementById('funnyThing').value = ' I love soccer and I support Arsenal.';
    }
    
    function resetForm() {
        form.reset();
        
        const courseEntries = document.querySelectorAll('.course-entry');
        for (let i = 1; i < courseEntries.length; i++) {
            courseEntries[i].remove();
        }
        
        const coursesContainer = document.getElementById('courses-container');
        coursesContainer.innerHTML = `
            <div class="course-entry">
                <input type="text" class="course-name-input" name="courses[]" placeholder="Course Name">
                <input type="text" class="course-desc-input" name="courseDescriptions[]" placeholder="Course Description">
                <button type="button" class="delete-course-btn">Delete</button>
            </div>
        `;
        
        document.querySelector('.delete-course-btn').addEventListener('click', deleteCourseField);
        
        prefillForm();
    }
    
    function resetAll() {
        resetForm();
        
        formContainer.style.display = 'block';
        resultContainer.style.display = 'none';
    }

    function handleSubmit(event) {
        event.preventDefault();
        
        if (!validateForm()) {
            return false;
        }
        
        displayResults();
        
        formContainer.style.display = 'none';
        resultContainer.style.display = 'block';
        
        return false;
    }

    
    form.addEventListener('submit', handleSubmit);
    form.addEventListener('reset', resetForm);
    resetBtn.addEventListener('click', resetAll);
    addCourseBtn.addEventListener('click', addCourseField);
    
    document.querySelectorAll('.delete-course-btn').forEach(function(button) {
        button.addEventListener('click', deleteCourseField);
    });
    
    prefillForm();
    
    addCourseField();
});