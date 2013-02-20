/**
 * The "server" portion of the chrome extension, which listens to events
 * from other clients such as the popup or per-page content windows.
 */

Asana.GmailAddServer = {
    
    cached_user: null,
    cached_workspace: null,

    createFromGmail: function (data, responseCb) {
        var onUser = function (usr) {
            console.log("got user " + JSON.stringify(usr));

            if (!usr) {
                Asana.GmailAddServer.cached_user = null;
                alert("Log into asana, please!");
                return;
            }

            if (!Asana.GmailAddServer.cached_user || Asana.GmailAddServer.cached_user.id !== usr) {
                Asana.GmailAddServer.cached_user = usr;
                workspace_id = -1;
            }

            if (workspace_id === -1) {
                var err = function (e) {
                    console.error("Exploded getting workspaces");
                };

                var cb = function (spaces) {
                    console.log("Got workspaces: " + JSON.stringify(spaces));
                    responseCb(spaces);
                };

                Asana.ServerModel.workspaces(cb, err);
            }
        };

        Asana.ServerModel.me(onUser);
        return true;
    },

    listen: function () {
        chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
            if (request.type === "createGmail") {
                Asana.GmailAddServer.createFromGmail({}, sendResponse);
            }
        });
    }
};

Asana.GmailAddServer.listen();
