const form = document.getElementById("member_form");
const endpoint = "http://127.0.0.1:8080/api/v1/register";
const messages_div = document.getElementById("message");


form.addEventListener("submit", async (e) => {
  e.preventDefault();

    // get form data
    const formData = {
        first_name: form.first_name.value,
        last_name: form.last_name.value,
        email: form.email.value,
        phone_number: form.phone_number.value,
        gender: form.gender.value,
        cohort_number: parseInt(form.cohort_number.value, 10) || 0,
        description: form.description.value,
    };
  
  // validate form data
    const formValid = validateForm(formData);
    if (!formValid) {
        return;
        }

    console.log(JSON.stringify(formData));

    // send form data to server
    const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    });

    console.log(response);

    if (response.status !== 200) {
        const data = await response.json();
        messages_div.innerHTML = `<p style="color: red;">${data.message}</p>`;
        return;
    }

    const data = await response.json(); 
    messages_div.innerHTML = `<p style="color: green;">${data.message}</p>`;
    form.reset();
    console.log(data);
});
    
function validateForm(formData) {
    const {first_name, last_name, email, phone_number, gender, cohort_number, description} = formData;
    if(!first_name || !last_name || !email || !phone_number || !gender || !cohort_number || !description){
        messages_div.innerHTML = `<p style="color: red;">Please fill in all fields</p>`;
        return false;
    }

    // check if the email in the format
    const emailRegex = new RegExp(`^${
        first_name.toLowerCase()}.${last_name.toLowerCase()}@thejitu.com$`);
    if(!emailRegex.test(email)){
        messages_div.innerHTML = `<p style="color: red;">Email must be in the format: ${first_name.toLowerCase()}.${last_name.toLowerCase()}@thejitu.com</p>`;
        return false;
    }

    return true;
}


