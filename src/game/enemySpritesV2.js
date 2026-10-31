// src/game/enemySpritesV2.js
// Authentic high-resolution sprites and animations for the first 10 enemies in "These Hands"
// Hand-crafted pixel art with thorough cropping, baseline ground anchoring, and complete pose sets

export const V2_CONFIGS = [
  {
    "idx": 0,
    "id": "01-training-dummy",
    "name": "Training Dummy",
    "refH": 909,
    "cheekX": 0.22,
    "cheekY": 0.55,
    "colors": [
      "#e0b060",
      "#c07030",
      "#b07050",
      "#e02020",
      "#804030"
    ],
    "poses": {
      "idle": {
        "src": "/enemy-sprites-v2/poses/01-training-dummy-idle.webp",
        "w": 546,
        "h": 907
      },
      "attack": {
        "src": "/enemy-sprites-v2/poses/01-training-dummy-attack.webp",
        "w": 884,
        "h": 909
      },
      "dizzy": {
        "src": "/enemy-sprites-v2/poses/01-training-dummy-dizzy.webp",
        "w": 698,
        "h": 870
      }
    },
    "thumb": "/enemy-sprites-v2/thumbs/01-training-dummy-thumb.webp"
  },
  {
    "idx": 1,
    "id": "02-rubber-duck",
    "name": "Rubber Duck",
    "refH": 764,
    "cheekX": 0.2,
    "cheekY": 0.48,
    "colors": [
      "#f0b000",
      "#00e000",
      "#d05000",
      "#e0aa2e",
      "#ffcf3f"
    ],
    "poses": {
      "idle": {
        "src": "/enemy-sprites-v2/poses/02-rubber-duck-idle.webp",
        "w": 593,
        "h": 701
      },
      "attack1": {
        "src": "/enemy-sprites-v2/poses/02-rubber-duck-attack-water.webp",
        "w": 1086,
        "h": 623
      },
      "attack2": {
        "src": "/enemy-sprites-v2/poses/02-rubber-duck-attack-water.webp",
        "w": 1530,
        "h": 1420
      },
      "attack": {
        "src": "/enemy-sprites-v2/poses/02-rubber-duck-attack-water.webp",
        "w": 1530,
        "h": 1420
      },
      "dizzy": {
        "src": "/enemy-sprites-v2/poses/02-rubber-duck-dizzy.webp",
        "w": 626,
        "h": 764
      }
    },
    "thumb": "/enemy-sprites-v2/thumbs/02-rubber-duck-thumb.webp"
  },
  {
    "idx": 2,
    "id": "03-rubber-chicken",
    "name": "Rubber Chicken",
    "refH": 902,
    "cheekX": 0.2,
    "cheekY": 0.6,
    "colors": [
      "#f0b000",
      "#f02010",
      "#f05000",
      "#d63c30",
      "#ecc967"
    ],
    "poses": {
      "idle": {
        "src": "/enemy-sprites-v2/poses/03-rubber-chicken-idle.webp",
        "w": 507,
        "h": 902
      },
      "attack": {
        "src": "/enemy-sprites-v2/poses/03-rubber-chicken-attack-egg.webp",
        "w": 1111,
        "h": 1535
      },
      "dizzy": {
        "src": "/enemy-sprites-v2/poses/03-rubber-chicken-dizzy.webp",
        "w": 493,
        "h": 902
      }
    },
    "thumb": "/enemy-sprites-v2/thumbs/03-rubber-chicken-thumb.webp"
  },
  {
    "idx": 3,
    "id": "04-cardboard-knight",
    "name": "Cardboard Knight",
    "refH": 888,
    "cheekX": 0.25,
    "cheekY": 0.52,
    "colors": [
      "#a07050",
      "#b08060",
      "#b09060",
      "#d63c30",
      "#704030"
    ],
    "poses": {
      "idle": {
        "src": "/enemy-sprites-v2/poses/04-cardboard-knight-idle.webp",
        "w": 796,
        "h": 888
      },
      "attack": {
        "src": "/enemy-sprites-v2/poses/04-cardboard-knight-attack.webp",
        "w": 745,
        "h": 869
      },
      "dizzy": {
        "src": "/enemy-sprites-v2/poses/04-cardboard-knight-dizzy.webp",
        "w": 813,
        "h": 871
      }
    },
    "thumb": "/enemy-sprites-v2/thumbs/04-cardboard-knight-thumb.webp"
  },
  {
    "idx": 4,
    "id": "05-slime-blob",
    "name": "Slime Blob",
    "refH": 900,
    "cheekX": 0.24,
    "cheekY": 0.45,
    "colors": [
      "#62ff00",
      "#38b000",
      "#9ef01a",
      "#ccff33",
      "#007200"
    ],
    "poses": {
      "idle": {
        "src": "/enemy-sprites-v2/poses/05-slime-blob-idle.webp",
        "w": 601,
        "h": 908
      },
      "attack": {
        "src": "/enemy-sprites-v2/poses/05-slime-blob-attack-2.webp",
        "w": 593,
        "h": 891
      },
      "dizzy": {
        "src": "/enemy-sprites-v2/poses/05-slime-blob-dizzy.webp",
        "w": 752,
        "h": 606
      }
    },
    "thumb": "/enemy-sprites-v2/thumbs/05-slime-blob-thumb.webp"
  },
  {
    "idx": 5,
    "id": "06-sassy-goblin-sprout",
    "name": "Sassy Goblin Sprout",
    "refH": 877,
    "cheekX": 0.22,
    "cheekY": 0.48,
    "colors": [
      "#90e030",
      "#30b030",
      "#a0e030",
      "#b07040",
      "#70c020"
    ],
    "poses": {
      "idle": {
        "src": "/enemy-sprites-v2/poses/06-sassy-goblin-sprout-idle.webp",
        "w": 902,
        "h": 877
      },
      "attack": {
        "src": "/enemy-sprites-v2/poses/06-sassy-goblin-sprout-attack-slingshot.webp",
        "w": 1547,
        "h": 1548
      },
      "dizzy": {
        "src": "/enemy-sprites-v2/poses/06-sassy-goblin-sprout-dizzy.webp",
        "w": 905,
        "h": 775
      }
    },
    "thumb": "/enemy-sprites-v2/thumbs/06-sassy-goblin-sprout-thumb.webp"
  },
  {
    "idx": 6,
    "id": "07-mime",
    "name": "Mime",
    "refH": 904,
    "cheekX": 0.2,
    "cheekY": 0.58,
    "colors": [
      "#f4efe6",
      "#303030",
      "#d63c30",
      "#26232b",
      "#b0c0c0"
    ],
    "poses": {
      "idle": {
        "src": "/enemy-sprites-v2/poses/07-mime-idle.webp",
        "w": 458,
        "h": 883
      },
      "attack": {
        "src": "/enemy-sprites-v2/poses/07-mime-attack-rope.webp",
        "w": 1256,
        "h": 1556
      },
      "dizzy": {
        "src": "/enemy-sprites-v2/poses/07-mime-dizzy.webp",
        "w": 584,
        "h": 904
      }
    },
    "thumb": "/enemy-sprites-v2/thumbs/07-mime-thumb.webp"
  },
  {
    "idx": 7,
    "id": "08-cocky-goose",
    "name": "Cocky Goose",
    "refH": 902,
    "cheekX": 0.2,
    "cheekY": 0.55,
    "colors": [
      "#f2f0ea",
      "#d0d0e0",
      "#ef7d1a",
      "#e06010",
      "#501000"
    ],
    "poses": {
      "idle": {
        "src": "/enemy-sprites-v2/poses/08-cocky-goose-idle.webp",
        "w": 544,
        "h": 902
      },
      "attack": {
        "src": "/enemy-sprites-v2/poses/08-cocky-goose-attack-honk.webp",
        "w": 1209,
        "h": 725
      },
      "dizzy": {
        "src": "/enemy-sprites-v2/poses/08-cocky-goose-dizzy.webp",
        "w": 765,
        "h": 882
      }
    },
    "thumb": "/enemy-sprites-v2/thumbs/08-cocky-goose-thumb.webp"
  },
  {
    "idx": 8,
    "id": "09-trash-panda",
    "name": "Trash Panda",
    "refH": 908,
    "cheekX": 0.24,
    "cheekY": 0.5,
    "colors": [
      "#9aa0a3",
      "#4c5054",
      "#a0a0b0",
      "#7d8894",
      "#00e040"
    ],
    "poses": {
      "idle": {
        "src": "/enemy-sprites-v2/poses/09-trash-panda-idle.webp",
        "w": 693,
        "h": 885
      },
      "attack": {
        "src": "/enemy-sprites-v2/poses/09-trash-panda-attack.webp",
        "w": 963,
        "h": 908
      },
      "dizzy": {
        "src": "/enemy-sprites-v2/poses/09-trash-panda-dizzy.webp",
        "w": 858,
        "h": 724
      }
    },
    "thumb": "/enemy-sprites-v2/thumbs/09-trash-panda-thumb.webp"
  },
  {
  "idx": 9,
  "id": "10-mischievous-monkey",
  "name": "Mischievous Monkey",
  "refH": 908,
  "cheekX": 0.22,
  "cheekY": 0.5,
  "colors": [
    "#a05010",
    "#00c070",
    "#602010",
    "#eecfa5",
    "#ffd23e"
  ],
  "poses": {
    "idle": {
      "src": "/enemy-sprites-v2/poses/10-mischievous-monkey-idle.webp",
      "w": 908,
      "h": 908,
      "gCx": 0.488,
      "gFull": 1
    },
    "attack1": {
      "src": "/enemy-sprites-v2/poses/10-mischievous-monkey-attack.webp",
      "w": 965,
      "h": 908,
      "gCx": 0.636,
      "gFull": 1
    },
    "attack": {
      "src": "/enemy-sprites-v2/poses/10-mischievous-monkey-attack.webp",
      "w": 965,
      "h": 908,
      "gCx": 0.636,
      "gFull": 1
    },
    "dizzy": {
      "src": "/enemy-sprites-v2/poses/10-mischievous-monkey-dizzy.webp",
      "w": 1039,
      "h": 908,
      "gCx": 0.448,
      "gFull": 1
    },
    "bananaSling": {
      "src": "/enemy-sprites-v2/poses/10-monkey-extras-banana-sling.webp",
      "w": 908,
      "h": 908,
      "gCx": 0.398,
      "gFull": 1
    },
    "spPose": {
      "src": "/enemy-sprites-v2/poses/10-monkey-extras-banana-sling.webp",
      "w": 908,
      "h": 908,
      "gCx": 0.398,
      "gFull": 1
    },
    "atkWindup": {
      "src": "/enemy-sprites-v2/poses/10-monkey-anim-atk-windup.webp",
      "w": 914,
      "h": 908,
      "gCx": 0.512,
      "gFull": 1
    },
    "atkFollow": {
      "src": "/enemy-sprites-v2/poses/10-monkey-anim-atk-follow.webp",
      "w": 1012,
      "h": 908,
      "gCx": 0.503,
      "gFull": 1
    }
  },
  "thumb": "/enemy-sprites-v2/thumbs/10-mischievous-monkey-thumb.webp"
},
  {
  "idx": 10,
  "id": "11-bodybuilder",
  "name": "Bodybuilder",
  "refH": 573,
  "cheekX": 0.22,
  "cheekY": 0.58,
  "colors": [
    "#e0a370",
    "#dc2626",
    "#b87333",
    "#1e293b"
  ],
  "poses": {
    "attack1": {
      "src": "/enemy-sprites-v2/poses/11-bodybuilder-attack1.webp",
      "w": 304,
      "h": 596
    },
    "attack2": {
      "src": "/enemy-sprites-v2/poses/11-bodybuilder-attack2.webp",
      "w": 433,
      "h": 544
    },
    "dizzy": {
      "src": "/enemy-sprites-v2/poses/11-bodybuilder-dizzy.webp",
      "w": 234,
      "h": 539
    },
    "idle": {
      "src": "/enemy-sprites-v2/poses/11-bodybuilder-idle.webp",
      "w": 332,
      "h": 573
    },
    "attack": {
      "src": "/enemy-sprites-v2/poses/11-bodybuilder-attack2.webp",
      "w": 433,
      "h": 544
    }
  },
  "thumb": "/enemy-sprites-v2/thumbs/11-bodybuilder-thumb.webp"
},
  {
  "idx": 11,
  "id": "12-luchador",
  "name": "Luchador Wrestler",
  "refH": 900,
  "cheekX": 0.18,
  "cheekY": 0.55,
  "colors": [
    "#000000",
    "#efc383",
    "#8e5e40",
    "#1f161a",
    "#b71f21"
  ],
  "poses": {
    "idle": {
      "src": "/enemy-sprites-v2/poses/12-luchador-idle.webp",
      "w": 536,
      "h": 900
    },
    "attack": {
      "src": "/enemy-sprites-v2/poses/12-luchador-attack.webp",
      "w": 620,
      "h": 773
    },
    "dizzy": {
      "src": "/enemy-sprites-v2/poses/12-luchador-dizzy.webp",
      "w": 650,
      "h": 834
    }
  },
  "thumb": "/enemy-sprites-v2/thumbs/12-luchador-thumb.webp"
},
  {
    "idx": 12,
    "id": "13-kickboxer",
    "name": "Kickboxer",
    "refH": 900,
    "cheekX": 0.18,
    "cheekY": 0.55,
    "colors": [
      "#c0272d",
      "#e8b23a",
      "#eec39f",
      "#8e2321",
      "#2b2b33"
    ],
    "poses": {
      "idle": {
        "src": "/enemy-sprites-v2/poses/13-kickboxer-idle.webp",
        "w": 518,
        "h": 900
      },      "attack": {
        "src": "/enemy-sprites-v2/poses/13-kickboxer-attack.webp",
        "w": 643,
        "h": 940
      },      "dizzy": {
        "src": "/enemy-sprites-v2/poses/13-kickboxer-dizzy.webp",
        "w": 780,
        "h": 880
      }
    },
    "thumb": "/enemy-sprites-v2/thumbs/13-kickboxer-thumb.webp"
  },
  {
  "idx": 13,
  "id": "14-adult-boxer",
  "name": "Adult Boxer",
  "refH": 619,
  "cheekX": 0.22,
  "cheekY": 0.58,
  "colors": [
    "#c92a2a",
    "#1e293b",
    "#e0a370",
    "#f59e0b"
  ],
  "poses": {
    "attack1": {
      "src": "/enemy-sprites-v2/poses/14-adult-boxer-attack1.webp",
      "w": 365,
      "h": 610
    },
    "attack2": {
      "src": "/enemy-sprites-v2/poses/14-adult-boxer-attack2.webp",
      "w": 343,
      "h": 562
    },
    "dizzy": {
      "src": "/enemy-sprites-v2/poses/14-adult-boxer-dizzy.webp",
      "w": 269,
      "h": 653
    },
    "idle": {
      "src": "/enemy-sprites-v2/poses/14-adult-boxer-idle.webp",
      "w": 332,
      "h": 619
    },
    "attack": {
      "src": "/enemy-sprites-v2/poses/14-adult-boxer-attack2.webp",
      "w": 343,
      "h": 562
    }
  },
  "thumb": "/enemy-sprites-v2/thumbs/14-adult-boxer-thumb.webp"
},
  {
    "idx": 14,
    "id": "15-sumo-champion",
    "name": "Sumo Champion",
    "refH": 900,
    "cheekX": 0.18,
    "cheekY": 0.55,
    "colors": [
      "#000000",
      "#f7cdad",
      "#9c6f5e",
      "#131115",
      "#000203"
    ],
    "poses": {
      "idle": {
        "src": "/enemy-sprites-v2/poses/15-sumo-idle.webp",
        "w": 957,
        "h": 900
      },      "attack": {
        "src": "/enemy-sprites-v2/poses/15-sumo-attack.webp",
        "w": 1206,
        "h": 870
      },      "dizzy": {
        "src": "/enemy-sprites-v2/poses/15-sumo-dizzy.webp",
        "w": 888,
        "h": 808
      }
    },
    "thumb": "/enemy-sprites-v2/thumbs/15-sumo-champion-thumb.webp"
  },
  {
    "idx": 15,
    "id": "16-castle-guard",
    "name": "Castle Guard",
    "refH": 900,
    "cheekX": 0.5,
    "cheekY": 0.3,
    "colors": ["#2f5d8a", "#7a4a21", "#8b93a0", "#3b2a1a", "#101820"],
    "poses": {
      "idle": {"src": "/enemy-sprites-v2/poses/16-castle-guard-idle.webp", "w": 491, "h": 900},
      "attack1": {"src": "/enemy-sprites-v2/poses/16-castle-guard-attack.webp", "w": 545, "h": 900},
      "attack": {"src": "/enemy-sprites-v2/poses/16-castle-guard-attack.webp", "w": 545, "h": 900},
      "dizzy": {"src": "/enemy-sprites-v2/poses/16-castle-guard-dizzy.webp", "w": 600, "h": 900}
    },
    "thumb": "/enemy-sprites-v2/thumbs/16-castle-guard-thumb.webp"
  },
  {
    "idx": 16,
    "id": "17-royal-executioner",
    "name": "Royal Executioner",
    "refH": 521,
    "cheekX": 0.2,
    "cheekY": 0.56,
    "colors": ["#000000", "#503030", "#303030", "#101010", "#301010"],
    "poses": {
      "attack1": {"src": "/enemy-sprites-v2/poses/17-royal-executioner-attack.webp", "w": 991, "h": 906},
      "attack2": {
        "src": "/enemy-sprites-v2/poses/17-royal-executioner-attack.webp",
        "w": 266,
        "h": 421
      },
      "dizzy": {"src": "/enemy-sprites-v2/poses/17-royal-executioner-dizzy.webp", "w": 911, "h": 586},
      "idle": {"src": "/enemy-sprites-v2/poses/17-royal-executioner-idle.webp", "w": 778, "h": 900},
      "attack": {"src": "/enemy-sprites-v2/poses/17-royal-executioner-attack.webp", "w": 991, "h": 906}
    },
    "thumb": "/enemy-sprites-v2/thumbs/17-royal-executioner-thumb.webp"
  },
  {
  "idx": 17,
  "id": "18-armored-warrior",
  "name": "Armored Warrior",
  "refH": 900,
  "cheekX": 0.5,
  "cheekY": 0.34,
  "colors": ["#000000", "#0060d0", "#f0c0a0", "#b0c0c0", "#f0f0f0"],
  "poses": {
    "idle": {
      "src": "/enemy-sprites-v2/poses/18-armored-warrior-idle.webp",
      "w": 666,
      "h": 900
    },
    "attack1": {
      "src": "/enemy-sprites-v2/poses/18-armored-warrior-attack.webp",
      "w": 1041,
      "h": 894
    },
    "attack": {
      "src": "/enemy-sprites-v2/poses/18-armored-warrior-attack.webp",
      "w": 1041,
      "h": 894
    },
    "dizzy": {
      "src": "/enemy-sprites-v2/poses/18-armored-warrior-dizzy.webp",
      "w": 978,
      "h": 739
    }
  },
  "thumb": "/enemy-sprites-v2/thumbs/18-armored-warrior-thumb.webp"
},
  {
  "idx": 18,
  "id": "19-barbarian",
  "name": "Barbarian",
  "refH": 900,
  "cheekX": 0.5,
  "cheekY": 0.38,
  "colors": [
    "#5f3825",
    "#000000",
    "#b18364",
    "#271510",
    "#000203"
  ],
  "poses": {
    "idle": {
      "src": "/enemy-sprites-v2/poses/19-barbarian-idle.webp",
      "w": 717,
      "h": 900
    },
    "attack1": {
      "src": "/enemy-sprites-v2/poses/19-barbarian-attack.webp",
      "w": 583,
      "h": 830
    },
    "attack": {
      "src": "/enemy-sprites-v2/poses/19-barbarian-attack.webp",
      "w": 583,
      "h": 830
    },
    "dizzy": {
      "src": "/enemy-sprites-v2/poses/19-barbarian-dizzy.webp",
      "w": 953,
      "h": 717
    }
  },
  "thumb": "/enemy-sprites-v2/thumbs/19-barbarian-thumb.webp"
},
    {
  "idx": 19,
  "id": "19-dark-knight",
  "name": "Dark Knight",
  "refH": 900,
  "cheekX": 0.5,
  "cheekY": 0.33,
  "colors": ["#000000", "#202030", "#101020", "#303040", "#100020"],
  "thumb": "/enemy-sprites-v2/thumbs/19-dark-knight-thumb.webp",
  "poses": {
    "idle": {
      "src": "/enemy-sprites-v2/poses/19-dark-knight-idle.webp",
      "w": 499,
      "h": 900,
      "gCx": 0.492,
      "gFull": 1
    },
    "attack1": {
      "src": "/enemy-sprites-v2/poses/19-dark-knight-attack.webp",
      "w": 716,
      "h": 940,
      "gCx": 0.537,
      "gFull": 1
    },
    "attack": {
      "src": "/enemy-sprites-v2/poses/19-dark-knight-attack.webp",
      "w": 716,
      "h": 940,
      "gCx": 0.537,
      "gFull": 1
    },
    "dizzy": {
      "src": "/enemy-sprites-v2/poses/19-dark-knight-dizzy.webp",
      "w": 574,
      "h": 749,
      "gCx": 0.514,
      "gFull": 1
    },
    "atkWindup": {
      "src": "/enemy-sprites-v2/poses/19-dark-knight-anim-atk-windup.webp",
      "w": 499,
      "h": 900,
      "gCx": 0.531,
      "gFull": 1
    },
    "atkFollow": {
      "src": "/enemy-sprites-v2/poses/19-dark-knight-anim-atk-follow.webp",
      "w": 499,
      "h": 900,
      "gCx": 0.501,
      "gFull": 1
    },
    "spPose": {
      "src": "/enemy-sprites-v2/poses/19-dark-knight-anim-bulwark-windup.webp",
      "w": 498,
      "h": 900,
      "gCx": 0.485,
      "gFull": 1
    }
  }
},
  {
    "idx": 20,
    "id": "21-skeleton-warrior",
    "name": "Skeleton Warrior",
    "refH": 620,
    "cheekX": 0.22,
    "cheekY": 0.52,
    "colors": ["#000000",
      "#b2aea0",
      "#8c8172",
      "#51423a",
      "#ae7652"],
    "thumb": "/enemy-sprites-v2/thumbs/21-skeleton-warrior-thumb.webp",
    "poses": {
      "idle": { "src": "/enemy-sprites-v2/poses/21-skeleton-warrior-idle.webp", "w": 577, "h": 900 },
      "attack1": { "src": "/enemy-sprites-v2/poses/21-skeleton-warrior-attack.webp", "w": 584, "h": 935 },
      "attack2": { "src": "/enemy-sprites-v2/poses/21-skeleton-warrior-attack.webp", "w": 584, "h": 935 },
      "dizzy": { "src": "/enemy-sprites-v2/poses/21-skeleton-warrior-dizzy.webp", "w": 529, "h": 831 }
    }
  },
  {
    "idx": 21,
    "id": "22-zombie",
    "name": "Zombie",
    "refH": 620,
    "cheekX": 0.25,
    "cheekY": 0.54,
    "colors": ["#000000",
      "#744885",
      "#995c41",
      "#99cc70",
      "#5e8652"],
    "thumb": "/enemy-sprites-v2/thumbs/22-zombie-thumb.webp",
    "poses": {
      "idle": { "src": "/enemy-sprites-v2/poses/22-zombie-idle.webp", "w": 557, "h": 900 },
      "attack1": { "src": "/enemy-sprites-v2/poses/22-zombie-attack.webp", "w": 836, "h": 811 },
      "attack2": { "src": "/enemy-sprites-v2/poses/22-zombie-attack.webp", "w": 836, "h": 811 },
      "dizzy": { "src": "/enemy-sprites-v2/poses/22-zombie-dizzy.webp", "w": 604, "h": 763 }
    }
  },
  {
    "idx": 22,
    "id": "23-armored-skeleton",
    "name": "Armored Skeleton",
    "refH": 640,
    "cheekX": 0.22,
    "cheekY": 0.54,
    "colors": ["#000000", "#f0f0e0", "#100000", "#503020", "#f0f0f0"],
    "thumb": "/enemy-sprites-v2/thumbs/23-armored-skeleton-thumb.webp",
    "poses": {
      "idle": { "src": "/enemy-sprites-v2/poses/23-armored-skeleton-idle.webp", "w": 657, "h": 900 },
      "attack1": { "src": "/enemy-sprites-v2/poses/23-armored-skeleton-attack.webp", "w": 878, "h": 843 },
      "attack2": { "src": "/enemy-sprites-v2/poses/23-armored-skeleton-attack.webp", "w": 878, "h": 843 },
      "dizzy": { "src": "/enemy-sprites-v2/poses/23-armored-skeleton-dizzy.webp", "w": 852, "h": 596 }
    }
  },
  {
    "idx": 23,
    "id": "24-tomb-ghoul",
    "name": "Scarab Swarm",
    "refH": 600,
    "cheekX": 0.25,
    "cheekY": 0.54,
    "colors": ["#000000",
      "#da9a01",
      "#7f440e",
      "#a05c07",
      "#2f6f55"],
    "thumb": "/enemy-sprites-v2/thumbs/24-tomb-ghoul-thumb.webp",
    "poses": {
      "idle": { "src": "/enemy-sprites-v2/poses/24-scarab-swarm-idle.webp", "w": 606, "h": 900 },
      "attack1": { "src": "/enemy-sprites-v2/poses/24-scarab-swarm-attack.webp", "w": 1379, "h": 843 },
      "attack2": { "src": "/enemy-sprites-v2/poses/24-scarab-swarm-attack.webp", "w": 1379, "h": 843 },
      "dizzy": { "src": "/enemy-sprites-v2/poses/24-scarab-swarm-dizzy.webp", "w": 831, "h": 689 }
    }
  },
  {
    "idx": 24,
    "id": "25-mummy-guard",
    "name": "Mummy Guard",
    "refH": 640,
    "cheekX": 0.22,
    "cheekY": 0.55,
    "colors": ["#000000", "#f0f0d0", "#908060", "#d0c090", "#f0e0c0"],
    "thumb": "/enemy-sprites-v2/thumbs/25-mummy-guard-thumb.webp",
    "poses": {
      "idle": { "src": "/enemy-sprites-v2/poses/25-mummy-guard-idle.webp", "w": 470, "h": 926 },
      "attack1": { "src": "/enemy-sprites-v2/poses/25-mummy-guard-attack.webp", "w": 747, "h": 910 },
      "attack2": { "src": "/enemy-sprites-v2/poses/25-mummy-guard-attack.webp", "w": 747, "h": 910 },
      "dizzy": { "src": "/enemy-sprites-v2/poses/25-mummy-guard-dizzy.webp", "w": 609, "h": 844 }
    }
  },
{
  "idx": 30,
  "id": "31-werewolf",
  "name": "Werewolf",
  "refH": 900,
  "cheekX": 0.5,
  "cheekY": 0.36,
  "colors": [
    "#000000",
    "#5f4e41",
    "#9c9578",
    "#241a18",
    "#050000"
  ],
  "poses": {
    "idle": {
      "src": "/enemy-sprites-v2/poses/31-werewolf-idle.webp",
      "w": 760,
      "h": 900
    },
    "attack1": {
      "src": "/enemy-sprites-v2/poses/31-werewolf-attack.webp",
      "w": 996,
      "h": 866
    },
    "attack": {
      "src": "/enemy-sprites-v2/poses/31-werewolf-attack.webp",
      "w": 996,
      "h": 866
    },
    "dizzy": {
      "src": "/enemy-sprites-v2/poses/31-werewolf-dizzy.webp",
      "w": 847,
      "h": 712
    }
  },
  "thumb": "/enemy-sprites-v2/thumbs/31-werewolf-thumb.webp"
},
  {
  "idx": 31,
  "id": "32-giant-spider",
  "name": "Giant Spider",
  "refH": 900,
  "cheekX": 0.5,
  "cheekY": 0.4,
  "colors": [
    "#000000",
    "#1a121f",
    "#5f5249",
    "#0a060c",
    "#000204"
  ],
  "poses": {
    "idle": {
      "src": "/enemy-sprites-v2/poses/32-giant-spider-idle.webp",
      "w": 1087,
      "h": 900
    },
    "attack1": {
      "src": "/enemy-sprites-v2/poses/32-giant-spider-attack.webp",
      "w": 1103,
      "h": 1024
    },
    "attack": {
      "src": "/enemy-sprites-v2/poses/32-giant-spider-attack.webp",
      "w": 1103,
      "h": 1024
    },
    "dizzy": {
      "src": "/enemy-sprites-v2/poses/32-giant-spider-dizzy.webp",
      "w": 962,
      "h": 813
    }
  },
  "thumb": "/enemy-sprites-v2/thumbs/32-giant-spider-thumb.webp"
},
  {
  "idx": 32,
  "id": "33-orc-warrior",
  "name": "Orc Warrior",
  "refH": 900,
  "cheekX": 0.5,
  "cheekY": 0.32,
  "colors": [
    "#000000",
    "#3d2f20",
    "#6a8849",
    "#110b0a",
    "#000402"
  ],
  "poses": {
    "idle": {
      "src": "/enemy-sprites-v2/poses/33-orc-warrior-idle.webp",
      "w": 750,
      "h": 900
    },
    "attack1": {
      "src": "/enemy-sprites-v2/poses/33-orc-warrior-attack.webp",
      "w": 815,
      "h": 964
    },
    "attack": {
      "src": "/enemy-sprites-v2/poses/33-orc-warrior-attack.webp",
      "w": 815,
      "h": 964
    },
    "dizzy": {
      "src": "/enemy-sprites-v2/poses/33-orc-warrior-dizzy.webp",
      "w": 999,
      "h": 692
    }
  },
  "thumb": "/enemy-sprites-v2/thumbs/33-orc-warrior-thumb.webp"
},
  {
  "idx": 33,
  "id": "34-bog-witch",
  "name": "Bog Witch",
  "refH": 900,
  "cheekX": 0.5,
  "cheekY": 0.3,
  "colors": ["#000000", "#604080", "#704080", "#302040", "#b0d070"],
  "poses": {
    "idle": {
      "src": "/enemy-sprites-v2/poses/34-bog-witch-idle.webp",
      "w": 768,
      "h": 900
    },
    "attack1": {
      "src": "/enemy-sprites-v2/poses/34-bog-witch-attack.webp",
      "w": 950,
      "h": 887
    },
    "attack": {
      "src": "/enemy-sprites-v2/poses/34-bog-witch-attack.webp",
      "w": 950,
      "h": 887
    },
    "dizzy": {
      "src": "/enemy-sprites-v2/poses/34-bog-witch-dizzy.webp",
      "w": 883,
      "h": 831
    }
  },
  "thumb": "/enemy-sprites-v2/thumbs/34-bog-witch-thumb.webp"
},
  {
  "idx": 34,
  "id": "35-shadow-beast",
  "name": "Shadow Beast",
  "refH": 900,
  "cheekX": 0.4,
  "cheekY": 0.42,
  "colors": [
    "#000000",
    "#321e4c",
    "#6a5a86",
    "#0e051d",
    "#000002"
  ],
  "poses": {
    "idle": {
      "src": "/enemy-sprites-v2/poses/35-shadow-beast-idle.webp",
      "w": 981,
      "h": 900
    },
    "attack1": {
      "src": "/enemy-sprites-v2/poses/35-shadow-beast-attack.webp",
      "w": 1436,
      "h": 1060
    },
    "attack": {
      "src": "/enemy-sprites-v2/poses/35-shadow-beast-attack.webp",
      "w": 1436,
      "h": 1060
    },
    "dizzy": {
      "src": "/enemy-sprites-v2/poses/35-shadow-beast-dizzy.webp",
      "w": 1228,
      "h": 675
    }
  },
  "thumb": "/enemy-sprites-v2/thumbs/35-shadow-beast-thumb.webp"
},
  {
    "idx": 35,
    "id": "36-giant-serpent",
    "name": "Giant Serpent",
    "refH": 900,
    "cheekX": 0.5,
    "cheekY": 0.3,
    "colors": [
      "#000000",
      "#01b051",
      "#2b3920",
      "#a9c55a",
      "#3d8338"
    ],
    "poses": {
      "idle": {
        "src": "/enemy-sprites-v2/poses/36-giant-serpent-idle.webp",
        "w": 735,
        "h": 900
      },
      "attack1": {
        "src": "/enemy-sprites-v2/poses/36-giant-serpent-attack.webp",
        "w": 962,
        "h": 800
      },
      "attack": {
        "src": "/enemy-sprites-v2/poses/36-giant-serpent-attack.webp",
        "w": 962,
        "h": 800
      },
      "dizzy": {
        "src": "/enemy-sprites-v2/poses/36-giant-serpent-dizzy.webp",
        "w": 941,
        "h": 583
      }
    },
    "thumb": "/enemy-sprites-v2/thumbs/36-giant-serpent-thumb.webp"
  },
  {
    "idx": 36,
    "id": "37-anubis-warrior",
    "name": "Anubis Warrior",
    "refH": 900,
    "cheekX": 0.5,
    "cheekY": 0.28,
    "colors": [
      "#000000",
      "#362e34",
      "#a99064",
      "#120a0c",
      "#000101"
    ],
    "poses": {
      "idle": {
        "src": "/enemy-sprites-v2/poses/37-anubis-warrior-idle.webp",
        "w": 492,
        "h": 900
      },
      "attack1": {
        "src": "/enemy-sprites-v2/poses/37-anubis-warrior-attack.webp",
        "w": 1045,
        "h": 1080
      },
      "attack": {
        "src": "/enemy-sprites-v2/poses/37-anubis-warrior-attack.webp",
        "w": 1045,
        "h": 1080
      },
      "dizzy": {
        "src": "/enemy-sprites-v2/poses/37-anubis-warrior-dizzy.webp",
        "w": 811,
        "h": 746
      }
    },
    "thumb": "/enemy-sprites-v2/thumbs/37-anubis-warrior-thumb.webp"
  },
  {
    "idx": 37,
    "id": "38-sphinx-riddler",
    "name": "Sphinx Riddler",
    "refH": 900,
    "cheekX": 0.42,
    "cheekY": 0.35,
    "colors": ["#000000", "#f0c060", "#b07030", "#100000", "#f0c050"],
    "poses": {
      "idle": {
        "src": "/enemy-sprites-v2/poses/38-sphinx-riddler-idle.webp",
        "w": 690,
        "h": 900
      },
      "attack1": {
        "src": "/enemy-sprites-v2/poses/38-sphinx-riddler-attack.webp",
        "w": 801,
        "h": 878
      },
      "attack": {
        "src": "/enemy-sprites-v2/poses/38-sphinx-riddler-attack.webp",
        "w": 801,
        "h": 878
      },
      "dizzy": {
        "src": "/enemy-sprites-v2/poses/38-sphinx-riddler-dizzy.webp",
        "w": 752,
        "h": 821
      }
    },
    "thumb": "/enemy-sprites-v2/thumbs/38-sphinx-riddler-thumb.webp"
  },
  {
    "idx": 38,
    "id": "39-giant-scorpion",
    "name": "Giant Scorpion",
    "refH": 900,
    "cheekX": 0.5,
    "cheekY": 0.45,
    "colors": ["#000000", "#f05010", "#903010", "#d05010", "#703010"],
    "poses": {
      "idle": {"src": "/enemy-sprites-v2/poses/39-giant-scorpion-idle.webp", "w": 909, "h": 900},
      "attack1": {"src": "/enemy-sprites-v2/poses/39-giant-scorpion-attack.webp", "w": 1037, "h": 1000},
      "attack": {"src": "/enemy-sprites-v2/poses/39-giant-scorpion-attack.webp", "w": 1037, "h": 1000},
      "dizzy": {"src": "/enemy-sprites-v2/poses/39-giant-scorpion-dizzy.webp", "w": 991, "h": 730}
    },
    "thumb": "/enemy-sprites-v2/thumbs/39-giant-scorpion-thumb.webp"
  },
  {
    "idx": 39,
    "id": "40-pharaoh-revenant",
    "name": "Pharaoh Revenant",
    "refH": 900,
    "cheekX": 0.5,
    "cheekY": 0.3,
    "colors": [
      "#000000",
      "#524256",
      "#c0a15b",
      "#20172e",
      "#000c1b"
    ],
    "poses": {
      "idle": {
        "src": "/enemy-sprites-v2/poses/40-pharaoh-revenant-idle.webp",
        "w": 783,
        "h": 900,
        "gCx": 0.487,
        "gFull": 1
      },
      "attack1": {
        "src": "/enemy-sprites-v2/poses/40-pharaoh-revenant-attack.webp",
        "w": 954,
        "h": 902,
        "gCx": 0.473,
        "gFull": 1
      },
      "attack": {
        "src": "/enemy-sprites-v2/poses/40-pharaoh-revenant-attack.webp",
        "w": 954,
        "h": 902,
        "gCx": 0.473,
        "gFull": 1
      },
      "dizzy": {
        "src": "/enemy-sprites-v2/poses/40-pharaoh-revenant-dizzy.webp",
        "w": 953,
        "h": 710,
        "gCx": 0.486,
        "gFull": 1
      },
      "atkWindup": {
        "src": "/enemy-sprites-v2/poses/40-pharaoh-revenant-anim-atk-windup.webp",
        "w": 771,
        "h": 900,
        "gCx": 0.515,
        "gFull": 1
      },
      "atkFollow": {
        "src": "/enemy-sprites-v2/poses/40-pharaoh-revenant-anim-atk-follow.webp",
        "w": 790,
        "h": 900,
        "gCx": 0.534,
        "gFull": 1
      },
      "spPose": {
        "src": "/enemy-sprites-v2/poses/40-pharaoh-revenant-anim-curse-release.webp",
        "w": 757,
        "h": 900,
        "gCx": 0.517,
        "gFull": 1
      }
    },
    "thumb": "/enemy-sprites-v2/thumbs/40-pharaoh-revenant-thumb.webp"
  },
  {
    "idx": 45,
    "id": "46-elder-dragon",
    "name": "Elder Dragon",
    "refH": 900,
    "cheekX": 0.5,
    "cheekY": 0.32,
    "colors": ["#000000",
      "#f8f5e7",
      "#c2bcc0",
      "#e9e9e9",
      "#d8bd72"],
    "poses": {
      "idle": {
        "src": "/enemy-sprites-v2/poses/46-elder-dragon-idle.webp",
        "w": 838,
        "h": 900
      },
      "attack1": {
        "src": "/enemy-sprites-v2/poses/46-elder-dragon-attack.webp",
        "w": 788,
        "h": 900
      },
      "attack": {
        "src": "/enemy-sprites-v2/poses/46-elder-dragon-attack.webp",
        "w": 788,
        "h": 900
      },
      "dizzy": {
        "src": "/enemy-sprites-v2/poses/46-elder-dragon-dizzy.webp",
        "w": 934,
        "h": 758
      }
    },
    "thumb": "/enemy-sprites-v2/thumbs/46-elder-dragon-thumb.webp"
  },
  {
    "idx": 46,
    "id": "47-dragon-champion",
    "name": "Dragon Champion",
    "refH": 900,
    "cheekX": 0.5,
    "cheekY": 0.3,
    "colors": ["#000000",
      "#9eafc0",
      "#6b0125",
      "#4a5e79",
      "#b01c35"],
    "poses": {
      "idle": {
        "src": "/enemy-sprites-v2/poses/47-dragon-champion-idle.webp",
        "w": 864,
        "h": 900
      },
      "attack1": {
        "src": "/enemy-sprites-v2/poses/47-dragon-champion-attack.webp",
        "w": 942,
        "h": 980
      },
      "attack": {
        "src": "/enemy-sprites-v2/poses/47-dragon-champion-attack.webp",
        "w": 942,
        "h": 980
      },
      "dizzy": {
        "src": "/enemy-sprites-v2/poses/47-dragon-champion-dizzy.webp",
        "w": 936,
        "h": 793
      }
    },
    "thumb": "/enemy-sprites-v2/thumbs/47-dragon-champion-thumb.webp"
  },
  {
    "idx": 47,
    "id": "48-crystal-dragon",
    "name": "Crystal Dragon",
    "refH": 900,
    "cheekX": 0.5,
    "cheekY": 0.31,
    "colors": ["#7c6cf0", "#4a3fb0", "#bfeaff", "#8f7ff5", "#2c2470"],
    "poses": {
      "idle": {
        "src": "/enemy-sprites-v2/poses/48-crystal-dragon-idle.webp",
        "w": 656,
        "h": 900
      },
      "attack1": {
        "src": "/enemy-sprites-v2/poses/48-crystal-dragon-attack.webp",
        "w": 663,
        "h": 900
      },
      "attack": {
        "src": "/enemy-sprites-v2/poses/48-crystal-dragon-attack.webp",
        "w": 663,
        "h": 900
      },
      "dizzy": {
        "src": "/enemy-sprites-v2/poses/48-crystal-dragon-dizzy.webp",
        "w": 649,
        "h": 900
      }
    },
    "thumb": "/enemy-sprites-v2/thumbs/48-crystal-dragon-thumb.webp"
  },
  {
    "idx": 48,
    "id": "49-ancient-dragon",
    "name": "Ancient Dragon",
    "refH": 900,
    "cheekX": 0.5,
    "cheekY": 0.32,
    "colors": ["#000000",
      "#9c9d94",
      "#828b57",
      "#434638",
      "#a1a093"],
    "poses": {
      "idle": {
        "src": "/enemy-sprites-v2/poses/49-ancient-dragon-idle.webp",
        "w": 746,
        "h": 900
      },
      "attack1": {
        "src": "/enemy-sprites-v2/poses/49-ancient-dragon-attack.webp",
        "w": 737,
        "h": 746
      },
      "attack": {
        "src": "/enemy-sprites-v2/poses/49-ancient-dragon-attack.webp",
        "w": 737,
        "h": 746
      },
      "dizzy": {
        "src": "/enemy-sprites-v2/poses/49-ancient-dragon-dizzy.webp",
        "w": 954,
        "h": 680
      }
    },
    "thumb": "/enemy-sprites-v2/thumbs/49-ancient-dragon-thumb.webp"
  },
  {
    "idx": 49,
    "id": "50-final-dragon-boss",
    "name": "Final Dragon Boss",
    "refH": 900,
    "cheekX": 0.5,
    "cheekY": 0.36,
    "colors": [
      "#000000",
      "#745763",
      "#2e1c3e",
      "#130520",
      "#000101"
    ],
    "poses": {
      "idle": {
        "src": "/enemy-sprites-v2/poses/50-final-dragon-boss-idle.webp",
        "w": 965,
        "h": 900,
        "gCx": 0.5,
        "gFull": 1
      },
      "attack1": {
        "src": "/enemy-sprites-v2/poses/50-final-dragon-boss-attack.webp",
        "w": 1168,
        "h": 1021,
        "gCx": 0.597,
        "gFull": 1
      },
      "attack": {
        "src": "/enemy-sprites-v2/poses/50-final-dragon-boss-attack.webp",
        "w": 1168,
        "h": 1021,
        "gCx": 0.597,
        "gFull": 1
      },
      "dizzy": {
        "src": "/enemy-sprites-v2/poses/50-final-dragon-boss-dizzy.webp",
        "w": 1174,
        "h": 830,
        "gCx": 0.489,
        "gFull": 1
      },
      "spPose": {
      "src": "/enemy-sprites-v2/poses/50-final-dragon-anim-firebreath.webp",
      "w": 965,
      "h": 900,
      "gCx": 0.5,
      "gFull": 1
    },
      "atkWindup": {
        "src": "/enemy-sprites-v2/poses/50-final-dragon-anim-atk-windup.webp",
        "w": 965,
        "h": 900,
        "gCx": 0.571,
        "gFull": 1
      },
      "atkFollow": {
        "src": "/enemy-sprites-v2/poses/50-final-dragon-anim-atk-follow.webp",
        "w": 1095,
        "h": 1021,
        "gCx": 0.418,
        "gFull": 1
      }
    },
    "thumb": "/enemy-sprites-v2/thumbs/50-final-dragon-boss-thumb.webp"
  },
  {
    "idx": 40,
    "id": "41-troll",
    "name": "Troll",
    "refH": 900,
    "cheekX": 0.5,
    "cheekY": 0.3,
    "colors": ["#000000", "#5f6c52", "#2b2a21", "#aab89b", "#92a181"],
    "poses": {
      "idle": { "src": "/enemy-sprites-v2/poses/41-troll-idle.webp", "w": 867, "h": 900 },
      "attack1": { "src": "/enemy-sprites-v2/poses/41-troll-attack.webp", "w": 1020, "h": 1333 },
      "attack": { "src": "/enemy-sprites-v2/poses/41-troll-attack.webp", "w": 1020, "h": 1333 },
      "dizzy": { "src": "/enemy-sprites-v2/poses/41-troll-dizzy.webp", "w": 932, "h": 965 }
    },
    "thumb": "/enemy-sprites-v2/thumbs/41-troll-thumb.webp"
  },
  {
    "idx": 41,
    "id": "42-ogre",
    "name": "Ogre",
    "refH": 900,
    "cheekX": 0.5,
    "cheekY": 0.28,
    "colors": ["#000000", "#85a754", "#534d2f", "#221613", "#000315"],
    "poses": {
      "idle": { "src": "/enemy-sprites-v2/poses/42-ogre-idle.webp", "w": 884, "h": 900 },
      "attack1": { "src": "/enemy-sprites-v2/poses/42-ogre-attack.webp", "w": 881, "h": 930 },
      "attack": { "src": "/enemy-sprites-v2/poses/42-ogre-attack.webp", "w": 881, "h": 930 },
      "dizzy": { "src": "/enemy-sprites-v2/poses/42-ogre-dizzy.webp", "w": 1092, "h": 669 }
    },
    "thumb": "/enemy-sprites-v2/thumbs/42-ogre-thumb.webp"
  },
  {
    "idx": 42,
    "id": "43-minotaur",
    "name": "Minotaur",
    "refH": 900,
    "cheekX": 0.50,
    "cheekY": 0.42,
    "colors": ["#000000", "#7c3c29", "#b38062", "#351412", "#000101"],
    "poses": {
      "idle": { "src": "/enemy-sprites-v2/poses/43-minotaur-idle.webp", "w": 680, "h": 900 },
      "attack1": { "src": "/enemy-sprites-v2/poses/43-minotaur-attack.webp", "w": 982, "h": 859 },
      "attack": { "src": "/enemy-sprites-v2/poses/43-minotaur-attack.webp", "w": 982, "h": 859 },
      "dizzy": { "src": "/enemy-sprites-v2/poses/43-minotaur-dizzy.webp", "w": 889, "h": 905 }
    },
    "thumb": "/enemy-sprites-v2/thumbs/43-minotaur-thumb.webp"
  },
  {
    "idx": 43,
    "id": "44-cyclops",
    "name": "Cyclops",
    "refH": 900,
    "cheekX": 0.50,
    "cheekY": 0.40,
    "colors": ["#000000", "#d0b050", "#703010", "#301010", "#101010"],
    "poses": {
      "idle": {"src": "/enemy-sprites-v2/poses/44-cyclops-idle.webp", "w": 806, "h": 900},
      "attack1": {"src": "/enemy-sprites-v2/poses/44-cyclops-attack.webp", "w": 914, "h": 1000},
      "attack": {"src": "/enemy-sprites-v2/poses/44-cyclops-attack.webp", "w": 914, "h": 1000},
      "dizzy": {"src": "/enemy-sprites-v2/poses/44-cyclops-dizzy.webp", "w": 951, "h": 790}
    },
    "thumb": "/enemy-sprites-v2/thumbs/44-cyclops-thumb.webp"
  },
  {
    "idx": 44,
    "id": "20-stone-golem",
    "name": "Stone Golem",
    "refH": 900,
    "cheekX": 0.2,
    "cheekY": 0.66,
    "colors": ["#000000", "#64748b", "#38bdf8", "#65a30d", "#0f172a"],
    "poses": {
      "idle": {"src": "/enemy-sprites-v2/poses/20-stone-golem-idle.webp", "w": 1008, "h": 900},
      "attack": {"src": "/enemy-sprites-v2/poses/20-stone-golem-attack.webp", "w": 1094, "h": 948},
      "attack1": {"src": "/enemy-sprites-v2/poses/20-stone-golem-attack.webp", "w": 1094, "h": 948},
      "attack2": {"src": "/enemy-sprites-v2/poses/20-stone-golem-attack.webp", "w": 1094, "h": 948},
      "dizzy": {"src": "/enemy-sprites-v2/poses/20-stone-golem-dizzy.webp", "w": 1052, "h": 896},
      "roar": {"src": "/enemy-sprites-v2/poses/20-stone-golem-roar.webp", "w": 1043, "h": 960},
      "enrage": {"src": "/enemy-sprites-v2/poses/20-stone-golem-enrage.webp", "w": 1010, "h": 900},
      "rockStun": {"src": "/enemy-sprites-v2/poses/20-stone-golem-rockstun.webp", "w": 1007, "h": 1000},
      "rockStun1": {"src": "/enemy-sprites-v2/poses/20-stone-golem-rockstun.webp", "w": 1007, "h": 1000},
      "rockStun2": {"src": "/enemy-sprites-v2/poses/20-stone-golem-rockstun.webp", "w": 1007, "h": 1000}
    },
    "thumb": "/enemy-sprites-v2/thumbs/20-stone-golem-thumb.webp"
  },
{
  "idx": 25,
  "id": "26-ninja-recruit",
  "name": "Ninja Recruit",
  "refH": 900,
  "cheekX": 0.18,
  "cheekY": 0.55,
  "colors": [
    "#2a3d66",
    "#d2382c",
    "#f2c894",
    "#1c2742",
    "#e8b088"
  ],
  "poses": {
    "idle": {
      "src": "/enemy-sprites-v2/poses/26-ninja-recruit-idle.webp",
      "w": 663,
      "h": 900
    },
    "attack": {
      "src": "/enemy-sprites-v2/poses/26-ninja-recruit-attack.webp",
      "w": 893,
      "h": 950
    },
    "dizzy": {
      "src": "/enemy-sprites-v2/poses/26-ninja-recruit-dizzy.webp",
      "w": 728,
      "h": 949
    }
  },
  "thumb": "/enemy-sprites-v2/thumbs/26-ninja-recruit-thumb.webp"
},
{
  "idx": 26,
  "id": "27-shuriken-master",
  "name": "Shuriken Master",
  "refH": 900,
  "cheekX": 0.18,
  "cheekY": 0.55,
  "colors": [
    "#4a4f57",
    "#1f8a70",
    "#8a5a2b",
    "#f2c894",
    "#c9ced4"
  ],
  "poses": {
    "idle": {
      "src": "/enemy-sprites-v2/poses/27-shuriken-master-idle.webp",
      "w": 681,
      "h": 900
    },
    "attack": {
      "src": "/enemy-sprites-v2/poses/27-shuriken-master-attack.webp",
      "w": 690,
      "h": 950
    },
    "dizzy": {
      "src": "/enemy-sprites-v2/poses/27-shuriken-master-dizzy.webp",
      "w": 697,
      "h": 728
    }
  },
  "thumb": "/enemy-sprites-v2/thumbs/27-shuriken-master-thumb.webp"
},
{
  "idx": 27,
  "id": "28-samurai-duelist",
  "name": "Samurai Duelist",
  "refH": 900,
  "cheekX": 0.18,
  "cheekY": 0.55,
  "colors": [
    "#57a8d8",
    "#eef2f4",
    "#20242c",
    "#d2382c",
    "#e0a92e"
  ],
  "poses": {
    "idle": {
      "src": "/enemy-sprites-v2/poses/28-samurai-duelist-idle.webp",
      "w": 412,
      "h": 900
    },
    "attack": {
      "src": "/enemy-sprites-v2/poses/28-samurai-duelist-attack.webp",
      "w": 984,
      "h": 950
    },
    "dizzy": {
      "src": "/enemy-sprites-v2/poses/28-samurai-duelist-dizzy.webp",
      "w": 845,
      "h": 699
    }
  },
  "thumb": "/enemy-sprites-v2/thumbs/28-samurai-duelist-thumb.webp"
},
{
  "idx": 28,
  "id": "29-shadow-assassin",
  "name": "Shadow Assassin",
  "refH": 900,
  "cheekX": 0.18,
  "cheekY": 0.55,
  "colors": [
    "#6a3fa0",
    "#2c2438",
    "#9a5ae0",
    "#e8b088",
    "#17141f"
  ],
  "poses": {
    "idle": {
      "src": "/enemy-sprites-v2/poses/29-shadow-assassin-idle.webp",
      "w": 712,
      "h": 900
    },
    "attack": {
      "src": "/enemy-sprites-v2/poses/29-shadow-assassin-attack.webp",
      "w": 756,
      "h": 950
    },
    "dizzy": {
      "src": "/enemy-sprites-v2/poses/29-shadow-assassin-dizzy.webp",
      "w": 744,
      "h": 879
    }
  },
  "thumb": "/enemy-sprites-v2/thumbs/29-shadow-assassin-thumb.webp"
},
{
  "idx": 29,
  "id": "30-shogun-warlord",
  "name": "Shogun Warlord",
  "refH": 900,
  "cheekX": 0.18,
  "cheekY": 0.55,
  "colors": [
    "#d9a72e",
    "#23202a",
    "#b03030",
    "#eec39a",
    "#9aa4ae"
  ],
  "poses": {
    "idle": {
      "src": "/enemy-sprites-v2/poses/30-shogun-warlord-idle.webp",
      "w": 489,
      "h": 900,
      "gCx": 0.489,
      "gFull": 1
    },
    "attack": {
      "src": "/enemy-sprites-v2/poses/30-shogun-warlord-attack.webp",
      "w": 482,
      "h": 900,
      "gCx": 0.502,
      "gFull": 1
    ,
      "gs": 1.5,
      "gy": 0.08
    },
    "dizzy": {
      "src": "/enemy-sprites-v2/poses/30-shogun-warlord-dizzy.webp",
      "w": 608,
      "h": 654,
      "gCx": 0.545,
      "gFull": 1
    },
    "spPose": {
      "src": "/enemy-sprites-v2/poses/30-shogun-warlord-anim-special.webp",
      "w": 766,
      "h": 900,
      "gCx": 0.5,
      "gFull": 1
    ,
      "gs": 1.5,
      "gy": 0.09
    },
    "atkWindup": {
      "src": "/enemy-sprites-v2/poses/30-shogun-warlord-anim-atk-windup.webp",
      "w": 489,
      "h": 900,
      "gCx": 0.526,
      "gFull": 1
    ,
      "gs": 1.35,
      "gy": 0.05
    },
    "atkFollow": {
      "src": "/enemy-sprites-v2/poses/30-shogun-warlord-anim-atk-follow.webp",
      "w": 489,
      "h": 900,
      "gCx": 0.488,
      "gFull": 1
    ,
      "gs": 1.5,
      "gy": 0.08
    },
  },
  "thumb": "/enemy-sprites-v2/thumbs/30-shogun-warlord-thumb.webp"
}

];

