export interface IConfigLink {
    readonly name: string;
    readonly link: string;
}

export interface IConfig {
    readonly app: {
        readonly dev: boolean;
    };
    readonly contentful: {
        readonly space?: string;
        readonly token?: string;
    };
    readonly localStorage: {
        readonly locale: string;
        readonly subscription: string;
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
    app: {
        dev: process.env.REACT_APP_DEV === 'true'
    },
    contentful: {
        space: process.env.REACT_APP_CONTENTFUL_SPACE,
        token: process.env.REACT_APP_CONTENTFUL_TOKEN
    },
    localStorage: {
        locale: 'MARIA_MACHINE_LOCALE',
        subscription: 'MARIA_MACHINE_SUBSCRIPTION'
    },
    mailchimp: {
        client: process.env.REACT_APP_MAILCHIMP_CLIENT,
        u: process.env.REACT_APP_MAILCHIMP_U,
        id: process.env.REACT_APP_MAILCHIMP_ID
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
