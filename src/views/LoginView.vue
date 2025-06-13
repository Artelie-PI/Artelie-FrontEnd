<script setup></script>
<template>
    <main>
    <div class="container">
        <p class="Title">Welcome Back!</p>
        <p class="instruction">Please login to continue</p>
    </div>
        <div class="login-container">
            <p class="titleLogin">LOGIN</p>
            <form>
                <div class="input-group">
                    <label for="email">Email</label>
                    <div class="emailInput">
                    <span><img class="userIcon" src="@/assets/images/userIcon.png" alt=""></span>
                    <input type="email" id="email" placeholder="Enter your Email" required>
                    </div>
                </div>
                <div class="input-group">
                    <label for="password">Password</label>
                    <div class="passwordInput">
                    <span><img class="userIcon" src="@/assets/images/passwordIcon.png" alt=""></span>
                    <input type="password" id="password" placeholder="Enter your Password" required>
                    </div>
                </div>
                <button type="submit">Login</button>
            </form>
            <p class="register">Don't have an account? <a href="/register">Register here</a></p>
        </div>
        
    </main>
</template>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
main{
    display: flex;
    height: 100vh;
    background-color: #f0f0f0;
    font-family: 'Poppins'
}
.container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 30vw;
    background: linear-gradient(270deg, #192EB1,  #214b9b, #192EB1);
    background-size: 400% 400%;
    color: #fff;
}

@keyframes gradientBG {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}
form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 1rem;
}
.login-container {
    background-color: #fff;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 70vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.titleLogin {
    font-size: 4rem;
    font-weight: 600;
    margin-bottom: 1rem;
}
.instruction {
    font-size: 1.5rem;
    color: #ffffff;
}
.input-group {
    margin-bottom: 1rem;
}
.input-group .emailInput {
    display: flex;
    align-items: end;
}
.input-group .passwordInput {
    display: flex;
    align-items: end;
}
span {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}
.userIcon {
    height: 2.8rem;
    left: 1rem;
    top: 1.5rem;
    padding-bottom: 1vh;
    padding-left: 0.5vw;
    border-bottom: #ccc 1px solid;
}
.input-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 400;
    font-size: 1.5rem
}

.input-group input {
    width: 50vw;
    height: 5vh;
    padding: 0.5rem;
    padding-bottom: 1vh;
    padding-left: 1rem;
    border: 0px solid #ccc;
    border-bottom: 1px solid #ccc;
    font-size: 16px;
}
.input-group input:focus {
    border-color: #192EB1;
    outline: none;
}
.input-group input::placeholder {
    color: #aaa;
}
.input-group input:focus::placeholder {
    color: transparent;
}
.input-group input:focus + label {
    color: #192EB1;
}
button {
    margin-top: 1vh;
    width: 50%;
    padding: 0.75rem;
    background-color: #192EB1;
    color: #fff;
    border: none;
    border-radius: 2rem;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
}
button:hover {
    background-color: #3a8dde;
}
button:active {
    background-color: #1e3c72;
}
button:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(25, 46, 177, 0.5);
}
.container .Title {
    font-size: 36px;
    font-weight: 700;
    margin-bottom: 0.5rem;
}
.container .instruction {
    font-size: 18px;
    color: #fff;
    margin-bottom: 2rem;
}
.container {
    animation: gradientBG 10s ease infinite;
}
.container p {
    margin: 0;
}
.container p.Title {
    font-size: 36px;
    font-weight: 700;
    margin-bottom: 0.5rem;
}
.container p.instruction {
    font-size: 18px;
    color: #fff;
    margin-bottom: 2rem;
}
a{
    color: #2455da;
    text-decoration: underline;
}
.register {
    margin-top: 1rem;
    font-size: 1.2rem;
}
</style>