const SPRITE_CACHE = {};

function buildSilhouetteCanvas(sourceCanvas) {
  const c = document.createElement('canvas');
  c.width = sourceCanvas.width;
  c.height = sourceCanvas.height;
  const ctx = c.getContext('2d');
  ctx.drawImage(sourceCanvas, 0, 0);
  ctx.globalCompositeOperation = 'source-in';
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, c.width, c.height);
  return c;
}

function loadPoseImage(poseDef) {
  if (poseDef.ready || poseDef.loading) return;
  poseDef.loading = true;

  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = () => {
    const origW = img.naturalWidth || poseDef.w;
    const origH = img.naturalHeight || poseDef.h;

    // Scale down oversized source textures (e.g. 1530x1420 down to max 500px).
    // The screen display size of enemies is ~250-350px. Capping at 500px keeps visuals
    // pin-sharp on retina while cutting memory & fill rate by up to 10x!
    const MAX_DIM = 500;
    let cw = origW, ch = origH;
    if (cw > MAX_DIM || ch > MAX_DIM) {
      const s = MAX_DIM / Math.max(cw, ch);
      cw = Math.round(cw * s);
      ch = Math.round(ch * s);
    }

    const c = document.createElement('canvas');
    c.width = cw;
    c.height = ch;
    const ctx = c.getContext('2d');
    ctx.drawImage(img, 0, 0, cw, ch);

    poseDef.img = c;
    poseDef.imgWhite = buildSilhouetteCanvas(c);
    poseDef.w = origW;
    poseDef.h = origH;
    // Measure the opaque content box so the renderer can plant the
    // character's feet exactly on the stage ground line. Robust version:
    // rows are grouped into clusters and only the heaviest cluster (the
    // body) sets the box — stray flecks and painted ground strips below
    // the feet no longer lift the whole sprite off the floor.
    try {
      const iw = c.width, ih = c.height;
      const step = Math.max(1, Math.floor(Math.min(iw, ih) / 160));
      const data = ctx.getImageData(0, 0, iw, ih).data;
      const nRows = Math.ceil(ih / step);
      const rows = new Array(nRows).fill(0);
      for (let ry = 0; ry < nRows; ry++) {
        const y = ry * step;
        let cnt = 0;
        for (let x = 0; x < iw; x += step) {
          if (data[(y * iw + x) * 4 + 3] > 24) cnt++;
        }
        rows[ry] = cnt;
      }
      let total = 0;
      for (let ry = 0; ry < nRows; ry++) total += rows[ry];
      if (total > 0) {
        const act = rows.map((v, ry) => v > 0 || (ry > 0 && rows[ry - 1] > 0 && ry < nRows - 1 && rows[ry + 1] > 0));
        let clusters = [], cur = null;
        for (let ry = 0; ry < nRows; ry++) {
          if (act[ry]) { if (!cur) cur = { top: ry, bot: ry, mass: 0 }; cur.bot = ry; cur.mass += rows[ry]; }
          else if (cur) { clusters.push(cur); cur = null; }
        }
        if (cur) clusters.push(cur);
        clusters.sort((a, b) => b.mass - a.mass);
        const main = clusters[0];
        let left = iw, right = -1;
        for (let ry = main.top; ry <= main.bot; ry++) {
          const y = ry * step;
          for (let x = 0; x < iw; x += step) {
            if (data[(y * iw + x) * 4 + 3] > 24) { if (x < left) left = x; if (x > right) right = x; }
          }
        }
        poseDef.gTop = (main.top * step) / ih;
        poseDef.gBot = Math.min(1, ((main.bot + 1) * step) / ih);
        poseDef.gCx = left <= right ? ((left + right) / 2) / iw : 0.5;
      }
    } catch (err) { /* measurement is best-effort; defaults keep old behaviour */ }
    poseDef.ready = true;
    poseDef.loading = false;
  };
  img.onerror = () => {
    poseDef.loading = false;
  };
  img.src = poseDef.src;
}

