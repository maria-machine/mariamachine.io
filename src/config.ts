export interface IConfigLink {
    readonly name: string;
    readonly link: string;
}

export interface IConfig {
    readonly localStorage: {
        readonly subscription: string;
    };
    readonly ga: {
        readonly id?: string;
    };
    readonly mailchimp: {
        readonly client?: string;
        readonly u?: string;
        readonly id?: string;
    };
    readonly socials: {
        readonly youtube: IConfigLink;
        readonly twitter: IConfigLink;
        readonly telegramChannel: IConfigLink;
        readonly telegramChat: IConfigLink;
        readonly vk: IConfigLink;
        readonly facebook: IConfigLink;
        readonly github: IConfigLink;
    };
}

export const config: IConfig = {
    localStorage: {
        subscription: 'MARIA_MACHINE_SUBSCRIPTION'
    },
    ga: {
        id: process.env.GATSBY_GA_ID
    },
    mailchimp: {
        client: process.env.GATSBY_MAILCHIMP_CLIENT,
        u: process.env.GATSBY_MAILCHIMP_U,
        id: process.env.GATSBY_MAILCHIMP_ID
    },
    socials: {
        youtube: {
            name: 'youtube',
            link: 'https://www.youtube.com/channel/UCxGr5HDHxIxYZsTGiJb_NtQ'
        },
        twitter: {
            name: 'twitter',
            link: 'https://twitter.com/mariamachine_ml'
        },
        telegramChannel: {
            name: 'telegram channel',
            link: 'tg://resolve?domain=maria_machine'
        },
        telegramChat: {
            name: 'telegram chat',
            link: 'tg://resolve?domain=maria_machine_chat'
        },
        vk: {
            name: 'vk',
            link: 'https://vk.com/maria_machine'
        },
        facebook: {
            name: 'facebook',
            link: 'https://facebook.com/maria.machine.ml'
        },
        github: {
            name: 'github',
            link: 'https://github.com/maria-machine'
        }
    }
};
