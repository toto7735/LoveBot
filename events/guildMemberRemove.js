module.exports = {
    name: 'guildMemberRemove',
    async execute(member) {
        if (global.queue.includes(member.id)) {
            for (let i = 0; i < global.queue.length; i++) {
                if (global.queue[i].toString() === member.id.toString()) {
                global.queue.splice(i, 1);
                i--;
                }
            }
        }

        if (global.micConfirms != null && global.micConfirms != undefined && global.micConfirms.includes(member.id)) {
            for (let i = 0; i < global.micConfirms.length; i++) {
                if (global.micConfirms[i].toString() === member.id.toString()) {
                global.micConfirms.splice(i, 1);
                i--;
                }
            }
        }

        if (global.noMicConfirms != null && global.noMicConfirms != undefined && global.noMicConfirms.includes(member.id)) {
            for (let i = 0; i < global.noMicConfirms.length; i++) {
                if (global.noMicConfirms[i].toString() === member.id.toString()) {
                global.noMicConfirms.splice(i, 1);
                i--;
                }
            }
        }

        if (global.mic_recruit != null && global.mic_recruit != undefined && global.mic_recruit.includes(member.id)) {
            for (let i = 0; i < global.mic_recruit.length; i++) {
                if (global.mic_recruit[i].toString() === member.id.toString()) {
                global.mic_recruit.splice(i, 1);
                i--;
                }
            }
        }

        if (global.no_mic_recruit != null && global.no_mic_recruit != undefined && global.no_mic_recruit.includes(member.id)) {
            for (let i = 0; i < global.no_mic_recruit.length; i++) {
                if (global.no_mic_recruit[i].toString() === member.id.toString()) {
                global.no_mic_recruit.splice(i, 1);
                i--;
                }
            }
        }
    }

};