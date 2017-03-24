'use babel';

import OpenGitInProjectView from './open-git-in-project-view';
import {
    CompositeDisposable
} from 'atom';

export default {

    openGitInProjectView: null,
    modalPanel: null,
    subscriptions: null,

    activate(state) {
        this.openGitInProjectView = new OpenGitInProjectView(state.openGitInProjectViewState);
        this.modalPanel = atom.workspace.addModalPanel({
            item: this.openGitInProjectView.getElement(),
            visible: false
        });

        // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
        this.subscriptions = new CompositeDisposable();

        // Register command that toggles this view
        this.subscriptions.add(atom.commands.add('atom-workspace', {
            'open-git-in-project:toggle': () => this.toggle()
        }));
    },

    deactivate() {
        this.modalPanel.destroy();
        this.subscriptions.dispose();
        this.openGitInProjectView.destroy();
    },

    serialize() {
        return {
            openGitInProjectViewState: this.openGitInProjectView.serialize()
        };
    },

    toggle() {
        var exec = require('child_process').exec;
        atom.project.getPaths().forEach((path) => {
            var cmd = '"C:/Program\ Files/Git/git-bash.exe" --cd="' + path + '"';

            exec(cmd, function(error, stdout, stderr) {
                // command output is in stdout
                console.log(stdout);
                console.log(error);
                console.log(stderr);
            });
        });
    }

};
