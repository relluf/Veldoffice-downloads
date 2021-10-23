var cavalion_js = (name) => "node_modules/cavalion-js/src/" + name;
var reload = () => window.location.reload();

require.config({
	paths: {
        "js": cavalion_js("js"),
        "util": cavalion_js("util"),
		"veldoffice": "node_modules/veldoffice-js/src/veldapps.com/veldoffice",
		"jquery": "node_modules/jquery/dist/jquery.min",
        "locale": cavalion_js("locale"),
	}
});

define(["veldoffice/Session", "jquery", "util/net/Url"], (Session, $, Url) => {
	var url = new Url();

	Session.refresh().then(res => {
		$(".panel").removeClass("loading");

		$("#exit1").on("click", () => { Session.logout().then(reload); });
		$("#exit2").on("click", () => { Session.logout().then(reload); });
		$("form").on("submit", () => { 
			var username = $("input[name=username]")[0].value;
			var password = $("input[name=password]")[0].value;
	
				$(".panel").addClass("loading");
				$(".login").addClass("hidden");
	
			Session.login(username, password).then(res => window.location.reload());
			return false;
		});

		if(res === false || res.split("-").length !== 5) {
			$(".login").removeClass("hidden");
			$("input[name=username]")[0].focus();
		} else {
			Session.info().then(res => {
				var id = url.getParamValues()[0];
				$("#user")[0].textContent = res.name;
				if(id) {
					$("#download")[0].href = "https://veldoffice.nl/office-rest/action/documenten/download?id=" + id;
					$(".download").removeClass("hidden");
				} else {
					$(".invalid").removeClass("hidden");
				}
			});
		}
	});

});