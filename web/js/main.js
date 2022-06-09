/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/



/* JS within an iframe can reference objects of the page it is embedded in via window.parent.
   With ZLUX, there's a global called ZoweZLUX which holds useful tools. So, a site
   Can determine what actions to take by knowing if it is or isnt embedded in ZLUX via IFrame.
*/
// var mvdWindow = window.parent;
// var ZoweZLUX = null;
// if (mvdWindow) {
//   ZoweZLUX = mvdWindow.ZoweZLUX;
// }

const MY_PLUGIN_ID = 'org.zowe.zlux.sample.iframe';

function SettingsService() {
  this.plugin = null;
}

SettingsService.prototype.setPlugin = function(plugin) {
  this.plugin = plugin;
}

SettingsService.prototype.getDefaultsFromServer = async function(successCallback, errorCallback) {
  let xhr = new XMLHttpRequest();
  let uri = await ZoweZLUX.uriBroker.pluginConfigUri(this.plugin, 'requests/app', undefined);
  xhr.open('GET', uri);
  xhr.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE) {
      if (this.status == 200) {
        successCallback(xhr.responseText);
      } else {
        errorCallback(xhr.responseText);
      }
    }
  }
  xhr.onerror = function(e) {
    errorCallback(e);
  }
  xhr.send();
}

SettingsService.prototype.saveAppRequest = async function(actionType, targetMode, parameters, successCallback, errorCallback) {
  let xhr = new XMLHttpRequest();
  let uri = await ZoweZLUX.uriBroker.pluginConfigUri(this.plugin, 'requests/app', 'parameters');  
  xhr.open('PUT', uri, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE) {
      console.log(`Saved parameters with HTTP status=${this.status}`);
      if (this.status == 200 || this.status == 201) {
        successCallback(xhr.responseText);
      } else {
        errorCallback(xhr.responseText);
      }
    }
  }
  xhr.onerror = function(e) {
    errorCallback(e);
  }

  xhr.send(JSON.stringify({
    "_objectType": "org.zowe.zlux.sample.setting.request.app.parameters",
    "_metaDataVersion": "1.0.0",
    "actionType": actionType,
    "targetMode": targetMode,
    "parameters": parameters    
  }));

}

SettingsService.prototype.saveAppId = async function(appId, successCallback, errorCallback) {
  let xhr = new XMLHttpRequest();
  let uri = await ZoweZLUX.uriBroker.pluginConfigUri(this.plugin, 'requests/app', 'appid');
  xhr.open('PUT', uri, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE) {
      console.log(`Saved App ID with HTTP status=${this.status}`);
      if (this.status == 200 || this.status == 201) {
        successCallback(xhr.responseText);
      } else {
        errorCallback(xhr.responseText);
      }
    }
  }
  xhr.onerror = function(e) {
    errorCallback(e);
  }

  xhr.send(JSON.stringify({
    "_objectType": "org.zowe.zlux.sample.setting.request.app.appid",
    "_metaDataVersion": "1.0.0",
    "appId": appId
  }));

}

function HelloService() {
  this.path = null;
}

HelloService.prototype.setDestination = function(path) {
  this.path = path;
}

HelloService.prototype.sayHello = function(text, destination, callback) {
  let xhr = new XMLHttpRequest();
  xhr.open('POST', destination, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE) {
      callback(xhr.responseText);
    }
  }
  xhr.send(JSON.stringify({
    "_objectType": "org.zowe.zlux.sample.angular.request.hello",
    "_metaDataVersion": "1.0.0",
    "messageFromClient": text
  }));
}

var helloService = new HelloService();
var settingsService = new SettingsService();
if (ZoweZLUX) {
  ZoweZLUX.pluginManager.getPlugin(MY_PLUGIN_ID).then(res => {
    settingsService.setPlugin(res);
  })
}

function getDefaultsFromServer() {
  ZoweZLUX.iframe.isSingleAppMode().then(function(value) {
    if (value) { //If we are in single app mode...
      console.error("This action is not supported yet in standalone mode.");
      return;
    }
  });
  if (ZoweZLUX) {
    console.log('IFrame has ZoweZLUX global');
    settingsService.getDefaultsFromServer((resText)=> {
      try {
        let responseJson = JSON.parse(resText);
        console.log(`JSON=${JSON.stringify(responseJson)}`);
        if (responseJson.contents.appid && responseJson.contents.parameters) {
          let paramData = responseJson.contents.parameters.data;
          document.getElementById('parameters').value = paramData.parameters;

          let targetModes = document.getElementsByName('targetMode');
          for (let i =0; i < targetModes.length; i++) {
            if (targetModes[i].value == paramData.appTarget) {
              targetModes[i].checked = true;
              break;
            }
          }

          let actionTypes = document.getElementsByName('actionType');
          for (let i =0; i < actionTypes.length; i++) {
            if (actionTypes[i].value == paramData.actionType) {
              actionTypes[i].checked = true;
              break;
            }
          }

          document.getElementById('appId').value = responseJson.contents.appid.data.appId;
        } else {
          console.log(`Incomplete data. AppID or Parameters missing.`);
        }
      } catch (e) {
        console.log(`Response was not JSON`);
      }
    }, (e)=> {
      console.log(`Error on getting defaults, e=${e}`);
      document.getElementById('status').innerHTML = 'Error getting defaults';
    });
  }
};

