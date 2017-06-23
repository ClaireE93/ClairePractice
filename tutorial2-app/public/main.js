var update = document.getElementById('update');
var del = document.getElementById('delete');


//Use promises to check and output PUT request
update.addEventListener('click', function () {
  console.log('Update button clicked');
  fetch('quotes', {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'name': 'Vader',
      'quote': 'I find your lack of faith disturbing'
    })
  }).then(response => {
    if (response.ok) return response.json();
  }).then(data => {
    console.log(data);
    window.location.reload();
  });
});

del.addEventListener('click', function() {
  console.log('delete button clicked');
  fetch('quotes', {
    method: 'delete',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'name': 'Vader'
    })
  }).then(response => {
    window.location.reload();
    // if (response.ok) return response.json();
  });
});
