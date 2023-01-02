// TODO: refactor: remove main.js coupling
import { getElementOptions } from "../main.js";

export default {
  zflag: /(z-?\d*,)/,

  getRarityWeight(_path, rarityDelimiter) {
    // check if there is an extension, if not, consider it a directory
    const exp = new RegExp(`${rarityDelimiter}(\\d*)`, "g");
    const weight = exp.exec(_path);
    const weightNumber = weight ? Number(weight[1]) : -1;

    if (weightNumber < 0 || isNaN(weightNumber)) {
      return "required";
    }
    return weightNumber;
  },
  cleanDna(_str) {
    var dna = _str.split(":").shift();
    return dna;
  },

  cleanName(_str, rarityDelimiter) {
    const hasZ = this.zflag.test(_str);

    const zRemoved = _str.replace(this.zflag, "");

    const extension = /\.[0-9a-zA-Z]+$/;
    const hasExtension = extension.test(zRemoved);
    let nameWithoutExtension = hasExtension ? zRemoved.slice(0, -4) : zRemoved;
    var nameWithoutWeight = nameWithoutExtension.split(rarityDelimiter).shift();
    return nameWithoutWeight;
  },

  parseQueryString(filename, layer, sublayer) {
    const query = /\?(.*)\./;
    const querystring = query.exec(filename);
    if (!querystring) {
      return getElementOptions(layer, sublayer);
    }
    const layerstyles = querystring[1].split("&").reduce((r, setting) => {
      const keyPairs = setting.split("=");
      return { ...r, [keyPairs[0]]: keyPairs[1] };
    }, []);

    return {
      blendmode: layerstyles.blend
        ? layerstyles.blend
        : getElementOptions(layer, sublayer).blendmode,
      opacity: layerstyles.opacity
        ? layerstyles.opacity / 100
        : getElementOptions(layer, sublayer).opacity,
    };
  },

  parseZIndex(str) {
    const z = this.zflag.exec(str);
    return z ? parseInt(z[0].match(/-?\d+/)[0]) : null;
  },

  /**
   * 2022.11.12 UNUSED.
   * Cleaning function for DNA strings. When DNA strings include an option, it
   * is added to the filename with a ?setting=value query string. It needs to be
   * removed to properly access the file name before Drawing.
   *
   * @param {String} _dna The entire newDNA string
   * @returns Cleaned DNA string without querystring parameters.
   */
  removeQueryStrings(_dna) {
    const query = /(\?.*$)/;
    return _dna.replace(query, "");
  },
};
