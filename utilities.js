
var utilities = (function() {
    ///////////////////////////////////////////////////////////////////////////////////
    // Handle Api-NG errors, exception details are wrapped within response object 
    function handleError(response) {
        // check for errors in response body, we can't check for status code as jsonrpc returns always 200
        if (response.error != null) {
            // if error in response contains only two fields it means that there is no detailed message of exception thrown from API-NG
            if (Object.keys(response.error).length > 2) {
                console.log("Error with request!!");
                console.log(JSON.stringify(response, null, settings.DEFAULT_JSON_FORMAT));
                console.log("Exception Details: ");
                console.log(JSON.stringify(retrieveExceptionDetails(response), null, settings.DEFAULT_JSON_FORMAT));
            }
            process.exit(1);
        }
    }
    function retrieveExceptionDetails(response) {
        return response.error.data.APINGException;
    }
    ///////////////////////////////////////////////////////////////////////////////////
    function constructJsonRpcRequest(operation, params) {
        return '{"jsonrpc":"2.0","method":"SportsAPING/v1.0/' +  operation + '", "params": ' + params + ', "id": 1}';
    }
    ///////////////////////////////////////////////////////////////////////////////////

    return {
        handleError: handleError,
        constructJsonRpcRequest: constructJsonRpcRequest
    }

})();

module.exports = utilities;