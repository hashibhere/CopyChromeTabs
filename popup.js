document.addEventListener('DOMContentLoaded', function () {
  const tabsList = document.getElementById('tabs-list');
  const copyButton = document.getElementById('copy-button');

  // Fetch all open tabs and display them
  chrome.tabs.query({}, function (tabs) {
    tabs.forEach(tab => {
      const tabItem = document.createElement('div');
      tabItem.className = 'tab-item';

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = `tab-${tab.id}`;
      checkbox.value = tab.url;

      const label = document.createElement('label');
      label.htmlFor = `tab-${tab.id}`;
      label.textContent = tab.title || tab.url;

      tabItem.appendChild(checkbox);
      tabItem.appendChild(label);
      tabsList.appendChild(tabItem);
    });
  });

  // Copy selected URLs to clipboard
  copyButton.addEventListener('click', function () {
    const selectedUrls = [];
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');

    checkboxes.forEach(checkbox => {
      selectedUrls.push(checkbox.value);
    });

    if (selectedUrls.length > 0) {
      const urlsText = selectedUrls.join('\n');
      navigator.clipboard.writeText(urlsText).then(() => {
        alert('Selected URLs copied to clipboard!');
      }).catch(err => {
        console.error('Failed to copy URLs: ', err);
      });
    } else {
      alert('No tabs selected!');
    }
  });
});
