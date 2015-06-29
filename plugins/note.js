var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./localStorage');

module.exports.run = function (client) {
    client.addListener('message', function(nick, channel, message) {
        params = message.split(' ');

        if (params[0] == '.note') {

            // Check for proper amount of args
            if (params.length < 2) {
                client.say(channel, '.note name (your message here)');
                return
            }

            // Get stored list of args
            var notes = JSON.parse(localStorage.getItem('notes'));

            if (!notes) {
                notes = {};
            }

            if (params[1] && params[2]) {

                note = message.substr(params[0].length + params[1].length + 2);

                notes[params[1]] = note;

                localStorage.setItem('notes', JSON.stringify(notes));

                client.say(channel, 'Saved note for: ' + params[1]);

                return;
            }

            // Check if key exists
            if (notes[params[1]]) {
                client.say(channel, params[1] + ': ' + notes[params[1]])

            } else {
                client.say(channel, 'Not found. Create a note with ".note name (your message here)"')
            }
        }
    });
};
