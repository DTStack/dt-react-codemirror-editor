import initStoryshots from '@storybook/addon-storyshots';

initStoryshots({
    framework:'react',
    storyRegex: /\.stories\.[j|t]sx?$/
});
initStoryshots();
