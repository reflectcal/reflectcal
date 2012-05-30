goog.provide("rflect.XMLHTTP");

goog.require("rflect.Root");
goog.require("rflect.mime");
goog.require("goog.json");
goog.require("goog.object");

rflect.XMLHTTP = rflect.Root.__create({
  _compatibleActiveXObject: null,
  ActiveXObjects: ["MSXML2.XMLHTTP.5.0",
    "MSXML2.XMLHTTP.3.0",
    "MSXML2.XMLHTTP.4.0",
    "MSXML2.XMLHTTP",
    "MICROSOFT.XMLHTTP.1.0",
    "MICROSOFT.XMLHTTP.1",
    "MICROSOFT.XMLHTTP"],
  createImplementation: function XMLHTTP_createImplementation() {
    if (this._findCompatibleActiveXObject()) {
      return this._compatibleActiveXObject;
    } else if ("XMLHttpRequest" in window) {
      return new window.XMLHttpRequest();
    }
  },
  getCompatibleActiveXObject: function getCompatibleActiveXObject() {
    return this._compatibleActiveXObject;
  },
  request: function XMLHTTP_sendGET(aRequestOptions) {

    var requestOptions = {
      method: "POST",
      url: "",
      onCompletion: goog.nullFunction,
      onFailure: goog.nullFunction,
      data: {},
      boundObject: null,
      headers: {},
      contentType: 0
    };

    var content = null;
    var xmlHTTPImpl = rflect.XMLHTTP.createImplementation();
    var failureDispatched = false;

    function failure() {
      if (!failureDispatched) {
        failureDispatched = true;
      } else {
        return;
      }
      delete xmlHTTPImpl.onreadystatechange;
      delete xmlHTTPImpl.onerror;
      goog.bind(requestOptions.onFailure,
              requestOptions.boundObject,
              xmlHTTPImpl)();
      xmlHTTPImpl = null;
      return false;
    }
    ;

    goog.object.extend(requestOptions, aRequestOptions);
    inspect("_requestOptions", requestOptions);

    try {
      xmlHTTPImpl.open(requestOptions.method, requestOptions.url, true);
      for (var headerKey in requestOptions.headers) {
        xmlHTTPImpl.setRequestHeader(headerKey, requestOptions.headers[headerKey]);
      }

      // Preparing content
      if (requestOptions.method = "POST") {

        switch (typeof requestOptions.data) {
          case "object":{
            switch (requestOptions.contentType) {
              case rflect.mime.URLENCODED:{
                var dataString = [];
                var first = true;
                for (var key in requestOptions.data) {
                  if (!first) dataString.push("&");
                  dataString.push(key);
                  dataString.push("=");
                  dataString.push(window.encodeURIComponent(requestOptions.data[key].toString()));
                  first = false;
                }
                content = dataString.join("");
              };break;
              case rflect.mime.JSON:{
                content = goog.json.serialize(requestOptions.data);
              };break;
              default:break;
            }
          };break;
          case "string":{
            content = requestOptions.data;
          };break;
          default:break;}

        xmlHTTPImpl.setRequestHeader("Content-Type", requestOptions.contentType);
        xmlHTTPImpl.setRequestHeader("Content-Length", content.length);
      }
      xmlHTTPImpl.onreadystatechange = function() {
        /** Try is needed in case we access status
         * property on XMLHttpRequest
         * object in Gecko when offline.
         * */
        try {
          if (xmlHTTPImpl.readyState == 4) {
            if ((xmlHTTPImpl.status >= 200) && (xmlHTTPImpl.status < 300)) {
              delete xmlHTTPImpl.onreadystatechange;
              delete xmlHTTPImpl.onerror;
              goog.bind(requestOptions.onCompletion,
                      requestOptions.boundObject,
                      xmlHTTPImpl)();
              xmlHTTPImpl = null;
              failure = false;
            } else {
              failure();
            }
            ;
          }
        } catch(e) {
          failure();
        }

      };
      xmlHTTPImpl.send(content);
    }
    catch (e) {
      failure();
    }

    return true;
  },
  _findCompatibleActiveXObject: function XMLHTTP_findCompatibleActiveXObject() {

    var compatibleActiveXobject = null;

    if (this._compatibleActiveXObject == null) {
      if ("ActiveXObject" in window) {
        for (var counter = rflect.XMLHTTP.ActiveXObjects.length - 1;
             counter >= 0; counter--) {
          var activeXObject = rflect.XMLHTTP.ActiveXObjects[counter];
          try {
            this._compatibleActiveXObject
                    = compatibleActiveXobject
                    = new window.ActiveXObject(activeXObject);
           //echo("activeXObject: " + activeXObject, 1);
            return true;

          } catch(ex) {
            //echo("ActiveXObject " + activeXObject + " isn't compatible: " + ex.message);
          }
        }
        if (compatibleActiveXobject == null) {
          throw new Error("Could not create ActiveXObject. ActiveX might be disabled, or msxml might not be installed");
        }
      }

      return false;

    }

    return true;

  }
});