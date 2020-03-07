import { IPost } from '../interfaces/post.interface';

interface IEntries {
    readonly items: IPost[];
}

const adaptItemCover = async (item: IPost): Promise<IPost> => {
    const cover = item.fields.cover;

    if (cover) {
        const { sys: { id } } = cover;

        return {
            ...item,
            fields: {
                ...item.fields,
                cover: await window.contentful.getAsset(id)
            }
        };
    }

    return item;
};

const adaptItem = (item: IPost) => {
    return adaptItemCover(item);
};

const adaptEntries = async (entries: IEntries) => {
    return {
        ...entries,
        items: await Promise.all(entries.items.map(adaptItem))
    };
};

export const contentful = () => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async getEntries(params: any) {
        return await adaptEntries(await window.contentful.getEntries(params));
    }
});
