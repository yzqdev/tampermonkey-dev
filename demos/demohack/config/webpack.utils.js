const os=require('os');
const commonMeta=require('./meta.json')
const year = new Date().getFullYear()
const getBanner = meta => `// ==UserScript==\n${Object.entries(Object.assign(meta, commonMeta)).map(([key, value]) => {
  if (Array.isArray(value)) {
    return value.map(item => `// @${key.padEnd(16, ' ')}${item}`).join('\n')
  }
  return `// @${key.padEnd(16, ' ')}${value.replace(/\[year\]/g, year)}`
}).join('\n')}
// ==/UserScript==
/* eslint-disable */ /* spell-checker: disable */
// @[ You can find all source codes in GitHub repo ]`
/*
获取本机IP
*/
const getIpAddress = () => {
  let localIPAddress = ``;
  let interfaces = os.networkInterfaces();
  for (let devName in interfaces) {

    let iface = interfaces[devName];
    for (let i = 0; i < iface.length; i++) {
      let alias = iface[i];
      if (
        alias.family === `IPv4` &&
        alias.address !== `127.0.0.1` &&
        !alias.internal
      ) {
        localIPAddress = alias.address;
      }
    }
  }
  return localIPAddress;
};
module.exports = {
   getIpAddress,getBanner
};
