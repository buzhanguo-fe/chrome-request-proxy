setTimeout(() => {
  const script = document.createElement("script");
  script.setAttribute("type", "text/javascript");
  script.setAttribute("src", chrome.extension.getURL("ajax-hooks.js"));
  document.head.appendChild(script);

  script.onload = function () {
    const unHooks = document.createElement("script");
    unHooks.setAttribute("type", "text/javascript");
    unHooks.innerHTML = `

          function __insertError() {
              console.error('异常错误')
          }

          window.ajaxHooks.proxy({
            onRequest: (config, handler) => {
                handler.next(config);
            },
            onError: (err, handler) => {
                __insertError(err)
                handler.next(err)
            },
            onResponse: (response, handler) => {
                try {
                  const { code, msg } = JSON.parse(response.response)
                  if (  code !== 1 ) __insertError(response, msg)
                }catch(err) {

                }
                handler.next(response)
            }
        })
    `;
    document.body.appendChild(unHooks);
  };
});
