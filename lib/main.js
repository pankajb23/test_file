var { ToggleButton } = require('sdk/ui/button/toggle');
var panels = require("sdk/panel");
var self = require("sdk/self");
var data=require("sdk/self").data;

var button = ToggleButton({
  id: "my-button",
  label: "my button",
  icon: {
    "16": "./icon.png",
    "32": "./icon.png",
    "64": "./icon.png"
  },
  onChange: handleChange
});

var panel = require("sdk/panel").Panel({
  width:350,
  contentURL: data.url("panel.html"),
  contentScriptFile: data.url("get-text.js"),
  onHide: handleHide
});


function handleChange(state) {
  if (state.checked) {
    panel.show({
      position: button
    });
  }
}

function handleHide() {
  button.state('window', {checked: false});
}