export function isV2Enemy(index) {
  return typeof index === 'number' && index >= 0 && index <= 49;
}

export function preloadV2Sprites(targetIndex = 0) {
  const current = typeof targetIndex === 'number' ? targetIndex : 0;
  const toLoad = new Set([0, current, Math.min(49, current + 1)]);
  for (const idx of toLoad) {
    if (isV2Enemy(idx)) {
      getV2Sprite(idx);
    }
  }
}


// Self-heal for backgrounded tabs/apps: mobile browsers (Brave/Chrome on
// Android especially) can discard offscreen-canvas backing stores while the
// page is hidden. The canvas element survives but reads back fully
// transparent, so the enemy would stay invisible forever because poses are
// rasterized into canvases exactly once. Probe cached pose canvases with a
// tiny downscale; any pose that reads back blank gets reloaded from its PNG.
const __probeCanvas = document.createElement('canvas');
__probeCanvas.width = 16; __probeCanvas.height = 16;
function canvasBlank(c) {
  if (!c || !c.width || !c.height) return true;
  try {
    const x = __probeCanvas.getContext('2d');
    x.clearRect(0, 0, 16, 16);
    x.drawImage(c, 0, 0, 16, 16);
    const d = x.getImageData(0, 0, 16, 16).data;
    for (let i = 3; i < d.length; i += 4) if (d[i] > 8) return false;
    return true;
  } catch (e) { return false; }
}
export function healV2Sprites() {
  let healed = 0;
  for (const idx of Object.keys(SPRITE_CACHE)) {
    const spr = SPRITE_CACHE[idx];
    if (!spr || !spr.poses) continue;
    for (const pName of Object.keys(spr.poses)) {
      const pose = spr.poses[pName];
      if (pose.ready && canvasBlank(pose.img)) {
        pose.ready = false; pose.loading = false;
        loadPoseImage(pose);
        healed++;
      }
    }
  }
  return healed;
}

