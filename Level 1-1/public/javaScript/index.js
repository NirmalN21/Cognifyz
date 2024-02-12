async function handleSubmit(event) {
    event.preventDefault();
    console.log('Clicked');
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value

    const formData = {
        email: email,
        password: password
    }

    const response = await fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });

    if (response.ok) {
        window.location.href = "/userDetails"
    }
}