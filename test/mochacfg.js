
// Disable picture loading
require.extensions['.png'] = function(){ return null; }
// Disable CSS loading
require.extensions['.css'] = function(){ return null; }