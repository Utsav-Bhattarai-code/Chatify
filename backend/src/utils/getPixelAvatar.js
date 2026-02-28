export const getPixelAvatar = async (fullName) => {
    const pixelUrl = "https://api.dicebear.com?seed=$" + encodeURIComponent(fullName);
    return pixelUrl;
}
