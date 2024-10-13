// Import the Supabase library
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Initialize Supabase with your project credentials
const supabaseUrl = 'https://jkcdmshyhsxzjptenoyu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImprY2Rtc2h5aHN4empwdGVub3l1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjczNTgxODAsImV4cCI6MjA0MjkzNDE4MH0.Fxn0MKSaMH-kgWi3J2ITVAxs5qibJiG2zGyjhgcC0ys'; // Replace with your actual Supabase anon key
const supabase = createClient(supabaseUrl, supabaseKey);

(async function () {
    const app = document.querySelector(".app");
    let userId; // Store user ID instead of username

    // User login/join functionality
    app.querySelector(".join-screen #join-user").addEventListener("click", async function () {
        const username = prompt("Please enter your email:");
        const password = prompt("Please enter your password:");
        
        // Check if the account exists
        let { data: user, error } = await supabase
            .from('account')
            .select('*')
            .eq('username', username)
            .single();

        if (error || !user) {
            alert("User not found. Please register or try again.");
            return;
        }

        userId = user.user_id; // Get the user's ID
        app.querySelector(".join-screen").classList.remove("active");
        app.querySelector(".chat-screen").classList.add("active");

        // Insert a "user joined" message using userId
        await supabase.from('messages').insert([{ user_id: userId, text: `User joined the chat`, type: 'update' }]);
    });

    // Send message functionality
    app.querySelector(".chat-screen #send-message").addEventListener("click", async function () {
        const message = app.querySelector(".chat-screen #message-input").value;
        if (message.length === 0) {
            return;
        }
        renderMessage("my", { text: message });

        // Insert the message using the user_id
        await supabase.from('messages').insert([{ user_id: userId, text: message, type: 'chat' }]);

        app.querySelector(".chat-screen #message-input").value = "";
    });

    // Exit chat functionality
    app.querySelector(".chat-screen #exit-chat").addEventListener("click", async function () {
        // Insert a "user left" message
        await supabase.from('messages').insert([{ user_id: userId, text: `User left the chat`, type: 'update' }]);
        window.location.href = window.location.href; // Refresh page to return to the join screen
    });

    // Subscribe to the 'messages' table for real-time updates
    const messageChannel = supabase
        .channel('public:messages')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, payload => {
            if (payload.new.user_id !== userId) {
                renderMessage(payload.new.type === 'update' ? 'update' : 'other', payload.new);
            }
        })
        .subscribe();

    // Function to render messages in the chat interface
    function renderMessage(type, message) {
        const messageContainer = app.querySelector(".chat-screen .messages");
        const el = document.createElement("div");

        if (type === "my") {
            el.setAttribute("class", "message my-message");
            el.innerHTML = `<div><div class="name">You</div><div class="text">${message.text}</div></div>`;
        } else if (type === "other") {
            el.setAttribute("class", "message other-message");
            el.innerHTML = `<div><div class="name">User</div><div class="text">${message.text}</div></div>`;
        } else if (type === "update") {
            el.setAttribute("class", "update");
            el.innerText = message.text;
        }

        messageContainer.appendChild(el);
        messageContainer.scrollTop = messageContainer.scrollHeight - messageContainer.clientHeight;
    }
})();
