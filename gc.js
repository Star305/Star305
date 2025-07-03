const groupList = document.getElementById('group-list');
const uploadForm = document.getElementById('upload-form');

let groups = [];

fetch('data.json')
    .then(response => response.json())
    .then(data => {
        groups = data.groups;
        renderGroupList();
    });

uploadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const groupName = document.getElementById('group-name').value;
    const groupLink = document.getElementById('group-link').value;
    groups.push({ name: groupName, link: groupLink, views: 0, joins: 0 });
    renderGroupList();
    // TODO: Save data to data.json
});

function renderGroupList() {
    groupList.innerHTML = '';
    groups.forEach((group, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <a href="${group.link}">${group.name}</a>
            <span>Views: ${group.views}</span>
            <span>Joins: ${group.joins}</span>
        `;
        groupList.appendChild(li);
    });
}
