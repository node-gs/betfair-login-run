var settings = (function(){
	


	const appKey = "EXAMPLE";
	const DEFAULT_ENCODING = 'utf-8';
	const DEFAULT_JSON_FORMAT = '\t';
	const data = 'username=USERNAME&password=PASSWORD';




	return {
		appKey: appKey,
		data: data,
		DEFAULT_ENCODING: DEFAULT_ENCODING,
		DEFAULT_JSON_FORMAT: DEFAULT_JSON_FORMAT
	}
})();
module.exports = settings;