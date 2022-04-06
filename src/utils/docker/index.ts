// const tagRegEx = /^(.+\/)?(.+){1}$/;
const imageRegEx = /\/(.*?)$/;
const digestRegEx = /^(.+)@(.+)$/;
const tagRegEx = /^(.+):(.+)$/;

const parseImagePath = (fullImagePath: string) => {
  const imageParts = imageRegEx.exec(fullImagePath);
  return imageParts ? imageParts[1] : fullImagePath;
};

export type DockerImageDigest = {
  repository?: string;
  image?: string;
  digest?: string;
};

export type DockerImageTag = {
  repository: string;
  image: string;
  tag?: string;
};

export const parseImageDigest = (fullImagePath: string): DockerImageDigest => {
  const image = parseImagePath(fullImagePath);
  const digestParts = digestRegEx.exec(image);
  return digestParts
    ? { repository: digestParts[1], image: image, digest: digestParts[2] }
    : {};
};

export const parseImageTag = (fullImagePath: string): DockerImageTag => {
  const image = parseImagePath(fullImagePath);
  const tagParts = tagRegEx.exec(image);
  return tagParts
    ? { repository: tagParts[1], image: image, tag: tagParts[2] }
    : { repository: image, image: image };
};
