// Tab switching logic
var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function openTab(tabname) {
  for (tablink of tablinks) {
    tablink.classList.remove("active-link");
  }
  for (tabcontent of tabcontents) {
    tabcontent.classList.remove("active-tab");
  }
  event.currentTarget.classList.add("active-link");
  document.getElementById(tabname).classList.add("active-tab");
}

document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();  // Prevent the form from submitting the traditional way

    const form = e.target;  // Get the form element
    const successMessage = document.getElementById('success-message');
    const responseMsg = document.getElementById('response-msg');

    // Get form data
    const formData = new FormData(form);

    // Send form data to Google Apps Script using fetch
    fetch(form.action, {
        method: 'POST',
        body: formData,
    })
    .then(response => response.text())  // Wait for the response from the script
    .then(responseText => {
        // Show success message if the form submission was successful
        successMessage.style.display = 'block';
        responseMsg.textContent = "";  // Clear any previous error messages

        // Reset the form fields
        form.reset();

        // Hide the success message after 5 seconds
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
    })
    .catch(error => {
        console.error('Error:', error);
        responseMsg.textContent = "There was an error submitting the form. Please try again.";
        responseMsg.style.color = "red";
    });
});
