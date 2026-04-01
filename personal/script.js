// --- 1. SCROLL ANIMATIONS ---
// This makes elements with the 'hidden' class slide in when you scroll to them
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, {
    threshold: 0.15 
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));


// --- 2. PROJECT DATA REPOSITORY ---
// Every "value" in your HTML <option> tags must match a key here exactly!
const projectData = {
    "Calculator": {
        desc: "A functional math tool for basic operations. 🧮",
        code: "function calculate(a, b, op) {\n  if(op === '+') return a + b;\n  return 'Invalid';\n}",
        color: "#4ECDC4"
    },
    "Peso to Dollar": {
        desc: "Converts Philippine Peso to US Dollars. ⚖️",
        code: "const rate = 0.018;\nlet usd = php * rate;\nconsole.log('Total: $' + usd);",
        color: "#FF6B6B"
    },
    "Hello World": {
        desc: "The classic first step in every coder's journey. 🌍",
        code: "document.body.innerHTML = '<h1>Hello World!</h1>';",
        color: "#FFE66D"
    },
    "Window": {
        desc: "Managing browser window properties. 🌍",
        code: "window.open('https://google.com', '_blank');",
        color: "#a29bfe"
    },
    "Name pop up window": {
        desc: "Using prompt to get user data. 🌍",
        code: "let name = prompt('What is your name?');\nalert('Welcome, ' + name);",
        color: "#fd79a8"
    },
    "Birthday": {
        desc: "Check if it's your special day. 🌍",
        code: "if(today === bday) {\n  confetti.start();\n}",
        color: "#fab1a0"
    },
    "If else window": {
        desc: "Logic gates for decision making. 🌍",
        code: "if (score > 75) {\n  status = 'Pass';\n} else {\n  status = 'Fail';\n}",
        color: "#55efc4"
    },
    "Alcohol Verification": {
        desc: "Ensuring safety with age verification. 🌍",
        code: "if (age >= 18) {\n  allowEntry();\n} else {\n  alert('Underage!');\n}",
        color: "#81ecec"
    },
    "Show current date": {
        desc: "Display the live date and time. 🌍",
        code: "const now = new Date();\ndocument.write(now.toDateString());",
        color: "#74b9ff"
    },
    "Multiplication": {
        desc: "Calculate products instantly. 🌍",
        code: "let product = x * y;",
        color: "#a29bfe"
    },
    "Division": {
        desc: "Split numbers accurately. 🌍",
        code: "let quotient = x / y;",
        color: "#ffeaa7"
    },
    "Addition": {
        desc: "Summing up values. 🌍",
        code: "let sum = parseFloat(x) + parseFloat(y);",
        color: "#55efc4"
    },
    "Subtraction": {
        desc: "Finding the difference. 🌍",
        code: "let diff = x - y;",
        color: "#fab1a0"
    },
    "Timer": {
        desc: "A countdown or stopwatch feature. 🌍",
        code: "setInterval(() => {\n  timeLeft--;\n}, 1000);",
        color: "#ff7675"
    },
    "interframe image": {
        desc: "Handling images within frames. 🌍",
        code: "document.getElementById('frame').src = 'new_image.png';",
        color: "#fdcb6e"
    },
    "Name Greeting": {
        desc: "Personalized messages for users. 🌍",
        code: "console.log(`Hello, ${userName}! Glad you are here.`);",
        color: "#00b894"
    }
};


// --- 3. SELECTION LOGIC ---
const subjectSelect = document.getElementById('subject-select');
const resultBox = document.getElementById('subject-result');

subjectSelect.addEventListener('change', (e) => {
    const selected = e.target.value;
    
    // Smoothly hide the box
    resultBox.classList.remove('active');

    if (projectData[selected]) {
        // Wait for the 'hide' animation to finish
        setTimeout(() => {
            const project = projectData[selected];
            
            // Build the HTML for the description and code container
            resultBox.innerHTML = `
                <p style="margin-bottom: 15px; font-weight: bold; font-size: 1.2rem;">${project.desc}</p>
                <div class="code-container">
                    <button class="copy-btn" onclick="copyCode()">Copy Code 📋</button>
                    <pre><code id="code-to-copy">${project.code}</code></pre>
                </div>
            `;
            
            // Apply colors and show the box
            resultBox.style.backgroundColor = project.color;
            resultBox.classList.add('active');
        }, 150);
    }
});


// --- 4. COPY TO CLIPBOARD FUNCTION ---
// --- 4. IMPROVED COPY TO CLIPBOARD FUNCTION ---
function copyCode() {
    const codeElement = document.getElementById('code-to-copy');
    if (!codeElement) {
        console.error("Could not find the code element!");
        return;
    }

    const codeText = codeElement.innerText;
    const btn = document.querySelector('.copy-btn');

    // Method A: Modern Clipboard API
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(codeText).then(() => {
            showSuccess(btn);
        }).catch(err => {
            console.error('Modern copy failed, trying fallback...', err);
            fallbackCopy(codeText, btn);
        });
    } else {
        // Method B: Fallback for older browsers or non-secure contexts
        fallbackCopy(codeText, btn);
    }
}

// Visual feedback helper
function showSuccess(btn) {
    const originalText = btn.innerText;
    btn.innerText = "Copied! ✅";
    btn.style.backgroundColor = "#2d3436";
    btn.style.color = "#fff";
    
    setTimeout(() => {
        btn.innerText = originalText;
        btn.style.backgroundColor = ""; 
        btn.style.color = "";
    }, 2000);
}

// Fallback method using a temporary invisible text area
function fallbackCopy(text, btn) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
        document.execCommand('copy');
        showSuccess(btn);
    } catch (err) {
        console.error('Fallback copy failed', err);
    }
    document.body.removeChild(textArea);
}
document.querySelectorAll(".card").forEach(card => {
    const code = card.querySelector(".card-code");
    const iframe = card.querySelector(".preview");

    if (code && iframe) {
        iframe.srcdoc = code.textContent;
    }
});