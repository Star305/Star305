const groupList = document.getElementById('group-list');
const uploadForm = document.getElementById('upload-form');

let groups = [];

fetch('/api/groups')
    .then(response => response.json())
    .then(data => {
        groups = data.groups;
        renderGroupList();
    });

uploadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const groupLink = document.getElementById('group-link').value;

    fetch('/api/groups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ groupLink }),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            fetch('/api/groups')
                .then(response => response.json())
                .then(data => {
                    groups = data.groups;
                    renderGroupList();
                    document.getElementById('group-link').value = '';
                });
        })
        .catch(error => console.error('Error:', error));
});

function renderGroupList() {
    groupList.innerHTML = '';
    groups.forEach((group) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <a href="${group.link}">${group.link}</a>
            <span>Views: ${group.views}</span>
            <span>Joins: ${group.joins}</span>
        `;
        groupList.appendChild
