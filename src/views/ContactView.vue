<template>
  <main class="contact-main">
    <h1 class="title">Nossa Equipe</h1>
    <div class="team-grid">
      <div class="team-member" v-for="member in team" :key="member.name">
        <img :src="member.image" :alt="member.name" class="avatar" />
        <h2>{{ member.name }}</h2>
        <p v-if="member.description" class="description">{{ member.description }}</p>
        <div class="socials">
          <a v-if="member.instagram" :href="member.instagram" target="_blank" rel="noopener">
            <img :src="insta" alt="Instagram" class="social-icon" />
          </a>
          <a v-if="member.linkedin" :href="member.linkedin" target="_blank" rel="noopener">
            <img :src="linkedin" alt="LinkedIn" class="linkedin-icon" />
          </a>
          <a v-if="member.github" :href="member.github" target="_blank" rel="noopener">
            <img :src="github" alt="GitHub" class="social-icon" />
          </a>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import gabriel from '@/assets/images/gabriel.png'
import guilherme from '@/assets/images/guilherme.jpeg'
import murilo from '@/assets/images/murilo.jpeg'
import nicolas from '@/assets/images/nicolas.jpg'
import insta from '@/assets/images/instablack.png'
import linkedin from '@/assets/images/linkedin.png'
import github from '@/assets/images/github.jpg'

const team = [
  {
    name: "Gabriel",
    image: gabriel,
    description: "Frontend e integração.",
    instagram: "https://www.instagram.com/notgbi/",
    linkedin: "https://www.linkedin.com/in/gabriel-henrick-martins-gomes-27230b299/",
    github: "https://github.com/gabrielmartinsgomes"
  },
  {
    name: "Guilherme",
    image: guilherme,
    description: "Backend e Frontend.",
    instagram: "https://www.instagram.com/glhrmschreiber/",
    linkedin: "https://www.linkedin.com/in/guilherme-schreiber-08630a299/",
    github: "https://github.com/GuilhermeSchreiber7"
  },
  {
    name: "Murilo",
    image: murilo,
    description: "Design do site.",
    instagram: "https://www.instagram.com/souzamurilo.7/",
    linkedin: "https://www.linkedin.com/in/murilo-da-cruz-souza-439809299/",
    github: "https://github.com/MuriloDaCruz"
  },
  {
    name: "Nicolas",
    image: nicolas,
    description: "Frontend e assistência no design.",
    instagram: "https://www.instagram.com/steffens_28/",
    linkedin: "https://www.linkedin.com/in/nicolas-steffens-pereira-aa2808299/",
    github: "https://github.com/SPNicolas"
  }
]
</script>

<style scoped>
.contact-main {
  padding: 2rem 0.5rem;
  text-align: center;
  font-family: "Inter", sans-serif;
}

.title {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 2rem;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(13.75rem, 1fr));
  gap: 1rem;
  justify-items: center;
}

.team-member {
  max-width: 16.25rem;
}

.avatar {
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
  box-shadow: 0 0.25rem 0.75rem rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

.avatar:hover {
  transform: scale(1.05);
}

.team-member h2 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.description {
  font-size: 1.05rem;
  color: #333;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.socials {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
}

.social-icon {
  width: 1.75rem;
  height: 1.75rem;
  object-fit: contain;
  transition: transform 0.2s ease;
}

.linkedin-icon {
  width: 2rem;
  height: 2rem;
  object-fit: contain;
  transition: transform 0.2s ease;
}

.social-icon:hover {
  transform: scale(1.15);
}

@media (max-width: 768px) {
  .avatar {
    width: 7.5rem;
    height: 7.5rem;
  }
  .team-member h2 {
    font-size: 1.1rem;
  }
  .description {
    font-size: 0.95rem;
  }
}

@media (max-width: 480px) {
  .avatar {
    width: 6.25rem;
    height: 6.25rem;
  }
  .team-member h2 {
    font-size: 1rem;
  }
  .description {
    font-size: 0.9rem;
  }
}
</style>
