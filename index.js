var riot = require('riot-compiler'),
  loaderUtils = require('loader-utils');


module.exports = function (source) {

  var content = source;
  var options = loaderUtils.parseQuery(this.query);

  if (this.cacheable) this.cacheable();

  Object.keys(options).forEach(function(key) {
    switch(options[key]) {
      case 'true':
        options[key] = true;
        break;
      case 'false':
        options[key] = false;
        break;
      case 'undefined':
        options[key] = undefined;
        break;
      case 'null':
        options[key] = null;
        break;
    }
  });

  riot.parsers.css.scss_ap = function (tag,css,options, url) {
    var getdir        = require('path').dirname;
    var opts = {
      indentedSyntax: false,
      omitSourceMapUrl: true,
      outputStyle: 'compact',
      data:css,
      includePaths:[getdir(url)]
    };
    return require('postcss')([require('autoprefixer')]).process(require('node-sass').renderSync(opts).css).css
  }

  try {
    return riot.compile(content, options);
  } catch (e) {
    if (e instanceof Error) {
      throw e;
    } else {
      throw new Error(e);
    }
  }
};
