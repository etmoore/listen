$(function(){
  "use strict";

  var App = {
    init: function() {
      var self = this;
      $.getJSON('data.json', function(data) {
        self.renderTemplate('#trackTemplate', '#tracks', data);
      });
      self.renderTemplate('#headerTemplate', '#header', {title: false});
      self.setEventListeners();
    },
    data: '',
    renderTemplate: function(template, target, data){
      var $template = $(template).html();
      var html = Mustache.render($template, data);
      $(target).html(html);
    },
    setEventListeners: function(){
      // Play song
      $('.ui.segment').on('click', '.icon.play', function() {
        Player.stopAll();
        Player.play.call(this);
      });
      // Pause song
      $('.ui.segment').on('click', '.icon.stop', function() {
        Player.stop.call(this);
      });
    },
  };

  var Player = {
    play: function() {
      var $icon = $(this);
      var $audio = $(this).closest('.ui.segment.vertical').find('audio').get(0);
      $icon.removeClass('play').addClass('stop');
      $audio.play();
      App.renderTemplate('#headerTemplate', '#header', {title: $icon.data('title')});
    },
    stop: function() {
      var $icon = $(this);
      var $audio = $(this).closest('.ui.segment.vertical').find('audio').get(0);
      $icon.removeClass('stop').addClass('play');
      $audio.pause();
      $audio.currentTime = 0;
      App.renderTemplate('#headerTemplate', '#header', {title: false});
    },
    stopAll: function() {
      var $playingIcons = $('.icon.stop');
      $.each($playingIcons, function(i, icon){
        Player.stop.call(icon);
      });
    },
    data: '',
  };

  App.init();

});
