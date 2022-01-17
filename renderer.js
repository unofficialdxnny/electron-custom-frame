// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All APIs exposed by the context bridge are available here.

// Binds the buttons to the context bridge API.
document.getElementById('minimize').addEventListener('click', () => {
    windowControls.minimize()
  })
  
  document.getElementById('maximize').addEventListener('click', () => {
    windowControls.maximize()
  })
  
  document.getElementById('close').addEventListener('click', () => {
    windowControls.close()
  })