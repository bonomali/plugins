import './style/style.sass';
import './style/button.sass';
import rFetch from 'fetch-reject';

const callUrl = (url, headers, body) => {
  document.getElementById('DatoCMS-button--primary').className += 'loading';
  rFetch(
    url, { method: 'POST', headers, body },
  )
    .then(() => {
      document.getElementById('DatoCMS-button--primary').classList.remove('loading');
    })
    .catch((e) => {
      document.getElementById('DatoCMS-button--primary').classList.remove('loading');
      document.getElementsByClassName('error')[0].textContent = 'There was an error';
    });
};

window.DatoCmsPlugin.init((plugin) => {
  plugin.startAutoResizer();
  const {
    url, headers, label, hint,
  } = plugin.parameters.instance;

  const container = document.createElement('div');
  container.id = ('container');
  document.body.appendChild(container);

  const title = document.createElement('h6');
  title.textContent = 'Custom button';
  title.id = ('title');
  container.appendChild(title);

  if (hint) {
    const p = document.createElement('p');
    p.id = ('hint');
    p.textContent = hint;
    container.appendChild(p);
  }

  const completeHeaders = new Headers(
    Object.assign(
      {},
      JSON.parse(headers),
      {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
      },
    ),
  );
  completeHeaders.append('POST', 'OPTIONS');
  const button = document.createElement('button');
  const spinner = document.createElement('span');
  button.id = ('DatoCMS-button--primary');
  button.textContent = label;
  button.appendChild(spinner);
  spinner.id = ('spinner');
  container.appendChild(button);

  button.addEventListener('click', (event) => {
    if (!event.target.matches('#DatoCMS-button--primary')) return;
    event.preventDefault();
    callUrl(
      url, completeHeaders, JSON.stringify(
        {
          id: plugin.itemId,
        },
      ),
    );
  }, false);

  const error = document.createElement('p');
  error.classList.add('error');
  document.getElementById('container').appendChild(error);
});
