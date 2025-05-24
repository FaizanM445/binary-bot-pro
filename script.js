$(document).ready(function () {
  const pairs = ['EUR/USD', 'GBP/USD', 'USD/JPY', 'BTC/USD', 'ETH/USD'];
  for (let pair of pairs) {
    $('#pair__box').append(`<option value="${pair}">${pair}</option>`);
  }

  $('#platform__box, #pair__box, #time__box').selectator({
    showAllOptionsOnFocus: true,
    searchFields: 'value text',
    labels: { search: 'Search here...' }
  });

  // Restore previous selections
  ['platform__box', 'pair__box', 'time__box'].forEach(id => {
    const val = localStorage.getItem(id);
    if (val) $(`#${id}`).val(val).change();
  });

  // Save selection changes
  $('#platform__box, #pair__box, #time__box').on('change', function () {
    localStorage.setItem(this.id, $(this).val());
  });

  $('#signal').on('click', function () {
    $('#loader').show();
    $('#result').hide().text('');
    setTimeout(() => {
      $('#loader').hide();
      const signals = ['BUY 🔼', 'SELL 🔽', 'WAIT ⏳'];
      const signal = signals[Math.floor(Math.random() * signals.length)];
      const pair = $('#pair__box').val();
      const now = new Date().toLocaleTimeString();
      $('#result').text(`Signal: ${signal}`).show();
      $('#history__table tbody').prepend(
        `<tr><td>${now}</td><td>${pair}</td><td>${signal}</td></tr>`
      );
    }, 2000);
  });
});
