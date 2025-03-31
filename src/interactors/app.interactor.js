const Proxy = require("../utils/proxy.utils");
const { buildUrl, cleanUrls, isObject, toList } = require("../utils/utils");
let store = require("as-scraper");
const qs = require("querystring");

const proxyV4Storage = new Proxy();
const proxyV6Storage = new Proxy();
store = store.memoized({ maxAge: 2 * 60 * 60});

// index
const index = async (req, res, next) =>
  res.json({
    apps: buildUrl(req, "apps"),
    developers: buildUrl(req, "developers"),
    categories: buildUrl(req, "categories"),
  });

// constants
const getConstants = async (req, res, next) => {
  try{
    res.json.bind(res)(toList({
      categories : store.category,
      collections : store.collection,
      sort : store.sort,
      device : store.device
    }));
  }catch(e){
    next(e);
  }
};

// app search
const searchApps = async (req, res, next) => {
  if (!req.query.q || !isObject(req.query)) {
    return next();
  }
  const num = parseInt(req.query.num || "50");
  const start = parseInt(req.query.start || "1");

  function paginate(apps) {
    if (start > 1) {
      req.query.start = (start - 1).toString();
      apps.prev = buildUrl(req, "apps/") + "?" + qs.stringify(req.query);
    }
    if (apps.data.length >= num) {
      req.query.start = (start + 1).toString();
      apps.next = buildUrl(req, "apps/") + "?" + qs.stringify(req.query);
    }
    return apps;
  }
  const proxy = proxyV6Storage.getNextProxy();
  if(proxy){
    store
    .search({
      term: req.query.q,
      lang: req.query.lang,
      country: req.query.country,
      page: start,
      num,
      proxy
    })
    .then((apps) => apps.slice(start, start + num).map(cleanUrls(req)))
    .then(toList)
    .then(paginate)
    .then(res.json.bind(res))
    .catch(next);
  }else{
    res.json({
      message : "no active proxies 1"
    })
  }
};

// search suggestions
const searchSuggestions = async (req, res, next) => {
  if (!req.query.suggest) {
    return next();
  }
  const toJSON = (term) => ({
    term,
    url: buildUrl(req, "apps/") + "?" + qs.stringify({ q: term }),
  });

  const proxy = proxyV6Storage.getNextProxy();
  if(proxy){
    store
    .suggest({
      term: req.query.suggest,
      proxy
    })
    .then(res.json.bind(res))
    .catch(next);
  }else{
    res.json({
      message : "no active proxies 2"
    })
  }
  
};

// list of apps
const getApps = async (req, res, next) => {
  if (isObject(req.query)) {
    const num = parseInt(req.query.num || "25");
    const start = parseInt(req.query.start || "0");

    function paginate(apps) {
      if (start - num >= 0) {
        req.query.start = (start - num).toString();
        apps.prev = buildUrl(req, "apps/") + "?" + qs.stringify(req.query);
      }
      if (start + num <= apps.data.length) {
        req.query.start = (start + num).toString();
        apps.next = buildUrl(req, "apps/") + "?" + qs.stringify(req.query);
      }
      return apps;
    }
    const opt = req.query;
    if(opt.category){
      opt.category = parseInt(opt.category);
    }

    const proxy = proxyV6Storage.getNextProxy();
    if(proxy){
      store
      .list({
        ...opt,
        num: 200,
        proxy
      })
      .then((apps) => apps.slice(start, start + num).map(cleanUrls(req)))
      .then(toList)
      .then(paginate)
      .then(res.json.bind(res))
      .catch(next);
    }else{
      res.json({
        message : "no active proxies 3"
      })
    }
  }
};

// app details
const getAppDetails = async (req, res, next) => {
  const { appId} = req.params;
  const proxy = proxyV6Storage.getNextProxy();
  if(proxy){
    store
    .app({ id : appId, ...req.params, proxy })
    .then((app) => cleanUrls(req)(app))
    .then(res.json.bind(res))
    .catch(next);
  }else{
    res.json({
      message : "no active proxies 4"
    })
  }
};

