const groupList = document.getElementById('group-list');
const uploadForm = document.getElementById('upload-form');

fetch('/api/groups')
  .then(response => response.json())
  .then(data => {
    renderGroupList(data.groups);
  });

uploadForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const groupName = document.getElementById('group-name').value;
  const groupLink = document.getElementById('group-link').value;

  fetch('/api/groups', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ groupName, groupLink }),
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      // Update the group list
      fetch('/api/groups')
        .then(response => response.json())
        .then(data => {
          renderGroupList(data.groups);
          // Clear form fields
          document.getElementById('group-name').value = '';
          document.getElementById('group-link').value = '';
        });
    })
    .catch(error => console.error('Error:', error));
});

function renderGroupList(groups) {
  groupList.innerHTML = '';
  groups.forEach((group) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <a href="${group.link}">${group.name}</a>
      <span>Views: ${group.views}</span>
      <span>Joins: ${group.joins}</span>
    `;
    groupList.appendChild(li);
  });
}
