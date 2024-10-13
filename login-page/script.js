import supabase from "/connection/db.js"; // Make sure the path to your Supabase setup is correct

document.getElementById('formlogin').addEventListener('submit', async (event) => {
        event.preventDefault();

        const loginName = document.getElementById("loginName").value;
        const loginPassword = document.getElementById("loginPassword").value;

        try {
            // Query the Supabase database to check if the user exists with the provided username and password
            const { data, error } = await supabase
                .from('account')
                .select('username, password')
                .eq('username', loginName)
                .eq('password', loginPassword);

            if (error) {
                throw new Error('Error logging in: ' + error.message);
            }

            if (data.length === 0) {
                throw new Error('Invalid username or password');
            }

            // Successfully logged in
            localStorage.setItem('userData', JSON.stringify({ name: loginName }));

            // Redirect to home page
            window.location.href = "../home-page/home.html";
        } catch (error) {
            alert(error.message);
        }
    })

    // document.querySelector('form').addEventListener('submit', submitLoginForm);


//     document.getElementById('forms').addEventListener('submit', async (event) => {
//     event.preventDefault();

//     const loginName = document.getElementById("loginName").value;
//     const loginPassword = document.getElementById("loginPassword").value;

//     const userData = {
//         username: loginName,
//         password: loginPassword
//     };


//     try {
//         const response = await fetch('/login', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(userData)
//         });

//         if (!response.ok) {
//             const errorMessage = await response.json();
//             throw new Error(errorMessage.message);
//         }

//         const responseData = await response.json();
//         const { token, redirectUrl } = responseData;

        
//         localStorage.setItem('userData', JSON.stringify({ name: loginName }));


        
//         window.location.href = "../home-page/home.html"

//     } catch (error) {
//         alert(error.message);
//     }
// })
