import {ITaggable} from 'aws-cdk-lib';

export const addTags = (
  construct: ITaggable,
  tags: {[key: string]: string},
): void => {
  for (const [key, value] of Object.entries(tags)) {
    construct.tags.setTag(key, value);
  }
};
