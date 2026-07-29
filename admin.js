import { createClient } from '@supabase/supabase-js';

// Validate configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  const errMsg = 'Critical configuration variables are missing. Please verify environment setup.';
  console.error(errMsg);
  document.addEventListener('DOMContentLoaded', () => {
    const errorEl = document.getElementById('login-error');
    if (errorEl) {
      errorEl.textContent = errMsg;
      errorEl.style.display = 'block';
    }
  });
}

const supabase = createClient(supabaseUrl || 'https://placeholder.supabase.co', supabaseAnonKey || 'placeholder');

// DOM Elements
const loginGate = document.getElementById('login-gate');
const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');
const adminIdInput = document.getElementById('admin-id');
const adminPasswordInput = document.getElementById('admin-password');

const dashboardView = document.getElementById('dashboard-view');
const logoutBtn = document.getElementById('logout-btn');
const refreshBtn = document.getElementById('refresh-btn');

// Stats Elements
const statTotal = document.getElementById('stat-total');
const statToday = document.getElementById('stat-today');
const statTodayDate = document.getElementById('stat-today-date');
const statTopCategory = document.getElementById('stat-top-category');
const statTopCount = document.getElementById('stat-top-count');

// Table & Search/Filter Elements
const registrationsBody = document.getElementById('registrations-body');
const searchInput = document.getElementById('search-input');
const categoryFilter = document.getElementById('category-filter');

// Modal Elements
const detailsModal = document.getElementById('details-modal');
const closeModalBtn = document.getElementById('close-modal-btn');
const modalId = document.getElementById('modal-id');
const modalDate = document.getElementById('modal-date');
const modalName = document.getElementById('modal-name');
const modalCategory = document.getElementById('modal-category');
const modalEmail = document.getElementById('modal-email');
const modalPhone = document.getElementById('modal-phone');
const modalMessage = document.getElementById('modal-message');

// Confirm Modal Elements
const confirmModal = document.getElementById('confirm-modal');
const closeConfirmBtn = document.getElementById('close-confirm-btn');
const confirmCancelBtn = document.getElementById('confirm-cancel-btn');
const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
const confirmIdDisplay = document.getElementById('confirm-id-display');

// State Cache
let registrationsCache = [];
let idToDelete = null;

// ==========================================================================
// Authentication Gate
// ==========================================================================

async function checkSession() {
  const { data: { session } } = await supabase.auth.getSession();
  if (session && session.user.email === 'admin@opulentacres.com') {
    loginGate.style.display = 'none';
    dashboardView.style.display = 'block';
    fetchRegistrations();
  } else {
    loginGate.style.display = 'flex';
    dashboardView.style.display = 'none';
  }
}

let loginAttempts = 0;
let lockoutTime = 0;

if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Check lockout status
    const now = Date.now();
    if (now < lockoutTime) {
      const waitSecs = Math.ceil((lockoutTime - now) / 1000);
      loginError.textContent = `Too many failed attempts. Please wait ${waitSecs} seconds.`;
      loginError.style.display = 'block';
      return;
    }

    const adminId = adminIdInput.value.trim();
    const password = adminPasswordInput.value.trim();

    // Map username harsh2004 to admin email
    const email = adminId === 'harsh2004' ? 'admin@opulentacres.com' : adminId;

    // Show loading state on Authenticate button
    const submitBtn = loginForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Authenticating...';

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      });

      if (error) throw error;

      loginError.style.display = 'none';
      loginAttempts = 0;
      loginForm.reset();
      await checkSession();

    } catch (error) {
      loginAttempts++;
      if (loginAttempts >= 5) {
        lockoutTime = Date.now() + 60000; // Lock out for 60 seconds
        loginAttempts = 0;
        loginError.textContent = 'Too many failed attempts. Login locked for 60 seconds.';
      } else {
        loginError.textContent = `Authentication failed: ${error.message || 'Invalid credentials.'} (${loginAttempts}/5)`;
      }
      loginError.style.display = 'block';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener('click', async () => {
    await supabase.auth.signOut();
    checkSession();
  });
}

// ==========================================================================
// Data Fetching & Computations
// ==========================================================================

async function fetchRegistrations() {
  setTableState('Loading registrations from Supabase...');
  
  try {
    const { data, error } = await supabase
      .from('registrations')
      .select('*')
      .order('id', { ascending: false });

    if (error) throw error;

    registrationsCache = data || [];
    calculateStats();
    renderTable();

  } catch (error) {
    console.error('Fetch error:', error.message || '[REDACTED]');
    setTableState(`Error: ${error.message || 'Unable to fetch data.'}`);
  }
}

function calculateStats() {
  if (!registrationsCache.length) {
    statTotal.textContent = '0';
    statToday.textContent = '0';
    statTopCategory.textContent = 'None';
    statTopCount.textContent = '0 submissions';
    return;
  }

  // Total
  statTotal.textContent = registrationsCache.length;

  // Today's leads (based on local timezone)
  const todayStr = new Date().toDateString();
  const todayLeads = registrationsCache.filter(row => {
    return new Date(row.created_at).toDateString() === todayStr;
  });
  statToday.textContent = todayLeads.length;
  
  const options = { month: 'short', day: 'numeric' };
  statTodayDate.textContent = `Registered on ${new Date().toLocaleDateString('en-US', options)}`;

  // Top Category
  const categoryCounts = {};
  registrationsCache.forEach(row => {
    const cat = row.category || 'Uncategorized';
    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
  });

  let topCat = 'None';
  let maxCount = 0;
  Object.keys(categoryCounts).forEach(cat => {
    if (categoryCounts[cat] > maxCount) {
      maxCount = categoryCounts[cat];
      topCat = cat;
    }
  });

  statTopCategory.textContent = topCat;
  statTopCount.textContent = `${maxCount} inquiry${maxCount === 1 ? '' : 'ies'}`;
}

