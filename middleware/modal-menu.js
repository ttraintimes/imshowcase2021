// Closes all modals whenever the page is changed or reloaded
export default function(context) {
  context.store.commit("CLOSE_ALL_MODALS")
}
