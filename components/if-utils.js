
let expiredOptions = [];
let expiredPrompts = [];

module.exports = {
  reset: function() {
    expiredOptions = [];
    expiredPrompts = [];
  },
  getExpiredOptions: function () {
    return expiredOptions;
  },
  getExpiredPrompts: function() {
    return expiredPrompts;
  },
  setExpiredOption: function(id) {
    expiredOptions.push(id);
  },
  setExpiredPrompt: function(id) {
    expiredPrompts.push(id);
  }
}