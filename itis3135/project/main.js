document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Code tabs functionality
    const codeTabs = document.querySelectorAll('.code-tab');
    
    codeTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Get the parent code block
            const codeBlock = this.closest('.code-block');
            
            // Remove active class from all tabs in this block
            codeBlock.querySelectorAll('.code-tab').forEach(t => {
                t.classList.remove('active');
            });
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Hide all panels in this block
            codeBlock.querySelectorAll('.code-panel').forEach(panel => {
                panel.classList.remove('active');
            });
            
            // Show the panel that corresponds to this tab
            const panelId = this.getAttribute('data-panel');
            const panel = codeBlock.querySelector(`#${panelId}`);
            if (panel) panel.classList.add('active');
        });
    });
    
    // Accordion functionality
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const accordionItem = this.parentElement;
            const content = accordionItem.querySelector('.accordion-content');
            
            content.classList.toggle('active');
            
            // Update the icon (if using icons)
            const icon = this.querySelector('.icon');
            if (icon) {
                icon.textContent = content.classList.contains('active') ? '-' : '+';
            }
        });
    });
    
    // Form validation
    const demoForm = document.getElementById('demo-form');
    
    if (demoForm) {
        demoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const passwordInput = document.getElementById('password');
            
            // Clear previous error messages
            document.querySelectorAll('.error-message').forEach(msg => {
                msg.remove();
            });
            document.querySelectorAll('.form-input').forEach(input => {
                input.classList.remove('error');
            });
            
            // Validate name
            if (!nameInput.value.trim()) {
                showError(nameInput, 'Name is required');
                isValid = false;
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                showError(emailInput, 'Please enter a valid email address');
                isValid = false;
            }
            
            // Validate password
            if (passwordInput.value.length < 6) {
                showError(passwordInput, 'Password must be at least 6 characters');
                isValid = false;
            }
            
            if (isValid) {
                // Show success message
                const successMsg = document.createElement('div');
                successMsg.className = 'alert-success';
                successMsg.textContent = 'Form validation successful! (This is a demo - no data is being sent)';
                successMsg.style.backgroundColor = '#d4edda';
                successMsg.style.color = '#155724';
                successMsg.style.padding = '1rem';
                successMsg.style.marginTop = '1rem';
                successMsg.style.borderRadius = '5px';
                
                const formContainer = document.querySelector('.form-container');
                formContainer.appendChild(successMsg);
                
                // Remove success message after 3 seconds
                setTimeout(() => {
                    successMsg.remove();
                }, 3000);
                
                // Reset form
                demoForm.reset();
            }
        });
        
        function showError(input, message) {
            input.classList.add('error');
            const errorMsg = document.createElement('div');
            errorMsg.className = 'error-message';
            errorMsg.textContent = message;
            input.parentElement.appendChild(errorMsg);
        }
    }
    
    // AJAX Glossary functionality (for resources page)
    const glossaryContainer = document.getElementById('glossary-container');
    
    if (glossaryContainer) {
        // Simulate AJAX request with a local data object
        // In a real implementation, this would be fetched from a JSON file
        const glossaryData = [
            {
                term: "HTML",
                definition: "HyperText Markup Language - the standard markup language for documents designed to be displayed in a web browser."
            },
            {
                term: "Element",
                definition: "A complete HTML structure including an opening tag, content, and a closing tag (e.g., <p>This is a paragraph.</p>)."
            },
            {
                term: "Tag",
                definition: "The markup that defines an element in HTML. Tags are enclosed in angle brackets (e.g., <p>, <div>)."
            },
            {
                term: "Attribute",
                definition: "Additional information about an element that is included in the opening tag (e.g., class, id, src, href)."
            },
            {
                term: "DOCTYPE",
                definition: "A declaration at the beginning of an HTML document that tells the browser which version of HTML the page is written in."
            },
            {
                term: "Semantic HTML",
                definition: "HTML that uses tags that convey meaning about the structure and content, not just presentation (e.g., <article>, <nav>, <header>)."
            },
            {
                term: "Block-level Element",
                definition: "An element that creates a block-level box in the page layout, typically starting on a new line (e.g., <div>, <p>, <h1>)."
            },
            {
                term: "Inline Element",
                definition: "An element that does not start on a new line and only takes up as much width as necessary (e.g., <span>, <a>, <strong>)."
            }
        ];
        
        // Create accordion for glossary
        let accordionHTML = '<div class="accordion">';
        
        glossaryData.forEach(item => {
            accordionHTML += `
                <div class="accordion-item">
                    <div class="accordion-header">
                        ${item.term}
                        <span class="icon">+</span>
                    </div>
                    <div class="accordion-content">
                        <p>${item.definition}</p>
                    </div>
                </div>
            `;
        });
        
        accordionHTML += '</div>';
        glossaryContainer.innerHTML = accordionHTML;
        
        // Initialize accordion functionality for newly added elements
        const newAccordionHeaders = glossaryContainer.querySelectorAll('.accordion-header');
        
        newAccordionHeaders.forEach(header => {
            header.addEventListener('click', function() {
                const content = this.nextElementSibling;
                content.classList.toggle('active');
                
                const icon = this.querySelector('.icon');
                if (icon) {
                    icon.textContent = content.classList.contains('active') ? '-' : '+';
                }
            });
        });
    }

    const sidebarLinks = document.querySelectorAll('.sidebar ul li a');
    
    // Add click event listener to each link
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all links
            sidebarLinks.forEach(item => {
                item.classList.remove('active');
            });
            
            // Add active class to the clicked link
            this.classList.add('active');
        });
    });
});