function saveToServer() {
  ZoweZLUX.iframe.isSingleAppMode().then(function(value) {
    if (value) { //If we are in single app mode...
      console.error("This action is not supported yet in standalone mode.");
      return;
    }
  });
  if (ZoweZLUX) {
    console.log('IFrame has ZoweZLUX global');
    let actionTypes = document.getElementsByName('actionType');
    let type;
    for (let i =0; i < actionTypes.length; i++) {
      if (actionTypes[i].checked) {
        type = ZoweZLUX.dispatcher.constants.ActionType[actionTypes[i].value];
        break;
      }
    }

    let targetModes = document.getElementsByName('targetMode');
    let mode;
    for (let i =0; i < targetModes.length; i++) {
      if (targetModes[i].checked) {
        mode = ZoweZLUX.dispatcher.constants.ActionTargetMode[targetModes[i].value];
        break;
      }
    }

    settingsService.saveAppRequest(type, mode, document.getElementById('parameters').value, (resText)=> {
      settingsService.saveAppId(document.getElementById('appId').value, (resText)=> {
        console.log('Completed saving app request data');
      }, (e) => {
        console.log(`Error on saving App ID, e=${e}`);
        document.getElementById('status').innerHTML = 'Error saving App ID';
      });
    }, (e)=> {
      console.log(`Error on saving parameters, e=${e}`);
      document.getElementById('status').innerHTML = 'Error saving parameters';
    });
  }
};

function inputChanged() {
  if(document.getElementById('helloText').value) {
    document.getElementById('runButton').disabled = false;
    document.getElementById('runButton').style.color = "#047cc0";
    document.getElementById('runButton').style.borderColor = "#047cc0";
  } else {
    document.getElementById('runButton').disabled = true;
    document.getElementById('runButton').style.color = "grey";
    document.getElementById('runButton').style.borderColor = "grey";
  }
}

async function sayHello() {
  if (ZoweZLUX) {
    console.log('IFrame has ZoweZLUX global');
    let myPluginDef = await ZoweZLUX.pluginManager.getPlugin(MY_PLUGIN_ID);
    let url = await ZoweZLUX.uriBroker.pluginRESTUri(myPluginDef, 'hello', null);
    helloService.sayHello(document.getElementById('helloText').value, url, (resText) => {
    try {
      const responseJson = JSON.parse(resText);
      let serverResponseMessage = document.getElementById('serverResponseMessage');
      if (responseJson != null && responseJson.serverResponse != null) {
        serverResponseMessage.innerHTML = 
          `Server replied with 
        
        "${responseJson.serverResponse}"`;
      } else {
        serverResponseMessage.innerHTML = "<Empty Reply from Server>";
      }
      console.log(responseJson);
    } catch (e) {
      console.log(`Failed to parse response json. Received response text=${resText}`);
    }
  });
  } else {
    let serverResponseMessage = document.getElementById('serverResponseMessage');
    console.log((serverResponseMessage.innerHTML = "Not inside of Zowe, and not sure how to contact dataservice"));
  }
}

// Tests the sending of requests to other plugins. Invoked
// by the button labelled "Send App Request"

async function sendAppRequest() {
  ZoweZLUX.iframe.isSingleAppMode().then(function(value) {
    if (value) { //If we are in single app mode...
      console.error("This action is not supported yet in standalone mode.");
      return;
    }
  });
  var requestText = document.getElementById('parameters').value;
  var parameters = null;
  /*Parameters for Actions could be a number, string, or object. The actual event context of an Action that an App recieves will be an object with attributes filled in via these parameters*/
  try {
    if (requestText !== undefined && requestText.trim() !== "") {
      parameters = JSON.parse(requestText);
    }
  } catch (e) {
    //requestText was not JSON
  }

  let appId = document.getElementById('appId').value;  
  if (appId) {
    let statusElement = document.getElementById('status');
    let message = '';
    if (ZoweZLUX) {
      console.log('IFrame has ZoweZLUX global');
      /* PluginManager can be used to find what Plugins (Apps are a type of Plugin) are part of the current ZLUX instance.
         Once you know that the App you want is present, you can execute Actions on it by using the Dispatcher.
      */
      let dispatcher = ZoweZLUX.dispatcher;
      let pluginManager = ZoweZLUX.pluginManager;
      let plugin = await pluginManager.getPlugin(appId);
      if (plugin) {
        let actionTypes = document.getElementsByName('actionType');
        let type;
        for (let i =0; i < actionTypes.length; i++) {
          if (actionTypes[i].checked) {
            type = dispatcher.constants.ActionType[actionTypes[i].value];
            break;
          }
        }

        let targetModes = document.getElementsByName('targetMode');
        let mode;
        for (let i =0; i < targetModes.length; i++) {
          if (targetModes[i].checked) {
            mode = dispatcher.constants.ActionTargetMode[targetModes[i].value];
            break;
          }
        }

        if (type != undefined && mode != undefined) {
          let actionTitle = 'Launch app from sample app';
          let actionID = 'org.zowe.zlux.sample.launch';
          let argumentFormatter = {data: {op:'deref',source:'event',path:['data']}};
          /*Actions can be made ahead of time, stored and registered at startup, but for example purposes we are making one on-the-fly.
            Actions are also typically associated with Recognizers, which execute an Action when a certain pattern is seen in the running App.
          */
          let action = await dispatcher.makeAction(actionID, actionTitle, mode,type,appId,argumentFormatter);
          let argumentData = {'data':(parameters ? parameters : requestText)};
          console.log((message = 'App request succeeded'));        
          statusElement.innerHTML = message;
          /*Just because the Action is invoked does not mean the target App will accept it. We've made an Action on the fly,
            So the data could be in any shape under the "data" attribute and it is up to the target App to take action or ignore this request*/
          dispatcher.invokeAction(action,argumentData);
        } else {
          console.log((message = 'Invalid target mode or action type specified'));        
        }
      } else {
        console.log((message = 'Could not find App with ID provided'));
      }
    }
    statusElement.innerHTML = message;
  }
}



/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/
