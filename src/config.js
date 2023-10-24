"use strict";

const path = require("path");
const isLocal = typeof process.pkg === "undefined";
const basePath = isLocal ? process.cwd() : path.dirname(process.execPath);

// see src/blendMode.js for available blend modes
// documentation: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation
const { MODE } = require(path.join(basePath, "src/blendMode.js"));

const buildDir = path.join(basePath, "/build");
const layersDir = path.join(basePath, "/layers");

/*********************
 * General Generator Options
 ***********************/

const description =
  "This is the description of your NFT project, remember to replace this";
const baseUri = "ipfs://NewUriToReplace";

const outputJPEG = false; // if false, the generator outputs png's

/**
 * Set your tokenID index start number.
 * ⚠️ Be sure it matches your smart contract!
 */
const startIndex = 0;

const format = {
  width: 2800,
  height: 2800,
  smoothing: false, // set to false when up-scaling pixel art.
};

const background = {
  generate: true,
  brightness: "100%",
};

const layerConfigurations = [
  {
    growEditionSizeTo: 22,
    namePrefix: "Series 2", // Use to add a name to Metadata `name:`
    layersOrder: [
      { name: "BG" },
      { name: "Wings"},
      { name: "Body" },
      { name: "Head"}
      { name: "Hat" },
      { name: "Mask" },
     ],
  },
  // {
  //   growEditionSizeTo: 10,
  //   namePrefix: "Lion",
  //   resetNameIndex: true, // this will start the Lion count at #1 instead of #6
  //   layersOrder: [
  //     { name: "Background" },
  //     { name: "Hats" },
  //     { name: "Male Hair" },
  //   ],
  // },
];

/**
 * Set to true for when using multiple layersOrder configuration
 * and you would like to shuffle all the artwork together
 */
const shuffleLayerConfigurations = false;

const debugLogs = true;

/*********************
 * Advanced Generator Options
 ***********************/

// if you use an empty/transparent file, set the name here.
const emptyLayerName = "NONE";

/**
 * Incompatible items can be added to this object by a files cleanName
 * This works in layer order, meaning, you need to define the layer that comes
 * first as the Key, and the incompatible items that _may_ come after.
 * The current version requires all layers to have unique names, or you may
 * accidentally set incompatibilities for the _wrong_ item.
 */
const incompatible = {
   Head: ["Alien dog with face ripped off","Alien Nun","Alien Witch","Anglerfish","Axolotl","Ball Mummy with Cobra and insect","Ball Mummy with Cobra","Blob Head","Blockhead","Bu77head Mutant","Clay Dimension SIlly Guy","Crazy Werewolf","Cthulu","Donald Dorko","Double Mouthed Angler Squid","Fly","FrankenAlien","Frog of Wisdom","Fruit Bat","Gang Gangar Slimer","Happy Mutant with Bone Hairdo","Ghast-Lee","HEVI44","Huey Crowley with LEGENDSHIT! Glasses","Huey Crowley","I'm too smart for this","Jester","Karloff Mummy","Mantid X","Mantid Y","Martian Attacker","Mega Cthulu","Minion Mafioso with Headphones","Miya Fett","Mochamp","Nightmare Puppeteer Camera Head","PikAlien","Plague Doctor with Skull Hat","Pteradactdyude","Rhombus Face 2023","Reptile","Santa Claus","Scarecrow with Straw Hat and Bird","Sewn face girl with Bob haircut","Sewn face girl with Crazy braids","Sewn face girl with Nurse hat and Bob haircut","Sewn face girl with Nurse hat and Crazy braids.png","Slack Jellington","Slime Daemon","Smiling Boogie","T-rex Rawr!","T-Rex Skull","Thrasherella","Tri-Eyed Cat with Circuitboard Earring by GataTECH","Triceratopzz","Uggo Bear","VelociRAWRptor","Wooden Mannequin","Zombie Bunny"],
  //   // directory incompatible with directory example
  Hat: [],
  Mask: [],
};
const incompatible = {
  Head: ["Kool Skull Deepsea Thrash Squid","Kreddy Freuger","Majin-B0000000!!!","Swampy Thang",],
  Body: [],
  Hat: [],
  Mask: [],
};

/**
 * Require combinations of files when constructing DNA, this bypasses the
 * randomization and weights.
 *
 * The layer order matters here, the key (left side) is an item within
 * the layer that comes first in the stack.
 * the items in the array are "required" items that should be pulled from folders
 * further in the stack
 */
const forcedCombinations = {
  // floral: ["MetallicShades", "Golden Sakura"],
};

/**
 * In the event that a filename cannot be the trait value name, for example when
 * multiple items should have the same value, specify
 * clean-filename: trait-value override pairs. Wrap filenames with spaces in quotes.
 */
const traitValueOverrides = {
  //
};

const extraMetadata = {};

const extraAttributes = () => [
  // Optionally, if you need to overwrite one of your layers attributes.
  // You can include the same name as the layer, here, and it will overwrite
  //
  // {
  // trait_type: "Bottom lid",
  //   value: ` Bottom lid # ${Math.random() * 100}`,
  // },
  // {
  //   display_type: "boost_number",
  //   trait_type: "Aqua Power",
  //   value: Math.random() * 100,
  // },
  // {
  //   display_type: "boost_number",
  //   trait_type: "Health",
  //   value: Math.random() * 100,
  // },
  // {
  //   display_type: "boost_number",
  //   trait_type: "Mana",
  //   value: Math.floor(Math.random() * 100),
  // },
];

// Outputs an Keccack256 hash for the image. Required for provenance hash
const hashImages = true;

const rarityDelimiter = "#";

const uniqueDnaTorrance = 10000;

/**
 * Set to true to always use the root folder as trait_type
 * Set to false to use weighted parent folders as trait_type
 * Default is true.
 */
const useRootTraitType = true;

const preview = {
  thumbPerRow: 5,
  thumbWidth: 50,
  imageRatio: format.width / format.height,
  imageName: "preview.png",
};

const preview_gif = {
  numberOfImages: 5,
  order: "ASC", // ASC, DESC, MIXED
  repeat: 0,
  quality: 100,
  delay: 500,
  imageName: "preview.gif",
};

module.exports = {
  background,
  baseUri,
  buildDir,
  debugLogs,
  description,
  emptyLayerName,
  extraAttributes,
  extraMetadata,
  forcedCombinations,
  format,
  hashImages,
  incompatible,
  layerConfigurations,
  layersDir,
  outputJPEG,
  preview,
  preview_gif,
  rarityDelimiter,
  shuffleLayerConfigurations,
  startIndex,
  traitValueOverrides,
  uniqueDnaTorrance,
  useRootTraitType,
};
