<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const submitForm = () => {
  console.log('Dados do formulário:')
  router.push('/')
}


const step = ref(1)

const nextStep = () => {
  if (step.value < 3) step.value++
}
const prevStep = () => {
  if (step.value > 1) step.value--
}

const stepMessage = () => {
  if (step.value === 1) return 'Fill in your personal information'
  if (step.value === 2) return 'Now your access credentials'
  return 'Almost there!'
}

const progress = () => {
  return step.value === 1 ? '25%' : step.value === 2 ? '50%' : '75%'
}

const progressColor = () => {
  return step.value === 1 ? '#b11919' : step.value === 2 ? '#e5b400' : '#36c96c'
}
</script>

<template>
  <main>
    <div class="register-container">
      <p class="titleRegister">SIGN-IN</p>
      <div class="progress-bar">
        <div class="progress" :style="{ width: progress(), backgroundColor: progressColor() }"></div>
      </div>
      <p class="stepMsg">{{ stepMessage() }}</p>

      <form>
        <div v-if="step === 1">
          <div class="input-group">
            <label for="name">First Name</label>
            <div class="inputWithIcon">
              <span><img class="userIcon" src="@/assets/images/userIcon.png" alt="" /></span>
              <input type="text" id="name" placeholder="Enter your first name" required />
            </div>
          </div>
          <div class="input-group">
            <label for="lastName">Last Name</label>
            <div class="inputWithIcon">
              <span><img class="userIcon" src="@/assets/images/userIcon.png" alt="" /></span>
              <input type="text" id="lastName" placeholder="Enter your last name" required />
            </div>
          </div>
          <div class="input-group">
            <label for="birth">Date of Birth</label>
            <div class="inputWithIcon">
              <span><img class="userIcon" src="@/assets/images/birthIcon.png" alt="" /></span>
              <input type="date" id="birth" required />
            </div>
          </div>
          <div class="input-group">
            <label for="cpf">CPF</label>
            <div class="inputWithIcon">
              <span><img class="userIcon" src="@/assets/images/cpfIcon.png" alt="" /></span>
              <input type="text" id="cpf" placeholder="Enter your CPF" required />
            </div>
          </div>
        </div>

        <div v-if="step === 2">
          <div class="input-group">
            <label for="email">Email</label>
            <div class="inputWithIcon">
              <span><img class="userIcon" src="@/assets/images/userIcon.png" alt="" /></span>
              <input type="email" id="email" placeholder="Enter your email" required />
            </div>
          </div>
          <div class="input-group">
            <label for="password">Password</label>
            <div class="inputWithIcon">
              <span><img class="userIcon" src="@/assets/images/passwordIcon.png" alt="" /></span>
              <input type="password" id="password" placeholder="Enter your password" required />
            </div>
          </div>
          <div class="input-group">
            <label for="confirmPassword">Confirm Password</label>
            <div class="inputWithIcon">
              <span><img class="userIcon" src="@/assets/images/confirmPasswordIcon.png" alt="" /></span>
              <input type="password" id="confirmPassword" placeholder="Confirm your password" required />
            </div>
          </div>
          <div class="input-group">
            <label for="cellphone">Phone Number</label>
            <div class="inputWithIcon">
              <span><img class="userIcon" src="@/assets/images/cellphoneIcon.png" alt="" /></span>
              <input type="tel" id="cellphone" placeholder="Enter your phone number" required />
            </div>
          </div>
        </div>

        <div v-if="step === 3">
          <div class="input-group">
            <label for="state">State</label>
            <div class="inputWithIcon">
              <span><img class="userIcon" src="@/assets/images/stateIcon.png" alt="" /></span>
              <input type="text" id="state" placeholder="Enter your state" required />
            </div>
          </div>
          <div class="input-group">
            <label for="city">City</label>
            <div class="inputWithIcon">
              <span><img class="userIcon" src="@/assets/images/cityIcon.png" alt="" /></span>
              <input type="text" id="city" placeholder="Enter your city" required />
            </div>
          </div>
          <div class="input-group">
            <label for="cep">CEP</label>
            <div class="inputWithIcon">
              <span><img class="userIcon" src="@/assets/images/cepIcon.png" alt="" /></span>
              <input type="text" id="cep" placeholder="Enter your CEP code" required />
            </div>
          </div>
          <div class="input-group">
            <label for="house">House Number</label>
            <div class="inputWithIcon">
              <span><img class="userIcon" src="@/assets/images/houseIcon.png" alt="" /></span>
              <input type="text" id="house" placeholder="Enter your house number" required />
            </div>
          </div>
        </div>

        <div class="button-group">
          <button type="button" @click="prevStep" v-if="step > 1">Back</button>
          <button type="button" @click="nextStep" v-if="step < 3">Next Step</button>
          <button type="submit" @click="submitForm" v-if="step === 3">Submit</button>
        </div>
      </form>

      <p class="register">Already have an account? <a href="/login">Log in here</a></p>
    </div>

    <div class="container">
      <p class="Title">Welcome!</p>
      <p class="instruction">Please register to continue</p>
    </div>
  </main>
</template>



<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
main {
    display: flex;
    height: 100vh;
    background-color: #f0f0f0;
    font-family: 'Poppins';
}
.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 30vw;
    background: linear-gradient(270deg, #b11919ef, #9b2121e8, #b11919ee);
    background-size: 400% 400%;
    color: #fff;
    animation: gradientBG 10s ease infinite;
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
.register-container {
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
.titleRegister {
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
.input-group .inputWithIcon {
  display: flex;
  align-items: end;
}
.input-group .inputWithIcon img {
    width: 2.5rem;
    height: 2.5rem;
    margin-right: 0.5rem;
}
span {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}
.icon {
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
    font-size: 1.5rem;
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
    color: #737373;
}
.input-group input:focus::placeholder {
    color: transparent;
}
.input-group input:focus + label {
    color: #192EB1;
}
button {
    padding: 0.75rem 1.5rem;
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
a {
    color: #2455da;
    text-decoration: underline;
}
.register {
    margin-top: 1rem;
    font-size: 1.2rem;
}
.progress-bar {
    width: 90%;
    height: 10px;
    background-color: #ddd;
    border-radius: 10px;
    margin-bottom: 1rem;
    overflow: hidden;
}
.progress {
    height: 100%;
    transition: width 0.3s ease;
}
.stepMsg {
    font-size: 1.4rem;
    font-weight: 500;
    margin-bottom: 1.5rem;
    text-align: center;
}
.button-group {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 2rem;
    flex-wrap: wrap;
}

.button-group button {
    flex: 1;
    max-width: 24%;
}

.button-group button:only-child {
    max-width: 50%;
}

</style>

