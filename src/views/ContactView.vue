<template>
    <div class="contact-page">
  
      <main class="contact-main">
        <div class="team-grid">
          <div class="team-member" v-for="member in team" :key="member.name">
            <div class="avatar"></div>
            <p>{{ member.name }}</p>
          </div>
        </div>
      </main>
    </div>
  </template>
  
  <script setup>
  const team = [
    { name: 'Gabriel' },
    { name: 'Guilherme' },
    { name: 'Murilo' },
    { name: 'Nicolas' }
  ]
  </script>
  
  <style scoped>
  .contact-page {
    background-color: white; /* rosa do print */
    max-height: 10vh;
    font-family: sans-serif;
  }
  
  .site-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background: white;
  }
  
  .site-header .logo {
    height: 50px;
  }
  
  .site-header nav a {
    margin-left: 2rem;
    text-decoration: none;
    color: black;
    font-weight: bold;
  }
  
  .contact-main {
    padding: 3rem 2rem;
  }
  
  .team-grid {
    display: flex;
    gap: 2rem;
    justify-content: center;
    margin-top: 2rem;
  }
  
  .team-member {
    text-align: center;
  }
  
  .avatar {
    width: 100px;
    height: 100px;
    background-color: #ccc;
    border-radius: 50%;
    margin-bottom: 0.5rem;
  }
  </style>
  