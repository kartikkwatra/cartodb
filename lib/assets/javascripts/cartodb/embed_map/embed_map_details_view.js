var cdb = require('cartodb.js-v3');
var _ = require('underscore-cdb-v3');

var DASHBOARD_TEMPLATE = _.template('<%= baseURL %>/me?utm_source=Footer_Link&utm_medium=referral&utm_campaign=Embed_v1&utm_content=<%- username %>');
var LOGIN_TEMPLATE = '/login';
var LIKE_API_TEMPLATE = _.template('api/v1/viz/<%= uuid %>/like');
var LIKE_TEMPLATE = _.template('<%= baseURL %>/api/v1/viz/<%= uuid %>/like');

module.exports = cdb.core.View.extend({
  className: 'cartodb-text',

  events: {
    'click .js-like': '_likeHandler'
  },

  initialize: function () {
    this.template = cdb.templates.getTemplate('embed_map/views/embed_map_details');
    this.owner = this.options.owner;
    this.currentUser = this.options.currentUser;
    this.needLogin = this.currentUser == null;
    this.likeURL = this.needLogin ? LOGIN_TEMPLATE : LIKE_TEMPLATE({
      baseURL: this.owner.get('base_url'),
      uuid: this.options.vizID
    });

    this.client = new CartoNode.PublicClient();
    this._initModels();
  },

  _initModels: function () {
    this.viewModel = new cdb.core.Model({
      likes: this.options.likes,
      liked: this.options.liked
    });

    this.viewModel.on('change', this.render, this);
  },

  render: function () {
    this.$el.empty();
    this._initViews();
    return this;
  },

  _initViews: function () {
    var username = this.owner.get('username');
    var userDashboard = DASHBOARD_TEMPLATE({
      baseURL: this.owner.get('base_url'),
      username: username
    });

    this.$el.html(this.template({
      likeURL: this.likeURL,
      userDashboard: userDashboard,
      username: username,
      avatarUrl: this.owner.get('avatar_url'),
      likes: this.viewModel.get('likes'),
      liked: this.viewModel.get('liked')
    }));
  },

  _likeHandler: function (e) {
    if (!this.needLogin) {
      e.preventDefault();

      var likeURL = LIKE_API_TEMPLATE({
        uuid: this.options.vizID
      });

      this.client.get([likeURL], function (error, response) {
        if (error) {
          return;
        }

        var result = response.responseJSON;
        this.viewModel.set({
          likes: result.likes,
          liked: result.liked
        });
      }.bind(this));
    }
  }
});