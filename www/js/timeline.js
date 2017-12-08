var Timeline = function(settings) {

	// *** PRIVATE *** 
	var _log = function(data) {
		if (_config.debug) {
			console.log(data);
		}
	}

	var _config = {
			debug : false,
			avatar : "img/avatar.png",
			callback : "timeline.php",
			container : 'timelineContent'
		};
	$.extend( _config, settings );
	_log(_config);

	var _card_template = function(item) {
		
		_log("_card_template function");

		var html = '<div class="nd2-card">';
		html = html + _card_avatar_template(item);
		html = html + _card_media_template(item);
		html = html + _card_text_template(item);
		html = html + '</div>';
		return html;
	}

	var _card_avatar_template = function (item) {

		_log("_card_avatar_template function");
		
		var avatar = _config.avatar;
		if (item.avatar != '') {
			avatar = item.avatar;
		}
		var html = '<div class="card-title has-avatar">';
		html = html + '<img class="card-avatar" src="' + avatar + '"><h3 class="card-primary-title">';
		html = html + item.title + '</h3><h5 class="card-subtitle">' + item.subtitle + '</h5></div>';
		return html;
	}

	var _card_media_template = function(item) {
		
		_log("_card_media_template function");
		var html = '';
		if ('image' in item) {
			html = '<div class="card-media"><img src="' + item.image + '"></div>';
		}
		return html;
	}

	var _card_text_template = function(item) {
		var html = '<div class="card-supporting-text has-action">';
		if ('headerDescription' in item) {
			html = html + '<strong>' + item.headerDescription + '</strong>&nbsp;';
		}
		html = html + item.description;
		html = html + '</div>';
		return html;
	}

	// *** PUBLIC ***
	return {

		retrieve: function() {
			
			_log("retrieve function");
			$.getJSON(_config.callback)
				.done(function(data){
					var html = '';
					if (data.total > 0) {
						var items = data.items;
						for (i=0; i < items.length; i++) {
							html = html + _card_template(items[i]);
						}
					}
					$('#' + _config.container).html(html);
				})
				.error(function(jqxhr, textStatus, error) {
					var err = textStatus + ", " + error;
					myUtils.toast("Request Failed. Try again: " + err);
				})
				.complete(function(){
					myUtils.toast("New sketches loaded!");
				});
		}
	}
};

$(document).ready(function() {
	var myTimeline = new Timeline({callback:'http://sketch.pensashure.com/timeline.php', debug:false});
	myTimeline.retrieve();
});