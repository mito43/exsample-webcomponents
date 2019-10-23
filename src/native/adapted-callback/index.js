window.onload = () => {
  const iframe = document.querySelector('iframe');
  const contents = iframe.contentDocument.querySelectorAll('p');
  const container = document.querySelector('.container');
  document.querySelector('button').addEventListener('click', () => {
    contents.forEach(item => {
      container.appendChild(document.adoptNode(item));
    });
  }, false);
};