//similar apps
const getSimilarApps = async (req, res, next) => {
  let opts = {
    country: req.query.country,
    lang: req.query.lang,
  }
  if(isNumber(req.params.appId)){
    opts.id = req.params.appId;
  }else{
    opts.appId = req.params.appId;
  }
  const proxy = proxyV6Storage.getNextProxy();
  if(proxy){
    store
    .similar({...opts, proxy})
    .then((apps) => apps.map(cleanUrls(req)))
    .then(toList)
    .then(res.json.bind(res))
    .catch(next);
  }else{
    res.json({
      message : "no active proxies 5"
    })
  }
};

// app reviews
const getAppReviews = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const paginate = (apps) => {
    if (page > 1) {
      req.query.page = (page - 1).toString();
      apps.prev = buildUrl(req, `apps/${req.params.appId}/reviews`) + "?" + qs.stringify(req.query);
    }
    if (page < 10) {
      req.query.page = (1 + page).toString();
      apps.next = buildUrl(req, `apps/${req.params.appId}/reviews`) + "?" + qs.stringify(req.query);
    }
    return apps;
  };

  const opts = req.query;
  const proxy = proxyV6Storage.getNextProxy();
  if(proxy){
    store
    .reviews({
      ...opts,
      appId: req.params.appId,
      proxy
    })
    .then(toList)
    .then(paginate)
    .then(res.json.bind(res))
    .catch(next);
  }else{
    res.json({
      message : "no active proxies 6"
    })
  }
};

// app privacy
const getAppPrivacy = async (req, res, next) => {
    const opts = req.query;
    const proxy = proxyV6Storage.getNextProxy();
  if(true){
    store
        .privacy({
        ...opts,
        id: req.params.appId,
        requestOptions: {
          proxy:null
        }
        })
        .then(res.json.bind(res))
        .catch(next);
  }else{
    res.json({
      message : "no active proxies 7"
    })
  }
    
    };

// app ratings
const getAppRatings = async (req, res, next) => {
    const opts = req.query;
    const proxy = proxyV6Storage.getNextProxy();
  if(true){
    store
        .ratings({
        ...opts,
        id: req.params.appId,
        requestOptions: {
          proxy:null
        }
        })    
        .then(res.json.bind(res))
        .catch(next);
  }else{
    res.json({
      message : "no active proxies 8"
    })
  }
    
    };
    
// developer apps
const getDeveloperApps = async (req, res, next) => {
    const opts = { devId: req.params.devId, ...req.query };
    const proxy = proxyV6Storage.getNextProxy();
  if(true){
    store.developer({...opts, requestOptions: {
      proxy:null
    }})
      .then(res.json.bind(res))
      .catch(next);
  }else{
    res.json({
      message : "no active proxies 9"
    })
  }
    
  }

// error handler
const errorHandler = async (err, req, res, next) => {
  res.status(400).json({ message: err.message });
  next();
};




/* proxy */

const proxy_add = async (req, res) => {
  if (req.body?.proxies) {
    proxyV4Storage.addProxies(req.body.proxies.v4);
    proxyV6Storage.addProxies(req.body.proxies.v6);
    res.json({
      message : "successfully received"
    });
  } else {
    res.json({
      message: "need to provide proxies list",
    });
  }
};

const proxy_status = async (req, res) => {
  res.json({
    activeProxies: proxyV6Storage.activeProxies,
    inactiveProxies: proxyV6Storage.inActiveProxies,
  });
};

const proxy_check = async (req, res) => {
  if (req.body.proxy) {
    const result = await proxyV6Storage.checkProxy(
      await proxyV6Storage.toProxyObject(req.body.proxy)
    );
    res.json({
      isWork: result,
    });
  } else {
    res.json({
      message: "need to provide a proxy to check",
    });
  }
};

const checkInactiveProxiesHealth = async (req, res) => {
  proxyV6Storage.checkInactiveProxiesHealth();
  res.json({
    message: "checking inactive proxies health",
  });
}

const clearInactiveProxies = async (req, res) => {
  proxyV6Storage.removeInActiveProxies();
  res.json({
    message: "clearing inactive proxies",
  });
}





module.exports = {
  index,
  getConstants,
  searchApps,
  searchSuggestions,
  getApps,
  getAppDetails,
  getSimilarApps,
  getAppReviews,
  getAppPrivacy,
  getAppRatings,
  getDeveloperApps,
  errorHandler,
  proxy_add,
  proxy_status,
  proxy_check,
  checkInactiveProxiesHealth,
  clearInactiveProxies
};


function isNumber(s) {
  return !isNaN(parseFloat(s)) && isFinite(s);
}