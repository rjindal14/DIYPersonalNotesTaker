document.addEventListener('DOMContentLoaded', function() {
  const notepad = document.getElementById('notepad');
  const saveBtn = document.getElementById('saveBtn');
  const clearBtn = document.getElementById('clearBtn');

  // Load saved note
  chrome.storage.sync.get('note', function(data) {
    if (data.note) {
      notepad.value = data.note;
    }
  });

  // Save note
  saveBtn.addEventListener('click', function() {
    chrome.storage.sync.set({note: notepad.value}, function() {
      console.log('Note saved');
      saveBtn.textContent = 'Saved!';
      setTimeout(() => { saveBtn.textContent = 'Save Note'; }, 1000);
    });
  });

  // Clear note
  clearBtn.addEventListener('click', function() {
    notepad.value = '';
    chrome.storage.sync.remove('note', function() {
      console.log('Note cleared');
    });
  });
});