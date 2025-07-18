document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle Functionality
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Set initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Update icon based on current theme
    updateThemeIcon(currentTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        updateThemeIcon(newTheme);
    });
    
    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
    
    // Code Editor Functionality
    const runButton = document.getElementById('run-code');
    const htmlEditor = document.getElementById('html-editor');
    const previewOutput = document.getElementById('preview-output');
    
    // Run code when button is clicked
    runButton.addEventListener('click', function() {
        const code = htmlEditor.value;
        const frameDoc = previewOutput.contentDocument || previewOutput.contentWindow.document;
        
        frameDoc.open();
        frameDoc.write(code);
        frameDoc.close();
    });
    
    // Run initial code
    runButton.click();
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    async function sendMessage() {
  const input = document.getElementById("userInput").value;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer YOUR_OPENAI_API_KEY"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: input }]
    })
  });

  const data = await response.json();
  const reply = data.choices[0].message.content;
  document.getElementById("chat-output").innerHTML += `<p><b>You:</b> ${input}</p><p><b>AI:</b> ${reply}</p>`;
}

    
    
    
    
   
    
    // CTA button
    document.querySelector('.cta-button').addEventListener('click', function() {
        window.location.href = '#learn';
    });
});
