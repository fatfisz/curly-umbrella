import fs from 'fs';

export default (options = {}) => ({
  transformBundle(code) {
    if (!options.wrapper) {
      throw new Error('Missing "wrapper" property for the custom wrapper plugin');
    }

    return fs.readFileSync(options.wrapper, 'utf8')
      .replace(/\s(?![a-z]+=)/gi, '')
      .replace(/;(?=})/g, '')
      .replace('${code}', code);
  },
});
