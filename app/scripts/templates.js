this["bs"] = this["bs"] || {};
this["bs"]["templates"] = this["bs"]["templates"] || {};

this["bs"]["templates"]["header"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"navbar navbar-fixed-top clearfix\">\n        <div class=\"navbar-inner\">\n            <ul class=\"nav pull-left\">\n                <li id=\"descriptionBox\" class=\"\">\n                    <!--<a href=\"https://github.com/chanakyabhardwajj/beat-speed\"><img style=\"position: absolute; top: 0; left: 0; border: 0;\" src=\"https://s3.amazonaws.com/github/ribbons/forkme_left_orange_ff7600.png\" alt=\"Fork me on GitHub\"></a>-->\n                    <em id=\"title\">beat speed</em> <span id=\"subtitle\">built with Soundcloud, Three.js, Sparks.js, Dancer.js & Bootstrap</span>\n                </li>\n            </ul>\n\n\n            <ul class=\"nav pull-right\">\n                <li id=\"userBox\" class=\"\">\n	                <div id=\"userName\" href=\"#\">\n					    <span>";
  if (stack1 = helpers.first_name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.first_name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n					</div>\n				</li>\n            </ul>\n        </div>\n    </div>\n\n\n";
  return buffer;
  });

this["bs"]["templates"]["home"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<header id=\"header\"></header>\n\n<div id=\"oldSongsBox\">\n    <div>Your previous songs</div>\n    <ul id=\"oldSongsList\"></ul>\n</div>\n\n\n\n<div id=\"mainSongSection\"></div>";
  });

this["bs"]["templates"]["login"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"block loginBox\">\n    <div id=\"loginButton\" class=\"zocial facebook\">Login with Facebook</div>\n    <div id=\"loginDisclaimer\">We don't post anything on your behalf. Promise!</div>\n</div>\n<div id=\"loginError\" class=\"alert alert-error hide\">There was an error in signing up. Try again.</div>";
  });

this["bs"]["templates"]["mainSong"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div id=\"songStuff\">\n    <div id=\"songBox\" class=\"input-prepend input-append\">\n        <span class=\"add-on\"><i class=\"icon-music\"></i></span>\n        <input class=\"span2\" id=\"songQuery\" type=\"text\" placeholder=\"search for any song\">\n        <span class=\"add-on clearQuery\"><i class=\"icon-remove\"></i></span>\n    </div>\n    <p class=\"progressInd icon-spinner icon-spin hide\"></p>\n    <div id=\"songResults\" class=\"row-fluid\"></div>\n</div>\n<canvas id=\"songCanvas\" width=\"100\" height=\"100\"></canvas>";
  });

this["bs"]["templates"]["newSong"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"center songResult\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-uri=\"";
  if (stack1 = helpers.uri) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.uri; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-artwork_url=\"";
  if (stack1 = helpers.artwork_url) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.artwork_url; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-title=\"";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-user=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.user),stack1 == null || stack1 === false ? stack1 : stack1.username)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" >\n    <div class=\"songResultImageSection clearfix\">\n        <img src=\"";
  if (stack2 = helpers.artwork_url) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.artwork_url; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\" class=\"songResultImg\">\n    </div>\n    <div class=\"songResultTextSection clearfix\">\n        <h5 class=\"songTitle\">";
  if (stack2 = helpers.title) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.title; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</h5>\n        <p class=\"songUserName\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.user),stack1 == null || stack1 === false ? stack1 : stack1.username)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</p>\n    </div>\n</div>";
  return buffer;
  });

this["bs"]["templates"]["oldSong"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"oldSong\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-uri=\"";
  if (stack1 = helpers.uri) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.uri; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-artwork_url=\"";
  if (stack1 = helpers.artwork_url) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.artwork_url; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-title=\"";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-user=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.user),stack1 == null || stack1 === false ? stack1 : stack1.username)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" >\n    <img class=\"oldSongImage pull-left\" src=\"";
  if (stack2 = helpers.artwork_url) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.artwork_url; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\"/>\n    <span class=\"oldSongTitle pull-left\"><em>";
  if (stack2 = helpers.title) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.title; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</em></span>\n    <span class=\"oldSongUser  pull-left hide\">";
  if (stack2 = helpers.user) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.user; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</span>\n</div>\n";
  return buffer;
  });