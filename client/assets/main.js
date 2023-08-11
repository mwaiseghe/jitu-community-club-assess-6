const form = document.getElementById("member_form");
const endpoint = "http://127.0.0.1:8080/api/v1/register";
const messages_dive = document.getElementById("messages_div");

const formData = new FormData(form);

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  // validate form data
    const formValid = validateForm(formData);
    if (!formValid) {
        return;
        }

    // send form data to server
    const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
        });
    const data = await response.json();
    console.log(data);
    if (data.status === "success") {
        messages_div.innerHTML = `<p style="color: green;">${data.message}</p>`;
        window.location.href = "/index.html";
        }
});
    
function validateForm(formData) {
    const {first_name, last_name, email, phone_number, gender, cohort_number, description} = formData;

    if(!first_name || !last_name || !email || !phone_number || !gender || !cohort_number || !description){
        messages_dive.innerHTML = `<p style="color: red;">Please fill in all fields</p>`;
        return false;
    }

    // check if the email in the format
    const emailRegex = new RegExp(`^${
        first_name.toLowerCase()}.${last_name.toLowerCase()}@thejitu.com$`);
    if(!emailRegex.test(email)){
        messages_dive.innerHTML = `<p style="color: red;">Email must be in the format: ${first_name.toLowerCase()}.${last_name.toLowerCase()}@thejitu.com</p>`;
        return false;
    }

    return true;
}


