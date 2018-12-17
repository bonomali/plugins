import './style.sass';

const callUrl = (url, method, headers, body) => fetch(
  url, { method, headers, body },
)
  .then(c => console.log(c))
  .catch(e => console.log(e));

window.DatoCmsPlugin.init((plugin) => {
  plugin.startAutoResizer();
  const {
    method, url, headers, label, hint,
  } = plugin.parameters.instance;

  const container = document.createElement('div');
  const link = document.createElement('a');
  const p = document.createElement('p');

  container.classList.add('container');
  link.classList.add('request-button');

  link.textContent = 'Clicca qui';
  container.textContent = label;
  p.textContent = hint;

  const completeHeaders = Object.assign(
    {},
    headers,
    {
      'Access-Control-Allow-Origin': '*',
      'content-type': 'application/json',
    },
  );

  link.addEventListener('click', () => callUrl(
    url, method, completeHeaders, JSON.stringify({ id: plugin.itemId }),
  ), false);
  container.appendChild(link);
  document.body.appendChild(container);
});
