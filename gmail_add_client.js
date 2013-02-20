Asana.GmailAddClient = {

  keyDown: function(e) {
    if (e.ctrlKey && e.keyCode === 68) {
        chrome.extension.sendMessage({type: "createGmail", data: {title: "Test", messageId: "asdfasdf", recepients: ["asdf", "recep2"]}}, function (resp) {
                alert("Got " + JSON.stringify(resp));
        });
        e.preventDefault();
        return false;
    }

    return true;
  }
};

window.addEventListener("keydown", Asana.GmailAddClient.keyDown, true);
