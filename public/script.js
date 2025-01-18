document.addEventListener("DOMContentLoaded", () => {
  // Select common elements for registration
  const passwordInput = document.getElementById("passwordInput");
  const passwordCriteria = document.getElementById("passwordCriteria");
  const usernameInput = document.getElementById("usernameInput");
  const strengthIndicator = document.getElementById("strengthIndicator");
  const lengthCriteria = document.getElementById("length");
  const uppercaseCriteria = document.getElementById("uppercase");
  const lowercaseCriteria = document.getElementById("lowercase");
  const numberCriteria = document.getElementById("number");
  const specialCriteria = document.getElementById("special");
  const progressBar = document.getElementById("progressBar");
  const progressContainer = document.getElementById("progressContainer");
  const togglePassword = document.getElementById("togglePassword");
  const registerButton = document.getElementById("registerButton");
  const registrationMessage = document.getElementById("registrationMessage");
  const generatePasswordButton = document.getElementById(
    "generatePasswordButton"
  );

  // Function to toggle password visibility
  function togglePasswordVisibility(input, toggleElement) {
    const type =
      input.getAttribute("type") === "password" ? "text" : "password";
    input.setAttribute("type", type);
    toggleElement.className = `fa-solid fa-eye${
      type === "password" ? "" : "-slash"
    }`;
  }

  // Add event listener to toggle password visibility (registration)
  if (togglePassword) {
    togglePassword.addEventListener("click", () => {
      togglePasswordVisibility(passwordInput, togglePassword);
    });
  }

  // Show password criteria and generate button when user focuses on the password input
  if (passwordInput && passwordCriteria && generatePasswordButton) {
    passwordInput.addEventListener("focus", () => {
      passwordCriteria.style.display = "block"; // Show criteria on focus
      generatePasswordButton.style.display = "inline-block"; // Show button
    });

    passwordInput.addEventListener("click", () => {
      passwordCriteria.style.display = "block"; // Show criteria on click
      generatePasswordButton.style.display = "inline-block"; // Show button
    });

    // Update the strength as the user types (only for registration)
    passwordInput.addEventListener("input", () => {
      const password = passwordInput.value;

      if (password.length > 0) {
        strengthIndicator.style.display = "block";
        progressContainer.style.display = "block";
      } else {
        strengthIndicator.style.display = "none";
        progressContainer.style.display = "none";
        passwordCriteria.style.display = "none"; // Hide criteria if no password
        generatePasswordButton.style.display = "none"; // Hide button if no password
      }

      const hasLength = password.length >= 8;
      const hasUppercase = /[A-Z]/.test(password);
      const hasLowercase = /[a-z]/.test(password);
      const hasNumber = /\d/.test(password);
      const hasSpecial = /[!@#$%^&*]/.test(password);

      updateCriteria(lengthCriteria, hasLength);
      updateCriteria(uppercaseCriteria, hasUppercase);
      updateCriteria(lowercaseCriteria, hasLowercase);
      updateCriteria(numberCriteria, hasNumber);
      updateCriteria(specialCriteria, hasSpecial);

      const strength = calculateStrength(
        hasLength,
        hasUppercase,
        hasLowercase,
        hasNumber,
        hasSpecial
      );
      displayStrength(strength);
    });
  }

  // Function to update the criteria indicator (tick mark)
  function updateCriteria(element, isValid) {
    if (isValid) {
      element.classList.add("fulfilled"); // Add class when fulfilled
    } else {
      element.classList.remove("fulfilled"); // Remove class when not fulfilled
    }
  }

  // Function to calculate password strength based on criteria met
  function calculateStrength(...criteria) {
    const validCount = criteria.filter(Boolean).length;
    if (validCount === 5) return "Strong";
    if (validCount >= 3) return "Medium";
    return "Weak";
  }

  // Function to display the strength in the UI and update progress bar
  function displayStrength(strength) {
    strengthIndicator.textContent = `Password Strength: ${strength}`;

    let width;
    if (strength === "Strong") {
      width = "100%";
      strengthIndicator.className = "strength-strong";
      progressBar.className = "progress-strong";
    } else if (strength === "Medium") {
      width = "66%";
      strengthIndicator.className = "strength-medium";
      progressBar.className = "progress-medium";
    } else {
      width = "33%";
      strengthIndicator.className = "strength-weak";
      progressBar.className = "progress-weak";
    }

    progressBar.style.width = width;
  }

  // // Function to generate a random password
  // function generateRandomPassword() {
  //   const length = 12; // Desired length of the password
  //   const charset =
  //     "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
  //   let password = "";
  //   for (let i = 0; i < length; i++) {
  //     const randomIndex = Math.floor(Math.random() * charset.length);
  //     password += charset[randomIndex];
  //   }
  //   return password;
  // }

  // Function to generate a random strong password
  function generateRandomPassword() {
    const length = 12; // Desired length of the password
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const specialChars = "!@#$%^&*()_+";

    // Ensure that the password includes at least one of each required character type
    const passwordChars = [
      uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)],
      lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)],
      numberChars[Math.floor(Math.random() * numberChars.length)],
      specialChars[Math.floor(Math.random() * specialChars.length)],
    ];

    // Fill the rest of the password length with a random selection from all character types
    const allChars =
      uppercaseChars + lowercaseChars + numberChars + specialChars;
    for (let i = passwordChars.length; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * allChars.length);
      passwordChars.push(allChars[randomIndex]);
    }

    // Shuffle the resulting password characters to randomize their order
    const shuffledPassword = passwordChars
      .sort(() => Math.random() - 0.5)
      .join("");

    return shuffledPassword;
  }

  // Generate password button click event
  if (generatePasswordButton && passwordInput) {
    generatePasswordButton.addEventListener("click", function (event) {
      event.stopPropagation(); // Prevent the blur event from firing
      const generatedPassword = generateRandomPassword(); // Function to generate random password
      passwordInput.value = generatedPassword; // Set the generated password to the input field
      passwordInput.dispatchEvent(new Event("input")); // Trigger input event to update strength
      passwordCriteria.style.display = "block"; // Show criteria when password is generated
      passwordInput.focus(); // Focus on the password input
    });
  }

  // Check if on registration page and add event listener to handle registration
  if (registerButton && usernameInput && passwordInput && registrationMessage) {
    registerButton.addEventListener("click", async () => {
      const username = usernameInput.value.trim();
      const password = passwordInput.value;

      // Check password strength
      const strength = calculateStrength(
        password.length >= 8,
        /[A-Z]/.test(password),
        /[a-z]/.test(password),
        /\d/.test(password),
        /[!@#$%^&*]/.test(password)
      );

      // Function to check if the password is compromised using the HIBP API
      async function checkPasswordInHIBP(password) {
        const sha1Password = await sha1(password); // Use the SHA-1 hash of the password
        const hashPrefix = sha1Password.slice(0, 5); // Get the first 5 characters of the hash
        const hashSuffix = sha1Password.slice(5); // Get the remaining characters of the hash

        try {
          const response = await fetch(
            `https://api.pwnedpasswords.com/range/${hashPrefix}`
          );
          if (!response.ok) {
            throw new Error("Failed to check password against HIBP API");
          }

          const data = await response.text();
          const hashes = data.split("\n");

          // Check if the hashed password suffix is in the response
          for (const hash of hashes) {
            const [suffix, count] = hash.split(":");
            if (suffix.toLowerCase() === hashSuffix.toLowerCase()) {
              console.log("Password is compromised:", password);
              return true; // Password is compromised
            }
          }
          console.log("Password is not compromised:");
          return false; // Password is not compromised
        } catch (error) {
          console.error("Error checking password:", error);
          return false; // Return false if there is an error
        }
      }

      // Function to calculate SHA-1 hash of the password
      async function sha1(password) {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest("SHA-1", data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray
          .map((b) => b.toString(16).padStart(2, "0"))
          .join("");
        return hashHex.toUpperCase(); // Return the SHA-1 hash in uppercase
      }

      // Check if the password is compromised
      const isCompromised = await checkPasswordInHIBP(password);
      if (isCompromised) {
        registrationMessage.textContent =
          "This password has been compromised! Please choose a different strong password.";
        registrationMessage.style.color = "red";
        return; // Exit if the password is compromised
      }

      if (strength === "Strong" && username) {
        // Make a POST request to your backend
        try {
          const response = await fetch("http://localhost:3000/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
          });

          const data = await response.json();
          if (response.ok) {
            registrationMessage.innerHTML = `<p>Registration successful! <a href="login.html">Click here to login</a></p>`;
            registrationMessage.style.color = "#4CAF50";
            usernameInput.value = ""; // Clear the username input
            passwordInput.value = ""; // Clear the password input
            strengthIndicator.style.display = "none"; // Hide strength indicator
            progressContainer.style.display = "none"; // Hide progress bar
          } else {
            registrationMessage.textContent = data.message;
            registrationMessage.style.color = "red";
          }
        } catch (error) {
          console.error("Error:", error);
          registrationMessage.textContent =
            "An error occurred during registration.";
          registrationMessage.style.color = "red";
        }
      } else {
        registrationMessage.textContent = "Please meet the password criteria.";
        registrationMessage.style.color = "red";
      }
    });
  }

  // Check if on login page and add event listener to handle login
  const loginButton = document.getElementById("loginButton");
  if (loginButton) {
    // Select elements for login
    const loginUsernameInput = document.getElementById("loginUsernameInput");
    const loginPasswordInput = document.getElementById("loginPasswordInput");
    const toggleLoginPassword = document.getElementById("toggleLoginPassword");
    const loginMessage = document.getElementById("loginMessage");

    // Add event listener to toggle password visibility (login)
    if (toggleLoginPassword && loginPasswordInput) {
      toggleLoginPassword.addEventListener("click", () => {
        togglePasswordVisibility(loginPasswordInput, toggleLoginPassword);
      });
    }

    // Check if necessary elements exist before adding event listener
    if (
      loginButton &&
      loginUsernameInput &&
      loginPasswordInput &&
      loginMessage
    ) {
      loginButton.addEventListener("click", async () => {
        const username = loginUsernameInput.value.trim();
        const password = loginPasswordInput.value;

        if (username && password) {
          // Make a POST request to your backend
          try {
            const response = await fetch("http://localhost:3000/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ username, password }),
            });

            const data = await response.json();
            if (response.ok) {
              // Save username in localStorage
              localStorage.setItem("username", username);
              // Redirect to the welcome or any other page
              window.location.href = "welcome.html";
            } else {
              loginMessage.textContent = data.message;
              loginMessage.style.color = "red";
            }
          } catch (error) {
            console.error("Error:", error);
            loginMessage.textContent = "An error occurred during login.";
            loginMessage.style.color = "red";
          }
        } else {
          loginMessage.textContent = "Please enter both username and password.";
          loginMessage.style.color = "red";
        }
      });
    }
  }
});
