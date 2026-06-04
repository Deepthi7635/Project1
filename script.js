// 🎯 MindEase - Stress Tracker Frontend Script

const saveBtn = document.getElementById('saveBtn');
const stressInput = document.getElementById('stressInput');
const message = document.getElementById('message');
const historyList = document.getElementById('historyList');

// 🧩 Load history from backend
async function loadHistory() {
  try {
    const res = await fetch('http://localhost:3000/users');
    const data = await res.json();
    historyList.innerHTML = '';

    if (data.length === 0) {
      historyList.innerHTML = '<li>No records yet.</li>';
      return;
    }

    data.forEach(user => {
      const li = document.createElement('li');
      li.textContent = `${user.name}: Stress Level ${user.stressLevel}`;
      historyList.appendChild(li);
    });
  } catch (err) {
    console.error('Error loading history:', err);
    historyList.innerHTML = '<li>⚠️ Unable to load history.</li>';
  }
}

// 🧠 Generate motivational tip based on stress level
function getTip(level) {
  if (level <= 3) return "You're calm today — keep enjoying the peace!";
  if (level <= 6) return "Take a short walk or listen to music to refresh.";
  if (level <= 8) return "Try deep breathing — inhale slowly, exhale gently.";
  return "Pause for a moment. You’re doing your best — consider journaling or talking to someone you trust.";
}

// 💾 Save stress level and show tip
saveBtn.addEventListener('click', async () => {
  const stressLevel = parseInt(stressInput.value);
  if (!stressLevel || stressLevel < 1 || stressLevel > 10) {
    message.textContent = 'Please enter a valid stress level (1–10).';
    return;
  }

  try {
    const res = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Deepthi', stressLevel })
    });

    const data = await res.json();
    const tip = getTip(stressLevel);
    message.textContent = `${data.message || 'Saved successfully!'} 💡 Tip: ${tip}`;
    loadHistory();
  } catch (err) {
    console.error('Error saving data:', err);
    message.textContent = '⚠️ Error connecting to backend.';
  }
});

// 🚀 Load history on page start
loadHistory();