export function getV2Sprite(index) {
  if (!isV2Enemy(index)) return null;
  if (SPRITE_CACHE[index]) return SPRITE_CACHE[index];

  const cfg = V2_CONFIGS.find(c => c.idx === index) || V2_CONFIGS[index];
  const poses = {};

  // Initialize poses
  for (const [pName, pDef] of Object.entries(cfg.poses)) {
    const fallbackCanvas = document.createElement('canvas');
    fallbackCanvas.width = pDef.w;
    fallbackCanvas.height = pDef.h;

    const poseObj = {
      name: pName,
      src: pDef.src,
      w: pDef.w,
      h: pDef.h,
      ready: false,
      loading: false,
      gTop: (typeof pDef.gTop === "number") ? pDef.gTop : 0,
      gBot: (typeof pDef.gBot === "number") ? pDef.gBot : 1,
      gCx: (typeof pDef.gCx === "number") ? pDef.gCx : 0.5,
      gFull: pDef.gFull ? 1 : 0,
      spFull: pDef.spFull ? 1 : 0,
      gs: (typeof pDef.gs === "number") ? pDef.gs : 1,
      gy: (typeof pDef.gy === "number") ? pDef.gy : 0,
      img: fallbackCanvas,
      imgWhite: fallbackCanvas
    };
    poses[pName] = poseObj;
    loadPoseImage(poseObj);
  }

  // Initial thumb image for fallback canvas
  const thumbImg = new Image();
  thumbImg.onload = () => {
    if (!poses.idle.ready) {
      const c = poses.idle.img;
      const ctx = c.getContext('2d');
      ctx.drawImage(thumbImg, 0, 0, c.width, c.height);
      poses.idle.imgWhite = buildSilhouetteCanvas(c);
    }
  };
  thumbImg.src = cfg.thumb;

  const vRows = 24;
  const vCols = Math.max(12, Math.round(vRows * (cfg.poses.idle.w / cfg.poses.idle.h)));
  const cX = cfg.cheekX || 0.22;
  const cY = cfg.cheekY || 0.55;

  const sprObj = {
    isV2: true,
    idx: index,
    id: cfg.id,
    name: cfg.name,
    refH: cfg.refH,
    cheekX: cX,
    cheekY: cY,
    colors: cfg.colors,
    thumb: cfg.thumb,
    poses,
    cols: vCols,
    rows: vRows,
    eyeL: [vCols * 0.35, vRows * (1 - cY)],
    eyeR: [vCols * 0.65, vRows * (1 - cY)],
    mouth: [vCols * 0.5, vRows * (1 - cY + 0.1)],
    cheek: [vCols * (0.5 - cX), vRows * (1 - cY)],
    eyeR_: 0.3,
    eyeColor: "#000000",
    get img() {
      return (poses.idle && poses.idle.img) || null;
    },
    get imgWhite() {
      return (poses.idle && poses.idle.imgWhite) || null;
    },
    getPose(name) {
      if (name === 'attack') {
        if (poses.attack2 && poses.attack2.ready) return poses.attack2;
        if (poses.attack && poses.attack.ready) return poses.attack;
      }
      if (name === 'rockStun') {
        if (poses.rockStun2 && poses.rockStun2.ready) return poses.rockStun2;
        if (poses.rockStun && poses.rockStun.ready) return poses.rockStun;
      }
      if (poses[name] && poses[name].ready) return poses[name];
      if (poses.idle && poses.idle.ready) return poses.idle;
      return poses[name] || poses.idle;
    }
  };

  SPRITE_CACHE[index] = sprObj;
  return sprObj;
}
