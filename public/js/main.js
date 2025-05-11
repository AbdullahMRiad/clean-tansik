const alertMessage = "الرجاء إدخال نتيجة صحيحة بين 0 و 100";
let boysData = [];
let girlsData = [];
let currentData = [];
let searchTimeout;

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.addEventListener('scroll', () => {
    document.querySelector('.scroll-top').classList.toggle('show', window.scrollY > 300);
});

function loadData() {
    Promise.all([
        fetch('b_clean_data.json').then(r => {
            if (!r.ok) throw new Error('فشل تحميل بيانات البنين');
            return r.json();
        }),
        fetch('g_clean_data.json').then(r => {
            if (!r.ok) throw new Error('فشل تحميل بيانات البنات');
            return r.json();
        })
    ]).then(([boys, girls]) => {
        if (!boys.length || !girls.length) throw new Error('البيانات غير متوفرة');
        boysData = boys;
        girlsData = girls;
        const preferredGender = localStorage.getItem('preferredGender') || 'boys';
        switchTab(preferredGender);
    }).catch(error => {
        showError(error.message);
        document.getElementById('tableBody').innerHTML = `<tr><td colspan="2">${error.message}</td></tr>`;
    });
}

function renderTable(data) {
    const tbody = document.getElementById('tableBody');
    tbody.innerHTML = data.length ? 
        data.map(college => `
            <tr>
                <td>${college.college}</td>
                <td>${college.score.toFixed(6)}</td>
            </tr>
        `).join('') : 
        `<tr><td colspan="2">لا توجد نتائج متطابقة</td></tr>`;
}

function switchTab(gender) {
    document.body.setAttribute('data-gender', gender);
    localStorage.setItem('preferredGender', gender);
    currentData = gender === 'boys' ? boysData : girlsData;
    
    document.querySelectorAll('.tab-button').forEach(btn => {
        const isActive = btn.textContent === (gender === 'boys' ? 'بنين' : 'بنات');
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-selected', isActive);
    });

    document.getElementById('pageTitle').textContent = 
        `نتائج الكليات لمعادلة شهادة المملكة العربية السعودية (${gender === 'boys' ? 'بنين - علمي' : 'بنات - علمي'}) ٢٠٢٤`;

    ['searchInput', 'gatScoreInput', 'schoolScoreInput'].forEach(id => document.getElementById(id).value = '');
    document.getElementById('calculatedValue').textContent = '-';
    renderTable(currentData);
}

function searchTable() {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        const query = document.getElementById('searchInput').value.toLowerCase();
        const filtered = currentData.filter(c => 
            c.college.toLowerCase().includes(query) || 
            c.score.toString().includes(query)
        );
        renderTable(filtered);
    }, 300);
}

function performCalculation() {
    // Get both scores
    const gatScoreInput = document.getElementById('gatScoreInput').value;
    const schoolScoreInput = document.getElementById('schoolScoreInput').value;
    
    // Parse values
    const gatScore = parseFloat(gatScoreInput);
    const schoolScore = parseFloat(schoolScoreInput);
    const calculatedValue = document.getElementById('calculatedValue');

    // Validate both inputs
    if (isNaN(gatScore) || isNaN(schoolScore) || 
        gatScore < 0 || gatScore > 100 ||
        schoolScore < 0 || schoolScore > 100) {
        showError(alertMessage);
        return;
    }

    // Updated calculation formula
    const calculatedResult = ((gatScore/2) + (schoolScore/2)) / 100 * 410;
    const filteredData = currentData.filter(college => college.score <= calculatedResult);
    
    calculatedValue.textContent = calculatedResult.toFixed(6);
    renderTable(filteredData);
}

function showError(message) {
    const errorDiv = document.getElementById('scoreError');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    setTimeout(() => errorDiv.style.display = 'none', 5000);
}

document.addEventListener('DOMContentLoaded', () => {
    loadData();
    document.getElementById('searchInput').addEventListener('input', searchTable);
});