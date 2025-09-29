<template>
    <div class="contact-page">
      <main class="contact-main">
        <h1 class="title">Nossa Equipe</h1>
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
    background-color: white;
    font-family: sans-serif;
    max-height: 10vh;
  }
  
  .site-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    border-bottom: 1px solid #ddd;
    background-color: white;
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
    text-align: center;
  }
  
  .title {
    font-size: 2rem;
    margin-bottom: 2rem;
    font-weight: bold;
  }
  
  .team-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 2rem;
    justify-items: center;
  }
  
  .team-member {
    text-align: center;
  }
  
  .avatar {
    width: 120px;
    height: 120px;
    background-color: #ccc;
    border-radius: 50%;
    margin-bottom: 0.5rem;
  }
  </style>
  
  