const dummyKoalas = [{
  'Name': 'Kobi',
  'Age': 1000,
  'Gender': undefined,
  'Ready for Transfer': true,
  'Notes': 'Actually a Quokka',
}];

$(document).ready(function () {
  // Establish Click Listeners
  setupClickListeners()
  // load existing koalas on page load
  getKoalas()
    .then(koalas => {
      renderKoalas(koalas);
    });
});

function setupClickListeners () {
  $('#addKoalaForm').on('submit', handleAddKoalaSubmit);
  $('#viewKoalas').on('click', '.mark-ready-button', handleKoalaTransferClick);
  $('#viewKoalas').on('click', '.delete-button', handleDeleteKoalaClick);
}

function handleAddKoalaSubmit (event) {
  // Prevent page reload
  event.preventDefault();

  const jqName = $('#nameIn');
  const jqAge = $('#ageIn');
  const jqGender = $('#genderIn');
  const jqReadyForTransfer = $('#readyForTransferIn');
  const jqNotes = $('#notesIn');

  const koala = {
    'Name': jqName.val(),
    'Age': jqAge.val(),
    'Gender': jqGender.val(),
    'Ready for Transfer': jqReadyForTransfer.is(':checked'),
    'Notes': jqNotes.val()
  };

  saveKoala(koala)
    .then(() => {
      getKoalas()
        .then(koalas => {
          renderKoalas(koalas);
        });
    });
}

function handleKoalaTransferClick (event) {
  const jqTarget = $(event.target);
  const id = jqTarget.parents('tr').data('id');

  // TODO: implement on server side
  console.error('Not implemented');
  return;

  updateKoalaTransfer(id)
    .then(() => {
      return getKoalas();
    })
    .then(koalas => {
      jqTarget.remove();
      renderKoalas(koalas);
    });
}

function handleDeleteKoalaClick (event) {
  const jqTarget = $(event.target);
  const id = jqTarget.parents('tr').data('id');
  deleteKoala(id)
    .then(() => {
      return getKoalas();
    })
    .then(koalas => {
      jqTarget.parents('tr').remove();
      renderKoalas(koalas);
    });
}

function renderKoalas (koalas) {
  const jqKoalas = $('#viewKoalas');
  jqKoalas.empty();
  koalas.reduce((jqElem, koala) => {
    jqElem.append(`
      <tr class="koala-row" data-id="${koala.id}">
        <td>${koala['Name']}</td>
        <td>${koala['Age']}</td>
        <td>${koala['Gender']}</td>
        <td>${koala['Ready for Transfer'] ? 'Yes' : 'No'}</td>
        <td>${koala['Notes']}</td>
        <td>
          ${koala['Ready for Transfer'] ? '' : `
            <button class="mark-ready-button">Mark ready</button>
          `}
        </td>
        <td>
          <button class="delete-button">Delete</button>
        </td>
      </tr>
    `);
    return jqElem;
  }, jqKoalas);
}

function getKoalas () {
  return $.ajax({
    method: 'GET',
    url: '/koalas'
  });
}

function dummyGetKoalas () {
  return Promise.resolve(dummyKoalas.map((koala, index) => {
    return {
      id: index,
      'Name': koala['Name'],
      'Age': koala['Age'],
      'Gender': koala['Gender'],
      'Ready for Transfer': koala['Ready for Transfer'],
      'Notes': koala['Notes']
    }
  }));
}

function saveKoala (koala) {
  return $.ajax({
    method: 'POST',
    url: '/koalas',
    data: koala
  });
}

function dummySaveKoala (koala) {
  dummyKoalas.push(koala);
  return Promise.resolve();
}

function updateKoalaTransfer (id) {
  return $.ajax({
    method: 'PUT',
    url: `/koalas/transfer/${id}`
  });
}

function dummyUpdateKoalaTransfer (id) {
  console.log(`Koala #${id} is ready for transfer`);
  dummyKoalas[id]['Ready for Transfer'] = true;
  return Promise.resolve();
}

function deleteKoala (id) {
  return $.ajax({
    method: 'DELETE',
    url: `/koalas/${id}`
  });
}

function dummyDeleteKoala (id) {
  dummyKoalas.splice(id, 1);
  return Promise.resolve();
}
