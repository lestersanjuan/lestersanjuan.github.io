import Vue from 'vue'
import VueGtag from 'vue-gtag'

// Disable Google Analytics by default; enable only when an ID is provided via runtime config
export default ({ $config }) => {
  const gaId = $config.googleAnalyticsV4?.id
  if (!gaId) return
  Vue.use(VueGtag, { config: { id: gaId } })
}
