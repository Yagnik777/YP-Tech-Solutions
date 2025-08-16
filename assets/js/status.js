
// Real-time project status widget (fake API)
async function loadStatus(){
  try {
    const r = await fetch('api/status.php');
    const data = await r.json();
    const el = document.getElementById('statusText');
    if (el) el.textContent = `Currently ${data.in_progress} projects in development`;
  } catch(e) {
    // ignore
  }
}
loadStatus();
setInterval(loadStatus, 10000);
