function showSection(sectionId) {
    const sections = document.querySelectorAll('section');
    sections.forEach((section) => {  
        section.classList.remove('active');
    });

    const activeSection = document.getElementById(sectionId);
    if (activeSection) {  
        activeSection.classList.add('active');
    } else {
        console.warn(`Section with ID '${sectionId}' not found.`);
    }
}