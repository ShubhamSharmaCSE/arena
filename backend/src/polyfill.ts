// This file provides a polyfill for the crypto module
const crypto = require('crypto');
(global as any).crypto = {
  randomUUID: () => crypto.randomUUID()
};
