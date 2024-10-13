
import supabase from "/connection/db.js";


document.getElementById('forms').addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const passwords = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const month = document.getElementById("month");
    const monthValue = month.options[month.selectedIndex].value;
    const day = document.getElementById("day").value;
    const year = document.getElementById("year").value;
    const gender = document.getElementById("gender");
    const genderValue = gender.options[gender.selectedIndex].value;
    const agree = document.getElementById("agree").checked

    if(name.length < 2){
        alert("Name must be at least 2 character");
    } else if(passwords != confirmPassword || passwords.length < 8){
        alert("Password must be at least 8 character and need to be the same as confirm password")
    } else if(monthValue == "month" || day == "" || year == ""){
        alert("Please fill out your date of birth")
    } else if(genderValue == "gender"){
        alert("Please select a gender")
    } else if(!agree){
        alert("Please agree with our terms and condition by checking the box")
    } else {
        const { data, error } = await supabase
        .from('account')
        .insert({ username: name, password: passwords })
        .select()

        console.log(data)
        console.log(error)

        window.location.href = "../login-page/login.html"

        // const userData = {
        //     name: name,
        //     password: password,
            
        // };

        
        // localStorage.setItem('userData', JSON.stringify(userData));

        // fetch("/register", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(userData),
        // })
        // .then((response) => {
        //     if (!response.ok) {
        //         throw new Error("Network response was not ok");
        //     }
        //     return response.json();
        // })
        // .then((data) => {
        //     console.log("Registration successful:", data);
        //     window.location.href = "../login-page/login.html";
        // })
        // .catch((error) => {
        //     console.error("Error during registration:", error);
        // });
        

    // document.getElementById('button').addEventListener('click', async () => {
    //     const { data, error } = await supabase
    //     .from('account')
    
    //     .insert({ username: name, password: passwords })
    //     .select()

    //     console.log(data)
    //     console.log(error)

    //     window.location.href = "../login-page/login.html"

    // })
    }

})