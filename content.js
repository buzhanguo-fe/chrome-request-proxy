setTimeout(() => {
  const script = document.createElement("script");
  script.setAttribute("type", "text/javascript");
  script.setAttribute("src", chrome.extension.getURL("ajax-hooks.js"));
  document.head.appendChild(script);

  script.onload = function () {
    const unHooks = document.createElement("script");
    unHooks.setAttribute("type", "text/javascript");
    unHooks.innerHTML = `
          window.ajaxHooks.proxy({
            onRequest: (config, handler) => {
                console.log(config, '1111111111')
                handler.next(config);
            },
            onError: (err, handler) => {
                console.log(err.type, '1111111111')
                handler.next(err)
            },
            onResponse: (response, handler) => {
                console.log(response, '1111111111')
                handler.next(response)
            }
        })
    `;
    document.body.appendChild(unHooks);
  };
});