// ==========================================================================
// Render Table & Filters
// ==========================================================================

function renderTable() {
  const searchTerm = searchInput.value.toLowerCase().trim();
  const selectedCat = categoryFilter.value;

  const filtered = registrationsCache.filter(row => {
    const matchesSearch = 
      row.name.toLowerCase().includes(searchTerm) ||
      row.email.toLowerCase().includes(searchTerm) ||
      row.phone.toLowerCase().includes(searchTerm);
      
    const matchesCategory = !selectedCat || row.category === selectedCat;

    return matchesSearch && matchesCategory;
  });

  if (!filtered.length) {
    setTableState('No matching registrations found.');
    return;
  }

  registrationsBody.innerHTML = '';
  
  filtered.forEach(row => {
    const tr = document.createElement('tr');
    
    // Formatting date nicely
    const dateObj = new Date(row.created_at);
    const dateStr = dateObj.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    const timeStr = dateObj.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });

    tr.innerHTML = `
      <td data-label="ID">#${row.id}</td>
      <td data-label="Date & Time">${dateStr} &middot; ${timeStr}</td>
      <td data-label="Client Name" class="col-name">${escapeHtml(row.name)}</td>
      <td data-label="Email" class="col-email">${escapeHtml(row.email)}</td>
      <td data-label="Phone">${escapeHtml(row.phone)}</td>
      <td data-label="Category"><span class="col-tag">${escapeHtml(row.category)}</span></td>
      <td data-label="Actions" style="text-align: right;">
        <div class="actions-group">
          <button type="button" class="btn-action btn-view" data-id="${row.id}">View</button>
          <button type="button" class="btn-action btn-delete" data-id="${row.id}">Delete</button>
        </div>
      </td>
    `;
    
    registrationsBody.appendChild(tr);
  });

  // Attach button event listeners
  document.querySelectorAll('#registrations-body .btn-view').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.getAttribute('data-id'));
      openDetailsModal(id);
    });
  });

  document.querySelectorAll('#registrations-body .btn-delete').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.getAttribute('data-id'));
      openConfirmModal(id);
    });
  });
}

function setTableState(message) {
  registrationsBody.innerHTML = `
    <tr>
      <td colspan="7" class="state-row">${message}</td>
    </tr>
  `;
}

// ==========================================================================
// Details Modal Overlay
// ==========================================================================

function openDetailsModal(id) {
  const row = registrationsCache.find(r => r.id === id);
  if (!row) return;

  const dateObj = new Date(row.created_at);
  const formattedDate = dateObj.toLocaleString();

  modalId.textContent = `#${row.id}`;
  modalDate.textContent = formattedDate;
  modalName.textContent = row.name;
  modalCategory.textContent = row.category;
  modalEmail.textContent = row.email;
  modalPhone.textContent = row.phone;
  modalMessage.textContent = row.message ? row.message : '(No message details provided)';

  detailsModal.style.display = 'flex';
}

if (closeModalBtn) {
  closeModalBtn.addEventListener('click', () => {
    detailsModal.style.display = 'none';
  });
}

// Close modal when clicking outside card
window.addEventListener('click', (e) => {
  if (e.target === detailsModal) {
    detailsModal.style.display = 'none';
  }
  if (e.target === confirmModal) {
    closeConfirmModal();
  }
});

// ==========================================================================
// Deletion Controller
// ==========================================================================

function openConfirmModal(id) {
  idToDelete = id;
  confirmIdDisplay.textContent = `#${id}`;
  confirmModal.style.display = 'flex';
}

function closeConfirmModal() {
  confirmModal.style.display = 'none';
  idToDelete = null;
}

if (closeConfirmBtn) {
  closeConfirmBtn.addEventListener('click', closeConfirmModal);
}

if (confirmCancelBtn) {
  confirmCancelBtn.addEventListener('click', closeConfirmModal);
}

if (confirmDeleteBtn) {
  confirmDeleteBtn.addEventListener('click', async () => {
    if (!idToDelete) return;
    const id = idToDelete;
    
    // Disable buttons and show loading state
    confirmDeleteBtn.disabled = true;
    confirmDeleteBtn.textContent = 'Deleting...';
    confirmCancelBtn.disabled = true;

    try {
      const { error } = await supabase
        .from('registrations')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      // Remove locally and update UI
      registrationsCache = registrationsCache.filter(row => row.id !== id);
      calculateStats();
      renderTable();
      
      closeConfirmModal();
      alert(`Registration #${id} was successfully deleted.`);

    } catch (error) {
      alert(`Failed to delete registration: ${error.message || '[REDACTED]'}`);
    } finally {
      confirmDeleteBtn.disabled = false;
      confirmDeleteBtn.textContent = 'Delete';
      confirmCancelBtn.disabled = false;
    }
  });
}

// ==========================================================================
// Listeners & Helpers
// ==========================================================================

if (searchInput) {
  searchInput.addEventListener('input', renderTable);
}

if (categoryFilter) {
  categoryFilter.addEventListener('change', renderTable);
}

if (refreshBtn) {
  refreshBtn.addEventListener('click', fetchRegistrations);
}

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Details modal delete button click listener
const modalDeleteBtn = document.getElementById('modal-delete-btn');
if (modalDeleteBtn) {
  modalDeleteBtn.addEventListener('click', () => {
    const idText = modalId.textContent;
    const id = parseInt(idText.replace('#', ''));
    if (!isNaN(id)) {
      detailsModal.style.display = 'none'; // Close details modal
      openConfirmModal(id); // Open confirm modal
    }
  });
}

// Initialize boot check
checkSession();
