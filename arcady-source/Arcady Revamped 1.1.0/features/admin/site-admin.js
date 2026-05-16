(function () {
  const runtimeConfig = window.ARCADY_ADMIN_FIREBASE || {};
  const firebaseConfig = runtimeConfig.firebaseConfig || {};
  const announcementDurationMs = Number(runtimeConfig.announcementDurationMs || 10000);
  const appName = "arcady-admin-panel";
  const body = document.body;
  const defaultPageTitle = document.title || "Arcady";
  const assetBaseHref = resolveAssetBaseHref();
  const adminPassword = decodeSecret("cXdlcnR5");
  const ownerPassword = decodeSecret("a29hbGFub3Rrb29sMQ==");
  const protectedNickname = decodeSecret("QXJjYWR5");
  const protectedNicknameKey = String(protectedNickname || "").trim().toLowerCase();
  const adminShortcutSequence = decodeSecret("OTk2MTU1");
  const presenceCutoffMs = 120000;
  const petStateKey = "arcadyHomePetState";
  const homepageChatNameTagsPath = "arcadyAdmin/homepageChat/nameTags";
  const homepageChatUserNameTagsPath = "arcadyAdmin/homepageChat/userNameTags";
  const remoteBackgroundApiUrl = "https://api.github.com/repos/arcady-web/arcady-web.github.io/contents/features/backgrounds-s?ref=main";
  const remoteBackgroundCdnBase = "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/backgrounds-s/";
  const remoteLiveTvApiUrl = "https://api.github.com/repos/arcady-web/arcady-web.github.io/contents/features/live-tv?ref=main";
  const remoteLiveTvCdnBase = "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/live-tv/";
  const remoteJumpscareApiUrl = "https://api.github.com/repos/arcady-web/arcady-web.github.io/contents/features/jumpscares?ref=main";
  const remoteJumpscareCdnBase = "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/jumpscares/";
  const ownerExclusiveJumpscareOptions = [
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/jumpscares/Cartoon Cat Jumpscare.mp4",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/jumpscares/Elder Guardian Jumpscare.mp4",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/jumpscares/Foxy Jumpscare.mp4",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/jumpscares/Piggy Jumpscare.mp4",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/jumpscares/Suicide Mouse Jumpscare.mp4",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/jumpscares/Corn Hub.mp4",
  ];
  const remoteGenziySoundSourceUrl = "https://raw.githubusercontent.com/genizy/soundboard/main/sounds.js";
  const remoteGenziySoundApiUrl = "https://api.github.com/repos/genizy/soundboard/contents/media/sounds?ref=main";
  const remoteGenziySoundCdnBase = "https://cdn.jsdelivr.net/gh/genizy/soundboard@main/";
  const fallbackBackgrounds = [
    { file: "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/backgrounds-s/Cat%20In%20Grass.jpeg", label: "Cat In Grass" },
    { file: "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/backgrounds-s/Cloud%202.jpeg", label: "Cloud 2" },
    { file: "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/backgrounds-s/Cloud.jpeg", label: "Cloud" },
    { file: "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/backgrounds-s/Cool%20City.jpeg", label: "Cool City" },
    { file: "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/backgrounds-s/Cool%20Space%20Cat%20Background.jpeg", label: "Cool Space Cat Background" },
    { file: "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/backgrounds-s/Cool.gif", label: "Cool" },
    { file: "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/backgrounds-s/Cute%20Kittens%20.gif", label: "Cute Kittens" },
    { file: "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/backgrounds-s/Frutiger%20Aero%201.jpeg", label: "Frutiger Aero 1" },
    { file: "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/backgrounds-s/Funky%20Wallpaper.jpeg", label: "Funky Wallpaper" },
    { file: "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/backgrounds-s/Galaxy.gif", label: "Galaxy" },
    { file: "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/backgrounds-s/Meowl%20In%20Grassfeild.jpeg", label: "Meowl In Grassfeild" },
    { file: "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/backgrounds-s/Meowl%20In%20Snow.jpeg", label: "Meowl In Snow" },
    { file: "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/backgrounds-s/Minecraft%20Feild.jpeg", label: "Minecraft Feild" },
    { file: "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/backgrounds-s/Moon.gif", label: "Moon" },
    { file: "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/backgrounds-s/Moving%20Blue%20Water.gif", label: "Moving Blue Water" },
    { file: "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/backgrounds-s/ORBIT.gif", label: "ORBIT" },
    { file: "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/backgrounds-s/Ocean%20With%20Flower.jpeg", label: "Ocean With Flower" },
    { file: "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/backgrounds-s/Pink%20pastel%20moving%20strips%20background.gif", label: "Pink Pastel Moving Strips Background" },
    { file: "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/backgrounds-s/Rainbow%20Spiral.gif", label: "Rainbow Spiral" },
    { file: "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/backgrounds-s/STOP.jpeg", label: "STOP" },
    { file: "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/backgrounds-s/Space%20Black%20Hole.jpeg", label: "Space Black Hole" },
    { file: "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/backgrounds-s/Space%20Cat.jpeg", label: "Space Cat" },
    { file: "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/backgrounds-s/Static.gif", label: "Static" },
    { file: "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/backgrounds-s/gato%20naranja%20en%20cereal.jpeg", label: "gato naranja en cereal" },
    { file: "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/backgrounds-s/Dogs In Pool.jpeg", label: "Dogs In Pool" },
    { file: "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/backgrounds-s/Rainbow Loop.gif", label: "Rainbow Loop" },

  ];
  const fallbackSoundFiles = [
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/music/67.mp3",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/music/At%20the%20speed%20of%20light.mp3",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/music/BIKE.mp3",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/music/Brother%20Noah.mp3",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/music/Brr%20Brr%20Patapim%20Phonk.mp3",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/music/CUCO%20Lover%20Is%20a%20Day%20Audio.mp3",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/music/Cuco%20Hydrocodone%20Official%20Lyric%20Video.mp3",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/music/Epstein%20Fuck%20Niggas%20%28EFN%29.mp3",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/music/Explores.mp3",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/music/FAHHH%20SUPRMEEE.mp3",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/music/Fortnite%20Henchman%20SFX.mp3",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/music/GRIEF.mp3",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/music/Gangsta%20Rap%20-%20nigga%20nigga%20nigga.mp3",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/music/Gta%20Hub.mp3",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/music/I%20Got%20This%20FAHH.mp3",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/music/I%20Want%20You%20Crying%20For%20Me.mp3",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/music/Its%20Just%20A%20Burning%20Memory.mp3",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/music/It%E2%80%99s%20been%20a%20year%20daddy%2C%20I%20really%20really%20miss%20you.mp3",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/music/LOUD%20MOAN.mp3",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/music/Labubu%20Phonk.mp3",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/music/Laufey%20From%20The%20Start%20Official%20Music%20Video.mp3",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/music/Limbo.mp3",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/music/Metal%20Pipe%20Clang.mp3",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/music/Miku%20GD.mp3",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/music/Moan%20Remix.mp3",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/music/Ni%20Ni%20Niggers.mp3",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/music/Nigger%20Nigger.mp3",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/music/ORBIT.mp3",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/music/Oh%20Oh%20Wish%20I%20Wish%20I%20Knew%20Knew.mp3",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/music/Ohh%20yeah~.mp3",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/music/Oi%20Oi%20Oi%20Oi.mp3",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/music/Plankton%20Moan.mp3",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/music/Please%20Speed%20I%20Need%20This.mp3",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/music/Racist%20caine.mp3",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/music/Rest%20In%20Peace%20My%20Granny.mp3",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/music/Say%20Wallahi%20Bro.mp3",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/music/Sienna.mp3",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/music/Slaughter%20House.mp3",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/music/We%20are%20charlie%20kirk%20phonk.mp3",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/music/What%20A%20Good%20Boy.mp3",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/music/Discord%20Spam.mp3",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/music/Frutiger%20Aero%20Music%206.mp3",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/music/Bez Rapping NIgga.mp3",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/music/Spongebob Fail.mp3",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/music/Fallen Down.mp3",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/music/Woman Moaning.mp3",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/music/I Hate Niggers (Robot Voice).mp3",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/music/What Is This Diddy Blud Doing On The Calculator.mp3",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/music/Linga Guli Guli Guli.mp3",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/music/TIKI TIKI.mp3",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/music/Miska Muska Micky Mouse.mp3",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/music/It's Raining Tacos.mp3",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/music/Kahoot Lobby Music.mp3",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/music/Peanut Butter Jelly Time.mp3",
    
  ];
  const fallbackVideoFiles = [
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/live-tv/Top%205%20Reasons%20Why%20I%20Love%20Noobs.mp4",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/live-tv/Explores.mp4",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/live-tv/Polish%20Cow%20%28Full%20Version%29.mp4",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/live-tv/Static%20Frutiger%20Screen.gif",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/live-tv/Fish%20Tank.gif",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/live-tv/Frutiger%20Aero%20Cats.gif",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/live-tv/Fuji%20Water.gif",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/live-tv/Nayn%20Cat.gif",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/live-tv/Cat%20Jumping.gif",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/live-tv/Racist%20caine.mp4",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/live-tv/Anime%20Girls%20Throwing%20Yams.mp4",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/live-tv/Cat%20Flying.gif",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/live-tv/Tung Tung Tung Sahur but in 4K (Original Meme).mp4",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/live-tv/Skeletal Shenanigans.mp4",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/live-tv/I Want You Crying For Me.mp4",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/live-tv/Chicken Nugget.mp4",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/live-tv/Nico Nico Car.mp4",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/live-tv/Youre Adopted Amsr.mp4",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/live-tv/How To Disappear Using Fried Chicken.mp4",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/live-tv/Ching Chong Fights.mp4",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/live-tv/Linga Guli Guli Guli Lyric Video.mp4",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/live-tv/What Is This Diddy Blud Doing On The Calculator ANIMATION.mp4",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/live-tv/Epstein Fuck Niggers Speed Up.mp4",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/live-tv/Mommy Mario.mp4",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/live-tv/SODA POP x ITALIAN BRAINROT (Official Version).mp4",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/live-tv/The Globglogabgalab [Official].mp4",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/live-tv/Do You Want to Build a Snowman?.mp4",
    "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/live-tv/Who Said We Dont Got Wata In Africa.mp4",
  ];
  const fallbackCursorThemes = [
    {
      id: "default-arcady",
      label: "Default Arcady",
      cursor: "./features/cursors/cursor/cursor.png",
      pointer: "./features/cursors/pointer/pointer.png"
    },
    {
      id: "3d-black-stroke-mac",
      label: "3D Black Stroke Mac",
      cursor: "./features/cursors/cursor/3D Black Stroke Mac--cursor--SweezyCursors.png",
      pointer: "./features/cursors/pointer/3D Black Stroke Mac--pointer--SweezyCursors.png"
    },
    {
      id: "3d-mac",
      label: "3D Mac",
      cursor: "./features/cursors/cursor/3D Mac--cursor--SweezyCursors.png",
      pointer: "./features/cursors/pointer/3D Mac--pointer--SweezyCursors.png"
    },
    {
      id: "67-kid-dark",
      label: "67 Kid Dark",
      cursor: "./features/cursors/cursor/67 Kid Dark--cursor--SweezyCursors.png",
      pointer: "./features/cursors/pointer/67 Kid Dark--pointer--SweezyCursors.png"
    },
    {
      id: "black-rainbow-stroke-gradient",
      label: "Black & Rainbow Stroke Gradient",
      cursor: "./features/cursors/cursor/Black & Rainbow Stroke Gradient Animated--cursor--SweezyCursors.png",
      pointer: "./features/cursors/pointer/Black & Rainbow Stroke Gradient Animated--pointer--SweezyCursors.png"
    },
    {
      id: "crayon-texture",
      label: "Crayon Texture",
      cursor: "./features/cursors/cursor/Crayon Texture--cursor--SweezyCursors.png",
      pointer: "./features/cursors/pointer/Crayon Texture--pointer--SweezyCursors.png"
    },
    {
      id: "distorted-prank-macos",
      label: "Distorted Prank macOS",
      cursor: "./features/cursors/cursor/Distorted Prank macOS Animated--cursor--SweezyCursors.png",
      pointer: "./features/cursors/pointer/Distorted Prank macOS Animated--pointer--SweezyCursors.png"
    },
    {
      id: "duct-tape-banana",
      label: "Duct Tape Banana",
      cursor: "./features/cursors/cursor/Duct Tape Banana--cursor--SweezyCursors.png",
      pointer: "./features/cursors/pointer/Duct Tape Banana--pointer--SweezyCursors.png"
    },
    {
      id: "fried-egg-texture",
      label: "Fried Egg Texture",
      cursor: "./features/cursors/cursor/Fried Egg Texture--cursor--SweezyCursors.png",
      pointer: "./features/cursors/pointer/Fried Egg Texture--pointer--SweezyCursors.png"
    },
    {
      id: "glass-texture",
      label: "Glass Texture",
      cursor: "./features/cursors/cursor/Glass Texture--cursor--SweezyCursors.png",
      pointer: "./features/cursors/pointer/Glass Texture--pointer--SweezyCursors.png"
    },
    {
      id: "handsome-squidward-meme",
      label: "Handsome Squidward Meme",
      cursor: "./features/cursors/cursor/Handsome Squidward Meme--cursor--SweezyCursors.png",
      pointer: "./features/cursors/pointer/Handsome Squidward Meme--pointer--SweezyCursors.png"
    },
    {
      id: "jerry-mouse-meme",
      label: "Jerry Mouse Meme",
      cursor: "./features/cursors/cursor/Jerry Mouse Meme--cursor--SweezyCursors.png",
      pointer: "./features/cursors/pointer/Jerry Mouse Meme--pointer--SweezyCursors.png"
    },
    {
      id: "meowl-meme",
      label: "Meowl Meme",
      cursor: "./features/cursors/cursor/Meowl Meme Animated--cursor--SweezyCursors.png",
      pointer: "./features/cursors/pointer/Meowl Meme Animated--pointer--SweezyCursors.png"
    },
    {
      id: "minecraft-enchanted-netherite-sword",
      label: "Minecraft Enchanted Netherite Sword",
      cursor: "./features/cursors/cursor/Minecraft Enchanted Netherite Sword Animated--cursor--SweezyCursors.png",
      pointer: "./features/cursors/pointer/Minecraft Enchanted Netherite Sword Animated--pointer--SweezyCursors.png"
    },
    {
      id: "tetris-texture",
      label: "Tetris Texture",
      cursor: "./features/cursors/cursor/Tetris Texture--cursor--SweezyCursors.png",
      pointer: "./features/cursors/pointer/Tetris Texture--pointer--SweezyCursors.png"
    },
    {
      id: "windows-95-98-arrow-logo",
      label: "Windows 95/98 Arrow & Logo",
      cursor: "./features/cursors/cursor/Windows 95_98 Arrow & Logo Animated--cursor--SweezyCursors.png",
      pointer: "./features/cursors/pointer/Windows 95_98 Arrow & Logo Animated--pointer--SweezyCursors.png"
    }
  ];
  const fallbackMadnessAssets = [
    { file: "./features/gifs/Froggy.png", label: "Froggy" },
    { file: "./features/gifs/Froggy distortion.png", label: "Froggy Distortion" },
    { file: "./features/gifs/froggy with a game controller.PNG", label: "Froggy With A Game Controller" }
  ];
  const defaultWallOfFameColors = [
    "#38bdf8",
    "#a78bfa",
    "#f97316",
    "#22c55e",
    "#f43f5e",
    "#facc15"
  ];
  const globalFontChoices = [
    ["abril-fatface", "Abril Fatface", '"Abril Fatface", serif', "Abril Fatface"],
    ["anton", "Anton", '"Anton", sans-serif', "Anton"],
    ["arvo", "Arvo", '"Arvo", serif', "Arvo"],
    ["barlow", "Barlow", '"Barlow", sans-serif', "Barlow"],
    ["bebas-neue", "Bebas Neue", '"Bebas Neue", sans-serif', "Bebas Neue"],
    ["bungee", "Bungee", '"Bungee", cursive', "Bungee"],
    ["cabin", "Cabin", '"Cabin", sans-serif', "Cabin"],
    ["candal", "Candal", '"Candal", sans-serif', "Candal"],
    ["caveat", "Caveat", '"Caveat", cursive', "Caveat"],
    ["cinzel", "Cinzel", '"Cinzel", serif', "Cinzel"],
    ["comfortaa", "Comfortaa", '"Comfortaa", sans-serif', "Comfortaa"],
    ["cormorant-garamond", "Cormorant Garamond", '"Cormorant Garamond", serif', "Cormorant Garamond"],
    ["dancing-script", "Dancing Script", '"Dancing Script", cursive', "Dancing Script"],
    ["dm-sans", "DM Sans", '"DM Sans", sans-serif', "DM Sans"],
    ["eb-garamond", "EB Garamond", '"EB Garamond", serif', "EB Garamond"],
    ["exo-2", "Exo 2", '"Exo 2", sans-serif', "Exo 2"],
    ["figtree", "Figtree", '"Figtree", sans-serif', "Figtree"],
    ["fjalla-one", "Fjalla One", '"Fjalla One", sans-serif', "Fjalla One"],
    ["fraunces", "Fraunces", '"Fraunces", serif', "Fraunces"],
    ["fredoka", "Fredoka", '"Fredoka", system-ui, -apple-system, sans-serif', "Fredoka"],
    ["ibm-plex-sans", "IBM Plex Sans", '"IBM Plex Sans", sans-serif', "IBM Plex Sans"],
    ["inconsolata", "Inconsolata", '"Inconsolata", monospace', "Inconsolata"],
    ["josefin-sans", "Josefin Sans", '"Josefin Sans", sans-serif', "Josefin Sans"],
    ["jost", "Jost", '"Jost", sans-serif', "Jost"],
    ["karla", "Karla", '"Karla", sans-serif', "Karla"],
    ["lato", "Lato", '"Lato", sans-serif', "Lato"],
    ["libre-baskerville", "Libre Baskerville", '"Libre Baskerville", serif', "Libre Baskerville"],
    ["lobster", "Lobster", '"Lobster", cursive', "Lobster"],
    ["merriweather", "Merriweather", '"Merriweather", serif', "Merriweather"],
    ["montserrat", "Montserrat", '"Montserrat", sans-serif', "Montserrat"],
    ["mulish", "Mulish", '"Mulish", sans-serif', "Mulish"],
    ["nunito", "Nunito", '"Nunito", sans-serif', "Nunito"],
    ["orbitron", "Orbitron", '"Orbitron", sans-serif', "Orbitron"],
    ["oswald", "Oswald", '"Oswald", sans-serif', "Oswald"],
    ["outfit", "Outfit", '"Outfit", sans-serif', "Outfit"],
    ["pacifico", "Pacifico", '"Pacifico", cursive', "Pacifico"],
    ["playfair-display", "Playfair Display", '"Playfair Display", serif', "Playfair Display"],
    ["poppins", "Poppins", '"Poppins", sans-serif', "Poppins"],
    ["quicksand", "Quicksand", '"Quicksand", sans-serif', "Quicksand"],
    ["rajdhani", "Rajdhani", '"Rajdhani", sans-serif', "Rajdhani"],
    ["raleway", "Raleway", '"Raleway", sans-serif', "Raleway"],
    ["roboto", "Roboto", '"Roboto", sans-serif', "Roboto"],
    ["rubik", "Rubik", '"Rubik", sans-serif', "Rubik"],
    ["sora", "Sora", '"Sora", sans-serif', "Sora"],
    ["source-sans-3", "Source Sans 3", '"Source Sans 3", sans-serif', "Source Sans 3"],
    ["space-grotesk", "Space Grotesk", '"Space Grotesk", sans-serif', "Space Grotesk"],
    ["space-mono", "Space Mono", '"Space Mono", monospace', "Space Mono"],
    ["teko", "Teko", '"Teko", sans-serif', "Teko"],
    ["ubuntu", "Ubuntu", '"Ubuntu", sans-serif', "Ubuntu"],
    ["work-sans", "Work Sans", '"Work Sans", sans-serif', "Work Sans"]
  ].map(function (entry) {
    return {
      id: entry[0],
      label: entry[1],
      family: entry[2],
      googleFamily: entry[3]
    };
  });
  const clickXpAmount = 2;
  const hourlyXpAmount = 60;
  const visitMilestoneCount = 50;
  const visitMilestoneXpAmount = 80;
  const clickMilestoneCount = 20;
  const clickMilestoneXpAmount = 15;
  const dailyVisitXpAmount = 25;
  const newPageXpAmount = 8;
  const gameDiscoveryXpAmount = 15;
  const nicknameSetXpAmount = 20;
  const xpPerLevel = 100;
  const tempAdminDurationMs = 24 * 60 * 60 * 1000;
  const adminRoleConfigs = {
    admin: {
      key: "admin",
      label: "Admin",
      capabilities: {
        "base-admin-ui": true,
        "live-soundboard": true,
        "standard-broadcast": true,
        "standard-poll": true
      }
    },
        "super-admin": {
      key: "super-admin",
      label: "Super Admin",
      capabilities: {
        "base-admin-ui": true,
        "live-soundboard": true,
        "standard-broadcast": true,
            "standard-poll": true,
            "custom-cursor": true
      }
    },
    "supreme-admin": {
      key: "supreme-admin",
      label: "Supreme Admin",
      capabilities: {
        "base-admin-ui": true,
        "live-soundboard": true,
        "custom-cursor": true,
        "global-theme": true,
        "announcement-tools": true,
        "poll-tools": true,
        "homepage-news": true,
        "wall-of-fame": true,
        "xp-controls": true,
        "standard-broadcast": true,
        "standard-poll": true
      }
    },
    "corrupted-admin": {
      key: "corrupted-admin",
      label: "Corrupted Admin",
      capabilities: {
        "moderation-tools": true,
        "base-admin-ui": true,
        "live-soundboard": true,
        "custom-cursor": true,
        "announcement-tools": true,
        "poll-tools": true,
        "homepage-news": true,
        "wall-of-fame": true,
        "xp-controls": true,
        "standard-broadcast": true,
        "standard-poll": true
      }
    },
    "temp-admin": {
      key: "temp-admin",
      label: "Temporary Admin",
      capabilities: {
        "announcement-tools": true,
        "poll-tools": true,
        "live-soundboard": true,
        "standard-broadcast": true,
        "standard-poll": true
      }
    }
  };

  const state = {
    rtdb: null,
    firebaseReady: false,
    bootedAt: Date.now(),
    unlocked: sessionStorage.getItem("arcadyAdminUnlocked") === "true",
    ownerUnlocked: sessionStorage.getItem("arcadyOwnerUnlocked") === "true",
    isPromptOpen: false,
    shortcutBuffer: "",
    shortcutResetTimer: null,
    currentAnnouncementId: null,
    currentPollId: null,
    visiblePollId: null,
    pollHideTimer: null,
    pollVoteUnsubscribe: null,
    currentPollData: null,
    currentVotes: {},
    backgroundOptions: [],
    cursorThemes: [],
    presenceListListener: null,
    bansListener: null,
    currentVisitors: [],
    activeBans: {},
    siteBanMapRaw: {},
    soundOptions: [],
    genziySoundOptions: [],
    videoOptions: [],
    jumpscareOptions: [],
    madnessAssets: [],
    wallOfFameEntries: [],
    xpUserProfiles: {},
    currentXpRecord: {},
    visitCount: 0,
    sessionStartedAt: getSessionStartedAt(),
    hourlyAwardsGranted: Number(sessionStorage.getItem("arcadyHourlyAwardsGranted") || 0),
    sessionClickCount: Number(sessionStorage.getItem("arcadySessionClickCount") || 0),
    lastClickXpAt: 0,
    xpHourTimer: null,
    xpTrackingStarted: false,
    lastSyncedXpNickname: "",
    activeSoundFile: "",
    activeSoundLabel: "",
    currentLiveTv: {},
    activeVideoFile: "",
    activeVideoLabel: "",
    activeVideoIsImage: false,
    activeVideoIsEmbed: false,
    liveTvStream: null,
    activeJumpscareFile: "",
    activeJumpscareLabel: "",
    liveTvAutoplayBlocked: false,
    liveTvRecoveryBound: false,
    jumpscareAutoplayBlocked: false,
    jumpscareRecoveryBound: false,
    liveSoundAutoplayBlocked: false,
    liveSoundRecoveryBound: false,
    activeSoundData: null,
    currentSoundAudios: [],
    lastHandledSoundId: "",
    lastHandledVideoId: "",
    currentJumpscare: {},
    lastHandledJumpscareId: "",
    jumpscareCanvasContext: null,
    jumpscareAnimationFrame: 0,
    currentMadness: {},
    lastHandledMadnessId: "",
    madnessTimer: null,
    madnessSpawnTimer: null,
    currentScreenEffect: {},
    lastHandledScreenEffectId: "",
    screenEffectTimer: null,
    deviceId: getDeviceId(),
    sessionId: getPresenceSessionId(),
    presenceRef: null,
    presenceHeartbeat: null,
    screenFxLayer: null,
    banOverlay: null,
    lastStopSoundAt: 0,
    homepageNews: {},
    homepageChatNameTags: {},
    homepageChatUserNameTags: {},
    currentSiteState: {},
    activeAppeals: {},
    lastActivity: buildDefaultActivity(),
    nicknameOverlay: null,
    nicknameInput: null,
    nicknameSave: null,
    nicknameMessage: null,
    launcherButton: null,
    panelTitle: null,
    ownerUnlockPromptVisible: false,
    ownerUnlockStatus: null,
    ownerPanelStatus: null,
    adminRoleSummary: null,
    adminPanelPositionSelect: null,
    settingsPanel: null,
    settingsCursorEnabledInput: null,
    settingsCursorThemeSelect: null,
    settingsCursorMessage: null,
    banAppealInput: null,
    banAppealSubmit: null,
    banAppealMessage: null,
    ownerAppealList: null,
    ownerVideoStatus: null,
    ownerVideoBoard: null,
    ownerStopVideoButton: null,
    ownerVideoUrlInput: null,
    ownerJumpscareStatus: null,
    ownerJumpscareBoard: null,
    ownerStopJumpscareButton: null,
    ownerCursorStatus: null,
    ownerToggleCursorButton: null,
    ownerGenziySoundStatus: null,
    ownerGenziySoundboard: null,
    ownerStopGenziySoundButton: null,
    ownerScreenEffectStatus: null,
    ownerScreenEffectModeSelect: null,
    ownerScreenEffectDurationInput: null,
    adminAnnouncementImageInput: null,
    adminAnnouncementPositionSelect: null,
    adminAnnouncementDurationInput: null,
    adminPollDurationInput: null,
    adminGenziySoundStatus: null,
    adminGenziySoundboard: null,
    adminStopGenziySoundButton: null,
    adminVideoUrlInput: null,
    adminFontFamilySelect: null,
    adminFontColorInput: null,
    adminFontColorTextInput: null,
    adminTabTitleInput: null,
    adminCursorStatus: null,
    adminCursorThemeSelect: null,
    adminApplyCursorThemeButton: null,
    adminToggleCursorButton: null,
    adminHomeNewsInput: null,
    adminWallRankInput: null,
    adminWallNameInput: null,
    adminWallColorInput: null,
    adminWallColorTextInput: null,
    adminWallList: null,
    adminXpAmountInput: null,
    adminXpNicknameInput: null,
    adminScreenEffectStatus: null,
    adminScreenEffectModeSelect: null,
    adminScreenEffectDurationInput: null,
    ownerAdminRoleSelect: null,
    settings: {
      announcementDurationMs: announcementDurationMs,
      pollDurationMs: announcementDurationMs,
      customCursorEnabled: true,
      customCursorTheme: ""
    },
    adminGrantMap: {},
    adminBlockMap: {}
  };

  injectStyles();
  ensureGlobalFontStylesheet();
  buildUi();
  loadSoundLibrary();
  loadVideoLibrary();
  loadJumpscareLibrary();
  loadCursorLibrary();
  loadMusicPlayerModule();
  bindSecretShortcut();
  syncUnlockedState();
  initFirebase();

  function getDeviceId() {
    const existing = localStorage.getItem("arcadyAdminDeviceId");
    if (existing) {
      return existing;
    }

    const created = "device-" + Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem("arcadyAdminDeviceId", created);
    return created;
  }

  function getPresenceSessionId() {
    const existing = sessionStorage.getItem("arcadyPresenceSessionId");
    if (existing) {
      return existing;
    }

    const created = "session-" + Math.random().toString(36).slice(2) + Date.now().toString(36);
    sessionStorage.setItem("arcadyPresenceSessionId", created);
    return created;
  }

  function getSessionStartedAt() {
    const existing = Number(sessionStorage.getItem("arcadySessionStartedAt") || 0);
    if (existing > 0) {
      return existing;
    }

    const created = Date.now();
    sessionStorage.setItem("arcadySessionStartedAt", String(created));
    return created;
  }

  function readNickname() {
    return String(localStorage.getItem("arcadyVisitorNickname") || "").trim();
  }

  function readPresenceNickname() {
    const nickname = readNickname();
    if (nickname) {
      return nickname;
    }

    const shortId = String(state.deviceId || "").replace(/^device-/, "").slice(-4).toUpperCase();
    return shortId ? "Guest " + shortId : "Guest";
  }

  function normalizeProtectedNickname(value) {
    return String(value || "").trim().toLowerCase();
  }

  function isProtectedNickname(value) {
    return normalizeProtectedNickname(value) === protectedNicknameKey;
  }

  function isProtectedDevice(deviceId) {
    const key = String(deviceId || "");
    if (!key) {
      return false;
    }

    const visitor = findVisitor(key);
    const xpProfile = normalizeXpRecord(state.xpUserProfiles[key]);
    const adminGrant = state.adminGrantMap[key] || {};
    const adminBlock = state.adminBlockMap[key] || {};
    const activeBan = state.activeBans[key] || {};

    return [
      readableName(visitor),
      visitor.nickname,
      visitor.username,
      xpProfile.nickname,
      adminGrant.nickname,
      adminBlock.nickname,
      activeBan.nickname
    ].some(isProtectedNickname);
  }

  function pruneProtectedRestriction(pathRoot, entries) {
    if (!state.rtdb || !entries) {
      return;
    }

    Object.keys(entries).forEach(function (deviceId) {
      if (isProtectedDevice(deviceId)) {
        state.rtdb.ref(pathRoot + "/" + deviceId).remove();
      }
    });
  }

  function decodeSecret(value) {
    try {
      return window.atob(String(value || ""));
    } catch (error) {
      return "";
    }
  }

  function buildPresencePayload() {
    const nickname = readPresenceNickname();
    const lastActivity = state.lastActivity || buildDefaultActivity();
    return {
      deviceId: state.deviceId,
      sessionId: state.sessionId,
      page: location.pathname.split("/").pop() || location.pathname || "/",
      path: location.pathname || "/",
      title: document.title || "Arcady",
      nickname: nickname,
      username: nickname,
      adminPanelOpen: !!(state.panel && state.panel.classList.contains("is-visible")),
      ownerPanelOpen: !!(state.ownerPanel && state.ownerPanel.classList.contains("is-visible") && hasOwnerAccess()) || isOwnerPage(),
      adminGranted: isGrantedAdmin(),
      adminBlocked: isAdminBlocked(),
      adminRole: getCurrentAdminRoleKey(),
      adminRoleLabel: getCurrentAdminRoleLabel(),
      activityType: lastActivity.type || "view",
      activityLabel: lastActivity.label || "",
      activityAt: lastActivity.at || Date.now(),
      updatedAt: Date.now()
    };
  }

  function buildDefaultActivity() {
    return {
      type: "view",
      label: isGamePage() ? "Playing " + (document.title || "a game") : "Browsing " + (document.title || "Arcady"),
      at: Date.now()
    };
  }

  function isOwnerPage() {
    return (location.pathname.split("/").pop() || "").toLowerCase() === "owner.html";
  }

  function isGamePage() {
    return location.pathname.indexOf("/games/") !== -1;
  }

  function updatePresence(force) {
    if (!state.firebaseReady || !state.presenceRef) {
      return;
    }

    const payload = buildPresencePayload();
    const payloadKey = JSON.stringify(payload);
    if (!force && state.lastPresencePayload === payloadKey) {
      return;
    }

    state.lastPresencePayload = payloadKey;
    state.presenceRef.set(payload).catch(function (error) {
      console.error("Arcady presence update failed:", error);
    });
  }

  function isGrantedAdmin() {
    return !!getDeviceAdminGrant(state.deviceId);
  }

  function normalizeAdminRole(value) {
    const normalized = String(value || "").trim().toLowerCase();
    if (normalized === "superadmin" || normalized === "super-admin" || normalized === "super admin") {
      return "super-admin";
    }
    if (normalized === "supremeadmin" || normalized === "supreme-admin" || normalized === "supreme admin") {
      return "supreme-admin";
    }
    if (
      normalized === "corrupted-admin" ||
      normalized === "corrupted admin" ||
      normalized === "corruptedadmin"
    ) {
      return "corrupted-admin";
    }
    if (
      normalized === "temp-admin" ||
      normalized === "temp admin" ||
      normalized === "temporary-admin" ||
      normalized === "temporary admin" ||
      normalized === "tempadmin"
    ) {
      return "temp-admin";
    }
    return "admin";
  }

  function getAdminRoleConfig(value) {
    const key = normalizeAdminRole(value);
    return adminRoleConfigs[key] || adminRoleConfigs.admin;
  }

  function normalizeAdminGrantEntry(entry, deviceId) {
    if (!entry || typeof entry !== "object") {
      return null;
    }

    const exp = Number(entry.expiresAt || 0);
    if (exp > 0 && exp <= Date.now()) {
      return null;
    }

    const config = getAdminRoleConfig(entry.role || entry.panelRole);
    return {
      deviceId: String(deviceId || entry.deviceId || "").trim(),
      nickname: String(entry.nickname || "").trim(),
      grantedAt: Number(entry.grantedAt || entry.updatedAt || 0) || Date.now(),
      expiresAt: exp,
      role: config.key,
      roleLabel: config.label
    };
  }

  function getDeviceAdminGrant(deviceId) {
    const key = String(deviceId || "").trim();
    if (!key) {
      return null;
    }
    return normalizeAdminGrantEntry(state.adminGrantMap[key], key);
  }

  function getDeviceAdminRole(deviceId) {
    const grant = getDeviceAdminGrant(deviceId);
    return grant ? grant.role : "";
  }

  function getDeviceAdminRoleLabel(deviceId) {
    const grant = getDeviceAdminGrant(deviceId);
    return grant ? grant.roleLabel : "";
  }

  function getCurrentAdminRoleKey() {
    if (hasOwnerAccess()) {
      return "owner";
    }
    const grant = getDeviceAdminGrant(state.deviceId);
    if (grant) {
      return grant.role;
    }
    return state.unlocked ? "admin" : "";
  }

  function getCurrentAdminRoleLabel() {
    const role = getCurrentAdminRoleKey();
    if (role === "owner") {
      return "Owner";
    }
    return role ? getAdminRoleConfig(role).label : "Locked";
  }

  function hasAdminCapability(capability) {
    if (hasOwnerAccess()) {
      return true;
    }
    if (!hasAdminAccess()) {
      return false;
    }
    if (!capability) {
      return true;
    }
    const role = getCurrentAdminRoleKey();
    if (!role || role === "owner") {
      return role === "owner";
    }
    const config = getAdminRoleConfig(role);
    return !!config.capabilities[capability];
  }

  function canSendGlobalAnnouncements() {
    if (hasOwnerAccess()) {
      return true;
    }
    if (!hasAdminAccess()) {
      return false;
    }
    if (hasAdminCapability("announcement-tools")) {
      return true;
    }
    return getCurrentAdminRoleKey() === "admin";
  }

  function canUseGlobalPollControls() {
    if (hasOwnerAccess()) {
      return true;
    }
    if (!hasAdminAccess()) {
      return false;
    }
    if (hasAdminCapability("poll-tools")) {
      return true;
    }
    return getCurrentAdminRoleKey() === "admin";
  }

  function isAdminBlocked() {
    return !!state.adminBlockMap[state.deviceId];
  }

  function initPresenceTracking() {
    if (!state.firebaseReady || !state.rtdb || state.presenceRef) {
      return;
    }

    const connectedRef = state.rtdb.ref(".info/connected");
    state.presenceRef = state.rtdb.ref("arcadyAdmin/presence/site/" + state.sessionId);

    connectedRef.on("value", function (snapshot) {
      const connected = snapshot.val() === true;
      if (!connected) {
        return;
      }

      state.presenceRef.onDisconnect().remove();
      updatePresence(true);
      registerVisit();
    });

    if (state.presenceHeartbeat) {
      clearInterval(state.presenceHeartbeat);
    }

    state.presenceHeartbeat = setInterval(function () {
      updatePresence(true);
    }, 30000);

    document.addEventListener("visibilitychange", function () {
      if (document.visibilityState === "visible") {
        updatePresence(true);
      }
    });

    window.addEventListener("focus", function () {
      updatePresence(true);
    });

    window.addEventListener("storage", function (event) {
      if (event.key === "arcadyVisitorNickname") {
        enforceOwnerNicknameGate(true);
        syncAdminPanelAccessUi();
        updatePresence(true);
        return;
      }
      if (event.key === "arcadyCursorEnabled" || event.key === "arcadyCursorTheme") {
        applySelectedCursorTheme();
        applyCustomCursorState();
        syncCursorControls();
      }
    });

    window.addEventListener("arcady:nickname-change", function () {
      enforceOwnerNicknameGate(true);
      syncAdminPanelAccessUi();
      updatePresence(true);
    });
  }

  function injectStyles() {
    if (document.getElementById("arcady-admin-styles")) {
      return;
    }

    const style = document.createElement("style");
    style.id = "arcady-admin-styles";
    style.textContent = `
      html.arcady-custom-cursor-enabled,
      html.arcady-custom-cursor-enabled body,
      html.arcady-custom-cursor-enabled * {
        cursor: var(--arcady-cursor-value, auto) !important;
      }

      html.arcady-custom-cursor-enabled a,
      html.arcady-custom-cursor-enabled button,
      html.arcady-custom-cursor-enabled label,
      html.arcady-custom-cursor-enabled input[type="button"],
      html.arcady-custom-cursor-enabled input[type="submit"],
      html.arcady-custom-cursor-enabled input[type="color"],
      html.arcady-custom-cursor-enabled input[type="file"],
      html.arcady-custom-cursor-enabled select,
      html.arcady-custom-cursor-enabled summary,
      html.arcady-custom-cursor-enabled [role="button"],
      html.arcady-custom-cursor-enabled [data-launcher],
      html.arcady-custom-cursor-enabled [data-owner-site-ban],
      html.arcady-custom-cursor-enabled [data-owner-admin-grant],
      html.arcady-custom-cursor-enabled [data-owner-admin-block] {
        cursor: var(--arcady-pointer-value, pointer) !important;
      }

      [data-arcady-cursor-settings] {
        display: grid;
        gap: 8px;
        margin-bottom: 12px;
      }

      [data-arcady-cursor-settings] input[type="checkbox"] {
        width: auto !important;
        justify-self: start;
      }

      .arcady-admin-root {
        position: fixed;
        inset: 0;
        pointer-events: none;
        z-index: 2147483000;
        font-family: inherit;
      }

      .arcady-madness-layer {
        position: fixed;
        inset: 0;
        overflow: hidden;
        pointer-events: none;
        z-index: 2147483650;
      }

      .arcady-screenfx-layer {
        position: fixed;
        inset: 0;
        pointer-events: none;
        z-index: 2147483640;
        opacity: 0;
      }

      .arcady-screenfx-layer.is-visible {
        opacity: 1;
      }

      .arcady-madness-item {
        position: absolute;
        user-select: none;
        -webkit-user-drag: none;
        will-change: transform, opacity;
        filter: drop-shadow(0 16px 28px rgba(0, 0, 0, 0.24));
      }

      .arcady-madness-item.is-rain {
        animation: arcady-froggy-rain linear forwards;
      }

      .arcady-madness-item.is-pop {
        animation: arcady-froggy-pop ease-out forwards;
      }

      .arcady-madness-item.is-swarm {
        animation: arcady-froggy-swarm ease-in-out forwards;
      }

      html.arcady-screen-effect-shake body {
        animation: arcady-screen-shake 0.18s linear infinite;
        transform-origin: center center;
      }

      html.arcady-screen-effect-glitch body {
        animation: arcady-screen-glitch-jump 0.22s steps(2, end) infinite;
      }

      html.arcady-screen-effect-glitch .arcady-screenfx-layer.is-glitch,
      html.arcady-screen-effect-crazy .arcady-screenfx-layer.is-crazy {
        background:
          repeating-linear-gradient(0deg, rgba(255, 0, 92, 0.12) 0 2px, transparent 2px 5px),
          repeating-linear-gradient(90deg, rgba(0, 255, 255, 0.1) 0 3px, transparent 3px 8px);
        mix-blend-mode: screen;
        animation: arcady-screen-glitch-overlay 0.16s steps(2, end) infinite;
      }

      html.arcady-screen-effect-invert {
        filter: invert(1) hue-rotate(180deg);
      }

      html.arcady-screen-effect-flip body {
        transform: rotate(180deg);
        transform-origin: center center;
      }

      html.arcady-screen-effect-crazy {
        filter: saturate(1.8) contrast(1.3) hue-rotate(0deg);
        animation: arcady-screen-crazy-filter 1s linear infinite;
      }

      html.arcady-screen-effect-crazy body {
        animation: arcady-screen-crazy-move 0.24s ease-in-out infinite;
      }

      html.arcady-screen-effect-blur body {
        filter: blur(3px);
      }

      html.arcady-screen-effect-grayscale body {
        filter: grayscale(1) contrast(1.08);
      }

      @keyframes arcady-froggy-rain {
        0% {
          opacity: 0;
          transform: translate3d(0, -14vh, 0) rotate(-14deg) scale(0.82);
        }
        12% {
          opacity: 1;
        }
        100% {
          opacity: 0.92;
          transform: translate3d(0, 120vh, 0) rotate(20deg) scale(1.06);
        }
      }

      @keyframes arcady-froggy-pop {
        0% {
          opacity: 0;
          transform: translate3d(0, 24px, 0) scale(0.4) rotate(-10deg);
        }
        20% {
          opacity: 1;
          transform: translate3d(0, 0, 0) scale(1) rotate(2deg);
        }
        100% {
          opacity: 0;
          transform: translate3d(0, -26px, 0) scale(1.2) rotate(10deg);
        }
      }

      @keyframes arcady-froggy-swarm {
        0% {
          opacity: 0;
          transform: translate3d(0, 0, 0) scale(0.5) rotate(-12deg);
        }
        18% {
          opacity: 1;
        }
        100% {
          opacity: 0;
          transform: translate3d(var(--madness-dx, 0px), var(--madness-dy, 0px), 0) scale(1.1) rotate(var(--madness-rot, 16deg));
        }
      }

      @keyframes arcady-screen-shake {
        0% { transform: translate3d(0, 0, 0); }
        20% { transform: translate3d(-7px, 4px, 0) rotate(-0.4deg); }
        40% { transform: translate3d(6px, -4px, 0) rotate(0.45deg); }
        60% { transform: translate3d(-5px, -2px, 0) rotate(-0.3deg); }
        80% { transform: translate3d(5px, 4px, 0) rotate(0.35deg); }
        100% { transform: translate3d(0, 0, 0); }
      }

      @keyframes arcady-screen-glitch-jump {
        0% { transform: translate3d(0, 0, 0); }
        25% { transform: translate3d(-6px, 2px, 0); }
        50% { transform: translate3d(5px, -2px, 0); }
        75% { transform: translate3d(-3px, -4px, 0); }
        100% { transform: translate3d(0, 0, 0); }
      }

      @keyframes arcady-screen-glitch-overlay {
        0% { transform: translate3d(0, 0, 0); opacity: 0.55; }
        25% { transform: translate3d(-8px, 0, 0); opacity: 0.7; }
        50% { transform: translate3d(10px, 0, 0); opacity: 0.45; }
        75% { transform: translate3d(-4px, 0, 0); opacity: 0.78; }
        100% { transform: translate3d(0, 0, 0); opacity: 0.55; }
      }

      @keyframes arcady-screen-crazy-filter {
        0% { filter: saturate(1.8) contrast(1.3) hue-rotate(0deg); }
        50% { filter: saturate(2.4) contrast(1.45) hue-rotate(150deg); }
        100% { filter: saturate(1.8) contrast(1.3) hue-rotate(360deg); }
      }

      @keyframes arcady-screen-crazy-move {
        0% { transform: scale(1) rotate(0deg); }
        25% { transform: scale(1.01) rotate(0.6deg) translate3d(-4px, 2px, 0); }
        50% { transform: scale(1.02) rotate(-0.7deg) translate3d(5px, -4px, 0); }
        75% { transform: scale(1.01) rotate(0.35deg) translate3d(-4px, -3px, 0); }
        100% { transform: scale(1) rotate(0deg); }
      }

      .arcady-admin-overlay {
        position: absolute;
        inset: 0;
        background: rgba(3, 10, 20, 0.55);
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.25s ease, visibility 0.25s ease;
      }

      .arcady-admin-overlay.is-visible {
        opacity: 1;
        visibility: visible;
        pointer-events: auto;
      }

      .arcady-admin-launcher {
        position: fixed;
        right: 20px;
        bottom: 20px;
        z-index: 2600;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        border: 1px solid rgba(255, 255, 255, 0.22);
        background: rgba(255, 255, 255, 0.10);
        backdrop-filter: blur(18px) saturate(150%);
        -webkit-backdrop-filter: blur(18px) saturate(150%);
        color: #fff;
        font: 700 1rem/1 system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        padding: 0;
        transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
        pointer-events: auto;
        box-shadow: 0 18px 40px rgba(0, 0, 0, 0.24);
      }

      .arcady-admin-launcher.is-visible {
        display: inline-flex;
      }

      .arcady-admin-launcher:hover {
        transform: translateY(-1px);
        background: rgba(255, 255, 255, 0.16);
        box-shadow: 0 20px 48px rgba(0, 0, 0, 0.28);
      }

      .arcady-admin-launcher-icon {
        font-size: 1.2rem;
        color: #f8fbff;
      }

      .arcady-admin-launcher-label {
        display: inline-block;
        font-size: 0.95rem;
        font-weight: 700;
        color: #12405e;
      }

      .arcady-admin-panel,
      .arcady-owner-panel,
      .arcady-admin-password,
      .arcady-owner-password,
      .arcady-admin-toast,
      .arcady-admin-poll {
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.18);
        box-shadow: 0 24px 60px rgba(0, 0, 0, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.28);
        backdrop-filter: blur(18px) saturate(160%);
        -webkit-backdrop-filter: blur(18px) saturate(160%);
        color: #f8fbff !important;
      }
      .arcady-admin-panel *,
      .arcady-owner-panel *,
      .arcady-admin-password *,
      .arcady-owner-password *,
      .arcady-admin-toast *,
      .arcady-admin-poll * {
        color: #f8fbff !important;
      }

      .arcady-admin-password {
        position: absolute;
        top: 50%;
        left: 50%;
        width: min(92vw, 380px);
        padding: 24px;
        border-radius: 20px;
        transform: translate(-50%, -48%);
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.25s ease, transform 0.25s ease, visibility 0.25s ease;
        pointer-events: auto;
      }

      .arcady-admin-password.is-visible {
        opacity: 1;
        visibility: visible;
        transform: translate(-50%, -50%);
      }

      .arcady-admin-panel {
        position: absolute;
        top: 22px;
        right: 22px;
        width: min(92vw, 520px);
        max-height: calc(100vh - 44px);
        padding: 82px 18px 18px;
        border-radius: 20px;
        overflow: auto;
        overscroll-behavior: contain;
        -webkit-overflow-scrolling: touch;
        background: rgba(var(--arcady-admin-panel-tint, 255, 255, 255), 0.14);
        border: 1px solid rgba(var(--arcady-admin-panel-tint, 255, 255, 255), 0.24);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.14);
        backdrop-filter: blur(12px) saturate(140%);
        -webkit-backdrop-filter: blur(12px) saturate(140%);
        opacity: 0;
        visibility: hidden;
        transform: translateY(-10px) scale(0.98);
        transition: opacity 0.25s ease, transform 0.25s ease, visibility 0.25s ease;
        pointer-events: auto;
      }

      .arcady-admin-panel::before {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        height: 62px;
        background: rgba(var(--arcady-admin-panel-tint, 255, 255, 255), 0.18);
        border-bottom: 1px solid rgba(var(--arcady-admin-panel-tint, 255, 255, 255), 0.26);
        backdrop-filter: blur(12px) saturate(140%);
      }

      .arcady-admin-panel.is-left {
        left: 22px;
        right: auto;
      }

      .arcady-admin-panel.is-visible {
        opacity: 1;
        visibility: visible;
        transform: translateY(0) scale(1);
      }

      .arcady-admin-tab-panel {
        display: none;
      }

      .arcady-admin-tab-panel.is-visible {
        display: block;
      }

      .arcady-admin-panel.is-owner-mode {
        width: min(92vw, 520px);
      }

      .arcady-admin-window-tabs {
        position: relative;
        display: flex;
        gap: 10px;
        margin: 0 0 16px;
        padding: 0 0 8px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.14);
        z-index: 2;
      }

      .arcady-admin-window-tab {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 8px 14px;
        border-radius: 12px 12px 0 0;
        background: rgba(255, 255, 255, 0.12);
        color: #e9f4ff;
        font-size: 0.88rem;
        font-weight: 700;
        border: 1px solid rgba(255, 255, 255, 0.16);
        border-bottom: 1px solid transparent;
      }

      .arcady-admin-window-tab.is-active {
        background: rgba(255, 255, 255, 0.2);
        color: #fff;
        border-bottom-color: rgba(255, 255, 255, 0.2);
      }

      .arcady-admin-resize-handle {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 20px;
        height: 20px;
        cursor: se-resize;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 0 0 8px 0;
        opacity: 0.6;
        transition: opacity 0.2s ease;
      }

      .arcady-admin-resize-handle:hover {
        opacity: 1;
        background: rgba(255, 255, 255, 0.2);
      }

      .arcady-admin-title[data-panel-title] {
        margin-top: 0;
        color: #fff;
      }

      .arcady-admin-subtitle,
      .arcady-admin-status,
      .arcady-admin-meta {
        color: rgba(255, 255, 255, 0.78);
      }

      .arcady-admin-close {
        position: absolute;
        top: 16px;
        right: 16px;
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 999px;
        border: 1px solid rgba(70, 125, 180, 0.22);
        background: rgba(255, 255, 255, 0.88);
        color: #27505e;
        cursor: pointer;
        font-size: 0;
      }
      .arcady-admin-close svg {
        width: 18px;
        height: 18px;
        stroke-width: 2.2;
      }

      .arcady-admin-stack {
        position: absolute;
        right: 18px;
        bottom: 18px;
        width: min(92vw, 380px);
        display: flex;
        flex-direction: column;
        gap: 12px;
        align-items: stretch;
      }

      .arcady-xp-toast-stack {
        position: fixed;
        left: 18px;
        bottom: 18px;
        width: min(92vw, 260px);
        display: flex;
        flex-direction: column;
        gap: 8px;
        align-items: stretch;
        pointer-events: none;
      }

      .arcady-xp-toast {
        border-radius: 18px;
        padding: 10px 12px;
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.26), rgba(255, 255, 255, 0.1));
        border: 1px solid rgba(255, 255, 255, 0.28);
        box-shadow: 0 22px 55px rgba(10, 20, 35, 0.32), inset 0 1px 0 rgba(255, 255, 255, 0.25);
        backdrop-filter: blur(24px) saturate(160%);
        -webkit-backdrop-filter: blur(24px) saturate(160%);
        color: #fff;
        animation: arcady-xp-toast-in 0.22s ease;
      }

      .arcady-xp-toast-amount {
        font-size: 0.98rem;
        font-weight: 800;
      }

      .arcady-xp-toast-reason {
        margin-top: 2px;
        font-size: 0.8rem;
        color: rgba(255, 255, 255, 0.82);
      }

      .arcady-admin-toast,
      .arcady-admin-poll {
        border-radius: 24px;
        padding: 16px 16px 14px;
        pointer-events: auto;
      }

      .arcady-admin-toast {
        position: absolute;
        animation: arcady-toast-in 0.25s ease;
        width: min(92vw, 380px);
      }

      .arcady-admin-toast.is-pos-bottom {
        right: 18px;
        bottom: 18px;
      }

      .arcady-admin-toast.is-pos-top {
        left: 50%;
        right: auto;
        top: 18px;
        transform: translateX(-50%);
      }

      .arcady-admin-toast.is-pos-left {
        left: 18px;
        top: 50%;
        transform: translateY(-50%);
      }

      .arcady-admin-toast.is-pos-right {
        right: 18px;
        top: 50%;
        transform: translateY(-50%);
      }

      .arcady-admin-toast-image {
        display: block;
        width: 100%;
        max-height: 240px;
        object-fit: cover;
        border-radius: 18px;
        margin: 0 0 10px;
        border: 1px solid rgba(255, 255, 255, 0.14);
      }

      .arcady-admin-toast-head {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 10px;
      }

      .arcady-admin-toast-head .arcady-admin-title {
        margin-bottom: 0;
      }

      .arcady-admin-toast-close {
        width: 32px;
        min-width: 32px;
        height: 32px;
        padding: 0;
        border-radius: 999px;
        border: 1px solid rgba(255, 255, 255, 0.18);
        background: rgba(255, 255, 255, 0.1);
        color: #fff;
        font: inherit;
        font-weight: 700;
        line-height: 1;
        cursor: pointer;
      }

      @keyframes arcady-toast-in {
        from {
          opacity: 0;
          transform: translateY(14px) scale(0.96);
        }
        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      @keyframes arcady-xp-toast-in {
        from {
          opacity: 0;
          transform: translateY(10px) scale(0.96);
        }
        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      .arcady-admin-title {
        font-size: 1.05rem;
        font-weight: 700;
        margin-bottom: 6px;
      }

      .arcady-admin-title[data-panel-title] {
        user-select: none;
        -webkit-user-select: none;
        cursor: pointer;
      }

      .arcady-admin-subtitle,
      .arcady-admin-status,
      .arcady-admin-meta {
        font-size: 0.86rem;
        color: rgba(15, 32, 50, 0.82);
      }

      .arcady-admin-section {
        margin-top: 16px;
        padding-top: 16px;
        border-top: 1px solid rgba(var(--arcady-admin-panel-tint, 255, 255, 255), 0.16);
        background: rgba(var(--arcady-admin-panel-tint, 255, 255, 255), 0.04);
      }

      .arcady-admin-label {
        display: block;
        font-size: 0.88rem;
        margin-bottom: 6px;
        color: rgba(255, 255, 255, 0.85);
      }

      .arcady-admin-input,
      .arcady-admin-textarea,
      .arcady-admin-button,
      .arcady-admin-option-button {
        width: 100%;
        border: 1px solid rgba(255, 255, 255, 0.18);
        border-radius: 16px;
        background: rgba(var(--arcady-admin-panel-tint, 255, 255, 255), 0.10);
        color: #f8fbff;
      }

      .arcady-admin-input,
      .arcady-admin-textarea {
        padding: 11px 13px;
        font: inherit;
        outline: none;
      }

      .arcady-admin-input::placeholder,
      .arcady-admin-textarea::placeholder {
        color: rgba(255, 255, 255, 0.6);
      }

      .arcady-admin-textarea {
        min-height: 92px;
        resize: vertical;
      }

      .arcady-admin-row {
        display: flex;
        gap: 10px;
        align-items: center;
      }

      .arcady-admin-checkbox {
        width: auto;
        height: auto;
        min-width: auto;
        margin-right: 10px;
      }

      .arcady-admin-toggle-button {
        width: auto;
        min-width: 160px;
        border-radius: 16px;
        background: rgba(var(--arcady-admin-panel-tint, 255, 255, 255), 0.12);
        border: 1px solid rgba(255, 255, 255, 0.18);
        color: #f8fbff;
        padding: 11px 14px;
      }

      .arcady-admin-toggle-button.is-active {
        background: rgba(255, 255, 255, 0.22);
        border-color: rgba(255, 255, 255, 0.32);
      }

      .arcady-admin-button,
      .arcady-admin-option-button {
        padding: 11px 13px;
        font: inherit;
        font-weight: 700;
        cursor: pointer;
        transition: transform 0.18s ease, background 0.18s ease;
      }

      .arcady-admin-button:hover,
      .arcady-admin-option-button:hover {
        transform: translateY(-1px);
        background: rgba(255, 255, 255, 0.18);
      }

      .arcady-admin-soundboard {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
        gap: 8px;
        margin-top: 12px;
        max-height: 260px;
        overflow: auto;
        padding-right: 4px;
      }

      .arcady-admin-sound-actions {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
        gap: 10px;
        margin-top: 12px;
      }

      .arcady-admin-sound-button {
        min-height: 64px;
        text-align: left;
        overflow: hidden;
      }

      .arcady-admin-sound-button.is-active {
        background: rgba(98, 232, 255, 0.2);
        border-color: rgba(98, 232, 255, 0.48);
      }

      .arcady-admin-sound-label,
      .arcady-admin-sound-meta {
        display: block;
      }

      .arcady-admin-sound-label {
        display: -webkit-box;
        font-weight: 700;
        line-height: 1.2;
        overflow: hidden;
        word-break: break-word;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }

      .arcady-admin-sound-meta {
        margin-top: 5px;
        font-size: 0.72rem;
        color: rgba(255, 255, 255, 0.7);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .arcady-admin-button.is-secondary {
        background: rgba(255, 255, 255, 0.08);
      }

      .arcady-admin-button.is-danger {
        background: rgba(255, 90, 90, 0.2);
      }

      .arcady-admin-button[disabled],
      .arcady-admin-option-button[disabled] {
        opacity: 0.55;
        cursor: not-allowed;
        transform: none;
      }

      .arcady-admin-color {
        width: 72px;
        min-width: 72px;
        height: 46px;
        padding: 4px;
        cursor: pointer;
      }

      .arcady-admin-poll-options {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-top: 12px;
      }

      .arcady-admin-option-button {
        text-align: left;
      }

      .arcady-admin-option-button.is-selected {
        background: rgba(130, 220, 255, 0.24);
        border-color: rgba(130, 220, 255, 0.5);
      }

      .arcady-admin-option-fill {
        display: block;
        height: 7px;
        margin-top: 7px;
        border-radius: 999px;
        background: linear-gradient(90deg, rgba(98, 232, 255, 0.95), rgba(193, 255, 226, 0.95));
      }

      .arcady-admin-close {
        position: absolute;
        top: 14px;
        right: 14px;
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 999px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        background: rgba(255, 255, 255, 0.1);
        color: #fff;
        cursor: pointer;
        font-size: 0;
      }
      .arcady-admin-close svg {
        width: 18px;
        height: 18px;
        stroke-width: 2.2;
      }

      .arcady-admin-hint {
        margin-top: 10px;
        font-size: 0.82rem;
        color: rgba(255, 255, 255, 0.68);
      }

      .arcady-owner-password,
      .arcady-owner-panel {
        position: absolute;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.25s ease, transform 0.25s ease, visibility 0.25s ease;
        pointer-events: auto;
      }

      .arcady-owner-password {
        top: 50%;
        left: 50%;
        width: min(92vw, 420px);
        padding: 24px;
        border-radius: 24px;
        transform: translate(-50%, -48%);
      }

      .arcady-owner-password.is-visible {
        opacity: 1;
        visibility: visible;
        transform: translate(-50%, -50%);
      }

      .arcady-owner-panel {
        inset: 16px;
        top: 16px;
        right: 16px;
        bottom: 16px;
        left: 16px;
        width: auto;
        max-height: calc(100vh - 32px);
        padding: 24px;
        border-radius: 22px;
        overflow: auto;
        overscroll-behavior: contain;
        -webkit-overflow-scrolling: touch;
        background: rgba(15, 24, 42, 0.78);
        border: 1px solid rgba(255, 255, 255, 0.18);
        box-shadow: 0 32px 90px rgba(0, 0, 0, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(20px) saturate(150%);
        -webkit-backdrop-filter: blur(20px) saturate(150%);
        transform: translateY(10px) scale(0.98);
      }

      .arcady-owner-panel.is-visible {
        opacity: 1;
        visibility: visible;
        transform: translateY(0) scale(1);
      }

      .arcady-jumpscare-overlay {
        position: fixed;
        inset: 0;
        display: none;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.01);
        pointer-events: none;
        z-index: 2147483646;
      }

      .arcady-jumpscare-overlay.is-visible {
        display: flex;
      }

      .arcady-jumpscare-canvas {
        width: 100vw;
        height: 100vh;
        display: block;
      }

      .arcady-jumpscare-video {
        position: absolute;
        width: 1px;
        height: 1px;
        opacity: 0;
        pointer-events: none;
      }

      .arcady-owner-panel > .arcady-admin-title {
        margin-right: 48px;
        font-size: 1.18rem;
        letter-spacing: 0.02em;
        color: #f8fbff;
      }

      .arcady-owner-panel > .arcady-admin-status {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        margin: 8px 0 18px;
        padding: 9px 12px;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.12);
        border: 1px solid rgba(255, 255, 255, 0.18);
        color: #f8fbff;
      }

      .arcady-owner-shell {
        display: grid;
        width: min(100%, 1440px);
        margin: 0 auto;
        gap: 18px;
      }

      .arcady-owner-hero,
      .arcady-owner-card {
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.14);
        border-radius: 24px;
        padding: 20px;
        box-shadow: 0 18px 50px rgba(0, 0, 0, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.16);
        backdrop-filter: blur(14px) saturate(150%);
        -webkit-backdrop-filter: blur(14px) saturate(150%);
      }

      .arcady-owner-hero {
        display: flex;
        justify-content: space-between;
        gap: 16px;
        align-items: center;
        padding: 24px;
        background:
          radial-gradient(circle at right top, rgba(82, 147, 255, 0.24), transparent 34%),
          linear-gradient(145deg, rgba(18, 32, 60, 0.96), rgba(8, 13, 27, 0.96));
      }

      .arcady-owner-grid {
        display: grid;
        grid-template-columns: repeat(12, minmax(0, 1fr));
        gap: 18px;
      }

      .arcady-owner-span-12 { grid-column: span 12; }
      .arcady-owner-span-7 { grid-column: span 7; }
      .arcady-owner-span-6 { grid-column: span 6; }
      .arcady-owner-span-5 { grid-column: span 5; }

      .arcady-owner-stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
        gap: 12px;
        margin-top: 14px;
      }

      .arcady-owner-stat {
        border-radius: 20px;
        padding: 16px;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0.03));
        border: 1px solid rgba(255, 255, 255, 0.11);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
      }

      .arcady-owner-stat-value {
        font-size: 1.85rem;
        font-weight: 800;
        margin-bottom: 6px;
        letter-spacing: -0.02em;
      }

      .arcady-owner-controls,
      .arcady-owner-actions {
        display: grid;
        gap: 10px;
      }

      .arcady-owner-inline-two {
        display: grid;
        grid-template-columns: 84px 1fr;
        gap: 10px;
      }

      .arcady-owner-actions {
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      }

      .arcady-owner-list {
        display: grid;
        gap: 10px;
        margin-top: 14px;
        max-height: 420px;
        overflow: auto;
        padding-right: 4px;
      }

      .arcady-owner-item {
        border-radius: 20px;
        padding: 15px;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0.03));
        border: 1px solid rgba(255, 255, 255, 0.1);
      }

      .arcady-owner-item-top {
        display: flex;
        justify-content: space-between;
        gap: 12px;
        align-items: flex-start;
      }

      .arcady-owner-color-line {
        display: inline-flex;
        align-items: center;
        gap: 8px;
      }

      .arcady-owner-color-chip {
        width: 16px;
        height: 16px;
        border-radius: 999px;
        border: 1px solid rgba(255, 255, 255, 0.32);
        box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.06);
      }

      .arcady-owner-mini-actions {
        width: 100%;
        min-width: 0;
        display: grid;
        gap: 8px;
      }

      .arcady-owner-edit-grid {
        margin-top: 12px;
        display: grid;
        gap: 8px;
      }

      @media (max-width: 1100px) {
        .arcady-owner-panel {
          inset: 10px;
          padding: 16px;
        }

        .arcady-owner-span-12,
        .arcady-owner-span-7,
        .arcady-owner-span-6,
        .arcady-owner-span-5 {
          grid-column: span 12;
        }

        .arcady-owner-hero,
        .arcady-owner-item-top {
          align-items: stretch;
          flex-direction: column;
        }

        .arcady-owner-mini-actions {
          width: 100%;
          min-width: 0;
        }
      }

      .arcady-ban-overlay {
        position: fixed;
        inset: 0;
        display: none;
        align-items: center;
        justify-content: center;
        padding: 24px;
        background: rgba(5, 7, 10, 0.86);
        backdrop-filter: blur(18px);
        -webkit-backdrop-filter: blur(18px);
        z-index: 2147483600;
        pointer-events: auto;
      }

      .arcady-ban-overlay.is-visible {
        display: flex;
      }

      .arcady-ban-card {
        width: min(520px, 100%);
        padding: 26px;
        border-radius: 28px;
        text-align: center;
        background: linear-gradient(180deg, rgba(42, 20, 26, 0.96), rgba(20, 11, 16, 0.98));
        border: 1px solid rgba(255, 100, 100, 0.24);
        color: #fff;
      }

      .arcady-nickname-overlay {
        position: fixed;
        inset: 0;
        display: none;
        align-items: center;
        justify-content: center;
        padding: 24px;
        background: rgba(5, 10, 18, 0.86);
        backdrop-filter: blur(18px);
        -webkit-backdrop-filter: blur(18px);
        z-index: 2147483700;
        pointer-events: auto;
      }

      .arcady-nickname-overlay.is-visible {
        display: flex;
      }

      .arcady-nickname-card {
        width: min(460px, 100%);
        padding: 26px;
        border-radius: 28px;
        background: linear-gradient(180deg, rgba(23, 32, 54, 0.98), rgba(12, 18, 32, 0.98));
        border: 1px solid rgba(255, 255, 255, 0.18);
        color: #fff;
        text-align: left;
        pointer-events: auto;
      }

      @media (max-width: 640px) {
        .arcady-admin-panel {
          top: auto;
          left: 14px;
          right: 14px;
          bottom: 14px;
          width: auto;
          max-height: min(82vh, 680px);
        }

        .arcady-admin-panel.is-left {
          left: 14px;
          right: 14px;
        }

        .arcady-admin-password {
          width: calc(100vw - 28px);
        }
      }
    `;

    document.head.appendChild(style);
  }

  function buildUi() {
    const root = document.createElement("div");
    root.className = "arcady-admin-root";
    root.innerHTML = `
      <button class="arcady-admin-launcher" type="button" data-launcher aria-label="Open admin"><i data-lucide="user-star" class="arcady-admin-launcher-icon"></i></button>
      <div class="arcady-admin-overlay" data-overlay></div>
      <div class="arcady-admin-password" data-password-modal>
        <button class="arcady-admin-close" type="button" data-close-password aria-label="Close"><i data-lucide="x"></i></button>
        <div class="arcady-admin-title">Admin Panel</div>
        <div class="arcady-admin-subtitle">Press the hidden shortcut, then enter the password.</div>
        <div class="arcady-admin-section">
          <label class="arcady-admin-label" for="arcady-admin-password-input">Password</label>
          <input id="arcady-admin-password-input" class="arcady-admin-input" type="password" placeholder="Enter password">
          <button class="arcady-admin-button" type="button" data-password-submit style="margin-top:12px;">Unlock Admin</button>
          <div class="arcady-admin-hint" data-password-message></div>
        </div>
      </div>
      <aside class="arcady-admin-panel" data-panel>
        <button class="arcady-admin-close" type="button" data-close-panel aria-label="Close"><i data-lucide="x"></i></button>
        <div class="arcady-admin-window-tabs">
          <span class="arcady-admin-window-tab is-active" data-tab="home">Home</span>
          <span class="arcady-admin-window-tab" data-tab="owner">Owner</span>
          <span class="arcady-admin-window-tab" data-tab="settings">Settings</span>
        </div>
        <div class="arcady-admin-title" data-panel-title>Arcady Admin</div>
        <div class="arcady-admin-status" data-status>Connecting to Firebase...</div>
        <div class="arcady-admin-meta" data-admin-role-summary>Current panel: Admin</div>

        <div class="arcady-admin-tab-panel" data-tab-content="settings" hidden>
          <section class="arcady-admin-section">
            <div class="arcady-admin-title">Admin panel appearance</div>
            <label class="arcady-admin-label" for="arcady-admin-panel-color">Panel tint</label>
            <div class="arcady-admin-row">
              <input id="arcady-admin-panel-color" class="arcady-admin-input arcady-admin-color" type="color" value="#ffffff">
              <input id="arcady-admin-panel-color-text" class="arcady-admin-input" type="text" value="#ffffff" placeholder="#ffffff">
            </div>
            <div class="arcady-admin-row" style="margin-top:10px; gap:10px;">
              <button class="arcady-admin-button" type="button" data-save-admin-panel-color>Save Tint</button>
              <span class="arcady-admin-meta" style="margin-top:0;">Click save to persist the admin panel tint.</span>
            </div>
          </section>
            </div>

        <div class="arcady-admin-tab-panel" data-tab-content="owner" hidden>
          <section class="arcady-admin-section" data-owner-entry-section hidden>
            <div class="arcady-admin-title">Owner Mode</div>
            <div class="arcady-admin-meta" data-owner-status>Open the separate owner panel from here.</div>
            <div class="arcady-admin-row" style="margin-top:12px;">
              <button class="arcady-admin-button" type="button" data-open-owner-access>Access Owner</button>
            </div>
            <div class="arcady-owner-controls" data-owner-unlock style="margin-top:12px;">
              <input id="arcady-owner-password-input" class="arcady-admin-input" type="password" placeholder="Enter owner password">
              <button class="arcady-admin-button" type="button" data-owner-password-submit>Unlock Owner</button>
            </div>
          </section>
        </div>

        <div class="arcady-admin-tab-panel is-visible" data-tab-content="home">
          <div data-admin-only>
          <section class="arcady-admin-section" data-admin-capability="standard-broadcast">
          <label class="arcady-admin-label" for="arcady-announcement-input">Global announcement</label>
          <textarea id="arcady-announcement-input" class="arcady-admin-textarea" placeholder="Type a message that should pop up on every page."></textarea>
          <div class="arcady-owner-controls" data-admin-capability="announcement-tools" style="margin-top:12px;">
            <input id="arcady-admin-announcement-image" class="arcady-admin-input" type="text" placeholder="Announcement image URL or local path">
            <select id="arcady-admin-announcement-position" class="arcady-admin-input">
              <option value="bottom">Bottom</option>
              <option value="top">Top</option>
            </select>
            <input id="arcady-admin-announcement-duration" class="arcady-admin-input" type="number" min="3" max="120" step="1" placeholder="Announcement duration in seconds">
          </div>
          <div class="arcady-admin-row" style="margin-top:10px;">
            <button class="arcady-admin-button" type="button" data-send-announcement>Send Announcement</button>
            <button class="arcady-admin-button is-secondary" type="button" data-admin-close-announcement data-admin-capability="announcement-tools">Close Announcements</button>
            <button class="arcady-admin-button is-secondary" type="button" data-admin-save-announcement-duration data-admin-capability="announcement-tools">Save Duration</button>
          </div>
        </section>

        <section class="arcady-admin-section" data-admin-capability="base-admin-ui">
          <label class="arcady-admin-label" for="arcady-background-input">Realtime background color</label>
          <div class="arcady-admin-row">
            <input id="arcady-background-input" class="arcady-admin-input arcady-admin-color" type="color" value="#0f172a">
            <input id="arcady-background-text" class="arcady-admin-input" type="text" value="#0f172a" placeholder="#0f172a">
          </div>
          <div class="arcady-admin-hint">Color updates push live while you move the picker.</div>
          <label class="arcady-admin-label" for="arcady-background-image-select" style="margin-top:12px;">Global background image</label>
          <select id="arcady-background-image-select" class="arcady-admin-input">
            <option value="">Loading backgrounds...</option>
          </select>
          <div class="arcady-admin-row" style="margin-top:10px;">
            <button class="arcady-admin-button" type="button" data-apply-background-image>Apply Image</button>
            <button class="arcady-admin-button is-secondary" type="button" data-revert-background>Revert</button>
          </div>
        </section>

        <section class="arcady-admin-section" data-admin-capability="live-soundboard">
          <div class="arcady-admin-title">Live Soundboard</div>
          <div class="arcady-admin-meta" data-admin-sound-status>Loading sounds from features/Mp3s/...</div>
          <div class="arcady-admin-soundboard" data-admin-soundboard></div>
        </section>

        <section class="arcady-admin-section" data-admin-capability="standard-poll">
          <label class="arcady-admin-label" for="arcady-poll-question">Poll question</label>
          <input id="arcady-poll-question" class="arcady-admin-input" type="text" placeholder="What should everyone vote on?">
          <label class="arcady-admin-label" for="arcady-poll-options" style="margin-top:12px;">Poll options</label>
          <textarea id="arcady-poll-options" class="arcady-admin-textarea" placeholder="One option per line&#10;Option 1&#10;Option 2&#10;Option 3"></textarea>
          <input id="arcady-admin-poll-duration" class="arcady-admin-input" data-admin-capability="poll-tools" type="number" min="3" max="120" step="1" placeholder="Poll duration in seconds" style="margin-top:12px;">
          <div class="arcady-admin-row" style="margin-top:10px;">
            <button class="arcady-admin-button" type="button" data-send-poll>Send Poll</button>
            <button class="arcady-admin-button is-secondary" type="button" data-close-poll>Close Poll</button>
            <button class="arcady-admin-button is-secondary" type="button" data-admin-save-poll-duration data-admin-capability="poll-tools">Save Duration</button>
          </div>
        </section>

        <section class="arcady-admin-section" data-admin-capability="moderation-tools">
          <div class="arcady-admin-title">Corrupted Admin tools</div>
          <div class="arcady-admin-meta">Corrupted Admin includes every Supreme Admin control (announcements, polls, background, Live TV, soundboard, global theme, cursor, homepage news, wall of fame, XP). This block is for moderation: match a nickname to an online visitor or XP profile, chat timeouts (homepage chat only), auto-expiring temporary site bans, and 24h Temporary Admin grants.</div>
          <div class="arcady-owner-controls" style="margin-top:12px;">
            <input id="arcady-corrupted-target-nickname" class="arcady-admin-input" type="text" maxlength="24" placeholder="Visitor nickname">
            <select id="arcady-corrupted-duration" class="arcady-admin-input" title="Duration for timeout or temporary ban">
              <option value="300000">5 minutes</option>
              <option value="600000">10 minutes</option>
              <option value="1800000">30 minutes</option>
              <option value="3600000">1 hour</option>
              <option value="86400000">1 day</option>
              <option value="864000000">10 days</option>
            </select>
            <div class="arcady-owner-actions">
              <button class="arcady-admin-button is-danger" type="button" data-corrupted-chat-timeout>Timeout chat</button>
              <button class="arcady-admin-button is-secondary" type="button" data-corrupted-clear-timeout>Clear chat timeout</button>
              <button class="arcady-admin-button is-danger" type="button" data-corrupted-temp-site-ban>Temporary site ban</button>
              <button class="arcady-admin-button" type="button" data-corrupted-grant-temp-admin>Grant Temporary Admin (24h)</button>
            </div>
          </div>
          <div class="arcady-admin-title" style="margin-top:18px;">Custom Pet Companion</div>
          <div class="arcady-admin-meta">Upload a GIF/image or paste a URL to change the shared site pet.</div>
          <input id="arcady-pet-upload-url" class="arcady-admin-input" type="text" placeholder="Image URL or local path">
          <input id="arcady-pet-upload-file" class="arcady-admin-input" type="file" accept="image/*">
          <div class="arcady-owner-actions" style="margin-top:10px;">
            <button class="arcady-admin-button" type="button" data-upload-pet-image>Upload Pet Image</button>
          </div>
        </section>

        <section class="arcady-admin-section" data-admin-capability="base-admin-ui">
          <div class="arcady-admin-title">Live TV Broadcast</div>
          <div class="arcady-admin-meta" data-admin-video-status>Loading videos from features/Mp4s/...</div>
          <div class="arcady-owner-controls" style="margin-top:12px;">
            <input id="arcady-admin-video-url" class="arcady-admin-input" type="text" placeholder="Paste a YouTube, MP4, GIF, or image link for Live TV">
            <div class="arcady-owner-actions">
              <button class="arcady-admin-button" type="button" data-admin-broadcast-video-url>Broadcast Media</button>
              <button class="arcady-admin-button" type="button" data-admin-broadcast-camera>Broadcast Camera</button>
              <button class="arcady-admin-button" type="button" data-admin-broadcast-screen>Broadcast Screen</button>
            </div>
          </div>
          <div class="arcady-admin-sound-actions">
            <button class="arcady-admin-button is-danger" type="button" data-admin-stop-video>Stop Broadcast</button>
          </div>
          <div class="arcady-admin-soundboard" data-admin-video-board></div>
        </section>

        <!-- Global Theme removed -->

        <section class="arcady-admin-section" data-admin-capability="custom-cursor">
          <div class="arcady-admin-title">Custom Cursor</div>
          <div class="arcady-admin-meta" data-admin-cursor-status>Loading cursor setting...</div>
          <div class="arcady-owner-controls" style="margin-top:12px;">
            <select id="arcady-admin-cursor-theme" class="arcady-admin-input">
              <option value="">Loading cursor themes...</option>
            </select>
            <div class="arcady-owner-actions">
              <button class="arcady-admin-button" type="button" data-admin-apply-cursor-theme>Apply Theme</button>
              <button class="arcady-admin-button is-secondary" type="button" data-admin-toggle-cursor>Disable Cursor</button>
            </div>
          </div>
        </section>

        <section class="arcady-admin-section" data-admin-capability="homepage-news">
          <div class="arcady-admin-title">Homepage News</div>
          <div class="arcady-owner-controls" style="margin-top:12px;">
            <textarea id="arcady-admin-home-news-input" class="arcady-admin-textarea" placeholder="Write the live news text that appears on the homepage."></textarea>
            <div class="arcady-owner-actions">
              <button class="arcady-admin-button" type="button" data-admin-save-home-news>Save News</button>
              <button class="arcady-admin-button is-secondary" type="button" data-admin-clear-home-news>Clear News</button>
            </div>
          </div>
        </section>

        <section class="arcady-admin-section" data-admin-capability="wall-of-fame">
          <div class="arcady-admin-title">Wall of Fame</div>
          <div class="arcady-admin-meta">Bars get taller from left to right based on this list order.</div>
          <div class="arcady-owner-controls" style="margin-top:12px;">
            <input id="arcady-admin-wall-rank" class="arcady-admin-input" type="text" maxlength="40" placeholder="Rank title, like Gold or #1">
            <input id="arcady-admin-wall-name" class="arcady-admin-input" type="text" maxlength="40" placeholder="Name to show on the wall">
            <div class="arcady-owner-inline-two">
              <input id="arcady-admin-wall-color" class="arcady-admin-input arcady-admin-color" type="color" value="#38bdf8">
              <input id="arcady-admin-wall-color-text" class="arcady-admin-input" type="text" value="#38bdf8" placeholder="#38bdf8">
            </div>
            <div class="arcady-owner-actions">
              <button class="arcady-admin-button" type="button" data-admin-add-wall-entry>Add Entry</button>
              <button class="arcady-admin-button is-secondary" type="button" data-admin-clear-wall>Clear Wall</button>
            </div>
            <div class="arcady-owner-list" data-admin-wall-list></div>
          </div>
        </section>

        <section class="arcady-admin-section" data-admin-capability="xp-controls">
          <div class="arcady-admin-title">XP Controls</div>
          <div class="arcady-admin-meta">Give XP to everyone, one nickname, or yourself.</div>
          <div class="arcady-owner-controls" style="margin-top:12px;">
            <input id="arcady-admin-xp-amount" class="arcady-admin-input" type="number" min="1" max="100000" step="1" value="25" placeholder="XP amount">
            <input id="arcady-admin-xp-nickname" class="arcady-admin-input" type="text" maxlength="24" placeholder="Nickname for specific XP">
            <div class="arcady-owner-actions">
              <button class="arcady-admin-button" type="button" data-admin-give-xp-everyone>Give Everyone XP</button>
              <button class="arcady-admin-button" type="button" data-admin-give-xp-user>Give Nickname XP</button>
              <button class="arcady-admin-button is-secondary" type="button" data-admin-give-xp-self>Give Myself XP</button>
            </div>
          </div>
        </section>
        </div>

        <div class="arcady-owner-shell" data-owner-only hidden>
          <section class="arcady-owner-hero">
            <div>
              <div class="arcady-admin-subtitle">Separate owner controls</div>
              <div class="arcady-admin-title" style="font-size:1.4rem;">Arcady Owner Controls</div>
              <div class="arcady-admin-meta">Owner tools now open in their own separate owner panel.</div>
            </div>
          </section>
        <div class="arcady-owner-grid">
          <section class="arcady-owner-card arcady-owner-span-12">
            <div class="arcady-admin-title">Overview</div>
            <div class="arcady-admin-meta">Live visitors, admin viewers, game activity, and blocked devices.</div>
            <div class="arcady-owner-stats">
              <div class="arcady-owner-stat"><div class="arcady-owner-stat-value" data-owner-stat-visitors>0</div><div class="arcady-admin-meta">Active visitors</div></div>
              <div class="arcady-owner-stat"><div class="arcady-owner-stat-value" data-owner-stat-admin>0</div><div class="arcady-admin-meta">On admin panel</div></div>
              <div class="arcady-owner-stat"><div class="arcady-owner-stat-value" data-owner-stat-playing>0</div><div class="arcady-admin-meta">Playing games</div></div>
              <div class="arcady-owner-stat"><div class="arcady-owner-stat-value" data-owner-stat-blocked>0</div><div class="arcady-admin-meta">Blocked devices</div></div>
            </div>
          </section>
          <section class="arcady-owner-card arcady-owner-span-6">
            <div class="arcady-admin-title">Announcements</div>
            <div class="arcady-owner-controls" style="margin-top:12px;">
              <textarea id="arcady-owner-announcement-input" class="arcady-admin-textarea" placeholder="Type a global announcement."></textarea>
              <input id="arcady-owner-announcement-image" class="arcady-admin-input" type="text" placeholder="Announcement image URL or local path">
              <select id="arcady-owner-announcement-position" class="arcady-admin-input">
                <option value="bottom">Bottom</option>
                <option value="top">Top</option>
              </select>
              <input id="arcady-owner-announcement-duration" class="arcady-admin-input" type="number" min="3" max="120" step="1" placeholder="Announcement duration in seconds">
              <div class="arcady-owner-actions">
                <button class="arcady-admin-button" type="button" data-owner-send-announcement>Send Announcement</button>
                <button class="arcady-admin-button is-secondary" type="button" data-owner-close-announcement>Close Announcements</button>
                <button class="arcady-admin-button is-secondary" type="button" data-owner-save-announcement-duration>Save Duration</button>
              </div>
            </div>
          </section>
          <section class="arcady-owner-card arcady-owner-span-6">
            <div class="arcady-admin-title">Background Controls</div>
            <div class="arcady-owner-controls" style="margin-top:12px;">
              <div class="arcady-owner-inline-two">
                <input id="arcady-owner-bg-color" class="arcady-admin-input arcady-admin-color" type="color" value="#0f172a">
                <input id="arcady-owner-bg-color-text" class="arcady-admin-input" type="text" value="#0f172a" placeholder="#0f172a">
              </div>
              <select id="arcady-owner-bg-image" class="arcady-admin-input">
                <option value="">Loading backgrounds...</option>
              </select>
              <div class="arcady-owner-actions">
                <button class="arcady-admin-button" type="button" data-owner-apply-color>Push Color</button>
                <button class="arcady-admin-button" type="button" data-owner-apply-image>Apply Image</button>
                <button class="arcady-admin-button is-secondary" type="button" data-owner-revert-background>Revert Background</button>
              </div>
            </div>
          </section>
          <!-- Owner Global Theme removed -->
          <section class="arcady-owner-card arcady-owner-span-6">
            <div class="arcady-admin-title">Polls</div>
            <div class="arcady-owner-controls" style="margin-top:12px;">
              <input id="arcady-owner-poll-question" class="arcady-admin-input" type="text" placeholder="Poll question">
              <textarea id="arcady-owner-poll-options" class="arcady-admin-textarea" placeholder="One option per line"></textarea>
              <input id="arcady-owner-poll-duration" class="arcady-admin-input" type="number" min="3" max="120" step="1" placeholder="Poll duration in seconds">
              <div class="arcady-owner-actions">
                <button class="arcady-admin-button" type="button" data-owner-send-poll>Send Poll</button>
                <button class="arcady-admin-button is-secondary" type="button" data-owner-close-poll>Close Poll</button>
                <button class="arcady-admin-button is-secondary" type="button" data-owner-save-poll-duration>Save Duration</button>
              </div>
            </div>
          </section>
          <section class="arcady-owner-card arcady-owner-span-6">
            <div class="arcady-admin-title">Homepage News</div>
            <div class="arcady-owner-controls" style="margin-top:12px;">
              <textarea id="arcady-owner-home-news-input" class="arcady-admin-textarea" placeholder="Write the live news text that appears on the homepage."></textarea>
              <div class="arcady-owner-actions">
                <button class="arcady-admin-button" type="button" data-owner-save-home-news>Save News</button>
                <button class="arcady-admin-button is-secondary" type="button" data-owner-clear-home-news>Clear News</button>
              </div>
            </div>
          </section>
          <section class="arcady-owner-card arcady-owner-span-6">
            <div class="arcady-admin-title">Custom Pet Companion</div>
            <div class="arcady-admin-meta">Upload a GIF/image or paste a link to update the shared pet companion across pages.</div>
            <div class="arcady-owner-controls" style="margin-top:12px;">
              <input id="arcady-owner-pet-upload-url" class="arcady-admin-input" type="text" placeholder="Image URL or local path">
              <input id="arcady-owner-pet-upload-file" class="arcady-admin-input" type="file" accept="image/*">
              <div class="arcady-owner-actions" style="margin-top:10px;">
                <button class="arcady-admin-button" type="button" data-owner-upload-pet-image>Upload Pet Image</button>
              </div>
            </div>
          </section>
          <section class="arcady-owner-card arcady-owner-span-6">
            <div class="arcady-admin-title">Wall of Fame</div>
            <div class="arcady-admin-meta">Bars get taller from left to right based on this list order.</div>
            <div class="arcady-owner-controls" style="margin-top:12px;">
              <input id="arcady-owner-wall-rank" class="arcady-admin-input" type="text" maxlength="40" placeholder="Rank title, like Gold or #1">
              <input id="arcady-owner-wall-name" class="arcady-admin-input" type="text" maxlength="40" placeholder="Name to show on the wall">
              <div class="arcady-owner-inline-two">
                <input id="arcady-owner-wall-color" class="arcady-admin-input arcady-admin-color" type="color" value="#38bdf8">
                <input id="arcady-owner-wall-color-text" class="arcady-admin-input" type="text" value="#38bdf8" placeholder="#38bdf8">
              </div>
              <div class="arcady-owner-actions">
                <button class="arcady-admin-button" type="button" data-owner-add-wall-entry>Add Entry</button>
                <button class="arcady-admin-button is-secondary" type="button" data-owner-clear-wall>Clear Wall</button>
              </div>
              <div class="arcady-owner-list" data-owner-wall-list></div>
            </div>
          </section>
          <section class="arcady-owner-card arcady-owner-span-6">
            <div class="arcady-admin-title">Nickname Controls</div>
            <div class="arcady-admin-meta">Grant a panel tier, remove it, or ban a visitor using their nickname.</div>
            <div class="arcady-owner-controls" style="margin-top:12px;">
              <input id="arcady-owner-admin-nickname" class="arcady-admin-input" type="text" maxlength="24" placeholder="Type a nickname">
              <select id="arcady-owner-admin-role" class="arcady-admin-input">
                <option value="admin">Admin</option>
                <option value="super-admin">Super Admin</option>
                <option value="supreme-admin">Supreme Admin</option>
                <option value="corrupted-admin">Corrupted Admin</option>
                <option value="temp-admin">Temporary Admin</option>
              </select>
              <select id="arcady-owner-temp-ban-duration" class="arcady-admin-input" title="Duration for temporary site ban">
                <option value="300000">Temp ban: 5 minutes</option>
                <option value="600000">Temp ban: 10 minutes</option>
                <option value="1800000">Temp ban: 30 minutes</option>
                <option value="3600000">Temp ban: 1 hour</option>
                <option value="86400000">Temp ban: 1 day</option>
                <option value="864000000">Temp ban: 10 days</option>
              </select>
              <div class="arcady-owner-actions">
                <button class="arcady-admin-button" type="button" data-owner-grant-admin-by-nickname>Grant Panel</button>
                <button class="arcady-admin-button is-secondary" type="button" data-owner-remove-admin-by-nickname>Remove Panel</button>
                <button class="arcady-admin-button is-danger" type="button" data-owner-ban-by-nickname>Ban User</button>
                <button class="arcady-admin-button is-danger" type="button" data-owner-temp-ban-by-nickname>Temporary Ban</button>
                <button class="arcady-admin-button" type="button" data-owner-temp-admin-by-nickname>Temporary Admin (24h)</button>
              </div>
            </div>
          </section>
          <section class="arcady-owner-card arcady-owner-span-12">
            <div class="arcady-admin-title">Homepage chat name tags</div>
            <div class="arcady-admin-meta">Discord-style pills next to names in the homepage chat. Create tags here, then paste a visitor device id from Active Visitors and choose which tags they wear.</div>
            <div class="arcady-owner-controls" style="margin-top:12px;">
              <input id="arcady-owner-nametag-label" class="arcady-admin-input" type="text" maxlength="32" placeholder="Tag label (e.g. MOD, VIP, Ooze)">
              <div class="arcady-owner-inline-two">
                <input id="arcady-owner-nametag-bg" class="arcady-admin-input arcady-admin-color" type="color" value="#5865f2">
                <input id="arcady-owner-nametag-fg" class="arcady-admin-input arcady-admin-color" type="color" value="#ffffff">
              </div>
              <label class="arcady-admin-label" for="arcady-owner-nametag-effect" style="margin-top:8px;">Tag effect</label>
              <select id="arcady-owner-nametag-effect" class="arcady-admin-input">
                <option value="none">None</option>
                <option value="glow">Glow</option>
                <option value="shimmer">Shimmer</option>
                <option value="pulse">Pulse</option>
                <option value="rainbow">Rainbow</option>
              </select>
              <div class="arcady-owner-actions">
                <button class="arcady-admin-button" type="button" data-owner-chat-nametag-create>Create name tag</button>
              </div>
              <div class="arcady-admin-meta" style="margin-top:14px;">Your tags</div>
              <div class="arcady-owner-list" data-owner-chat-nametag-list></div>
              <div class="arcady-admin-meta" style="margin-top:14px;">Assign to visitor device</div>
              <input id="arcady-owner-chat-tags-device" class="arcady-admin-input" type="text" placeholder="device-… (copy from Active Visitors, or use Chat tags device there)">
              <div class="arcady-owner-list" data-owner-chat-nametag-assign-checks style="margin-top:8px;"></div>
              <div class="arcady-owner-actions" style="margin-top:10px;">
                <button class="arcady-admin-button" type="button" data-owner-chat-nametag-assign-save>Save assignment</button>
                <button class="arcady-admin-button is-secondary" type="button" data-owner-chat-nametag-assign-clear>Clear for this device</button>
              </div>
            </div>
          </section>
          <section class="arcady-owner-card arcady-owner-span-6">
            <div class="arcady-admin-title">XP Controls</div>
            <div class="arcady-admin-meta">Give XP to everyone, one nickname, or your own owner device.</div>
            <div class="arcady-owner-controls" style="margin-top:12px;">
              <input id="arcady-owner-xp-amount" class="arcady-admin-input" type="number" min="1" max="100000" step="1" value="25" placeholder="XP amount">
              <input id="arcady-owner-xp-nickname" class="arcady-admin-input" type="text" maxlength="24" placeholder="Nickname for specific XP">
              <div class="arcady-owner-actions">
                <button class="arcady-admin-button" type="button" data-owner-give-xp-everyone>Give Everyone XP</button>
                <button class="arcady-admin-button" type="button" data-owner-give-xp-user>Give Nickname XP</button>
                <button class="arcady-admin-button is-secondary" type="button" data-owner-give-xp-self>Give Myself XP</button>
              </div>
            </div>
          </section>
          <section class="arcady-owner-card arcady-owner-span-12">
            <div class="arcady-admin-title">Leaderboard Manager</div>
            <div class="arcady-admin-meta">Edit the homepage XP leaderboard entries from the owner panel.</div>
            <div class="arcady-owner-controls" style="margin-top:12px;">
              <div class="arcady-owner-actions">
                <button class="arcady-admin-button" type="button" data-owner-load-leaderboard>Load Leaderboard</button>
                <button class="arcady-admin-button is-secondary" type="button" data-owner-refresh-leaderboard>Refresh</button>
              </div>
              <div class="arcady-owner-list" data-owner-leaderboard-list>
                <div class="arcady-admin-meta">Leaderboard entries are not loaded yet.</div>
              </div>
            </div>
          </section>
          <section class="arcady-owner-card arcady-owner-span-6">
            <div class="arcady-admin-title">Custom Cursor</div>
            <div class="arcady-admin-meta" data-owner-cursor-status>Loading cursor setting...</div>
            <div class="arcady-owner-controls" style="margin-top:12px;">
              <select id="arcady-owner-cursor-theme" class="arcady-admin-input">
                <option value="">Loading cursor themes...</option>
              </select>
              <div class="arcady-owner-actions">
                <button class="arcady-admin-button" type="button" data-owner-apply-cursor-theme>Apply Theme</button>
                <button class="arcady-admin-button is-secondary" type="button" data-owner-toggle-cursor>Disable Cursor</button>
              </div>
            </div>
          </section>
          <section class="arcady-owner-card arcady-owner-span-12">
            <div class="arcady-admin-title">Live Soundboard</div>
            <div class="arcady-admin-meta" data-owner-sound-status>Loading sounds from features/Mp3s/...</div>
            <div class="arcady-admin-sound-actions">
              <button class="arcady-admin-button is-danger" type="button" data-owner-stop-sound>Stop Sound</button>
            </div>
            <div class="arcady-admin-soundboard" data-owner-soundboard></div>
          </section>
          <section class="arcady-owner-card arcady-owner-span-12">
            <div class="arcady-admin-title">Live TV Broadcast</div>
            <div class="arcady-admin-meta" data-owner-video-status>Loading videos from features/Mp4s/...</div>
            <div class="arcady-owner-controls" style="margin-top:12px;">
              <input id="arcady-owner-video-url" class="arcady-admin-input" type="text" placeholder="Paste a YouTube, MP4, GIF, or image link for Live TV">
              <div class="arcady-owner-actions">
                <button class="arcady-admin-button" type="button" data-owner-broadcast-video-url>Broadcast Media</button>
                <button class="arcady-admin-button" type="button" data-owner-broadcast-camera>Broadcast Camera</button>
                <button class="arcady-admin-button" type="button" data-owner-broadcast-screen>Broadcast Screen</button>
              </div>
            </div>
            <div class="arcady-admin-sound-actions">
              <button class="arcady-admin-button is-danger" type="button" data-owner-stop-video>Stop Broadcast</button>
            </div>
            <div class="arcady-admin-soundboard" data-owner-video-board></div>
          </section>
          <section class="arcady-owner-card arcady-owner-span-12">
            <div class="arcady-admin-title">Jumpscares</div>
            <div class="arcady-admin-meta" data-owner-jumpscare-status>Loading jumpscares from Arcady features/jumpscares...</div>
            <div class="arcady-admin-sound-actions">
              <button class="arcady-admin-button is-danger" type="button" data-owner-stop-jumpscare>Stop Jumpscare</button>
            </div>
            <div class="arcady-admin-soundboard" data-owner-jumpscare-board></div>
          </section>
          <section class="arcady-owner-card arcady-owner-span-5">
            <div class="arcady-admin-title">Granted Admin Panels</div>
            <div class="arcady-admin-meta">Everyone who currently has an Admin, Super Admin, or Supreme Admin panel assigned.</div>
            <div class="arcady-owner-list" data-owner-admin-viewers></div>
          </section>
          <section class="arcady-owner-card arcady-owner-span-7">
            <div class="arcady-admin-title">Active Visitors</div>
            <div class="arcady-admin-meta">Shows page, recent activity, and lets you manage bans and admin access.</div>
            <div class="arcady-owner-list" data-owner-visitor-list></div>
          </section>
          <section class="arcady-owner-card arcady-owner-span-12">
            <div class="arcady-admin-title">Ban Appeals</div>
            <div class="arcady-admin-meta">Review who appealed a block and approve or disapprove each request.</div>
            <div class="arcady-owner-list" data-owner-appeal-list></div>
          </section>
        </div>
        </div>
      </aside>
      <div class="arcady-admin-stack" data-stack></div>
      <div class="arcady-xp-toast-stack" data-xp-toast-stack></div>
      <div class="arcady-jumpscare-overlay" data-jumpscare-overlay>
        <canvas class="arcady-jumpscare-canvas" data-jumpscare-canvas></canvas>
        <video class="arcady-jumpscare-video" data-jumpscare-video crossorigin="anonymous" preload="auto" playsinline webkit-playsinline></video>
      </div>
      <div class="arcady-ban-overlay" data-ban-overlay>
        <div class="arcady-ban-card">
          <div class="arcady-admin-title">Access Blocked</div>
          <div class="arcady-admin-meta">This browser/device has been blocked from Arcady by an admin.</div>
          <div class="arcady-admin-section" style="margin-top:18px; text-align:left;">
            <label class="arcady-admin-label" for="arcady-ban-appeal-input">Appeal your ban</label>
            <textarea id="arcady-ban-appeal-input" class="arcady-admin-textarea" placeholder="Explain why this device should be unbanned."></textarea>
            <button class="arcady-admin-button" type="button" data-submit-ban-appeal style="margin-top:12px;">Submit Appeal</button>
            <div class="arcady-admin-hint" data-ban-appeal-message style="margin-top:10px;"></div>
          </div>
        </div>
      </div>
      <div class="arcady-nickname-overlay" data-nickname-overlay>
        <div class="arcady-nickname-card">
          <div class="arcady-admin-title">Choose a Nickname</div>
          <div class="arcady-admin-subtitle">You only need to do this once before using Arcady subpages.</div>
          <div class="arcady-admin-section">
            <label class="arcady-admin-label" for="arcady-nickname-input">Nickname</label>
            <input id="arcady-nickname-input" class="arcady-admin-input" type="text" maxlength="24" placeholder="Type a nickname">
            <button class="arcady-admin-button" type="button" data-save-nickname style="margin-top:12px;">Save Nickname</button>
            <div class="arcady-admin-hint" data-nickname-message></div>
          </div>
        </div>
      </div>
    `;

    body.appendChild(root);

    const ownerShell = root.querySelector("[data-owner-only]");
    if (ownerShell) {
      const ownerPanel = document.createElement("aside");
      ownerPanel.className = "arcady-owner-panel";
      ownerPanel.setAttribute("data-owner-panel", "");
      ownerPanel.innerHTML = `
        <button class="arcady-admin-close" type="button" data-close-owner-panel aria-label="Close"><i data-lucide="x"></i></button>
        <div class="arcady-admin-window-tabs">
          <span class="arcady-admin-window-tab" data-tab="owner">Owner</span>
          <span class="arcady-admin-window-tab is-active" data-tab="controls">Controls</span>
          <span class="arcady-admin-window-tab" data-tab="live">Live</span>
        </div>
        <div class="arcady-admin-title">Arcady Owner</div>
        <div class="arcady-admin-status" data-owner-panel-status>Connecting to Firebase...</div>
      `;
      ownerPanel.appendChild(ownerShell);
      root.appendChild(ownerPanel);
    }

    if (window.lucide && typeof lucide.createIcons === 'function') {
      lucide.createIcons({ parent: root });
    }

    state.root = root;
    state.madnessLayer = root.querySelector("[data-madness-layer]");
    state.screenFxLayer = root.querySelector("[data-screenfx-layer]");
    state.jumpscareOverlay = root.querySelector("[data-jumpscare-overlay]");
    state.jumpscareCanvas = root.querySelector("[data-jumpscare-canvas]");
    state.jumpscareVideo = root.querySelector("[data-jumpscare-video]");
    state.launcherButton = root.querySelector("[data-launcher]");
    state.overlay = root.querySelector("[data-overlay]");
    state.passwordModal = root.querySelector("[data-password-modal]");
    state.passwordInput = root.querySelector("#arcady-admin-password-input");
    state.passwordMessage = root.querySelector("[data-password-message]");
    state.panel = root.querySelector("[data-panel]");
    state.status = root.querySelector("[data-status]");
    state.panelTitle = root.querySelector("[data-panel-title]");
    state.adminRoleSummary = root.querySelector("[data-admin-role-summary]");
    state.adminPanelPositionSelect = root.querySelector("#arcady-admin-panel-position");
    state.adminPanelColorInput = root.querySelector("#arcady-admin-panel-color");
    state.adminPanelColorTextInput = root.querySelector("#arcady-admin-panel-color-text");
    state.adminPanelColorSaveButton = root.querySelector("[data-save-admin-panel-color]");
    state.ownerPasswordModal = null;
    state.ownerPasswordInput = root.querySelector("#arcady-owner-password-input");
    state.ownerPasswordMessage = null;
    state.ownerPanel = root.querySelector("[data-owner-panel]");
    state.ownerUnlockStatus = root.querySelector("[data-owner-status]");
    state.ownerPanelStatus = root.querySelector("[data-owner-panel-status]");
    state.stack = root.querySelector("[data-stack]");
    state.xpToastStack = root.querySelector("[data-xp-toast-stack]");
    state.announcementInput = root.querySelector("#arcady-announcement-input");
    state.adminAnnouncementImageInput = root.querySelector("#arcady-admin-announcement-image");
    state.adminAnnouncementPositionSelect = root.querySelector("#arcady-admin-announcement-position");
    state.adminAnnouncementDurationInput = root.querySelector("#arcady-admin-announcement-duration");
    state.backgroundInput = root.querySelector("#arcady-background-input");
    state.backgroundTextInput = root.querySelector("#arcady-background-text");
    state.backgroundImageSelect = root.querySelector("#arcady-background-image-select");
    state.pollQuestionInput = root.querySelector("#arcady-poll-question");
    state.pollOptionsInput = root.querySelector("#arcady-poll-options");
    state.adminPollDurationInput = root.querySelector("#arcady-admin-poll-duration");
    state.sendAnnouncementButton = root.querySelector("[data-send-announcement]");
    state.sendPollButton = root.querySelector("[data-send-poll]");
    state.closePollButton = root.querySelector("[data-close-poll]");
    state.applyBackgroundImageButton = root.querySelector("[data-apply-background-image]");
    state.revertBackgroundButton = root.querySelector("[data-revert-background]");
    state.adminFontFamilySelect = root.querySelector("#arcady-admin-font-family");
    state.adminFontColorInput = root.querySelector("#arcady-admin-font-color");
    state.adminFontColorTextInput = root.querySelector("#arcady-admin-font-color-text");
    state.adminTabTitleInput = root.querySelector("#arcady-admin-tab-title");
    state.adminHomeNewsInput = root.querySelector("#arcady-admin-home-news-input");
    state.adminWallRankInput = root.querySelector("#arcady-admin-wall-rank");
    state.adminWallNameInput = root.querySelector("#arcady-admin-wall-name");
    state.adminWallColorInput = root.querySelector("#arcady-admin-wall-color");
    state.adminWallColorTextInput = root.querySelector("#arcady-admin-wall-color-text");
    state.adminWallList = root.querySelector("[data-admin-wall-list]");
    state.ownerLeaderboardList = root.querySelector("[data-owner-leaderboard-list]");
    state.ownerLoadLeaderboardButton = root.querySelector("[data-owner-load-leaderboard]");
    state.ownerRefreshLeaderboardButton = root.querySelector("[data-owner-refresh-leaderboard]");
    state.adminXpAmountInput = root.querySelector("#arcady-admin-xp-amount");
    state.adminXpNicknameInput = root.querySelector("#arcady-admin-xp-nickname");
    state.banOverlay = root.querySelector("[data-ban-overlay]");
    state.banAppealInput = root.querySelector("#arcady-ban-appeal-input");
    state.banAppealSubmit = root.querySelector("[data-submit-ban-appeal]");
    state.banAppealMessage = root.querySelector("[data-ban-appeal-message]");
    state.nicknameOverlay = root.querySelector("[data-nickname-overlay]");
    state.nicknameInput = root.querySelector("#arcady-nickname-input");
    state.nicknameSave = root.querySelector("[data-save-nickname]");
    state.nicknameMessage = root.querySelector("[data-nickname-message]");
    state.ownerAnnouncementInput = root.querySelector("#arcady-owner-announcement-input");
    state.ownerAnnouncementImageInput = root.querySelector("#arcady-owner-announcement-image");
    state.ownerAnnouncementPositionSelect = root.querySelector("#arcady-owner-announcement-position");
    state.ownerAnnouncementDurationInput = root.querySelector("#arcady-owner-announcement-duration");
    state.ownerBgColorInput = root.querySelector("#arcady-owner-bg-color");
    state.ownerBgColorTextInput = root.querySelector("#arcady-owner-bg-color-text");
    state.ownerBgImageSelect = root.querySelector("#arcady-owner-bg-image");
    state.ownerPollQuestionInput = root.querySelector("#arcady-owner-poll-question");
    state.ownerPollOptionsInput = root.querySelector("#arcady-owner-poll-options");
    state.ownerPollDurationInput = root.querySelector("#arcady-owner-poll-duration");
    state.ownerHomeNewsInput = root.querySelector("#arcady-owner-home-news-input");
    state.ownerWallRankInput = root.querySelector("#arcady-owner-wall-rank");
    state.ownerWallNameInput = root.querySelector("#arcady-owner-wall-name");
    state.ownerWallColorInput = root.querySelector("#arcady-owner-wall-color");
    state.ownerWallColorTextInput = root.querySelector("#arcady-owner-wall-color-text");
    state.ownerWallList = root.querySelector("[data-owner-wall-list]");
    state.adminPetUploadUrlInput = root.querySelector("#arcady-pet-upload-url");
    state.adminPetUploadFileInput = root.querySelector("#arcady-pet-upload-file");
    state.ownerPetUploadUrlInput = root.querySelector("#arcady-owner-pet-upload-url");
    state.ownerPetUploadFileInput = root.querySelector("#arcady-owner-pet-upload-file");
    state.ownerAdminNicknameInput = root.querySelector("#arcady-owner-admin-nickname");
    state.ownerAdminRoleSelect = root.querySelector("#arcady-owner-admin-role");
    state.ownerXpAmountInput = root.querySelector("#arcady-owner-xp-amount");
    state.ownerXpNicknameInput = root.querySelector("#arcady-owner-xp-nickname");
    state.ownerMadnessModeSelect = root.querySelector("#arcady-owner-madness-mode");
    state.ownerMadnessImageSelect = root.querySelector("#arcady-owner-madness-image");
    state.ownerMadnessDurationInput = root.querySelector("#arcady-owner-madness-duration");
    state.ownerMadnessStatus = root.querySelector("[data-owner-madness-status]");
    state.ownerScreenEffectStatus = root.querySelector("[data-owner-screenfx-status]");
    state.ownerScreenEffectModeSelect = root.querySelector("#arcady-owner-screenfx-mode");
    state.ownerScreenEffectDurationInput = root.querySelector("#arcady-owner-screenfx-duration");
    state.ownerAdminViewerList = root.querySelector("[data-owner-admin-viewers]");
    state.ownerVisitorList = root.querySelector("[data-owner-visitor-list]");
    state.ownerChatNametagLabelInput = root.querySelector("#arcady-owner-nametag-label");
    state.ownerChatNametagBgInput = root.querySelector("#arcady-owner-nametag-bg");
    state.ownerChatNametagFgInput = root.querySelector("#arcady-owner-nametag-fg");
    state.ownerChatNametagEffectSelect = root.querySelector("#arcady-owner-nametag-effect");
    state.ownerChatNametagList = root.querySelector("[data-owner-chat-nametag-list]");
    state.ownerChatNametagAssignChecks = root.querySelector("[data-owner-chat-nametag-assign-checks]");
    state.ownerChatTagsDeviceInput = root.querySelector("#arcady-owner-chat-tags-device");
    state.ownerStatVisitors = root.querySelector("[data-owner-stat-visitors]");
    state.ownerStatAdmin = root.querySelector("[data-owner-stat-admin]");
    state.ownerStatPlaying = root.querySelector("[data-owner-stat-playing]");
    state.ownerStatBlocked = root.querySelector("[data-owner-stat-blocked]");
    state.adminSoundStatus = root.querySelector("[data-admin-sound-status]");
    state.adminSoundboard = root.querySelector("[data-admin-soundboard]");
    state.adminGenziySoundStatus = null;
    state.adminGenziySoundboard = null;
    state.adminStopGenziySoundButton = null;
    state.adminVideoStatus = root.querySelector("[data-admin-video-status]");
    state.adminVideoBoard = root.querySelector("[data-admin-video-board]");
    state.adminStopVideoButton = root.querySelector("[data-admin-stop-video]");
    state.adminVideoUrlInput = root.querySelector("#arcady-admin-video-url");
    state.adminMadnessStatus = root.querySelector("[data-admin-madness-status]");
    state.adminMadnessModeSelect = root.querySelector("#arcady-admin-madness-mode");
    state.adminMadnessImageSelect = root.querySelector("#arcady-admin-madness-image");
    state.adminMadnessDurationInput = root.querySelector("#arcady-admin-madness-duration");
    state.adminScreenEffectStatus = root.querySelector("[data-admin-screenfx-status]");
    state.adminScreenEffectModeSelect = root.querySelector("#arcady-admin-screenfx-mode");
    state.adminScreenEffectDurationInput = root.querySelector("#arcady-admin-screenfx-duration");
    state.ownerSoundStatus = root.querySelector("[data-owner-sound-status]");
    state.ownerSoundboard = root.querySelector("[data-owner-soundboard]");
    state.ownerStopSoundButton = root.querySelector("[data-owner-stop-sound]");
    state.ownerGenziySoundStatus = null;
    state.ownerGenziySoundboard = null;
    state.ownerStopGenziySoundButton = null;
    state.ownerVideoStatus = root.querySelector("[data-owner-video-status]");
    state.ownerVideoBoard = root.querySelector("[data-owner-video-board]");
    state.ownerStopVideoButton = root.querySelector("[data-owner-stop-video]");
    state.ownerVideoUrlInput = root.querySelector("#arcady-owner-video-url");
    state.ownerJumpscareStatus = root.querySelector("[data-owner-jumpscare-status]");
    state.ownerJumpscareBoard = root.querySelector("[data-owner-jumpscare-board]");
    state.ownerStopJumpscareButton = root.querySelector("[data-owner-stop-jumpscare]");
    state.ownerFontFamilySelect = root.querySelector("#arcady-owner-font-family");
    state.ownerFontColorInput = root.querySelector("#arcady-owner-font-color");
    state.ownerFontColorTextInput = root.querySelector("#arcady-owner-font-color-text");
    state.ownerTabTitleInput = root.querySelector("#arcady-owner-tab-title");
    state.adminCursorStatus = root.querySelector("[data-admin-cursor-status]");
    state.adminCursorThemeSelect = root.querySelector("#arcady-admin-cursor-theme");
    state.adminApplyCursorThemeButton = root.querySelector("[data-admin-apply-cursor-theme]");
    state.adminToggleCursorButton = root.querySelector("[data-admin-toggle-cursor]");
    state.ownerCursorStatus = root.querySelector("[data-owner-cursor-status]");
    state.ownerCursorThemeSelect = root.querySelector("#arcady-owner-cursor-theme");
    state.ownerApplyCursorThemeButton = root.querySelector("[data-owner-apply-cursor-theme]");
    state.ownerToggleCursorButton = root.querySelector("[data-owner-toggle-cursor]");
    state.ownerAppealList = root.querySelector("[data-owner-appeal-list]");
    state.homeNewsPanel = document.getElementById("home-news-panel");
    state.homeNewsText = document.getElementById("home-news-text");
    state.homeNewsMeta = document.getElementById("home-news-meta");
    state.liveActiveStatus = document.getElementById("live-active-status");
    state.liveActiveClock = document.getElementById("live-active-clock");
    state.liveActiveNames = document.getElementById("live-active-names");
    state.xpPanel = document.getElementById("xp-panel");
    state.xpLevelText = document.getElementById("xp-level-text");
    state.xpBarFill = document.getElementById("xp-bar-fill");
    state.xpPanelMeta = document.getElementById("xp-panel-meta");
    state.xpPanelSubmeta = document.getElementById("xp-panel-submeta");
    state.wallOfFamePanel = document.getElementById("wall-of-fame-panel");
    state.wallOfFameMeta = document.getElementById("wall-of-fame-meta");
    state.wallOfFameBars = document.getElementById("wall-of-fame-bars");
    state.wallOfFameEmpty = document.getElementById("wall-of-fame-empty");
    state.liveTvPanel = document.getElementById("home-live-tv-panel");
    state.liveTvTitle = document.getElementById("home-live-tv-title");
    state.liveTvMeta = document.getElementById("home-live-tv-meta");
    state.liveTvStatic = document.getElementById("home-live-tv-static");
    state.liveTvImage = document.getElementById("home-live-tv-image");
    state.liveTvVideo = document.getElementById("home-live-tv-video");
    state.liveTvEmbed = document.getElementById("home-live-tv-embed");

    if (state.liveTvVideo) {
      state.liveTvVideo.addEventListener("playing", handleLiveTvPlaying);
    }
    if (state.jumpscareVideo) {
      state.jumpscareVideo.addEventListener("playing", handleJumpscarePlaying);
      state.jumpscareVideo.addEventListener("ended", handleJumpscareEnded);
      state.jumpscareVideo.addEventListener("loadedmetadata", resizeJumpscareCanvas);
      state.jumpscareVideo.addEventListener("error", handleJumpscarePlaybackError);
    }
    window.addEventListener("resize", resizeJumpscareCanvas);

    attachLauncherToNav();
    renderLauncherIcon();
    enhancePageSettingsPanel();
    ensureLiveTvAutoplayRecovery();
    ensureJumpscareAutoplayRecovery();
    ensureLiveSoundAutoplayRecovery();
    applyAdminPanelPosition();
    applyAdminPanelAppearance();
    applyAdminPanelFeatureBlockers();

    root.querySelector("[data-password-submit]").addEventListener("click", unlockAdmin);
    root.querySelector("[data-open-owner-access]").addEventListener("click", openOwnerAccess);
    if (state.ownerPasswordInput) {
      root.querySelector("[data-owner-password-submit]").addEventListener("click", unlockOwner);
    }

    root.addEventListener("click", function (event) {
      // Handle close buttons
      const closeBtn = event.target.closest("[data-close-password], [data-close-panel], [data-close-owner-panel]");
      if (closeBtn) {
        event.preventDefault();
        event.stopPropagation();
        closeAllOverlays();
        return;
      }

      // Handle tab switching
      const tabButton = event.target.closest(".arcady-admin-window-tab");
      if (!tabButton) {
        return;
      }

      event.preventDefault();
      const parentAside = tabButton.closest("aside");
      if (!parentAside) {
        return;
      }

      parentAside.querySelectorAll(".arcady-admin-window-tab").forEach(function (tab) {
        tab.classList.toggle("is-active", tab === tabButton);
      });

      const selectedTab = tabButton.getAttribute("data-tab");
      if (!selectedTab) {
        return;
      }

      parentAside.querySelectorAll("[data-tab-content]").forEach(function (panel) {
        const match = panel.getAttribute("data-tab-content") === selectedTab;
        panel.hidden = !match;
        panel.classList.toggle("is-visible", match);
      });
    }, true);

    const ownerCloseButton = root.querySelector("[data-close-owner-panel]");
    if (ownerCloseButton) {
      const closeOwner = function (event) {
        if (event) {
          event.preventDefault();
          event.stopPropagation();
        }
        closeAllOverlays();
      };
      ownerCloseButton.addEventListener("click", closeOwner);
    }

    state.launcherButton.addEventListener("click", function () {
      if (isAdminBlocked()) {
        setStatus("This device is blocked from the admin panel.");
        return;
      }
      if (hasAdminAccess()) {
        showPanel();
        return;
      }
      openPasswordPrompt();
    });
    state.overlay.addEventListener("click", closeAllOverlays);
    state.passwordInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        unlockAdmin();
      }
    });
    if (state.ownerPasswordInput) {
      state.ownerPasswordInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
          unlockOwner();
        }
      });
    }
    if (state.adminPanelPositionSelect) {
      state.adminPanelPositionSelect.addEventListener("change", function () {
        localStorage.setItem("arcadyAdminPanelPosition", normalizeAdminPanelPosition(state.adminPanelPositionSelect.value));
        applyAdminPanelPosition();
      });
    }

    if (state.adminPanelColorInput) {
      state.adminPanelColorInput.addEventListener("input", function () {
        const value = normalizeColor(state.adminPanelColorInput.value);
        if (!value) {
          return;
        }
        localStorage.setItem("arcadyAdminPanelColor", value);
        if (state.adminPanelColorTextInput) {
          state.adminPanelColorTextInput.value = value;
        }
        applyAdminPanelAppearance();
      });
    }

    if (state.adminPanelColorTextInput) {
      state.adminPanelColorTextInput.addEventListener("change", function () {
        const value = normalizeColor(state.adminPanelColorTextInput.value);
        if (!value) {
          return;
        }
        localStorage.setItem("arcadyAdminPanelColor", value);
        if (state.adminPanelColorInput) {
          state.adminPanelColorInput.value = value;
        }
        applyAdminPanelAppearance();
      });
    }

    if (state.adminPanelColorSaveButton) {
      state.adminPanelColorSaveButton.addEventListener("click", function () {
        const inputColor = state.adminPanelColorInput ? normalizeColor(state.adminPanelColorInput.value) : null;
        const textColor = state.adminPanelColorTextInput ? normalizeColor(state.adminPanelColorTextInput.value) : null;
        const value = inputColor || textColor;
        if (!value) {
          return;
        }
        localStorage.setItem("arcadyAdminPanelColor", value);
        if (state.adminPanelColorInput) {
          state.adminPanelColorInput.value = value;
        }
        if (state.adminPanelColorTextInput) {
          state.adminPanelColorTextInput.value = value;
        }
        applyAdminPanelAppearance();
      });
    }


    state.sendAnnouncementButton.addEventListener("click", sendAnnouncement);
    state.sendPollButton.addEventListener("click", sendPoll);
    state.closePollButton.addEventListener("click", closePoll);
    state.applyBackgroundImageButton.addEventListener("click", sendBackgroundImage);
    state.revertBackgroundButton.addEventListener("click", revertBackground);
    root.querySelector("[data-admin-close-announcement]").addEventListener("click", closeAdminAnnouncements);
    root.querySelector("[data-admin-save-announcement-duration]").addEventListener("click", saveAdminAnnouncementDuration);
    root.querySelector("[data-admin-save-poll-duration]").addEventListener("click", saveAdminPollDuration);
    // Global Theme controls removed: no-op listeners skipped
    root.querySelector("[data-admin-save-home-news]").addEventListener("click", saveAdminHomepageNews);
    root.querySelector("[data-admin-clear-home-news]").addEventListener("click", clearAdminHomepageNews);
    root.querySelector("[data-admin-add-wall-entry]").addEventListener("click", addAdminWallOfFameEntry);
    root.querySelector("[data-admin-clear-wall]").addEventListener("click", clearAdminWallOfFame);
    root.querySelector("[data-admin-give-xp-everyone]").addEventListener("click", function () {
      giveAdminXp("everyone");
    });
    root.querySelector("[data-admin-give-xp-user]").addEventListener("click", function () {
      giveAdminXp("nickname");
    });
    root.querySelector("[data-admin-give-xp-self]").addEventListener("click", function () {
      giveAdminXp("self");
    });
    let colorDebounce = null;
    state.backgroundInput.addEventListener("input", function (event) {
      state.backgroundTextInput.value = event.target.value;
      applyRealtimeBackground(event.target.value);
      clearTimeout(colorDebounce);
      colorDebounce = setTimeout(function () {
        pushBackgroundColor(event.target.value);
      }, 120);
    });

    state.backgroundTextInput.addEventListener("change", function (event) {
      const value = normalizeColor(event.target.value);
      if (!value) {
        return;
      }
      state.backgroundInput.value = value;
      state.backgroundTextInput.value = value;
      applyRealtimeBackground(value);
      pushBackgroundColor(value);
    });

    syncAdminActionButtons();

    if (state.nicknameSave) {
      state.nicknameSave.addEventListener("click", saveNicknameFromPrompt);
    }
    if (state.nicknameInput) {
      state.nicknameInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
          saveNicknameFromPrompt();
        }
      });
    }

    root.querySelector("[data-owner-send-announcement]").addEventListener("click", sendOwnerAnnouncement);
    root.querySelector("[data-owner-close-announcement]").addEventListener("click", closeOwnerAnnouncements);
    root.querySelector("[data-owner-save-announcement-duration]").addEventListener("click", saveOwnerAnnouncementDuration);
    root.querySelector("[data-owner-apply-color]").addEventListener("click", pushOwnerColor);
    root.querySelector("[data-upload-pet-image]").addEventListener("click", function () { uploadCustomPetImage(false); });
    root.querySelector("[data-owner-upload-pet-image]").addEventListener("click", function () { uploadCustomPetImage(true); });
    root.querySelector("[data-owner-apply-image]").addEventListener("click", pushOwnerImage);
    root.querySelector("[data-owner-revert-background]").addEventListener("click", revertOwnerBackground);
    root.querySelector("[data-owner-send-poll]").addEventListener("click", sendOwnerPoll);
    root.querySelector("[data-owner-close-poll]").addEventListener("click", closeOwnerPoll);
    root.querySelector("[data-owner-save-poll-duration]").addEventListener("click", saveOwnerPollDuration);
    root.querySelector("[data-owner-save-home-news]").addEventListener("click", saveOwnerHomepageNews);
    root.querySelector("[data-owner-clear-home-news]").addEventListener("click", clearOwnerHomepageNews);
    if (state.ownerLoadLeaderboardButton) {
      state.ownerLoadLeaderboardButton.addEventListener("click", loadOwnerLeaderboardEntries);
    }
    if (state.ownerRefreshLeaderboardButton) {
      state.ownerRefreshLeaderboardButton.addEventListener("click", loadOwnerLeaderboardEntries);
    }
    if (state.ownerLeaderboardList) {
      state.ownerLeaderboardList.addEventListener("click", function (event) {
        const button = event.target.closest("[data-owner-leaderboard-action]");
        if (!button) {
          return;
        }
        const action = button.getAttribute("data-owner-leaderboard-action");
        const id = button.getAttribute("data-owner-leaderboard-id");
        if (!id) {
          return;
        }
        if (action === "delete") {
          deleteOwnerLeaderboardEntry(id);
          return;
        }
        if (action === "edit") {
          const row = button.closest("[data-owner-leaderboard-entry]");
          const currentName = row && row.querySelector("[data-owner-leaderboard-nickname]") ? row.querySelector("[data-owner-leaderboard-nickname]").textContent : "";
          const currentXp = row && row.querySelector("[data-owner-leaderboard-xp]") ? row.querySelector("[data-owner-leaderboard-xp]").textContent.replace(/[^0-9]/g, "") : "0";
          editOwnerLeaderboardEntry(id, { nickname: currentName, xp: Number(currentXp) || 0 });
        }
      });
    }
    // Owner Global Theme controls removed: no-op listeners skipped
    root.querySelector("[data-owner-add-wall-entry]").addEventListener("click", addOwnerWallOfFameEntry);
    root.querySelector("[data-owner-clear-wall]").addEventListener("click", clearOwnerWallOfFame);
    root.querySelector("[data-owner-grant-admin-by-nickname]").addEventListener("click", grantAdminByNickname);
    root.querySelector("[data-owner-remove-admin-by-nickname]").addEventListener("click", removeAdminByNickname);
    root.querySelector("[data-owner-ban-by-nickname]").addEventListener("click", banUserByNickname);
    root.querySelector("[data-owner-temp-ban-by-nickname]").addEventListener("click", ownerTemporaryBanByNickname);
    root.querySelector("[data-owner-temp-admin-by-nickname]").addEventListener("click", ownerGrantTemporaryAdminByNickname);
    root.querySelector("[data-owner-chat-nametag-create]").addEventListener("click", createOwnerHomepageChatNameTag);
    root.querySelector("[data-owner-chat-nametag-assign-save]").addEventListener("click", saveOwnerHomepageChatUserNameTags);
    root.querySelector("[data-owner-chat-nametag-assign-clear]").addEventListener("click", clearOwnerHomepageChatUserNameTags);
    if (state.ownerChatTagsDeviceInput) {
      state.ownerChatTagsDeviceInput.addEventListener("input", renderOwnerHomepageChatNameTagsUI);
    }
    root.querySelector("[data-corrupted-chat-timeout]").addEventListener("click", function () {
      runCorruptedModerationAction("timeout");
    });
    root.querySelector("[data-corrupted-clear-timeout]").addEventListener("click", function () {
      runCorruptedModerationAction("clear-timeout");
    });
    root.querySelector("[data-corrupted-temp-site-ban]").addEventListener("click", function () {
      runCorruptedModerationAction("temp-ban");
    });
    root.querySelector("[data-corrupted-grant-temp-admin]").addEventListener("click", function () {
      runCorruptedModerationAction("temp-admin");
    });
    root.querySelector("[data-owner-give-xp-everyone]").addEventListener("click", function () {
      giveOwnerXp("everyone");
    });
    root.querySelector("[data-owner-give-xp-user]").addEventListener("click", function () {
      giveOwnerXp("nickname");
    });
    root.querySelector("[data-owner-give-xp-self]").addEventListener("click", function () {
      giveOwnerXp("self");
    });
    if (state.adminApplyCursorThemeButton) {
      state.adminApplyCursorThemeButton.addEventListener("click", saveAdminCursorTheme);
    }
    if (state.adminToggleCursorButton) {
      state.adminToggleCursorButton.addEventListener("click", toggleAdminCustomCursorSetting);
    }
    state.ownerApplyCursorThemeButton.addEventListener("click", saveOwnerCursorTheme);
    state.ownerToggleCursorButton.addEventListener("click", toggleCustomCursorSetting);
    state.ownerStopSoundButton.addEventListener("click", stopOwnerSound);
    if (state.adminStopVideoButton) {
      state.adminStopVideoButton.addEventListener("click", function () {
        stopLiveTvBroadcast(false);
      });
    }
    const handleAdminVideoUrlBroadcast = function () {
      triggerLiveTvUrlBroadcast(state.adminVideoUrlInput && state.adminVideoUrlInput.value, false);
    };
    if (state.adminVideoUrlInput) {
      state.adminVideoUrlInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
          handleAdminVideoUrlBroadcast();
        }
      });
    }
    const adminVideoUrlButton = root.querySelector("[data-admin-broadcast-video-url]");
    if (adminVideoUrlButton) {
      adminVideoUrlButton.addEventListener("click", handleAdminVideoUrlBroadcast);
    }
    const adminCameraButton = root.querySelector("[data-admin-broadcast-camera]");
    if (adminCameraButton) {
      adminCameraButton.addEventListener("click", function () {
        startLiveTvBroadcastMediaStream("camera", false);
      });
    }
    const adminScreenButton = root.querySelector("[data-admin-broadcast-screen]");
    if (adminScreenButton) {
      adminScreenButton.addEventListener("click", function () {
        startLiveTvBroadcastMediaStream("screen", false);
      });
    }
    if (state.ownerStopVideoButton) {
      state.ownerStopVideoButton.addEventListener("click", function () {
        stopLiveTvBroadcast(true);
      });
    }
    const handleOwnerVideoUrlBroadcast = function () {
      triggerLiveTvUrlBroadcast(state.ownerVideoUrlInput && state.ownerVideoUrlInput.value, true);
    };
    const ownerCameraButton = root.querySelector("[data-owner-broadcast-camera]");
    if (ownerCameraButton) {
      ownerCameraButton.addEventListener("click", function () {
        startLiveTvBroadcastMediaStream("camera", true);
      });
    }
    const ownerScreenButton = root.querySelector("[data-owner-broadcast-screen]");
    if (ownerScreenButton) {
      ownerScreenButton.addEventListener("click", function () {
        startLiveTvBroadcastMediaStream("screen", true);
      });
    }
    if (state.ownerVideoUrlInput) {
      state.ownerVideoUrlInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
          handleOwnerVideoUrlBroadcast();
        }
      });
    }
    const ownerVideoUrlButton = root.querySelector("[data-owner-broadcast-video-url]");
    if (ownerVideoUrlButton) {
      ownerVideoUrlButton.addEventListener("click", handleOwnerVideoUrlBroadcast);
    }
    if (state.ownerStopJumpscareButton) {
      state.ownerStopJumpscareButton.addEventListener("click", stopOwnerJumpscare);
    }
    if (state.banAppealSubmit) {
      state.banAppealSubmit.addEventListener("click", submitBanAppeal);
    }
    if (state.adminWallColorInput) {
      state.adminWallColorInput.addEventListener("input", function () {
        state.adminWallColorTextInput.value = state.adminWallColorInput.value;
      });
    }
    if (state.adminWallColorTextInput) {
      state.adminWallColorTextInput.addEventListener("change", function () {
        const value = normalizeColor(state.adminWallColorTextInput.value);
        if (!value) {
          return;
        }
        state.adminWallColorInput.value = value;
        state.adminWallColorTextInput.value = value;
      });
    }
    if (state.adminFontColorInput) {
      state.adminFontColorInput.addEventListener("input", function () {
        state.adminFontColorTextInput.value = state.adminFontColorInput.value;
      });
    }
    if (state.adminFontColorTextInput) {
      state.adminFontColorTextInput.addEventListener("change", function () {
        const value = normalizeColor(state.adminFontColorTextInput.value);
        if (!value) {
          return;
        }
        state.adminFontColorInput.value = value;
        state.adminFontColorTextInput.value = value;
      });
    }
    state.ownerBgColorInput.addEventListener("input", function () {
      state.ownerBgColorTextInput.value = state.ownerBgColorInput.value;
    });
    state.ownerBgColorTextInput.addEventListener("change", function () {
      const value = normalizeColor(state.ownerBgColorTextInput.value);
      if (!value) {
        return;
      }
      state.ownerBgColorInput.value = value;
      state.ownerBgColorTextInput.value = value;
    });
    if (state.ownerWallColorInput) {
      state.ownerWallColorInput.addEventListener("input", function () {
        state.ownerWallColorTextInput.value = state.ownerWallColorInput.value;
      });
    }
    if (state.ownerWallColorTextInput) {
      state.ownerWallColorTextInput.addEventListener("change", function () {
        const value = normalizeColor(state.ownerWallColorTextInput.value);
        if (!value) {
          return;
        }
        state.ownerWallColorInput.value = value;
        state.ownerWallColorTextInput.value = value;
      });
    }
    if (state.ownerFontColorInput) {
      state.ownerFontColorInput.addEventListener("input", function () {
        state.ownerFontColorTextInput.value = state.ownerFontColorInput.value;
      });
    }
    if (state.ownerFontColorTextInput) {
      state.ownerFontColorTextInput.addEventListener("change", function () {
        const value = normalizeColor(state.ownerFontColorTextInput.value);
        if (!value) {
          return;
        }
        state.ownerFontColorInput.value = value;
        state.ownerFontColorTextInput.value = value;
      });
    }

    applyCustomCursorState();
    syncCursorControls();
    syncMadnessControls();
    syncScreenEffectControls();
    renderVideoBoards();
    renderJumpscareBoard();
    renderLiveTvPanel();
    renderXpPanel();
    renderHomepagePresenceBar();
    applyWallOfFameState(state.wallOfFameEntries);
    syncAdminWallOfFameState(state.wallOfFameEntries);
    syncOwnerWallOfFameState(state.wallOfFameEntries);
    initDragAndResize();
  }

  function enhancePageSettingsPanel() {
    state.settingsPanel = document.getElementById("settings-panel");
    if (!state.settingsPanel) {
      return;
    }

    removeNavPositionControls();

    if (!state.settingsPanel.querySelector("[data-arcady-cursor-settings]")) {
      const resetButton = state.settingsPanel.querySelector("#reset-settings");
      const wrapper = document.createElement("div");
      wrapper.setAttribute("data-arcady-cursor-settings", "true");
      wrapper.innerHTML =
        '<label for="arcady-settings-cursor-enabled">Custom Cursor:</label>' +
        '<input id="arcady-settings-cursor-enabled" type="checkbox">' +
        '<label for="arcady-settings-cursor-theme">Cursor Theme:</label>' +
        '<select id="arcady-settings-cursor-theme"></select>' +
        '<div class="arcady-admin-meta" data-settings-cursor-message style="margin-top:6px;"></div>';
      state.settingsPanel.insertBefore(wrapper, resetButton || null);
    }

    state.settingsCursorEnabledInput = state.settingsPanel.querySelector("#arcady-settings-cursor-enabled");
    state.settingsCursorThemeSelect = state.settingsPanel.querySelector("#arcady-settings-cursor-theme");
    state.settingsCursorMessage = state.settingsPanel.querySelector("[data-settings-cursor-message]");

    if (state.settingsCursorEnabledInput) {
      state.settingsCursorEnabledInput.addEventListener("change", function () {
        localStorage.setItem("arcadyCursorEnabled", state.settingsCursorEnabledInput.checked ? "true" : "false");
        applySelectedCursorTheme();
        applyCustomCursorState();
        syncCursorControls();
      });
    }

    if (state.settingsCursorThemeSelect) {
      state.settingsCursorThemeSelect.addEventListener("change", function () {
        localStorage.setItem("arcadyCursorTheme", String(state.settingsCursorThemeSelect.value || ""));
        applySelectedCursorTheme();
        syncCursorControls();
      });
    }

    const resetButton = state.settingsPanel.querySelector("#reset-settings");
    if (resetButton) {
      resetButton.addEventListener("click", function () {
        window.setTimeout(function () {
          localStorage.removeItem("navPosition");
          applySelectedCursorTheme();
          applyCustomCursorState();
          syncCursorControls();
        }, 0);
      });
    }

    syncUserSettingsControls();
  }

  function syncUserSettingsControls() {
    applyNavPosition();

    if (state.settingsCursorEnabledInput) {
      state.settingsCursorEnabledInput.checked = isLocalCursorEnabled();
      state.settingsCursorEnabledInput.disabled = state.settings.customCursorEnabled === false;
    }

    if (state.settingsCursorThemeSelect) {
      if (!state.cursorThemes.length) {
        state.settingsCursorThemeSelect.innerHTML = '<option value="">No cursor themes found</option>';
        state.settingsCursorThemeSelect.disabled = true;
      } else {
        state.settingsCursorThemeSelect.innerHTML = state.cursorThemes.map(function (theme) {
          return '<option value="' + escapeHtml(theme.id) + '">' + escapeHtml(theme.label) + '</option>';
        }).join("");
        state.settingsCursorThemeSelect.value = getLocalCursorThemeId() || getFallbackCursorThemeId() || state.cursorThemes[0].id;
        state.settingsCursorThemeSelect.disabled = state.settings.customCursorEnabled === false;
      }
    }

    if (state.settingsCursorMessage) {
      if (!state.cursorThemes.length) {
        state.settingsCursorMessage.textContent = "No cursor themes found.";
      } else if (state.settings.customCursorEnabled === false) {
        state.settingsCursorMessage.textContent = "Owner disabled custom cursors sitewide.";
      } else {
        const theme = getEffectiveCursorTheme();
        state.settingsCursorMessage.textContent = theme
          ? 'Current cursor: "' + theme.label + '".'
          : "Choose a cursor theme.";
      }
    }

    updateBanOverlay();
  }

  function removeNavPositionControls() {
    localStorage.removeItem("navPosition");
    const select = document.getElementById("nav-position");
    if (select) {
      const label = state.settingsPanel.querySelector('label[for="nav-position"]');
      if (label) {
        label.remove();
      }
      select.remove();
    }
  }

  function normalizeAdminPanelPosition(value) {
    return String(value || "").trim().toLowerCase() === "left" ? "left" : "right";
  }

  function getAdminPanelPosition() {
    return normalizeAdminPanelPosition(localStorage.getItem("arcadyAdminPanelPosition"));
  }

  function getAdminPanelLeft() {
    const value = localStorage.getItem("arcadyAdminPanelLeft");
    return value && !Number.isNaN(Number(value)) ? Number(value) : null;
  }

  function getAdminPanelTop() {
    const value = localStorage.getItem("arcadyAdminPanelTop");
    return value && !Number.isNaN(Number(value)) ? Number(value) : null;
  }

  function getAdminPanelWidth() {
    const value = localStorage.getItem("arcadyAdminPanelWidth");
    return value && !Number.isNaN(Number(value)) ? Number(value) : null;
  }

  function getAdminPanelHeight() {
    const value = localStorage.getItem("arcadyAdminPanelHeight");
    return value && !Number.isNaN(Number(value)) ? Number(value) : null;
  }

  function applyAdminPanelPosition() {
    const position = getAdminPanelPosition();
    const savedLeft = getAdminPanelLeft();
    const savedTop = getAdminPanelTop();
    const width = getAdminPanelWidth();
    const height = getAdminPanelHeight();

    if (!state.panel) {
      return;
    }

    if (savedLeft !== null && savedTop !== null) {
      state.panel.style.left = savedLeft + "px";
      state.panel.style.top = savedTop + "px";
      state.panel.style.right = "auto";
      state.panel.style.bottom = "auto";
    } else {
      state.panel.style.removeProperty("left");
      state.panel.style.removeProperty("top");
      state.panel.style.removeProperty("right");
      state.panel.style.removeProperty("bottom");
      state.panel.classList.toggle("is-left", position === "left");
    }

    if (width !== null) {
      state.panel.style.width = Math.max(320, width) + "px";
    }
    if (height !== null) {
      state.panel.style.height = Math.max(260, height) + "px";
    }

    if (state.adminPanelPositionSelect && document.activeElement !== state.adminPanelPositionSelect) {
      state.adminPanelPositionSelect.value = position;
    }
  }

  function normalizeAdminPanelSize(value) {
    const normalized = String(value || "").trim().toLowerCase();
    return normalized === "small" || normalized === "large" ? normalized : "regular";
  }

  function getAdminPanelSize() {
    return normalizeAdminPanelSize(localStorage.getItem("arcadyAdminPanelSize"));
  }

  function normalizeAdminPanelVerticalPosition(value) {
    const normalized = String(value || "").trim().toLowerCase();
    return normalized === "center" || normalized === "bottom" ? normalized : "top";
  }

  function getAdminPanelVerticalPosition() {
    return normalizeAdminPanelVerticalPosition(localStorage.getItem("arcadyAdminPanelVerticalPosition"));
  }


  function getAdminPanelColor() {
    return normalizeColor(localStorage.getItem("arcadyAdminPanelColor")) || "#ffffff";
  }

  function isAdminSoundboardBlocked() {
    return false;
  }

  function isAdminJumpscareBlocked() {
    return false;
  }

  function applyAdminPanelAppearance() {
    if (!state.panel) {
      return;
    }

    const panelColor = getAdminPanelColor();
    const rgbMatch = /^#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/.exec(panelColor);
    if (rgbMatch) {
      const r = parseInt(rgbMatch[1], 16);
      const g = parseInt(rgbMatch[2], 16);
      const b = parseInt(rgbMatch[3], 16);
      const tintValue = [r, g, b].join(", ");
      state.panel.style.setProperty("--arcady-admin-panel-tint", tintValue);
      state.panel.style.backgroundColor = "rgba(" + tintValue + ", 0.14)";
      state.panel.style.borderColor = "rgba(" + tintValue + ", 0.24)";
    } else {
      state.panel.style.removeProperty("--arcady-admin-panel-tint");
      state.panel.style.removeProperty("background-color");
      state.panel.style.removeProperty("border-color");
    }

    if (state.adminPanelColorInput) {
      state.adminPanelColorInput.value = panelColor;
    }
    if (state.adminPanelColorTextInput) {
      state.adminPanelColorTextInput.value = panelColor;
    }
  }

  function applyAdminPanelVerticalAlignment() {
    // Removed: vertical position is fixed to top
  }

  function applyAdminPanelManualDimensions() {
    // Removed: manual dimension control
  }

  function initAdminPanelDragAndResize() {
    // Removed: drag/resize functionality
  }

  function applyAdminPanelFeatureBlockers() {
    if (!state.root) {
      return;
    }

    const adminSoundSection = state.root.querySelector(".arcady-admin-section[data-admin-capability=\"live-soundboard\"]");
    const ownerSoundSection = state.root.querySelector("[data-owner-soundboard]")?.closest(".arcady-admin-section");
    const jumpscareSection = state.root.querySelector("[data-owner-jumpscare-board]")?.closest(".arcady-admin-section");

    if (adminSoundSection) {
      adminSoundSection.hidden = false;
    }
    if (ownerSoundSection) {
      ownerSoundSection.hidden = false;
    }
    if (jumpscareSection) {
      jumpscareSection.hidden = false;
    }
  }

  function isLocalCursorEnabled() {
    return localStorage.getItem("arcadyCursorEnabled") !== "false";
  }

  function getLocalCursorThemeId() {
    return String(localStorage.getItem("arcadyCursorTheme") || "").trim().toLowerCase();
  }

  function getFallbackCursorThemeId() {
    return String(state.settings.customCursorTheme || "").trim().toLowerCase();
  }

  function findCursorTheme(themeId) {
    const target = String(themeId || "").trim().toLowerCase();
    if (!target) {
      return null;
    }

    return state.cursorThemes.find(function (theme) {
      return String(theme.id || "").trim().toLowerCase() === target;
    }) || null;
  }

  function getEffectiveCursorTheme() {
    return findCursorTheme(getLocalCursorThemeId()) ||
      findCursorTheme(getFallbackCursorThemeId()) ||
      state.cursorThemes[0] ||
      null;
  }

  function applyNavPosition() {
    const navBar = document.getElementById("nav-bar");
    if (!navBar) {
      return;
    }
    const navLinks = navBar.querySelector(".nav-links");

    navBar.style.position = "fixed";
    navBar.style.top = "20px";
    navBar.style.right = "";
    navBar.style.bottom = "";
    navBar.style.left = "50%";
    navBar.style.transform = "";
    navBar.style.width = "min(1380px, calc(100vw - 24px))";
    navBar.style.minWidth = "";
    navBar.style.height = "auto";
    navBar.style.minHeight = "";
    navBar.style.maxHeight = "";
    navBar.style.overflowY = "";
    navBar.style.overflowX = "";
    navBar.style.flexDirection = "row";
    navBar.style.alignItems = "center";
    navBar.style.justifyContent = "space-between";
    navBar.style.borderRadius = "24px";
    navBar.style.zIndex = "1000";
    navBar.style.padding = "1rem 1.5rem";
    navBar.style.gap = "1.2rem";
    navBar.style.maxWidth = "calc(100vw - 24px)";
    navBar.style.setProperty("--arcady-nav-transform", "translateX(-50%)");
    navBar.style.setProperty("--arcady-nav-hover-transform", "translateX(-50%) translateY(-3px) scale(1.015)");

    if (navLinks) {
      navLinks.style.flexDirection = "row";
      navLinks.style.alignItems = "center";
      navLinks.style.justifyContent = "flex-end";
      navLinks.style.flexWrap = "wrap";
      navLinks.style.width = "";
      navLinks.style.flex = "1 1 auto";
      navLinks.style.gap = "1rem";
    }
  }

  function bindSecretShortcut() {
    window.addEventListener("keydown", function (event) {
      if (event.ctrlKey || event.metaKey || event.altKey) {
        return;
      }

      const key = String(event.key || "");
      if (!/^[0-9]$/.test(key)) {
        state.shortcutBuffer = "";
        clearTimeout(state.shortcutResetTimer);
        return;
      }

      state.shortcutBuffer = (state.shortcutBuffer + key).slice(-adminShortcutSequence.length);
      clearTimeout(state.shortcutResetTimer);
      state.shortcutResetTimer = setTimeout(function () {
        state.shortcutBuffer = "";
      }, 2500);

      if (state.shortcutBuffer === adminShortcutSequence) {
        state.shortcutBuffer = "";
        if (isAdminBlocked()) {
          setStatus("This device is blocked from the admin panel.");
          return;
        }
        if (isGrantedAdmin()) {
          showPanel();
          return;
        }
        openPasswordPrompt();
      }
    });
  }

  function hasAdminAccess() {
    return !!state.unlocked || isGrantedAdmin();
  }

  function isOwnerNickname() {
    return isProtectedNickname(readNickname());
  }

  function hasOwnerAccess() {
    return !!state.ownerUnlocked && hasAdminAccess() && isOwnerNickname();
  }

  function broadcastOwnerAccessChange() {
    const unlocked = hasOwnerAccess();
    window.ARCADY_OWNER_ACCESS = unlocked;
    window.dispatchEvent(new CustomEvent("arcady:owner-access-change", {
      detail: {
        unlocked: unlocked
      }
    }));
  }

  function enforceOwnerNicknameGate(silent) {
    if (isOwnerNickname()) {
      broadcastOwnerAccessChange();
      syncAdminPanelAccessUi();
      return true;
    }

    if (state.ownerUnlocked) {
      state.ownerUnlocked = false;
      sessionStorage.removeItem("arcadyOwnerUnlocked");
    }
    state.ownerUnlockPromptVisible = false;

    if (state.ownerPasswordInput) {
      state.ownerPasswordInput.value = "";
    }

    if (!silent) {
      setOwnerStatus('Only the nickname "Arcady" can unlock owner mode.');
    }

    broadcastOwnerAccessChange();
    syncAdminPanelAccessUi();
    updatePresence(true);
    return false;
  }

  function syncUnlockedState() {
    if (hasAdminAccess() && !isOwnerPage()) {
      updateLauncherVisibility();
    } else {
      setStatus("Enter the hidden password to send updates.");
    }
    enforceOwnerNicknameGate(true);
    broadcastOwnerAccessChange();
    syncOwnerFields();
    syncAdminPanelAccessUi();
    updateLauncherVisibility();
    maybeRequireNickname();
  }

  function openPasswordPrompt() {
    if (isAdminBlocked()) {
      setStatus("This device is blocked from the admin panel.");
      return;
    }
    state.isPromptOpen = true;
    state.overlay.classList.add("is-visible");
    state.passwordModal.classList.add("is-visible");
    state.passwordMessage.textContent = "Type the admin password to unlock the panel.";
    state.passwordInput.value = "";
    setTimeout(function () {
      state.passwordInput.focus();
    }, 30);
  }

  function unlockAdmin() {
    if (isAdminBlocked()) {
      state.passwordMessage.textContent = "This device is blocked from admin.";
      return;
    }
    if (state.passwordInput.value !== adminPassword) {
      state.passwordMessage.textContent = "Wrong password.";
      return;
    }

    state.unlocked = true;
    sessionStorage.setItem("arcadyAdminUnlocked", "true");
    state.passwordMessage.textContent = "";
    state.passwordModal.classList.remove("is-visible");
    state.isPromptOpen = false;
    updateLauncherVisibility();
    showPanel();
  }

  function openOwnerAccess() {
    if (!hasAdminAccess()) {
      return;
    }
    if (!enforceOwnerNicknameGate(true)) {
      return;
    }
    if (hasOwnerAccess()) {
      showOwnerPanel();
      return;
    }
    state.ownerUnlockPromptVisible = true;
    showPanel();
    if (hasOwnerAccess() || !state.ownerPasswordInput) {
      return;
    }
    setOwnerStatus("Type the owner password to open the separate owner panel.");
    state.ownerPasswordInput.value = "";
    setTimeout(function () {
      state.ownerPasswordInput.focus();
    }, 30);
  }

  function unlockOwner() {
    if (!state.ownerPasswordInput) {
      return;
    }
    if (!isOwnerNickname()) {
      enforceOwnerNicknameGate(true);
      return;
    }
    if (state.ownerPasswordInput.value !== ownerPassword) {
      setOwnerStatus("Wrong owner password.");
      return;
    }

    state.ownerUnlocked = true;
    state.ownerUnlockPromptVisible = false;
    sessionStorage.setItem("arcadyOwnerUnlocked", "true");
    broadcastOwnerAccessChange();
    state.ownerPasswordInput.value = "";
    syncAdminPanelAccessUi();
    syncOwnerFields();
    renderOwnerPresence();
    showOwnerPanel();
    setOwnerStatus(state.firebaseReady ? "Firebase connected. Owner controls are live." : "Firebase config is missing.");
  }

  function showPanel() {
    state.overlay.classList.add("is-visible");
    if (state.ownerPanel) {
      state.ownerPanel.classList.remove("is-visible");
    }
    state.panel.classList.add("is-visible");
    applyAdminPanelPosition();
    syncAdminPanelAccessUi();
    syncOwnerFields();
    renderOwnerPresence();
    setStatus(state.firebaseReady ? "Firebase connected. Global changes are live." : "Firebase config is missing.");
    updatePresence(true);
  }

  function showOwnerPanel() {
    if (!enforceOwnerNicknameGate()) {
      return;
    }
    state.overlay.classList.add("is-visible");
    state.panel.classList.remove("is-visible");
    if (state.ownerPanel) {
      state.ownerPanel.classList.add("is-visible");
    }
    syncAdminPanelAccessUi();
    syncOwnerFields();
    renderOwnerPresence();
    setOwnerStatus(state.firebaseReady ? "Firebase connected. Owner controls are live." : "Firebase config is missing.");
    if (state.ownerLeaderboardList && state.firebaseReady) {
      loadOwnerLeaderboardEntries();
    }
    updatePresence(true);
  }

  function closeAllOverlays() {
    if (!hasOwnerAccess()) {
      state.ownerUnlockPromptVisible = false;
    }
    state.overlay.classList.remove("is-visible");
    state.passwordModal.classList.remove("is-visible");
    state.panel.classList.remove("is-visible");
    if (state.ownerPanel) {
      state.ownerPanel.classList.remove("is-visible");
    }
    state.isPromptOpen = false;
    updatePresence(true);
  }

  function initDragAndResize() {
    if (!state.panel) {
      return;
    }

    let dragState = null;

    // Dragging
    state.panel.addEventListener("pointerdown", function (event) {
      if (event.button !== 0) return;
      if (event.target.closest("input, textarea, select, button, label, a, [data-lucide]")) {
        return;
      }

      dragState = {
        startX: event.clientX,
        startY: event.clientY,
        startLeft: state.panel.offsetLeft,
        startTop: state.panel.offsetTop,
      };

      const onPointerMove = function (moveEvent) {
        if (!dragState) return;
        const dx = moveEvent.clientX - dragState.startX;
        const dy = moveEvent.clientY - dragState.startY;
        state.panel.style.left = Math.max(0, dragState.startLeft + dx) + "px";
        state.panel.style.top = Math.max(0, dragState.startTop + dy) + "px";
      };

      const onPointerUp = function () {
        if (dragState) {
          localStorage.setItem("arcadyAdminPanelLeft", String(Math.round(state.panel.offsetLeft)));
          localStorage.setItem("arcadyAdminPanelTop", String(Math.round(state.panel.offsetTop)));
          dragState = null;
        }
        document.removeEventListener("pointermove", onPointerMove);
        document.removeEventListener("pointerup", onPointerUp);
      };

      document.addEventListener("pointermove", onPointerMove);
      document.addEventListener("pointerup", onPointerUp);
    });

    // Resizing - add resize handle to bottom-right
    const resizeHandle = document.createElement("div");
    resizeHandle.className = "arcady-admin-resize-handle";
    resizeHandle.style.cssText = "position:absolute; bottom:0; right:0; width:20px; height:20px; cursor:se-resize; background:rgba(255,255,255,0.1); border-radius:0 0 8px 0; opacity:0.6; hover:opacity:1;";
    state.panel.style.position = "absolute";
    state.panel.appendChild(resizeHandle);

    let resizeState = null;

    resizeHandle.addEventListener("pointerdown", function (event) {
      event.preventDefault();
      event.stopPropagation();

      resizeState = {
        startX: event.clientX,
        startY: event.clientY,
        startWidth: state.panel.offsetWidth,
        startHeight: state.panel.offsetHeight,
      };

      const onPointerMove = function (moveEvent) {
        if (!resizeState) return;
        const dx = moveEvent.clientX - resizeState.startX;
        const dy = moveEvent.clientY - resizeState.startY;
        const newWidth = Math.max(320, Math.min(window.innerWidth - state.panel.offsetLeft - 20, resizeState.startWidth + dx));
        const newHeight = Math.max(260, Math.min(window.innerHeight - state.panel.offsetTop - 20, resizeState.startHeight + dy));
        state.panel.style.width = newWidth + "px";
        state.panel.style.height = newHeight + "px";
      };

      const onPointerUp = function () {
        if (resizeState) {
          localStorage.setItem("arcadyAdminPanelWidth", String(Math.round(state.panel.offsetWidth)));
          localStorage.setItem("arcadyAdminPanelHeight", String(Math.round(state.panel.offsetHeight)));
          resizeState = null;
        }
        document.removeEventListener("pointermove", onPointerMove);
        document.removeEventListener("pointerup", onPointerUp);
      };

      document.addEventListener("pointermove", onPointerMove);
      document.addEventListener("pointerup", onPointerUp);
    });
  }

  function updateLauncherVisibility() {
    if (!state.launcherButton || isOwnerPage()) {
      return;
    }
    const visible = hasAdminAccess() && !isAdminBlocked();
    state.launcherButton.classList.toggle("is-visible", visible);
    syncAdminPanelAccessUi();
  }

  function attachLauncherToNav() {
    if (!state.launcherButton) {
      return;
    }

    document.body.appendChild(state.launcherButton);
  }

  function renderLauncherIcon() {
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons({
        icons: window.lucide.icons,
        attrs: {
          width: 20,
          height: 20,
          stroke: "currentColor"
        },
        nameAttr: "data-lucide"
      });
    }
  }

  function setStatus(message) {
    if (state.status) {
      state.status.textContent = message;
    }
  }

  function setOwnerStatus(message) {
    const target = hasOwnerAccess() ? state.ownerPanelStatus : state.ownerUnlockStatus;
    if (target) {
      target.textContent = message;
      return;
    }
    setStatus(message);
  }

  function syncAdminPanelAccessUi() {
    const ownerUnlocked = hasOwnerAccess();

    if (state.panelTitle) {
      state.panelTitle.textContent = "Arcady Admin";
    }

    if (state.adminRoleSummary) {
      state.adminRoleSummary.textContent = "Current access: " + getCurrentAdminRoleLabel();
    }

    if (state.panel) {
      state.panel.querySelectorAll("[data-admin-capability]").forEach(function (element) {
        const capability = element.getAttribute("data-admin-capability");
        element.hidden = !hasAdminCapability(capability);
      });
    }

    if (state.root) {
      const ownerEntrySection = state.root.querySelector("[data-owner-entry-section]");
      const ownerUnlockBlocks = state.root.querySelectorAll("[data-owner-unlock]");
      const ownerOnlyBlocks = state.root.querySelectorAll("[data-owner-only]");
      const adminOnlyBlocks = state.root.querySelectorAll("[data-admin-only]");
      const showOwnerUnlockPrompt = !ownerUnlocked && !!state.ownerUnlockPromptVisible && hasAdminAccess() && isOwnerNickname();

      if (ownerEntrySection) {
        ownerEntrySection.hidden = !hasAdminAccess();
      }
      adminOnlyBlocks.forEach(function (element) {
        element.hidden = false;
      });
      ownerUnlockBlocks.forEach(function (element) {
        element.hidden = !showOwnerUnlockPrompt;
      });
      ownerOnlyBlocks.forEach(function (element) {
        element.hidden = !ownerUnlocked;
      });
    }
  }

  async function initFirebase() {
    if (!firebaseConfig.apiKey || !firebaseConfig.projectId || !firebaseConfig.appId || !firebaseConfig.databaseURL) {
      setStatus("Add your Firebase web config in admin/firebase-config.js.");
      disableAdminActions(true);
      return;
    }

    try {
      await ensureFirebaseSdk();

      let app = null;
      try {
        app = window.firebase.app(appName);
      } catch (error) {
        app = window.firebase.initializeApp(firebaseConfig, appName);
      }

      state.rtdb = app.database();
      state.firebaseReady = true;
      disableAdminActions(false);
      setStatus(state.unlocked ? "Firebase connected. Global changes are live." : "Firebase connected. Use the hidden shortcut to open admin.");
      loadBackgroundLibrary();
      initPresenceTracking();
      attachRealtimeListeners();
      subscribeVisitorAdmin();
      subscribeAdminAccess();
      bindActivityTracking();
      startXpTracking();
      syncXpNickname(true);
      maybeRequireNickname();
      updateLauncherVisibility();
    } catch (error) {
      console.error("Arcady admin failed to initialize Firebase:", error);
      setStatus("Firebase failed to load. Check your config and hosting.");
      setOwnerStatus("Firebase failed to load. Check your config and hosting.");
      disableAdminActions(true);
    }
  }

  function disableAdminActions(disabled) {
    [
      state.sendAnnouncementButton,
      state.sendPollButton,
      state.closePollButton,
      state.applyBackgroundImageButton,
      state.revertBackgroundButton,
      state.backgroundImageSelect,
      state.backgroundInput,
      state.backgroundTextInput,
      state.adminToggleCursorButton
    ].forEach(function (element) {
      if (element) {
        element.disabled = disabled;
      }
    });
  }

  function syncAdminActionButtons() {
    if (state.closePollButton) {
      state.closePollButton.disabled = !(state.currentPollData && state.currentPollData.active);
    }
  }

  function ensureGlobalFontStylesheet() {
    if (document.getElementById("arcady-global-fonts")) {
      return;
    }

    const link = document.createElement("link");
    link.id = "arcady-global-fonts";
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?" + globalFontChoices.map(function (font) {
      return "family=" + encodeURIComponent(font.googleFamily).replace(/%20/g, "+");
    }).join("&") + "&display=swap";
    document.head.appendChild(link);
  }

  function normalizeFontChoice(value) {
    const target = String(value || "").trim();
    if (!target) {
      return "";
    }

    const match = globalFontChoices.find(function (font) {
      return font.family === target || font.id === target || font.label === target;
    });
    return match ? match.family : "";
  }

  function getFontChoiceByFamily(value) {
    const normalized = normalizeFontChoice(value);
    return globalFontChoices.find(function (font) {
      return font.family === normalized;
    }) || null;
  }

  function populateFontSelect(select, selectedValue) {
    if (!select) {
      return;
    }

    select.innerHTML = globalFontChoices.map(function (font) {
      return '<option value="' + escapeHtml(font.family) + '">' + escapeHtml(font.label) + '</option>';
    }).join("");

    const selected = normalizeFontChoice(selectedValue) || globalFontChoices[0].family;
    select.value = selected;
  }

  function ensureFirebaseSdk() {
    if (window.firebase && typeof window.firebase.initializeApp === "function" && typeof window.firebase.database === "function") {
      return Promise.resolve();
    }

    return loadScript("https://www.gstatic.com/firebasejs/11.4.0/firebase-app-compat.js")
      .then(function () {
        return loadScript("https://www.gstatic.com/firebasejs/11.4.0/firebase-database-compat.js");
      });
  }

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      const existing = document.querySelector('script[src="' + src + '"]');
      if (existing) {
        if (existing.dataset.loaded === "true" || existing.readyState === "complete" || existing.readyState === "loaded") {
          resolve();
          return;
        }
        existing.addEventListener("load", function () {
          existing.dataset.loaded = "true";
          resolve();
        }, { once: true });
        existing.addEventListener("error", reject, { once: true });
        return;
      }

      const script = document.createElement("script");
      script.src = src;
      script.onload = function () {
        script.dataset.loaded = "true";
        resolve();
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  function normalizeLeaderboardRecord(record, id) {
    const nickname = String((record && record.nickname) || "").trim().slice(0, 24);
    return {
      id: id,
      nickname: nickname || "Guest",
      xp: Number((record && record.xp) || 0)
    };
  }

  function formatOwnerLeaderboardEntry(entry, index) {
    return (
      '<article class="arcady-admin-list-item" data-owner-leaderboard-entry>' +
        '<div><strong>' + escapeHtml(entry.nickname) + '</strong></div>' +
        '<div class="arcady-admin-meta">XP: ' + escapeHtml(String(entry.xp)) + ' • rank ' + (index + 1) + '</div>' +
        '<div class="arcady-owner-actions" style="margin-top:8px; gap:8px; display:flex; flex-wrap:wrap;">' +
          '<button class="arcady-admin-button" type="button" data-owner-leaderboard-action="edit" data-owner-leaderboard-id="' + escapeHtml(entry.id) + '">Edit</button>' +
          '<button class="arcady-admin-button is-danger" type="button" data-owner-leaderboard-action="delete" data-owner-leaderboard-id="' + escapeHtml(entry.id) + '">Delete</button>' +
        '</div>' +
      '</article>'
    );
  }

  function renderOwnerLeaderboardEntries(entries) {
    if (!state.ownerLeaderboardList) {
      return;
    }
    if (!entries.length) {
      state.ownerLeaderboardList.innerHTML = '<div class="arcady-admin-meta">No leaderboard entries were found.</div>';
      return;
    }
    state.ownerLeaderboardList.innerHTML = entries.map(function (entry, index) {
      return formatOwnerLeaderboardEntry(entry, index);
    }).join("");
  }

  async function fetchOwnerLeaderboardEntries() {
    if (!state.rtdb) {
      throw new Error("Firebase is not initialized.");
    }
    const snapshot = await state.rtdb.ref("arcadyAdmin/xp/users").orderByChild("xp").limitToLast(50).once("value");
    const raw = snapshot.val() || {};
    return Object.entries(raw)
      .map(function (entry) {
        return normalizeLeaderboardRecord(entry[1], entry[0]);
      })
      .filter(function (entry) {
        return entry.nickname && Number.isFinite(entry.xp);
      })
      .sort(function (a, b) {
        return b.xp - a.xp;
      });
  }

  async function loadOwnerLeaderboardEntries() {
    if (!state.ownerLeaderboardList) {
      return;
    }
    state.ownerLeaderboardList.innerHTML = '<div class="arcady-admin-meta">Loading leaderboard entries...</div>';
    if (!state.rtdb || !state.firebaseReady) {
      state.ownerLeaderboardList.innerHTML = '<div class="arcady-admin-meta">Firebase is not ready yet.</div>';
      return;
    }
    try {
      const entries = await fetchOwnerLeaderboardEntries();
      renderOwnerLeaderboardEntries(entries);
    } catch (error) {
      console.error("Failed to load owner leaderboard entries:", error);
      state.ownerLeaderboardList.innerHTML = '<div class="arcady-admin-meta">Unable to load leaderboard entries.</div>';
    }
  }

  async function deleteOwnerLeaderboardEntry(id) {
    if (!state.rtdb) {
      return;
    }
    if (!confirm("Delete this leaderboard entry?")) {
      return;
    }
    try {
      await state.rtdb.ref("arcadyAdmin/xp/users").child(id).remove();
      loadOwnerLeaderboardEntries();
      window.dispatchEvent(new CustomEvent("arcady:leaderboard-updated"));
    } catch (error) {
      console.error("Failed to delete owner leaderboard entry:", error);
      setOwnerStatus("Could not delete leaderboard entry.");
    }
  }

  async function editOwnerLeaderboardEntry(id, current) {
    if (!state.rtdb) {
      return;
    }
    const newName = prompt("Edit player name:", current.nickname || "");
    if (newName === null) {
      return;
    }
    const normalizedName = String(newName || "").trim().slice(0, 24);
    if (!normalizedName) {
      alert("Name cannot be blank.");
      return;
    }
    const newXpValue = prompt("Edit player XP:", String(Number(current.xp) || 0));
    if (newXpValue === null) {
      return;
    }
    const xp = parseInt(newXpValue.replace(/[^0-9]/g, ""), 10);
    if (!Number.isFinite(xp) || xp < 0) {
      alert("XP must be a valid whole number.");
      return;
    }
    try {
      await state.rtdb.ref("arcadyAdmin/xp/users").child(id).update({ nickname: normalizedName, xp: xp });
      loadOwnerLeaderboardEntries();
      window.dispatchEvent(new CustomEvent("arcady:leaderboard-updated"));
    } catch (error) {
      console.error("Failed to update owner leaderboard entry:", error);
      setOwnerStatus("Could not update leaderboard entry.");
    }
  }

  function loadMusicPlayerModule() {
    loadScript(normalizeAssetPath("./features/admin/music-player.js")).catch(function (error) {
      console.error("Arcady music player failed to load:", error);
    });
  }

  function attachRealtimeListeners() {
    const db = state.rtdb;

    db.ref("arcadyAdmin/state").on("value", function (snapshot) {
      if (!snapshot.exists()) {
        return;
      }

      const data = snapshot.val() || {};
      state.currentSiteState = data;
      applyRealtimeBackgroundState(data);
      syncAdminThemeState(data);
      syncOwnerBackgroundState(data);
    });

    db.ref("arcadyAdmin/announcements/current").on("value", function (snapshot) {
      if (!snapshot.exists()) {
        state.currentAnnouncementId = null;
        return;
      }

      const data = snapshot.val() || {};
      if (data.id === state.currentAnnouncementId) {
        return;
      }

      state.currentAnnouncementId = data.id || null;
      if (data.message) {
        showAnnouncementToast(data);
      }
    });

    db.ref("arcadyAdmin/polls/current").on("value", function (snapshot) {
      if (!snapshot.exists()) {
        state.currentPollId = null;
        state.currentPollData = null;
        clearPollCard();
        state.visiblePollId = null;
        syncAdminActionButtons();
        return;
      }

      const data = snapshot.val() || {};
      state.currentPollId = data.id || null;
      state.currentPollData = data;
      syncAdminActionButtons();

      if (!data.active || !Array.isArray(data.options) || !data.options.length) {
        clearPollCard();
        clearHomepagePoll();
        return;
      }

      renderPollCard(data);
      attachVotesListener();
      renderHomepagePoll(data);
    });

    db.ref("arcadyAdmin/homepageNews/current").on("value", function (snapshot) {
      const data = snapshot.exists() ? snapshot.val() || {} : {};
      state.homepageNews = data;
      applyHomepageNewsState(data);
      syncOwnerHomepageNewsState(data);
      if (state.adminHomeNewsInput && document.activeElement !== state.adminHomeNewsInput) {
        state.adminHomeNewsInput.value = String(data.text || "");
      }
    });

    db.ref("arcadyAdmin/homepageWallOfFame/current").on("value", function (snapshot) {
      const data = snapshot.exists() ? snapshot.val() || {} : {};
      const entries = normalizeWallOfFameEntries(data && data.entries);
      state.wallOfFameEntries = entries;
      applyWallOfFameState(entries, data);
      syncOwnerWallOfFameState(entries);
    });

    db.ref(homepageChatNameTagsPath).on("value", function (snapshot) {
      state.homepageChatNameTags = snapshot.val() || {};
      renderOwnerHomepageChatNameTagsUI();
    });

    db.ref(homepageChatUserNameTagsPath).on("value", function (snapshot) {
      state.homepageChatUserNameTags = snapshot.val() || {};
      renderOwnerHomepageChatNameTagsUI();
    });

    db.ref("arcadyAdmin/xp/users").on("value", function (snapshot) {
      state.xpUserProfiles = snapshot.val() || {};
      state.currentXpRecord = normalizeXpRecord(state.xpUserProfiles[state.deviceId]);
      renderXpPanel();
    });

    db.ref("arcadyAdmin/xp/visitCounts/" + state.deviceId).on("value", function (snapshot) {
      const data = snapshot.val() || {};
      state.visitCount = Math.max(0, Number(data.count || 0) || 0);
      renderXpPanel();
    });

    db.ref("arcadyAdmin/soundboard/current").on("value", function (snapshot) {
      if (!snapshot.exists()) {
        return;
      }

      const data = snapshot.val() || {};
      const soundId = String(data.id || "");
      if (!soundId || soundId === state.lastHandledSoundId) {
        return;
      }

      state.lastHandledSoundId = soundId;

      if (String(data.action || "play").toLowerCase() === "stop") {
        state.activeSoundData = null;
        state.activeSoundFile = "";
        state.activeSoundLabel = "";
        state.lastStopSoundAt = Number(data.createdAt || Date.now());
        stopLiveSoundPlayback();
        renderSoundboards();
        return;
      }

      if (!data.file) {
        return;
      }

      // Calculate elapsed time since the sound was triggered. If the page
      // loaded after the sound started, resume from the elapsed position
      // rather than ignoring the event.
      const createdAtNum = Number(data.createdAt || 0) || 0;
      let resumeOffsetMs = 0;
      if (createdAtNum > 0) {
        const elapsed = Date.now() - createdAtNum;
        if (elapsed > 0) {
          resumeOffsetMs = elapsed;
        }
      }

      state.activeSoundData = data;
      state.activeSoundFile = normalizeSoundFileReference(data.file);
      state.activeSoundLabel = normalizeDisplayLabel(data.label, formatSoundLabel(data.file));
      playLiveSoundPlayback(data, resumeOffsetMs);
      renderSoundboards();
    });

    db.ref("arcadyAdmin/liveTv/current").on("value", function (snapshot) {
      if (!snapshot.exists()) {
        state.currentLiveTv = {};
        clearLiveTvBroadcast();
        renderVideoBoards();
        return;
      }

      const data = snapshot.val() || {};
      state.currentLiveTv = data;

      const broadcastId = String(data.id || "");
      const hasBroadcastSource = !!normalizeLiveTvFileReference(data.file || data.youtubeUrl || "");
      const isStop = String(data.action || "broadcast").toLowerCase() === "stop" || data.active === false || !hasBroadcastSource;

      if (isStop) {
        if (broadcastId) {
          state.lastHandledVideoId = broadcastId;
        }
        clearLiveTvBroadcast(true);
        renderVideoBoards();
        return;
      }

      if (!broadcastId) {
        renderVideoBoards();
        return;
      }

      if (broadcastId !== state.lastHandledVideoId || state.activeVideoFile !== normalizeLiveTvFileReference(data.file || data.youtubeUrl || "")) {
        state.lastHandledVideoId = broadcastId;
        playLiveTvBroadcast(data);
        const createdAt = Number(data.createdAt || 0);
        if (createdAt && createdAt >= state.bootedAt - 12000) {
          try {
            window.dispatchEvent(new CustomEvent("arcady:broadcast-started", {
              detail: {
                label: String(data.label || "")
              }
            }));
          } catch (err) {
          }
        }
      } else {
        renderLiveTvPanel();
        renderVideoBoards();
      }
    });

    db.ref("arcadyAdmin/jumpscares/current").on("value", function (snapshot) {
      if (!snapshot.exists()) {
        state.currentJumpscare = {};
        clearJumpscare(true);
        renderJumpscareBoard();
        return;
      }

      const data = snapshot.val() || {};
      state.currentJumpscare = data;
      const jumpscareId = String(data.id || "");
      const isStop = String(data.action || "play").toLowerCase() === "stop" || data.active === false || !data.file;

      if (isStop) {
        if (jumpscareId) {
          state.lastHandledJumpscareId = jumpscareId;
        }
        clearJumpscare(true);
        renderJumpscareBoard();
        return;
      }

      if (!jumpscareId) {
        renderJumpscareBoard();
        return;
      }

      if (Number(data.createdAt || 0) && Number(data.createdAt || 0) < state.bootedAt) {
        state.lastHandledJumpscareId = jumpscareId;
        renderJumpscareBoard();
        return;
      }

      if (jumpscareId !== state.lastHandledJumpscareId || state.activeJumpscareFile !== normalizeJumpscareFileReference(data.file)) {
        state.lastHandledJumpscareId = jumpscareId;
        playJumpscare(data);
      } else {
        renderJumpscareBoard();
      }
    });

  }

  function subscribeVisitorAdmin() {
    if (!state.rtdb) {
      return;
    }

    state.rtdb.ref("arcadyAdmin/presence/site").on("value", function (snapshot) {
      const entries = snapshot.val() || {};
      state.currentVisitors = Object.keys(entries).map(function (key) {
        return entries[key] || {};
      }).filter(function (entry) {
        return entry && typeof entry === "object";
      }).sort(function (a, b) {
        return Number(b.updatedAt || 0) - Number(a.updatedAt || 0);
      });

      renderVisitorAdmin();
      renderOwnerPresence();
    });

    state.rtdb.ref("arcadyAdmin/bans/devices").on("value", function (snapshot) {
      const raw = snapshot.val() || {};
      const now = Date.now();
      state.siteBanMapRaw = raw;
      state.activeBans = {};
      Object.keys(raw).forEach(function (deviceId) {
        if (isActiveSiteBanEntry(raw[deviceId])) {
          state.activeBans[deviceId] = raw[deviceId];
        }
      });
      Object.keys(raw).forEach(function (deviceId) {
        const entry = raw[deviceId];
        const exp = Number(entry && entry.expiresAt || 0);
        if (exp > 0 && exp <= now) {
          state.rtdb.ref("arcadyAdmin/bans/devices/" + deviceId).remove().catch(function () {});
        }
      });
      pruneProtectedRestriction("arcadyAdmin/bans/devices", state.activeBans);
      updateBanOverlay();
      renderOwnerPresence();
    });

    state.rtdb.ref("arcadyAdmin/appeals/devices").on("value", function (snapshot) {
      state.activeAppeals = snapshot.val() || {};
      updateBanOverlay();
      renderOwnerAppeals();
    });

    state.rtdb.ref("arcadyAdmin/commands/closeAnnouncementAt").on("value", function (snapshot) {
      if (!snapshot.exists()) {
        return;
      }
      clearAnnouncementToast();
    });

  }

  function subscribeAdminAccess() {
    if (!state.rtdb) {
      return;
    }

    state.rtdb.ref("arcadyAdmin/access/deviceAdmins").on("value", function (snapshot) {
      const val = snapshot.val() || {};
      const now = Date.now();
      Object.keys(val).forEach(function (deviceId) {
        const entry = val[deviceId];
        const exp = Number(entry && entry.expiresAt || 0);
        if (exp > 0 && exp <= now) {
          state.rtdb.ref("arcadyAdmin/access/deviceAdmins/" + deviceId).remove().catch(function () {});
        }
      });
      state.adminGrantMap = val;
      if (!hasAdminAccess() && state.panel && state.panel.classList.contains("is-visible")) {
        closeAllOverlays();
      }
      updateLauncherVisibility();
      updatePresence(true);
      renderOwnerPresence();
    });

    state.rtdb.ref("arcadyAdmin/access/deviceBlocks").on("value", function (snapshot) {
      state.adminBlockMap = snapshot.val() || {};
      pruneProtectedRestriction("arcadyAdmin/access/deviceBlocks", state.adminBlockMap);
      if (isAdminBlocked()) {
        closeAllOverlays();
      }
      updateLauncherVisibility();
      updatePresence(true);
      renderOwnerPresence();
    });

    state.rtdb.ref("arcadyAdmin/settings").on("value", function (snapshot) {
      const settings = snapshot.val() || {};
      const nextAnnouncementMs = clampDurationMs(settings.announcementDurationMs, announcementDurationMs);
      const nextPollMs = clampDurationMs(settings.pollDurationMs, announcementDurationMs);
      const nextCursorEnabled = settings.customCursorEnabled !== false;
      const nextCursorTheme = String(settings.customCursorTheme || "").trim();
      state.settings.announcementDurationMs = nextAnnouncementMs;
      state.settings.pollDurationMs = nextPollMs;
      state.settings.customCursorEnabled = nextCursorEnabled;
      state.settings.customCursorTheme = nextCursorTheme;
      applySelectedCursorTheme();
      applyCustomCursorState();
      syncCursorControls();
      syncOwnerFields();
    });
  }

  function registerVisit() {
    if (!state.rtdb) {
      return;
    }

    const seenKey = "arcadyVisitRegistered:" + state.sessionId;
    if (sessionStorage.getItem(seenKey) === "true") {
      return;
    }

    sessionStorage.setItem(seenKey, "true");
    state.rtdb.ref("arcadyAdmin/metrics/visits/" + state.sessionId).set({
      sessionId: state.sessionId,
      deviceId: state.deviceId,
      nickname: readPresenceNickname(),
      page: location.pathname || "/",
      createdAt: Date.now()
    }).catch(function () {
    });

    recordVisitXpProgress().then(function (count) {
      syncXpNickname(true);
      if (count && count % visitMilestoneCount === 0) {
        awardXpToDevice(state.deviceId, visitMilestoneXpAmount, "visit-milestone", readPresenceNickname());
      }
    });
  }

  function renderVisitorAdmin() {
    return;
  }

  function collectRecentVisitors(list) {
    const deduped = new Map();
    (list || []).forEach(function (entry, index) {
      if (!entry || typeof entry !== "object") {
        return;
      }
      const updatedAt = Number(entry.updatedAt || 0);
      if (updatedAt && updatedAt < Date.now() - presenceCutoffMs) {
        return;
      }
      const key = String(entry.sessionId || entry.deviceId || index);
      const previous = deduped.get(key);
      if (!previous || updatedAt > Number(previous.updatedAt || 0)) {
        deduped.set(key, entry);
      }
    });
    return Array.from(deduped.values()).sort(function (a, b) {
      return Number(b.updatedAt || 0) - Number(a.updatedAt || 0);
    });
  }

  function renderOwnerPresence() {
    if (!state.ownerAdminViewerList && !state.ownerVisitorList) {
      renderHomepagePresenceBar();
      return;
    }

    const visitors = collectRecentVisitors(state.currentVisitors);
    const adminViewers = visitors.filter(function (visitor) {
      return !!visitor.adminPanelOpen;
    });
    const playing = visitors.filter(function (visitor) {
      return String(visitor.activityType || "").toLowerCase() === "play" || String(visitor.path || "").indexOf("/games/") !== -1;
    });

    if (state.ownerStatVisitors) state.ownerStatVisitors.textContent = String(visitors.length);
    if (state.ownerStatAdmin) state.ownerStatAdmin.textContent = String(adminViewers.length);
    if (state.ownerStatPlaying) state.ownerStatPlaying.textContent = String(playing.length);
    if (state.ownerStatBlocked) state.ownerStatBlocked.textContent = String(Object.keys(state.activeBans || {}).length);

    renderOwnerAdminViewers();
    renderOwnerVisitorList(visitors);
    renderOwnerAppeals();
    renderHomepagePresenceBar();
  }

  function renderHomepagePresenceBar() {
    if (!state.liveActiveStatus || !state.liveActiveClock || !state.liveActiveNames) {
      return;
    }

    const visitors = collectRecentVisitors(state.currentVisitors);
    const uniqueNames = [];
    const seenNames = {};

    visitors.forEach(function (visitor) {
      const label = displayNameForVisitor(visitor);
      const key = label.toLowerCase();
      if (seenNames[key]) {
        return;
      }
      seenNames[key] = true;
      uniqueNames.push(label);
    });

    state.liveActiveStatus.classList.remove("is-live", "is-connecting", "is-offline");

    if (!state.firebaseReady) {
      state.liveActiveStatus.classList.add("is-connecting");
      state.liveActiveClock.textContent = "Connecting live activity...";
      state.liveActiveNames.textContent = "Nicknames will appear here once the site reconnects.";
      return;
    }

    if (!visitors.length) {
      state.liveActiveStatus.classList.add("is-offline");
      state.liveActiveClock.textContent = "Nobody else is active right now";
      state.liveActiveNames.textContent = "Active nicknames will show up here when people are online.";
      return;
    }

    state.liveActiveStatus.classList.add("is-live");
    state.liveActiveClock.textContent = visitors.length + " active " + (visitors.length === 1 ? "person" : "people") + " on Arcady right now";
    state.liveActiveNames.textContent = uniqueNames.join(" • ");
  }

  function renderOwnerAdminViewers() {
    if (!state.ownerAdminViewerList) {
      return;
    }

    const grants = Object.keys(state.adminGrantMap || {}).map(function (deviceId) {
      return getDeviceAdminGrant(deviceId);
    }).filter(Boolean).sort(function (a, b) {
      return Number(b.grantedAt || 0) - Number(a.grantedAt || 0);
    });

    if (!grants.length) {
      state.ownerAdminViewerList.innerHTML = '<div class="arcady-owner-item"><div class="arcady-admin-meta">Nobody has a granted admin panel right now.</div></div>';
      return;
    }

    state.ownerAdminViewerList.innerHTML = grants.map(function (grant) {
      const visitor = findVisitor(grant.deviceId);
      const isOnline = !!(visitor && visitor.deviceId);
      const page = visitor.page || visitor.path || "/";
      const protectedGrant = isProtectedDevice(grant.deviceId);
      return '<div class="arcady-owner-item">' +
        '<strong>' + escapeHtml(grant.nickname || readableName(visitor)) + '</strong>' +
        '<div class="arcady-admin-meta">' + escapeHtml(grant.roleLabel) + " • " + escapeHtml(grant.deviceId || "unknown device") +
          (grant.expiresAt ? (' • access ends ' + escapeHtml(formatGrantExpiry(grant.expiresAt))) : '') +
        '</div>' +
        '<div class="arcady-admin-meta">' + (isOnline ? ('Online on ' + escapeHtml(page)) : 'Offline right now') + '</div>' +
        '<div class="arcady-owner-mini-actions">' +
          '<button class="arcady-admin-button' + (grant.role === "admin" ? " is-secondary" : "") + '" type="button" data-owner-set-admin-role="' + escapeHtml(grant.deviceId) + '" data-owner-set-admin-value="admin"' + (protectedGrant ? " disabled" : "") + '>Admin</button>' +
          '<button class="arcady-admin-button' + (grant.role === "super-admin" ? " is-secondary" : "") + '" type="button" data-owner-set-admin-role="' + escapeHtml(grant.deviceId) + '" data-owner-set-admin-value="super-admin"' + (protectedGrant ? " disabled" : "") + '>Super</button>' +
          '<button class="arcady-admin-button' + (grant.role === "supreme-admin" ? " is-secondary" : "") + '" type="button" data-owner-set-admin-role="' + escapeHtml(grant.deviceId) + '" data-owner-set-admin-value="supreme-admin"' + (protectedGrant ? " disabled" : "") + '>Supreme</button>' +
          '<button class="arcady-admin-button' + (grant.role === "corrupted-admin" ? " is-secondary" : "") + '" type="button" data-owner-set-admin-role="' + escapeHtml(grant.deviceId) + '" data-owner-set-admin-value="corrupted-admin"' + (protectedGrant ? " disabled" : "") + '>Corrupted</button>' +
          '<button class="arcady-admin-button' + (grant.role === "temp-admin" ? " is-secondary" : "") + '" type="button" data-owner-set-admin-role="' + escapeHtml(grant.deviceId) + '" data-owner-set-admin-value="temp-admin"' + (protectedGrant ? " disabled" : "") + '>Temp Admin</button>' +
          '<button class="arcady-admin-button is-danger" type="button" data-owner-remove-admin-role="' + escapeHtml(grant.deviceId) + '"' + (protectedGrant ? " disabled" : "") + '>Remove</button>' +
        '</div>' +
      '</div>';
    }).join("");

    state.ownerAdminViewerList.querySelectorAll("[data-owner-set-admin-role]").forEach(function (button) {
      button.addEventListener("click", function () {
        assignDeviceAdminRole(
          button.getAttribute("data-owner-set-admin-role"),
          button.getAttribute("data-owner-set-admin-value")
        );
      });
    });
    state.ownerAdminViewerList.querySelectorAll("[data-owner-remove-admin-role]").forEach(function (button) {
      button.addEventListener("click", function () {
        removeDeviceAdminRole(button.getAttribute("data-owner-remove-admin-role"));
      });
    });
  }

  function renderOwnerVisitorList(list) {
    if (!state.ownerVisitorList) {
      return;
    }
    if (!list.length) {
      state.ownerVisitorList.innerHTML = '<div class="arcady-owner-item"><div class="arcady-admin-meta">No active visitors right now.</div></div>';
      return;
    }

    state.ownerVisitorList.innerHTML = list.map(function (visitor) {
      const deviceId = String(visitor.deviceId || "");
      const blocked = !!state.activeBans[deviceId];
      const adminGrant = getDeviceAdminGrant(deviceId);
      const adminGranted = !!adminGrant;
      const adminBlocked = !!state.adminBlockMap[deviceId];
      const protectedVisitor = isProtectedDevice(deviceId);
      const roleLabel = adminGrant ? adminGrant.roleLabel : "";
      return '<div class="arcady-owner-item">' +
        '<div class="arcady-owner-item-top">' +
          '<div>' +
            '<strong>' + escapeHtml(displayNameForVisitor(visitor)) + '</strong>' +
            '<div class="arcady-admin-meta">' + escapeHtml(visitor.page || "/") + (visitor.adminPanelOpen ? ' • admin panel open' : '') + (roleLabel ? (' • ' + escapeHtml(roleLabel)) : '') + (adminBlocked ? ' • admin blocked' : '') + '</div>' +
            '<div class="arcady-admin-meta">' + escapeHtml(visitor.activityLabel || "Browsing Arcady") + '</div>' +
            '<div class="arcady-admin-meta">' + escapeHtml(deviceId || "unknown device") + ' • updated ' + escapeHtml(relativeTime(visitor.updatedAt)) + '</div>' +
          '</div>' +
          '<div class="arcady-owner-mini-actions">' +
            '<button class="arcady-admin-button' + (blocked ? ' is-secondary' : ' is-danger') + '" type="button" data-owner-site-ban="' + escapeHtml(deviceId) + '"' + (protectedVisitor ? ' disabled' : '') + '>' + (protectedVisitor ? 'Arcady Protected' : (blocked ? 'Unblock Site' : 'Block Site')) + '</button>' +
            '<button class="arcady-admin-button' + (adminGranted ? ' is-secondary' : '') + '" type="button" data-owner-admin-grant="' + escapeHtml(deviceId) + '"' + (protectedVisitor && adminGranted ? ' disabled' : '') + '>' + (protectedVisitor && adminGranted ? 'Arcady Protected' : (adminGranted ? 'Remove Panel' : 'Grant Admin')) + '</button>' +
            '<button class="arcady-admin-button' + (adminBlocked ? ' is-secondary is-danger' : ' is-danger') + '" type="button" data-owner-admin-block="' + escapeHtml(deviceId) + '"' + (protectedVisitor ? ' disabled' : '') + '>' + (protectedVisitor ? 'Arcady Protected' : (adminBlocked ? 'Unblock Admin' : 'Block Admin')) + '</button>' +
            '<button class="arcady-admin-button is-secondary" type="button" data-owner-fill-chat-tag-device="' + escapeHtml(deviceId) + '">Chat tags device</button>' +
          '</div>' +
        '</div>' +
      '</div>';
    }).join("");

    state.ownerVisitorList.querySelectorAll("[data-owner-site-ban]").forEach(function (button) {
      button.addEventListener("click", function () {
        toggleDeviceBan(button.getAttribute("data-owner-site-ban"));
      });
    });
    state.ownerVisitorList.querySelectorAll("[data-owner-admin-grant]").forEach(function (button) {
      button.addEventListener("click", function () {
        toggleDeviceAdminGrant(button.getAttribute("data-owner-admin-grant"));
      });
    });
    state.ownerVisitorList.querySelectorAll("[data-owner-admin-block]").forEach(function (button) {
      button.addEventListener("click", function () {
        toggleDeviceAdminBlock(button.getAttribute("data-owner-admin-block"));
      });
    });
    state.ownerVisitorList.querySelectorAll("[data-owner-fill-chat-tag-device]").forEach(function (button) {
      button.addEventListener("click", function () {
        const id = button.getAttribute("data-owner-fill-chat-tag-device");
        if (state.ownerChatTagsDeviceInput && id) {
          state.ownerChatTagsDeviceInput.value = id;
        }
        renderOwnerHomepageChatNameTagsUI();
        setOwnerStatus("Device id copied into Homepage chat name tags.");
      });
    });
  }

  function renderOwnerAppeals() {
    if (!state.ownerAppealList) {
      return;
    }

    const appeals = Object.keys(state.activeAppeals || {}).map(function (deviceId) {
      const entry = state.activeAppeals[deviceId];
      return entry && typeof entry === "object"
        ? Object.assign({ deviceId: deviceId }, entry)
        : null;
    }).filter(Boolean).sort(function (a, b) {
      const aPending = String(a.status || "pending").toLowerCase() === "pending" ? 1 : 0;
      const bPending = String(b.status || "pending").toLowerCase() === "pending" ? 1 : 0;
      if (aPending !== bPending) {
        return bPending - aPending;
      }
      return Number(b.updatedAt || b.submittedAt || 0) - Number(a.updatedAt || a.submittedAt || 0);
    });

    if (!appeals.length) {
      state.ownerAppealList.innerHTML = '<div class="arcady-owner-item"><div class="arcady-admin-meta">No ban appeals yet.</div></div>';
      return;
    }

    state.ownerAppealList.innerHTML = appeals.map(function (appeal) {
      const status = String(appeal.status || "pending").toLowerCase();
      const statusLabel = status.charAt(0).toUpperCase() + status.slice(1);
      const reason = String(appeal.reason || "").trim();
      return '<div class="arcady-owner-item">' +
        '<div class="arcady-owner-item-top">' +
          '<div>' +
            '<strong>' + escapeHtml(appeal.nickname || "Unknown user") + "</strong>" +
            '<div class="arcady-admin-meta">' + escapeHtml(appeal.deviceId || "unknown device") + " • " + escapeHtml(statusLabel) + "</div>" +
            '<div class="arcady-admin-meta">' + escapeHtml(appeal.page || appeal.path || "/") + " • submitted " + escapeHtml(relativeTime(appeal.submittedAt || appeal.updatedAt)) + "</div>" +
            '<div class="arcady-admin-meta">' + escapeHtml(reason || "No reason given.") + "</div>" +
          "</div>" +
          '<div class="arcady-owner-mini-actions">' +
            '<button class="arcady-admin-button" type="button" data-owner-appeal-approve="' + escapeHtml(appeal.deviceId) + '"' + (status === "approved" ? " disabled" : "") + '>Approve</button>' +
            '<button class="arcady-admin-button is-danger" type="button" data-owner-appeal-disapprove="' + escapeHtml(appeal.deviceId) + '"' + (status === "disapproved" ? " disabled" : "") + '>Disapprove</button>' +
          "</div>" +
        "</div>" +
      "</div>";
    }).join("");

    state.ownerAppealList.querySelectorAll("[data-owner-appeal-approve]").forEach(function (button) {
      button.addEventListener("click", function () {
        resolveBanAppeal(button.getAttribute("data-owner-appeal-approve"), "approved");
      });
    });
    state.ownerAppealList.querySelectorAll("[data-owner-appeal-disapprove]").forEach(function (button) {
      button.addEventListener("click", function () {
        resolveBanAppeal(button.getAttribute("data-owner-appeal-disapprove"), "disapproved");
      });
    });
  }

  function findVisitor(deviceId) {
    return collectRecentVisitors(state.currentVisitors).find(function (entry) {
      return String(entry.deviceId || "") === String(deviceId || "");
    }) || {};
  }

  function isActiveSiteBanEntry(entry) {
    if (!entry || typeof entry !== "object") {
      return false;
    }
    const exp = Number(entry.expiresAt || 0);
    if (exp > 0 && exp <= Date.now()) {
      return false;
    }
    return true;
  }

  function deviceHasActiveSiteBan(deviceId) {
    const key = String(deviceId || "").trim();
    if (!key) {
      return false;
    }
    return isActiveSiteBanEntry(state.siteBanMapRaw[key]);
  }

  function toggleDeviceBan(deviceId) {
    if (!deviceId || !state.rtdb) {
      return;
    }
    if (isProtectedDevice(deviceId)) {
      setOwnerStatus("Arcady is protected and cannot be banned.");
      return;
    }
    const ref = state.rtdb.ref("arcadyAdmin/bans/devices/" + deviceId);
    if (deviceHasActiveSiteBan(deviceId)) {
      ref.remove();
      return;
    }
    const visitor = findVisitor(deviceId);
    ref.set({
      deviceId: deviceId,
      nickname: readableName(visitor),
      path: visitor.path || "",
      page: visitor.page || "",
      bannedAt: Date.now()
    });
  }

  function toggleDeviceAdminGrant(deviceId) {
    if (!deviceId || !state.rtdb) {
      return;
    }
    const existingGrant = getDeviceAdminGrant(deviceId);
    if (existingGrant && isProtectedDevice(deviceId)) {
      setOwnerStatus("Arcady keeps admin access and cannot be removed.");
      return;
    }
    if (existingGrant) {
      removeDeviceAdminRole(deviceId);
      return;
    }
    assignDeviceAdminRole(deviceId, "admin");
  }

  async function writeDeviceAdminGrant(deviceId, roleKey, nickname, expiresAt) {
    const payload = {
      deviceId: deviceId,
      nickname: nickname,
      role: roleKey,
      grantedAt: Date.now()
    };
    const exp = Number(expiresAt || 0);
    if (exp > 0) {
      payload.expiresAt = exp;
    }
    await state.rtdb.ref("arcadyAdmin/access/deviceAdmins/" + deviceId).set(payload);
  }

  async function assignDeviceAdminRole(deviceId, role, fallbackVisitor, options) {
    if (!deviceId || !state.rtdb || !hasOwnerAccess() || !state.firebaseReady) {
      setOwnerStatus("Unlock owner and connect Firebase first.");
      return;
    }

    const opts = options || {};
    const config = getAdminRoleConfig(role);
    const visitor = fallbackVisitor || findVisitor(deviceId) || {};
    const existingGrant = getDeviceAdminGrant(deviceId);
    const visitorName = String(visitor && (visitor.nickname || visitor.username) || "").trim();
    const nickname = visitorName || (existingGrant && existingGrant.nickname) || "Unnamed visitor";
    let expiresAt = Number(opts.expiresAt || 0) || 0;
    if (config.key === "temp-admin" && !expiresAt) {
      expiresAt = Date.now() + tempAdminDurationMs;
    }
    await writeDeviceAdminGrant(deviceId, config.key, nickname, expiresAt);

    setOwnerStatus('Granted "' + config.label + '" to "' + nickname + '".');
  }

  async function removeDeviceAdminRole(deviceId) {
    if (!deviceId || !state.rtdb || !hasOwnerAccess() || !state.firebaseReady) {
      setOwnerStatus("Unlock owner and connect Firebase first.");
      return;
    }
    if (state.adminGrantMap[deviceId] && isProtectedDevice(deviceId)) {
      setOwnerStatus("Arcady keeps admin access and cannot be removed.");
      return;
    }

    const grant = getDeviceAdminGrant(deviceId);
    const visitor = findVisitor(deviceId);
    await state.rtdb.ref("arcadyAdmin/access/deviceAdmins/" + deviceId).remove();
    setOwnerStatus('Removed "' + (grant ? grant.roleLabel : "Admin") + '" from "' + (grant && grant.nickname ? grant.nickname : readableName(visitor)) + '".');
  }

  function canUseModerationTools() {
    return hasOwnerAccess() || (hasAdminCapability("moderation-tools") && hasAdminAccess());
  }

  function readModerationDurationMs(selectEl, fallbackMs) {
    const n = Number(selectEl && selectEl.value || 0);
    if (n > 0) {
      return n;
    }
    return fallbackMs || 300000;
  }

  function sanitizeAdminHexColor(value, fallback) {
    const raw = String(value || "").trim();
    const fb = String(fallback || "#5865f2").trim();
    const m = raw.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
    if (!m) {
      return fb;
    }
    let hex = m[1];
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    return "#" + hex.toLowerCase();
  }

  function normalizeOwnerNameTagEffect(value) {
    const allowed = ["none", "glow", "shimmer", "pulse", "rainbow"];
    const v = String(value || "").trim().toLowerCase();
    return allowed.indexOf(v) >= 0 ? v : "none";
  }

  function renderOwnerHomepageChatNameTagsUI() {
    if (!state.ownerChatNametagList || !state.ownerChatNametagAssignChecks) {
      return;
    }
    const tags = state.homepageChatNameTags || {};
    const ids = Object.keys(tags);
    if (!ids.length) {
      state.ownerChatNametagList.innerHTML = '<div class="arcady-owner-item"><div class="arcady-admin-meta">No tags yet. Create one above.</div></div>';
    } else {
      state.ownerChatNametagList.innerHTML = ids.map(function (id) {
        const t = tags[id] || {};
        const label = String(t.label || "Tag").trim().slice(0, 32);
        const bg = sanitizeAdminHexColor(t.bgColor, "#5865f2");
        const fg = sanitizeAdminHexColor(t.textColor, "#ffffff");
        const eff = String(t.effect || "none");
        return (
          '<div class="arcady-owner-item">' +
          '<div class="arcady-owner-item-top">' +
          '<div><strong>' +
          escapeHtml(label) +
          "</strong>" +
          '<div class="arcady-admin-meta">' +
          escapeHtml(id) +
          " • " +
          escapeHtml(eff) +
          "</div>" +
          '<div class="arcady-owner-inline-two" style="margin-top:6px;max-width:220px;">' +
          '<span style="display:inline-block;padding:3px 8px;border-radius:6px;background:' +
          escapeHtml(bg) +
          ";color:" +
          escapeHtml(fg) +
          ';font-size:11px;font-weight:800;">' +
          escapeHtml(label) +
          "</span></div>" +
          "</div>" +
          '<div class="arcady-owner-mini-actions">' +
          '<button class="arcady-admin-button is-danger" type="button" data-owner-chat-nametag-delete="' +
          escapeHtml(id) +
          '">Delete</button>' +
          "</div></div></div>"
        );
      }).join("");
      state.ownerChatNametagList.querySelectorAll("[data-owner-chat-nametag-delete]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          deleteOwnerHomepageChatNameTag(btn.getAttribute("data-owner-chat-nametag-delete"));
        });
      });
    }
    const deviceId = String(state.ownerChatTagsDeviceInput && state.ownerChatTagsDeviceInput.value || "").trim();
    const current = deviceId && state.homepageChatUserNameTags && state.homepageChatUserNameTags[deviceId];
    const selected = current && Array.isArray(current.tagIds) ? current.tagIds : [];
    if (!ids.length) {
      state.ownerChatNametagAssignChecks.innerHTML = '<div class="arcady-admin-meta">Create at least one tag to assign.</div>';
      return;
    }
    state.ownerChatNametagAssignChecks.innerHTML = ids
      .map(function (id) {
        const t = tags[id] || {};
        const label = String(t.label || id).trim().slice(0, 32);
        const checked = selected.indexOf(id) >= 0 ? " checked" : "";
        return (
          '<label class="arcady-owner-item" style="cursor:pointer;"><input type="checkbox" data-owner-tag-assign="' +
          escapeHtml(id) +
          '"' +
          checked +
          '> <strong>' +
          escapeHtml(label) +
          "</strong></label>"
        );
      })
      .join("");
  }

  window.arcadyRenderOwnerChatNameTags = renderOwnerHomepageChatNameTagsUI;

  async function createOwnerHomepageChatNameTag() {
    if (!hasOwnerAccess() || !state.rtdb || !state.firebaseReady) {
      setOwnerStatus("Unlock owner and connect Firebase first.");
      return;
    }
    const label = String(state.ownerChatNametagLabelInput && state.ownerChatNametagLabelInput.value || "")
      .trim()
      .slice(0, 32);
    if (!label) {
      setOwnerStatus("Enter a tag label.");
      return;
    }
    const bg = sanitizeAdminHexColor(state.ownerChatNametagBgInput && state.ownerChatNametagBgInput.value, "#5865f2");
    const fg = sanitizeAdminHexColor(state.ownerChatNametagFgInput && state.ownerChatNametagFgInput.value, "#ffffff");
    const effect = normalizeOwnerNameTagEffect(state.ownerChatNametagEffectSelect && state.ownerChatNametagEffectSelect.value);
    try {
      const ref = state.rtdb.ref(homepageChatNameTagsPath).push();
      await ref.set({
        label: label,
        bgColor: bg,
        textColor: fg,
        effect: effect,
        createdAt: Date.now()
      });
      setOwnerStatus("Name tag created.");
      if (state.ownerChatNametagLabelInput) {
        state.ownerChatNametagLabelInput.value = "";
      }
    } catch (error) {
      console.error(error);
      setOwnerStatus("Could not create that tag.");
    }
  }

  async function deleteOwnerHomepageChatNameTag(tagId) {
    const id = String(tagId || "").trim();
    if (!id || !hasOwnerAccess() || !state.rtdb || !state.firebaseReady) {
      setOwnerStatus("Unlock owner and connect Firebase first.");
      return;
    }
    if (!window.confirm("Delete this name tag for everyone?")) {
      return;
    }
    try {
      await state.rtdb.ref(homepageChatNameTagsPath + "/" + id).remove();
      setOwnerStatus("Name tag deleted.");
    } catch (error) {
      console.error(error);
      setOwnerStatus("Could not delete that tag.");
    }
  }

  async function saveOwnerHomepageChatUserNameTags() {
    const deviceId = String(state.ownerChatTagsDeviceInput && state.ownerChatTagsDeviceInput.value || "").trim();
    if (!hasOwnerAccess() || !state.rtdb || !state.firebaseReady) {
      setOwnerStatus("Unlock owner and connect Firebase first.");
      return;
    }
    if (!deviceId) {
      setOwnerStatus("Paste a visitor device id first.");
      return;
    }
    const checks = state.ownerChatNametagAssignChecks
      ? state.ownerChatNametagAssignChecks.querySelectorAll("input[type=\"checkbox\"][data-owner-tag-assign]:checked")
      : [];
    const tagIds = [];
    checks.forEach(function (box) {
      const tid = String(box.getAttribute("data-owner-tag-assign") || "").trim();
      if (tid && tagIds.length < 8) {
        tagIds.push(tid);
      }
    });
    try {
      await state.rtdb.ref(homepageChatUserNameTagsPath + "/" + deviceId).set({
        deviceId: deviceId,
        tagIds: tagIds,
        updatedAt: Date.now()
      });
      setOwnerStatus("Saved chat tags for that device.");
    } catch (error) {
      console.error(error);
      setOwnerStatus("Could not save tag assignment.");
    }
  }

  async function clearOwnerHomepageChatUserNameTags() {
    const deviceId = String(state.ownerChatTagsDeviceInput && state.ownerChatTagsDeviceInput.value || "").trim();
    if (!hasOwnerAccess() || !state.rtdb || !state.firebaseReady) {
      setOwnerStatus("Unlock owner and connect Firebase first.");
      return;
    }
    if (!deviceId) {
      setOwnerStatus("Paste a visitor device id first.");
      return;
    }
    try {
      await state.rtdb.ref(homepageChatUserNameTagsPath + "/" + deviceId).remove();
      setOwnerStatus("Cleared chat tags for that device.");
    } catch (error) {
      console.error(error);
      setOwnerStatus("Could not clear tags.");
    }
  }

  async function applyChatTimeoutForVisitor(visitor, durationMs, feedback) {
    const deviceId = String(visitor && visitor.deviceId || "").trim();
    if (!deviceId || !state.rtdb || !state.firebaseReady) {
      feedback("Connect to Firebase first.");
      return;
    }
    if (isProtectedDevice(deviceId)) {
      feedback("That visitor is protected.");
      return;
    }
    const vis = visitor && visitor.deviceId ? visitor : findVisitor(deviceId);
    const until = Date.now() + durationMs;
    await state.rtdb.ref("arcadyAdmin/homepageChat/timeouts/devices/" + deviceId).set({
      deviceId: deviceId,
      until: until,
      nickname: readableName(vis),
      setByDeviceId: state.deviceId,
      setByNickname: readNickname() || "Staff",
      setAt: Date.now()
    });
    feedback("Chat timeout applied.");
  }

  async function clearChatTimeoutForDeviceId(deviceId, feedback) {
    const key = String(deviceId || "").trim();
    if (!key || !state.rtdb || !state.firebaseReady) {
      feedback("Connect to Firebase first.");
      return;
    }
    await state.rtdb.ref("arcadyAdmin/homepageChat/timeouts/devices/" + key).remove();
    feedback("Chat timeout cleared.");
  }

  async function applyTemporarySiteBanForVisitor(visitor, durationMs, feedback) {
    const deviceId = String(visitor && visitor.deviceId || "").trim();
    if (!deviceId || !state.rtdb || !state.firebaseReady) {
      feedback("Connect to Firebase first.");
      return;
    }
    if (isProtectedDevice(deviceId) || isProtectedNickname(visitor && visitor.nickname)) {
      feedback("That visitor is protected.");
      return;
    }
    const vis = findVisitor(deviceId);
    const expiresAt = Date.now() + durationMs;
    await state.rtdb.ref("arcadyAdmin/bans/devices/" + deviceId).set({
      deviceId: deviceId,
      nickname: (visitor && visitor.nickname) || readableName(vis),
      path: vis.path || "",
      page: vis.page || "",
      bannedAt: Date.now(),
      expiresAt: expiresAt
    });
    feedback("Temporary site ban applied.");
  }

  async function grantTemporaryAdminForVisitor(visitor, feedback) {
    const deviceId = String(visitor && visitor.deviceId || "").trim();
    if (!deviceId || !state.rtdb || !state.firebaseReady) {
      feedback("Connect to Firebase first.");
      return;
    }
    if (!canUseModerationTools()) {
      feedback("No permission to grant Temporary Admin.");
      return;
    }
    if (isProtectedDevice(deviceId)) {
      feedback("That visitor is protected.");
      return;
    }
    const nickname = (visitor && visitor.nickname) || readableName(findVisitor(deviceId)) || "Unnamed visitor";
    await writeDeviceAdminGrant(deviceId, "temp-admin", nickname, Date.now() + tempAdminDurationMs);
    feedback('Granted Temporary Admin (24h) to "' + nickname + '".');
  }

  function runCorruptedModerationAction(kind) {
    if (!canUseModerationTools()) {
      setStatus("No permission.");
      return;
    }
    const nickInput = document.getElementById("arcady-corrupted-target-nickname");
    const durSelect = document.getElementById("arcady-corrupted-duration");
    const nickname = String(nickInput && nickInput.value || "").trim();
    if (!nickname) {
      setStatus("Enter a nickname first.");
      return;
    }
    const visitor = findKnownPersonByNickname(nickname);
    if (!visitor || !visitor.deviceId) {
      setStatus('No known visitor matched "' + nickname + '".');
      return;
    }
    const ms = readModerationDurationMs(durSelect, 300000);
    const feedback = function (msg) {
      setStatus(msg);
    };
    const fail = function (err) {
      console.error("Arcady moderation action failed:", err);
      setStatus("That action failed. Check the console.");
    };
    if (kind === "timeout") {
      void applyChatTimeoutForVisitor(visitor, ms, feedback).catch(fail);
    } else if (kind === "clear-timeout") {
      void clearChatTimeoutForDeviceId(visitor.deviceId, feedback).catch(fail);
    } else if (kind === "temp-ban") {
      void applyTemporarySiteBanForVisitor(visitor, ms, feedback).catch(fail);
    } else if (kind === "temp-admin") {
      void grantTemporaryAdminForVisitor(visitor, feedback).catch(fail);
    }
  }

  function findVisitorByNickname(nickname) {
    const needle = String(nickname || "").trim().toLowerCase();
    if (!needle) {
      return null;
    }

    const visitors = collectRecentVisitors(state.currentVisitors).filter(function (entry) {
      return readableName(entry).toLowerCase() === needle;
    });

    if (!visitors.length) {
      return null;
    }

    return visitors.sort(function (a, b) {
      return Number(b.updatedAt || 0) - Number(a.updatedAt || 0);
    })[0];
  }

  function toggleDeviceAdminBlock(deviceId) {
    if (!deviceId || !state.rtdb) {
      return;
    }
    if (isProtectedDevice(deviceId)) {
      setOwnerStatus("Arcady is protected from admin blocking.");
      return;
    }
    const ref = state.rtdb.ref("arcadyAdmin/access/deviceBlocks/" + deviceId);
    if (state.adminBlockMap[deviceId]) {
      ref.remove();
      return;
    }
    const visitor = findVisitor(deviceId);
    ref.set({
      deviceId: deviceId,
      nickname: readableName(visitor),
      blockedAt: Date.now()
    });
  }

  async function submitBanAppeal() {
    if (!state.rtdb || !state.firebaseReady) {
      if (state.banAppealMessage) {
        state.banAppealMessage.textContent = "Reconnect to Arcady before sending an appeal.";
      }
      return;
    }

    if (!deviceHasActiveSiteBan(state.deviceId)) {
      if (state.banAppealMessage) {
        state.banAppealMessage.textContent = "This device is not currently banned.";
      }
      return;
    }

    const reason = String(state.banAppealInput && state.banAppealInput.value || "").trim().slice(0, 400);
    const now = Date.now();
    await state.rtdb.ref("arcadyAdmin/appeals/devices/" + state.deviceId).set({
      deviceId: state.deviceId,
      nickname: readPresenceNickname(),
      page: location.pathname || "/",
      path: location.pathname || "/",
      reason: reason,
      status: "pending",
      submittedAt: now,
      updatedAt: now
    });

    if (state.banAppealMessage) {
      state.banAppealMessage.textContent = "Appeal submitted. The owner can review it now.";
    }
  }

  async function resolveBanAppeal(deviceId, status) {
    if (!deviceId || !state.rtdb || !hasOwnerAccess() || !state.firebaseReady) {
      setOwnerStatus("Unlock owner and connect Firebase first.");
      return;
    }

    const nextStatus = String(status || "").toLowerCase() === "approved" ? "approved" : "disapproved";
    const existing = state.activeAppeals && state.activeAppeals[deviceId] ? state.activeAppeals[deviceId] : {};
    const now = Date.now();

    await state.rtdb.ref("arcadyAdmin/appeals/devices/" + deviceId).update({
      status: nextStatus,
      updatedAt: now,
      reviewedAt: now,
      reviewer: readNickname() || "Owner",
      deviceId: deviceId
    });

    if (nextStatus === "approved") {
      await state.rtdb.ref("arcadyAdmin/bans/devices/" + deviceId).remove();
      setOwnerStatus('Approved appeal for "' + readableName(existing) + '".');
      return;
    }

    setOwnerStatus('Disapproved appeal for "' + readableName(existing) + '".');
  }

  function updateBanOverlay() {
    if (!state.banOverlay) {
      return;
    }
    const banned = deviceHasActiveSiteBan(state.deviceId);
    state.banOverlay.classList.toggle("is-visible", banned);

    if (!banned) {
      if (state.banAppealInput) {
        state.banAppealInput.value = "";
        state.banAppealInput.disabled = false;
      }
      if (state.banAppealSubmit) {
        state.banAppealSubmit.disabled = false;
      }
      if (state.banAppealMessage) {
        state.banAppealMessage.textContent = "";
      }
      return;
    }

    const appeal = getCurrentDeviceAppeal();
    if (!state.banAppealMessage) {
      return;
    }

    const status = String(appeal && appeal.status || "").toLowerCase();
    if (state.banAppealSubmit) {
      state.banAppealSubmit.disabled = status === "pending";
    }
    if (state.banAppealInput) {
      state.banAppealInput.disabled = status === "pending";
      if (status !== "pending" && appeal && typeof appeal.reason === "string" && !state.banAppealInput.value) {
        state.banAppealInput.value = appeal.reason;
      }
    }
    if (status === "approved") {
      state.banAppealMessage.textContent = "Your appeal was approved. Reload if access does not return in a moment.";
    } else if (status === "disapproved") {
      state.banAppealMessage.textContent = "Your last appeal was disapproved. You can submit a new one.";
    } else if (status === "pending") {
      state.banAppealMessage.textContent = "Your appeal is pending owner review.";
    } else {
      state.banAppealMessage.textContent = "Explain why this block should be removed, then send your appeal.";
    }
  }

  function getCurrentDeviceAppeal() {
    return state.activeAppeals && state.activeAppeals[state.deviceId]
      ? state.activeAppeals[state.deviceId]
      : null;
  }

  function attachVotesListener() {
    if (typeof state.pollVoteUnsubscribe === "function") {
      state.pollVoteUnsubscribe();
      state.pollVoteUnsubscribe = null;
    }

    if (!state.rtdb || !state.currentPollId) {
      return;
    }

    const votesRef = state.rtdb.ref("arcadyAdmin/pollVotes/" + state.currentPollId);
    const listener = function (snapshot) {
      state.currentVotes = snapshot.val() || {};
      if (state.currentPollData && state.currentPollData.active) {
        renderPollCard(state.currentPollData);
        renderHomepagePoll(state.currentPollData);
      }
    };

    votesRef.on("value", listener);
    state.pollVoteUnsubscribe = function () {
      votesRef.off("value", listener);
    };
  }

  function showAnnouncementToast(data) {
    if (!state.currentAnnouncementId) {
      return;
    }

    const seenKey = "arcadyAdminSeenAnnouncement:" + state.currentAnnouncementId;
    if (sessionStorage.getItem(seenKey) === "true") {
      return;
    }
    sessionStorage.setItem(seenKey, "true");

    const toast = document.createElement("div");
    const position = normalizeAnnouncementPosition(data.position);
    const image = normalizeAssetPath(data.image);
    toast.className = "arcady-admin-toast is-pos-" + position;
    toast.setAttribute("data-announcement-toast", "true");
    toast.setAttribute("data-announcement-position", position);
    toast.setAttribute("data-announcement-created-at", String(Number(data.createdAt || Date.now())));
    toast.innerHTML = `
      <div class="arcady-admin-toast-head">
        <div class="arcady-admin-title">Global Announcement</div>
        <button class="arcady-admin-toast-close" type="button" aria-label="Close announcement">x</button>
      </div>
      ${image ? '<img class="arcady-admin-toast-image" src="' + escapeHtml(image) + '" alt="Announcement image">' : ""}
      <div class="arcady-admin-meta">${escapeHtml(data.message || "")}</div>
      <div class="arcady-admin-meta">Sent by ${escapeHtml(data.authorName || "Staff")}</div>
    `;

    state.root.appendChild(toast);
    layoutAnnouncementToasts();

    const closeButton = toast.querySelector(".arcady-admin-toast-close");
    if (closeButton) {
      closeButton.addEventListener("click", function () {
        toast.remove();
        layoutAnnouncementToasts();
      });
    }

    const toastImage = toast.querySelector(".arcady-admin-toast-image");
    if (toastImage) {
      toastImage.addEventListener("load", layoutAnnouncementToasts, { once: true });
      toastImage.addEventListener("error", layoutAnnouncementToasts, { once: true });
    }

    setTimeout(function () {
      toast.remove();
      layoutAnnouncementToasts();
    }, state.settings.announcementDurationMs);
  }

  function clearAnnouncementToast() {
    if (!state.root) {
      return;
    }

    state.root.querySelectorAll("[data-announcement-toast]").forEach(function (toast) {
      toast.remove();
    });
  }

  function applyHomepageNewsState(data) {
    const text = String(data && data.text || "").trim();
    const authorName = String(data && data.authorName || "").trim();
    const updatedAt = Number(data && data.updatedAt || 0);
    const defaultText = "No live news posted yet. Owner updates will show up here.";
    const defaultMeta = "Live updates from the owner panel will appear here.";
    const activeMeta = "Updated " + new Date(updatedAt).toLocaleString() + (authorName ? " by " + authorName : "");

    if (state.homeNewsPanel) {
      state.homeNewsPanel.classList.toggle("is-empty", !text);
    }

    if (state.homeNewsText) {
      state.homeNewsText.textContent = text || defaultText;
    }

    if (state.homeNewsMeta) {
      state.homeNewsMeta.textContent = text && updatedAt ? activeMeta : defaultMeta;
    }

  }

  function syncOwnerHomepageNewsState(data) {
    if (!state.ownerHomeNewsInput) {
      return;
    }

    if (document.activeElement === state.ownerHomeNewsInput) {
      return;
    }

    state.ownerHomeNewsInput.value = String(data && data.text || "");
  }

  function normalizeWallOfFameEntries(list) {
    return (Array.isArray(list) ? list : []).map(function (entry, index) {
      const rank = String(entry && entry.rank || "").trim().slice(0, 40);
      const name = String(entry && entry.name || "").trim().slice(0, 40);
      const fallbackColor = defaultWallOfFameColors[index % defaultWallOfFameColors.length];
      const color = normalizeColor(entry && entry.color) || fallbackColor;
      const createdAt = Number(entry && entry.createdAt || 0) || Date.now() + index;
      const id = String(entry && entry.id || "").trim() || "wall-entry-" + createdAt + "-" + index;

      if (!rank && !name) {
        return null;
      }

      return {
        id: id,
        rank: rank || "Rank",
        name: name || "Unnamed",
        color: color,
        createdAt: createdAt
      };
    }).filter(Boolean).slice(0, 24);
  }

  function getWallOfFameBarHeight(index, total) {
    const minimum = 168;
    const maximum = 320;
    if (total <= 1) {
      return 228;
    }
    const ratio = index / Math.max(1, total - 1);
    return Math.round(minimum + (maximum - minimum) * ratio);
  }

  function applyWallOfFameState(entries, payload) {
    const normalizedEntries = normalizeWallOfFameEntries(entries);
    const count = normalizedEntries.length;
    const authorName = String(payload && payload.authorName || "").trim();
    const updatedAt = Number(payload && payload.updatedAt || 0);
    state.wallOfFameEntries = normalizedEntries;

    if (state.wallOfFamePanel) {
      state.wallOfFamePanel.classList.toggle("is-empty", !count);
    }

    if (state.wallOfFameMeta) {
      if (!count) {
        state.wallOfFameMeta.textContent = "Owner-picked ranks will show up here live.";
      } else if (updatedAt) {
        state.wallOfFameMeta.textContent =
          count + " legend" + (count === 1 ? "" : "s") +
          " on the wall" +
          (authorName ? " by " + authorName : "") +
          " • updated " + new Date(updatedAt).toLocaleString();
      } else {
        state.wallOfFameMeta.textContent = "Scroll sideways to see every legend.";
      }
    }

    if (state.wallOfFameEmpty) {
      state.wallOfFameEmpty.style.display = count ? "none" : "flex";
    }

    if (!state.wallOfFameBars) {
      return;
    }

    state.wallOfFameBars.style.display = count ? "flex" : "none";
    if (!count) {
      state.wallOfFameBars.innerHTML = "";
      return;
    }
    state.wallOfFameBars.innerHTML = normalizedEntries.map(function (entry, index) {
      const barHeight = getWallOfFameBarHeight(index, count);
      return '<article class="wall-of-fame-bar" style="--bar-color:' + escapeHtml(entry.color) + '; --bar-height:' + barHeight + 'px;">' +
        '<div class="wall-of-fame-card">' +
          '<div class="wall-of-fame-rank">' + escapeHtml(entry.rank) + '</div>' +
          '<div class="wall-of-fame-name">' + escapeHtml(entry.name) + '</div>' +
          '<div class="wall-of-fame-order">Slot ' + String(index + 1) + '</div>' +
        '</div>' +
      '</article>';
    }).join("");
  }

  function renderWallOfFameEditorList(container, entries, prefix) {
    if (!container) {
      return;
    }

    const normalizedEntries = normalizeWallOfFameEntries(entries);
    if (!normalizedEntries.length) {
      container.innerHTML = '<div class="arcady-owner-item"><div class="arcady-admin-meta">No Wall of Fame entries yet.</div></div>';
      return;
    }

    container.innerHTML = normalizedEntries.map(function (entry, index) {
      return '<div class="arcady-owner-item">' +
        '<div class="arcady-owner-item-top">' +
          '<div>' +
            '<strong>' + escapeHtml(entry.rank) + '</strong>' +
            '<div class="arcady-admin-meta">' + escapeHtml(entry.name) + '</div>' +
            '<div class="arcady-admin-meta arcady-owner-color-line"><span class="arcady-owner-color-chip" style="background:' + escapeHtml(entry.color) + ';"></span>' + escapeHtml(entry.color) + ' • slot ' + String(index + 1) + '</div>' +
          '</div>' +
          '<div class="arcady-owner-mini-actions">' +
            '<button class="arcady-admin-button is-secondary" type="button" data-' + prefix + '-wall-move-left="' + escapeHtml(entry.id) + '"' + (index === 0 ? " disabled" : "") + '>Move Left</button>' +
            '<button class="arcady-admin-button is-secondary" type="button" data-' + prefix + '-wall-move-right="' + escapeHtml(entry.id) + '"' + (index === normalizedEntries.length - 1 ? " disabled" : "") + '>Move Right</button>' +
            '<button class="arcady-admin-button is-danger" type="button" data-' + prefix + '-wall-remove="' + escapeHtml(entry.id) + '">Delete</button>' +
          '</div>' +
        '</div>' +
      '</div>';
    }).join("");
  }

  function syncOwnerWallOfFameState(entries) {
    if (!state.ownerWallList) {
      return;
    }

    renderWallOfFameEditorList(state.ownerWallList, entries, "owner");

    state.ownerWallList.querySelectorAll("[data-owner-wall-remove]").forEach(function (button) {
      button.addEventListener("click", function () {
        removeOwnerWallOfFameEntry(button.getAttribute("data-owner-wall-remove"));
      });
    });
    state.ownerWallList.querySelectorAll("[data-owner-wall-move-left]").forEach(function (button) {
      button.addEventListener("click", function () {
        moveOwnerWallOfFameEntry(button.getAttribute("data-owner-wall-move-left"), -1);
      });
    });
    state.ownerWallList.querySelectorAll("[data-owner-wall-move-right]").forEach(function (button) {
      button.addEventListener("click", function () {
        moveOwnerWallOfFameEntry(button.getAttribute("data-owner-wall-move-right"), 1);
      });
    });
  }

  function syncAdminWallOfFameState(entries) {
    if (!state.adminWallList) {
      return;
    }

    renderWallOfFameEditorList(state.adminWallList, entries, "admin");

    state.adminWallList.querySelectorAll("[data-admin-wall-remove]").forEach(function (button) {
      button.addEventListener("click", function () {
        removeAdminWallOfFameEntry(button.getAttribute("data-admin-wall-remove"));
      });
    });
    state.adminWallList.querySelectorAll("[data-admin-wall-move-left]").forEach(function (button) {
      button.addEventListener("click", function () {
        moveAdminWallOfFameEntry(button.getAttribute("data-admin-wall-move-left"), -1);
      });
    });
    state.adminWallList.querySelectorAll("[data-admin-wall-move-right]").forEach(function (button) {
      button.addEventListener("click", function () {
        moveAdminWallOfFameEntry(button.getAttribute("data-admin-wall-move-right"), 1);
      });
    });
  }

  function normalizeXpAmount(value) {
    const numeric = Math.floor(Number(value) || 0);
    return Math.max(0, Math.min(100000, numeric));
  }

  function getLocalDateKey() {
    const now = new Date();
    const year = String(now.getFullYear());
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return year + "-" + month + "-" + day;
  }

  function normalizeXpTotal(value) {
    const numeric = Math.floor(Number(value) || 0);
    return Math.max(0, Math.min(100000000, numeric));
  }

  function normalizeXpRecord(data) {
    return {
      deviceId: String(data && data.deviceId || state.deviceId || "").trim(),
      nickname: String(data && data.nickname || readPresenceNickname() || "Visitor").trim() || "Visitor",
      xp: normalizeXpTotal(data && data.xp),
      joinedAt: Number(data && (data.joinedAt || data.createdAt || data.updatedAt) || 0) || 0,
      updatedAt: Number(data && data.updatedAt || 0) || 0
    };
  }

  function getXpLevelState(totalXp) {
    const xp = normalizeXpTotal(totalXp);
    const level = Math.floor(xp / xpPerLevel) + 1;
    const currentLevelXp = xp % xpPerLevel;
    const nextLevelXp = xpPerLevel;
    const percent = Math.max(0, Math.min(100, (currentLevelXp / nextLevelXp) * 100));
    return {
      xp: xp,
      level: level,
      currentLevelXp: currentLevelXp,
      nextLevelXp: nextLevelXp,
      percent: percent
    };
  }

  function renderXpPanel() {
    if (!state.xpPanel) {
      return;
    }

    const record = normalizeXpRecord(state.currentXpRecord);
    const levelState = getXpLevelState(record.xp);
    const nextLevel = levelState.level + 1;
    const visits = Math.max(0, Number(state.visitCount || 0) || 0);

    if (state.xpLevelText) {
      state.xpLevelText.textContent = "Level " + levelState.level + " • " + levelState.xp + " XP";
    }
    if (state.xpBarFill) {
      state.xpBarFill.style.width = levelState.percent.toFixed(2) + "%";
    }
    if (state.xpPanelMeta) {
      state.xpPanelMeta.textContent = levelState.currentLevelXp + " / " + levelState.nextLevelXp + " XP to Level " + nextLevel;
    }
    if (state.xpPanelSubmeta) {
      state.xpPanelSubmeta.textContent = "Nickname: " + record.nickname + " • Visits: " + visits + " • 2 XP per click, 60 XP per hour, 80 XP every 50 visits.";
    }
  }

  function collectKnownXpProfiles() {
    return Object.keys(state.xpUserProfiles || {}).map(function (deviceId) {
      const profile = normalizeXpRecord(state.xpUserProfiles[deviceId]);
      if (!profile.deviceId) {
        profile.deviceId = deviceId;
      }
      return profile;
    }).filter(function (profile) {
      return !!profile.deviceId;
    });
  }

  function resolveKnownNickname(deviceId) {
    const visitor = findVisitor(deviceId);
    if (visitor && visitor.deviceId) {
      return readableName(visitor);
    }
    const profile = normalizeXpRecord(state.xpUserProfiles[deviceId]);
    return profile.nickname || readPresenceNickname();
  }

  function findKnownPersonByNickname(nickname) {
    const visitor = findVisitorByNickname(nickname);
    if (visitor && visitor.deviceId) {
      return {
        deviceId: visitor.deviceId,
        nickname: readableName(visitor),
        updatedAt: Number(visitor.updatedAt || 0) || Date.now()
      };
    }

    const needle = String(nickname || "").trim().toLowerCase();
    if (!needle) {
      return null;
    }

    const match = collectKnownXpProfiles().filter(function (profile) {
      return String(profile.nickname || "").trim().toLowerCase() === needle;
    }).sort(function (a, b) {
      return Number(b.updatedAt || 0) - Number(a.updatedAt || 0);
    })[0];

    return match || null;
  }

  function syncXpNickname(force) {
    if (!state.firebaseReady || !state.rtdb) {
      return;
    }

    const nickname = readPresenceNickname();
    if (!force && state.lastSyncedXpNickname === nickname) {
      return;
    }

    state.lastSyncedXpNickname = nickname;
    state.rtdb.ref("arcadyAdmin/xp/users/" + state.deviceId).transaction(function (current) {
      const record = normalizeXpRecord(current);
      return {
        deviceId: state.deviceId,
        nickname: nickname,
        xp: normalizeXpTotal(record.xp),
        joinedAt: record.joinedAt || Date.now(),
        updatedAt: Date.now(),
        lastAwardReason: current && current.lastAwardReason ? current.lastAwardReason : "sync",
        lastAwardAmount: normalizeXpAmount(current && current.lastAwardAmount || 0)
      };
    }).catch(function (error) {
      console.warn("Arcady XP nickname sync failed:", error);
    });
  }

  function describeXpReason(reason, amount) {
    const normalizedReason = String(reason || "").trim().toLowerCase();
    const normalizedAmount = normalizeXpAmount(amount);
    if (normalizedReason === "click") {
      return "Click bonus";
    }
    if (normalizedReason === "hourly") {
      return "Stayed online for 1 hour";
    }
    if (normalizedReason === "visit-milestone") {
      return "Hit a " + visitMilestoneCount + " visit milestone";
    }
    if (normalizedReason === "daily-visit") {
      return "Daily visit bonus";
    }
    if (normalizedReason === "new-page") {
      return "Discovered a new page";
    }
    if (normalizedReason === "game-discovery") {
      return "Opened a new game";
    }
    if (normalizedReason === "nickname-set") {
      return "Set your nickname";
    }
    if (normalizedReason === "click-milestone") {
      return "Reached a " + clickMilestoneCount + "-click streak";
    }
    if (normalizedReason === "owner-grant") {
      return "Owner bonus";
    }
    return normalizedAmount + " XP earned";
  }

  function showXpToast(amount, reason) {
    const normalizedAmount = normalizeXpAmount(amount);
    if (!state.xpToastStack || !normalizedAmount) {
      return;
    }

    const toast = document.createElement("div");
    toast.className = "arcady-xp-toast";
    toast.innerHTML =
      '<div class="arcady-xp-toast-amount">+' + normalizedAmount + ' XP</div>' +
      '<div class="arcady-xp-toast-reason">' + escapeHtml(describeXpReason(reason, normalizedAmount)) + '</div>';

    state.xpToastStack.prepend(toast);
    while (state.xpToastStack.children.length > 4) {
      state.xpToastStack.lastElementChild.remove();
    }

    setTimeout(function () {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(8px) scale(0.98)";
      toast.style.transition = "opacity 0.2s ease, transform 0.2s ease";
      setTimeout(function () {
        toast.remove();
      }, 220);
    }, 1400);
  }

  function awardStoredXpOnce(storageArea, key, amount, reason) {
    const existing = storageArea && key ? storageArea.getItem(key) : "";
    if (!storageArea || !key || existing === "true" || existing === "pending") {
      return;
    }

    storageArea.setItem(key, "pending");
    awardXpToDevice(state.deviceId, amount, reason, readPresenceNickname()).then(function (success) {
      if (success) {
        storageArea.setItem(key, "true");
      } else {
        storageArea.removeItem(key);
      }
    });
  }

  function checkForPassiveXpBonuses() {
    const pageKey = "arcadyXpSeenPage:" + encodeURIComponent(location.pathname || "/");
    const dailyKey = "arcadyXpDailyVisit:" + getLocalDateKey();
    awardStoredXpOnce(localStorage, dailyKey, dailyVisitXpAmount, "daily-visit");
    awardStoredXpOnce(localStorage, pageKey, isGamePage() ? gameDiscoveryXpAmount : newPageXpAmount, "new-page");

    if (isGamePage()) {
      const gameKey = "arcadyXpSeenGame:" + encodeURIComponent(location.pathname || "/");
      awardStoredXpOnce(localStorage, gameKey, gameDiscoveryXpAmount, "game-discovery");
    }
  }

  function awardXpToDevice(deviceId, amount, reason, fallbackNickname) {
    const normalizedAmount = normalizeXpAmount(amount);
    if (!state.firebaseReady || !state.rtdb || !deviceId || !normalizedAmount) {
      return Promise.resolve(false);
    }

    const nickname = String(fallbackNickname || resolveKnownNickname(deviceId) || "Visitor").trim() || "Visitor";
    const ref = state.rtdb.ref("arcadyAdmin/xp/users/" + deviceId);

    return new Promise(function (resolve) {
      ref.transaction(function (current) {
        const record = normalizeXpRecord(current);
        return {
          deviceId: deviceId,
          nickname: nickname || record.nickname || "Visitor",
          xp: normalizeXpTotal(record.xp + normalizedAmount),
          joinedAt: record.joinedAt || Date.now(),
          updatedAt: Date.now(),
          lastAwardReason: String(reason || "xp"),
          lastAwardAmount: normalizedAmount
        };
      }, function (error, committed, snapshot) {
        if (error) {
          console.error("Arcady XP award failed:", error);
          resolve(false);
          return;
        }

        if (committed) {
          const value = snapshot && typeof snapshot.val === "function" ? snapshot.val() || {} : {};
          state.xpUserProfiles[deviceId] = value;
          if (deviceId === state.deviceId) {
            state.currentXpRecord = normalizeXpRecord(value);
            renderXpPanel();
            showXpToast(normalizedAmount, reason);
          }
        }

        resolve(!!committed);
      });
    });
  }

  function recordVisitXpProgress() {
    if (!state.firebaseReady || !state.rtdb) {
      return Promise.resolve(0);
    }

    const ref = state.rtdb.ref("arcadyAdmin/xp/visitCounts/" + state.deviceId);
    return new Promise(function (resolve) {
      ref.transaction(function (current) {
        const count = Math.max(0, Math.floor(Number(current && current.count || 0) || 0)) + 1;
        return {
          deviceId: state.deviceId,
          nickname: readPresenceNickname(),
          count: count,
          updatedAt: Date.now()
        };
      }, function (error, committed, snapshot) {
        if (error) {
          console.error("Arcady visit XP tracking failed:", error);
          resolve(0);
          return;
        }

        if (!committed) {
          resolve(0);
          return;
        }

        const data = snapshot && typeof snapshot.val === "function" ? snapshot.val() || {} : {};
        const count = Math.max(0, Number(data.count || 0) || 0);
        state.visitCount = count;
        renderXpPanel();
        resolve(count);
      });
    });
  }

  function maybeAwardHourlyXp() {
    const elapsedHours = Math.floor((Date.now() - Number(state.sessionStartedAt || Date.now())) / 3600000);
    if (elapsedHours <= state.hourlyAwardsGranted) {
      return;
    }

    const newAwards = elapsedHours - state.hourlyAwardsGranted;
    state.hourlyAwardsGranted = elapsedHours;
    sessionStorage.setItem("arcadyHourlyAwardsGranted", String(state.hourlyAwardsGranted));
    awardXpToDevice(state.deviceId, newAwards * hourlyXpAmount, "hourly", readPresenceNickname());
  }

  function startXpTracking() {
    if (state.xpTrackingStarted) {
      return;
    }
    state.xpTrackingStarted = true;

    if (state.xpHourTimer) {
      clearInterval(state.xpHourTimer);
    }
    state.xpHourTimer = setInterval(maybeAwardHourlyXp, 60000);
    maybeAwardHourlyXp();
    checkForPassiveXpBonuses();
    renderXpPanel();

    window.addEventListener("arcady:nickname-change", function () {
      syncXpNickname(true);
      renderXpPanel();
      enforceOwnerNicknameGate();
    });

    window.addEventListener("storage", function (event) {
      if (event.key === "arcadyVisitorNickname") {
        syncXpNickname(true);
        renderXpPanel();
        enforceOwnerNicknameGate();
      }
    });
  }

  function layoutAnnouncementToasts() {
    if (!state.root) {
      return;
    }

    const grouped = {
      top: [],
      right: [],
      bottom: [],
      left: []
    };

    state.root.querySelectorAll("[data-announcement-toast]").forEach(function (toast) {
      const position = normalizeAnnouncementPosition(toast.getAttribute("data-announcement-position"));
      grouped[position].push(toast);
    });

    Object.keys(grouped).forEach(function (position) {
      let offset = 18;
      grouped[position]
        .sort(function (a, b) {
          return Number(a.getAttribute("data-announcement-created-at") || 0) - Number(b.getAttribute("data-announcement-created-at") || 0);
        })
        .forEach(function (toast) {
          toast.style.top = "";
          toast.style.right = "";
          toast.style.bottom = "";
          toast.style.left = "";
          toast.style.transform = "none";

          if (position === "top") {
            toast.style.top = offset + "px";
            toast.style.left = "50%";
            toast.style.right = "";
            toast.style.transform = "translateX(-50%)";
          } else if (position === "bottom") {
            toast.style.bottom = offset + "px";
            toast.style.right = "18px";
          } else if (position === "left") {
            toast.style.bottom = offset + "px";
            toast.style.left = "18px";
          } else {
            toast.style.bottom = offset + "px";
            toast.style.right = "18px";
          }

          offset += toast.offsetHeight + 12;
        });
    });
  }

  function renderPollCard(pollData) {
    const pollId = pollData && pollData.id ? String(pollData.id) : "";
    if (!pollId) {
      return;
    }

    const seenKey = "arcadyAdminSeenPoll:" + pollId;
    if (sessionStorage.getItem(seenKey) === "true" && state.visiblePollId !== pollId) {
      return;
    }

    const isFirstRender = state.visiblePollId !== pollId;
    if (isFirstRender) {
      sessionStorage.setItem(seenKey, "true");
      state.visiblePollId = pollId;
      clearTimeout(state.pollHideTimer);
      state.pollHideTimer = setTimeout(function () {
        state.visiblePollId = null;
        clearPollCard();
      }, state.settings.pollDurationMs);
    }

    clearPollCard(true);

    const poll = document.createElement("div");
    poll.className = "arcady-admin-poll";
    poll.setAttribute("data-poll-card", "true");

    const userVote = state.currentVotes[state.deviceId];
    const selectedIndex = userVote ? Number(userVote.optionIndex) : -1;
    const totalVotes = Object.keys(state.currentVotes).length;

    const optionsHtml = pollData.options.map(function (option, index) {
      const votesForOption = Object.values(state.currentVotes).filter(function (vote) {
        return Number(vote.optionIndex) === index;
      }).length;
      const percentage = totalVotes ? Math.round((votesForOption / totalVotes) * 100) : 0;
      const selectedClass = selectedIndex === index ? " is-selected" : "";

      return `
        <button class="arcady-admin-option-button${selectedClass}" type="button" data-vote-index="${index}">
          ${escapeHtml(option)}
          <div class="arcady-admin-meta">${votesForOption} vote${votesForOption === 1 ? "" : "s"}${totalVotes ? " • " + percentage + "%" : ""}</div>
          <span class="arcady-admin-option-fill" style="width:${percentage}%;"></span>
        </button>
      `;
    }).join("");

    poll.innerHTML = `
      <div class="arcady-admin-toast-head">
        <div class="arcady-admin-title">Live Poll</div>
        <button class="arcady-admin-toast-close" type="button" aria-label="Close poll">x</button>
      </div>
      <div class="arcady-admin-meta">${escapeHtml(pollData.question || "Poll")}</div>
      <div class="arcady-admin-meta">Sent by ${escapeHtml(pollData.authorName || "Staff")}</div>
      <div class="arcady-admin-poll-options">${optionsHtml}</div>
    `;

    const closeButton = poll.querySelector(".arcady-admin-toast-close");
    if (closeButton) {
      closeButton.addEventListener("click", function () {
        clearTimeout(state.pollHideTimer);
        state.pollHideTimer = null;
        state.visiblePollId = null;
        clearPollCard();
      });
    }

    poll.querySelectorAll("[data-vote-index]").forEach(function (button) {
      button.addEventListener("click", function () {
        submitVote(Number(button.getAttribute("data-vote-index")));
      });
    });

    state.stack.appendChild(poll);
  }

  function clearPollCard(preserveVoteSubscription) {
    const existing = state.stack.querySelector("[data-poll-card]");
    if (existing) {
      existing.remove();
    }

    if (!preserveVoteSubscription && typeof state.pollVoteUnsubscribe === "function") {
      state.pollVoteUnsubscribe();
      state.pollVoteUnsubscribe = null;
    }
  }

  function renderHomepagePoll(pollData) {
    const container = document.getElementById("home-poll-body");
    if (!container) {
      return;
    }
    if (!pollData || !pollData.active || !Array.isArray(pollData.options) || !pollData.options.length) {
      clearHomepagePoll();
      return;
    }

    const totalVotes = Object.keys(state.currentVotes || {}).length;
    const userVote = state.currentVotes && state.currentVotes[state.deviceId];
    const selectedIndex = userVote ? Number(userVote.optionIndex) : -1;

    const optionsHtml = pollData.options.map(function (option, index) {
      const votesForOption = Object.values(state.currentVotes || {}).filter(function (vote) {
        return Number(vote.optionIndex) === index;
      }).length;
      const percentage = totalVotes ? Math.round((votesForOption / totalVotes) * 100) : 0;
      const selectedClass = selectedIndex === index ? " is-selected" : "";

      return "\n        <button type=\"button\" class=\"home-live-poll-option" + selectedClass + "\" data-home-poll-option=\"" + index + "\">\n          <span class=\"home-live-poll-option-label\">" + escapeHtml(option) + "</span>\n          <span class=\"home-live-poll-option-meta\">" + votesForOption + " vote" + (votesForOption === 1 ? "" : "s") + (totalVotes ? " • " + percentage + "%" : "") + "</span>\n          <span class=\"home-live-poll-option-fill\" style=\"width:" + percentage + "%\"></span>\n        </button>\n      ";
    }).join("");

    container.innerHTML = "<div class=\"home-live-poll-question\">" + escapeHtml(pollData.question || "Live poll") + "</div>" +
      "<div class=\"home-live-poll-meta\">Sent by " + escapeHtml(pollData.authorName || "Owner") + "</div>" +
      "<div class=\"home-live-poll-options\">" + optionsHtml + "</div>";

    container.querySelectorAll("[data-home-poll-option]").forEach(function (button) {
      button.addEventListener("click", function () {
        submitVote(Number(button.getAttribute("data-home-poll-option")));
      });
    });
  }

  function clearHomepagePoll() {
    const container = document.getElementById("home-poll-body");
    if (!container) {
      return;
    }
    container.innerHTML = '<div class="home-live-poll-empty">No active poll right now.</div>';
  }

  async function sendAnnouncement() {
    if (!hasAdminAccess() || !canSendGlobalAnnouncements() || !state.firebaseReady) {
      setStatus("Unlock admin and connect Firebase first.");
      return;
    }

    const message = state.announcementInput.value.trim();
    if (!message) {
      setStatus("Write an announcement before sending.");
      return;
    }

    let image = "";
    let position = "bottom";
    if (hasAdminCapability("announcement-tools")) {
      await saveAdminAnnouncementDuration(true);
      image = normalizeAssetPath(state.adminAnnouncementImageInput && state.adminAnnouncementImageInput.value);
      position = normalizeAnnouncementPosition(state.adminAnnouncementPositionSelect && state.adminAnnouncementPositionSelect.value);
    }

    const id = "announcement-" + Date.now();
    await state.rtdb.ref("arcadyAdmin/announcements/current").set({
      id: id,
      message: message,
      image: image,
      position: position,
      authorName: readNickname() || "Staff",
      page: location.pathname,
      createdAt: Date.now()
    });

    state.announcementInput.value = "";
    if (state.adminAnnouncementImageInput) {
      state.adminAnnouncementImageInput.value = "";
    }
    setStatus("Announcement sent.");
  }

  async function closeAdminAnnouncements() {
    if (!hasAdminCapability("announcement-tools") || !state.firebaseReady) {
      setStatus("Unlock the right admin panel and connect Firebase first.");
      return;
    }

    await state.rtdb.ref("arcadyAdmin/announcements/current").remove();
    await state.rtdb.ref("arcadyAdmin/commands/closeAnnouncementAt").set(Date.now());
    setStatus("Announcements closed.");
  }

  async function saveAdminAnnouncementDuration(silent) {
    if (!hasAdminCapability("announcement-tools") || !state.firebaseReady) {
      if (!silent) {
        setStatus("Unlock the right admin panel and connect Firebase first.");
      }
      return false;
    }

    const durationMs = clampDurationMs(Number(state.adminAnnouncementDurationInput && state.adminAnnouncementDurationInput.value || 0) * 1000, state.settings.announcementDurationMs);
    await state.rtdb.ref("arcadyAdmin/settings").update({
      announcementDurationMs: durationMs,
      updatedAt: Date.now()
    });
    if (!silent) {
      setStatus("Announcement duration saved.");
    }
    return true;
  }
  async function pushBackgroundColor(value) {
    if (!hasAdminAccess() || !hasAdminCapability("base-admin-ui") || !state.firebaseReady) {
      return;
    }

    const normalized = normalizeColor(value);
    if (!normalized) {
      return;
    }

    await state.rtdb.ref("arcadyAdmin/state").update({
      backgroundColor: normalized,
      backgroundImage: "",
      updatedAt: Date.now()
    });

    setStatus("Background color updated.");
  }

  async function loadBackgroundLibrary() {
    state.backgroundOptions = buildBackgroundOptionList(fallbackBackgrounds);
    populateBackgroundSelect();

    try {
      const response = await fetch(remoteBackgroundApiUrl, {
        cache: "no-store"
      });
      if (!response.ok) {
        throw new Error("Failed to load background library");
      }

      const data = await response.json();
      const backgrounds = buildBackgroundOptionList((Array.isArray(data) ? data : []).map(function (item) {
        if (!item || item.type !== "file" || !/\.(?:gif|png|jpe?g|webp|avif|bmp)$/i.test(String(item.name || ""))) {
          return null;
        }

        return {
          file: remoteBackgroundCdnBase + encodeURIComponent(String(item.name || "")),
          label: formatBackgroundLabel(item.name)
        };
      }));

      if (backgrounds.length) {
        state.backgroundOptions = backgrounds;
      }
    } catch (error) {
      console.warn("Arcady background library fallback in use:", error);
    }

    populateBackgroundSelect();
  }

  async function loadSoundLibrary() {
    state.soundOptions = buildSoundOptionList(fallbackSoundFiles);
    renderSoundboards();

    try {
      const response = await fetch(normalizeAssetPath("./features/Mp3s/index.json"), {
        cache: "no-store"
      });
      if (!response.ok) {
        throw new Error("Failed to load sound library");
      }

      const data = await response.json();
      const sounds = buildSoundOptionList(data && data.sounds);
      if (sounds.length) {
        state.soundOptions = sounds;
      }
    } catch (error) {
      console.warn("Arcady sound library fallback in use:", error);
    }

    renderSoundboards();
  }

  async function loadGenziySoundLibrary() {
    state.genziySoundOptions = [];
    renderSoundboards();

    try {
      const response = await fetch(remoteGenziySoundSourceUrl, {
        cache: "no-store"
      });
      if (!response.ok) {
        throw new Error("Failed to load Genziy sound source");
      }

      const source = await response.text();
      const sounds = buildGenziySoundOptionList(parseGenziySoundSource(source));
      if (sounds.length) {
        state.genziySoundOptions = sounds;
        renderSoundboards();
        return;
      }

      throw new Error("No Genziy sounds found in source");
    } catch (error) {
      console.warn("Arcady Genziy sound source fallback in use:", error);
    }

    try {
      const response = await fetch(remoteGenziySoundApiUrl, {
        cache: "no-store"
      });
      if (!response.ok) {
        throw new Error("Failed to load Genziy sound fallback library");
      }

      const data = await response.json();
      const sounds = buildGenziySoundOptionList((Array.isArray(data) ? data : []).map(function (item) {
        if (!item || item.type !== "file" || !/\.mp3$/i.test(String(item.name || ""))) {
          return null;
        }

        return {
          name: formatSoundLabel(item.name),
          mp3: "/" + String(item.path || "").replace(/^\/+/, "")
        };
      }));

      if (sounds.length) {
        state.genziySoundOptions = sounds;
      }
    } catch (error) {
      console.warn("Arcady Genziy sound library failed to load:", error);
    }

    renderSoundboards();
  }

  async function loadVideoLibrary() {
    state.videoOptions = buildVideoOptionList(fallbackVideoFiles);
    state.videoOptions = appendOwnerExclusiveLiveTvOptions(state.videoOptions);
    renderVideoBoards();

    try {
      const response = await fetch(remoteLiveTvApiUrl, {
        cache: "no-store"
      });
      if (!response.ok) {
        throw new Error("Failed to load video library");
      }

      const data = await response.json();
      const media = buildVideoOptionList((Array.isArray(data) ? data : []).map(function (item) {
        if (!item || item.type !== "file" || !/\.(?:mp4|gif|png|jpe?g|webp|avif|bmp)$/i.test(String(item.name || ""))) {
          return null;
        }

        return {
          file: remoteLiveTvCdnBase + encodeURIComponent(String(item.name || "")),
          label: formatVideoLabel(item.name)
        };
      }));
      if (media.length) {
        state.videoOptions = media;
      }
    } catch (error) {
      console.warn("Arcady Live TV library fallback in use:", error);
    }

    state.videoOptions = appendOwnerExclusiveLiveTvOptions(state.videoOptions);
    renderVideoBoards();
  }

  async function loadJumpscareLibrary() {
    state.jumpscareOptions = appendOwnerExclusiveJumpscareOptions(buildJumpscareOptionList([]));
    renderJumpscareBoard();

    try {
      const response = await fetch(remoteJumpscareApiUrl, {
        cache: "no-store"
      });
      if (!response.ok) {
        throw new Error("Failed to load jumpscare library");
      }

      const data = await response.json();
      const media = buildJumpscareOptionList((Array.isArray(data) ? data : []).map(function (item) {
        if (!item || item.type !== "file" || !/\.(?:mp4|webm|mov|m4v)$/i.test(String(item.name || ""))) {
          return null;
        }

        return {
          file: remoteJumpscareCdnBase + encodeURIComponent(String(item.name || "")),
          label: formatJumpscareLabel(item.name)
        };
      }));
      if (media.length) {
        state.jumpscareOptions = media;
      }
    } catch (error) {
      console.warn("Arcady jumpscare library failed to load:", error);
    }

    state.jumpscareOptions = appendOwnerExclusiveJumpscareOptions(state.jumpscareOptions);
    renderJumpscareBoard();
  }

  async function loadCursorLibrary() {
    state.cursorThemes = buildCursorThemeList(fallbackCursorThemes);
    applySelectedCursorTheme();
    syncCursorControls();

    try {
      const response = await fetch(normalizeAssetPath("./features/cursors/index.json"), {
        cache: "no-store"
      });
      if (!response.ok) {
        throw new Error("Failed to load cursor library");
      }

      const data = await response.json();
      const themes = buildCursorThemeList(data && data.themes);
      if (themes.length) {
        state.cursorThemes = themes;
      }
    } catch (error) {
      console.warn("Arcady cursor library fallback in use:", error);
    }

    applySelectedCursorTheme();
    syncCursorControls();
  }

  async function loadMadnessAssetLibrary() {
    state.madnessAssets = buildMadnessAssetList(fallbackMadnessAssets);
    syncOwnerFields();
    syncMadnessControls();

    try {
      const response = await fetch(normalizeAssetPath("./features/gifs/index.json"), {
        cache: "no-store"
      });
      if (!response.ok) {
        throw new Error("Failed to load madness asset library");
      }

      const data = await response.json();
      const assets = buildMadnessAssetList(data && data.images);
      if (assets.length) {
        state.madnessAssets = assets;
      }
    } catch (error) {
      console.warn("Arcady madness asset fallback in use:", error);
    }

    syncOwnerFields();
    syncMadnessControls();
  }

  function populateBackgroundSelect() {
    if (!state.backgroundImageSelect) {
      return;
    }

    if (!state.backgroundOptions.length) {
      state.backgroundImageSelect.innerHTML = '<option value="">No backgrounds found</option>';
      return;
    }

    state.backgroundImageSelect.innerHTML =
      '<option value="">Select a background image</option>' +
      state.backgroundOptions.map(function (background, index) {
        return '<option value="' + index + '">' + escapeHtml(background.label || background.file) + '</option>';
      }).join("");

    syncOwnerFields();
  }

  function buildSoundOptionList(list) {
    const seen = {};
    return (Array.isArray(list) ? list : []).map(function (entry) {
      const file = normalizeSoundFileReference(typeof entry === "string" ? entry : entry && entry.file);
      const label = String(entry && typeof entry === "object" ? entry.label || "" : "").trim();
      if (!file) {
        return null;
      }

      const key = file.toLowerCase();
      if (seen[key]) {
        return null;
      }
      seen[key] = true;

      return {
        file: file,
        label: label || formatSoundLabel(file)
      };
    }).filter(Boolean);
  }

  function buildGenziySoundOptionList(list) {
    return buildSoundOptionList((Array.isArray(list) ? list : []).map(function (entry) {
      const file = buildGenziySoundFileReference(entry && entry.mp3);
      if (!file) {
        return null;
      }

      return {
        file: file,
        label: String(entry && entry.name || "").trim() || formatSoundLabel(file)
      };
    }).filter(Boolean));
  }

  function buildBackgroundOptionList(list) {
    const seen = {};
    return (Array.isArray(list) ? list : []).map(function (entry) {
      const file = normalizeBackgroundFileReference(typeof entry === "string" ? entry : entry && entry.file);
      const label = String(entry && typeof entry === "object" ? entry.label || "" : "").trim();
      if (!file) {
        return null;
      }

      const key = file.toLowerCase();
      if (seen[key]) {
        return null;
      }
      seen[key] = true;

      return {
        file: file,
        label: normalizeDisplayLabel(label, formatBackgroundLabel(file))
      };
    }).filter(Boolean);
  }

  function buildMadnessAssetList(list) {
    const seen = {};
    return (Array.isArray(list) ? list : []).map(function (entry) {
      const file = normalizeMadnessFileReference(typeof entry === "string" ? entry : entry && entry.file);
      const label = String(entry && typeof entry === "object" ? entry.label || "" : "").trim();
      if (!file) {
        return null;
      }

      const key = file.toLowerCase();
      if (seen[key]) {
        return null;
      }
      seen[key] = true;

      return {
        file: file,
        label: label || formatMadnessLabel(file)
      };
    }).filter(Boolean);
  }

  function buildVideoOptionList(list) {
    const seen = {};
    return (Array.isArray(list) ? list : []).map(function (entry) {
      const file = normalizeLiveTvFileReference(typeof entry === "string" ? entry : entry && entry.file);
      const label = String(entry && typeof entry === "object" ? entry.label || "" : "").trim();
      if (!file) {
        return null;
      }

      const key = file.toLowerCase();
      if (seen[key]) {
        return null;
      }
      seen[key] = true;

      return {
        file: file,
        label: label || formatVideoLabel(file)
      };
    }).filter(Boolean);
  }

  function appendOwnerExclusiveLiveTvOptions(list) {
    const base = Array.isArray(list) ? list.slice() : [];
    const seen = {};
    base.forEach(function (entry) {
      const file = normalizeLiveTvFileReference(entry && entry.file);
      if (file) {
        seen[String(file).toLowerCase()] = true;
      }
    });

    const ownerExclusive = [
      {
        ownerOnly: true
      }
    ];

    ownerExclusive.forEach(function (entry) {
      const file = normalizeLiveTvFileReference(entry && entry.file);
      if (!file) {
        return;
      }
      const key = String(file).toLowerCase();
      if (seen[key]) {
        return;
      }
      seen[key] = true;
      base.push({
        file: file,
        label: String(entry && entry.label || "").trim() || formatVideoLabel(file),
        ownerOnly: true
      });
    });

    return base;
  }

  function appendOwnerExclusiveJumpscareOptions(list) {
    const base = Array.isArray(list) ? list.slice() : [];
    const seen = {};
    base.forEach(function (entry) {
      const file = normalizeJumpscareFileReference(entry && entry.file);
      if (file) {
        seen[String(file).toLowerCase()] = true;
      }
    });

    ownerExclusiveJumpscareOptions.forEach(function (entry) {
      const file = normalizeJumpscareFileReference(entry);
      if (!file) {
        return;
      }
      const key = String(file).toLowerCase();
      if (seen[key]) {
        return;
      }
      seen[key] = true;
      base.push({
        file: file,
        label: formatJumpscareLabel(file),
        ownerOnly: true
      });
    });

    return base;
  }

  function buildJumpscareOptionList(list) {
    const seen = {};
    return (Array.isArray(list) ? list : []).map(function (entry) {
      const file = normalizeJumpscareFileReference(typeof entry === "string" ? entry : entry && entry.file);
      const label = String(entry && typeof entry === "object" ? entry.label || "" : "").trim();
      if (!file) {
        return null;
      }

      const key = file.toLowerCase();
      if (seen[key]) {
        return null;
      }
      seen[key] = true;

      const option = {
        file: file,
        label: label || formatJumpscareLabel(file)
      };
      if (entry && typeof entry === "object" && entry.ownerOnly) {
        option.ownerOnly = true;
      }
      return option;
    }).filter(Boolean);
  }

  function buildCursorThemeList(list) {
    const seen = {};
    return (Array.isArray(list) ? list : []).map(function (entry) {
      const cursor = normalizeCursorFileReference(entry && entry.cursor, "cursor");
      const pointer = normalizeCursorFileReference(entry && entry.pointer, "pointer");
      const label = String(entry && entry.label || "").trim();
      const id = String(entry && entry.id || "").trim().toLowerCase();
      if (!cursor || !pointer) {
        return null;
      }

      const key = id || (cursor + "|" + pointer).toLowerCase();
      if (seen[key]) {
        return null;
      }
      seen[key] = true;

      return {
        id: key.replace(/[^a-z0-9-]+/g, "-"),
        label: label || formatCursorLabel(cursor),
        cursor: cursor,
        pointer: pointer
      };
    }).filter(Boolean);
  }

  function renderSoundboards() {
    renderSoundboard(state.adminSoundboard, state.soundOptions, false, "default");
    renderSoundboard(state.ownerSoundboard, state.soundOptions, true, "default");

    const activeLabel = state.activeSoundLabel ? "Now playing: " + state.activeSoundLabel : "";
    if (state.adminSoundStatus) {
      state.adminSoundStatus.textContent = state.soundOptions.length
        ? (activeLabel || "Pick a clip to play live across every open Arcady page.")
        : "No sounds found in features/Mp3s/.";
    }
    if (state.ownerSoundStatus) {
      state.ownerSoundStatus.textContent = state.soundOptions.length
        ? (activeLabel || "Pick a clip to play live. Stop is owner-only.")
        : "No sounds found in features/Mp3s/.";
    }
    if (state.ownerStopSoundButton) {
      state.ownerStopSoundButton.disabled = !state.activeSoundFile;
    }
  }

  function renderVideoBoards() {
    renderVideoBoard(state.adminVideoBoard, false);
    renderVideoBoard(state.ownerVideoBoard, true);
    syncLiveTvUrlInputs();

    const activeLabel = state.activeVideoLabel ? 'Now live: "' + state.activeVideoLabel + '".' : "";
    const defaultVideoCopy = "Choose an MP4, GIF, or image to broadcast to the homepage Live TV, or paste a YouTube or direct media link below.";
    if (state.adminVideoStatus) {
      state.adminVideoStatus.textContent = state.videoOptions.length
        ? (activeLabel || defaultVideoCopy)
        : "No Live TV media found in features/Mp4s/ or features/gifs/, but YouTube and direct media links still work below.";
    }
    if (state.ownerVideoStatus) {
      state.ownerVideoStatus.textContent = state.videoOptions.length
        ? (activeLabel || defaultVideoCopy)
        : "No Live TV media found in features/Mp4s/ or features/gifs/, but YouTube and direct media links still work below.";
    }
    if (state.adminStopVideoButton) {
      state.adminStopVideoButton.disabled = !state.activeVideoFile;
    }
    if (state.ownerStopVideoButton) {
      state.ownerStopVideoButton.disabled = !state.activeVideoFile;
    }
  }

  function syncLiveTvUrlInputs() {
    const activeUrl = state.activeVideoIsEmbed ? String(state.activeVideoFile || "") : "";

    if (state.adminVideoUrlInput && document.activeElement !== state.adminVideoUrlInput && state.adminVideoUrlInput.value !== activeUrl) {
      state.adminVideoUrlInput.value = activeUrl;
    }

    if (state.ownerVideoUrlInput && document.activeElement !== state.ownerVideoUrlInput && state.ownerVideoUrlInput.value !== activeUrl) {
      state.ownerVideoUrlInput.value = activeUrl;
    }
  }

  function renderJumpscareBoard() {
    if (!state.ownerJumpscareBoard) {
      return;
    }

    if (!state.jumpscareOptions.length) {
      state.ownerJumpscareBoard.innerHTML = "";
      if (state.ownerJumpscareStatus) {
        state.ownerJumpscareStatus.textContent = "No jumpscare clips found in features/jumpscares.";
      }
      if (state.ownerStopJumpscareButton) {
        state.ownerStopJumpscareButton.disabled = !state.activeJumpscareFile;
      }
      return;
    }

    const activeFile = normalizeJumpscareFileReference(state.activeJumpscareFile);
    state.ownerJumpscareBoard.innerHTML = state.jumpscareOptions.map(function (clip, index) {
      const fileName = formatAssetFileName(clip.file, "jumpscare.mp4");
      const activeClass = activeFile && activeFile === normalizeJumpscareFileReference(clip.file) ? " is-active" : "";
      return '<button class="arcady-admin-button arcady-admin-sound-button' + activeClass + '" type="button" data-owner-jumpscare-index="' + index + '">' +
        '<span class="arcady-admin-sound-label">' + escapeHtml(clip.label || formatJumpscareLabel(clip.file)) + '</span>' +
        '<span class="arcady-admin-sound-meta">' + escapeHtml(fileName) + '</span>' +
      '</button>';
    }).join("");

    state.ownerJumpscareBoard.querySelectorAll("[data-owner-jumpscare-index]").forEach(function (button) {
      button.addEventListener("click", function () {
        triggerJumpscare(button.getAttribute("data-owner-jumpscare-index"));
      });
    });

    if (state.ownerJumpscareStatus) {
      state.ownerJumpscareStatus.textContent = state.activeJumpscareLabel
        ? 'Now active: "' + state.activeJumpscareLabel + '".'
        : "Launch a fullscreen jumpscare with chroma-key transparency.";
    }
    if (state.ownerStopJumpscareButton) {
      state.ownerStopJumpscareButton.disabled = !state.activeJumpscareFile;
    }
  }

  function renderVideoBoard(container, ownerMode) {
    if (!container) {
      return;
    }

    if (!state.videoOptions.length) {
      container.innerHTML = "";
      return;
    }

    const activeFile = normalizeLiveTvFileReference(state.activeVideoFile);
    container.innerHTML = state.videoOptions.reduce(function (html, video, index) {
      if (!ownerMode && video && video.ownerOnly) {
        return html;
      }

      const fileName = formatAssetFileName(video.file, "live-tv-media");
      const activeClass = activeFile && activeFile === normalizeLiveTvFileReference(video.file) ? " is-active" : "";
      html.push(
        '<button class="arcady-admin-button arcady-admin-sound-button' + activeClass + '" type="button" data-video-index="' + index + '">' +
          '<span class="arcady-admin-sound-label">' + escapeHtml(video.label || formatVideoLabel(video.file)) + '</span>' +
          '<span class="arcady-admin-sound-meta">' + escapeHtml(fileName) + '</span>' +
        "</button>"
      );
      return html;
    }, []).join("");

    container.querySelectorAll("[data-video-index]").forEach(function (button) {
      button.addEventListener("click", function () {
        triggerLiveTvBroadcast(button.getAttribute("data-video-index"), ownerMode);
      });
    });
  }

  function renderSoundboard(container, options, ownerMode, source) {
    if (!container) {
      return;
    }

    if (!options.length) {
      container.innerHTML = "";
      return;
    }

    const activeFile = normalizeSoundFileReference(state.activeSoundFile);
    container.innerHTML = options.map(function (sound, index) {
      const fileName = formatAssetFileName(sound.file, "sound.mp3");
      const activeClass = activeFile && activeFile === normalizeSoundFileReference(sound.file) ? " is-active" : "";
      return '<button class="arcady-admin-button arcady-admin-sound-button' + activeClass + '" type="button" data-sound-index="' + index + '">' +
        '<span class="arcady-admin-sound-label">' + escapeHtml(sound.label || formatSoundLabel(sound.file)) + '</span>' +
        '<span class="arcady-admin-sound-meta">' + escapeHtml(fileName) + '</span>' +
      '</button>';
    }).join("");

    container.querySelectorAll("[data-sound-index]").forEach(function (button) {
      button.addEventListener("click", function () {
        triggerLiveSound(button.getAttribute("data-sound-index"), ownerMode, source);
      });
    });
  }

  async function triggerLiveSound(index, ownerMode, source) {
    const allowed = ownerMode
      ? hasOwnerAccess()
      : (String(source || "").trim().toLowerCase() === "genziy"
        ? hasAdminCapability("genziy-soundboard")
        : hasAdminCapability("live-soundboard"));
    if (!allowed || !state.firebaseReady) {
      if (ownerMode) {
        setOwnerStatus("Unlock owner and connect Firebase first.");
      } else {
        setStatus("Unlock admin and connect Firebase first.");
      }
      return;
    }

    const options = getSoundOptionsBySource(source);
    const sound = options[Number(index)];
    if (!sound || !sound.file) {
      if (ownerMode) {
        setOwnerStatus("Pick a sound first.");
      } else {
        setStatus("Pick a sound first.");
      }
      return;
    }

    const now = Date.now();
    await state.rtdb.ref("arcadyAdmin/soundboard/current").set({
      id: "sound-" + now,
      action: "play",
      file: normalizeSoundFileReference(sound.file),
      label: sound.label || formatSoundLabel(sound.file),
      library: String(source || "default"),
      authorName: readNickname() || (ownerMode ? "Owner" : "Staff"),
      page: location.pathname,
      createdAt: now
    });

    if (ownerMode) {
      setOwnerStatus('Playing "' + (sound.label || formatSoundLabel(sound.file)) + '".');
    } else {
      setStatus('Playing "' + (sound.label || formatSoundLabel(sound.file)) + '".');
    }
  }

  async function stopLiveSound(ownerMode) {
    const allowed = ownerMode
      ? hasOwnerAccess()
      : (hasAdminCapability("live-soundboard") || hasAdminCapability("genziy-soundboard"));
    if (!allowed || !state.firebaseReady) {
      if (ownerMode) {
        setOwnerStatus("Unlock owner and connect Firebase first.");
      } else {
        setStatus("Unlock the right admin panel and connect Firebase first.");
      }
      return;
    }

    const now = Date.now();
    await state.rtdb.ref("arcadyAdmin/soundboard/current").set({
      id: "sound-stop-" + now,
      action: "stop",
      authorName: readNickname() || (ownerMode ? "Owner" : "Staff"),
      page: location.pathname,
      createdAt: now
    });

    if (ownerMode) {
      setOwnerStatus("Sound stopped.");
    } else {
      setStatus("Sound stopped.");
    }
  }

  async function stopOwnerSound() {
    return stopLiveSound(true);
  }

  async function stopOwnerGenziySound() {
    return stopLiveSound(true);
  }

  async function stopAdminGenziySound() {
    return stopLiveSound(false);
  }

  async function triggerLiveTvBroadcast(index, ownerMode) {
    const allowed = ownerMode ? hasOwnerAccess() : (hasAdminAccess() && hasAdminCapability("base-admin-ui"));
    if (!allowed || !state.firebaseReady) {
      if (ownerMode) {
        setOwnerStatus("Unlock owner and connect Firebase first.");
      } else {
        setStatus("Unlock admin and connect Firebase first.");
      }
      return;
    }

    const video = state.videoOptions[Number(index)];
    if (!video || !video.file) {
      if (ownerMode) {
        setOwnerStatus("Pick something to broadcast first.");
      } else {
        setStatus("Pick something to broadcast first.");
      }
      return;
    }

    const now = Date.now();
    await state.rtdb.ref("arcadyAdmin/liveTv/current").set({
      id: "live-tv-" + now,
      action: "broadcast",
      active: true,
      file: normalizeLiveTvFileReference(video.file),
      label: video.label || formatVideoLabel(video.file),
      authorName: readNickname() || (ownerMode ? "Owner" : "Staff"),
      page: location.pathname,
      createdAt: now
    });

    if (ownerMode) {
      setOwnerStatus('Broadcasting "' + (video.label || formatVideoLabel(video.file)) + '" on Live TV.');
    } else {
      setStatus('Broadcasting "' + (video.label || formatVideoLabel(video.file)) + '" on Live TV.');
    }
  }

  async function triggerLiveTvUrlBroadcast(value, ownerMode) {
    const allowed = ownerMode ? hasOwnerAccess() : (hasAdminAccess() && hasAdminCapability("base-admin-ui"));
    if (!allowed || !state.firebaseReady) {
      if (ownerMode) {
        setOwnerStatus("Unlock owner and connect Firebase first.");
      } else {
        setStatus("Unlock admin and connect Firebase first.");
      }
      return;
    }

    const file = normalizeLiveTvFileReference(value);
    const embedUrl = normalizeLiveTvEmbedUrl(value);
    const isMediaReference = isLiveTvImageFile(file) || /\.(?:mp4)(?:[?#].*)?$/i.test(String(file || ""));
    if (!file || (!embedUrl && !isMediaReference)) {
      if (ownerMode) {
        setOwnerStatus("Paste a valid YouTube, MP4, GIF, or image link first.");
      } else {
        setStatus("Paste a valid YouTube, MP4, GIF, or image link first.");
      }
      return;
    }

    const sourceType = embedUrl ? "youtube" : isLiveTvImageFile(file) ? "image" : "media";
    const now = Date.now();
    await state.rtdb.ref("arcadyAdmin/liveTv/current").set({
      id: "live-tv-" + now,
      action: "broadcast",
      active: true,
      file: file,
      label: formatLiveTvUrlLabel(file),
      sourceType: sourceType,
      embedUrl: embedUrl,
      authorName: readNickname() || (ownerMode ? "Owner" : "Staff"),
      page: location.pathname,
      createdAt: now
    });

    if (ownerMode) {
      setOwnerStatus("Broadcasting that media link on Live TV.");
    } else {
      setStatus("Broadcasting that media link on Live TV.");
    }
  }

  async function startLiveTvBroadcastMediaStream(sourceType, ownerMode) {
    const allowed = ownerMode ? hasOwnerAccess() : (hasAdminAccess() && hasAdminCapability("base-admin-ui"));
    if (!allowed || !state.firebaseReady) {
      if (ownerMode) {
        setOwnerStatus("Unlock owner and connect Firebase first.");
      } else {
        setStatus("Unlock admin and connect Firebase first.");
      }
      return;
    }

    if (sourceType !== "camera" && sourceType !== "screen") {
      if (ownerMode) {
        setOwnerStatus("Invalid live broadcast source.");
      } else {
        setStatus("Invalid live broadcast source.");
      }
      return;
    }

    const sourceLabel = sourceType === "camera" ? "Camera Broadcast" : "Screen Broadcast";
    const now = Date.now();
    await state.rtdb.ref("arcadyAdmin/liveTv/current").set({
      id: "live-tv-" + now,
      action: "broadcast",
      active: true,
      file: sourceType,
      label: sourceLabel,
      sourceType: sourceType,
      authorName: readNickname() || (ownerMode ? "Owner" : "Staff"),
      page: location.pathname,
      createdAt: now
    });

    if (ownerMode) {
      setOwnerStatus(sourceLabel + " started.");
    } else {
      setStatus(sourceLabel + " started.");
    }
  }

  async function requestLiveTvMediaStream(sourceType) {
    if (!navigator.mediaDevices || typeof navigator.mediaDevices.getUserMedia !== "function") {
      throw new Error("Camera access is not available in this browser.");
    }

    if (sourceType === "camera") {
      return navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    }

    if (sourceType === "screen") {
      if (typeof navigator.mediaDevices.getDisplayMedia !== "function") {
        throw new Error("Screen sharing is not available in this browser.");
      }
      return navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
    }

    throw new Error("Unsupported stream source.");
  }

  async function stopLiveTvBroadcast(ownerMode) {
    const allowed = ownerMode ? hasOwnerAccess() : (hasAdminAccess() && hasAdminCapability("base-admin-ui"));
    if (!allowed || !state.firebaseReady) {
      if (ownerMode) {
        setOwnerStatus("Unlock owner and connect Firebase first.");
      } else {
        setStatus("Unlock admin and connect Firebase first.");
      }
      return;
    }

    const now = Date.now();
    await state.rtdb.ref("arcadyAdmin/liveTv/current").set({
      id: "live-tv-stop-" + now,
      action: "stop",
      active: false,
      authorName: readNickname() || (ownerMode ? "Owner" : "Staff"),
      page: location.pathname,
      createdAt: now
    });

    if (ownerMode) {
      setOwnerStatus("Live TV broadcast stopped.");
    } else {
      setStatus("Live TV broadcast stopped.");
    }
  }

  async function triggerJumpscare(index) {
    if (!hasOwnerAccess() || !state.firebaseReady) {
      setOwnerStatus("Unlock owner and connect Firebase first.");
      return;
    }

    const clip = state.jumpscareOptions[Number(index)];
    if (!clip || !clip.file) {
      setOwnerStatus("Pick a jumpscare first.");
      return;
    }

    const now = Date.now();
    await state.rtdb.ref("arcadyAdmin/jumpscares/current").set({
      id: "jumpscare-" + now,
      action: "play",
      active: true,
      file: normalizeJumpscareFileReference(clip.file),
      label: clip.label || formatJumpscareLabel(clip.file),
      authorName: readNickname() || "Owner",
      page: location.pathname,
      createdAt: now
    });

    setOwnerStatus('Triggered "' + (clip.label || formatJumpscareLabel(clip.file)) + '".');
  }

  async function stopOwnerJumpscare() {
    if (!hasOwnerAccess() || !state.firebaseReady) {
      setOwnerStatus("Unlock owner and connect Firebase first.");
      return;
    }

    const now = Date.now();
    await state.rtdb.ref("arcadyAdmin/jumpscares/current").set({
      id: "jumpscare-stop-" + now,
      action: "stop",
      active: false,
      authorName: readNickname() || "Owner",
      page: location.pathname,
      createdAt: now
    });

    setOwnerStatus("Jumpscare stopped.");
  }

  function playLiveSoundPlayback(data, resumeOffsetMs) {
    const file = normalizeAssetPath(normalizeSoundFileReference(data.file));
    if (!file) {
      return;
    }

    const audio = new Audio(file);
    audio.preload = "auto";
    audio.volume = 1;
    state.currentSoundAudios.push(audio);

    audio.addEventListener("ended", function () {
      removeLiveSoundAudio(audio);
    });

    const startPlayback = function () {
      const playPromise = audio.play();
      if (playPromise && typeof playPromise.then === "function") {
        playPromise.then(function () {
          state.liveSoundAutoplayBlocked = false;
        }).catch(function (error) {
          console.warn("Arcady sound playback failed:", error);
          state.liveSoundAutoplayBlocked = true;
          ensureLiveSoundAutoplayRecovery();
          removeLiveSoundAudio(audio);
        });
      }
    };

    // If a resume offset is provided (ms), wait for metadata then seek
    // to the elapsed position and start playback from there. If the offset
    // exceeds the duration, skip playing.
    if (resumeOffsetMs && Number(resumeOffsetMs) > 0) {
      audio.addEventListener('loadedmetadata', function () {
        try {
          const offsetSec = Math.max(0, Number(resumeOffsetMs) / 1000);
          const duration = Number(audio.duration) || NaN;
          if (!isNaN(duration) && duration > 0) {
            if (offsetSec >= duration - 0.05) {
              // Clip already finished; don't play
              removeLiveSoundAudio(audio);
              return;
            }
            audio.currentTime = Math.min(offsetSec, Math.max(0, duration - 0.05));
          } else {
            // Unknown duration; attempt to seek
            audio.currentTime = offsetSec;
          }
        } catch (err) {}
        startPlayback();
      }, { once: true });

      try {
        audio.load();
      } catch (err) {}
    } else {
      startPlayback();
    }
  }

  function ensureLiveSoundAutoplayRecovery() {
    if (state.liveSoundRecoveryBound) {
      return;
    }

    const retry = function () {
      if (!state.activeSoundData || !state.liveSoundAutoplayBlocked) {
        return;
      }

      if (state.currentSoundAudios.length) {
        state.currentSoundAudios.slice().forEach(function (audio) {
          if (audio && typeof audio.play === "function") {
            audio.play().catch(function () {
              // ignore and wait for further interaction
            });
          }
        });
        return;
      }

      const elapsed = Number(state.activeSoundData.createdAt || 0) > 0
        ? Date.now() - Number(state.activeSoundData.createdAt || 0)
        : 0;
      playLiveSoundPlayback(state.activeSoundData, elapsed);
    };

    ["pointerdown", "touchstart", "keydown"].forEach(function (eventName) {
      window.addEventListener(eventName, retry, { passive: true });
    });

    document.addEventListener("visibilitychange", function () {
      if (document.visibilityState === "visible") {
        retry();
      }
    });

    window.addEventListener("focus", retry);
    state.liveSoundRecoveryBound = true;
  }

  function playJumpscare(data) {
    const fileRef = normalizeJumpscareFileReference(data && data.file);
    const file = normalizeAssetPath(fileRef);
    if (!fileRef || !file || !state.jumpscareVideo || !state.jumpscareOverlay) {
      clearJumpscare(true);
      renderJumpscareBoard();
      return;
    }

    state.activeJumpscareFile = fileRef;
    state.activeJumpscareLabel = String(data && data.label || formatJumpscareLabel(fileRef));
    state.jumpscareAutoplayBlocked = false;
    state.jumpscareOverlay.classList.add("is-visible");
    resizeJumpscareCanvas();

    try {
      state.jumpscareVideo.pause();
      state.jumpscareVideo.currentTime = 0;
    } catch (error) {
    }

    state.jumpscareVideo.muted = false;
    state.jumpscareVideo.defaultMuted = false;
    state.jumpscareVideo.autoplay = true;
    state.jumpscareVideo.loop = false;
    state.jumpscareVideo.playsInline = true;
    state.jumpscareVideo.preload = "auto";
    state.jumpscareVideo.removeAttribute("muted");
    state.jumpscareVideo.setAttribute("autoplay", "");
    state.jumpscareVideo.setAttribute("playsinline", "");
    state.jumpscareVideo.setAttribute("webkit-playsinline", "");
    state.jumpscareVideo.crossOrigin = "anonymous";

    if (state.jumpscareVideo.dataset.currentSrc !== file) {
      state.jumpscareVideo.dataset.currentSrc = file;
      state.jumpscareVideo.src = file;
      state.jumpscareVideo.load();
    }

    attemptJumpscarePlayback();
    ["loadedmetadata", "canplay", "canplaythrough"].forEach(function (eventName) {
      state.jumpscareVideo.addEventListener(eventName, attemptJumpscarePlayback, { once: true });
    });
    renderJumpscareBoard();
  }

  async function playLiveTvBroadcast(data) {
    const fileRef = normalizeLiveTvFileReference(data && (data.file || data.youtubeUrl));
    const sourceType = String(data && data.sourceType || "").toLowerCase();
    const isCameraSource = sourceType === "camera";
    const isScreenSource = sourceType === "screen";
    const isLocalStreamSource = isCameraSource || isScreenSource;
    if (isLocalStreamSource && !hasAdminAccess() && !hasOwnerAccess()) {
      if (state.liveTvMeta) {
        state.liveTvMeta.textContent = "Live camera/screen broadcast is active, but this browser can only display standard media links.";
      }
      renderLiveTvPanel();
      renderVideoBoards();
      return;
    }
    const file = isLocalStreamSource ? fileRef : normalizeAssetPath(fileRef);
    const embedUrl = normalizeLiveTvEmbedUrl(data && (data.embedUrl || data.file || data.youtubeUrl));
    if (!fileRef) {
      clearLiveTvBroadcast(true);
      renderVideoBoards();
      return;
    }

    state.activeVideoFile = fileRef;
    state.activeVideoLabel = String(data && data.label || formatLiveTvUrlLabel(fileRef));
    state.activeVideoIsImage = isLiveTvImageFile(fileRef);
    state.activeVideoIsEmbed = !state.activeVideoIsImage && !!embedUrl;
    state.liveTvAutoplayBlocked = false;
    renderLiveTvPanel();
    renderVideoBoards();

    if (state.liveTvImage) {
      if (state.activeVideoIsImage && file) {
        state.liveTvImage.src = file;
      } else {
        state.liveTvImage.removeAttribute("src");
      }
    }

    if (state.liveTvEmbed) {
      if (state.activeVideoIsEmbed && embedUrl) {
        state.liveTvEmbed.src = embedUrl;
      } else {
        state.liveTvEmbed.removeAttribute("src");
      }
    }

    if (state.activeVideoIsImage || state.activeVideoIsEmbed) {
      if (state.liveTvVideo) {
        try {
          state.liveTvVideo.pause();
          state.liveTvVideo.currentTime = 0;
        } catch (error) {
        }
        state.liveTvVideo.removeAttribute("src");
        delete state.liveTvVideo.dataset.currentSrc;
        state.liveTvVideo.load();
      }
      return;
    }

    if (isCameraSource || isScreenSource) {
      if (!state.liveTvVideo) {
        clearLiveTvBroadcast(true);
        renderVideoBoards();
        return;
      }

      try {
        const stream = await requestLiveTvMediaStream(sourceType);
        if (!stream) {
          clearLiveTvBroadcast(true);
          renderVideoBoards();
          return;
        }

        state.liveTvStream = stream;
        if (state.liveTvVideo.srcObject !== stream) {
          state.liveTvVideo.srcObject = stream;
          try {
            state.liveTvVideo.removeAttribute("src");
            delete state.liveTvVideo.dataset.currentSrc;
          } catch (error) {
          }
        }
      } catch (error) {
        clearLiveTvBroadcast(true);
        renderVideoBoards();
        return;
      }
    }

    if (!file || !state.liveTvVideo) {
      clearLiveTvBroadcast(true);
      renderVideoBoards();
      return;
    }

    const shouldAutoPlay = isHomePage();
    state.liveTvVideo.hidden = false;
    state.liveTvVideo.muted = false;
    state.liveTvVideo.defaultMuted = false;
    state.liveTvVideo.autoplay = shouldAutoPlay;
    state.liveTvVideo.loop = true;
    state.liveTvVideo.playsInline = true;
    state.liveTvVideo.controls = true;
    state.liveTvVideo.preload = "auto";
    state.liveTvVideo.removeAttribute("muted");
    if (shouldAutoPlay) {
      state.liveTvVideo.setAttribute("autoplay", "");
    } else {
      state.liveTvVideo.removeAttribute("autoplay");
    }
    state.liveTvVideo.setAttribute("loop", "");
    state.liveTvVideo.setAttribute("playsinline", "");
    state.liveTvVideo.setAttribute("webkit-playsinline", "");

    if (state.liveTvMeta && !shouldAutoPlay) {
      state.liveTvMeta.textContent = 'Live TV is ready. Click play on the video to start the broadcast from this page.';
    }

    if (isCameraSource || isScreenSource) {
      if (shouldAutoPlay) {
        attemptLiveTvPlayback();
      }

      ["loadedmetadata", "canplay", "canplaythrough"].forEach(function (eventName) {
        if (shouldAutoPlay) {
          state.liveTvVideo.addEventListener(eventName, attemptLiveTvPlayback, { once: true });
        }
      });
      state.liveTvVideo.addEventListener("error", handleLiveTvPlaybackError, { once: true });
      return;
    }

    if (state.liveTvVideo.dataset.currentSrc !== file) {
      try {
        state.liveTvVideo.pause();
      } catch (error) {
      }
      state.liveTvVideo.dataset.currentSrc = file;
      state.liveTvVideo.src = file;
      state.liveTvVideo.load();
    }

    if (shouldAutoPlay) {
      attemptLiveTvPlayback();
    }

    ["loadedmetadata", "canplay", "canplaythrough"].forEach(function (eventName) {
      if (shouldAutoPlay) {
        state.liveTvVideo.addEventListener(eventName, attemptLiveTvPlayback, { once: true });
      }
    });
    state.liveTvVideo.addEventListener("error", handleLiveTvPlaybackError, { once: true });
  }

  function clearJumpscare(preserveState) {
    state.activeJumpscareFile = "";
    state.activeJumpscareLabel = "";
    state.jumpscareAutoplayBlocked = false;

    if (state.jumpscareAnimationFrame) {
      cancelAnimationFrame(state.jumpscareAnimationFrame);
      state.jumpscareAnimationFrame = 0;
    }
    if (state.jumpscareCanvas && state.jumpscareCanvasContext) {
      state.jumpscareCanvasContext.clearRect(0, 0, state.jumpscareCanvas.width || 0, state.jumpscareCanvas.height || 0);
    }
    if (state.jumpscareOverlay) {
      state.jumpscareOverlay.classList.remove("is-visible");
    }
    if (state.jumpscareVideo) {
      try {
        state.jumpscareVideo.pause();
        state.jumpscareVideo.currentTime = 0;
      } catch (error) {
      }
      state.jumpscareVideo.removeAttribute("src");
      delete state.jumpscareVideo.dataset.currentSrc;
      state.jumpscareVideo.load();
    }
    if (!preserveState) {
      state.currentJumpscare = {};
    }
  }

  function attemptJumpscarePlayback() {
    if (!state.jumpscareVideo || !state.activeJumpscareFile) {
      return;
    }

    const playPromise = state.jumpscareVideo.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(function () {
        state.jumpscareAutoplayBlocked = true;
      });
    }
  }

  function handleJumpscarePlaying() {
    state.jumpscareAutoplayBlocked = false;
    resizeJumpscareCanvas();
    if (state.jumpscareAnimationFrame) {
      cancelAnimationFrame(state.jumpscareAnimationFrame);
      state.jumpscareAnimationFrame = 0;
    }
    renderJumpscareFrame();
  }

  function handleJumpscareEnded() {
    clearJumpscare(true);
    renderJumpscareBoard();
  }

  function handleJumpscarePlaybackError() {
    clearJumpscare(true);
    renderJumpscareBoard();
  }

  function resizeJumpscareCanvas() {
    if (!state.jumpscareCanvas) {
      return;
    }

    const width = Math.max(1, window.innerWidth || document.documentElement.clientWidth || 1);
    const height = Math.max(1, window.innerHeight || document.documentElement.clientHeight || 1);
    if (state.jumpscareCanvas.width !== width) {
      state.jumpscareCanvas.width = width;
    }
    if (state.jumpscareCanvas.height !== height) {
      state.jumpscareCanvas.height = height;
    }
    if (!state.jumpscareCanvasContext) {
      state.jumpscareCanvasContext = state.jumpscareCanvas.getContext("2d", { willReadFrequently: true });
    }
  }

  function renderJumpscareFrame() {
    if (!state.jumpscareVideo || !state.jumpscareCanvas || !state.jumpscareCanvasContext || !state.activeJumpscareFile) {
      return;
    }

    const video = state.jumpscareVideo;
    const canvas = state.jumpscareCanvas;
    const ctx = state.jumpscareCanvasContext;
    const videoWidth = Math.max(1, video.videoWidth || 1);
    const videoHeight = Math.max(1, video.videoHeight || 1);
    const scale = Math.max(canvas.width / videoWidth, canvas.height / videoHeight);
    const drawWidth = videoWidth * scale;
    const drawHeight = videoHeight * scale;
    const offsetX = (canvas.width - drawWidth) / 2;
    const offsetY = (canvas.height - drawHeight) / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(video, offsetX, offsetY, drawWidth, drawHeight);

    try {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      for (let i = 0; i < pixels.length; i += 4) {
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];
        const maxRB = Math.max(r, b);
        const greenLead = g - maxRB;

        if (g < 58 || greenLead < 14) {
          continue;
        }

        if (!(g > r * 1.1 && g > b * 1.06)) {
          continue;
        }

        if (greenLead >= 26 && g > 72) {
          pixels[i + 3] = 0;
          continue;
        }

        if (maxRB < 80 && greenLead >= 17 && g > 60) {
          pixels[i + 3] = 0;
          continue;
        }

        if (greenLead >= 16 && g > 65 && maxRB < 105) {
          const edge = Math.min(1, (greenLead - 16) / 18) * Math.min(1, (g - 58) / 95);
          pixels[i + 3] = Math.max(0, Math.round(pixels[i + 3] * (1 - Math.min(1, edge * 0.98))));
        }
      }
      ctx.putImageData(imageData, 0, 0);
    } catch (error) {
    }

    if (!video.paused && !video.ended) {
      state.jumpscareAnimationFrame = requestAnimationFrame(renderJumpscareFrame);
    } else {
      state.jumpscareAnimationFrame = 0;
    }
  }

  function clearLiveTvBroadcast(preserveState) {
    const hadActive = !!state.activeVideoFile;
    state.activeVideoFile = "";
    state.activeVideoLabel = "";
    state.activeVideoIsImage = false;
    state.activeVideoIsEmbed = false;
    state.liveTvAutoplayBlocked = false;

    if (state.liveTvStream) {
      try {
        state.liveTvStream.getTracks().forEach(function (track) {
          if (track && typeof track.stop === "function") {
            track.stop();
          }
        });
      } catch (error) {
      }
      state.liveTvStream = null;
      if (state.liveTvVideo) {
        try {
          state.liveTvVideo.srcObject = null;
        } catch (error) {
        }
      }
    }

    if (state.liveTvImage) {
      state.liveTvImage.hidden = true;
      state.liveTvImage.removeAttribute("src");
    }

    if (state.liveTvEmbed) {
      state.liveTvEmbed.hidden = true;
      state.liveTvEmbed.removeAttribute("src");
    }

    if (state.liveTvVideo) {
      try {
        state.liveTvVideo.pause();
        state.liveTvVideo.currentTime = 0;
      } catch (error) {
      }
      state.liveTvVideo.removeAttribute("src");
      state.liveTvVideo.removeAttribute("muted");
      state.liveTvVideo.removeAttribute("autoplay");
      state.liveTvVideo.removeAttribute("loop");
      delete state.liveTvVideo.dataset.currentSrc;
      state.liveTvVideo.load();
    }

    if (!preserveState) {
      state.currentLiveTv = {};
    }

    renderLiveTvPanel();

    if (hadActive) {
      try {
        window.dispatchEvent(new CustomEvent("arcady:broadcast-stopped"));
      } catch (err) {
      }
    }
  }

  function renderLiveTvPanel() {
    const active = !!state.activeVideoFile;
    const imageActive = active && state.activeVideoIsImage;
    const embedActive = active && state.activeVideoIsEmbed;
    const videoActive = active && !state.activeVideoIsImage && !state.activeVideoIsEmbed;

    if (state.liveTvPanel) {
      state.liveTvPanel.classList.toggle("is-live", active);
      state.liveTvPanel.classList.toggle("is-live-image", imageActive);
      state.liveTvPanel.classList.toggle("is-live-embed", embedActive);
      state.liveTvPanel.classList.toggle("is-live-video", videoActive);
    }
    if (state.liveTvTitle) {
      state.liveTvTitle.textContent = active ? (state.activeVideoLabel || "Live Broadcast") : "Static Broadcast";
    }
    if (state.liveTvMeta) {
      state.liveTvMeta.textContent = active
        ? (imageActive
          ? 'Now showing "' + (state.activeVideoLabel || "Live Broadcast") + '" on Live TV.'
          : (embedActive
            ? 'Now streaming "' + (state.activeVideoLabel || "Live Broadcast") + '" from YouTube on Live TV.'
          : 'Now playing "' + (state.activeVideoLabel || "Live Broadcast") + '". Sound is allowed if this browser lets autoplay with audio run.')
          )
        : "No live broadcast right now. Static mode is on until the owner goes live.";
    }
    if (state.liveTvStatic) {
      state.liveTvStatic.hidden = false;
      state.liveTvStatic.setAttribute("aria-hidden", active ? "true" : "false");
    }
    if (state.liveTvImage) {
      state.liveTvImage.hidden = !imageActive;
      state.liveTvImage.setAttribute("aria-hidden", imageActive ? "false" : "true");
    }
    if (state.liveTvVideo) {
      state.liveTvVideo.hidden = !videoActive;
      state.liveTvVideo.setAttribute("aria-hidden", videoActive ? "false" : "true");
    }
    if (state.liveTvEmbed) {
      state.liveTvEmbed.hidden = !embedActive;
      state.liveTvEmbed.setAttribute("aria-hidden", embedActive ? "false" : "true");
    }
  }

  function attemptLiveTvPlayback() {
    if (!state.liveTvVideo || !state.activeVideoFile || state.activeVideoIsImage || state.activeVideoIsEmbed) {
      return;
    }

    const playPromise = state.liveTvVideo.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(function (error) {
        console.warn("Arcady Live TV playback failed:", error);
        state.liveTvAutoplayBlocked = true;
        if (state.liveTvMeta) {
          state.liveTvMeta.textContent = 'Live TV is loaded. Some browsers block autoplay with sound, so the page will retry when you interact. If "' + (state.activeVideoLabel || "the broadcast") + '" still does not start, press play.';
        }
      });
    }
  }

  function handleLiveTvPlaying() {
    if (!state.activeVideoFile || state.activeVideoIsImage || state.activeVideoIsEmbed) {
      return;
    }

    state.liveTvAutoplayBlocked = false;
    if (state.liveTvMeta) {
      state.liveTvMeta.textContent = 'Now playing "' + (state.activeVideoLabel || "Live Broadcast") + '".';
    }
  }

  function ensureLiveTvAutoplayRecovery() {
    if (state.liveTvRecoveryBound) {
      return;
    }

    const retry = function () {
      if (!state.activeVideoFile || !state.liveTvAutoplayBlocked) {
        return;
      }
      attemptLiveTvPlayback();
    };

    ["pointerdown", "keydown", "touchstart"].forEach(function (eventName) {
      document.addEventListener(eventName, retry, true);
    });

    document.addEventListener("visibilitychange", function () {
      if (document.visibilityState === "visible") {
        retry();
      }
    });

    window.addEventListener("focus", retry);
    state.liveTvRecoveryBound = true;
  }

  function handleLiveTvPlaybackError() {
    if (state.liveTvMeta) {
      state.liveTvMeta.textContent = 'This Live TV video could not load on this browser right now.';
    }
  }

  function ensureJumpscareAutoplayRecovery() {
    if (state.jumpscareRecoveryBound) {
      return;
    }

    const retry = function () {
      if (!state.activeJumpscareFile || !state.jumpscareAutoplayBlocked) {
        return;
      }
      attemptJumpscarePlayback();
    };

    ["pointerdown", "touchstart", "keydown"].forEach(function (eventName) {
      window.addEventListener(eventName, retry, { passive: true });
    });

    state.jumpscareRecoveryBound = true;
  }

  function stopLiveSoundPlayback() {
    if (!state.currentSoundAudios.length) {
      state.liveSoundAutoplayBlocked = false;
      state.activeSoundData = null;
      return;
    }

    state.liveSoundAutoplayBlocked = false;
    state.activeSoundData = null;
    state.currentSoundAudios.slice().forEach(function (audio) {
      try {
        audio.pause();
        audio.currentTime = 0;
      } catch (error) {
      }
    });

    state.currentSoundAudios = [];
  }

  function removeLiveSoundAudio(targetAudio) {
    state.currentSoundAudios = state.currentSoundAudios.filter(function (audio) {
      return audio !== targetAudio;
    });
  }

  function applyCustomCursorState() {
    const enabled = state.settings.customCursorEnabled !== false && isLocalCursorEnabled();
    document.documentElement.classList.toggle("arcady-custom-cursor-enabled", enabled);
  }

  function resolveCursorTheme(themeId) {
    return findCursorTheme(themeId) || state.cursorThemes[0] || null;
  }

  function applySelectedCursorTheme() {
    const theme = getEffectiveCursorTheme();
    if (!theme) {
      document.documentElement.style.removeProperty("--arcady-cursor-value");
      document.documentElement.style.removeProperty("--arcady-pointer-value");
      return;
    }

    const cursorUrl = escapeCssUrl(normalizeAssetPath(theme.cursor));
    const pointerUrl = escapeCssUrl(normalizeAssetPath(theme.pointer));
    document.documentElement.style.setProperty("--arcady-cursor-value", 'url("' + cursorUrl + '"), auto');
    document.documentElement.style.setProperty("--arcady-pointer-value", 'url("' + pointerUrl + '"), pointer');
  }

  function syncCursorControls() {
    const selectedTheme = resolveCursorTheme(state.settings.customCursorTheme);
    const selectedLabel = selectedTheme ? selectedTheme.label : "No cursor themes found";

    if (state.adminCursorStatus) {
      if (!state.cursorThemes.length) {
        state.adminCursorStatus.textContent = "No cursor themes found in features/cursors.";
      } else if (state.settings.customCursorEnabled !== false) {
        state.adminCursorStatus.textContent = 'Custom cursor is enabled. Theme: "' + selectedLabel + '".';
      } else {
        state.adminCursorStatus.textContent = 'Custom cursor is disabled. Selected theme: "' + selectedLabel + '".';
      }
    }

    if (state.adminCursorThemeSelect) {
      if (!state.cursorThemes.length) {
        state.adminCursorThemeSelect.innerHTML = '<option value="">No cursor themes found</option>';
      } else {
        state.adminCursorThemeSelect.innerHTML = state.cursorThemes.map(function (theme) {
          return '<option value="' + escapeHtml(theme.id) + '">' + escapeHtml(theme.label) + '</option>';
        }).join("");
        state.adminCursorThemeSelect.value = selectedTheme ? selectedTheme.id : state.adminCursorThemeSelect.value || "";
      }
      state.adminCursorThemeSelect.disabled = !state.cursorThemes.length;
    }

    if (state.ownerCursorThemeSelect) {
      if (!state.cursorThemes.length) {
        state.ownerCursorThemeSelect.innerHTML = '<option value="">No cursor themes found</option>';
      } else {
        state.ownerCursorThemeSelect.innerHTML = state.cursorThemes.map(function (theme) {
          return '<option value="' + escapeHtml(theme.id) + '">' + escapeHtml(theme.label) + '</option>';
        }).join("");
        state.ownerCursorThemeSelect.value = selectedTheme ? selectedTheme.id : state.ownerCursorThemeSelect.value || "";
      }
      state.ownerCursorThemeSelect.disabled = !state.cursorThemes.length;
    }

    if (state.adminToggleCursorButton) {
      state.adminToggleCursorButton.textContent = state.settings.customCursorEnabled !== false ? "Disable Cursor" : "Enable Cursor";
      state.adminToggleCursorButton.disabled = !state.cursorThemes.length;
    }

    if (state.adminApplyCursorThemeButton) {
      state.adminApplyCursorThemeButton.disabled = !state.cursorThemes.length;
    }

    if (state.ownerCursorStatus) {
      if (!state.cursorThemes.length) {
        state.ownerCursorStatus.textContent = "No cursor themes found in features/cursors.";
      } else if (state.settings.customCursorEnabled !== false) {
        state.ownerCursorStatus.textContent = 'Custom cursor is enabled. Theme: "' + selectedLabel + '".';
      } else {
        state.ownerCursorStatus.textContent = 'Custom cursor is disabled. Selected theme: "' + selectedLabel + '".';
      }
    }

    if (state.ownerApplyCursorThemeButton) {
      state.ownerApplyCursorThemeButton.disabled = !state.cursorThemes.length;
    }

    syncUserSettingsControls();
  }

  async function saveOwnerCursorTheme() {
    if (!hasOwnerAccess() || !state.firebaseReady) {
      setOwnerStatus("Unlock owner and connect Firebase first.");
      return;
    }

    const theme = resolveCursorTheme(state.ownerCursorThemeSelect && state.ownerCursorThemeSelect.value);
    if (!theme) {
      setOwnerStatus("No cursor theme was found to apply.");
      return;
    }

    await state.rtdb.ref("arcadyAdmin/settings").update({
      customCursorTheme: theme.id,
      updatedAt: Date.now()
    });
    setOwnerStatus('Cursor theme set to "' + theme.label + '".');
  }

  async function toggleCustomCursorSetting() {
    if (!hasOwnerAccess() || !state.firebaseReady) {
      setOwnerStatus("Unlock owner and connect Firebase first.");
      return;
    }

    const nextEnabled = state.settings.customCursorEnabled === false;
    await state.rtdb.ref("arcadyAdmin/settings").update({
      customCursorEnabled: nextEnabled,
      updatedAt: Date.now()
    });
    setOwnerStatus(nextEnabled ? "Custom cursor enabled." : "Custom cursor disabled.");
  }

  function syncMadnessControls() {
    const activeData = state.currentMadness || {};
    const active = !!(activeData.id &&
      String(activeData.action || "start").toLowerCase() !== "stop" &&
      activeData.active !== false &&
      (!Number(activeData.endAt || 0) || Number(activeData.endAt || 0) > Date.now()));
    syncMadnessControlSet(
      state.adminMadnessImageSelect,
      state.adminMadnessModeSelect,
      state.adminMadnessDurationInput,
      state.adminMadnessStatus,
      active,
      activeData
    );
    syncMadnessControlSet(
      state.ownerMadnessImageSelect,
      state.ownerMadnessModeSelect,
      state.ownerMadnessDurationInput,
      state.ownerMadnessStatus,
      active,
      activeData
    );
  }

  function syncMadnessControlSet(imageSelect, modeSelect, durationInput, statusElement, active, activeData) {
    if (imageSelect) {
      const currentValue = document.activeElement === imageSelect
        ? imageSelect.value
        : normalizeMadnessFileReference(active ? activeData.file || "" : imageSelect.value || "");
      const optionsHtml = state.madnessAssets.length
        ? state.madnessAssets.map(function (asset) {
            return '<option value="' + escapeHtml(asset.file) + '">' + escapeHtml(asset.label) + '</option>';
          }).join("")
        : '<option value="" disabled>No froggy images found</option>';

      imageSelect.innerHTML = '<option value="">Random Froggy</option>' + optionsHtml;
      imageSelect.value = currentValue || "";
    }

    if (modeSelect && document.activeElement !== modeSelect) {
      modeSelect.value = normalizeMadnessMode(active ? activeData.mode : modeSelect.value || "rainfall");
    }

    if (durationInput && document.activeElement !== durationInput) {
      const durationMs = Number(active ? activeData.durationMs : Number(durationInput.value || 12) * 1000 || 12000);
      durationInput.value = String(Math.max(3, Math.min(120, Math.round(durationMs / 1000) || 12)));
    }

    if (statusElement) {
      if (active) {
        const label = describeMadnessMode(activeData.mode);
        const imageLabel = activeData.file ? " using " + formatMadnessLabel(activeData.file) : " with random froggies";
        statusElement.textContent = label + " is live" + imageLabel + ".";
      } else if (state.madnessAssets.length) {
        statusElement.textContent = "Spawn froggy chaos on everyone's screen.";
      } else {
        statusElement.textContent = "No froggy images found in features/gifs yet.";
      }
    }
  }

  function syncScreenEffectControls() {
    const activeData = state.currentScreenEffect || {};
    const active = !!(activeData.id &&
      String(activeData.action || "start").toLowerCase() !== "stop" &&
      activeData.active !== false &&
      (!Number(activeData.endAt || 0) || Number(activeData.endAt || 0) > Date.now()));

    if (state.adminScreenEffectModeSelect && document.activeElement !== state.adminScreenEffectModeSelect) {
      state.adminScreenEffectModeSelect.value = normalizeScreenEffectMode(active ? activeData.mode : state.adminScreenEffectModeSelect.value || "shake");
    }

    if (state.adminScreenEffectDurationInput && document.activeElement !== state.adminScreenEffectDurationInput) {
      const durationMs = Number(active ? activeData.durationMs : Number(state.adminScreenEffectDurationInput.value || 10) * 1000 || 10000);
      state.adminScreenEffectDurationInput.value = String(Math.max(3, Math.min(120, Math.round(durationMs / 1000) || 10)));
    }

    if (state.adminScreenEffectStatus) {
      if (active) {
        state.adminScreenEffectStatus.textContent = describeScreenEffect(activeData.mode) + " is live on everyone's screen.";
      } else {
        state.adminScreenEffectStatus.textContent = "Trigger live screen effects like shake, glitch, invert, and flip.";
      }
    }

    if (state.ownerScreenEffectModeSelect && document.activeElement !== state.ownerScreenEffectModeSelect) {
      state.ownerScreenEffectModeSelect.value = normalizeScreenEffectMode(active ? activeData.mode : state.ownerScreenEffectModeSelect.value || "shake");
    }

    if (state.ownerScreenEffectDurationInput && document.activeElement !== state.ownerScreenEffectDurationInput) {
      const durationMs = Number(active ? activeData.durationMs : Number(state.ownerScreenEffectDurationInput.value || 10) * 1000 || 10000);
      state.ownerScreenEffectDurationInput.value = String(Math.max(3, Math.min(120, Math.round(durationMs / 1000) || 10)));
    }

    if (state.ownerScreenEffectStatus) {
      if (active) {
        state.ownerScreenEffectStatus.textContent = describeScreenEffect(activeData.mode) + " is live on everyone's screen.";
      } else {
        state.ownerScreenEffectStatus.textContent = "Trigger live screen effects like shake, glitch, invert, and flip.";
      }
    }
  }

  async function startMadnessFromControls(ownerMode) {
    const allowed = ownerMode ? hasOwnerAccess() : hasAdminAccess();
    if (!allowed || !state.firebaseReady) {
      if (ownerMode) {
        setOwnerStatus("Unlock owner and connect Firebase first.");
      } else {
        setStatus("Unlock admin and connect Firebase first.");
      }
      return;
    }

    const modeSelect = ownerMode ? state.ownerMadnessModeSelect : state.adminMadnessModeSelect;
    const imageSelect = ownerMode ? state.ownerMadnessImageSelect : state.adminMadnessImageSelect;
    const durationInput = ownerMode ? state.ownerMadnessDurationInput : state.adminMadnessDurationInput;
    const mode = normalizeMadnessMode(modeSelect && modeSelect.value);
    const file = normalizeMadnessFileReference(imageSelect && imageSelect.value);
    const durationMs = clampDurationMs(Number(durationInput && durationInput.value || 12) * 1000, 12000);

    if (!file && !state.madnessAssets.length) {
      if (ownerMode) {
        setOwnerStatus("No froggy images were found in features/gifs.");
      } else {
        setStatus("No froggy images were found in features/gifs.");
      }
      return;
    }

    const now = Date.now();
    await state.rtdb.ref("arcadyAdmin/madness/current").set({
      id: "madness-" + now,
      action: "start",
      active: true,
      mode: mode,
      file: file,
      label: file ? formatMadnessLabel(file) : "Random Froggy",
      durationMs: durationMs,
      createdAt: now,
      endAt: now + durationMs,
      authorName: readNickname() || (ownerMode ? "Owner" : "Staff"),
      page: location.pathname
    });

    if (ownerMode) {
      setOwnerStatus(describeMadnessMode(mode) + " started.");
    } else {
      setStatus(describeMadnessMode(mode) + " started.");
    }
  }

  async function stopMadnessFromControls(ownerMode) {
    const allowed = ownerMode ? hasOwnerAccess() : hasAdminAccess();
    if (!allowed || !state.firebaseReady) {
      if (ownerMode) {
        setOwnerStatus("Unlock owner and connect Firebase first.");
      } else {
        setStatus("Unlock admin and connect Firebase first.");
      }
      return;
    }

    const now = Date.now();
    await state.rtdb.ref("arcadyAdmin/madness/current").set({
      id: "madness-stop-" + now,
      action: "stop",
      active: false,
      createdAt: now,
      endAt: now,
      authorName: readNickname() || (ownerMode ? "Owner" : "Staff"),
      page: location.pathname
    });

    if (ownerMode) {
      setOwnerStatus("Screen madness stopped.");
    } else {
      setStatus("Screen madness stopped.");
    }
  }

  async function startOwnerMadness() {
    return startMadnessFromControls(true);
  }

  async function stopOwnerMadness() {
    return stopMadnessFromControls(true);
  }

  async function startOwnerScreenEffect() {
    if (!hasOwnerAccess() || !state.firebaseReady) {
      setOwnerStatus("Unlock owner and connect Firebase first.");
      return;
    }

    const mode = normalizeScreenEffectMode(state.ownerScreenEffectModeSelect && state.ownerScreenEffectModeSelect.value);
    const durationMs = clampDurationMs(Number(state.ownerScreenEffectDurationInput && state.ownerScreenEffectDurationInput.value || 10) * 1000, 10000);
    const now = Date.now();

    await state.rtdb.ref("arcadyAdmin/screenEffects/current").set({
      id: "screenfx-" + now,
      action: "start",
      active: true,
      mode: mode,
      durationMs: durationMs,
      createdAt: now,
      endAt: now + durationMs,
      authorName: readNickname() || "Owner",
      page: location.pathname
    });

    setOwnerStatus(describeScreenEffect(mode) + " started.");
  }

  async function stopOwnerScreenEffect() {
    if (!hasOwnerAccess() || !state.firebaseReady) {
      setOwnerStatus("Unlock owner and connect Firebase first.");
      return;
    }

    const now = Date.now();
    await state.rtdb.ref("arcadyAdmin/screenEffects/current").set({
      id: "screenfx-stop-" + now,
      action: "stop",
      active: false,
      createdAt: now,
      endAt: now,
      authorName: readNickname() || "Owner",
      page: location.pathname
    });

    setOwnerStatus("Screen effect stopped.");
  }

  async function pushAdminFontStyle() {
    if (!hasAdminCapability("global-theme") || !state.firebaseReady) {
      setStatus("Unlock the right admin panel and connect Firebase first.");
      return;
    }

    const fontFamily = normalizeFontChoice(state.adminFontFamilySelect && state.adminFontFamilySelect.value);
    const fontColor = normalizeColor(state.adminFontColorTextInput && state.adminFontColorTextInput.value);
    if (!fontFamily) {
      setStatus("Pick a font first.");
      return;
    }
    if (!fontColor) {
      setStatus("Enter a valid font color first.");
      return;
    }

    await state.rtdb.ref("arcadyAdmin/state").update({
      fontFamily: fontFamily,
      fontColor: fontColor,
      updatedAt: Date.now()
    });
    setStatus("Global font style updated.");
  }

  async function resetAdminFontFamilyToFredoka() {
    if (!hasAdminCapability("global-theme") || !state.firebaseReady) {
      setStatus("Unlock the right admin panel and connect Firebase first.");
      return;
    }

    const fredokaChoice = globalFontChoices.find(function (font) {
      return font.id === "fredoka";
    }) || globalFontChoices[0];

    await state.rtdb.ref("arcadyAdmin/state").update({
      fontFamily: fredokaChoice.family,
      updatedAt: Date.now()
    });

    if (state.adminFontFamilySelect) {
      state.adminFontFamilySelect.value = fredokaChoice.family;
    }
    setStatus("Font reset to Fredoka.");
  }

  async function pushAdminTabTitle() {
    if (!hasAdminCapability("global-theme") || !state.firebaseReady) {
      setStatus("Unlock the right admin panel and connect Firebase first.");
      return;
    }

    const tabTitle = String(state.adminTabTitleInput && state.adminTabTitleInput.value || "").trim().slice(0, 80);
    await state.rtdb.ref("arcadyAdmin/state").update({
      tabTitle: tabTitle,
      updatedAt: Date.now()
    });
    setStatus(tabTitle ? 'Tab title set to "' + tabTitle + '".' : "Tab title reset to each page default.");
  }

  async function resetAdminTabTitle() {
    if (!hasAdminCapability("global-theme") || !state.firebaseReady) {
      setStatus("Unlock the right admin panel and connect Firebase first.");
      return;
    }

    await state.rtdb.ref("arcadyAdmin/state").update({
      tabTitle: "",
      updatedAt: Date.now()
    });
    if (state.adminTabTitleInput) {
      state.adminTabTitleInput.value = "";
    }
    setStatus("Tab title reset.");
  }

  async function saveAdminCursorTheme() {
    if (!hasAdminCapability("custom-cursor") || !state.firebaseReady) {
      setStatus("Unlock the right admin panel and connect Firebase first.");
      return;
    }

    const theme = resolveCursorTheme(state.adminCursorThemeSelect && state.adminCursorThemeSelect.value);
    if (!theme) {
      setStatus("No cursor theme was found to apply.");
      return;
    }

    await state.rtdb.ref("arcadyAdmin/settings").update({
      customCursorTheme: theme.id,
      updatedAt: Date.now()
    });
    setStatus('Cursor theme set to "' + theme.label + '".');
  }

  async function toggleAdminCustomCursorSetting() {
    if (!hasAdminCapability("custom-cursor") || !state.firebaseReady) {
      setStatus("Unlock the right admin panel and connect Firebase first.");
      return;
    }

    const nextEnabled = state.settings.customCursorEnabled === false;
    await state.rtdb.ref("arcadyAdmin/settings").update({
      customCursorEnabled: nextEnabled,
      updatedAt: Date.now()
    });
    setStatus(nextEnabled ? "Custom cursor enabled." : "Custom cursor disabled.");
  }

  async function saveAdminHomepageNews() {
    if (!hasAdminCapability("homepage-news") || !state.firebaseReady) {
      setStatus("Unlock the right admin panel and connect Firebase first.");
      return;
    }

    const text = String(state.adminHomeNewsInput && state.adminHomeNewsInput.value || "").trim();
    if (!text) {
      setStatus("Write some news text first.");
      return;
    }

    await state.rtdb.ref("arcadyAdmin/homepageNews/current").set({
      text: text,
      authorName: readNickname() || "Staff",
      updatedAt: Date.now()
    });
    setStatus("Homepage news updated.");
  }

  async function clearAdminHomepageNews() {
    if (!hasAdminCapability("homepage-news") || !state.firebaseReady) {
      setStatus("Unlock the right admin panel and connect Firebase first.");
      return;
    }

    await state.rtdb.ref("arcadyAdmin/homepageNews/current").remove();
    if (state.adminHomeNewsInput) {
      state.adminHomeNewsInput.value = "";
    }
    setStatus("Homepage news cleared.");
  }

  async function saveAdminWallOfFameEntries(entries, successMessage) {
    if (!hasAdminCapability("wall-of-fame") || !state.firebaseReady) {
      setStatus("Unlock the right admin panel and connect Firebase first.");
      return false;
    }

    const normalizedEntries = normalizeWallOfFameEntries(entries);
    const wallRef = state.rtdb.ref("arcadyAdmin/homepageWallOfFame/current");
    if (!normalizedEntries.length) {
      await wallRef.remove();
      setStatus(successMessage || "Wall of Fame cleared.");
      return true;
    }

    await wallRef.set({
      entries: normalizedEntries,
      authorName: readNickname() || "Staff",
      updatedAt: Date.now()
    });
    setStatus(successMessage || "Wall of Fame updated.");
    return true;
  }

  async function addAdminWallOfFameEntry() {
    if (!hasAdminCapability("wall-of-fame") || !state.firebaseReady) {
      setStatus("Unlock the right admin panel and connect Firebase first.");
      return;
    }

    const rank = String(state.adminWallRankInput && state.adminWallRankInput.value || "").trim();
    const name = String(state.adminWallNameInput && state.adminWallNameInput.value || "").trim();
    const color = normalizeColor(state.adminWallColorTextInput && state.adminWallColorTextInput.value);
    if (!rank || !name) {
      setStatus("Add both a rank and a name first.");
      return;
    }
    if (!color) {
      setStatus("Enter a valid hex color first.");
      return;
    }

    const nextEntries = normalizeWallOfFameEntries(state.wallOfFameEntries).concat({
      id: "wall-entry-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8),
      rank: rank,
      name: name,
      color: color,
      createdAt: Date.now()
    });

    const saved = await saveAdminWallOfFameEntries(nextEntries, "Wall of Fame entry added.");
    if (!saved) {
      return;
    }

    if (state.adminWallRankInput) {
      state.adminWallRankInput.value = "";
    }
    if (state.adminWallNameInput) {
      state.adminWallNameInput.value = "";
    }
  }

  async function clearAdminWallOfFame() {
    await saveAdminWallOfFameEntries([], "Wall of Fame cleared.");
  }

  async function removeAdminWallOfFameEntry(entryId) {
    if (!entryId) {
      return;
    }

    const nextEntries = normalizeWallOfFameEntries(state.wallOfFameEntries).filter(function (entry) {
      return entry.id !== entryId;
    });
    await saveAdminWallOfFameEntries(nextEntries, "Wall of Fame entry removed.");
  }

  async function moveAdminWallOfFameEntry(entryId, direction) {
    if (!entryId || !direction) {
      return;
    }

    const nextEntries = normalizeWallOfFameEntries(state.wallOfFameEntries);
    const currentIndex = nextEntries.findIndex(function (entry) {
      return entry.id === entryId;
    });
    if (currentIndex < 0) {
      return;
    }

    const targetIndex = currentIndex + Number(direction);
    if (targetIndex < 0 || targetIndex >= nextEntries.length) {
      return;
    }

    const swapped = nextEntries.slice();
    const movedEntry = swapped[currentIndex];
    swapped[currentIndex] = swapped[targetIndex];
    swapped[targetIndex] = movedEntry;
    await saveAdminWallOfFameEntries(swapped, "Wall of Fame order updated.");
  }

  async function giveAdminXp(mode) {
    if (!hasAdminCapability("xp-controls") || !state.firebaseReady) {
      setStatus("Unlock the right admin panel and connect Firebase first.");
      return;
    }

    const amount = normalizeXpAmount(state.adminXpAmountInput && state.adminXpAmountInput.value);
    if (!amount) {
      setStatus("Enter an XP amount first.");
      return;
    }

    let targets = [];
    if (mode === "self") {
      targets = [{
        deviceId: state.deviceId,
        nickname: readPresenceNickname()
      }];
    } else if (mode === "nickname") {
      const nickname = String(state.adminXpNicknameInput && state.adminXpNicknameInput.value || "").trim();
      if (!nickname) {
        setStatus("Type a nickname for the specific XP target.");
        return;
      }

      const visitor = findKnownPersonByNickname(nickname);
      if (!visitor || !visitor.deviceId) {
        setStatus('No known visitor matched "' + nickname + '".');
        return;
      }
      targets = [visitor];
    } else {
      const targetMap = {};
      collectRecentVisitors(state.currentVisitors).forEach(function (visitor) {
        const deviceId = String(visitor.deviceId || "").trim();
        if (!deviceId) {
          return;
        }
        targetMap[deviceId] = {
          deviceId: deviceId,
          nickname: readableName(visitor)
        };
      });
      collectKnownXpProfiles().forEach(function (profile) {
        if (!profile.deviceId) {
          return;
        }
        targetMap[profile.deviceId] = {
          deviceId: profile.deviceId,
          nickname: profile.nickname
        };
      });
      targetMap[state.deviceId] = {
        deviceId: state.deviceId,
        nickname: readPresenceNickname()
      };
      targets = Object.keys(targetMap).map(function (deviceId) {
        return targetMap[deviceId];
      });
    }

    if (!targets.length) {
      setStatus("Nobody is available for XP right now.");
      return;
    }

    await Promise.all(targets.map(function (target) {
      return awardXpToDevice(target.deviceId, amount, "admin-grant", target.nickname);
    }));

    if (state.adminXpNicknameInput && mode === "nickname") {
      state.adminXpNicknameInput.value = "";
    }

    if (mode === "self") {
      setStatus("Added " + amount + " XP to yourself.");
    } else if (mode === "nickname") {
      setStatus("Added " + amount + " XP to that nickname.");
    } else {
      setStatus("Added " + amount + " XP to everyone currently known.");
    }
  }

  async function startAdminScreenEffect() {
    if (!hasAdminCapability("screen-effects") || !state.firebaseReady) {
      setStatus("Unlock the right admin panel and connect Firebase first.");
      return;
    }

    const mode = normalizeScreenEffectMode(state.adminScreenEffectModeSelect && state.adminScreenEffectModeSelect.value);
    const durationMs = clampDurationMs(Number(state.adminScreenEffectDurationInput && state.adminScreenEffectDurationInput.value || 10) * 1000, 10000);
    const now = Date.now();

    await state.rtdb.ref("arcadyAdmin/screenEffects/current").set({
      id: "screenfx-" + now,
      action: "start",
      active: true,
      mode: mode,
      durationMs: durationMs,
      createdAt: now,
      endAt: now + durationMs,
      authorName: readNickname() || "Staff",
      page: location.pathname
    });

    setStatus(describeScreenEffect(mode) + " started.");
  }

  async function stopAdminScreenEffect() {
    if (!hasAdminCapability("screen-effects") || !state.firebaseReady) {
      setStatus("Unlock the right admin panel and connect Firebase first.");
      return;
    }

    const now = Date.now();
    await state.rtdb.ref("arcadyAdmin/screenEffects/current").set({
      id: "screenfx-stop-" + now,
      action: "stop",
      active: false,
      createdAt: now,
      endAt: now,
      authorName: readNickname() || "Staff",
      page: location.pathname
    });

    setStatus("Screen effect stopped.");
  }

  function startScreenMadness(data) {
    clearScreenMadness(true);

    if (!state.madnessLayer) {
      return;
    }

    const mode = normalizeMadnessMode(data && data.mode);
    const endAt = Number(data && data.endAt || 0);
    const durationMs = clampDurationMs(Number(data && data.durationMs || 12000), 12000);
    const remainingMs = endAt > 0 ? Math.max(0, endAt - Date.now()) : durationMs;
    if (!remainingMs) {
      return;
    }

    if (mode === "rainfall") {
      spawnRainMadness(data, 4);
      state.madnessSpawnTimer = setInterval(function () {
        spawnRainMadness(data, 3);
      }, 240);
    } else if (mode === "swarm") {
      spawnSwarmMadness(data, 14);
      state.madnessSpawnTimer = setInterval(function () {
        spawnSwarmMadness(data, 5);
      }, 650);
    } else {
      spawnPopupMadness(data, 3);
      state.madnessSpawnTimer = setInterval(function () {
        spawnPopupMadness(data, 1);
      }, 420);
    }

    state.madnessTimer = setTimeout(function () {
      clearScreenMadness(true);
      syncMadnessControls();
    }, remainingMs);
  }

  function clearScreenMadness(preserveState) {
    if (state.madnessTimer) {
      clearTimeout(state.madnessTimer);
      state.madnessTimer = null;
    }
    if (state.madnessSpawnTimer) {
      clearInterval(state.madnessSpawnTimer);
      state.madnessSpawnTimer = null;
    }
    if (state.madnessLayer) {
      state.madnessLayer.innerHTML = "";
    }
    if (!preserveState) {
      state.currentMadness = {};
    }
  }

  function startScreenEffect(data) {
    clearScreenEffect(true);

    const mode = normalizeScreenEffectMode(data && data.mode);
    const endAt = Number(data && data.endAt || 0);
    const durationMs = clampDurationMs(Number(data && data.durationMs || 10000), 10000);
    const remainingMs = endAt > 0 ? Math.max(0, endAt - Date.now()) : durationMs;
    if (!remainingMs) {
      return;
    }

    document.documentElement.classList.add("arcady-screen-effect-" + mode);

    if (state.screenFxLayer) {
      state.screenFxLayer.className = "arcady-screenfx-layer is-visible";
      if (mode === "glitch") {
        state.screenFxLayer.classList.add("is-glitch");
      } else if (mode === "crazy") {
        state.screenFxLayer.classList.add("is-crazy");
      }
    }

    state.screenEffectTimer = setTimeout(function () {
      clearScreenEffect(true);
      syncScreenEffectControls();
    }, remainingMs);
  }

  function clearScreenEffect(preserveState) {
    if (state.screenEffectTimer) {
      clearTimeout(state.screenEffectTimer);
      state.screenEffectTimer = null;
    }

    document.documentElement.classList.remove(
      "arcady-screen-effect-shake",
      "arcady-screen-effect-glitch",
      "arcady-screen-effect-invert",
      "arcady-screen-effect-flip",
      "arcady-screen-effect-crazy",
      "arcady-screen-effect-blur",
      "arcady-screen-effect-grayscale"
    );

    if (state.screenFxLayer) {
      state.screenFxLayer.className = "arcady-screenfx-layer";
    }

    if (!preserveState) {
      state.currentScreenEffect = {};
    }
  }

  function spawnRainMadness(data, count) {
    for (let index = 0; index < count; index += 1) {
      const item = createMadnessItem("rain", resolveMadnessAsset(data));
      if (!item) {
        continue;
      }

      item.style.left = Math.round(Math.random() * 92) + "vw";
      item.style.top = (-18 - Math.round(Math.random() * 12)) + "vh";
      item.style.width = 64 + Math.round(Math.random() * 88) + "px";
      item.style.animationDuration = (2.7 + Math.random() * 2.2).toFixed(2) + "s";
      item.style.opacity = String(0.86 + Math.random() * 0.14);
    }
  }

  function spawnPopupMadness(data, count) {
    for (let index = 0; index < count; index += 1) {
      const item = createMadnessItem("pop", resolveMadnessAsset(data));
      if (!item) {
        continue;
      }

      item.style.left = Math.round(6 + Math.random() * 76) + "vw";
      item.style.top = Math.round(10 + Math.random() * 68) + "vh";
      item.style.width = 90 + Math.round(Math.random() * 150) + "px";
      item.style.animationDuration = (1.5 + Math.random() * 0.9).toFixed(2) + "s";
    }
  }

  function spawnSwarmMadness(data, count) {
    for (let index = 0; index < count; index += 1) {
      const item = createMadnessItem("swarm", resolveMadnessAsset(data));
      if (!item) {
        continue;
      }

      item.style.left = Math.round(28 + Math.random() * 44) + "vw";
      item.style.top = Math.round(22 + Math.random() * 42) + "vh";
      item.style.width = 72 + Math.round(Math.random() * 84) + "px";
      item.style.animationDuration = (1.8 + Math.random() * 1.4).toFixed(2) + "s";
      item.style.setProperty("--madness-dx", Math.round((Math.random() - 0.5) * window.innerWidth * 0.9) + "px");
      item.style.setProperty("--madness-dy", Math.round((Math.random() - 0.5) * window.innerHeight * 0.82) + "px");
      item.style.setProperty("--madness-rot", Math.round((Math.random() - 0.5) * 120) + "deg");
    }
  }

  function createMadnessItem(mode, file) {
    const normalizedFile = normalizeMadnessFileReference(file);
    if (!state.madnessLayer || !normalizedFile) {
      return null;
    }

    const item = document.createElement("img");
    item.className = "arcady-madness-item is-" + mode;
    item.src = normalizeAssetPath(normalizedFile);
    item.alt = "Froggy";
    item.draggable = false;
    item.decoding = "async";
    item.loading = "eager";
    item.addEventListener("animationend", function () {
      item.remove();
    }, { once: true });
    state.madnessLayer.appendChild(item);
    return item;
  }

  function resolveMadnessAsset(data) {
    const preferred = normalizeMadnessFileReference(data && data.file);
    if (preferred) {
      return preferred;
    }

    if (!state.madnessAssets.length) {
      return "";
    }

    const choice = state.madnessAssets[Math.floor(Math.random() * state.madnessAssets.length)];
    return choice && choice.file ? choice.file : "";
  }

  async function sendBackgroundImage() {
    if (!hasAdminAccess() || !hasAdminCapability("base-admin-ui") || !state.firebaseReady) {
      setStatus("Unlock admin and connect Firebase first.");
      return;
    }

    const selectedIndex = Number(state.backgroundImageSelect.value);
    const background = state.backgroundOptions[selectedIndex];
    if (!background || !background.file) {
      setStatus("Pick a background image first.");
      return;
    }

    await state.rtdb.ref("arcadyAdmin/state").update({
      backgroundColor: "#000000",
      backgroundImage: background.file,
      updatedAt: Date.now()
    });

    setStatus("Background image updated.");
  }

  async function revertBackground() {
    if (!hasAdminAccess() || !hasAdminCapability("base-admin-ui") || !state.firebaseReady) {
      setStatus("Unlock admin and connect Firebase first.");
      return;
    }

    await state.rtdb.ref("arcadyAdmin/state").update({
      backgroundColor: "#000000",
      backgroundImage: "",
      updatedAt: Date.now()
    });

    setStatus("Background reverted to black.");
  }

  async function sendPoll() {
    if (!hasAdminAccess() || !canUseGlobalPollControls() || !state.firebaseReady) {
      setStatus("Unlock admin and connect Firebase first.");
      return;
    }

    const question = state.pollQuestionInput.value.trim();
    const options = state.pollOptionsInput.value
      .split("\n")
      .map(function (value) { return value.trim(); })
      .filter(Boolean)
      .slice(0, 6);

    if (!question || options.length < 2) {
      setStatus("Add a poll question and at least two options.");
      return;
    }

    if (hasAdminCapability("poll-tools")) {
      await saveAdminPollDuration(true);
    }

    const pollId = "poll-" + Date.now();
    await state.rtdb.ref("arcadyAdmin/polls/current").set({
      id: pollId,
      question: question,
      options: options,
      authorName: readNickname() || "Staff",
      active: true,
      createdAt: Date.now()
    });

    state.pollQuestionInput.value = "";
    state.pollOptionsInput.value = "";
    setStatus("Poll sent.");
  }

  async function saveAdminPollDuration(silent) {
    if (!hasAdminCapability("poll-tools") || !state.firebaseReady) {
      if (!silent) {
        setStatus("Unlock the right admin panel and connect Firebase first.");
      }
      return false;
    }

    const durationMs = clampDurationMs(Number(state.adminPollDurationInput && state.adminPollDurationInput.value || 0) * 1000, state.settings.pollDurationMs);
    await state.rtdb.ref("arcadyAdmin/settings").update({
      pollDurationMs: durationMs,
      updatedAt: Date.now()
    });
    if (!silent) {
      setStatus("Poll duration saved.");
    }
    return true;
  }

  async function closePoll() {
    if (!hasAdminAccess() || !canUseGlobalPollControls() || !state.firebaseReady) {
      setStatus("Unlock admin and connect Firebase first.");
      return;
    }

    if (!state.currentPollData || !state.currentPollData.active) {
      setStatus("No live poll to close.");
      return;
    }

    await state.rtdb.ref("arcadyAdmin/polls/current").update({
      active: false,
      closedAt: Date.now()
    });

    setStatus("Poll closed.");
  }

  async function submitVote(optionIndex) {
    if (!state.firebaseReady || !state.currentPollData || !state.currentPollData.active) {
      return;
    }

    await state.rtdb
      .ref("arcadyAdmin/pollVotes/" + state.currentPollId + "/" + state.deviceId)
      .set({
        optionIndex: optionIndex,
        page: location.pathname,
        updatedAt: Date.now()
      });
  }

  function applyRealtimeBackground(color) {
    const normalized = normalizeColor(color);
    if (!normalized) {
      return;
    }

    document.documentElement.style.backgroundColor = normalized;
    body.style.backgroundColor = normalized;
  }

  function applyRealtimeBackgroundState(data) {
    const color = normalizeColor(data.backgroundColor || "#000000") || "#000000";
    const image = typeof data.backgroundImage === "string" ? data.backgroundImage.trim() : "";
    const fontColor = normalizeColor(data.fontColor || "");
    const fontFamily = normalizeFontChoice(data.fontFamily || "");
    const tabTitle = String(data.tabTitle || "").trim();

    document.documentElement.style.backgroundColor = color;
    body.style.backgroundColor = color;
    body.style.color = fontColor || "";
    body.style.fontFamily = fontFamily || "";
    document.title = tabTitle || defaultPageTitle;
    applyNavPosition();

    if (image) {
      body.style.backgroundImage = 'url("' + image.replace(/"/g, "%22") + '")';
      body.style.backgroundSize = "cover";
      body.style.backgroundPosition = "center";
      body.style.backgroundRepeat = "no-repeat";
      if (state.backgroundImageSelect) {
        const matchedIndex = state.backgroundOptions.findIndex(function (item) {
          return item.file === image;
        });
        state.backgroundImageSelect.value = matchedIndex >= 0 ? String(matchedIndex) : "";
      }
    } else {
      body.style.backgroundImage = "";
      body.style.backgroundSize = "";
      body.style.backgroundPosition = "";
      body.style.backgroundRepeat = "";
      if (state.backgroundImageSelect) {
        state.backgroundImageSelect.value = "";
      }
    }

    if (state.backgroundInput && normalizeColor(color)) {
      state.backgroundInput.value = color;
    }
    if (state.backgroundTextInput && normalizeColor(color)) {
      state.backgroundTextInput.value = color;
    }

    syncUserSettingsControls();
    updatePresence(true);
  }

  function syncOwnerBackgroundState(data) {
    const color = normalizeColor(data.backgroundColor || "#000000") || "#000000";
    const image = typeof data.backgroundImage === "string" ? data.backgroundImage.trim() : "";
    const fontColor = normalizeColor(data.fontColor || "") || "#ffffff";
    const fontFamily = normalizeFontChoice(data.fontFamily || "") || globalFontChoices[0].family;
    const tabTitle = String(data.tabTitle || "").trim();

    if (state.ownerBgColorInput) {
      state.ownerBgColorInput.value = color;
    }
    if (state.ownerBgColorTextInput) {
      state.ownerBgColorTextInput.value = color;
    }
    if (state.ownerBgImageSelect) {
      const matchedIndex = state.backgroundOptions.findIndex(function (item) {
        return item.file === image;
      });
      state.ownerBgImageSelect.value = matchedIndex >= 0 ? String(matchedIndex) : "";
    }
    if (state.ownerFontFamilySelect) {
      populateFontSelect(state.ownerFontFamilySelect, fontFamily);
    }
    if (state.ownerFontColorInput) {
      state.ownerFontColorInput.value = fontColor;
    }
    if (state.ownerFontColorTextInput) {
      state.ownerFontColorTextInput.value = fontColor;
    }
    if (state.ownerTabTitleInput && document.activeElement !== state.ownerTabTitleInput) {
      state.ownerTabTitleInput.value = tabTitle;
    }
  }

  function syncAdminThemeState(data) {
    const fontColor = normalizeColor(data.fontColor || "") || "#ffffff";
    const fontFamily = normalizeFontChoice(data.fontFamily || "") || globalFontChoices[0].family;
    const tabTitle = String(data.tabTitle || "").trim();

    if (state.adminFontFamilySelect) {
      populateFontSelect(state.adminFontFamilySelect, fontFamily);
    }
    if (state.adminFontColorInput) {
      state.adminFontColorInput.value = fontColor;
    }
    if (state.adminFontColorTextInput) {
      state.adminFontColorTextInput.value = fontColor;
    }
    if (state.adminTabTitleInput && document.activeElement !== state.adminTabTitleInput) {
      state.adminTabTitleInput.value = tabTitle;
    }
  }

  function normalizeColor(value) {
    if (typeof value !== "string") {
      return "";
    }

    const trimmed = value.trim();
    return /^#[0-9a-fA-F]{6}$/.test(trimmed) ? trimmed : "";
  }

  function normalizeAssetPath(value) {
    const trimmed = String(value || "").trim();
    if (!trimmed) {
      return "";
    }

    if (/^(?:https?:|data:|blob:)/i.test(trimmed)) {
      return trimmed;
    }

    try {
      return new URL(trimmed, assetBaseHref || document.baseURI).href;
    } catch (error) {
      return trimmed;
    }
  }

  function getStoredPetState() {
    const saved = localStorage.getItem(petStateKey);
    if (!saved) {
      return {
        hatched: false,
        name: "",
        age: 0,
        hunger: 100,
        affection: 50,
        adventure: false,
        imageFile: null,
        image: "",
        lastActive: Date.now()
      };
    }

    try {
      return Object.assign(
        {
          hatched: false,
          name: "",
          age: 0,
          hunger: 100,
          affection: 50,
          adventure: false,
          imageFile: null,
          image: "",
          lastActive: Date.now()
        },
        JSON.parse(saved)
      );
    } catch (error) {
      console.warn("Failed to load shared pet state:", error);
      return {
        hatched: false,
        name: "",
        age: 0,
        hunger: 100,
        affection: 50,
        adventure: false,
        imageFile: null,
        image: "",
        lastActive: Date.now()
      };
    }
  }

  function saveSharedPetState(petState) {
    localStorage.setItem(petStateKey, JSON.stringify(petState));
    window.dispatchEvent(new CustomEvent("arcadyPetStateChanged"));
  }

  function applyCustomPetImage(source, statusTarget, statusMessage) {
    if (!source) {
      return;
    }

    const petState = getStoredPetState();
    petState.image = source;
    petState.imageFile = null;
    petState.hatched = true;
    petState.lastActive = Date.now();
    petState.name = petState.name || "Companion";

    saveSharedPetState(petState);
    if (typeof statusTarget === "function") {
      statusTarget(statusMessage || "Custom pet image applied.");
    }
  }

  function uploadCustomPetImage(isOwner) {
    const urlInput = isOwner ? state.ownerPetUploadUrlInput : state.adminPetUploadUrlInput;
    const fileInput = isOwner ? state.ownerPetUploadFileInput : state.adminPetUploadFileInput;
    const progressTarget = isOwner ? setOwnerStatus : setStatus;

    if (fileInput && fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      if (!file.type.startsWith("image/")) {
        progressTarget("Please select an image file.");
        return;
      }
      if (file.size > 3 * 1024 * 1024) {
        progressTarget("Upload a smaller image file (max 3 MB).");
        return;
      }

      const reader = new FileReader();
      reader.onload = function () {
        applyCustomPetImage(String(reader.result), progressTarget, isOwner ? "Custom pet uploaded." : "Custom pet uploaded.");
        if (fileInput) {
          fileInput.value = "";
        }
        if (urlInput) {
          urlInput.value = "";
        }
      };
      reader.onerror = function () {
        progressTarget("Failed to read the selected image file.");
      };
      reader.readAsDataURL(file);
      return;
    }

    const urlValue = urlInput ? urlInput.value.trim() : "";
    if (!urlValue) {
      progressTarget("Select a file or paste an image URL first.");
      return;
    }

    const resolvedImage = normalizeAssetPath(urlValue);
    if (!resolvedImage) {
      progressTarget("Enter a valid image URL or local path.");
      return;
    }

    applyCustomPetImage(resolvedImage, progressTarget, isOwner ? "Custom pet image updated." : "Custom pet image updated.");
    if (urlInput) {
      urlInput.value = "";
    }
  }

  function parseGenziySoundSource(source) {
    const text = String(source || "");
    const exportIndex = text.indexOf("export const sounds");
    if (exportIndex < 0) {
      return [];
    }

    const start = text.indexOf("[", exportIndex);
    const end = text.lastIndexOf("]");
    if (start < 0 || end < start) {
      return [];
    }

    try {
      const parsed = JSON.parse(text.slice(start, end + 1));
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.warn("Arcady could not parse Genziy sounds source:", error);
      return [];
    }
  }

  function buildGenziySoundFileReference(value) {
    const trimmed = String(value || "").trim();
    if (!trimmed) {
      return "";
    }

    if (/^(?:https?:|data:|blob:)/i.test(trimmed)) {
      return trimmed;
    }

    return remoteGenziySoundCdnBase + trimmed.replace(/^\/+/, "");
  }

  function escapeCssUrl(value) {
    return String(value || "")
      .replace(/\\/g, "\\\\")
      .replace(/"/g, '\\"')
      .replace(/\(/g, "\\(")
      .replace(/\)/g, "\\)");
  }

  function normalizeBackgroundFileReference(value) {
    const trimmed = String(value || "").trim();
    if (!trimmed) {
      return "";
    }

    if (/^(?:https?:|data:|blob:)/i.test(trimmed)) {
      return trimmed;
    }

    let normalized = trimmed
      .replace(/^\.?\/?features\/backgrounds-s\//i, "./features/backgrounds-s/")
      .replace(/^\.?\/?features\/backgrounds\//i, "./features/Backgrounds/")
      .replace(/^\.?\/?features\/special backgrounds\//i, "./features/Special Backgrounds/");

    if (normalized.indexOf("./") === 0) {
      return normalized;
    }
    if (normalized.indexOf("features/") === 0) {
      return "./" + normalized;
    }

    return normalized;
  }

  function normalizeSoundFileReference(value) {
    const trimmed = String(value || "").trim();
    if (!trimmed) {
      return "";
    }

    if (/^(?:https?:|data:|blob:)/i.test(trimmed)) {
      return trimmed;
    }

    let normalized = trimmed
      .replace(/^\.?\/?features\/mp3s\//i, "./features/Mp3s/")
      .replace(/^\.?\/?features\/Mp3s\//i, "./features/Mp3s/");

    if (normalized.indexOf("./") === 0) {
      return normalized;
    }
    if (normalized.indexOf("features/") === 0) {
      return "./" + normalized;
    }

    return normalized;
  }

  function getSoundOptionsBySource(source) {
    return String(source || "").trim().toLowerCase() === "genziy"
      ? state.genziySoundOptions
      : state.soundOptions;
  }

  function normalizeVideoFileReference(value) {
    const trimmed = String(value || "").trim();
    if (!trimmed) {
      return "";
    }

    if (/^(?:https?:|data:|blob:)/i.test(trimmed)) {
      return trimmed;
    }

    let normalized = trimmed
      .replace(/^\.?\/?features\/mp4s\//i, "./features/Mp4s/")
      .replace(/^\.?\/?features\/Mp4s\//i, "./features/Mp4s/");

    if (normalized.indexOf("./") === 0) {
      return normalized;
    }
    if (normalized.indexOf("features/") === 0) {
      return "./" + normalized;
    }

    return normalized;
  }

  function normalizeLiveTvFileReference(value) {
    const videoFile = normalizeVideoFileReference(value);
    const rawValue = String(value || "").trim();
    if (videoFile && videoFile !== rawValue) {
      return videoFile;
    }
    return normalizeMadnessFileReference(value);
  }

  function normalizeJumpscareFileReference(value) {
    const trimmed = String(value || "").trim();
    if (!trimmed) {
      return "";
    }

    if (/^(?:https?:|data:|blob:)/i.test(trimmed)) {
      return trimmed;
    }

    let normalized = trimmed
      .replace(/^\.?\/?features\/jumpscares\//i, "./features/jumpscares/")
      .replace(/^\.?\/?features\/Jumpscares\//i, "./features/jumpscares/");

    if (normalized.indexOf("./") === 0) {
      return normalized;
    }
    if (normalized.indexOf("features/") === 0) {
      return "./" + normalized;
    }

    return normalized;
  }

  function isLiveTvImageFile(value) {
    return /\.(?:gif|png|jpe?g|webp|avif|bmp|svg)$/i.test(String(value || "").trim());
  }

  function normalizeLiveTvEmbedUrl(value) {
    const trimmed = String(value || "").trim();
    if (!trimmed) {
      return "";
    }

    let parsed;
    try {
      parsed = new URL(trimmed, location.href);
    } catch (error) {
      return "";
    }

    const hostname = String(parsed.hostname || "").replace(/^www\./i, "").toLowerCase();
    let videoId = "";

    if (hostname === "youtu.be") {
      videoId = parsed.pathname.replace(/^\/+/, "").split("/")[0];
    } else if (hostname === "youtube.com" || hostname === "m.youtube.com" || hostname === "music.youtube.com") {
      if (/^\/watch$/i.test(parsed.pathname)) {
        videoId = parsed.searchParams.get("v") || "";
      } else if (/^\/embed\//i.test(parsed.pathname) || /^\/shorts\//i.test(parsed.pathname) || /^\/live\//i.test(parsed.pathname)) {
        videoId = parsed.pathname.split("/")[2] || "";
      }
    }

    videoId = String(videoId || "").trim();
    if (!/^[a-zA-Z0-9_-]{6,}$/.test(videoId)) {
      return "";
    }

    return "https://www.youtube.com/embed/" + videoId + "?autoplay=1&rel=0&modestbranding=1";
  }

  function formatLiveTvUrlLabel(value) {
    return normalizeLiveTvEmbedUrl(value) ? "YouTube Broadcast" : formatVideoLabel(value);
  }

  function normalizeCursorFileReference(value, type) {
    const trimmed = String(value || "").trim();
    if (!trimmed) {
      return "";
    }

    if (/^(?:https?:|data:|blob:)/i.test(trimmed)) {
      return trimmed;
    }

    const folder = String(type || "cursor").trim().toLowerCase() === "pointer" ? "pointer" : "cursor";
    let normalized = trimmed
      .replace(/^\.?\/?featues\/cursors\//i, "./features/cursors/")
      .replace(/^\.?\/?features\/cursors\//i, "./features/cursors/")
      .replace(/^\.?\/?cursors\//i, "./features/cursors/");

    if (normalized.indexOf("./features/cursors/") !== 0 && normalized.indexOf("./") !== 0) {
      if (normalized.indexOf(folder + "/") === 0) {
        normalized = "./features/cursors/" + normalized;
      } else if (normalized.indexOf("features/") === 0) {
        normalized = "./" + normalized;
      }
    }

    return normalized;
  }

  function normalizeMadnessFileReference(value) {
    const trimmed = String(value || "").trim();
    if (!trimmed) {
      return "";
    }

    if (/^(?:https?:|data:|blob:)/i.test(trimmed)) {
      return trimmed;
    }

    let normalized = trimmed
      .replace(/^\.?\/?features\/gifs\//i, "./features/gifs/")
      .replace(/^\.?\/?features\/Gifs\//i, "./features/gifs/");

    if (normalized.indexOf("./") === 0) {
      return normalized;
    }
    if (normalized.indexOf("features/") === 0) {
      return "./" + normalized;
    }

    return normalized;
  }

  function formatSoundLabel(file) {
    return decodeAssetDisplaySegment(file)
      .replace(/\.mp3$/i, "")
      .replace(/[_-]+/g, " ")
      .replace(/\s+/g, " ")
      .trim() || "Unnamed Sound";
  }

  function formatBackgroundLabel(file) {
    return decodeAssetDisplaySegment(file)
      .replace(/\.[a-z0-9]+$/i, "")
      .replace(/[_-]+/g, " ")
      .replace(/\s+/g, " ")
      .trim() || "Unnamed Background";
  }

  function formatCursorLabel(file) {
    return String(file || "")
      .split("/")
      .pop()
      .replace(/\.[a-z0-9]+$/i, "")
      .replace(/--(?:cursor|pointer)--.*$/i, "")
      .replace(/\s*animated$/i, "")
      .replace(/[_-]+/g, " ")
      .replace(/\s+/g, " ")
      .trim() || "Unnamed Cursor";
  }

  function formatMadnessLabel(file) {
    return decodeAssetDisplaySegment(file)
      .replace(/\.[a-z0-9]+$/i, "")
      .replace(/[_-]+/g, " ")
      .replace(/\s+/g, " ")
      .trim() || "Unnamed Froggy";
  }

  function formatVideoLabel(file) {
    return decodeAssetDisplaySegment(file)
      .replace(/\.[a-z0-9]+$/i, "")
      .replace(/[_-]+/g, " ")
      .replace(/\s+/g, " ")
      .trim() || "Unnamed Video";
  }

  function formatJumpscareLabel(file) {
    return decodeAssetDisplaySegment(file)
      .replace(/\.[a-z0-9]+$/i, "")
      .replace(/[_-]+/g, " ")
      .replace(/\s+/g, " ")
      .trim() || "Unnamed Jumpscare";
  }

  function decodeAssetDisplaySegment(value) {
    const trimmed = String(value || "").trim();
    if (!trimmed) {
      return "";
    }

    const withoutQuery = trimmed.split(/[?#]/)[0];
    const segment = withoutQuery.split("/").pop() || withoutQuery;
    try {
      return decodeURIComponent(segment);
    } catch (error) {
      return segment;
    }
  }

  function formatAssetFileName(file, fallback) {
    return decodeAssetDisplaySegment(file) || String(fallback || "").trim() || "file";
  }

  function normalizeDisplayLabel(value, fallback) {
    const trimmed = String(value || "").trim();
    if (!trimmed) {
      return String(fallback || "").trim();
    }

    try {
      return decodeURIComponent(trimmed);
    } catch (error) {
      return trimmed;
    }
  }

  function normalizeAnnouncementPosition(value) {
    const normalized = String(value || "").trim().toLowerCase();
    return ["top", "bottom"].includes(normalized) ? normalized : "bottom";
  }

  function normalizeMadnessMode(value) {
    const normalized = String(value || "").trim().toLowerCase();
    return ["rainfall", "popup", "swarm"].includes(normalized) ? normalized : "rainfall";
  }

  function normalizeScreenEffectMode(value) {
    const normalized = String(value || "").trim().toLowerCase();
    return ["shake", "glitch", "invert", "flip", "crazy", "blur", "grayscale"].includes(normalized) ? normalized : "shake";
  }

  function describeMadnessMode(value) {
    const mode = normalizeMadnessMode(value);
    if (mode === "popup") {
      return "Random Froggy Pop Up";
    }
    if (mode === "swarm") {
      return "Froggy Swarm";
    }
    return "Froggy Rainfall";
  }

  function describeScreenEffect(value) {
    const mode = normalizeScreenEffectMode(value);
    if (mode === "glitch") {
      return "Glitch Screen";
    }
    if (mode === "invert") {
      return "Color Invert";
    }
    if (mode === "flip") {
      return "Flip Screen";
    }
    if (mode === "crazy") {
      return "Crazy Screen";
    }
    if (mode === "blur") {
      return "Blur Screen";
    }
    if (mode === "grayscale") {
      return "Grayscale Screen";
    }
    return "Shake Screen";
  }

  function resolveAssetBaseHref() {
    const script = document.currentScript || document.querySelector('script[src*="features/admin/site-admin.js"]');
    const src = script && script.src ? script.src : "";

    if (src) {
      try {
        return new URL("../../", src).href;
      } catch (error) {
      }
    }

    try {
      return new URL("./", document.baseURI).href;
    } catch (error) {
      return document.baseURI || location.href;
    }
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function clampDurationMs(value, fallback) {
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) {
      return fallback;
    }
    return Math.max(3000, Math.min(120000, numeric));
  }

  function readableName(visitor) {
    return String(visitor && (visitor.nickname || visitor.username) || "Unnamed visitor").trim() || "Unnamed visitor";
  }

  function displayNameForVisitor(visitor) {
    const name = readableName(visitor);
    return name;
  }

  function relativeTime(timestamp) {
    const delta = Math.max(0, Date.now() - Number(timestamp || 0));
    if (delta < 5000) return "just now";
    if (delta < 60000) return Math.floor(delta / 1000) + "s ago";
    return Math.floor(delta / 60000) + "m ago";
  }

  function formatGrantExpiry(ts) {
    const t = Number(ts || 0);
    if (!t) {
      return "";
    }
    try {
      return new Date(t).toLocaleString([], {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit"
      });
    } catch (error) {
      return "";
    }
  }

  function syncOwnerFields() {
    if (state.adminAnnouncementDurationInput) {
      state.adminAnnouncementDurationInput.value = String(Math.round(state.settings.announcementDurationMs / 1000));
    }
    if (state.adminPollDurationInput) {
      state.adminPollDurationInput.value = String(Math.round(state.settings.pollDurationMs / 1000));
    }
    if (state.adminHomeNewsInput && document.activeElement !== state.adminHomeNewsInput) {
      state.adminHomeNewsInput.value = String(state.homepageNews && state.homepageNews.text || "");
    }
    if (state.adminWallColorInput && !state.adminWallColorInput.value) {
      state.adminWallColorInput.value = defaultWallOfFameColors[0];
    }
    if (state.adminWallColorTextInput && !state.adminWallColorTextInput.value) {
      state.adminWallColorTextInput.value = state.adminWallColorInput ? state.adminWallColorInput.value : defaultWallOfFameColors[0];
    }
    syncAdminThemeState(state.currentSiteState || {});
    if (state.ownerAnnouncementDurationInput) {
      state.ownerAnnouncementDurationInput.value = String(Math.round(state.settings.announcementDurationMs / 1000));
    }
    if (state.ownerPollDurationInput) {
      state.ownerPollDurationInput.value = String(Math.round(state.settings.pollDurationMs / 1000));
    }
    if (state.ownerBgImageSelect) {
      state.ownerBgImageSelect.innerHTML =
        '<option value="">Select a background image</option>' +
        state.backgroundOptions.map(function (background, index) {
          return '<option value="' + index + '">' + escapeHtml(background.label || background.file) + '</option>';
        }).join("");
    }
    if (state.ownerMadnessImageSelect) {
      const selectedMadnessFile = normalizeMadnessFileReference(state.ownerMadnessImageSelect.value || state.currentMadness.file || "");
      state.ownerMadnessImageSelect.innerHTML =
        '<option value="">Random Froggy</option>' +
        state.madnessAssets.map(function (asset) {
          return '<option value="' + escapeHtml(asset.file) + '">' + escapeHtml(asset.label) + '</option>';
        }).join("");
      state.ownerMadnessImageSelect.value = selectedMadnessFile || "";
    }
    if (state.ownerMadnessDurationInput && !state.ownerMadnessDurationInput.value) {
      state.ownerMadnessDurationInput.value = "12";
    }
    if (state.ownerWallColorInput && !state.ownerWallColorInput.value) {
      state.ownerWallColorInput.value = defaultWallOfFameColors[0];
    }
    if (state.ownerWallColorTextInput && !state.ownerWallColorTextInput.value) {
      state.ownerWallColorTextInput.value = state.ownerWallColorInput ? state.ownerWallColorInput.value : defaultWallOfFameColors[0];
    }
    if (state.ownerFontFamilySelect) {
      populateFontSelect(state.ownerFontFamilySelect, state.currentSiteState.fontFamily || globalFontChoices[0].family);
    }
    if (state.ownerFontColorInput && !state.ownerFontColorInput.value) {
      state.ownerFontColorInput.value = normalizeColor(state.currentSiteState.fontColor || "#ffffff") || "#ffffff";
    }
    if (state.ownerFontColorTextInput && !state.ownerFontColorTextInput.value) {
      state.ownerFontColorTextInput.value = normalizeColor(state.currentSiteState.fontColor || "#ffffff") || "#ffffff";
    }
    if (state.ownerTabTitleInput && document.activeElement !== state.ownerTabTitleInput) {
      state.ownerTabTitleInput.value = String(state.currentSiteState.tabTitle || "");
    }
    syncCursorControls();
    syncMadnessControls();
    syncScreenEffectControls();
    renderVideoBoards();
    renderLiveTvPanel();
    syncAdminWallOfFameState(state.wallOfFameEntries);
    syncOwnerWallOfFameState(state.wallOfFameEntries);
    renderOwnerAppeals();
    syncAdminPanelAccessUi();
  }

  async function sendOwnerAnnouncement() {
    if (!hasOwnerAccess() || !state.firebaseReady) {
      setOwnerStatus("Unlock owner and connect Firebase first.");
      return;
    }

    const message = state.ownerAnnouncementInput.value.trim();
    const image = normalizeAssetPath(state.ownerAnnouncementImageInput.value);
    const position = normalizeAnnouncementPosition(state.ownerAnnouncementPositionSelect.value);
    if (!message) {
      setOwnerStatus("Write an announcement before sending.");
      return;
    }

    await saveOwnerAnnouncementDuration();
    await state.rtdb.ref("arcadyAdmin/announcements/current").set({
      id: "announcement-" + Date.now(),
      message: message,
      image: image,
      position: position,
      authorName: readNickname() || "Owner",
      page: location.pathname,
      createdAt: Date.now()
    });

    state.ownerAnnouncementInput.value = "";
    state.ownerAnnouncementImageInput.value = "";
    setOwnerStatus("Announcement sent.");
  }

  async function closeOwnerAnnouncements() {
    if (!hasOwnerAccess() || !state.firebaseReady) {
      setOwnerStatus("Unlock owner and connect Firebase first.");
      return;
    }

    await state.rtdb.ref("arcadyAdmin/announcements/current").remove();
    await state.rtdb.ref("arcadyAdmin/commands/closeAnnouncementAt").set(Date.now());
    setOwnerStatus("Announcements closed.");
  }

  async function saveOwnerAnnouncementDuration() {
    if (!hasOwnerAccess() || !state.firebaseReady) {
      setOwnerStatus("Unlock owner and connect Firebase first.");
      return;
    }

    const durationMs = clampDurationMs(Number(state.ownerAnnouncementDurationInput.value || 0) * 1000, state.settings.announcementDurationMs);
    await state.rtdb.ref("arcadyAdmin/settings").update({
      announcementDurationMs: durationMs,
      updatedAt: Date.now()
    });
    setOwnerStatus("Announcement duration saved.");
  }

  async function pushOwnerColor() {
    if (!hasOwnerAccess() || !state.firebaseReady) {
      setOwnerStatus("Unlock owner and connect Firebase first.");
      return;
    }

    const color = normalizeColor(state.ownerBgColorTextInput.value);
    if (!color) {
      setOwnerStatus("Enter a valid hex color first.");
      return;
    }

    await state.rtdb.ref("arcadyAdmin/state").update({
      backgroundColor: color,
      backgroundImage: "",
      updatedAt: Date.now()
    });
    setOwnerStatus("Background color updated.");
  }

  async function pushOwnerFontStyle() {
    if (!hasOwnerAccess() || !state.firebaseReady) {
      setOwnerStatus("Unlock owner and connect Firebase first.");
      return;
    }

    const fontFamily = normalizeFontChoice(state.ownerFontFamilySelect && state.ownerFontFamilySelect.value);
    const fontColor = normalizeColor(state.ownerFontColorTextInput && state.ownerFontColorTextInput.value);
    if (!fontFamily) {
      setOwnerStatus("Pick a font first.");
      return;
    }
    if (!fontColor) {
      setOwnerStatus("Enter a valid font color first.");
      return;
    }

    await state.rtdb.ref("arcadyAdmin/state").update({
      fontFamily: fontFamily,
      fontColor: fontColor,
      updatedAt: Date.now()
    });
    setOwnerStatus("Global font style updated.");
  }

  async function resetOwnerFontFamilyToFredoka() {
    if (!hasOwnerAccess() || !state.firebaseReady) {
      setOwnerStatus("Unlock owner and connect Firebase first.");
      return;
    }

    const fredokaChoice = globalFontChoices.find(function (font) {
      return font.id === "fredoka";
    }) || globalFontChoices[0];

    await state.rtdb.ref("arcadyAdmin/state").update({
      fontFamily: fredokaChoice.family,
      updatedAt: Date.now()
    });

    if (state.ownerFontFamilySelect) {
      state.ownerFontFamilySelect.value = fredokaChoice.family;
    }
    setOwnerStatus("Font reset to Fredoka.");
  }

  async function pushOwnerTabTitle() {
    if (!hasOwnerAccess() || !state.firebaseReady) {
      setOwnerStatus("Unlock owner and connect Firebase first.");
      return;
    }

    const tabTitle = String(state.ownerTabTitleInput && state.ownerTabTitleInput.value || "").trim().slice(0, 80);
    await state.rtdb.ref("arcadyAdmin/state").update({
      tabTitle: tabTitle,
      updatedAt: Date.now()
    });
    setOwnerStatus(tabTitle ? 'Tab title set to "' + tabTitle + '".' : "Tab title reset to each page default.");
  }

  async function resetOwnerTabTitle() {
    if (!hasOwnerAccess() || !state.firebaseReady) {
      setOwnerStatus("Unlock owner and connect Firebase first.");
      return;
    }

    await state.rtdb.ref("arcadyAdmin/state").update({
      tabTitle: "",
      updatedAt: Date.now()
    });
    if (state.ownerTabTitleInput) {
      state.ownerTabTitleInput.value = "";
    }
    setOwnerStatus("Tab title reset.");
  }

  async function pushOwnerImage() {
    if (!hasOwnerAccess() || !state.firebaseReady) {
      setOwnerStatus("Unlock owner and connect Firebase first.");
      return;
    }

    const background = state.backgroundOptions[Number(state.ownerBgImageSelect.value)];
    if (!background || !background.file) {
      setOwnerStatus("Pick a background image first.");
      return;
    }

    await state.rtdb.ref("arcadyAdmin/state").update({
      backgroundColor: "#000000",
      backgroundImage: background.file,
      updatedAt: Date.now()
    });
    setOwnerStatus("Background image updated.");
  }

  async function revertOwnerBackground() {
    if (!hasOwnerAccess() || !state.firebaseReady) {
      setOwnerStatus("Unlock owner and connect Firebase first.");
      return;
    }

    await state.rtdb.ref("arcadyAdmin/state").update({
      backgroundColor: "#000000",
      backgroundImage: "",
      updatedAt: Date.now()
    });
    setOwnerStatus("Background reverted.");
  }

  async function sendOwnerPoll() {
    if (!hasOwnerAccess() || !state.firebaseReady) {
      setOwnerStatus("Unlock owner and connect Firebase first.");
      return;
    }

    const question = state.ownerPollQuestionInput.value.trim();
    const options = state.ownerPollOptionsInput.value.split("\n").map(function (item) {
      return item.trim();
    }).filter(Boolean).slice(0, 6);
    if (!question || options.length < 2) {
      setOwnerStatus("Add a poll question and at least two options.");
      return;
    }

    await saveOwnerPollDuration();
    await state.rtdb.ref("arcadyAdmin/polls/current").set({
      id: "poll-" + Date.now(),
      question: question,
      options: options,
      authorName: readNickname() || "Owner",
      active: true,
      createdAt: Date.now()
    });

    state.ownerPollQuestionInput.value = "";
    state.ownerPollOptionsInput.value = "";
    setOwnerStatus("Poll sent.");
  }

  async function closeOwnerPoll() {
    if (!hasOwnerAccess() || !state.firebaseReady) {
      setOwnerStatus("Unlock owner and connect Firebase first.");
      return;
    }

    await state.rtdb.ref("arcadyAdmin/polls/current").update({
      active: false,
      closedAt: Date.now()
    });
    setOwnerStatus("Poll closed.");
  }

  async function saveOwnerPollDuration() {
    if (!hasOwnerAccess() || !state.firebaseReady) {
      setOwnerStatus("Unlock owner and connect Firebase first.");
      return;
    }

    const durationMs = clampDurationMs(Number(state.ownerPollDurationInput.value || 0) * 1000, state.settings.pollDurationMs);
    await state.rtdb.ref("arcadyAdmin/settings").update({
      pollDurationMs: durationMs,
      updatedAt: Date.now()
    });
    setOwnerStatus("Poll duration saved.");
  }

  async function saveOwnerHomepageNews() {
    if (!hasOwnerAccess() || !state.firebaseReady) {
      setOwnerStatus("Unlock owner and connect Firebase first.");
      return;
    }

    const text = String(state.ownerHomeNewsInput && state.ownerHomeNewsInput.value || "").trim();
    if (!text) {
      setOwnerStatus("Write some news text first.");
      return;
    }

    await state.rtdb.ref("arcadyAdmin/homepageNews/current").set({
      text: text,
      authorName: readNickname() || "Owner",
      updatedAt: Date.now()
    });

    setOwnerStatus("Homepage news updated.");
  }

  async function clearOwnerHomepageNews() {
    if (!hasOwnerAccess() || !state.firebaseReady) {
      setOwnerStatus("Unlock owner and connect Firebase first.");
      return;
    }

    await state.rtdb.ref("arcadyAdmin/homepageNews/current").remove();
    if (state.ownerHomeNewsInput) {
      state.ownerHomeNewsInput.value = "";
    }
    setOwnerStatus("Homepage news cleared.");
  }

  async function saveOwnerWallOfFameEntries(entries, successMessage) {
    if (!hasOwnerAccess() || !state.firebaseReady) {
      setOwnerStatus("Unlock owner and connect Firebase first.");
      return false;
    }

    const normalizedEntries = normalizeWallOfFameEntries(entries);
    const wallRef = state.rtdb.ref("arcadyAdmin/homepageWallOfFame/current");
    if (!normalizedEntries.length) {
      await wallRef.remove();
      setOwnerStatus(successMessage || "Wall of Fame cleared.");
      return true;
    }

    await wallRef.set({
      entries: normalizedEntries,
      authorName: readNickname() || "Owner",
      updatedAt: Date.now()
    });
    setOwnerStatus(successMessage || "Wall of Fame updated.");
    return true;
  }

  async function addOwnerWallOfFameEntry() {
    if (!hasOwnerAccess() || !state.firebaseReady) {
      setOwnerStatus("Unlock owner and connect Firebase first.");
      return;
    }

    const rank = String(state.ownerWallRankInput && state.ownerWallRankInput.value || "").trim();
    const name = String(state.ownerWallNameInput && state.ownerWallNameInput.value || "").trim();
    const color = normalizeColor(state.ownerWallColorTextInput && state.ownerWallColorTextInput.value);

    if (!rank || !name) {
      setOwnerStatus("Add both a rank and a name first.");
      return;
    }

    if (!color) {
      setOwnerStatus("Enter a valid hex color first.");
      return;
    }

    const nextEntries = normalizeWallOfFameEntries(state.wallOfFameEntries).concat({
      id: "wall-entry-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8),
      rank: rank,
      name: name,
      color: color,
      createdAt: Date.now()
    });

    const saved = await saveOwnerWallOfFameEntries(nextEntries, "Wall of Fame entry added.");
    if (!saved) {
      return;
    }

    if (state.ownerWallRankInput) {
      state.ownerWallRankInput.value = "";
    }
    if (state.ownerWallNameInput) {
      state.ownerWallNameInput.value = "";
    }
  }

  async function clearOwnerWallOfFame() {
    await saveOwnerWallOfFameEntries([], "Wall of Fame cleared.");
  }

  async function removeOwnerWallOfFameEntry(entryId) {
    if (!entryId) {
      return;
    }

    const nextEntries = normalizeWallOfFameEntries(state.wallOfFameEntries).filter(function (entry) {
      return entry.id !== entryId;
    });
    await saveOwnerWallOfFameEntries(nextEntries, "Wall of Fame entry removed.");
  }

  async function moveOwnerWallOfFameEntry(entryId, direction) {
    if (!entryId || !direction) {
      return;
    }

    const nextEntries = normalizeWallOfFameEntries(state.wallOfFameEntries);
    const currentIndex = nextEntries.findIndex(function (entry) {
      return entry.id === entryId;
    });

    if (currentIndex < 0) {
      return;
    }

    const targetIndex = currentIndex + Number(direction);
    if (targetIndex < 0 || targetIndex >= nextEntries.length) {
      return;
    }

    const swapped = nextEntries.slice();
    const movedEntry = swapped[currentIndex];
    swapped[currentIndex] = swapped[targetIndex];
    swapped[targetIndex] = movedEntry;
    await saveOwnerWallOfFameEntries(swapped, "Wall of Fame order updated.");
  }

  async function ownerTemporaryBanByNickname() {
    if (!hasOwnerAccess() || !state.firebaseReady) {
      setOwnerStatus("Unlock owner and connect Firebase first.");
      return;
    }

    const nickname = String(state.ownerAdminNicknameInput && state.ownerAdminNicknameInput.value || "").trim();
    if (!nickname) {
      setOwnerStatus("Type a nickname first.");
      return;
    }

    const visitor = findKnownPersonByNickname(nickname);
    if (!visitor || !visitor.deviceId) {
      setOwnerStatus('No known visitor matched "' + nickname + '".');
      return;
    }

    const durSelect = document.getElementById("arcady-owner-temp-ban-duration");
    const ms = readModerationDurationMs(durSelect, 300000);
    await applyTemporarySiteBanForVisitor(visitor, ms, function (msg) {
      setOwnerStatus(msg);
    });
  }

  async function ownerGrantTemporaryAdminByNickname() {
    if (!hasOwnerAccess() || !state.firebaseReady) {
      setOwnerStatus("Unlock owner and connect Firebase first.");
      return;
    }

    const nickname = String(state.ownerAdminNicknameInput && state.ownerAdminNicknameInput.value || "").trim();
    if (!nickname) {
      setOwnerStatus("Type a nickname first.");
      return;
    }

    const visitor = findKnownPersonByNickname(nickname);
    if (!visitor || !visitor.deviceId) {
      setOwnerStatus('No known visitor matched "' + nickname + '".');
      return;
    }

    await grantTemporaryAdminForVisitor(visitor, function (msg) {
      setOwnerStatus(msg);
    });
  }

  async function grantAdminByNickname() {
    if (!hasOwnerAccess() || !state.firebaseReady) {
      setOwnerStatus("Unlock owner and connect Firebase first.");
      return;
    }

    const nickname = String(state.ownerAdminNicknameInput && state.ownerAdminNicknameInput.value || "").trim();
    if (!nickname) {
      setOwnerStatus("Type a nickname first.");
      return;
    }

    const visitor = findKnownPersonByNickname(nickname);
    if (!visitor || !visitor.deviceId) {
      setOwnerStatus('No known visitor matched "' + nickname + '".');
      return;
    }

    const role = normalizeAdminRole(state.ownerAdminRoleSelect && state.ownerAdminRoleSelect.value);
    await assignDeviceAdminRole(visitor.deviceId, role, visitor);

    if (state.ownerAdminNicknameInput) {
      state.ownerAdminNicknameInput.value = "";
    }
  }

  async function removeAdminByNickname() {
    if (!hasOwnerAccess() || !state.firebaseReady) {
      setOwnerStatus("Unlock owner and connect Firebase first.");
      return;
    }

    const nickname = String(state.ownerAdminNicknameInput && state.ownerAdminNicknameInput.value || "").trim();
    if (!nickname) {
      setOwnerStatus("Type a nickname first.");
      return;
    }

    const visitor = findKnownPersonByNickname(nickname);
    if (!visitor || !visitor.deviceId) {
      setOwnerStatus('No known visitor matched "' + nickname + '".');
      return;
    }

    if (!state.adminGrantMap[visitor.deviceId]) {
      setOwnerStatus('"' + (visitor.nickname || readableName(visitor)) + '" does not have a granted panel.');
      return;
    }

    await removeDeviceAdminRole(visitor.deviceId);

    if (state.ownerAdminNicknameInput) {
      state.ownerAdminNicknameInput.value = "";
    }
  }

  async function banUserByNickname() {
    if (!hasOwnerAccess() || !state.firebaseReady) {
      setOwnerStatus("Unlock owner and connect Firebase first.");
      return;
    }

    const nickname = String(state.ownerAdminNicknameInput && state.ownerAdminNicknameInput.value || "").trim();
    if (!nickname) {
      setOwnerStatus("Type a nickname first.");
      return;
    }

    const visitor = findKnownPersonByNickname(nickname);
    if (!visitor || !visitor.deviceId) {
      setOwnerStatus('No known visitor matched "' + nickname + '".');
      return;
    }

    if (isProtectedNickname(visitor.nickname || nickname) || isProtectedDevice(visitor.deviceId)) {
      setOwnerStatus('"' + (visitor.nickname || nickname) + '" is protected and cannot be banned.');
      return;
    }

    if (deviceHasActiveSiteBan(visitor.deviceId)) {
      setOwnerStatus('"' + (visitor.nickname || readableName(visitor)) + '" is already banned.');
      return;
    }

    await state.rtdb.ref("arcadyAdmin/bans/devices/" + visitor.deviceId).set({
      deviceId: visitor.deviceId,
      nickname: visitor.nickname || readableName(visitor),
      page: visitor.page || "",
      path: visitor.path || "",
      bannedAt: Date.now()
    });

    if (state.ownerAdminNicknameInput) {
      state.ownerAdminNicknameInput.value = "";
    }
    setOwnerStatus('Banned "' + (visitor.nickname || readableName(visitor)) + '".');
  }

  async function giveOwnerXp(mode) {
    if (!hasOwnerAccess() || !state.firebaseReady) {
      setOwnerStatus("Unlock owner and connect Firebase first.");
      return;
    }

    const amount = normalizeXpAmount(state.ownerXpAmountInput && state.ownerXpAmountInput.value);
    if (!amount) {
      setOwnerStatus("Enter an XP amount first.");
      return;
    }

    let targets = [];
    if (mode === "self") {
      targets = [{
        deviceId: state.deviceId,
        nickname: readPresenceNickname()
      }];
    } else if (mode === "nickname") {
      const nickname = String(state.ownerXpNicknameInput && state.ownerXpNicknameInput.value || "").trim();
      if (!nickname) {
        setOwnerStatus("Type a nickname for the specific XP target.");
        return;
      }

      const visitor = findKnownPersonByNickname(nickname);
      if (!visitor || !visitor.deviceId) {
        setOwnerStatus('No known visitor matched "' + nickname + '".');
        return;
      }
      targets = [visitor];
    } else {
      const targetMap = {};
      collectRecentVisitors(state.currentVisitors).forEach(function (visitor) {
        const deviceId = String(visitor.deviceId || "").trim();
        if (!deviceId) {
          return;
        }
        targetMap[deviceId] = {
          deviceId: deviceId,
          nickname: readableName(visitor)
        };
      });
      collectKnownXpProfiles().forEach(function (profile) {
        if (!profile.deviceId) {
          return;
        }
        targetMap[profile.deviceId] = {
          deviceId: profile.deviceId,
          nickname: profile.nickname
        };
      });
      targetMap[state.deviceId] = {
        deviceId: state.deviceId,
        nickname: readPresenceNickname()
      };
      targets = Object.keys(targetMap).map(function (deviceId) {
        return targetMap[deviceId];
      });
    }

    if (!targets.length) {
      setOwnerStatus("Nobody is available for XP right now.");
      return;
    }

    await Promise.all(targets.map(function (target) {
      return awardXpToDevice(target.deviceId, amount, "owner-grant", target.nickname);
    }));

    if (state.ownerXpNicknameInput && mode === "nickname") {
      state.ownerXpNicknameInput.value = "";
    }

    if (mode === "self") {
      setOwnerStatus("Added " + amount + " XP to yourself.");
    } else if (mode === "nickname") {
      setOwnerStatus("Added " + amount + " XP to that nickname.");
    } else {
      setOwnerStatus("Added " + amount + " XP to everyone currently known.");
    }
  }

  function maybeRequireNickname() {
    if (!state.nicknameOverlay) {
      return;
    }

    state.nicknameOverlay.classList.remove("is-visible");
  }

  function isHomePage() {
    const file = (location.pathname.split("/").pop() || "").toLowerCase();
    return !file || file === "index.html";
  }

  function saveNicknameFromPrompt() {
    if (!state.nicknameInput) {
      return;
    }
    const previousNickname = readNickname();
    const nickname = state.nicknameInput.value.trim().slice(0, 24);
    if (!nickname) {
      state.nicknameMessage.textContent = "Enter a nickname first.";
      return;
    }
    localStorage.setItem("arcadyVisitorNickname", nickname);
    window.dispatchEvent(new CustomEvent("arcady:nickname-change", {
      detail: { nickname: nickname }
    }));
    state.nicknameOverlay.classList.remove("is-visible");
    syncXpNickname(true);
    renderXpPanel();
    updatePresence(true);

    if (!previousNickname) {
      awardStoredXpOnce(localStorage, "arcadyXpNicknameSetReward", nicknameSetXpAmount, "nickname-set");
    }
  }

  function bindActivityTracking() {
    if (state.activityTrackingBound) {
      return;
    }
    state.activityTrackingBound = true;

    document.addEventListener("click", function (event) {
      const target = event.target && event.target.closest ? event.target.closest("button, a, input, select, textarea, iframe, [data-game], [role='button']") : null;
      if (!target) {
        return;
      }
      const label = describeTarget(target);
      state.lastActivity = {
        type: isGamePage() ? "play" : "click",
        label: label,
        at: Date.now()
      };
      updatePresence(true);
      state.lastClickXpAt = Date.now();
      state.sessionClickCount = Math.max(0, Number(state.sessionClickCount || 0) || 0) + 1;
      sessionStorage.setItem("arcadySessionClickCount", String(state.sessionClickCount));
      awardXpToDevice(state.deviceId, clickXpAmount, "click", readPresenceNickname());
      if (state.sessionClickCount % clickMilestoneCount === 0) {
        awardXpToDevice(state.deviceId, clickMilestoneXpAmount, "click-milestone", readPresenceNickname());
      }
    }, true);

    window.addEventListener("pageshow", function () {
      state.lastActivity = buildDefaultActivity();
      updatePresence(true);
    });
  }

  function describeTarget(target) {
    const text = String(
      target.getAttribute("data-game") ||
      target.getAttribute("aria-label") ||
      target.getAttribute("title") ||
      target.textContent ||
      target.value ||
      target.id ||
      target.tagName ||
      ""
    ).replace(/\s+/g, " ").trim().slice(0, 80);

    if (isGamePage()) {
      return text ? "Playing " + (document.title || text) + " • clicked " + text : "Playing " + (document.title || "a game");
    }

    return text ? "Clicked " + text : "Browsing " + (document.title || "Arcady");
  }

  window.ArcadyAdminApi = Object.assign(window.ArcadyAdminApi || {}, {
    openAdminPanel: function () { showPanel(); },
    openOwnerPanel: function () { showOwnerPanel(); },
    unlockAdminViaVault: function () {
      if (isAdminBlocked()) {
        setStatus("This device is blocked from the admin panel.");
        return false;
      }
      state.unlocked = true;
      sessionStorage.setItem("arcadyAdminUnlocked", "true");
      updateLauncherVisibility();
      // Removed showPanel() call to prevent opening full admin panel
      return true;
    },
    sendAnnouncement: function (message, image, position) {
      if (typeof state.announcementInput !== "undefined") {
        state.announcementInput.value = String(message || "").trim();
      }
      if (typeof state.adminAnnouncementImageInput !== "undefined") {
        state.adminAnnouncementImageInput.value = String(image || "").trim();
      }
      if (typeof state.adminAnnouncementPositionSelect !== "undefined") {
        state.adminAnnouncementPositionSelect.value = String(position || "bottom");
      }
      return sendAnnouncement();
    },
    sendPoll: function (question, options) {
      if (typeof state.pollQuestionInput !== "undefined") {
        state.pollQuestionInput.value = String(question || "").trim();
      }
      if (typeof state.pollOptionsInput !== "undefined") {
        state.pollOptionsInput.value = Array.isArray(options) ? options.join("\n") : String(options || "");
      }
      return sendPoll();
    },
    openSoundboard: function () {
      showPanel();
      return true;
    },
    renderSoundboard: function (container) {
      renderSoundboard(container, state.soundOptions, false, "default");
    }
  });
})();
