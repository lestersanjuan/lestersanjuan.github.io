<template>
  <footer class="bg-gray-800">
    <div class="max-w-7xl border-l border-r border-dashed border-gray-700 mx-auto px-4">
      <div class="py-8">
        <div class="flex justify-center space-x-8">
          <a v-if="$config.social.github" target="_blank" rel="noreferrer" :href="`https://github.com/${$config.social.github}`" class="text-gray-400 hover:text-gray-300 transition-colors">
            <span class="sr-only">GitHub</span>
            <svg class="h-6 w-6" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
            </svg>
          </a>
          <a v-if="$config.social.linkedin" target="_blank" rel="noreferrer" :href="`https://linkedin.com/in/${$config.social.linkedin}`" class="text-gray-400 hover:text-gray-300 transition-colors">
            <span class="sr-only">LinkedIn</span>
            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" viewBox="0 0 16 16"><g transform="matrix(0.6666666666666666,0,0,0.6666666666666666,0,0)"><path d="M2.5,8.5h4C6.776,8.5,7,8.724,7,9v13c0,0.276-0.224,0.5-0.5,0.5h-4C2.224,22.5,2,22.276,2,22V9C2,8.724,2.224,8.5,2.5,8.5z M4.48,1.5c1.37,0,2.48,1.119,2.48,2.5S5.85,6.5,4.48,6.5S2,5.381,2,4S3.11,1.5,4.48,1.5z M18.5,22.5h3c0.276,0,0.5-0.224,0.5-0.5 v-8.4C22,9.83,19.87,8,16.89,8c-1.189-0.043-2.34,0.418-3.17,1.27c-0.148,0.171-0.407,0.19-0.578,0.042C13.051,9.233,13,9.12,13,9 c0-0.276-0.224-0.5-0.5-0.5h-3C9.224,8.5,9,8.724,9,9v13c0,0.276,0.224,0.5,0.5,0.5h3c0.276,0,0.5-0.224,0.5-0.5v-7.5 c0-1.381,1.119-2.5,2.5-2.5s2.5,1.119,2.5,2.5V22C18,22.276,18.224,22.5,18.5,22.5z" stroke="none" fill="currentColor" stroke-width="0" stroke-linecap="round" stroke-linejoin="round"></path></g></svg>
          </a>
        </div>
      </div>
    </div>
  </footer>

</template>

<script>
export default {
}
</script>

