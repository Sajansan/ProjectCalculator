const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".buttons button");
const historyBtn = document.querySelector(".history-btn");
const modal = document.getElementById("history-modal");
const closeBtn = document.querySelector(".close-btn");
const historyList = document.getElementById("history-list");
const specialChars = ["%", "×", "÷", "-", "+", "="];
let output = "";

// Function to calculate based on button clicked
const calculate = (btnValue) => {
  display.focus();
  if (btnValue === "=" && output !== "") {
    try {
      // Replace UI symbols (×, ÷) with valid JavaScript operators (*, /)
      const result = eval(output.replace("×", "*").replace("÷", "/").replace("%", "/100"));
      addToHistory(`${output} = ${result}`);
      output = result.toString(); // Update output with the result
    } catch {
      output = "Error"; // Show error for invalid expressions
    }
  } else if (btnValue === "AC") {
    output = ""; // Clear the display
  } else if (btnValue === "DEL") {
    output = output.toString().slice(0, -1); // Remove the last character
  } else {
    // Prevent starting with an operator
    if (output === "" && specialChars.includes(btnValue)) return;
    output += btnValue; // Append the button value to the output
  }
  display.value = output; // Update the display
};

// Add calculation to history
const addToHistory = (calculation) => {
  const listItem = document.createElement("li");
  listItem.textContent = calculation; // Add calculation text
  historyList.appendChild(listItem); // Append to history list
};

// Add event listener to buttons
buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const btnValue = e.target.dataset.value; // Get the button's data-value
    if (!btnValue) return; // Ignore if no data-value
    calculate(btnValue);
  });
});

// Open the history modal
historyBtn.addEventListener("click", () => {
  modal.style.display = "block";
});

// Close the modal
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Close the modal when clicking outside of it
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
