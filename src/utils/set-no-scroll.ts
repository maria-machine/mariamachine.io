export const setNoScroll = (flag: boolean) => {
    if (flag) {
        document.body.classList.add('no-scroll');
    } else {
        document.body.classList.remove('no-scroll');
    }
};
