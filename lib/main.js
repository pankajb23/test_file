var { ToggleButton } = require('sdk/ui/button/toggle');
var panels = require("sdk/panel");
var self = require("sdk/self");

var button = ToggleButton({
    id: "my-button",
    label: "my button",
    icon: "./icon.png",
    onChange: handleChange
});

var panel = panels.Panel({
    width:350,
    contentURL: self.data.url("panel.html"),
    contentScriptFile:self.data.url("get-text.js"),
    onHide:handleHide
});

panel.on("show", function(){
    panel.port.emit("show");
});

function handleChange(state)
{
    if (state.checked) {
        panel.show({position: button});
    }
}

function handleHide(){
    button.state('window', {checked: false});
    panel.destroy();
    console.log(panel);
    panel=panels.Panel({
         width:350,
         contentURL: self.data.url("panel.html"),
         contentScriptFile:self.data.url("get-text.js"),
         onHide:handleHide
    });
    panel.on("show",function(){
        panel.port.emit("show");
    });
}

