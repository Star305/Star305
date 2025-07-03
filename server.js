const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname)); // Serve static files

const dataFile = path.join(__dirname, 'data.json');

app.get('/api/groups', (req, res) => {
  fs.readFile(dataFile, (err, data) => {
    if (err) {
      res.status(500).send({ message: 'Error reading data file' });
    } else {
      res.json(JSON.parse(data));
    }
  });
});

app.post('/api/groups', (req, res) => {
  const { groupName, groupLink } = req.body;

  fs.readFile(dataFile, (err, data) => {
    if (err) {
      res.status(500).send({ message: 'Error reading data file' });
    } else {
      const jsonData = JSON.parse(data);
      jsonData.groups.push({ name: groupName, link: groupLink, views: 0, joins: 0 });

      fs.writeFile(dataFile, JSON.stringify(jsonData, null, 2), (err) => {
        if (err) {
          res.status(500).send({ message: 'Error writing data file' });
        } else {
          res.send({ message: 'Group added successfully' });
        }
      });
    }
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
