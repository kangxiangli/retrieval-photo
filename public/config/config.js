(function(window) {
  let _localServe = window.location.origin.replace(/:\d+/, '');
  const _config = {
    apiPath: {
      v1: window.location.origin + "/v1",
      socketUrl: _localServe + ":10010/sockjs/rxkk"
    },
  };
  window.globalConfig = window.globalConfig || _config;
}(window));