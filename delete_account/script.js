const GOOGLE_SHEETS_URL = "https://script.google.com/macros/s/AKfycbzqf-xh7q2wr2bPKMN_NC5n2LR4U5ePmaG66PKatetpxMt5u1lSKu7k1B5Arf5BlrTMNg/exec";

document.addEventListener('DOMContentLoaded', () => {
  const deleteButton = document.getElementById('delete-button');
  
  deleteButton.addEventListener('click', showDeleteForm);
});

function showDeleteForm() {
  const overlay = document.getElementById('modal-overlay');
  const form = document.getElementById('deleteForm');
  const cancelBtn = document.getElementById('cancel-btn');
  const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
  const deleteBtnText = document.getElementById('delete-btn-text');
  
  // Show the modal
  overlay.style.display = 'flex';
  
  cancelBtn.addEventListener('click', () => {
    overlay.style.display = 'none';
    form.reset();
  });
  
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.style.display = 'none';
      form.reset();
    }
  });
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    confirmDeleteBtn.disabled = true;
    confirmDeleteBtn.classList.add('loading');
    deleteBtnText.textContent = 'Processing...';
    
    const data = {
      name: 'DELETE_ME',
      email: form.email.value
    };
      
    try {
      const response = await fetch(GOOGLE_SHEETS_URL, {
        method: 'POST',
        body: JSON.stringify(data)
      });
      
      const result = await response.json();
      if (result.status === 'success') {
        overlay.style.display = 'none';
        form.reset();
        showReconsiderMessage();
      } else {
        alert('Error submitting deletion request: ' + result.message);
      }
    } catch (err) {
      alert('Connection error: ' + err.message);
    } finally {
      confirmDeleteBtn.disabled = false;
      confirmDeleteBtn.classList.remove('loading');
      deleteBtnText.textContent = 'Confirm Deletion';
    }
  });
}

function showReconsiderMessage() {
  const initialContent = document.getElementById('initial-content');
  const successContent = document.getElementById('success-content');
  
  initialContent.style.display = 'none';
  successContent.style.display = 'block';
}
