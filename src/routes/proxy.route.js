const { Router } = require("express");
const { checkInactiveProxiesHealth, proxy_add, proxy_check, proxy_status, clearInactiveProxies } = require("../interactors/app.interactor.js");

const proxyRouter = Router();


proxyRouter.get('/', proxy_status);
proxyRouter.post('/add', proxy_add);
proxyRouter.post('/check', proxy_check);
proxyRouter.post('/status', proxy_status);
proxyRouter.post('/inactive/check', checkInactiveProxiesHealth);
proxyRouter.post('/inactive/clear', clearInactiveProxies);


module.exports = proxyRouter;