<template>
  <section class="max-w-6xl mx-auto text-gray-200">
    <!-- Header -->
    <header class="mb-8 text-center">
      <h1 class="text-3xl font-bold text-gray-100 mb-2">{{ resume.name }}</h1>
      <p class="text-lg text-gray-300 mb-4">{{ resume.title }}</p>
      <div class="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-400">
        <span v-if="resume.location" class="flex items-center">
          <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
          </svg>
          {{ resume.location }}
        </span>
        <span v-if="resume.phone" class="flex items-center">
          <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
          </svg>
          {{ resume.phone }}
        </span>
        <a v-if="resume.email" class="flex items-center hover:text-gray-200" :href="`mailto:${resume.email}`">
          <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
          </svg>
          {{ resume.email }}
        </a>
        <div class="flex items-center space-x-4">
          <template v-for="link in resume.links">
            <a :key="link.url" class="flex items-center hover:text-gray-200" :href="link.url" target="_blank" rel="noreferrer">
              <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clip-rule="evenodd"></path>
              </svg>
              {{ link.label }}
            </a>
          </template>
        </div>
      </div>
    </header>

    <!-- Two column layout -->
    <div class="grid lg:grid-cols-2 gap-6">
      <!-- Left column - Main content -->
      <div class="space-y-6">
        <!-- Summary -->
        <div v-if="resume.summary" class="bg-gray-800 rounded-lg border border-gray-700 p-4">
          <h2 class="text-xl font-bold text-gray-100 mb-3">Summary</h2>
          <p class="text-gray-300 leading-relaxed">{{ resume.summary }}</p>
        </div>

        <!-- Skills -->
        <div v-if="resume.skills && resume.skills.length" class="bg-gray-800 rounded-lg border border-gray-700 p-4">
          <h2 class="text-xl font-bold text-gray-100 mb-4">Skills</h2>
          <div class="grid gap-4 sm:grid-cols-2">
            <div v-for="group in resume.skills" :key="group.category" class="p-3 bg-gray-900 rounded-md">
              <h3 class="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-2">{{ group.category }}</h3>
              <div class="flex flex-wrap gap-2">
                <span v-for="item in group.items" :key="item" class="px-2 py-1 rounded-md bg-gray-700 text-xs text-gray-300">{{ item }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Experience -->
        <div v-if="resume.experience && resume.experience.length">
          <h2 class="text-xl font-bold text-gray-100 mb-4">Experience</h2>
          <div class="space-y-4">
            <article v-for="role in resume.experience" :key="role.company + role.title" class="bg-gray-800 rounded-lg border border-gray-700 p-4">
              <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                <div>
                  <h3 class="text-lg font-semibold text-gray-200">{{ role.title }}</h3>
                  <p class="text-gray-400">{{ role.company }}</p>
                </div>
                <div class="text-right sm:text-left">
                  <p class="text-sm text-gray-400">{{ role.start }} — {{ role.end }}</p>
                  <p v-if="role.location" class="text-sm text-gray-500">{{ role.location }}</p>
                </div>
              </div>
              <ul v-if="role.highlights && role.highlights.length" class="space-y-2 text-sm text-gray-300">
                <li v-for="point in role.highlights" :key="point" class="flex items-start">
                  <span class="text-gray-500 mr-2 mt-1">•</span>
                  <span>{{ point }}</span>
                </li>
              </ul>
            </article>
          </div>
        </div>

        <!-- Education -->
        <div v-if="resume.education && resume.education.length">
          <h2 class="text-xl font-bold text-gray-100 mb-4">Education</h2>
          <div class="space-y-3">
            <div v-for="edu in resume.education" :key="edu.school + edu.degree" class="bg-gray-800 rounded-lg border border-gray-700 p-3">
              <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                <div>
                  <h3 class="text-base font-semibold text-gray-200">{{ edu.school }}</h3>
                  <p class="text-gray-300">{{ edu.degree }}</p>
                </div>
                <p class="text-sm text-gray-400">{{ edu.start }} — {{ edu.end }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right column - Projects -->
      <div class="space-y-6">
        <div v-if="resume.projects && resume.projects.length">
          <h2 class="text-xl font-bold text-gray-100 mb-4">Projects</h2>
          <div class="space-y-4">
            <article v-for="proj in resume.projects" :key="proj.name" class="bg-gray-800 rounded-lg border border-gray-700 p-4">
              <div class="mb-3">
                <h3 class="text-lg font-semibold text-gray-200 mb-1">
                  <a v-if="proj.url" :href="proj.url" class="hover:text-gray-100 transition-colors" target="_blank" rel="noreferrer">{{ proj.name }}</a>
                  <span v-else>{{ proj.name }}</span>
                </h3>
                <p v-if="proj.role" class="text-sm text-gray-400">{{ proj.role }}</p>
                <p v-if="proj.tech && proj.tech.length" class="text-xs text-gray-500 mt-1">{{ proj.tech.join(', ') }}</p>
              </div>
              <ul v-if="proj.highlights && proj.highlights.length" class="space-y-2 text-sm text-gray-300">
                <li v-for="point in proj.highlights" :key="point" class="flex items-start">
                  <span class="text-gray-500 mr-2 mt-1">•</span>
                  <span>{{ point }}</span>
                </li>
              </ul>
            </article>
          </div>
        </div>

        <!-- Download PDF -->
        <div v-if="$config.resume && $config.resume.pdfUrl" class="bg-gray-800 rounded-lg border border-gray-700 p-4 text-center">
          <a :href="$config.resume.pdfUrl" target="_blank" rel="noreferrer" class="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md btn-color-style transition-colors">
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clip-rule="evenodd"></path>
            </svg>
            Download PDF
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    resume: {
      type: Object,
      required: true
    }
  }
}
</script>
