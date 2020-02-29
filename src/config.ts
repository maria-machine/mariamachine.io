interface IConfig {
    readonly contentful: {
        readonly space?: string;
        readonly token?: string;
    };
}

export const config: IConfig = {
    contentful: {
        space: process.env.REACT_APP_CONTENTFUL_SPACE,
        token: process.env.REACT_APP_CONTENTFUL_TOKEN
    }
};
