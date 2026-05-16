(function () {
  const runtimeConfig = window.ARCADY_ADMIN_FIREBASE || {};
  const firebaseConfig = runtimeConfig.firebaseConfig || {};
  const appName = "arcady-home-chat";
  const chatRootPath = "arcadyAdmin/homepageChat";
  const chatPath = chatRootPath + "/messages";
  const chatTypingPath = chatRootPath + "/typing";
  const nameTagsPath = chatRootPath + "/nameTags";
  const userNameTagsPath = chatRootPath + "/userNameTags";
  const chatBansDevicesPath = chatRootPath + "/bans/devices";
  const chatBansNicknamesPath = chatRootPath + "/bans/nicknames";
  const chatTimeoutsDevicesPath = chatRootPath + "/timeouts/devices";
  const xpUsersPath = "arcadyAdmin/xp/users";
  const adminGrantsPath = "arcadyAdmin/access/deviceAdmins";
  const manualMediaBaseUrl = "https://cdn.jsdelivr.net/gh/arcady-web/arcady-web.github.io@main/features/gifs/";
  const manualMediaLibrary = [
    { name: "67 Pigeon", fileName: "67 Pigeon.jpeg" },
    { name: "Are We Dead Ass", fileName: "Are We Dead Ass.jpeg" },
    { name: "Do We Care?", fileName: "Do We Care?.jpeg" },
    { name: "Froggy Distortion", fileName: "Froggy Distortion.png" },
    { name: "Froggy With A Game Controller", fileName: "Froggy With A Game Controller.png" },
    { name: "Froggy", fileName: "Froggy.png" },
    { name: "Gun Pointed Froggy", fileName: "Gun Pointed Froggy.png" },
    { name: "Is This Ragebait?", fileName: "Is This Ragebait?.jpeg" },
    { name: "Jordan Men's Sneakers", fileName: "Jordan Men's Sneakers.jpeg" },
    { name: "Js Typing Shi", fileName: "Js typing Shi.jpeg" },
    { name: "Oh My Fucking God BRO", fileName: "Oh my Fucking God BRO😭✌️.jpeg" },
    { name: "Ooze Dog", fileName: "Ooze Dog.png" },
    { name: "Speed Watches", fileName: "Speed Watches.jpeg" },
    { name: "That Was Not The Wind", fileName: "That Was Not The Wind.jpeg" },
    { name: "Son Im Crine", fileName: "Son Im Crine.png" },
    { name: "Silly Froggy", fileName: "Silly Froggy.jpg" },
    { name: "Froggy Getting Eaten", fileName: "Ooze Dog Eating Froggy.png" },
    { name: "Rabbit Wearing A Lion Face", fileName: "All Talk.jpg" },
  ];
  const slackmojisCatalogSource = "https://slackmojis.com/";
  const slackmojisCatalog = [
    { name: "finish flag", url: "https://emojis.slackmojis.com/emojis/images/1621351482/39807/finish_flag.png" },
    { name: "blob smiley", url: "https://emojis.slackmojis.com/emojis/images/1643514689/6917/blob_smiley.png" },
    { name: "audi", url: "https://emojis.slackmojis.com/emojis/images/1742928810/117797/audi.png" },
    { name: "bmw1", url: "https://emojis.slackmojis.com/emojis/images/1714935491/92523/bmw1.png" },
    { name: "alert", url: "https://emojis.slackmojis.com/emojis/images/1643514276/2453/alert.gif" },
    { name: "typingcat", url: "https://emojis.slackmojis.com/emojis/images/1643514738/7421/typingcat.gif" },
    { name: "mic drop", url: "https://emojis.slackmojis.com/emojis/images/1643514517/5058/mic-drop.gif" },
    { name: "meow party", url: "https://emojis.slackmojis.com/emojis/images/1643514596/5999/meow_party.gif" },
    { name: "bugs bunny", url: "https://emojis.slackmojis.com/emojis/images/1646114802/54652/bugs_bunny.png" },
    { name: "excuseme", url: "https://emojis.slackmojis.com/emojis/images/1643514897/9116/excuseme.gif" },
    { name: "loading", url: "https://emojis.slackmojis.com/emojis/images/1711570900/91597/loading.gif" },
    { name: "dumpster fire", url: "https://emojis.slackmojis.com/emojis/images/1643514620/6248/dumpster-fire.gif" },
    { name: "thankyou", url: "https://emojis.slackmojis.com/emojis/images/1643514318/2905/thankyou.gif" },
    { name: "postman", url: "https://emojis.slackmojis.com/emojis/images/1744901774/119845/postman.png" },
    { name: "openapi", url: "https://emojis.slackmojis.com/emojis/images/1681900279/65279/openapi.png" },
    { name: "chefs kiss", url: "https://emojis.slackmojis.com/emojis/images/1643512792/50413/chefs-kiss.gif" },
    { name: "blob highfive", url: "https://emojis.slackmojis.com/emojis/images/1643514684/6863/blob_highfive.png" },
    { name: "winter", url: "https://emojis.slackmojis.com/emojis/images/1643516501/25373/winter.gif" },
    { name: "huh", url: "https://emojis.slackmojis.com/emojis/images/1699659569/74744/huh.gif" },
    { name: "let me in", url: "https://emojis.slackmojis.com/emojis/images/1643514581/5805/let_me_in.gif" },
    { name: "crycat", url: "https://emojis.slackmojis.com/emojis/images/1643514761/7692/crycat.png" },
    { name: "blinkingguy", url: "https://emojis.slackmojis.com/emojis/images/1643514784/7942/blinkingguy.gif" },
    { name: "thisisfine", url: "https://emojis.slackmojis.com/emojis/images/1643512754/51021/thisisfine.gif" },
    { name: "conceit", url: "https://emojis.slackmojis.com/emojis/images/1643514922/9402/conceit.png" },
    { name: "facepalm", url: "https://emojis.slackmojis.com/emojis/images/1643514046/51/facepalm.png" },
    { name: "meow code", url: "https://emojis.slackmojis.com/emojis/images/1643515023/10521/meow_code.gif" },
    { name: "meow coffeespitting", url: "https://emojis.slackmojis.com/emojis/images/1643515239/12569/meow_coffeespitting.gif" },
    { name: "meow noddies", url: "https://emojis.slackmojis.com/emojis/images/1643508806/46775/meow_noddies.gif" },
    { name: "partyparrot", url: "https://emojis.slackmojis.com/emojis/images/1643514742/7500/partyparrot.gif" },
    { name: "cat confused", url: "https://emojis.slackmojis.com/emojis/images/1643514724/7294/cat_confused.png" },
    { name: "meow heart bongo", url: "https://emojis.slackmojis.com/emojis/images/1643515241/12597/meow_heart_bongo.gif" },
    { name: "blob wave", url: "https://emojis.slackmojis.com/emojis/images/1643514476/4594/blob-wave.gif" },
    { name: "meow knife", url: "https://emojis.slackmojis.com/emojis/images/1643514598/6021/meow_knife.png" },
    { name: "thinking blob intensifies", url: "https://emojis.slackmojis.com/emojis/images/1643515192/12066/thinking-blob-intensifies.gif" },
    { name: "blob clap", url: "https://emojis.slackmojis.com/emojis/images/1643514441/4229/blob-clap.gif" },
    { name: "blob dancer", url: "https://emojis.slackmojis.com/emojis/images/1643514441/4231/blob-dancer.gif" },
    { name: "allo shocked", url: "https://emojis.slackmojis.com/emojis/images/1643514294/2651/allo-shocked.gif" },
    { name: "blob hearts", url: "https://emojis.slackmojis.com/emojis/images/1643514442/4240/blob-hearts.gif" },
    { name: "allo crying", url: "https://emojis.slackmojis.com/emojis/images/1643514294/2652/allo-crying.gif" },
    { name: "allo love", url: "https://emojis.slackmojis.com/emojis/images/1643514294/2650/allo-love.gif" },
    { name: "seattle mariners", url: "https://emojis.slackmojis.com/emojis/images/1775880239/138530/seattle-mariners.png" },
    { name: "mariners", url: "https://emojis.slackmojis.com/emojis/images/1775880108/138529/mariners.png" },
    { name: "healing potion", url: "https://emojis.slackmojis.com/emojis/images/1775864183/138528/healing_potion.gif" },
    { name: "200px h3 medal overkill", url: "https://emojis.slackmojis.com/emojis/images/1775856087/138527/200px-h3_medal_overkill.png" },
    { name: "h3 medal triple kill", url: "https://emojis.slackmojis.com/emojis/images/1775855968/138526/h3_medal_triple_kill.png" },
    { name: "old man yells at databricks", url: "https://emojis.slackmojis.com/emojis/images/1775839344/138525/old-man-yells-at-databricks.png" },
    { name: "afro man", url: "https://emojis.slackmojis.com/emojis/images/1775839287/138524/afro_man.png" },
    { name: "gunfingers", url: "https://emojis.slackmojis.com/emojis/images/1775838270/138523/gunfingers.jpg" },
    { name: "pi agent", url: "https://emojis.slackmojis.com/emojis/images/1775830082/138522/pi-agent.png" },
    { name: "pizzatime", url: "https://emojis.slackmojis.com/emojis/images/1775829720/138521/pizzatime.gif" },
    { name: "jedi", url: "https://emojis.slackmojis.com/emojis/images/1775828872/138520/jedi.gif" },
    { name: "temazo", url: "https://emojis.slackmojis.com/emojis/images/1775822939/138519/temazo.jpg" },
    { name: "fat chocobo", url: "https://emojis.slackmojis.com/emojis/images/1775805204/138491/fat_chocobo.gif" },
    { name: "positron logo", url: "https://emojis.slackmojis.com/emojis/images/1775773417/138490/positron-logo.png" },
    { name: "woman shrugsidedown", url: "https://emojis.slackmojis.com/emojis/images/1775771173/138489/woman-shrugsidedown.png" },
    { name: "man shrugsidedown", url: "https://emojis.slackmojis.com/emojis/images/1775771158/138488/man-shrugsidedown.png" },
    { name: "monday intensifies", url: "https://emojis.slackmojis.com/emojis/images/1775766756/138487/monday-intensifies.gif" },
    { name: "img 0327", url: "https://emojis.slackmojis.com/emojis/images/1775762396/138486/img_0327.png" },
    { name: "screenshot2026 04 09150349", url: "https://emojis.slackmojis.com/emojis/images/1775761450/138485/screenshot2026-04-09150349.png" },
    { name: "valeriecherish", url: "https://emojis.slackmojis.com/emojis/images/1775758447/138484/valeriecherish.png" },
    { name: "slack", url: "https://emojis.slackmojis.com/emojis/images/1643514526/5206/slack.png" },
    { name: "extreme teamwork", url: "https://emojis.slackmojis.com/emojis/images/1692206783/67533/extreme-teamwork.gif" },
    { name: "mild panic intensifies", url: "https://emojis.slackmojis.com/emojis/images/1643515192/12068/mild-panic-intensifies.gif" },
    { name: "done", url: "https://emojis.slackmojis.com/emojis/images/1643514571/5707/done.jpg" },
    { name: "keanu thanks", url: "https://emojis.slackmojis.com/emojis/images/1643515048/10777/keanu-thanks.gif" },
    { name: "aww thanksq", url: "https://emojis.slackmojis.com/emojis/images/1711577053/91745/aww_thanksq.png" },
    { name: "jul", url: "https://emojis.slackmojis.com/emojis/images/1643514607/6103/jul.png" },
    { name: "10 10", url: "https://emojis.slackmojis.com/emojis/images/1643516952/30075/10_10.png" },
    { name: "smart", url: "https://emojis.slackmojis.com/emojis/images/1687735546/66769/smart.gif" },
    { name: "plus1", url: "https://emojis.slackmojis.com/emojis/images/1643514528/5229/plus1.png" },
    { name: "sisyphus", url: "https://emojis.slackmojis.com/emojis/images/1643511198/49769/sisyphus.png" },
    { name: "shaking fist dark mode", url: "https://emojis.slackmojis.com/emojis/images/1643514968/9947/shaking-fist-dark-mode.gif" },
    { name: "thanks", url: "https://emojis.slackmojis.com/emojis/images/1643514573/5723/thanks.png" },
    { name: "cool doge", url: "https://emojis.slackmojis.com/emojis/images/1643514389/3643/cool-doge.gif" },
    { name: "merged", url: "https://emojis.slackmojis.com/emojis/images/1643514334/3071/merged.png" },
    { name: "troll", url: "https://emojis.slackmojis.com/emojis/images/1643514086/429/troll.png" },
    { name: "rage", url: "https://emojis.slackmojis.com/emojis/images/1643514085/424/rage.jpg" },
    { name: "take my money", url: "https://emojis.slackmojis.com/emojis/images/1643514048/65/take_my_money.png" },
    { name: "homer disappear", url: "https://emojis.slackmojis.com/emojis/images/1643514065/211/homer-disappear.gif" },
    { name: "success", url: "https://emojis.slackmojis.com/emojis/images/1643514093/516/success.png" },
    { name: "stonks", url: "https://emojis.slackmojis.com/emojis/images/1643514890/9036/stonks.png" },
    { name: "coffin dance", url: "https://emojis.slackmojis.com/emojis/images/1643514843/8558/coffin_dance.gif" },
    { name: "nyancat big", url: "https://emojis.slackmojis.com/emojis/images/1643514062/184/nyancat_big.gif" },
    { name: "fry", url: "https://emojis.slackmojis.com/emojis/images/1643514048/63/fry.png" },
    { name: "the more you know", url: "https://emojis.slackmojis.com/emojis/images/1643514046/52/the_more_you_know.gif" },
    { name: "meow attention", url: "https://emojis.slackmojis.com/emojis/images/1660853767/60881/meow_attention.gif" },
    { name: "meow adorable", url: "https://emojis.slackmojis.com/emojis/images/1643515456/14767/meow_adorable.png" },
    { name: "meow popcorn", url: "https://emojis.slackmojis.com/emojis/images/1643514637/6412/meow_popcorn.gif" },
    { name: "meow checkmark", url: "https://emojis.slackmojis.com/emojis/images/1643515474/14957/meow_checkmark.png" },
    { name: "meow coffee", url: "https://emojis.slackmojis.com/emojis/images/1643514598/6016/meow_coffee.png" },
    { name: "meow heart", url: "https://emojis.slackmojis.com/emojis/images/1643514958/9845/meow_heart.png" },
    { name: "meow shocked", url: "https://emojis.slackmojis.com/emojis/images/1643514599/6025/meow_shocked.png" },
    { name: "meow peek", url: "https://emojis.slackmojis.com/emojis/images/1643514599/6023/meow_peek.png" },
    { name: "fast meow party", url: "https://emojis.slackmojis.com/emojis/images/1643514853/8661/fast_meow_party.gif" },
    { name: "kirbypansq", url: "https://emojis.slackmojis.com/emojis/images/1697905348/71352/kirbypansq.gif" },
    { name: "blob beers", url: "https://emojis.slackmojis.com/emojis/images/1643514441/4225/blob-beers.gif" },
    { name: "blob fire drill", url: "https://emojis.slackmojis.com/emojis/images/1681336875/65192/blob-fire-drill.gif" },
    { name: "blob heartbreak", url: "https://emojis.slackmojis.com/emojis/images/1643514442/4238/blob-heartbreak.gif" },
    { name: "blob bee", url: "https://emojis.slackmojis.com/emojis/images/1643514440/4224/blob-bee.gif" },
    { name: "party blob", url: "https://emojis.slackmojis.com/emojis/images/1643514525/5197/party_blob.gif" },
    { name: "blob yes", url: "https://emojis.slackmojis.com/emojis/images/1643514545/5431/blob-yes.png" },
    { name: "pokeball", url: "https://emojis.slackmojis.com/emojis/images/1643514062/186/pokeball.png" },
    { name: "surprised pikachu", url: "https://emojis.slackmojis.com/emojis/images/1643514566/5641/surprised-pikachu.png" },
    { name: "squirtle cool", url: "https://emojis.slackmojis.com/emojis/images/1643516154/21789/squirtle_cool.gif" },
    { name: "shocked pikachu", url: "https://emojis.slackmojis.com/emojis/images/1659363070/60407/shocked_pikachu.gif" },
    { name: "squirtle jammin", url: "https://emojis.slackmojis.com/emojis/images/1666364400/61854/squirtle_jammin.gif" },
    { name: "3dpokeball q", url: "https://emojis.slackmojis.com/emojis/images/1698286405/71830/3dpokeball_q.png" },
    { name: "snorlax", url: "https://emojis.slackmojis.com/emojis/images/1643514067/233/snorlax.png" },
    { name: "pikachu", url: "https://emojis.slackmojis.com/emojis/images/1643514062/182/pikachu.gif" },
    { name: "psyduck", url: "https://emojis.slackmojis.com/emojis/images/1643514068/241/psyduck.png" },
    { name: "charmander shiny", url: "https://emojis.slackmojis.com/emojis/images/1643517237/32756/charmander_shiny.gif" },
    { name: "gengar", url: "https://emojis.slackmojis.com/emojis/images/1643515208/12257/gengar.png" },
    { name: "pikachu", url: "https://emojis.slackmojis.com/emojis/images/1643514067/238/pikachu.png" },
    { name: "eevee", url: "https://emojis.slackmojis.com/emojis/images/1643514171/1363/eevee.gif" },
    { name: "snorlaxrun", url: "https://emojis.slackmojis.com/emojis/images/1695790529/69768/snorlaxrun.gif" },
    { name: "charmander dancing", url: "https://emojis.slackmojis.com/emojis/images/1643514108/679/charmander_dancing.gif" },
    { name: "bulbasaur", url: "https://emojis.slackmojis.com/emojis/images/1643514067/234/bulbasaur.png" },
    { name: "southwest", url: "https://emojis.slackmojis.com/emojis/images/1643514739/7437/southwest.png" },
    { name: "terraform", url: "https://emojis.slackmojis.com/emojis/images/1643514243/2116/terraform.png" },
    { name: "intellij idea", url: "https://emojis.slackmojis.com/emojis/images/1643514219/1851/intellij_idea.png" },
    { name: "stripe", url: "https://emojis.slackmojis.com/emojis/images/1643514105/638/stripe.png" },
    { name: "google", url: "https://emojis.slackmojis.com/emojis/images/1643514063/195/google.png" },
    { name: "google drive", url: "https://emojis.slackmojis.com/emojis/images/1643515090/11146/google_drive.png" },
    { name: "kotlin", url: "https://emojis.slackmojis.com/emojis/images/1643514266/2351/kotlin.png" },
    { name: "clojure", url: "https://emojis.slackmojis.com/emojis/images/1643514081/378/clojure.gif" },
    { name: "scala", url: "https://emojis.slackmojis.com/emojis/images/1643514219/1857/scala.png" },
    { name: "nodejs", url: "https://emojis.slackmojis.com/emojis/images/1643514460/4425/nodejs.png" },
    { name: "typescript", url: "https://emojis.slackmojis.com/emojis/images/1643514173/1383/typescript.png" },
    { name: "nike", url: "https://emojis.slackmojis.com/emojis/images/1643514220/1866/nike.png" },
    { name: "spotify", url: "https://emojis.slackmojis.com/emojis/images/1643514045/41/spotify.png" },
    { name: "facebook", url: "https://emojis.slackmojis.com/emojis/images/1643514044/34/facebook.png" },
    { name: "starbucks", url: "https://emojis.slackmojis.com/emojis/images/1643514048/66/starbucks.png" },
    { name: "steam", url: "https://emojis.slackmojis.com/emojis/images/1643514162/1238/steam.png" },
    { name: "60fps parrot", url: "https://emojis.slackmojis.com/emojis/images/1643514977/10031/60fps_parrot.gif" },
    { name: "hyperfastparrot", url: "https://emojis.slackmojis.com/emojis/images/1643514670/6723/hyperfastparrot.gif" },
    { name: "headbanging parrot", url: "https://emojis.slackmojis.com/emojis/images/1643514981/10080/headbanging_parrot.gif" },
    { name: "this fine parrot", url: "https://emojis.slackmojis.com/emojis/images/1643516570/26099/this_fine_parrot.gif" },
    { name: "deal with it now parrot", url: "https://emojis.slackmojis.com/emojis/images/1643514980/10061/deal_with_it_now_parrot.gif" },
    { name: "cop parrot", url: "https://emojis.slackmojis.com/emojis/images/1643514979/10053/cop_parrot.gif" },
    { name: "bob ross parrot", url: "https://emojis.slackmojis.com/emojis/images/1643514978/10042/bob_ross_parrot.gif" },
    { name: "beer parrot", url: "https://emojis.slackmojis.com/emojis/images/1643514978/10036/beer_parrot.gif" },
    { name: "ultra fast parrot", url: "https://emojis.slackmojis.com/emojis/images/1643514989/10160/ultra_fast_parrot.gif" },
    { name: "bunny parrot", url: "https://emojis.slackmojis.com/emojis/images/1643514979/10048/bunny_parrot.gif" },
    { name: "fast parrot", url: "https://emojis.slackmojis.com/emojis/images/1643514139/981/fast_parrot.gif" },
    { name: "bouncing parrot", url: "https://emojis.slackmojis.com/emojis/images/1643514978/10044/bouncing_parrot.gif" },
    { name: "maracas parrot", url: "https://emojis.slackmojis.com/emojis/images/1643514983/10099/maracas_parrot.gif" },
    { name: "backwards parrot", url: "https://emojis.slackmojis.com/emojis/images/1643514977/10035/backwards_parrot.gif" },
    { name: "beret parrot", url: "https://emojis.slackmojis.com/emojis/images/1643514978/10037/beret_parrot.gif" },
    { name: "old man yells at cloud", url: "https://emojis.slackmojis.com/emojis/images/1652479487/59042/old-man-yells-at-cloud.png" },
    { name: "old man yells at claude", url: "https://emojis.slackmojis.com/emojis/images/1765209251/133277/old-man-yells-at-claude.png" },
    { name: "old man yells at chatgpt", url: "https://emojis.slackmojis.com/emojis/images/1683754536/66181/old-man-yells-at-chatgpt.png" },
    { name: "old man yells at claude", url: "https://emojis.slackmojis.com/emojis/images/1769443272/135719/old-man-yells-at-claude.png" },
    { name: "old man yells at salesforce", url: "https://emojis.slackmojis.com/emojis/images/1643509590/49772/old-man-yells-at-salesforce.png" },
    { name: "old man yells at gitlab 2", url: "https://emojis.slackmojis.com/emojis/images/1621491271/40485/old-man-yells-at-gitlab-2.png" },
    { name: "old man yells at slack", url: "https://emojis.slackmojis.com/emojis/images/1643515416/14362/old_man_yells_at_slack.png" },
    { name: "old man yells at cursor", url: "https://emojis.slackmojis.com/emojis/images/1746719022/121261/old-man-yells-at-cursor.png" },
    { name: "old man yells at cloud", url: "https://emojis.slackmojis.com/emojis/images/1643514342/3163/old-man-yells-at-cloud.png" },
    { name: "old man yells at github", url: "https://emojis.slackmojis.com/emojis/images/1643515235/12529/old_man_yells_at_github.png" },
    { name: "old man yells at nothing", url: "https://emojis.slackmojis.com/emojis/images/1771353475/136564/old-man-yells-at-nothing.png" },
    { name: "old man yells at openai", url: "https://emojis.slackmojis.com/emojis/images/1771354248/136565/old-man-yells-at-openai.png" },
    { name: "old man yells at medium", url: "https://emojis.slackmojis.com/emojis/images/1708469263/89523/old-man-yells-at-medium.gif" },
    { name: "old man yells at cloudflare", url: "https://emojis.slackmojis.com/emojis/images/1656092299/59795/old-man-yells-at-cloudflare.png" },
    { name: "old man yells at codex", url: "https://emojis.slackmojis.com/emojis/images/1771370557/136570/old-man-yells-at-codex.png" },
    { name: "old man yells at hex", url: "https://emojis.slackmojis.com/emojis/images/1770302320/136078/old-man-yells-at-hex.png" },
    { name: "ghost", url: "https://emojis.slackmojis.com/emojis/images/1643514123/825/ghost.gif" },
    { name: "fistbump", url: "https://emojis.slackmojis.com/emojis/images/1643514122/821/fistbump.gif" },
    { name: "tumbleweed", url: "https://emojis.slackmojis.com/emojis/images/1643514136/949/tumbleweed.gif" },
    { name: "nerd", url: "https://emojis.slackmojis.com/emojis/images/1643514129/883/nerd.gif" },
    { name: "brb", url: "https://emojis.slackmojis.com/emojis/images/1643514118/775/brb.gif" },
    { name: "computerrage", url: "https://emojis.slackmojis.com/emojis/images/1643514120/793/computerrage.gif" },
    { name: "clapping", url: "https://emojis.slackmojis.com/emojis/images/1643514119/790/clapping.gif" },
    { name: "emo", url: "https://emojis.slackmojis.com/emojis/images/1643514122/812/emo.gif" },
    { name: "facepalm", url: "https://emojis.slackmojis.com/emojis/images/1643514122/815/facepalm.gif" },
    { name: "headbang", url: "https://emojis.slackmojis.com/emojis/images/1643514124/836/headbang.gif" },
    { name: "shake", url: "https://emojis.slackmojis.com/emojis/images/1643514132/914/shake.gif" },
    { name: "whew", url: "https://emojis.slackmojis.com/emojis/images/1643514137/960/whew.gif" },
    { name: "goodluck", url: "https://emojis.slackmojis.com/emojis/images/1643514123/829/goodluck.gif" },
    { name: "turkey", url: "https://emojis.slackmojis.com/emojis/images/1643514136/950/turkey.gif" },
    { name: "xmastree", url: "https://emojis.slackmojis.com/emojis/images/1643514138/968/xmastree.gif" },
    { name: "holi", url: "https://emojis.slackmojis.com/emojis/images/1643514125/845/holi.gif" },
    { name: "scary squidward", url: "https://emojis.slackmojis.com/emojis/images/1707333586/89226/scary_squidward.png" },
    { name: "spongebob1q", url: "https://emojis.slackmojis.com/emojis/images/1701141265/77799/spongebob1q.gif" },
    { name: "patrickboo", url: "https://emojis.slackmojis.com/emojis/images/1693457365/67868/patrickboo.jpg" },
    { name: "spongebobbing", url: "https://emojis.slackmojis.com/emojis/images/1643514411/3888/spongebobbing.gif" },
    { name: "spongebobcaveman", url: "https://emojis.slackmojis.com/emojis/images/1707691034/89277/spongebobcaveman.png" },
    { name: "squidward", url: "https://emojis.slackmojis.com/emojis/images/1626096685/47388/squidward.jpg" },
    { name: "spongebob", url: "https://emojis.slackmojis.com/emojis/images/1643515563/15832/spongebob.gif" },
    { name: "spongebob mock", url: "https://emojis.slackmojis.com/emojis/images/1643514271/2405/spongebob-mock.png" },
    { name: "patrick hubbing hands", url: "https://emojis.slackmojis.com/emojis/images/1762459725/132021/patrick-hubbing-hands.gif" },
    { name: "spongebobcryq", url: "https://emojis.slackmojis.com/emojis/images/1703238026/83580/spongebobcryq.png" },
    { name: "spongebob fire", url: "https://emojis.slackmojis.com/emojis/images/1684416953/66336/spongebob-fire.gif" },
    { name: "01 patrickq", url: "https://emojis.slackmojis.com/emojis/images/1703237550/83545/01_patrickq.gif" },
    { name: "spongebobwtf", url: "https://emojis.slackmojis.com/emojis/images/1643514253/2220/spongebobwtf.jpg" },
    { name: "patrick yay", url: "https://emojis.slackmojis.com/emojis/images/1643514806/8209/patrick-yay.png" },
    { name: "christmas spongebob", url: "https://emojis.slackmojis.com/emojis/images/1733415807/107437/christmas-spongebob.gif" },
    { name: "st patricks day", url: "https://emojis.slackmojis.com/emojis/images/1676949745/64255/st-patricks-day.gif" },
    { name: "sonic", url: "https://emojis.slackmojis.com/emojis/images/1643514058/149/sonic.gif" },
    { name: "kirby pink", url: "https://emojis.slackmojis.com/emojis/images/1643515460/14805/kirby_pink.gif" },
    { name: "kirby dance", url: "https://emojis.slackmojis.com/emojis/images/1643515233/12510/kirby_dance.gif" },
    { name: "star", url: "https://emojis.slackmojis.com/emojis/images/1643514230/1972/star.gif" },
    { name: "supersonic", url: "https://emojis.slackmojis.com/emojis/images/1643515319/13390/supersonic.gif" },
    { name: "question", url: "https://emojis.slackmojis.com/emojis/images/1643514045/46/question.gif" },
    { name: "kirby vibing", url: "https://emojis.slackmojis.com/emojis/images/1643515157/11711/kirby_vibing.gif" },
    { name: "kirby jam", url: "https://emojis.slackmojis.com/emojis/images/1643516033/20573/kirby_jam.gif" },
    { name: "coin", url: "https://emojis.slackmojis.com/emojis/images/1643514229/1971/coin.gif" },
    { name: "kirby", url: "https://emojis.slackmojis.com/emojis/images/1643514060/162/kirby.gif" },
    { name: "kirby hammer", url: "https://emojis.slackmojis.com/emojis/images/1643516364/24014/kirby-hammer.gif" },
    { name: "link run", url: "https://emojis.slackmojis.com/emojis/images/1643514087/452/link-run.gif" },
    { name: "sonic dance", url: "https://emojis.slackmojis.com/emojis/images/1643514061/176/sonic-dance.gif" },
    { name: "angry kirby", url: "https://emojis.slackmojis.com/emojis/images/1643515293/13130/angry_kirby.png" },
    { name: "hadouken", url: "https://emojis.slackmojis.com/emojis/images/1643514043/25/hadouken.jpeg" },
    { name: "jedi kirby", url: "https://emojis.slackmojis.com/emojis/images/1643516930/29854/jedi_kirby.gif" },
    { name: "mario luigi dance", url: "https://emojis.slackmojis.com/emojis/images/1643514230/1973/mario_luigi_dance.gif" },
    { name: "mario", url: "https://emojis.slackmojis.com/emojis/images/1643514066/226/mario.gif" },
    { name: "toad scream", url: "https://emojis.slackmojis.com/emojis/images/1671122400/63244/toad-scream.gif" },
    { name: "yoshi", url: "https://emojis.slackmojis.com/emojis/images/1643514058/144/yoshi.gif" },
    { name: "powerup", url: "https://emojis.slackmojis.com/emojis/images/1643514066/227/powerup.gif" },
    { name: "1up", url: "https://emojis.slackmojis.com/emojis/images/1643514042/13/1up.png" },
    { name: "mario", url: "https://emojis.slackmojis.com/emojis/images/1643514045/43/mario.gif" },
    { name: "mariobros highfive", url: "https://emojis.slackmojis.com/emojis/images/1643510549/50914/mariobros-highfive.gif" },
    { name: "luigi dance", url: "https://emojis.slackmojis.com/emojis/images/1643517111/31505/luigi_dance.gif" },
    { name: "mario pipeplant", url: "https://emojis.slackmojis.com/emojis/images/1643515324/13441/mario_pipeplant.gif" },
    { name: "mario", url: "https://emojis.slackmojis.com/emojis/images/1643514046/47/mario.gif" },
    { name: "mario yoshi", url: "https://emojis.slackmojis.com/emojis/images/1643515430/14504/mario-yoshi.gif" },
    { name: "mariojammin q", url: "https://emojis.slackmojis.com/emojis/images/1696891358/70507/mariojammin_q.gif" },
    { name: "1000019296q", url: "https://emojis.slackmojis.com/emojis/images/1721793999/95239/1000019296q.gif" },
    { name: "goomba", url: "https://emojis.slackmojis.com/emojis/images/1643514045/45/goomba.gif" },
    { name: "mario star", url: "https://emojis.slackmojis.com/emojis/images/1643516153/21776/mario-star.png" },
    { name: "cowboy eyes", url: "https://emojis.slackmojis.com/emojis/images/1643514810/8253/cowboy-eyes.png" },
    { name: "crying sunglasses cowboy", url: "https://emojis.slackmojis.com/emojis/images/1643514947/9702/crying-sunglasses-cowboy.png" },
    { name: "sad cowboy", url: "https://emojis.slackmojis.com/emojis/images/1643514516/5047/sad-cowboy.png" },
    { name: "cowboy skull", url: "https://emojis.slackmojis.com/emojis/images/1701042749/77034/cowboy-skull.png" },
    { name: "cowboy mild panic", url: "https://emojis.slackmojis.com/emojis/images/1643515009/10385/cowboy_mild_panic.png" },
    { name: "cowboy cool cry mild panic", url: "https://emojis.slackmojis.com/emojis/images/1643516865/29186/cowboy-cool-cry-mild-panic.png" },
    { name: "cowboyhat tip", url: "https://emojis.slackmojis.com/emojis/images/1643514908/9251/cowboyhat-tip.gif" },
    { name: "cowboy hattip", url: "https://emojis.slackmojis.com/emojis/images/1643515290/13100/cowboy_hattip.gif" },
    { name: "nerdy cowboy", url: "https://emojis.slackmojis.com/emojis/images/1643515059/10902/nerdy_cowboy.png" },
    { name: "cowboy fish", url: "https://emojis.slackmojis.com/emojis/images/1643516232/22603/cowboy_fish.png" },
    { name: "cool cowboy", url: "https://emojis.slackmojis.com/emojis/images/1643515056/10874/cool_cowboy.png" },
    { name: "smirking cowboy", url: "https://emojis.slackmojis.com/emojis/images/1643515061/10919/smirking_cowboy.png" },
    { name: "pensive cowboy", url: "https://emojis.slackmojis.com/emojis/images/1643515060/10905/pensive_cowboy.png" },
    { name: "raised eyebrow cowboy", url: "https://emojis.slackmojis.com/emojis/images/1643515060/10907/raised_eyebrow_cowboy.png" },
    { name: "upside down cowboy", url: "https://emojis.slackmojis.com/emojis/images/1643515062/10931/upside_down_cowboy.png" },
    { name: "cowboy cold", url: "https://emojis.slackmojis.com/emojis/images/1701042758/77048/cowboy-cold.png" },
    { name: "k", url: "https://emojis.slackmojis.com/emojis/images/1643514180/1453/k.jpg" },
    { name: "o", url: "https://emojis.slackmojis.com/emojis/images/1643514180/1457/o.jpg" },
    { name: "j", url: "https://emojis.slackmojis.com/emojis/images/1643514180/1452/j.jpg" },
    { name: "h", url: "https://emojis.slackmojis.com/emojis/images/1643514180/1450/h.jpg" },
    { name: "i", url: "https://emojis.slackmojis.com/emojis/images/1643514180/1451/i.jpg" },
    { name: "n", url: "https://emojis.slackmojis.com/emojis/images/1643514180/1456/n.jpg" },
    { name: "q", url: "https://emojis.slackmojis.com/emojis/images/1643514180/1459/q.jpg" },
    { name: "w", url: "https://emojis.slackmojis.com/emojis/images/1643514181/1465/w.jpg" },
    { name: "l", url: "https://emojis.slackmojis.com/emojis/images/1643514180/1454/l.jpg" },
    { name: "t", url: "https://emojis.slackmojis.com/emojis/images/1643514181/1462/t.jpg" },
    { name: "s", url: "https://emojis.slackmojis.com/emojis/images/1643514181/1461/s.jpg" },
    { name: "m", url: "https://emojis.slackmojis.com/emojis/images/1643514180/1455/m.jpg" },
    { name: "y", url: "https://emojis.slackmojis.com/emojis/images/1643514181/1467/y.jpg" },
    { name: "r", url: "https://emojis.slackmojis.com/emojis/images/1643514180/1460/r.jpg" },
    { name: "p", url: "https://emojis.slackmojis.com/emojis/images/1643514180/1458/p.jpg" },
    { name: "u", url: "https://emojis.slackmojis.com/emojis/images/1643514181/1463/u.jpg" },
    { name: "lightsaber", url: "https://emojis.slackmojis.com/emojis/images/1643514187/1532/lightsaber.png" },
    { name: "baby yoda soup", url: "https://emojis.slackmojis.com/emojis/images/1643514719/7248/baby-yoda-soup.gif" },
    { name: "darth vader1", url: "https://emojis.slackmojis.com/emojis/images/1643514619/6237/darth_vader1.jpeg" },
    { name: "bluelightsaber", url: "https://emojis.slackmojis.com/emojis/images/1643514347/3217/bluelightsaber.png" },
    { name: "babyyoda", url: "https://emojis.slackmojis.com/emojis/images/1643514724/7296/babyyoda.png" },
    { name: "empire", url: "https://emojis.slackmojis.com/emojis/images/1643514053/114/empire.png" },
    { name: "r2d2", url: "https://emojis.slackmojis.com/emojis/images/1643514071/278/r2d2.png" },
    { name: "darth vader", url: "https://emojis.slackmojis.com/emojis/images/1643514056/131/darth_vader.png" },
    { name: "yoda", url: "https://emojis.slackmojis.com/emojis/images/1643514174/1393/yoda.gif" },
    { name: "baby yoda soup", url: "https://emojis.slackmojis.com/emojis/images/1643515036/10663/baby_yoda_soup.png" },
    { name: "yoda", url: "https://emojis.slackmojis.com/emojis/images/1643514057/137/yoda.png" },
    { name: "rebel", url: "https://emojis.slackmojis.com/emojis/images/1643514053/113/rebel.png" },
    { name: "mandalorian", url: "https://emojis.slackmojis.com/emojis/images/1643514715/7210/mandalorian.png" },
    { name: "evillightsaber", url: "https://emojis.slackmojis.com/emojis/images/1643514354/3290/evillightsaber.png" },
    { name: "storm trooper", url: "https://emojis.slackmojis.com/emojis/images/1643514418/3958/storm_trooper.gif" },
    { name: "baby yoda speeder", url: "https://emojis.slackmojis.com/emojis/images/1643514744/7515/baby-yoda-speeder.gif" },
    { name: "among us", url: "https://emojis.slackmojis.com/emojis/images/1643515038/10677/among_us.png" },
    { name: "among us orange dance", url: "https://emojis.slackmojis.com/emojis/images/1643515118/11386/among_us_orange_dance.gif" },
    { name: "among us pet", url: "https://emojis.slackmojis.com/emojis/images/1643515216/12349/among_us_pet.gif" },
    { name: "among us dance", url: "https://emojis.slackmojis.com/emojis/images/1643515120/11401/among-us-dance.gif" },
    { name: "amongus", url: "https://emojis.slackmojis.com/emojis/images/1643515022/10512/amongus.png" },
    { name: "among us party", url: "https://emojis.slackmojis.com/emojis/images/1643515050/10796/among_us_party.gif" },
    { name: "space float", url: "https://emojis.slackmojis.com/emojis/images/1643515251/12726/space_float.gif" },
    { name: "venting", url: "https://emojis.slackmojis.com/emojis/images/1643515251/12725/venting.gif" },
    { name: "among us party", url: "https://emojis.slackmojis.com/emojis/images/1643515120/11400/among-us-party.gif" },
    { name: "among us dead gun", url: "https://emojis.slackmojis.com/emojis/images/1643515204/12221/among-us-dead-gun.gif" },
    { name: "amongustwerkhalloween", url: "https://emojis.slackmojis.com/emojis/images/1694204578/68640/amongustwerkhalloween.gif" },
    { name: "among us sus", url: "https://emojis.slackmojis.com/emojis/images/1643515044/10740/among_us_sus.png" },
    { name: "among us dead body", url: "https://emojis.slackmojis.com/emojis/images/1643515174/11894/among-us-dead-body.png" },
    { name: "among us killed", url: "https://emojis.slackmojis.com/emojis/images/1643515200/12189/among_us_killed.gif" },
    { name: "amongus", url: "https://emojis.slackmojis.com/emojis/images/1643509221/48504/amongus.gif" },
    { name: "among us hammer", url: "https://emojis.slackmojis.com/emojis/images/1643515191/12061/among_us_hammer.gif" },
    { name: "bluejays", url: "https://emojis.slackmojis.com/emojis/images/1643514216/1825/bluejays.png" },
    { name: "red sox", url: "https://emojis.slackmojis.com/emojis/images/1643514208/1736/red_sox.jpg" },
    { name: "dodgers", url: "https://emojis.slackmojis.com/emojis/images/1643514207/1722/dodgers.jpg" },
    { name: "yankess", url: "https://emojis.slackmojis.com/emojis/images/1643514208/1742/yankess.jpg" },
    { name: "mets", url: "https://emojis.slackmojis.com/emojis/images/1643514207/1728/mets.jpg" },
    { name: "padres", url: "https://emojis.slackmojis.com/emojis/images/1643514208/1731/padres.jpg" },
    { name: "cubs", url: "https://emojis.slackmojis.com/emojis/images/1643514207/1720/cubs.jpg" },
    { name: "braves", url: "https://emojis.slackmojis.com/emojis/images/1643514233/2006/braves.png" },
    { name: "tigers", url: "https://emojis.slackmojis.com/emojis/images/1643514208/1740/tigers.jpg" },
    { name: "mariners", url: "https://emojis.slackmojis.com/emojis/images/1643514207/1726/mariners.jpg" },
    { name: "reds", url: "https://emojis.slackmojis.com/emojis/images/1643514208/1737/reds.jpg" },
    { name: "nats", url: "https://emojis.slackmojis.com/emojis/images/1643514207/1729/nats.jpg" },
    { name: "angels", url: "https://emojis.slackmojis.com/emojis/images/1643514233/2005/angels.jpg" },
    { name: "cardinals", url: "https://emojis.slackmojis.com/emojis/images/1643514207/1719/cardinals.jpg" },
    { name: "phillies", url: "https://emojis.slackmojis.com/emojis/images/1643514208/1732/phillies.jpg" },
    { name: "white sox", url: "https://emojis.slackmojis.com/emojis/images/1643514208/1741/white_sox.jpg" },
    { name: "brain", url: "https://emojis.slackmojis.com/emojis/images/1660415342/60604/brain.gif" },
    { name: "grinning face with smiling eyes", url: "https://emojis.slackmojis.com/emojis/images/1660415254/60603/grinning-face-with-smiling-eyes.gif" },
    { name: "eyes", url: "https://emojis.slackmojis.com/emojis/images/1660415435/60800/eyes.gif" },
    { name: "bomb", url: "https://emojis.slackmojis.com/emojis/images/1660415405/60731/bomb.gif" },
    { name: "zzz", url: "https://emojis.slackmojis.com/emojis/images/1660415438/60807/zzz.gif" },
    { name: "pinched fingers", url: "https://emojis.slackmojis.com/emojis/images/1660415442/60813/pinched-fingers.gif" },
    { name: "revolving hearts", url: "https://emojis.slackmojis.com/emojis/images/1660415378/60672/revolving-hearts.gif" },
    { name: "hundred points", url: "https://emojis.slackmojis.com/emojis/images/1660415427/60781/hundred-points.gif" },
    { name: "ghost", url: "https://emojis.slackmojis.com/emojis/images/1660415406/60733/ghost.gif" },
    { name: "thumbs up", url: "https://emojis.slackmojis.com/emojis/images/1660415403/60726/thumbs-up.gif" },
    { name: "loudly crying face", url: "https://emojis.slackmojis.com/emojis/images/1660415345/60609/loudly-crying-face.gif" },
    { name: "eye", url: "https://emojis.slackmojis.com/emojis/images/1660415394/60705/eye.gif" },
    { name: "blue heart", url: "https://emojis.slackmojis.com/emojis/images/1660415423/60771/blue-heart.gif" },
    { name: "rolling on the floor laughing", url: "https://emojis.slackmojis.com/emojis/images/1660415343/60605/rolling-on-the-floor-laughing.gif" },
    { name: "clown face", url: "https://emojis.slackmojis.com/emojis/images/1660415401/60722/clown-face.gif" },
    { name: "love you gesture", url: "https://emojis.slackmojis.com/emojis/images/1660415369/60650/love-you-gesture.gif" },
    { name: "thinking", url: "https://emojis.slackmojis.com/emojis/images/1643514509/4979/thinking.gif" },
    { name: "watching you", url: "https://emojis.slackmojis.com/emojis/images/1643514509/4982/watching-you.gif" },
    { name: "perfect", url: "https://emojis.slackmojis.com/emojis/images/1643514508/4976/perfect.gif" },
    { name: "giggle", url: "https://emojis.slackmojis.com/emojis/images/1643514508/4970/giggle.gif" },
    { name: "lol", url: "https://emojis.slackmojis.com/emojis/images/1643514508/4973/lol.gif" },
    { name: "shhh", url: "https://emojis.slackmojis.com/emojis/images/1643514509/4977/shhh.gif" },
    { name: "dabbing", url: "https://emojis.slackmojis.com/emojis/images/1643514507/4965/dabbing.gif" },
    { name: "facepalm", url: "https://emojis.slackmojis.com/emojis/images/1643514508/4967/facepalm.gif" },
    { name: "yuck", url: "https://emojis.slackmojis.com/emojis/images/1643514509/4983/yuck.gif" },
    { name: "fart", url: "https://emojis.slackmojis.com/emojis/images/1643514508/4968/fart.gif" },
    { name: "depressed", url: "https://emojis.slackmojis.com/emojis/images/1643514507/4966/depressed.gif" },
    { name: "surprise", url: "https://emojis.slackmojis.com/emojis/images/1643514509/4978/surprise.gif" },
    { name: "cry", url: "https://emojis.slackmojis.com/emojis/images/1643514507/4964/cry.gif" },
    { name: "anger", url: "https://emojis.slackmojis.com/emojis/images/1643514507/4962/anger.gif" },
    { name: "hearteyes", url: "https://emojis.slackmojis.com/emojis/images/1643514508/4971/hearteyes.gif" },
    { name: "kiss", url: "https://emojis.slackmojis.com/emojis/images/1643514508/4972/kiss.gif" },
    { name: "texans", url: "https://emojis.slackmojis.com/emojis/images/1643514150/1114/texans.jpg" },
    { name: "nfl", url: "https://emojis.slackmojis.com/emojis/images/1643514149/1103/nfl.jpg" },
    { name: "colts", url: "https://emojis.slackmojis.com/emojis/images/1643514149/1093/colts.jpg" },
    { name: "eagles", url: "https://emojis.slackmojis.com/emojis/images/1643514149/1096/eagles.jpg" },
    { name: "49ers", url: "https://emojis.slackmojis.com/emojis/images/1643514148/1083/49ers.jpg" },
    { name: "raiders", url: "https://emojis.slackmojis.com/emojis/images/1643514150/1107/raiders.jpg" },
    { name: "jets", url: "https://emojis.slackmojis.com/emojis/images/1643514149/1100/jets.jpg" },
    { name: "lions", url: "https://emojis.slackmojis.com/emojis/images/1643514149/1101/lions.jpg" },
    { name: "steelers", url: "https://emojis.slackmojis.com/emojis/images/1643514150/1113/steelers.jpg" },
    { name: "chiefs", url: "https://emojis.slackmojis.com/emojis/images/1643514149/1092/chiefs.jpg" },
    { name: "seahawks", url: "https://emojis.slackmojis.com/emojis/images/1643514145/1048/seahawks.png" },
    { name: "bills", url: "https://emojis.slackmojis.com/emojis/images/1643514148/1087/bills.jpg" },
    { name: "patriots", url: "https://emojis.slackmojis.com/emojis/images/1643514150/1106/patriots.jpg" },
    { name: "packers", url: "https://emojis.slackmojis.com/emojis/images/1643514150/1104/packers.jpg" },
    { name: "broncos", url: "https://emojis.slackmojis.com/emojis/images/1643514148/1088/broncos.jpg" },
    { name: "panthers", url: "https://emojis.slackmojis.com/emojis/images/1643514150/1105/panthers.jpg" },
    { name: "dragonball", url: "https://emojis.slackmojis.com/emojis/images/1643514386/3619/dragonball.jpg" },
    { name: "narutorun", url: "https://emojis.slackmojis.com/emojis/images/1694397896/68791/narutorun.gif" },
    { name: "dragonballq", url: "https://emojis.slackmojis.com/emojis/images/1696973151/70617/dragonballq.gif" },
    { name: "ghiblinofaceq", url: "https://emojis.slackmojis.com/emojis/images/1701056310/77253/ghiblinofaceq.png" },
    { name: "dragonball", url: "https://emojis.slackmojis.com/emojis/images/1709887230/90228/dragonball.png" },
    { name: "ghibli sprite e", url: "https://emojis.slackmojis.com/emojis/images/1710352467/90821/ghibli-sprite-e.png" },
    { name: "dragon ball z", url: "https://emojis.slackmojis.com/emojis/images/1621129311/39274/dragon-ball-z.gif" },
    { name: "dragonballzq", url: "https://emojis.slackmojis.com/emojis/images/1697093057/70737/dragonballzq.png" },
    { name: "narutofiredupq", url: "https://emojis.slackmojis.com/emojis/images/1724214389/96596/narutofiredupq.gif" },
    { name: "3202 vtuber korthorbit yipee", url: "https://emojis.slackmojis.com/emojis/images/1700703656/76598/3202-vtuber-korthorbit-yipee.png" },
    { name: "ghibli radishheadq", url: "https://emojis.slackmojis.com/emojis/images/1701310498/78390/ghibli_radishheadq.png" },
    { name: "naruto tururu", url: "https://emojis.slackmojis.com/emojis/images/1735913587/110007/naruto-tururu.png" },
    { name: "ghibli noface", url: "https://emojis.slackmojis.com/emojis/images/1708961937/89677/ghibli-noface.png" },
    { name: "9795 vtuber korthorbit headpat", url: "https://emojis.slackmojis.com/emojis/images/1700005330/75104/9795-vtuber-korthorbit-headpat.png" },
    { name: "8490 vtuber korthorbit squidward", url: "https://emojis.slackmojis.com/emojis/images/1700005343/75107/8490-vtuber-korthorbit-squidward.png" },
    { name: "3202 vtuber korthorbit yipee", url: "https://emojis.slackmojis.com/emojis/images/1700005347/75108/3202-vtuber-korthorbit-yipee.png" },
    { name: "looking", url: "https://emojis.slackmojis.com/emojis/images/1643514239/2078/looking.gif" },
    { name: "excited", url: "https://emojis.slackmojis.com/emojis/images/1643514239/2069/excited.gif" },
    { name: "headbutt", url: "https://emojis.slackmojis.com/emojis/images/1643514239/2073/headbutt.gif" },
    { name: "love", url: "https://emojis.slackmojis.com/emojis/images/1643514240/2080/love.gif" },
    { name: "reading", url: "https://emojis.slackmojis.com/emojis/images/1643514240/2086/reading.gif" },
    { name: "surrender", url: "https://emojis.slackmojis.com/emojis/images/1643514241/2092/surrender.gif" },
    { name: "sick", url: "https://emojis.slackmojis.com/emojis/images/1643514241/2091/sick.gif" },
    { name: "cough", url: "https://emojis.slackmojis.com/emojis/images/1643514238/2067/cough.gif" },
    { name: "whining", url: "https://emojis.slackmojis.com/emojis/images/1643514241/2094/whining.gif" },
    { name: "blow up", url: "https://emojis.slackmojis.com/emojis/images/1643514238/2064/blow_up.gif" },
    { name: "nudge", url: "https://emojis.slackmojis.com/emojis/images/1643514240/2082/nudge.gif" },
    { name: "angry", url: "https://emojis.slackmojis.com/emojis/images/1643514238/2062/angry.gif" },
    { name: "money bath", url: "https://emojis.slackmojis.com/emojis/images/1643514240/2081/money_bath.gif" },
    { name: "haha", url: "https://emojis.slackmojis.com/emojis/images/1643514239/2072/haha.gif" },
    { name: "quivering", url: "https://emojis.slackmojis.com/emojis/images/1643514240/2085/quivering.gif" },
    { name: "pointing", url: "https://emojis.slackmojis.com/emojis/images/1643514240/2083/pointing.gif" },
    { name: "hellokittyheartq", url: "https://emojis.slackmojis.com/emojis/images/1704526529/85645/hellokittyheartq.gif" },
    { name: "7312 kuromi fearq", url: "https://emojis.slackmojis.com/emojis/images/1700705253/76635/7312-kuromi-fearq.png" },
    { name: "hellokitty", url: "https://emojis.slackmojis.com/emojis/images/1643514278/2476/hellokitty.jpg" },
    { name: "hellokitty bride", url: "https://emojis.slackmojis.com/emojis/images/1643515407/14267/hellokitty_bride.gif" },
    { name: "3562 kuromi phoneq", url: "https://emojis.slackmojis.com/emojis/images/1700705269/76637/3562-kuromi-phoneq.png" },
    { name: "8241 kuromistoneq", url: "https://emojis.slackmojis.com/emojis/images/1700705357/76643/8241-kuromistoneq.png" },
    { name: "5917 kuromi sleepq", url: "https://emojis.slackmojis.com/emojis/images/1700705262/76636/5917-kuromi-sleepq.png" },
    { name: "5352 kuromihalloween", url: "https://emojis.slackmojis.com/emojis/images/1700705394/76647/5352-kuromihalloween.gif" },
    { name: "hellokitty", url: "https://emojis.slackmojis.com/emojis/images/1643515185/12004/hellokitty.png" },
    { name: "7312 kuromiq", url: "https://emojis.slackmojis.com/emojis/images/1700705246/76634/7312-kuromiq.png" },
    { name: "cinnamoroll", url: "https://emojis.slackmojis.com/emojis/images/1715563117/92660/cinnamoroll.gif" },
    { name: "1253 kuromiheyq", url: "https://emojis.slackmojis.com/emojis/images/1700705348/76642/1253-kuromiheyq.png" },
    { name: "hellokitty", url: "https://emojis.slackmojis.com/emojis/images/1643515294/13143/hellokitty.gif" },
    { name: "hellokitty", url: "https://emojis.slackmojis.com/emojis/images/1694036300/68514/hellokitty.png" },
    { name: "hellokitty q", url: "https://emojis.slackmojis.com/emojis/images/1703710876/84424/hellokitty_q.gif" },
    { name: "hellokittydrugsq", url: "https://emojis.slackmojis.com/emojis/images/1701219124/78061/hellokittydrugsq.png" },
    { name: "notlikethis", url: "https://emojis.slackmojis.com/emojis/images/1643514545/5435/notlikethis.png" },
    { name: "pogchamp", url: "https://emojis.slackmojis.com/emojis/images/1643515248/12672/pogchamp.png" },
    { name: "kappa", url: "https://emojis.slackmojis.com/emojis/images/1643514168/1333/kappa.png" },
    { name: "pogchamp", url: "https://emojis.slackmojis.com/emojis/images/1643514188/1545/pogchamp.jpg" },
    { name: "lul", url: "https://emojis.slackmojis.com/emojis/images/1643515152/11662/lul.png" },
    { name: "wutface", url: "https://emojis.slackmojis.com/emojis/images/1643515210/12280/wutface.png" },
    { name: "kappa", url: "https://emojis.slackmojis.com/emojis/images/1643514047/57/kappa.png" },
    { name: "smorc", url: "https://emojis.slackmojis.com/emojis/images/1643514433/4110/smorc.png" },
    { name: "dududu", url: "https://emojis.slackmojis.com/emojis/images/1643514492/4761/dududu.png" },
    { name: "lul", url: "https://emojis.slackmojis.com/emojis/images/1643516023/20464/lul.png" },
    { name: "biblethump", url: "https://emojis.slackmojis.com/emojis/images/1643514443/4253/biblethump.jpg" },
    { name: "frankerz", url: "https://emojis.slackmojis.com/emojis/images/1643514493/4771/frankerz.png" },
    { name: "dansgame", url: "https://emojis.slackmojis.com/emojis/images/1643515210/12281/dansgame.png" },
    { name: "komodohype", url: "https://emojis.slackmojis.com/emojis/images/1643515248/12671/komodohype.png" },
    { name: "goldenkappa", url: "https://emojis.slackmojis.com/emojis/images/1643514168/1325/goldenkappa.png" },
    { name: "kappakek", url: "https://emojis.slackmojis.com/emojis/images/1643515065/10958/kappakek.png" },
    { name: "flyers", url: "https://emojis.slackmojis.com/emojis/images/1643514226/1931/flyers.png" },
    { name: "bruins", url: "https://emojis.slackmojis.com/emojis/images/1643514225/1923/bruins.png" },
    { name: "canadiens", url: "https://emojis.slackmojis.com/emojis/images/1643514226/1924/canadiens.png" },
    { name: "sharks", url: "https://emojis.slackmojis.com/emojis/images/1643514227/1946/sharks.png" },
    { name: "sabres", url: "https://emojis.slackmojis.com/emojis/images/1643514227/1944/sabres.png" },
    { name: "devils", url: "https://emojis.slackmojis.com/emojis/images/1643514226/1928/devils.png" },
    { name: "red wings", url: "https://emojis.slackmojis.com/emojis/images/1643514227/1943/red_wings.png" },
    { name: "capitals", url: "https://emojis.slackmojis.com/emojis/images/1643514226/1926/capitals.png" },
    { name: "oilers", url: "https://emojis.slackmojis.com/emojis/images/1643514227/1938/oilers.png" },
    { name: "avalanche", url: "https://emojis.slackmojis.com/emojis/images/1643514225/1919/avalanche.png" },
    { name: "penguins", url: "https://emojis.slackmojis.com/emojis/images/1643514227/1940/penguins.png" },
    { name: "wild", url: "https://emojis.slackmojis.com/emojis/images/1643514228/1948/wild.png" },
    { name: "blues", url: "https://emojis.slackmojis.com/emojis/images/1643514225/1922/blues.png" },
    { name: "blackhawks", url: "https://emojis.slackmojis.com/emojis/images/1643514225/1920/blackhawks.png" },
    { name: "maple leafs", url: "https://emojis.slackmojis.com/emojis/images/1643514227/1937/maple_leafs.png" },
    { name: "jets", url: "https://emojis.slackmojis.com/emojis/images/1643514226/1934/jets.png" },
    { name: "fb wow", url: "https://emojis.slackmojis.com/emojis/images/1643514088/461/fb-wow.gif" },
    { name: "fbwow", url: "https://emojis.slackmojis.com/emojis/images/1643514943/9662/fbwow.gif" },
    { name: "fb like", url: "https://emojis.slackmojis.com/emojis/images/1643514089/464/fb-like.gif" },
    { name: "fb laugh", url: "https://emojis.slackmojis.com/emojis/images/1643514088/462/fb-laugh.gif" },
    { name: "fb heart", url: "https://emojis.slackmojis.com/emojis/images/1643514089/463/fb-heart.gif" },
    { name: "fb hug", url: "https://emojis.slackmojis.com/emojis/images/1643514867/8787/fb-hug.png" },
    { name: "fb angry", url: "https://emojis.slackmojis.com/emojis/images/1643514088/459/fb-angry.gif" },
    { name: "fb sad", url: "https://emojis.slackmojis.com/emojis/images/1643514088/460/fb-sad.gif" },
    { name: "fbsad", url: "https://emojis.slackmojis.com/emojis/images/1643514943/9661/fbsad.gif" },
    { name: "fb like", url: "https://emojis.slackmojis.com/emojis/images/1643514867/8789/fb-like.png" },
    { name: "fb thankful", url: "https://emojis.slackmojis.com/emojis/images/1643514867/8792/fb-thankful.png" },
    { name: "fb wow", url: "https://emojis.slackmojis.com/emojis/images/1643514867/8793/fb-wow.png" },
    { name: "fb heart", url: "https://emojis.slackmojis.com/emojis/images/1643514866/8786/fb-heart.png" },
    { name: "fb angry", url: "https://emojis.slackmojis.com/emojis/images/1643514866/8785/fb-angry.png" },
    { name: "fb pride", url: "https://emojis.slackmojis.com/emojis/images/1643514867/8790/fb-pride.png" },
    { name: "fb laugh", url: "https://emojis.slackmojis.com/emojis/images/1643514867/8788/fb-laugh.png" },
    { name: "ac tangyclapq", url: "https://emojis.slackmojis.com/emojis/images/1702612154/82115/ac-tangyclapq.gif" },
    { name: "animal crossing tom nook", url: "https://emojis.slackmojis.com/emojis/images/1658328514/60143/animal-crossing-tom-nook.png" },
    { name: "animalcrossingbruhq", url: "https://emojis.slackmojis.com/emojis/images/1696535270/70372/animalcrossingbruhq.gif" },
    { name: "ac net", url: "https://emojis.slackmojis.com/emojis/images/1643514840/8530/ac-net.png" },
    { name: "ac giftq", url: "https://emojis.slackmojis.com/emojis/images/1702613115/82158/ac-giftq.png" },
    { name: "animal crossing raymond", url: "https://emojis.slackmojis.com/emojis/images/1658328562/60146/animal-crossing-raymond.png" },
    { name: "animal crossing", url: "https://emojis.slackmojis.com/emojis/images/1643514797/8109/animal-crossing.png" },
    { name: "ac ghost e", url: "https://emojis.slackmojis.com/emojis/images/1710353757/90875/ac-ghost-e.png" },
    { name: "ac seabass", url: "https://emojis.slackmojis.com/emojis/images/1643514841/8535/ac-seabass.png" },
    { name: "ac urdeadq", url: "https://emojis.slackmojis.com/emojis/images/1701983425/80651/ac-urdeadq.png" },
    { name: "animalcrossingq", url: "https://emojis.slackmojis.com/emojis/images/1701983440/80652/animalcrossingq.png" },
    { name: "animal crossing", url: "https://emojis.slackmojis.com/emojis/images/1656179503/59812/animal-crossing.png" },
    { name: "ac leavingq", url: "https://emojis.slackmojis.com/emojis/images/1701648241/79575/ac-leavingq.png" },
    { name: "ac turnip", url: "https://emojis.slackmojis.com/emojis/images/1643514866/8777/ac-turnip.png" },
    { name: "ac breakq", url: "https://emojis.slackmojis.com/emojis/images/1701983506/80655/ac-breakq.png" },
    { name: "animal crossing ", url: "https://emojis.slackmojis.com/emojis/images/1702612306/82119/animal_crossing_.png" },
    { name: "pig hello sitting", url: "https://emojis.slackmojis.com/emojis/images/1643514533/5276/pig-hello-sitting.gif" },
    { name: "pig happy jumping", url: "https://emojis.slackmojis.com/emojis/images/1643514533/5272/pig-happy-jumping.gif" },
    { name: "pig silly", url: "https://emojis.slackmojis.com/emojis/images/1643514534/5280/pig-silly.gif" },
    { name: "pig sparkle eyes", url: "https://emojis.slackmojis.com/emojis/images/1643514534/5282/pig-sparkle-eyes.gif" },
    { name: "pig cry", url: "https://emojis.slackmojis.com/emojis/images/1643514532/5268/pig-cry.gif" },
    { name: "pig drool", url: "https://emojis.slackmojis.com/emojis/images/1643514532/5269/pig-drool.gif" },
    { name: "pig scoot", url: "https://emojis.slackmojis.com/emojis/images/1643514533/5279/pig-scoot.gif" },
    { name: "pig sing karaoke", url: "https://emojis.slackmojis.com/emojis/images/1643514534/5281/pig-sing-karaoke.gif" },
    { name: "pig hello front", url: "https://emojis.slackmojis.com/emojis/images/1643514533/5275/pig-hello-front.gif" },
    { name: "pig hello door", url: "https://emojis.slackmojis.com/emojis/images/1643514533/5274/pig-hello-door.gif" },
    { name: "pig exercise", url: "https://emojis.slackmojis.com/emojis/images/1643514532/5270/pig-exercise.gif" },
    { name: "pig working", url: "https://emojis.slackmojis.com/emojis/images/1643514534/5285/pig-working.png" },
    { name: "pig multiply", url: "https://emojis.slackmojis.com/emojis/images/1643514533/5278/pig-multiply.gif" },
    { name: "pig squeeze toy", url: "https://emojis.slackmojis.com/emojis/images/1643514534/5283/pig-squeeze-toy.gif" },
    { name: "pig angry", url: "https://emojis.slackmojis.com/emojis/images/1643514532/5267/pig-angry.gif" },
    { name: "pig kiss", url: "https://emojis.slackmojis.com/emojis/images/1643514533/5277/pig-kiss.gif" },
    { name: "bulls", url: "https://emojis.slackmojis.com/emojis/images/1643514089/467/bulls.png" },
    { name: "lakers", url: "https://emojis.slackmojis.com/emojis/images/1643514090/478/lakers.png" },
    { name: "spurs", url: "https://emojis.slackmojis.com/emojis/images/1643514091/488/spurs.png" },
    { name: "jazz", url: "https://emojis.slackmojis.com/emojis/images/1643514090/475/jazz.png" },
    { name: "trailblazers", url: "https://emojis.slackmojis.com/emojis/images/1643514091/492/trailblazers.png" },
    { name: "nuggets", url: "https://emojis.slackmojis.com/emojis/images/1643514090/482/nuggets.png" },
    { name: "celtics", url: "https://emojis.slackmojis.com/emojis/images/1643514089/469/celtics.png" },
    { name: "76ers", url: "https://emojis.slackmojis.com/emojis/images/1643514089/465/76ers.png" },
    { name: "knicks", url: "https://emojis.slackmojis.com/emojis/images/1643514090/477/knicks.png" },
    { name: "rockets", url: "https://emojis.slackmojis.com/emojis/images/1643514091/487/rockets.png" },
    { name: "clippers", url: "https://emojis.slackmojis.com/emojis/images/1643514089/470/clippers.png" },
    { name: "raptors", url: "https://emojis.slackmojis.com/emojis/images/1643514091/486/raptors.png" },
    { name: "kings", url: "https://emojis.slackmojis.com/emojis/images/1643514090/476/kings.png" },
    { name: "bucks", url: "https://emojis.slackmojis.com/emojis/images/1643514089/466/bucks.png" },
    { name: "cavaliers", url: "https://emojis.slackmojis.com/emojis/images/1643514089/468/cavaliers.png" },
    { name: "warriors", url: "https://emojis.slackmojis.com/emojis/images/1643514091/493/warriors.png" },
    { name: "check", url: "https://emojis.slackmojis.com/emojis/images/1705794627/87794/check.png" },
    { name: "rocket", url: "https://emojis.slackmojis.com/emojis/images/1705794630/87798/rocket.png" },
    { name: "heart", url: "https://emojis.slackmojis.com/emojis/images/1705794626/87791/heart.png" },
    { name: "thumbs down", url: "https://emojis.slackmojis.com/emojis/images/1705794632/87802/thumbs-down.png" },
    { name: "smile", url: "https://emojis.slackmojis.com/emojis/images/1705794626/87792/smile.png" },
    { name: "yay", url: "https://emojis.slackmojis.com/emojis/images/1705794631/87800/yay.png" },
    { name: "thumbs up", url: "https://emojis.slackmojis.com/emojis/images/1705794624/87789/thumbs-up.png" },
    { name: "wave", url: "https://emojis.slackmojis.com/emojis/images/1705794630/87797/wave.png" },
    { name: "gm", url: "https://emojis.slackmojis.com/emojis/images/1705794624/87788/gm.png" },
    { name: "tada", url: "https://emojis.slackmojis.com/emojis/images/1705794625/87790/tada.png" },
    { name: "fire", url: "https://emojis.slackmojis.com/emojis/images/1705794628/87795/fire.png" },
    { name: "frown", url: "https://emojis.slackmojis.com/emojis/images/1705794627/87793/frown.png" },
    { name: "clap", url: "https://emojis.slackmojis.com/emojis/images/1705794632/87801/clap.png" },
    { name: "big smile", url: "https://emojis.slackmojis.com/emojis/images/1705794631/87799/big-smile.png" },
    { name: "upsidedown smile", url: "https://emojis.slackmojis.com/emojis/images/1705794629/87796/upsidedown-smile.png" },
    { name: "star struck cat", url: "https://emojis.slackmojis.com/emojis/images/1643514505/4939/star-struck_cat.png" },
    { name: "sunglasses cat", url: "https://emojis.slackmojis.com/emojis/images/1643514505/4940/sunglasses_cat.png" },
    { name: "innocent cat", url: "https://emojis.slackmojis.com/emojis/images/1643514505/4935/innocent_cat.png" },
    { name: "yum cat", url: "https://emojis.slackmojis.com/emojis/images/1643514505/4944/yum_cat.png" },
    { name: "zany cat face", url: "https://emojis.slackmojis.com/emojis/images/1643514506/4945/zany_cat_face.png" },
    { name: "sob cat", url: "https://emojis.slackmojis.com/emojis/images/1643514505/4938/sob_cat.png" },
    { name: "yasss cat", url: "https://emojis.slackmojis.com/emojis/images/1643514505/4943/yasss_cat.png" },
    { name: "grimacing cat", url: "https://emojis.slackmojis.com/emojis/images/1643514504/4933/grimacing_cat.png" },
    { name: "thinking cat face", url: "https://emojis.slackmojis.com/emojis/images/1643514505/4941/thinking_cat_face.png" },
    { name: "hugging cat face", url: "https://emojis.slackmojis.com/emojis/images/1643514505/4934/hugging_cat_face.png" },
    { name: "expressionless cat", url: "https://emojis.slackmojis.com/emojis/images/1643514504/4931/expressionless_cat.png" },
    { name: "anguished cat", url: "https://emojis.slackmojis.com/emojis/images/1643514504/4927/anguished_cat.png" },
    { name: "triumph cat", url: "https://emojis.slackmojis.com/emojis/images/1643514505/4942/triumph_cat.png" },
    { name: "cat face with monocle", url: "https://emojis.slackmojis.com/emojis/images/1643514504/4928/cat_face_with_monocle.png" },
    { name: "flushed cat", url: "https://emojis.slackmojis.com/emojis/images/1643514504/4932/flushed_cat.png" },
    { name: "dizzy cat face", url: "https://emojis.slackmojis.com/emojis/images/1643514504/4929/dizzy_cat_face.png" },
    { name: "poop", url: "https://emojis.slackmojis.com/emojis/images/1643514146/1063/poop.gif" },
    { name: "peace", url: "https://emojis.slackmojis.com/emojis/images/1643514146/1062/peace.gif" },
    { name: "smh", url: "https://emojis.slackmojis.com/emojis/images/1643514146/1066/smh.gif" },
    { name: "glowstick", url: "https://emojis.slackmojis.com/emojis/images/1643514146/1059/glowstick.gif" },
    { name: "thumbs down", url: "https://emojis.slackmojis.com/emojis/images/1643514147/1068/thumbs_down.gif" },
    { name: "rock", url: "https://emojis.slackmojis.com/emojis/images/1643514146/1064/rock.gif" },
    { name: "wink", url: "https://emojis.slackmojis.com/emojis/images/1643514147/1070/wink.gif" },
    { name: "heart", url: "https://emojis.slackmojis.com/emojis/images/1643514146/1060/heart.gif" },
    { name: "thumbs up", url: "https://emojis.slackmojis.com/emojis/images/1643514147/1069/thumbs_up.gif" },
    { name: "smile", url: "https://emojis.slackmojis.com/emojis/images/1643514146/1067/smile.gif" },
    { name: "sad", url: "https://emojis.slackmojis.com/emojis/images/1643514146/1065/sad.gif" },
    { name: "laugh", url: "https://emojis.slackmojis.com/emojis/images/1643514146/1061/laugh.gif" },
    { name: "2train", url: "https://emojis.slackmojis.com/emojis/images/1643514142/1020/2train.png" },
    { name: "1train", url: "https://emojis.slackmojis.com/emojis/images/1643514142/1019/1train.png" },
    { name: "btrain", url: "https://emojis.slackmojis.com/emojis/images/1643514143/1028/btrain.png" },
    { name: "5train", url: "https://emojis.slackmojis.com/emojis/images/1643514143/1023/5train.png" },
    { name: "ntrain", url: "https://emojis.slackmojis.com/emojis/images/1643514144/1037/ntrain.png" },
    { name: "wtrain", url: "https://emojis.slackmojis.com/emojis/images/1643514145/1046/wtrain.png" },
    { name: "ctrain", url: "https://emojis.slackmojis.com/emojis/images/1643514143/1029/ctrain.png" },
    { name: "dtrain", url: "https://emojis.slackmojis.com/emojis/images/1643514143/1030/dtrain.png" },
    { name: "ftrain", url: "https://emojis.slackmojis.com/emojis/images/1643514144/1032/ftrain.png" },
    { name: "ltrain", url: "https://emojis.slackmojis.com/emojis/images/1643514144/1035/ltrain.png" },
    { name: "7train", url: "https://emojis.slackmojis.com/emojis/images/1643514143/1025/7train.png" },
    { name: "ttrain", url: "https://emojis.slackmojis.com/emojis/images/1643514144/1041/ttrain.png" },
    { name: "3train", url: "https://emojis.slackmojis.com/emojis/images/1643514142/1021/3train.png" },
    { name: "6train", url: "https://emojis.slackmojis.com/emojis/images/1643514143/1024/6train.png" },
    { name: "4train", url: "https://emojis.slackmojis.com/emojis/images/1643514143/1022/4train.png" },
    { name: "qtrain", url: "https://emojis.slackmojis.com/emojis/images/1643514144/1038/qtrain.png" },
    { name: "bananadance", url: "https://emojis.slackmojis.com/emojis/images/1643514066/220/bananadance.gif" },
    { name: "bananadance lsd", url: "https://emojis.slackmojis.com/emojis/images/1643515584/16045/bananadance_lsd.gif" },
    { name: "bananadance duo", url: "https://emojis.slackmojis.com/emojis/images/1643515739/17621/bananadance_duo.gif" },
    { name: "bananadance colorful2", url: "https://emojis.slackmojis.com/emojis/images/1643515739/17630/bananadance_colorful2.gif" },
    { name: "orangedance pbj2", url: "https://emojis.slackmojis.com/emojis/images/1643515999/20208/orangedance_pbj2.gif" },
    { name: "bananadance beard", url: "https://emojis.slackmojis.com/emojis/images/1643515726/17523/bananadance_beard.gif" },
    { name: "dreadlocks bananadance", url: "https://emojis.slackmojis.com/emojis/images/1643515718/17438/dreadlocks_bananadance.gif" },
    { name: "master chief dancing pbj", url: "https://emojis.slackmojis.com/emojis/images/1643516566/26052/master-chief-dancing_pbj.gif" },
    { name: "bananadance spam", url: "https://emojis.slackmojis.com/emojis/images/1643515755/17743/bananadance_spam.gif" },
    { name: "bananadance slow", url: "https://emojis.slackmojis.com/emojis/images/1643515576/15953/bananadance_slow.gif" },
    { name: "bananadance cape", url: "https://emojis.slackmojis.com/emojis/images/1643515736/17598/bananadance_cape.gif" },
    { name: "appledance red pbj", url: "https://emojis.slackmojis.com/emojis/images/1643516558/25973/appledance_red_pbj.gif" },
    { name: "bananadance axe", url: "https://emojis.slackmojis.com/emojis/images/1643515720/17453/bananadance_axe.gif" },
    { name: "bananadance satan", url: "https://emojis.slackmojis.com/emojis/images/1643515728/17538/bananadance_satan.gif" },
    { name: "bananadance blackwhite", url: "https://emojis.slackmojis.com/emojis/images/1643515468/14886/bananadance_blackwhite.gif" },
    { name: "bananadance chains", url: "https://emojis.slackmojis.com/emojis/images/1643517066/31129/bananadance_chains.gif" },
    { name: "regional indicator g", url: "https://emojis.slackmojis.com/emojis/images/1643514445/4272/regional_indicator_g.png" },
    { name: "regional indicator v", url: "https://emojis.slackmojis.com/emojis/images/1643514446/4287/regional_indicator_v.png" },
    { name: "regional indicator d", url: "https://emojis.slackmojis.com/emojis/images/1643514445/4269/regional_indicator_d.png" },
    { name: "regional indicator r", url: "https://emojis.slackmojis.com/emojis/images/1643514446/4283/regional_indicator_r.png" },
    { name: "regional indicator c", url: "https://emojis.slackmojis.com/emojis/images/1643514445/4268/regional_indicator_c.png" },
    { name: "regional indicator s", url: "https://emojis.slackmojis.com/emojis/images/1643514446/4284/regional_indicator_s.png" },
    { name: "regional indicator n", url: "https://emojis.slackmojis.com/emojis/images/1643514446/4279/regional_indicator_n.png" },
    { name: "regional indicator l", url: "https://emojis.slackmojis.com/emojis/images/1643514445/4277/regional_indicator_l.png" },
    { name: "regional indicator o", url: "https://emojis.slackmojis.com/emojis/images/1643514446/4280/regional_indicator_o.png" },
    { name: "regional indicator h", url: "https://emojis.slackmojis.com/emojis/images/1643514445/4273/regional_indicator_h.png" },
    { name: "regional indicator a", url: "https://emojis.slackmojis.com/emojis/images/1643514445/4266/regional_indicator_a.png" },
    { name: "regional indicator m", url: "https://emojis.slackmojis.com/emojis/images/1643514446/4278/regional_indicator_m.png" },
    { name: "regional indicator p", url: "https://emojis.slackmojis.com/emojis/images/1643514446/4281/regional_indicator_p.png" },
    { name: "regional indicator j", url: "https://emojis.slackmojis.com/emojis/images/1643514445/4275/regional_indicator_j.png" },
    { name: "regional indicator e", url: "https://emojis.slackmojis.com/emojis/images/1643514445/4270/regional_indicator_e.png" },
    { name: "regional indicator t", url: "https://emojis.slackmojis.com/emojis/images/1643514446/4285/regional_indicator_t.png" },
    { name: "bran", url: "https://emojis.slackmojis.com/emojis/images/1643514561/5601/bran.png" },
    { name: "sansa", url: "https://emojis.slackmojis.com/emojis/images/1643514563/5615/sansa.png" },
    { name: "cersei", url: "https://emojis.slackmojis.com/emojis/images/1643514562/5603/cersei.png" },
    { name: "johnsnow", url: "https://emojis.slackmojis.com/emojis/images/1643514562/5608/johnsnow.png" },
    { name: "tyronl", url: "https://emojis.slackmojis.com/emojis/images/1643514563/5618/tyronl.png" },
    { name: "daenery", url: "https://emojis.slackmojis.com/emojis/images/1643514562/5604/daenery.png" },
    { name: "arya stark", url: "https://emojis.slackmojis.com/emojis/images/1643514315/2873/arya_stark.png" },
    { name: "khal drogo", url: "https://emojis.slackmojis.com/emojis/images/1643514316/2880/khal_drogo.png" },
    { name: "benjen stark", url: "https://emojis.slackmojis.com/emojis/images/1643514316/2879/benjen_stark.png" },
    { name: "daenerys targaryen", url: "https://emojis.slackmojis.com/emojis/images/1643514315/2875/daenerys_targaryen.png" },
    { name: "thehound", url: "https://emojis.slackmojis.com/emojis/images/1643514563/5616/thehound.png" },
    { name: "cersei lannister", url: "https://emojis.slackmojis.com/emojis/images/1643514316/2878/cersei_lannister.png" },
    { name: "redwoman", url: "https://emojis.slackmojis.com/emojis/images/1643514563/5613/redwoman.png" },
    { name: "davos", url: "https://emojis.slackmojis.com/emojis/images/1643514562/5605/davos.png" },
    { name: "jamie lannister", url: "https://emojis.slackmojis.com/emojis/images/1643514316/2877/jamie_lannister.png" },
    { name: "nightking", url: "https://emojis.slackmojis.com/emojis/images/1643514562/5612/nightking.png" },
    { name: "lafc", url: "https://emojis.slackmojis.com/emojis/images/1643514539/5373/lafc.png" },
    { name: "orlando city", url: "https://emojis.slackmojis.com/emojis/images/1643514541/5389/orlando_city.png" },
    { name: "fccincinnati", url: "https://emojis.slackmojis.com/emojis/images/1643514540/5379/fccincinnati.png" },
    { name: "philadelphia union", url: "https://emojis.slackmojis.com/emojis/images/1643514541/5390/philadelphia_union.png" },
    { name: "quakes", url: "https://emojis.slackmojis.com/emojis/images/1643514540/5376/quakes.png" },
    { name: "rbny", url: "https://emojis.slackmojis.com/emojis/images/1643514541/5388/rbny.png" },
    { name: "mnufc", url: "https://emojis.slackmojis.com/emojis/images/1643514540/5383/mnufc.png" },
    { name: "nycfc", url: "https://emojis.slackmojis.com/emojis/images/1643514541/5387/nycfc.png" },
    { name: "portland timbers", url: "https://emojis.slackmojis.com/emojis/images/1643514541/5392/portland_timbers.png" },
    { name: "nerevolution", url: "https://emojis.slackmojis.com/emojis/images/1643514540/5386/nerevolution.png" },
    { name: "seattle sounders", url: "https://emojis.slackmojis.com/emojis/images/1643514541/5393/seattle_sounders.png" },
    { name: "chicago fire", url: "https://emojis.slackmojis.com/emojis/images/1643514540/5378/chicago_fire.png" },
    { name: "vancouver whitecaps", url: "https://emojis.slackmojis.com/emojis/images/1643514541/5395/vancouver_whitecaps.png" },
    { name: "columbus crew", url: "https://emojis.slackmojis.com/emojis/images/1643514540/5381/columbus_crew.png" },
    { name: "colorado rapids", url: "https://emojis.slackmojis.com/emojis/images/1643514540/5380/colorado_rapids.png" },
    { name: "montreal impact", url: "https://emojis.slackmojis.com/emojis/images/1643514540/5384/montreal_impact.png" },
    { name: "jmr turtlesliders", url: "https://emojis.slackmojis.com/emojis/images/1643514929/9470/jmr_turtlesliders.png" },
    { name: "jmr jawbreakers", url: "https://emojis.slackmojis.com/emojis/images/1643514926/9444/jmr_jawbreakers.jpg" },
    { name: "jmr indigostars", url: "https://emojis.slackmojis.com/emojis/images/1643514926/9443/jmr_indigostars.jpg" },
    { name: "jmr mintymaniacs", url: "https://emojis.slackmojis.com/emojis/images/1643514927/9459/jmr_mintymaniacs.png" },
    { name: "jmr thunderbolts", url: "https://emojis.slackmojis.com/emojis/images/1643514928/9469/jmr_thunderbolts.png" },
    { name: "jmr galactic", url: "https://emojis.slackmojis.com/emojis/images/1643514926/9450/jmr_galactic.png" },
    { name: "jmr greenducks", url: "https://emojis.slackmojis.com/emojis/images/1643514927/9451/jmr_greenducks.png" },
    { name: "jmr galactic", url: "https://emojis.slackmojis.com/emojis/images/1643514926/9439/jmr_galactic.jpg" },
    { name: "jmr midnightwhisps", url: "https://emojis.slackmojis.com/emojis/images/1643514927/9458/jmr_midnightwhisps.png" },
    { name: "jmr greenducks", url: "https://emojis.slackmojis.com/emojis/images/1643514926/9440/jmr_greenducks.jpg" },
    { name: "jmr hornets", url: "https://emojis.slackmojis.com/emojis/images/1643514929/9471/jmr_hornets.png" },
    { name: "jmr snowballs", url: "https://emojis.slackmojis.com/emojis/images/1643514928/9466/jmr_snowballs.png" },
    { name: "jmr chocolatiers", url: "https://emojis.slackmojis.com/emojis/images/1643514925/9437/jmr_chocolatiers.jpg" },
    { name: "jmr savagespeeders", url: "https://emojis.slackmojis.com/emojis/images/1643514928/9465/jmr_savagespeeders.png" },
    { name: "jmr hazers", url: "https://emojis.slackmojis.com/emojis/images/1643514927/9452/jmr_hazers.png" },
    { name: "jmr oceanics", url: "https://emojis.slackmojis.com/emojis/images/1643514928/9460/jmr_oceanics.png" },
    { name: "yahoo games boybluehat", url: "https://emojis.slackmojis.com/emojis/images/1643514950/9732/yahoo_games_boybluehat.png" },
    { name: "yahoo games otter", url: "https://emojis.slackmojis.com/emojis/images/1643514950/9729/yahoo_games_otter.png" },
    { name: "yahoo games pinkhair", url: "https://emojis.slackmojis.com/emojis/images/1643514951/9736/yahoo_games_pinkhair.png" },
    { name: "yahoo games puss", url: "https://emojis.slackmojis.com/emojis/images/1643514950/9733/yahoo_games_puss.png" },
    { name: "yahoo games doggiestyle", url: "https://emojis.slackmojis.com/emojis/images/1643514950/9734/yahoo_games_doggiestyle.png" },
    { name: "yahoo games woman", url: "https://emojis.slackmojis.com/emojis/images/1643514950/9731/yahoo_games_woman.png" },
    { name: "yahoo games dragon", url: "https://emojis.slackmojis.com/emojis/images/1643514950/9728/yahoo_games_dragon.png" },
    { name: "yahoo games mohawk", url: "https://emojis.slackmojis.com/emojis/images/1643514950/9727/yahoo_games_mohawk.png" },
    { name: "yahoo games alien", url: "https://emojis.slackmojis.com/emojis/images/1643514950/9735/yahoo_games_alien.png" },
    { name: "yahoo games flower", url: "https://emojis.slackmojis.com/emojis/images/1643514950/9730/yahoo_games_flower.png" },
  ];
  const bluemojiCatalogSource = "https://bluemoji.io/";
  const bluemojiCatalog = [
    { name: "happy big grin", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66b3eb8b62002e43c3fa2eea_01.png" },
    { name: "wink", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66b3ec53df5ec1b8405d4de0_02.png" },
    { name: "raised eyebrow", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66b3ec359922e31368c2c58e_03.png" },
    { name: "checking out", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66b3ec2d6477b8e963f84a4f_04.png" },
    { name: "in love", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66b3ec3d99123fa294ad574c_05.png" },
    { name: "crazy in love with tongue out", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66b3ec484aab267bf1610629_06.png" },
    { name: "grinning face with sweat", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66b3ec2515f9e7a640a994d6_07.png" },
    { name: "tongue out", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66b3ec1d4e2d54b94bd1c855_08.png" },
    { name: "sexy biting lip", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66b3ec144fabc11a79ba36a5_09.png" },
    { name: "appalled", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66b3ec0c88ed608381463cc5_10.png" },
    { name: "kiss", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66b3ec0264370ddcfd1be8e0_11.png" },
    { name: "got someting in mind", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66b3ebf954f19fb9c87f36b5_12.png" },
    { name: "woozy face", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66b3ebc088ed608381460504_14.png" },
    { name: "blank smile", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66b3ebee9fba77d7c220630c_15.png" },
    { name: "annoyed", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66b3ebaa1593063206330921_16.png" },
    { name: "drool", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/671cce6c961e9dc1fafa45b7_16.png" },
    { name: "smiling face with sunglasses", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66b3ebb4e15ae36942b44682_17.png" },
    { name: "sad", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66b3eba284d9bc814570814d_18.png" },
    { name: "tearing up", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66b3eb957f22ff6be5942c1a_19.png" },
    { name: "nerd glasses", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66b3eb826bc6e984281381bc_20.png" },
    { name: "secret keep quiet hush mewing", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66e99db1f5c63f46f7415051_020.png" },
    { name: "mouth open in rage", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66b3eb7a89ff4ef9005de4ad_21.png" },
    { name: "shock", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66b3eb6ff0b64c8db0fa10d0_22.png" },
    { name: "unimpressed", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66b3eb65141c0eed8d5409a6_23.png" },
    { name: "displeased", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66b3eb19130054e7a5afae28_24.png" },
    { name: "impressed with stars in eyes", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66b3eb5b33090c8030cddfdb_25.png" },
    { name: "putting tongue out", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66b3eb524d2a3e8c2a5d026d_26.png" },
    { name: "dumbfound", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66b3eb0ffe019f8eb4b61ffc_28.png" },
    { name: "laughing squinting face", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66b3ebe384d9bc814570b159_28.png" },
    { name: "in shock", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66b3eb0533090c8030cdab4e_29.png" },
    { name: "sad and silently crying", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66b3eafb2ec8835eba4c738b_30.png" },
    { name: "frowny face emoticon", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66b3eade32510275949e4be6_34.png" },
    { name: "goofy", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66b3ead488ed608381457562_35.png" },
    { name: "growling mad smiley", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66b3eab52d22ba929863dc7a_36.png" },
    { name: "nothing seems right", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66b3eac64fa4ba1531cd262e_37.png" },
    { name: "huge grin", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66b3eaa4e481354bcf4b6b5c_38.png" },
    { name: "devious", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66b3eb4819f48592fa6efc03_41.png" },
    { name: "can't unsee this", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66b3ea739479633d9833e202_41.png" },
    { name: "seasick smiley", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66b3ea40ea93b8bd74ff535e_42.png" },
    { name: "happy and cheering", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66b3ea5489be478613512121_43.png" },
    { name: "face palm", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66b3ea0bbf2717e5d8848926_44.png" },
    { name: "holding it in", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66b3ea6b437be789ded213fd_45.png" },
    { name: "exhausted", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66b3ea5e4fa4ba1531cce640_46.png" },
    { name: "waving hello", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66b3ea338a302af8c2b8cc58_47.png" },
    { name: "face with open mouth", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66b3ea26cf2f582bf692368b_48.png" },
    { name: "missing teeth silly", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66b3ea027f22ff6be5934c2f_49.png" },
    { name: "roaring angry beast", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66b3ea1dcffcb68152a70549_50.png" },
    { name: "innocent and pretty", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66b3e9ea16121c4a0759ffbb_53.png" },
    { name: "uncertain / shrug", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66b3e9e11f8df07b5f1f9fc1_54.png" },
    { name: "can't look and too scared", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66b3e9d199f130135a88d4b8_55.png" },
    { name: "contented grin", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66b3e9c4ccde70cabd69cb17_56.png" },
    { name: "wacky face", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66b3e9b89291ddecfb8e7e48_57.png" },
    { name: "red lips smack kiss", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66b3e972607b5d1305d75809_58.png" },
    { name: "cookie muncher", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66b3e9ab1c71c3adb2b2e71c_59.png" },
    { name: "love from the heart", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66b3e9a09291ddecfb8e714b_60.png" },
    { name: "freaked out", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66b3e99627091900881d8abc_61.png" },
    { name: "sleepy and yawning", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66b3e98d7c1109b0a823625b_62.png" },
    { name: "give me a hug", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66b3e985963c02fc15208028_63.png" },
    { name: "suspicious heavy-lidded", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66b3e807ccde70cabd68b603_65.png" },
    { name: "pearly whites smiley", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66b3e7fc9f59c5196c44f24f_66.png" },
    { name: "punched in face black-eye smiley", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66b3e64db28ac4501d1bfbf1_67.png" },
    { name: "fountains of tears", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66b3e688ccde70cabd67e8ec_68.png" },
    { name: "praying please", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66b3e659d9bbb8343a2978d3_69.png" },
    { name: "instant regret with hands on head", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66b3e67f60bd0c05aa29a1d6_70.png" },
    { name: "making an argument", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66b3e676a9a2aa116ea7f0e8_71.png" },
    { name: "holding its breath clearly innocent", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66b3e66d2a805640c8a50154_72.png" },
    { name: "unamused face", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66b3e661d456453abd7fa14b_73.png" },
    { name: "cringed", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66b3e6422bbde0b639c7cb62_74.png" },
    { name: "very touched", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66b3e635c4bc710e98592ced_75.png" },
    { name: "offering a rose", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66b3e61e2bbde0b639c7aaa1_77.png" },
    { name: "pleading face", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66b3e615337065d6841614aa_78.png" },
    { name: "wearing shades", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66b3e5f2a6470bf89b0a2bc3_79.png" },
    { name: "pointing and laughing in tears", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66b3e5fbd9bbb8343a2928d0_82.png" },
    { name: "thumbs up", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66b3e5e99c9555f1ca59ad72_83.png" },
    { name: "ok sign", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66b3e5e1ccde70cabd67779a_84.png" },
    { name: "suspicious big eye", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66b3e5d90608f3f68cb0efc5_85.png" },
    { name: "double thumbs up", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66b3e5d0c2ab246786ca1d5e_86.png" },
    { name: "scared and defending", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66b3e5c527091900881b2b89_87.png" },
    { name: "frustrated", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66b3e5bd10648166d945ef2f_88.png" },
    { name: "salute", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66b3e5b47785ef9d9fc8040b_89.png" },
    { name: "partying", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66b3e594607b5d1305d4f5b7_90.png" },
    { name: "shy", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66b3e58bf4a1d9b1b453e5df_91.png" },
    { name: "ooh", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66b3e58387f7cb984dde9eb7_92.png" },
    { name: "desperate", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66b3e5760608f3f68cb0b04b_93.png" },
    { name: "troll face", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/66b3e2b30608f3f68caf31d3_94.png" },
    { name: "mewing", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/671ff00d29c65f1f25fb28c0_95.png" },
    { name: "thousand-yard stare", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/671ff18d174384ea7bb16670_96.png" },
    { name: "cat face", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/671ff422cf42c0c857f6997c_97.png" },
    { name: "disappearing", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/671ff49b6772ce5f25cf3195_98.png" },
    { name: ":3", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/671ff8b58b0b4715228b0c1f_99.png" },
    { name: "silly happy", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/671ffb924cdb9c1818e2724c_100.png" },
    { name: "rose in teeth", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/698d090e4e461424944a430f_101.png" },
    { name: "thumbs down", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/698d0c11601115d9bc83b568_102.png" },
    { name: "hold up", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/698d109df27d3e88e8ed8f4b_103.png" },
    { name: "trying not to laugh", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/698d12ef6e6021084ae535f3_104.png" },
    { name: "checking you out", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/698d18778a4299f7454afd1a_105.png" },
    { name: "heavy breathing", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/698e38b2cda91d593451a699_106.png" },
    { name: "shrug", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/698e41fc8ca563c9d4c24cb9_107.png" },
    { name: "fire punch", url: "https://cdn.prod.website-files.com/646218c67da47160c64a84d5/698e463cd3fd602b0854b2f3_108.png" },
  ];
  // slackmojisCatalog / bluemojiCatalog: Slackmojis from slackmojis.com HTML; Bluemoji from bluemoji.io (Webflow CDN). Re-fetch pages to refresh.

  function fileSlugFromEmojiUrl(url) {
    var base = String(url || "").split("/").pop() || "";
    return String(base.replace(/\.(png|gif|jpe?g|webp)$/i, "")).toLowerCase();
  }

  var slackmojiBySlug = {};
  slackmojisCatalog.forEach(function (entry) {
    var slug = fileSlugFromEmojiUrl(entry.url);
    if (slug && !slackmojiBySlug[slug]) {
      slackmojiBySlug[slug] = { url: entry.url, name: entry.name };
    }
  });
  bluemojiCatalog.forEach(function (entry) {
    var slug = fileSlugFromEmojiUrl(entry.url);
    if (slug && !slackmojiBySlug[slug]) {
      slackmojiBySlug[slug] = { url: entry.url, name: entry.name };
    }
  });

  function readStickerSendMode() {
    try {
      return sessionStorage.getItem("arcadyStickerSendMode") === "inline" ? "inline" : "box";
    } catch (error) {
      return "box";
    }
  }

  const messageLimit = 60;
  const maxImageBytes = 750 * 1024;
  const maxAvatarBytes = 768 * 1024;
  const maxAvatarFileBytes = 512 * 1024;
  const avatarDisplaySize = 72;
  const xpPerLevel = 100;
  const typingPresenceTtl = 4200;
  const nickStyleStorageKey = "arcadyHomeChatNickStyle";
  const avatarEffectStorageKey = "arcadyVisitorAvatarEffect";
  const nickFontKeyToStack = {
    fredoka: "'Fredoka', sans-serif",
    roboto: "'Roboto', sans-serif",
    playfair: "'Playfair Display', serif",
    mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace",
    system: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    arial: "Arial, sans-serif",
    verdana: "Verdana, Geneva, sans-serif",
    georgia: "Georgia, serif",
    times: "'Times New Roman', Times, serif",
    courier: "'Courier New', Courier, monospace",
    trebuchet: "'Trebuchet MS', sans-serif",
    impact: "Impact, fantasy",
    comic: "'Comic Sans MS', 'Comic Sans', cursive, sans-serif",
    segoe: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    calibri: "Calibri, Candara, Segoe, sans-serif",
    century: "'Century Gothic', CenturyGothic, AppleGothic, sans-serif",
    palatino: "Palatino, 'Palatino Linotype', 'Book Antiqua', serif",
    baskerville: "'Baskerville', serif",
    lucida: "'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Geneva, sans-serif",
    futura: "Futura, 'Trebuchet MS', Arial, sans-serif",
    helvetica: "Helvetica, Arial, sans-serif",
    oswald: "Oswald, sans-serif",
    noto: "'Noto Sans', sans-serif",
    ubuntu: "Ubuntu, sans-serif",
    montserrat: "Montserrat, sans-serif",
    poppins: "Poppins, sans-serif",
    lato: "Lato, sans-serif",
    merriweather: "Merriweather, serif",
    inter: "Inter, sans-serif",
    serif: "serif",
    sans: "sans-serif"
  };
  const nickEffectSlugs = [
    "none",
    "glow",
    "shimmer",
    "pulse",
    "rainbow",
    "spin",
    "float",
    "wobble",
    "tilt",
    "neon",
    "outline",
    "shadow",
    "glitch",
    "vaporwave",
    "cyber",
    "fire",
    "ice",
    "magic",
    "sparkle",
    "halo",
    "drift",
    "bounce",
    "flip",
    "swell",
    "ripple",
    "haze",
    "flicker",
    "blur",
    "zoom",
    "swirl"
  ];
  const nameTagEffectSlugs = ["none", "glow", "shimmer", "pulse", "rainbow"];
  const avatarEffectSlugs = [
    "none",
    "spin",
    "pulse",
    "float",
    "glow",
    "shadow",
    "shake",
    "wobble",
    "flip",
    "drift",
    "zoom",
    "sparkle",
    "halo",
    "flicker",
    "blur"
  ];
  const reactionOptions = [
    { key: "thumbs_up", emoji: "👍", label: "Thumbs up" },
    { key: "red_heart", emoji: "❤️", label: "Love" },
    { key: "laugh", emoji: "😂", label: "Laugh" },
    { key: "fire", emoji: "🔥", label: "Fire" },
    { key: "star_struck", emoji: "🤩", label: "Star-struck" },
    { key: "party", emoji: "🥳", label: "Party" },
    { key: "mind_blown", emoji: "🤯", label: "Mind blown" },
    { key: "sob", emoji: "😢", label: "Sad" },
    { key: "clap", emoji: "👏", label: "Clap" },
    { key: "raised_hands", emoji: "🙌", label: "Raised hands" },
    { key: "ok_hand", emoji: "👌", label: "OK" },
    { key: "victory_hand", emoji: "✌️", label: "Victory" },
    { key: "pray", emoji: "🙏", label: "Pray" },
    { key: "rocket", emoji: "🚀", label: "Rocket" },
    { key: "tada", emoji: "🎉", label: "Tada" },
    { key: "100", emoji: "💯", label: "100" },
    { key: "sparkle", emoji: "✨", label: "Sparkle" },
    { key: "crown", emoji: "👑", label: "Crown" },
    { key: "eyes", emoji: "👀", label: "Eyes" },
    { key: "thinking", emoji: "🤔", label: "Thinking" },
    { key: "hug", emoji: "🤗", label: "Hug" },
    { key: "kiss", emoji: "😘", label: "Kiss" },
    { key: "blush", emoji: "😊", label: "Blush" },
    { key: "wink", emoji: "😉", label: "Wink" },
    { key: "relieved", emoji: "😌", label: "Relieved" },
    { key: "cry", emoji: "😭", label: "Crying" },
    { key: "scream", emoji: "😱", label: "Scream" },
    { key: "drooling", emoji: "🤤", label: "Drooling" },
    { key: "zany", emoji: "🤪", label: "Zany" },
    { key: "sunglasses", emoji: "😎", label: "Cool" },
    { key: "nerd", emoji: "🤓", label: "Nerd" },
    { key: "robot", emoji: "🤖", label: "Robot" },
    { key: "ghost", emoji: "👻", label: "Ghost" },
    { key: "unicorn", emoji: "🦄", label: "Unicorn" },
    { key: "pizza", emoji: "🍕", label: "Pizza" },
    { key: "burger", emoji: "🍔", label: "Burger" },
    { key: "popcorn", emoji: "🍿", label: "Popcorn" },
    { key: "ice_cream", emoji: "🍦", label: "Ice cream" },
    { key: "cake", emoji: "🎂", label: "Cake" },
    { key: "donut", emoji: "🍩", label: "Donut" },
    { key: "trophy", emoji: "🏆", label: "Trophy" },
    { key: "medal", emoji: "🥇", label: "Medal" },
    { key: "soccer", emoji: "⚽", label: "Soccer" },
    { key: "basketball", emoji: "🏀", label: "Basketball" },
    { key: "video_game", emoji: "🎮", label: "Gaming" },
    { key: "music", emoji: "🎶", label: "Music" },
    { key: "rainbow", emoji: "🌈", label: "Rainbow" },
    { key: "moon", emoji: "🌙", label: "Moon" },
    { key: "sun", emoji: "☀️", label: "Sun" }
  ];
  const protectedNickname = decodeValue("QXJjYWR5");
  const protectedNicknameKey = String(protectedNickname || "").trim().toLowerCase();

  const state = {
    db: null,
    ready: false,
    sending: false,
    messages: [],
    selectedImage: null,
    selectedGifUrl: "",
    selectedGifName: "",
    gifLibrary: [],
    gifLibraryLoaded: false,
    gifsLoading: false,
    gifPanelOpen: false,
    typingUsers: {},
    typingRefreshTimer: 0,
    typingClearTimer: 0,
    typingActive: false,
    ownerUnlocked: readOwnerAccess(),
    deviceId: getDeviceId(),
    xpProfiles: {},
    adminGrants: {},
    selectedProfileKey: "",
    activeReactionPickerMessageId: "",
    chatBans: {
      devices: {},
      nicknames: {}
    },
    chatTimeouts: {},
    replyDraft: null,
    mentionOpen: false,
    mentionHighlight: 0,
    mentionItems: [],
    mentionRange: null,
    stickerSendMode: readStickerSendMode(),
    emojiOpen: false,
    emojiHighlight: 0,
    emojiItems: [],
    emojiRange: null,
    nameTagDefs: {},
    userNameTags: {},
    // FaceTime feature removed
  };

  const els = {};

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  function init() {
    cacheElements();
    if (!els.panel || !els.feed || !els.input || !els.sendButton) {
      return;
    }
    ensureGifUi();
    cacheElements();
    ensureComposeMetaUi();
    cacheElements();
    ensureReplyAndMentionUi();
    cacheElements();

    bindUi();
    syncStickerModeRadios();
    initAvatarControls();
    initNicknameStylePanel();
    renderMessages();
    renderGifLibrary();
    syncGifPickerUi();
    renderTypingIndicator();
    renderReplyBarUI();
    updateComposerState();
    updateSelectedMediaMeta();
    setStatus(readNickname() ? "Connecting homepage chat..." : "Set your nickname above to start chatting.");
    initFirebase();
  }

  function cacheElements() {
    els.panel = document.getElementById("home-chat-panel");
    els.feed = document.getElementById("home-chat-feed");
    els.empty = document.getElementById("home-chat-empty");
    els.status = document.getElementById("home-chat-status");
    els.input = document.getElementById("home-chat-input");
    els.imageInput = document.getElementById("home-chat-image-input");
    els.attach = document.getElementById("home-chat-attach");
    els.sendButton = document.getElementById("home-chat-send");
    els.fileMeta = document.getElementById("home-chat-file");
    els.compose = els.panel ? els.panel.querySelector(".home-chat-compose") : null;
    els.composeRow = els.panel ? els.panel.querySelector(".home-chat-compose-row") : null;
    els.composeMeta = els.panel ? els.panel.querySelector(".home-chat-compose-meta") : null;
    els.gifToggle = document.getElementById("home-chat-gif-toggle");
    els.gifPanel = document.getElementById("home-chat-gif-panel");
    els.gifGrid = document.getElementById("home-chat-gif-grid");
    els.slackmojisGrid = document.getElementById("home-chat-slackmojis-grid");
    els.bluemojiGrid = document.getElementById("home-chat-bluemoji-grid");
    els.gifStatus = document.getElementById("home-chat-gif-status");
    els.typing = document.getElementById("home-chat-typing");
    els.refreshButton = document.getElementById("home-chat-refresh");
    els.replyBar = document.getElementById("home-chat-reply-bar");
    els.replyName = document.querySelector("#home-chat-reply-bar .home-chat-reply-name");
    els.replySnippet = document.querySelector("#home-chat-reply-bar .home-chat-reply-snippet");
    els.replyCancel = document.getElementById("home-chat-reply-cancel");
    els.inputWrap = document.querySelector(".home-chat-input-wrap");
    els.mentionList = document.getElementById("home-chat-mention-suggest");
    els.emojiList = document.getElementById("home-chat-emoji-suggest");
  }

  function buildHomeChatMediaPanelInnerHtml() {
    return [
      '<div class="home-chat-gif-toolbar">',
      '  <div class="home-chat-gif-title">Media &amp; stickers</div>',
      '  <div class="home-chat-gif-status" id="home-chat-gif-status">Open Media to load the libraries.</div>',
      '</div>',
      '<div class="home-chat-sticker-mode-bar" role="group" aria-label="How to send stickers">',
      '  <span class="home-chat-sticker-mode-label">Send stickers as</span>',
      '  <label class="home-chat-sticker-mode-opt"><input type="radio" name="home-chat-sticker-mode" id="home-chat-sticker-mode-box" value="box" checked> Large (box)</label>',
      '  <label class="home-chat-sticker-mode-opt"><input type="radio" name="home-chat-sticker-mode" id="home-chat-sticker-mode-inline" value="inline"> Inline 32×32</label>',
      '</div>',
      '<div class="home-chat-gif-section">',
      '  <div class="home-chat-gif-subtitle">Arcady library</div>',
      '  <div class="home-chat-gif-grid" id="home-chat-gif-grid">',
      '    <div class="home-chat-gif-empty">Open Media to load the Arcady library.</div>',
      '  </div>',
      '</div>',
      '<div class="home-chat-gif-section home-chat-slackmojis-section">',
      '  <div class="home-chat-gif-subtitle">Slackmojis <a class="home-chat-slackmojis-source" href="' + slackmojisCatalogSource + '" target="_blank" rel="noopener noreferrer">slackmojis.com</a></div>',
      '  <div class="home-chat-gif-grid home-chat-slackmojis-grid" id="home-chat-slackmojis-grid">',
      '    <div class="home-chat-gif-empty">Open Media to load Slackmojis from slackmojis.com.</div>',
      '  </div>',
      '</div>',
      '<div class="home-chat-gif-section home-chat-bluemoji-section">',
      '  <div class="home-chat-gif-subtitle">Bluemoji <a class="home-chat-slackmojis-source" href="' + bluemojiCatalogSource + '" target="_blank" rel="noopener noreferrer">bluemoji.io</a></div>',
      '  <div class="home-chat-gif-grid home-chat-bluemoji-grid" id="home-chat-bluemoji-grid">',
      '    <div class="home-chat-gif-empty">Open Media to load Bluemoji from bluemoji.io.</div>',
      '  </div>',
      '</div>'
    ].join("");
  }

  function ensureGifUi() {
    if (!els.compose || !els.composeRow) {
      return;
    }

    if (!document.getElementById("home-chat-gif-toggle")) {
      const gifToggle = document.createElement("button");
      gifToggle.id = "home-chat-gif-toggle";
      gifToggle.className = "home-chat-gif-toggle";
      gifToggle.type = "button";
      gifToggle.textContent = "Media";

      if (els.sendButton && els.sendButton.parentNode === els.composeRow) {
        els.composeRow.insertBefore(gifToggle, els.sendButton);
      } else {
        els.composeRow.appendChild(gifToggle);
      }
    }

    let gifPanel = document.getElementById("home-chat-gif-panel");
    if (!gifPanel) {
      gifPanel = document.createElement("div");
      gifPanel.className = "home-chat-gif-panel";
      gifPanel.id = "home-chat-gif-panel";
      gifPanel.innerHTML = buildHomeChatMediaPanelInnerHtml();
      els.compose.appendChild(gifPanel);
      syncStickerModeRadios();
      return;
    }

    if (!document.getElementById("home-chat-slackmojis-grid") || !document.getElementById("home-chat-bluemoji-grid") || !document.getElementById("home-chat-sticker-mode-box")) {
      gifPanel.innerHTML = buildHomeChatMediaPanelInnerHtml();
    }
    syncStickerModeRadios();
  }






  function ensureComposeMetaUi() {
    if (!els.panel || !els.feed || !els.compose) {
      return;
    }
    if (document.getElementById("home-chat-typing")) {
      return;
    }
    const bar = document.createElement("div");
    bar.id = "home-chat-typing";
    bar.className = "home-chat-typing-bar";
    bar.setAttribute("aria-live", "polite");
    bar.setAttribute("aria-atomic", "true");
    bar.hidden = true;
    els.panel.insertBefore(bar, els.compose);
  }

  function ensureReplyAndMentionUi() {
    if (!els.compose || !els.composeRow || !els.input) {
      return;
    }
    if (!document.getElementById("home-chat-reply-bar")) {
      const replyBar = document.createElement("div");
      replyBar.id = "home-chat-reply-bar";
      replyBar.className = "home-chat-reply-bar";
      replyBar.hidden = true;
      replyBar.innerHTML =
        '<div class="home-chat-reply-inner">' +
        '<div class="home-chat-reply-preview">' +
        '<span class="home-chat-reply-label">Replying to</span> ' +
        '<strong class="home-chat-reply-name"></strong>' +
        '<span class="home-chat-reply-snippet"></span>' +
        "</div>" +
        '<button type="button" class="home-chat-reply-cancel" id="home-chat-reply-cancel" aria-label="Cancel reply">×</button>' +
        "</div>";
      els.compose.insertBefore(replyBar, els.composeRow);
    }
    if (els.input.parentNode === els.composeRow && !els.composeRow.querySelector(".home-chat-input-wrap")) {
      const wrap = document.createElement("div");
      wrap.className = "home-chat-input-wrap";
      const list = document.createElement("div");
      list.id = "home-chat-mention-suggest";
      list.className = "home-chat-mention-suggest";
      list.hidden = true;
      list.setAttribute("role", "listbox");
      els.composeRow.insertBefore(wrap, els.input);
      wrap.appendChild(els.input);
      wrap.appendChild(list);
      const emojiList = document.createElement("div");
      emojiList.id = "home-chat-emoji-suggest";
      emojiList.className = "home-chat-emoji-suggest";
      emojiList.hidden = true;
      emojiList.setAttribute("role", "listbox");
      emojiList.setAttribute("aria-label", "Emoji suggestions");
      wrap.appendChild(emojiList);
    } else {
      const wrap = els.composeRow.querySelector(".home-chat-input-wrap");
      if (wrap && !document.getElementById("home-chat-emoji-suggest")) {
        const emojiList = document.createElement("div");
        emojiList.id = "home-chat-emoji-suggest";
        emojiList.className = "home-chat-emoji-suggest";
        emojiList.hidden = true;
        emojiList.setAttribute("role", "listbox");
        emojiList.setAttribute("aria-label", "Emoji suggestions");
        wrap.appendChild(emojiList);
      }
    }
  }

  function syncStickerModeRadios() {
    var box = document.getElementById("home-chat-sticker-mode-box");
    var inlineEl = document.getElementById("home-chat-sticker-mode-inline");
    if (!box || !inlineEl) {
      return;
    }
    if (state.stickerSendMode === "inline") {
      inlineEl.checked = true;
      box.checked = false;
    } else {
      box.checked = true;
      inlineEl.checked = false;
    }
  }

  function bindUi() {
    els.sendButton.addEventListener("click", sendMessage);
    if (els.refreshButton) {
      els.refreshButton.addEventListener("click", function () {
        refreshChatFeed();
      });
    }
    els.input.addEventListener("input", handleDraftInput);
    els.feed.addEventListener("click", handleFeedActionClick);
    els.input.addEventListener("keydown", handleComposerKeydown);
    els.input.addEventListener("blur", clearTypingSoon);
    els.imageInput.addEventListener("change", handleImageSelection);
    if (els.gifToggle) {
      els.gifToggle.addEventListener("click", toggleGifPanel);
    }
    if (els.gifPanel) {
      els.gifPanel.addEventListener("click", handleGifGridClick);
      els.gifPanel.addEventListener("change", function (event) {
        const t = event.target;
        if (t && t.name === "home-chat-sticker-mode") {
          state.stickerSendMode = t.value === "inline" ? "inline" : "box";
          try {
            sessionStorage.setItem("arcadyStickerSendMode", state.stickerSendMode);
          } catch (error) {}
          updateSelectedMediaMeta();
        }
      });
    }
    if (els.emojiList) {
      els.emojiList.addEventListener("click", function (event) {
        const btn = event.target.closest("[data-emoji-pick]");
        if (btn) {
          event.preventDefault();
          applyEmojiPick(btn.getAttribute("data-emoji-pick"));
        }
      });
    }
    document.addEventListener("keydown", handleGlobalComposerShortcut);
    document.addEventListener("mousedown", handleDocumentPointerForMention, true);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    if (els.replyCancel) {
      els.replyCancel.addEventListener("click", clearReplyDraft);
    }
    if (els.mentionList) {
      els.mentionList.addEventListener("click", function (event) {
        const btn = event.target.closest("[data-mention-pick]");
        if (btn) {
          event.preventDefault();
          applyMentionPick(btn.getAttribute("data-mention-pick"));
        }
      });
    }
    window.addEventListener("pagehide", clearTypingPresence);
    window.addEventListener("beforeunload", clearTypingPresence);
    window.addEventListener("arcady:nickname-change", function () {
      hideMentionSuggest();
      hideEmojiSuggest();
      syncNicknameAvatarPreview();
      updateComposerState();
      renderMessages(false);
      renderTypingIndicator();
      syncTypingPresence();
      setStatus(readNickname() ? (state.ready ? "Chat live. Say something." : "Connecting homepage chat...") : "Set your nickname above to start chatting.");
    });
    window.addEventListener("arcady:nick-style-change", function () {
      renderMessages(false);
      renderTypingIndicator();
    });
    window.addEventListener("arcady:avatar-change", function () {
      syncNicknameAvatarPreview();
      renderMessages(false);
    });
    window.addEventListener("arcady:owner-access-change", function (event) {
      state.ownerUnlocked = !!(event && event.detail && event.detail.unlocked);
      renderMessages(false);
    });
    window.addEventListener("storage", function (event) {
      if (event.key === "arcadyVisitorNickname") {
        updateComposerState();
        renderMessages(false);
        renderTypingIndicator();
        syncTypingPresence();
        if (!readNickname()) {
          clearTypingPresence();
        }
      } else if (event.key === "arcadyOwnerUnlocked") {
        state.ownerUnlocked = readOwnerAccess();
        renderMessages(false);
      } else if (event.key === "arcadyVisitorAvatar") {
        syncNicknameAvatarPreview();
        renderMessages(false);
      } else if (event.key === nickStyleStorageKey) {
        renderMessages(false);
        renderTypingIndicator();
      }
    });
    window.addEventListener("arcady:home-chat-refresh", refreshChatFeed);
  }

  function refreshChatFeed() {
    if (!state.db) {
      setStatus("Chat is offline and cannot refresh right now.");
      return;
    }

    state.db.ref(chatPath).limitToLast(messageLimit).once("value").then(function (snapshot) {
      const next = [];

      snapshot.forEach(function (child) {
        next.push(normalizeMessage(child.val(), child.key));
      });

      next.sort(function (a, b) {
        return Number(a.createdAt || 0) - Number(b.createdAt || 0);
      });

      state.messages = next;
      renderMessages(true);
      setStatus(readNickname() ? "Chat refreshed." : "Set your nickname above to start chatting.");
    }).catch(function () {
      setStatus("Unable to refresh chat right now.");
    });
  }

  async function initFirebase() {
    if (!firebaseConfig.apiKey || !firebaseConfig.projectId || !firebaseConfig.appId || !firebaseConfig.databaseURL) {
      setStatus("Homepage chat is offline right now.");
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

      state.db = app.database();
      state.ready = true;
      updateComposerState();
      setStatus(readNickname() ? "Chat live. Say something." : "Set your nickname above to start chatting.");
      subscribeToBans();
      subscribeToChatTimeouts();
      subscribeToProfiles();
      subscribeToNameTags();
      subscribeToUserNameTags();
      subscribeToMessages();
      subscribeToTyping();
    } catch (error) {
      console.error("Arcady homepage chat failed to initialize:", error);
      setStatus("Homepage chat could not connect.");
      updateComposerState();
    }
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
        if (existing.dataset.loaded === "true") {
          resolve();
          return;
        }
        existing.addEventListener("load", resolve, { once: true });
        existing.addEventListener("error", reject, { once: true });
        return;
      }

      const script = document.createElement("script");
      script.src = src;
      script.addEventListener("load", function () {
        script.dataset.loaded = "true";
        resolve();
      }, { once: true });
      script.addEventListener("error", reject, { once: true });
      document.head.appendChild(script);
    });
  }

  function subscribeToMessages() {
    if (!state.db) {
      return;
    }

    state.db.ref(chatPath).limitToLast(messageLimit).on("value", function (snapshot) {
      const next = [];
      snapshot.forEach(function (child) {
        next.push(normalizeMessage(child.val(), child.key));
      });
      next.sort(function (a, b) {
        return Number(a.createdAt || 0) - Number(b.createdAt || 0);
      });
      state.messages = next;
      renderMessages(true);
    });
  }

  function subscribeToTyping() {
    if (!state.db) {
      return;
    }

    state.db.ref(chatTypingPath).on("value", function (snapshot) {
      state.typingUsers = snapshot.val() || {};
      renderTypingIndicator();
    });

    if (!state.typingRefreshTimer) {
      state.typingRefreshTimer = window.setInterval(renderTypingIndicator, 1500);
    }
  }

  function subscribeToBans() {
    if (!state.db) {
      return;
    }

    state.db.ref(chatBansDevicesPath).on("value", function (snapshot) {
      state.chatBans.devices = snapshot.val() || {};
      updateComposerState();
      renderMessages(false);
    });

    state.db.ref(chatBansNicknamesPath).on("value", function (snapshot) {
      state.chatBans.nicknames = snapshot.val() || {};
      updateComposerState();
      renderMessages(false);
    });
  }

  function subscribeToChatTimeouts() {
    if (!state.db) {
      return;
    }

    state.db.ref(chatTimeoutsDevicesPath).on("value", function (snapshot) {
      state.chatTimeouts = snapshot.val() || {};
      const now = Date.now();
      Object.keys(state.chatTimeouts).forEach(function (deviceId) {
        const entry = state.chatTimeouts[deviceId];
        const until = Number(entry && entry.until || 0);
        if (until > 0 && until <= now) {
          state.db.ref(chatTimeoutsDevicesPath + "/" + deviceId).remove().catch(function () {});
        }
      });
      updateComposerState();
      renderMessages(false);
    });
  }

  function subscribeToProfiles() {
    if (!state.db) {
      return;
    }

    state.db.ref(xpUsersPath).on("value", function (snapshot) {
      state.xpProfiles = snapshot.val() || {};
      renderMessages(false);
    });

    state.db.ref(adminGrantsPath).on("value", function (snapshot) {
      state.adminGrants = snapshot.val() || {};
      renderMessages(false);
    });
  }

  function subscribeToNameTags() {
    if (!state.db) {
      return;
    }
    state.db.ref(nameTagsPath).on("value", function (snapshot) {
      state.nameTagDefs = snapshot.val() || {};
      renderMessages(false);
    });
  }

  function subscribeToUserNameTags() {
    if (!state.db) {
      return;
    }
    state.db.ref(userNameTagsPath).on("value", function (snapshot) {
      state.userNameTags = snapshot.val() || {};
      renderMessages(false);
      renderTypingIndicator();
    });
  }

  function sanitizeHexColor(value, fallback) {
    const raw = String(value || "").trim();
    const fb = String(fallback || "#e2e8f0").trim();
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

  function normalizeNickEffect(slug, allowedList) {
    const s = String(slug || "").trim().toLowerCase();
    return allowedList.indexOf(s) >= 0 ? s : "none";
  }

  function normalizeAvatarEffect(value) {
    return normalizeNickEffect(value, avatarEffectSlugs);
  }

  function normalizeNickStyleRecord(raw) {
    if (raw == null || typeof raw !== "object") {
      return null;
    }
    const o = raw;
    const colorRaw = String(o.color || o.c || "").trim();
    const color = colorRaw ? sanitizeHexColor(colorRaw, "#e2e8f0") : "";
    const fontKeyRaw = String(o.fontKey || o.fk || o.font || "fredoka").trim().toLowerCase();
    const fontKey = nickFontKeyToStack[fontKeyRaw] ? fontKeyRaw : "fredoka";
    const effect = normalizeNickEffect(o.effect || o.e, nickEffectSlugs);
    if (!color && effect === "none" && fontKey === "fredoka") {
      return null;
    }
    return {
      color: color || "",
      fontKey: fontKey,
      effect: effect
    };
  }

  function normalizeNickStyleForMessage(record) {
    const n = normalizeNickStyleRecord(record);
    if (!n) {
      return null;
    }
    if (!n.color && n.effect === "none" && n.fontKey === "fredoka") {
      return null;
    }
    return {
      color: n.color || "",
      fontKey: n.fontKey,
      effect: n.effect
    };
  }

  function nickStyleToCss(style) {
    const n = normalizeNickStyleRecord(style);
    if (!n) {
      return { className: "home-chat-message-name-inner", styleAttr: "" };
    }
    const parts = [];
    if (n.color) {
      parts.push("color:" + n.color);
    }
    const stack = nickFontKeyToStack[n.fontKey] || nickFontKeyToStack.fredoka;
    parts.push("font-family:" + stack);
    const fx = n.effect && n.effect !== "none" ? " home-chat-nick-fx--" + n.effect : "";
    return {
      className: "home-chat-message-name-inner" + fx,
      styleAttr: parts.length ? ' style="' + escapeAttribute(parts.join(";")) + '"' : ""
    };
  }

  function readNickStyleFromStorage() {
    try {
      const raw = localStorage.getItem(nickStyleStorageKey);
      if (!raw) {
        return null;
      }
      return normalizeNickStyleRecord(JSON.parse(raw));
    } catch (error) {
      return null;
    }
  }

  function writeNickStyleToStorage(style) {
    const n = normalizeNickStyleRecord(style);
    if (!n || (!n.color && n.effect === "none" && n.fontKey === "fredoka")) {
      localStorage.removeItem(nickStyleStorageKey);
      return;
    }
    try {
      localStorage.setItem(
        nickStyleStorageKey,
        JSON.stringify({
          color: n.color || "#e2e8f0",
          fontKey: n.fontKey,
          effect: n.effect
        })
      );
    } catch (error) {}
  }

  function getNickStyleForPayload() {
    return normalizeNickStyleForMessage(readNickStyleFromStorage());
  }

  function initNicknameStylePanel() {
    const panelRoot = document.querySelector(".nickname-panel");
    if (!panelRoot || document.getElementById("arcady-nickname-style-panel")) {
      return;
    }
    const wrap = document.createElement("div");
    wrap.className = "nickname-style-panel";
    wrap.id = "arcady-nickname-style-panel";
    wrap.innerHTML =
      '<div class="nickname-style-head">Chat display name</div>' +
      '<div class="nickname-style-meta">Color, font, and motion apply to your name in the live chat (like Discord).</div>' +
      '<div class="nickname-style-row">' +
      '<label class="nickname-style-field"><span>Color</span><input type="color" id="arcady-nick-style-color" value="#e2e8f0"></label>' +
      '<label class="nickname-style-field"><span>Font</span><select id="arcady-nick-style-font" class="nickname-style-select">' +
      '<option value="fredoka">Fredoka</option>' +
      '<option value="roboto">Roboto</option>' +
      '<option value="playfair">Playfair</option>' +
      '<option value="mono">Mono</option>' +
      '<option value="system">System UI</option>' +
      '<option value="arial">Arial</option>' +
      '<option value="verdana">Verdana</option>' +
      '<option value="georgia">Georgia</option>' +
      '<option value="times">Times</option>' +
      '<option value="courier">Courier</option>' +
      '<option value="trebuchet">Trebuchet</option>' +
      '<option value="impact">Impact</option>' +
      '<option value="comic">Comic</option>' +
      '<option value="segoe">Segoe UI</option>' +
      '<option value="calibri">Calibri</option>' +
      '<option value="century">Century Gothic</option>' +
      '<option value="palatino">Palatino</option>' +
      '<option value="baskerville">Baskerville</option>' +
      '<option value="lucida">Lucida</option>' +
      '<option value="futura">Futura</option>' +
      '<option value="helvetica">Helvetica</option>' +
      '<option value="oswald">Oswald</option>' +
      '<option value="noto">Noto</option>' +
      '<option value="ubuntu">Ubuntu</option>' +
      '<option value="montserrat">Montserrat</option>' +
      '<option value="poppins">Poppins</option>' +
      '<option value="lato">Lato</option>' +
      '<option value="merriweather">Merriweather</option>' +
      '<option value="inter">Inter</option>' +
      '<option value="serif">Serif</option>' +
      '<option value="sans">Sans-serif</option>' +
      "</select></label>" +
      '<label class="nickname-style-field"><span>Effect</span><select id="arcady-nick-style-effect" class="nickname-style-select">' +
      '<option value="none">None</option>' +
      '<option value="glow">Glow</option>' +
      '<option value="shimmer">Shimmer</option>' +
      '<option value="pulse">Pulse</option>' +
      '<option value="rainbow">Rainbow</option>' +
      '<option value="spin">Spin</option>' +
      '<option value="float">Float</option>' +
      '<option value="wobble">Wobble</option>' +
      '<option value="tilt">Tilt</option>' +
      '<option value="neon">Neon</option>' +
      '<option value="outline">Outline</option>' +
      '<option value="shadow">Shadow</option>' +
      '<option value="glitch">Glitch</option>' +
      '<option value="vaporwave">Vaporwave</option>' +
      '<option value="cyber">Cyber</option>' +
      '<option value="fire">Fire</option>' +
      '<option value="ice">Ice</option>' +
      '<option value="magic">Magic</option>' +
      '<option value="sparkle">Sparkle</option>' +
      '<option value="halo">Halo</option>' +
      '<option value="drift">Drift</option>' +
      '<option value="bounce">Bounce</option>' +
      '<option value="flip">Flip</option>' +
      '<option value="swell">Swell</option>' +
      '<option value="ripple">Ripple</option>' +
      '<option value="haze">Haze</option>' +
      '<option value="flicker">Flicker</option>' +
      '<option value="blur">Blur</option>' +
      '<option value="zoom">Zoom</option>' +
      '<option value="swirl">Swirl</option>' +
      "</select></label>" +
      '<label class="nickname-style-field"><span>Avatar effect</span><select id="arcady-avatar-effect" class="nickname-style-select">' +
      '<option value="none">None</option>' +
      '<option value="spin">Spin</option>' +
      '<option value="pulse">Pulse</option>' +
      '<option value="float">Float</option>' +
      '<option value="glow">Glow</option>' +
      '<option value="shadow">Shadow</option>' +
      '<option value="shake">Shake</option>' +
      '<option value="wobble">Wobble</option>' +
      '<option value="flip">Flip</option>' +
      '<option value="drift">Drift</option>' +
      '<option value="zoom">Zoom</option>' +
      '<option value="sparkle">Sparkle</option>' +
      '<option value="halo">Halo</option>' +
      '<option value="flicker">Flicker</option>' +
      '<option value="blur">Blur</option>' +
      "</select></label>" +
      "</div>" +
      '<div class="nickname-style-preview" aria-live="polite"><span class="nickname-style-preview-label">Preview</span> ' +
      '<span class="nickname-style-preview-name" id="arcady-nick-style-preview">Player</span></div>' +
      '<div class="nickname-style-actions">' +
      '<button type="button" class="nickname-style-reset" id="arcady-nick-style-reset">Reset style</button>' +
      "</div>";

    const row = panelRoot.querySelector(".nickname-row");
    if (row && row.parentNode) {
      row.parentNode.insertBefore(wrap, row.nextSibling);
    } else {
      panelRoot.appendChild(wrap);
    }

    const colorInput = document.getElementById("arcady-nick-style-color");
    const fontSelect = document.getElementById("arcady-nick-style-font");
    const effectSelect = document.getElementById("arcady-nick-style-effect");
    const avatarEffectSelect = document.getElementById("arcady-avatar-effect");
    const preview = document.getElementById("arcady-nick-style-preview");
    const resetBtn = document.getElementById("arcady-nick-style-reset");

    function writeAvatarEffectToStorage(effect) {
      const normalized = normalizeAvatarEffect(effect);
      if (!normalized || normalized === "none") {
        localStorage.removeItem(avatarEffectStorageKey);
        return;
      }
      try {
        localStorage.setItem(avatarEffectStorageKey, normalized);
      } catch (error) {}
    }

    function readPanelStyle() {
      return {
        color: sanitizeHexColor(colorInput && colorInput.value, "#e2e8f0"),
        fontKey: String(fontSelect && fontSelect.value || "fredoka").trim().toLowerCase(),
        effect: normalizeNickEffect(effectSelect && effectSelect.value, nickEffectSlugs)
      };
    }

    function readPanelAvatarEffect() {
      return normalizeAvatarEffect(avatarEffectSelect && avatarEffectSelect.value);
    }

    function applyPanelToStorage() {
      writeNickStyleToStorage(readPanelStyle());
      writeAvatarEffectToStorage(readPanelAvatarEffect());
      syncNicknameStylePreview();
      syncNicknameAvatarPreview();
      window.dispatchEvent(new CustomEvent("arcady:nick-style-change"));
      window.dispatchEvent(new CustomEvent("arcady:avatar-change"));
      if (state.db && state.ready && readNickname()) {
        syncTypingPresence();
      }
    }

    function syncNicknameStylePreview() {
      const nick = readNickname() || "Player";
      const st = readNickStyleFromStorage();
      if (colorInput) {
        colorInput.value = sanitizeHexColor(st && st.color, "#e2e8f0");
      }
      if (fontSelect) {
        fontSelect.value = st && nickFontKeyToStack[st.fontKey] ? st.fontKey : "fredoka";
      }
      if (effectSelect) {
        effectSelect.value = st && st.effect ? st.effect : "none";
      }
      if (preview) {
        preview.textContent = nick;
        preview.className = "nickname-style-preview-name";
        const useStyle = st || { color: "#e2e8f0", fontKey: "fredoka", effect: "none" };
        if (useStyle.effect && useStyle.effect !== "none") {
          preview.classList.add("home-chat-nick-fx--" + useStyle.effect);
        }
        preview.style.color = useStyle.color || "";
        preview.style.fontFamily = nickFontKeyToStack[useStyle.fontKey] || nickFontKeyToStack.fredoka;
      }
    }

    syncNicknameStylePreview();
    syncNicknameAvatarPreview();

    if (colorInput) {
      colorInput.addEventListener("input", applyPanelToStorage);
    }
    if (fontSelect) {
      fontSelect.addEventListener("change", applyPanelToStorage);
    }
    if (effectSelect) {
      effectSelect.addEventListener("change", applyPanelToStorage);
    }
    if (avatarEffectSelect) {
      avatarEffectSelect.addEventListener("change", applyPanelToStorage);
    }
    if (resetBtn) {
      resetBtn.addEventListener("click", function () {
        localStorage.removeItem(nickStyleStorageKey);
        localStorage.removeItem(avatarEffectStorageKey);
        if (colorInput) {
          colorInput.value = "#e2e8f0";
        }
        if (fontSelect) {
          fontSelect.value = "fredoka";
        }
        if (effectSelect) {
          effectSelect.value = "none";
        }
        if (avatarEffectSelect) {
          avatarEffectSelect.value = "none";
        }
        syncNicknameStylePreview();
        syncNicknameAvatarPreview();
        window.dispatchEvent(new CustomEvent("arcady:nick-style-change"));
        window.dispatchEvent(new CustomEvent("arcady:avatar-change"));
        if (state.db && state.ready && readNickname()) {
          syncTypingPresence();
        }
        setStatus("Chat name style reset.");
      });
    }

    window.addEventListener("arcady:nickname-change", syncNicknameStylePreview);
  }

  function normalizeNameTagDef(id, raw) {
    const label = String(raw && raw.label || "").trim().slice(0, 32) || "Tag";
    const bg = sanitizeHexColor(raw && raw.bgColor, "#5865f2");
    const fg = sanitizeHexColor(raw && raw.textColor, "#ffffff");
    const effect = normalizeNickEffect(raw && raw.effect, nameTagEffectSlugs);
    return {
      id: String(id || "").trim(),
      label: label,
      bgColor: bg,
      textColor: fg,
      effect: effect
    };
  }

  function getOrderedNameTagsForDevice(deviceId) {
    const key = String(deviceId || "").trim();
    if (!key) {
      return [];
    }
    const row = state.userNameTags && state.userNameTags[key];
    const ids = row && Array.isArray(row.tagIds) ? row.tagIds : [];
    const out = [];
    ids.forEach(function (tid) {
      const id = String(tid || "").trim();
      if (!id || out.length >= 8) {
        return;
      }
      const raw = state.nameTagDefs && state.nameTagDefs[id];
      if (!raw) {
        return;
      }
      out.push(normalizeNameTagDef(id, raw));
    });
    return out;
  }

  function nameTagFxClass(effect) {
    const e = normalizeNickEffect(effect, nameTagEffectSlugs);
    return e && e !== "none" ? " home-chat-nametag-fx--" + e : "";
  }

  function renderMessageNameTags(message) {
    const role = getProfileRole(message);
    const tags = getOrderedNameTagsForDevice(message && message.deviceId);
    const parts = [];

    if (role && role !== "Member") {
      const roleSlug = String(role || "member").toLowerCase().replace(/\s+/g, "-");
      const roleLabel = role === "Owner" ? "Owner" : role;
      parts.push(
        '<span class="home-chat-nametag home-chat-role-tag is-' +
          escapeAttribute(roleSlug) +
          '" style="' +
          escapeAttribute("background: rgba(255, 255, 255, 0.08); color: inherit;") +
          '">' +
          escapeHtml(roleLabel) +
          "</span>"
      );
    }

    const tagHtml = tags
      .map(function (tag) {
        const fx = nameTagFxClass(tag.effect);
        return (
          '<span class="home-chat-nametag' +
          fx +
          '" style="' +
          escapeAttribute("background:" + tag.bgColor + ";color:" + tag.textColor) +
          '">' +
          escapeHtml(tag.label) +
          "</span>"
        );
      })
      .join("");

    if (tagHtml) {
      parts.push(tagHtml);
    }

    if (!parts.length) {
      return "";
    }
    return '<span class="home-chat-nametag-wrap">' + parts.join("") + "</span>";
  }

  function renderStyledNicknameButton(message, shownNickname) {
    const built = nickStyleToCss(message && message.nickStyle);
    return (
      '<button class="home-chat-message-name" type="button" data-chat-profile="' +
      escapeAttribute(message.id) +
      '">' +
      '<span class="' +
      escapeAttribute(built.className) +
      '"' +
      built.styleAttr +
      ">" +
      escapeHtml(shownNickname) +
      "</span>" +
      "</button>"
    );
  }

  function formatTypingLabelHtml(entries) {
    if (!entries.length) {
      return "";
    }
    function segment(entry) {
      const nick = escapeHtml(displayNickname(entry && entry.nickname));
      const ns = normalizeNickStyleForMessage(entry && entry.nickStyle);
      if (!ns) {
        return nick;
      }
      const built = nickStyleToCss(ns);
      return '<span class="' + escapeAttribute(built.className) + '"' + built.styleAttr + ">" + nick + "</span>";
    }
    if (entries.length === 1) {
      return segment(entries[0]) + " is typing…";
    }
    const names = entries.slice(0, 2).map(segment);
    return names.join(" and ") + (entries.length > 2 ? " and others are typing…" : " are typing…");
  }

  function normalizeMessage(record, id) {
    return {
      id: String(record && record.id || id || ""),
      nickname: String(record && record.nickname || "Guest").trim() || "Guest",
      nicknameKey: normalizeNicknameKey(record && record.nicknameKey || record && record.nickname || ""),
      deviceId: String(record && record.deviceId || "").trim(),
      recipientNickname: String(record && record.recipientNickname || "").trim(),
      recipientNicknameKey: normalizeNicknameKey(record && record.recipientNicknameKey || record && record.recipientNickname || ""),
      recipientDeviceId: String(record && record.recipientDeviceId || "").trim(),
      avatarUrl: sanitizeAvatarUrl(record && record.avatarUrl),
      text: String(record && record.text || "").trim(),
      imageDataUrl: String(record && record.imageDataUrl || "").trim(),
      stickerDisplay: normalizeStickerDisplay(record && record.stickerDisplay),
      reactions: normalizeReactions(record && record.reactions),
      createdAt: Number(record && record.createdAt || 0),
      editedAt: Number(record && record.editedAt || 0),
      replyToId: String(record && record.replyToId || "").trim(),
      replyToNickname: String(record && record.replyToNickname || "").trim(),
      replyToSnippet: String(record && record.replyToSnippet || "").trim().slice(0, 200),
      replyToHasImage: !!(record && record.replyToHasImage),
      nickStyle: normalizeNickStyleForMessage(record && record.nickStyle)
    };
  }

  function normalizeStickerDisplay(value) {
    var v = String(value || "").trim().toLowerCase();
    return v === "inline" ? "inline" : "box";
  }

  function sanitizeAvatarUrl(value) {
    const raw = String(value || "").trim();
    if (!raw || raw.length > maxAvatarBytes + 500) {
      return "";
    }
    if (raw.startsWith("data:image/")) {
      const head = raw.replace(/\s+/g, "").slice(0, 48).toLowerCase();
      if (!/^data:image\/(png|jpe?g|gif|webp);base64,/i.test(head)) {
        return "";
      }
      return raw.length > maxAvatarBytes ? "" : raw;
    }
    if (/^https?:\/\//i.test(raw)) {
      return raw.slice(0, 2000);
    }
    return "";
  }

  function readAvatarForSend() {
    return sanitizeAvatarUrl(localStorage.getItem("arcadyVisitorAvatar"));
  }

  function readAvatarEffectFromStorage() {
    try {
      return normalizeAvatarEffect(localStorage.getItem(avatarEffectStorageKey));
    } catch (error) {
      return "none";
    }
  }

  function readAvatarEffectForSend() {
    const effect = normalizeAvatarEffect(localStorage.getItem(avatarEffectStorageKey));
    return effect && effect !== "none" ? effect : "";
  }

  function normalizeReactions(record) {
    const source = record && typeof record === "object" ? record : {};
    const normalized = {};

    reactionOptions.forEach(function (reaction) {
      const entry = source[reaction.key];
      const members = entry && entry.members && typeof entry.members === "object"
        ? entry.members
        : {};

      normalized[reaction.key] = {
        members: members,
        count: Object.keys(members).length
      };
    });

    return normalized;
  }

  function readNickname() {
    return String(localStorage.getItem("arcadyVisitorNickname") || "").trim().slice(0, 24);
  }

  function normalizeNicknameKey(value) {
    return String(value || "").trim().toLowerCase().slice(0, 24);
  }

  function decodeValue(value) {
    try {
      return window.atob(String(value || ""));
    } catch (error) {
      return "";
    }
  }

  function getNicknameKey() {
    return normalizeNicknameKey(readNickname());
  }

  function getDeviceId() {
    const existing = localStorage.getItem("arcadyAdminDeviceId");
    if (existing) {
      return existing;
    }

    const created = "device-" + Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem("arcadyAdminDeviceId", created);
    return created;
  }

  function readOwnerAccess() {
    if (window.ARCADY_OWNER_ACCESS === true) {
      return true;
    }
    return sessionStorage.getItem("arcadyOwnerUnlocked") === "true";
  }

  function isCorruptedAdminGrant(entry) {
    if (!entry || typeof entry !== "object") {
      return false;
    }
    if (String(entry.role || "").trim().toLowerCase() !== "corrupted-admin") {
      return false;
    }
    const exp = Number(entry.expiresAt || 0);
    if (exp > 0 && exp <= Date.now()) {
      return false;
    }
    return true;
  }

  function isCorruptedAdmin() {
    return isCorruptedAdminGrant(state.adminGrants[state.deviceId]);
  }

  function canModerateChatLikeOwner() {
    return !!state.ownerUnlocked || isCorruptedAdmin();
  }

  function chatModerationAttribution() {
    const nick = readNickname();
    if (nick) {
      return nick;
    }
    if (state.ownerUnlocked) {
      return "Owner";
    }
    if (isCorruptedAdmin()) {
      return "Corrupted Admin";
    }
    return "Staff";
  }

  function isProtectedNickname(value) {
    return normalizeNicknameKey(value) === protectedNicknameKey;
  }

  function displayNickname(value) {
    return String(value || "Guest");
  }

  function isCurrentUserChatBanned() {
    return !!state.chatBans.devices[state.deviceId] || !!state.chatBans.nicknames[getNicknameKey()];
  }

  function isMessageChatBanned(message) {
    if (!message) {
      return false;
    }
    return !!(message.deviceId && state.chatBans.devices[message.deviceId]) || !!(message.nicknameKey && state.chatBans.nicknames[message.nicknameKey]);
  }

  function activeChatTimeoutUntil(deviceId) {
    const key = String(deviceId || "").trim();
    if (!key) {
      return 0;
    }
    const entry = state.chatTimeouts[key];
    const until = Number(entry && entry.until || 0);
    if (until > Date.now()) {
      return until;
    }
    return 0;
  }

  function isCurrentUserChatTimedOut() {
    return activeChatTimeoutUntil(state.deviceId) > 0;
  }

  function isMessageChatTimedOut(message) {
    if (!message) {
      return false;
    }
    return activeChatTimeoutUntil(message.deviceId) > 0;
  }

  function formatChatTimeoutPlaceholder(until) {
    if (!until) {
      return "You are timed out from chat";
    }
    try {
      return (
        "Timed out until " +
        new Date(until).toLocaleString([], {
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit"
        })
      );
    } catch (error) {
      return "You are timed out from chat";
    }
  }

  function handleImageSelection(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) {
      clearSelectedImage();
      return;
    }

    if (!String(file.type || "").toLowerCase().startsWith("image/")) {
      clearSelectedImage();
      setStatus("Pick an image file.");
      return;
    }

    if (Number(file.size || 0) > maxImageBytes) {
      clearSelectedImage();
      setStatus("Keep images under 750 KB.");
      return;
    }

    clearSelectedGif(false);
    state.selectedImage = file;
    state.gifPanelOpen = false;
    syncGifPickerUi();
    updateSelectedMediaMeta();
    updateComposerState();
  }

  function clearSelectedImage(shouldSync) {
    state.selectedImage = null;
    if (els.imageInput) {
      els.imageInput.value = "";
    }
    if (shouldSync !== false) {
      updateSelectedMediaMeta();
      updateComposerState();
    }
  }

  function clearSelectedGif(shouldSync) {
    state.selectedGifUrl = "";
    state.selectedGifName = "";
    if (shouldSync !== false) {
      updateSelectedMediaMeta();
      syncGifPickerUi();
      renderGifLibrary();
      updateComposerState();
    }
  }

  function updateSelectedMediaMeta() {
    if (!els.fileMeta) {
      return;
    }
    const modeLabel = state.stickerSendMode === "inline" ? "inline 32×32" : "large box";
    if (state.selectedGifUrl) {
      els.fileMeta.textContent =
        "Media ready (" + modeLabel + "): " + (state.selectedGifName || "sticker");
      return;
    }
    if (state.selectedImage) {
      els.fileMeta.textContent = "Image ready (" + modeLabel + "): " + state.selectedImage.name;
      return;
    }
    els.fileMeta.textContent = "No image selected";
  }

  function handleDraftInput() {
    updateComposerState();
    syncTypingPresence();
    if (getMentionContext()) {
      hideEmojiSuggest();
      updateMentionSuggest();
      return;
    }
    hideMentionSuggest();
    updateEmojiSuggest();
  }

  function handleComposerKeydown(event) {
    if (event.key === "ArrowDown" && state.mentionOpen && state.mentionItems.length) {
      event.preventDefault();
      state.mentionHighlight = Math.min(state.mentionHighlight + 1, state.mentionItems.length - 1);
      renderMentionSuggestList();
      return;
    }
    if (event.key === "ArrowUp" && state.mentionOpen && state.mentionItems.length) {
      event.preventDefault();
      state.mentionHighlight = Math.max(state.mentionHighlight - 1, 0);
      renderMentionSuggestList();
      return;
    }
    if (event.key === "ArrowDown" && state.emojiOpen && state.emojiItems.length) {
      event.preventDefault();
      state.emojiHighlight = Math.min(state.emojiHighlight + 1, state.emojiItems.length - 1);
      renderEmojiSuggestList();
      return;
    }
    if (event.key === "ArrowUp" && state.emojiOpen && state.emojiItems.length) {
      event.preventDefault();
      state.emojiHighlight = Math.max(state.emojiHighlight - 1, 0);
      renderEmojiSuggestList();
      return;
    }
    if (event.key === "Escape" && state.mentionOpen) {
      event.preventDefault();
      hideMentionSuggest();
      return;
    }
    if (event.key === "Escape" && state.emojiOpen) {
      event.preventDefault();
      hideEmojiSuggest();
      return;
    }
    if (event.key === "Enter") {
      if (state.mentionOpen && state.mentionItems.length) {
        event.preventDefault();
        const pick = state.mentionItems[state.mentionHighlight] || state.mentionItems[0];
        applyMentionPick(pick);
        return;
      }
      if (state.emojiOpen && state.emojiItems.length) {
        event.preventDefault();
        const pick = state.emojiItems[state.emojiHighlight] || state.emojiItems[0];
        applyEmojiPick(pick.slug);
        return;
      }
      event.preventDefault();
      sendMessage();
    }
  }

  function handleDocumentPointerForMention(event) {
    const t = event.target;
    if (els.inputWrap && els.inputWrap.contains(t)) {
      return;
    }
    if (state.mentionOpen) {
      hideMentionSuggest();
    }
    if (state.emojiOpen) {
      hideEmojiSuggest();
    }
  }

  function getMentionContext() {
    if (!els.input || els.input.disabled) {
      return null;
    }
    const value = String(els.input.value || "");
    const pos = typeof els.input.selectionStart === "number" ? els.input.selectionStart : value.length;
    const before = value.slice(0, pos);
    const match = before.match(/(^|\s)@([^\s@]*)$/);
    if (!match) {
      return null;
    }
    const atIndex = before.lastIndexOf("@");
    if (atIndex < 0) {
      return null;
    }
    return {
      start: atIndex,
      end: pos,
      query: match[2] || ""
    };
  }

  function collectParticipantNicknames() {
    const map = new Map();
    const selfKey = getNicknameKey();
    state.messages.forEach(function (message) {
      if (isDirectMessage(message)) {
        return;
      }
      const nick = String(message.nickname || "").trim();
      if (!nick) {
        return;
      }
      const key = normalizeNicknameKey(nick);
      if (key === selfKey) {
        return;
      }
      if (!map.has(key)) {
        map.set(key, displayNickname(nick));
      }
    });
    getVisibleTypingEntries().forEach(function (entry) {
      const nick = String(entry && entry.nickname || "").trim();
      if (!nick) {
        return;
      }
      const key = normalizeNicknameKey(nick);
      if (key === selfKey) {
        return;
      }
      if (!map.has(key)) {
        map.set(key, displayNickname(nick));
      }
    });
    return Array.from(map.values()).sort(function (a, b) {
      return a.localeCompare(b, undefined, { sensitivity: "base" });
    });
  }

  function updateMentionSuggest() {
    if (!els.mentionList || !els.input) {
      return;
    }
    const ctx = getMentionContext();
    if (!ctx) {
      hideMentionSuggest();
      return;
    }
    const q = ctx.query.trim().toLowerCase();
    const all = collectParticipantNicknames();
    const filtered = all.filter(function (name) {
      return !q || String(name).toLowerCase().indexOf(q) !== -1;
    }).slice(0, 8);
    if (!filtered.length) {
      hideMentionSuggest();
      return;
    }
    state.mentionOpen = true;
    state.mentionRange = ctx;
    state.mentionItems = filtered;
    state.mentionHighlight = 0;
    els.mentionList.hidden = false;
    renderMentionSuggestList();
  }

  function renderMentionSuggestList() {
    if (!els.mentionList || !state.mentionItems.length) {
      return;
    }
    els.mentionList.innerHTML = state.mentionItems
      .map(function (name, index) {
        const active = index === state.mentionHighlight ? " is-active" : "";
        return (
          '<button type="button" class="home-chat-mention-option' +
          active +
          '" role="option" data-mention-pick="' +
          escapeAttribute(name) +
          '">' +
          escapeHtml(name) +
          "</button>"
        );
      })
      .join("");
  }

  function hideMentionSuggest() {
    state.mentionOpen = false;
    state.mentionItems = [];
    state.mentionRange = null;
    state.mentionHighlight = 0;
    if (els.mentionList) {
      els.mentionList.hidden = true;
      els.mentionList.innerHTML = "";
    }
  }

  function getEmojiContext() {
    if (!els.input || els.input.disabled) {
      return null;
    }
    const value = String(els.input.value || "");
    const pos = typeof els.input.selectionStart === "number" ? els.input.selectionStart : value.length;
    const before = value.slice(0, pos);
    const match = before.match(/(^|\s):([a-z0-9_\-]*)$/i);
    if (!match) {
      return null;
    }
    const colonIndex = before.lastIndexOf(":");
    if (colonIndex < 0) {
      return null;
    }
    return {
      start: colonIndex,
      end: pos,
      query: String(match[2] || "").toLowerCase()
    };
  }

  function updateEmojiSuggest() {
    if (!els.emojiList || !els.input) {
      return;
    }
    const ctx = getEmojiContext();
    if (!ctx) {
      hideEmojiSuggest();
      return;
    }
    const q = ctx.query;
    const filtered = slackmojisCatalog
      .concat(bluemojiCatalog)
      .filter(function (entry) {
        if (!q) {
          return true;
        }
        const slug = fileSlugFromEmojiUrl(entry.url);
        const name = String(entry.name || "").toLowerCase();
        return slug.indexOf(q) !== -1 || name.indexOf(q) !== -1;
      })
      .slice(0, 16);
    if (!filtered.length) {
      hideEmojiSuggest();
      return;
    }
    state.emojiOpen = true;
    state.emojiRange = ctx;
    state.emojiItems = filtered.map(function (entry) {
      return {
        slug: fileSlugFromEmojiUrl(entry.url),
        name: entry.name,
        url: entry.url
      };
    });
    state.emojiHighlight = 0;
    els.emojiList.hidden = false;
    renderEmojiSuggestList();
  }

  function renderEmojiSuggestList() {
    if (!els.emojiList || !state.emojiItems.length) {
      return;
    }
    els.emojiList.innerHTML = state.emojiItems
      .map(function (item, index) {
        const active = index === state.emojiHighlight ? " is-active" : "";
        return (
          '<button type="button" class="home-chat-emoji-option' +
          active +
          '" role="option" data-emoji-pick="' +
          escapeAttribute(item.slug) +
          '">' +
          '<img class="home-chat-emoji-option-img" src="' +
          escapeAttribute(item.url) +
          '" alt="" loading="lazy">' +
          '<span class="home-chat-emoji-option-meta">:' +
          escapeHtml(item.slug) +
          " · " +
          escapeHtml(item.name) +
          "</span></button>"
        );
      })
      .join("");
  }

  function hideEmojiSuggest() {
    state.emojiOpen = false;
    state.emojiItems = [];
    state.emojiRange = null;
    state.emojiHighlight = 0;
    if (els.emojiList) {
      els.emojiList.hidden = true;
      els.emojiList.innerHTML = "";
    }
  }

  function applyEmojiPick(slug) {
    if (!els.input || !state.emojiRange) {
      return;
    }
    const pick = String(slug || "").trim().toLowerCase();
    if (!pick) {
      return;
    }
    const value = String(els.input.value || "");
    const start = state.emojiRange.start;
    const end = state.emojiRange.end;
    const before = value.slice(0, start);
    const after = value.slice(end);
    const insert = ":" + pick + ": ";
    els.input.value = before + insert + after;
    const nextPos = before.length + insert.length;
    if (typeof els.input.setSelectionRange === "function") {
      els.input.setSelectionRange(nextPos, nextPos);
    }
    hideEmojiSuggest();
    updateComposerState();
    syncTypingPresence();
    els.input.focus();
  }

  function applyMentionPick(nickname) {
    if (!els.input || !state.mentionRange) {
      return;
    }
    const pick = String(nickname || "").trim().slice(0, 24);
    if (!pick) {
      return;
    }
    const value = String(els.input.value || "");
    const start = state.mentionRange.start;
    const end = state.mentionRange.end;
    const before = value.slice(0, start);
    const after = value.slice(end);
    const insert = "@" + pick + " ";
    els.input.value = before + insert + after;
    const nextPos = before.length + insert.length;
    if (typeof els.input.setSelectionRange === "function") {
      els.input.setSelectionRange(nextPos, nextPos);
    }
    hideMentionSuggest();
    updateComposerState();
    syncTypingPresence();
    els.input.focus();
  }

  function buildReplySnippet(message) {
    if (!message) {
      return "";
    }
    const t = String(message.text || "")
      .trim()
      .replace(/\s+/g, " ");
    if (t) {
      return t.length > 100 ? t.slice(0, 100) + "…" : t;
    }
    if (message.imageDataUrl) {
      return "[image]";
    }
    return "Message";
  }

  function setReplyDraftFromMessage(messageId) {
    const message = findMessage(messageId);
    if (!message) {
      setStatus("That message was not found.");
      return;
    }
    if (!readNickname()) {
      setStatus("Save a nickname above first.");
      return;
    }
    if (isCurrentUserChatBanned()) {
      setStatus("You are banned from the chat.");
      return;
    }
    if (isCurrentUserChatTimedOut()) {
      setStatus("You are timed out from chat.");
      return;
    }
    state.replyDraft = {
      id: message.id,
      nickname: displayNickname(message.nickname),
      nicknameKey: message.nicknameKey || normalizeNicknameKey(message.nickname),
      snippet: buildReplySnippet(message),
      hasImage: !!message.imageDataUrl
    };
    renderReplyBarUI();
    updateComposerState();
    if (els.input && !els.input.disabled) {
      els.input.focus();
    }
    setStatus('Replying to "' + state.replyDraft.nickname + '".');
  }

  function clearReplyDraft() {
    state.replyDraft = null;
    renderReplyBarUI();
    updateComposerState();
  }

  function renderReplyBarUI() {
    if (!els.replyBar) {
      return;
    }
    if (!state.replyDraft) {
      els.replyBar.hidden = true;
      if (els.replyName) {
        els.replyName.textContent = "";
      }
      if (els.replySnippet) {
        els.replySnippet.textContent = "";
      }
      return;
    }
    els.replyBar.hidden = false;
    if (els.replyName) {
      els.replyName.textContent = state.replyDraft.nickname;
    }
    if (els.replySnippet) {
      els.replySnippet.textContent = state.replyDraft.snippet ? " · " + state.replyDraft.snippet : "";
    }
  }

  function formatMessageTextRich(raw) {
    const text = String(raw || "");
    let html = "";
    let lastIndex = 0;
    const re = /(?:@([^\s@]{1,24})|:([a-z0-9][a-z0-9_\-]{0,63}):)/gi;
    let match;
    while ((match = re.exec(text)) !== null) {
      html += escapeHtml(text.slice(lastIndex, match.index));
      if (match[1] !== undefined && match[1] !== "") {
        const handle = match[1];
        html +=
          '<span class="home-chat-mention" tabindex="0" role="link" data-mention="' +
          escapeAttribute(handle) +
          '">@' +
          escapeHtml(handle) +
          "</span>";
      } else if (match[2] !== undefined) {
        const slug = String(match[2] || "").toLowerCase();
        const entry = slackmojiBySlug[slug];
        if (entry) {
          html +=
            '<img class="home-chat-colon-emoji" src="' +
            escapeAttribute(entry.url) +
            '" width="32" height="32" alt=":' +
            escapeAttribute(slug) +
            ':" title=":' +
            escapeAttribute(slug) +
            ':" loading="lazy" decoding="async">';
        } else {
          html += escapeHtml(match[0]);
        }
      }
      lastIndex = match.index + match[0].length;
    }
    html += escapeHtml(text.slice(lastIndex));
    return html;
  }

  function renderReplyQuoteBlock(message) {
    const id = message && message.replyToId ? String(message.replyToId).trim() : "";
    const name = message && message.replyToNickname ? displayNickname(message.replyToNickname) : "";
    if (!id && !name) {
      return "";
    }
    const snippet = String((message && message.replyToSnippet) || "").trim().slice(0, 160);
    const shown = snippet || (message && message.replyToHasImage ? "[image]" : "");
    const inner =
      '<span class="home-chat-reply-quote-name">' +
      escapeHtml(name || "Someone") +
      "</span>" +
      (shown ? '<span class="home-chat-reply-quote-text">' + escapeHtml(shown) + "</span>" : "");
    if (id) {
      return (
        '<button type="button" class="home-chat-reply-quote" data-chat-jump="' +
        escapeAttribute(id) +
        '">' +
        inner +
        "</button>"
      );
    }
    return '<div class="home-chat-reply-quote is-orphan">' + inner + "</div>";
  }

  function scrollToChatMessage(messageId) {
    if (!els.feed || !messageId) {
      return;
    }
    const target = String(messageId);
    const nodes = els.feed.querySelectorAll(".home-chat-message");
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].getAttribute("data-message-id") === target) {
        nodes[i].scrollIntoView({ block: "nearest", behavior: "smooth" });
        break;
      }
    }
  }

  function insertMentionInComposer(handle) {
    const nick = String(handle || "").trim().slice(0, 24);
    if (!nick || !els.input || els.input.disabled) {
      return;
    }
    const token = "@" + nick + " ";
    const value = String(els.input.value || "");
    const pos = typeof els.input.selectionStart === "number" ? els.input.selectionStart : value.length;
    els.input.value = value.slice(0, pos) + token + value.slice(pos);
    const next = pos + token.length;
    if (typeof els.input.setSelectionRange === "function") {
      els.input.setSelectionRange(next, next);
    }
    els.input.focus();
    updateComposerState();
    syncTypingPresence();
  }

  function updateComposerState() {
    const nickname = readNickname();
    const banned = isCurrentUserChatBanned();
    const timedOut = isCurrentUserChatTimedOut();
    const canUseChat = !!nickname && state.ready && !state.sending && !banned && !timedOut;
    const hasDraft = !!String(els.input && els.input.value || "").trim() || !!state.selectedImage || !!state.selectedGifUrl;

    if (els.input) {
      els.input.disabled = !canUseChat;
      els.input.placeholder = banned
        ? "You are banned from the chat"
        : timedOut
        ? formatChatTimeoutPlaceholder(activeChatTimeoutUntil(state.deviceId))
        : !nickname
        ? "Set your nickname above to unlock chat"
        : (!state.ready ? "Connecting chat..." : "Message (type : for emoji)");
    }

    if (els.imageInput) {
      els.imageInput.disabled = !canUseChat;
    }

    if (els.attach) {
      els.attach.classList.toggle("is-disabled", !canUseChat);
    }

    if (els.gifToggle) {
      els.gifToggle.disabled = !canUseChat;
      els.gifToggle.classList.toggle("is-disabled", !canUseChat);
      if (!canUseChat) {
        state.gifPanelOpen = false;
      }
    }

    if (els.sendButton) {
      els.sendButton.disabled = !(canUseChat && hasDraft);
      els.sendButton.textContent = state.sending ? "Sending..." : "Send";
    }
    if (!canUseChat && state.typingActive) {
      clearTypingPresence();
    }
    syncGifPickerUi();
  }

  async function sendMessage() {
    const nickname = readNickname();
    if (!nickname) {
      setStatus("Save a nickname above first.");
      updateComposerState();
      return;
    }

    if (isCurrentUserChatBanned()) {
      setStatus("You are banned from the chat.");
      updateComposerState();
      return;
    }

    if (isCurrentUserChatTimedOut()) {
      setStatus("You are timed out from chat.");
      updateComposerState();
      return;
    }

    if (!state.ready || !state.db || state.sending) {
      return;
    }

    const text = String(els.input.value || "").trim().slice(0, 400);
    if (!text && !state.selectedImage && !state.selectedGifUrl) {
      setStatus("Write a message or add an image.");
      updateComposerState();
      return;
    }

    state.sending = true;
    updateComposerState();
    setStatus("Sending message...");

    try {
      let imageDataUrl = "";
      if (state.selectedGifUrl) {
        imageDataUrl = state.selectedGifUrl;
      } else if (state.selectedImage) {
        imageDataUrl = await readFileAsDataUrl(state.selectedImage);
      }

      const avatarUrl = readAvatarForSend();
      const ref = state.db.ref(chatPath).push();
      const payload = {
        id: ref.key,
        deviceId: state.deviceId,
        nickname: nickname,
        nicknameKey: getNicknameKey(),
        recipientNickname: "",
        recipientNicknameKey: "",
        recipientDeviceId: "",
        avatarUrl: avatarUrl,
        text: text,
        imageDataUrl: imageDataUrl,
        createdAt: Date.now()
      };
      const avatarEffect = readAvatarEffectForSend();
      if (avatarEffect) {
        payload.avatarEffect = avatarEffect;
      }
      const ns = getNickStyleForPayload();
      if (ns) {
        payload.nickStyle = ns;
      }
      if (imageDataUrl) {
        payload.stickerDisplay = state.stickerSendMode === "inline" ? "inline" : "box";
      }
      const reply = state.replyDraft;
      if (reply && reply.id) {
        payload.replyToId = reply.id;
        payload.replyToNickname = reply.nickname;
        payload.replyToSnippet = reply.snippet;
        payload.replyToHasImage = !!reply.hasImage;
      }
      await ref.set(payload);

      els.input.value = "";
      hideMentionSuggest();
      hideEmojiSuggest();
      clearReplyDraft();
      await clearTypingPresence();
      clearSelectedImage();
      clearSelectedGif();
      state.gifPanelOpen = false;
      syncGifPickerUi();
      setStatus("Chat live. Say something.");
      if (els.input && !els.input.disabled) {
        els.input.focus();
      }
    } catch (error) {
      console.error("Arcady homepage chat send failed:", error);
      setStatus("That message could not send.");
    } finally {
      state.sending = false;
      updateComposerState();
    }
  }

  function toggleGifPanel() {
    const nickname = readNickname();
    if (!nickname) {
      setStatus("Save a nickname above first.");
      return;
    }

    if (isCurrentUserChatBanned()) {
      setStatus("You are banned from the chat.");
      return;
    }

    if (isCurrentUserChatTimedOut()) {
      setStatus("You are timed out from chat.");
      return;
    }

    state.gifPanelOpen = !state.gifPanelOpen;
    syncGifPickerUi();
    if (state.gifPanelOpen) {
      loadGifLibrary(true);
    }
  }

  function syncGifPickerUi() {
    if (els.gifPanel) {
      els.gifPanel.classList.toggle("is-open", !!state.gifPanelOpen);
    }
    if (els.gifToggle) {
      els.gifToggle.classList.toggle("is-active", !!state.gifPanelOpen || !!state.selectedGifUrl);
      els.gifToggle.textContent = state.selectedGifUrl ? "Media selected" : "Media";
    }
  }

  async function loadGifLibrary(forceRefresh) {
    if (state.gifsLoading || (!forceRefresh && state.gifLibraryLoaded)) {
      return;
    }

    state.gifsLoading = true;
    setGifStatus("Loading media libraries...");
    renderGifLibrary();

    try {
      state.gifLibrary = normalizeManualMediaLibrary(manualMediaLibrary);
      state.gifLibraryLoaded = true;
      setGifStatus(
        (state.gifLibrary.length || slackmojisCatalog.length || bluemojiCatalog.length
          ? "Arcady: edit manualMediaLibrary. Slackmojis: " + slackmojisCatalog.length + " from " + slackmojisCatalogSource + ". Bluemoji: " + bluemojiCatalog.length + " from " + bluemojiCatalogSource + "."
          : "Add items to manualMediaLibrary in home-chat.js to show media here.")
      );
    } catch (error) {
      console.error("Arcady media library failed to load:", error);
      setGifStatus("The media library could not load right now.");
    } finally {
      state.gifsLoading = false;
      renderGifLibrary();
      renderSlackmojisLibrary();
    }
  }

  function normalizeManualMediaLibrary(records) {
    if (!Array.isArray(records)) {
      return [];
    }

    return records
      .map(function (record, index) {
        if (typeof record === "string") {
          return {
            name: "Media " + (index + 1),
            url: String(record).trim()
          };
        }

        if (!record || typeof record !== "object") {
          return null;
        }

        return {
          name: String(record.name || "Media " + (index + 1)).trim(),
          fileName: String(record.fileName || "").trim(),
          url: String(record.url || "").trim()
        };
      })
      .map(function (record) {
        if (!record) {
          return null;
        }

        if (!record.url && record.fileName) {
          record.url = manualMediaBaseUrl + encodeURIComponent(record.fileName);
        }

        return record;
      })
      .filter(function (record) {
        return !!(record && record.url);
      })
      .sort(function (a, b) {
        return a.name.localeCompare(b.name);
      });
  }

  function renderGifLibrary() {
    if (!els.gifGrid) {
      renderSlackmojisLibrary();
      return;
    }

    if (state.gifsLoading && !state.gifLibrary.length) {
      els.gifGrid.innerHTML = '<div class="home-chat-gif-empty">Loading built-in images...</div>';
      renderSlackmojisLibrary();
      return;
    }

    if (!state.gifLibrary.length) {
      els.gifGrid.innerHTML = '<div class="home-chat-gif-empty">No media added yet. Edit manualMediaLibrary in home-chat.js.</div>';
      renderSlackmojisLibrary();
      return;
    }

    els.gifGrid.innerHTML = state.gifLibrary.map(function (gif) {
      const selected = state.selectedGifUrl === gif.url;
      return (
        '<button class="home-chat-gif-card' + (selected ? ' is-selected' : '') + '" type="button" data-chat-gif="' + escapeAttribute(gif.url) + '" data-chat-gif-name="' + escapeAttribute(gif.name) + '">' +
          '<img class="home-chat-gif-image" src="' + escapeAttribute(gif.url) + '" alt="' + escapeAttribute(gif.name) + '" loading="lazy">' +
          '<span class="home-chat-gif-name">' + escapeHtml(gif.name) + '</span>' +
        '</button>'
      );
    }).join("");
    renderSlackmojisLibrary();
  }

  function renderSlackmojisLibrary() {
    if (!els.slackmojisGrid) {
      renderBluemojiLibrary();
      return;
    }

    if (state.gifsLoading && !slackmojisCatalog.length) {
      els.slackmojisGrid.innerHTML = '<div class="home-chat-gif-empty">Loading Slackmojis…</div>';
      renderBluemojiLibrary();
      return;
    }

    if (!slackmojisCatalog.length) {
      els.slackmojisGrid.innerHTML = '<div class="home-chat-gif-empty">No Slackmojis entries. Update slackmojisCatalog in home-chat.js.</div>';
      renderBluemojiLibrary();
      return;
    }

    els.slackmojisGrid.innerHTML = slackmojisCatalog.map(function (entry) {
      const selected = state.selectedGifUrl === entry.url;
      return (
        '<button class="home-chat-gif-card home-chat-slackmojis-card' + (selected ? ' is-selected' : '') + '" type="button" data-chat-gif="' + escapeAttribute(entry.url) + '" data-chat-gif-name="' + escapeAttribute(entry.name) + '">' +
          '<img class="home-chat-gif-image" src="' + escapeAttribute(entry.url) + '" alt="' + escapeAttribute(entry.name) + '" loading="lazy">' +
          '<span class="home-chat-gif-name">' + escapeHtml(entry.name) + '</span>' +
        '</button>'
      );
    }).join("");
    renderBluemojiLibrary();
  }

  function renderBluemojiLibrary() {
    if (!els.bluemojiGrid) {
      return;
    }

    if (state.gifsLoading && !bluemojiCatalog.length) {
      els.bluemojiGrid.innerHTML = '<div class="home-chat-gif-empty">Loading Bluemoji…</div>';
      return;
    }

    if (!bluemojiCatalog.length) {
      els.bluemojiGrid.innerHTML = '<div class="home-chat-gif-empty">No Bluemoji entries. Update bluemojiCatalog in home-chat.js.</div>';
      return;
    }

    els.bluemojiGrid.innerHTML = bluemojiCatalog.map(function (entry) {
      const selected = state.selectedGifUrl === entry.url;
      return (
        '<button class="home-chat-gif-card home-chat-bluemoji-card' + (selected ? ' is-selected' : '') + '" type="button" data-chat-gif="' + escapeAttribute(entry.url) + '" data-chat-gif-name="' + escapeAttribute(entry.name) + '">' +
          '<img class="home-chat-gif-image" src="' + escapeAttribute(entry.url) + '" alt="' + escapeAttribute(entry.name) + '" loading="lazy">' +
          '<span class="home-chat-gif-name">' + escapeHtml(entry.name) + '</span>' +
        '</button>'
      );
    }).join("");
  }

  function handleGifGridClick(event) {
    const gifButton = event.target.closest("[data-chat-gif]");
    if (!gifButton) {
      return;
    }

    const gifUrl = String(gifButton.getAttribute("data-chat-gif") || "");
    const gifName = String(gifButton.getAttribute("data-chat-gif-name") || "Arcady image");
    if (!gifUrl) {
      return;
    }

    if (state.selectedGifUrl === gifUrl) {
      clearSelectedGif();
      setStatus("Media removed.");
      return;
    }

    clearSelectedImage(false);
    state.selectedGifUrl = gifUrl;
    state.selectedGifName = gifName;
    state.gifPanelOpen = false;
    updateSelectedMediaMeta();
    syncGifPickerUi();
    renderGifLibrary();
    updateComposerState();
    setStatus('Media ready: "' + gifName + '".');
  }

  function setGifStatus(message) {
    if (els.gifStatus) {
      els.gifStatus.textContent = message;
    }
  }

  function readFileAsDataUrl(file) {
    return new Promise(function (resolve, reject) {
      const reader = new FileReader();
      reader.onload = function () {
        resolve(String(reader.result || ""));
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  function renderMessageAvatar(message) {
    const url = message && message.avatarUrl ? String(message.avatarUrl).trim() : "";
    const safe = sanitizeAvatarUrl(url);
    const effect = normalizeAvatarEffect(message && message.avatarEffect);
    const fxClass = effect && effect !== "none" ? " home-chat-avatar-fx--" + effect : "";
    const initial = escapeHtml((displayNickname(message && message.nickname) || "?").charAt(0).toUpperCase());
    if (safe) {
      return (
        '<span class="home-chat-message-avatar-wrap' + fxClass + '">' +
        '<img class="home-chat-message-avatar" src="' + escapeAttribute(safe) + '" alt="" loading="lazy" decoding="async">' +
        "</span>"
      );
    }
    return (
      '<span class="home-chat-message-avatar-wrap is-placeholder' + fxClass + '" aria-hidden="true">' +
      '<span class="home-chat-message-avatar-initial">' + initial + "</span>" +
      "</span>"
    );
  }

  function initAvatarControls() {
    const input = document.getElementById("nickname-avatar-input");
    const btn = document.getElementById("nickname-avatar-btn");
    const clearBtn = document.getElementById("nickname-avatar-clear");
    if (!input || !btn) {
      return;
    }
    syncNicknameAvatarPreview();
    btn.addEventListener("click", function () {
      input.click();
    });
    input.addEventListener("change", handleAvatarFileSelect);
    if (clearBtn) {
      clearBtn.addEventListener("click", function () {
        localStorage.removeItem("arcadyVisitorAvatar");
        syncNicknameAvatarPreview();
        window.dispatchEvent(new CustomEvent("arcady:avatar-change"));
        setStatus("Profile picture removed.");
      });
    }
  }

  function syncNicknameAvatarPreview() {
    const img = document.getElementById("nickname-avatar-preview-img");
    const ph = document.getElementById("nickname-avatar-initial");
    const btn = document.getElementById("nickname-avatar-btn");
    if (!btn) {
      return;
    }
    const stored = sanitizeAvatarUrl(localStorage.getItem("arcadyVisitorAvatar"));
    const effect = readAvatarEffectFromStorage();
    const nick = readNickname();
    if (img) {
      if (stored) {
        img.src = stored;
        img.hidden = false;
      } else {
        img.removeAttribute("src");
        img.hidden = true;
      }
    }
    if (ph) {
      ph.textContent = (nick || "?").charAt(0).toUpperCase() || "?";
      ph.hidden = !!stored;
    }
    avatarEffectSlugs.forEach(function (slug) {
      btn.classList.toggle("home-chat-avatar-fx--" + slug, false);
    });
    if (effect && effect !== "none") {
      btn.classList.add("home-chat-avatar-fx--" + effect);
    }
    const avatarSelect = document.getElementById("arcady-avatar-effect");
    if (avatarSelect) {
      avatarSelect.value = effect || "none";
    }
    btn.classList.toggle("has-image", !!stored);
    btn.setAttribute("aria-label", stored ? "Change profile picture" : "Add profile picture");
  }

  function handleAvatarFileSelect(event) {
    const inputEl = event.target;
    const file = inputEl.files && inputEl.files[0];
    if (!file) {
      return;
    }
    if (!String(file.type || "").toLowerCase().startsWith("image/")) {
      setStatus("Pick an image file for your profile picture.");
      return;
    }
    if (Number(file.size || 0) > maxAvatarFileBytes) {
      setStatus("Profile picture must be under 512 KB.");
      return;
    }
    const isGif = String(file.type || "").toLowerCase() === "image/gif";
    const finalize = function (dataUrl) {
      inputEl.value = "";
      if (!dataUrl) {
        setStatus("Could not use that image. Try another.");
        return;
      }
      if (dataUrl.length > maxAvatarBytes) {
        setStatus("That image is still too large after shrinking. Try a simpler image.");
        return;
      }
      localStorage.setItem("arcadyVisitorAvatar", dataUrl);
      syncNicknameAvatarPreview();
      window.dispatchEvent(new CustomEvent("arcady:avatar-change"));
      setStatus("Profile picture saved. New messages will show it.");
    };

    if (isGif) {
      readFileAsDataUrl(file)
        .then(function (dataUrl) {
          finalize(dataUrl);
        })
        .catch(function () {
          inputEl.value = "";
          setStatus("Could not read that image. Try another.");
        });
      return;
    }

    compressAvatarToDataUrl(file, function (err, dataUrl) {
      inputEl.value = "";
      if (err || !dataUrl) {
        setStatus("Could not use that image. Try another.");
        return;
      }
      if (dataUrl.length > maxAvatarBytes) {
        setStatus("That image is still too large after shrinking. Try a simpler image.");
        return;
      }
      localStorage.setItem("arcadyVisitorAvatar", dataUrl);
      syncNicknameAvatarPreview();
      window.dispatchEvent(new CustomEvent("arcady:avatar-change"));
      setStatus("Profile picture saved. New messages will show it.");
    });
  }

  function compressAvatarToDataUrl(file, done) {
    const blobUrl = URL.createObjectURL(file);
    const image = new Image();
    image.onload = function () {
      URL.revokeObjectURL(blobUrl);
      try {
        const canvas = document.createElement("canvas");
        const size = avatarDisplaySize;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          done(new Error("canvas"), null);
          return;
        }
        const w = image.naturalWidth || image.width || 1;
        const h = image.naturalHeight || image.height || 1;
        const scale = Math.max(size / w, size / h);
        const dw = w * scale;
        const dh = h * scale;
        const dx = (size - dw) / 2;
        const dy = (size - dh) / 2;
        ctx.save();
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(image, dx, dy, dw, dh);
        ctx.restore();
        let quality = 0.88;
        let out = canvas.toDataURL("image/jpeg", quality);
        while (out.length > maxAvatarBytes && quality > 0.42) {
          quality -= 0.07;
          out = canvas.toDataURL("image/jpeg", quality);
        }
        done(null, out.length > maxAvatarBytes ? null : out);
      } catch (error) {
        done(error, null);
      }
    };
    image.onerror = function () {
      URL.revokeObjectURL(blobUrl);
      done(new Error("image load"), null);
    };
    image.src = blobUrl;
  }

  function renderMessages(shouldScroll) {
    if (!els.feed) {
      return;
    }

    const stickToBottom = shouldScroll || isNearBottom(els.feed);
    const visibleMessages = state.messages.filter(function (message) {
      return !isDirectMessage(message);
    });

    if (!visibleMessages.length) {
      els.feed.innerHTML = '<div class="home-chat-empty" id="home-chat-empty">No messages yet. Save a nickname above and be the first one to say something.</div>';
      return;
    }

    els.feed.innerHTML = visibleMessages.map(function (message) {
      const banned = isMessageChatBanned(message);
      const timedOut = isMessageChatTimedOut(message);
      const protectedMessage = isProtectedNickname(message.nickname) || isProtectedNickname(message.nicknameKey);
      const shownNickname = displayNickname(message.nickname);
      const profileKey = getProfileKey(message);
      const profileCard = state.selectedProfileKey && state.selectedProfileKey === profileKey
        ? renderProfileCard(message)
        : "";
      const ownMessage = isCurrentUserMessageAuthor(message);
      const authorActions = ownMessage && !canModerateChatLikeOwner() ? (
        '<div class="home-chat-message-actions">' +
          '<button class="home-chat-action-button" type="button" data-chat-edit="' + escapeAttribute(message.id) + '">Edit</button>' +
          '<button class="home-chat-action-button is-danger" type="button" data-chat-delete="' + escapeAttribute(message.id) + '">Delete</button>' +
        '</div>'
      ) : "";
      const ownerActions = canModerateChatLikeOwner() ? (
        '<div class="home-chat-message-actions">' +
          '<button class="home-chat-action-button" type="button" data-chat-edit="' + escapeAttribute(message.id) + '">Edit</button>' +
          '<button class="home-chat-action-button is-danger" type="button" data-chat-delete="' + escapeAttribute(message.id) + '">Delete</button>' +
          '<button class="home-chat-action-button is-danger" type="button" data-chat-ban="' + escapeAttribute(message.id) + '"' + (protectedMessage ? ' disabled' : '') + '>' + (protectedMessage ? 'Arcady Protected' : (banned ? 'Unban' : 'Ban')) + '</button>' +
        '</div>'
      ) : "";
      const stickerDisp = message.stickerDisplay || "box";
      const hasMedia = !!(message.imageDataUrl);
      const inlineMedia = hasMedia && stickerDisp === "inline";
      const boxMedia = hasMedia && !inlineMedia;
      let bodyHtml = "";
      if (message.text || inlineMedia) {
        const textPart = message.text ? formatMessageTextRich(message.text) : "";
        const inlineImg = inlineMedia
          ? '<img class="home-chat-message-sticker-inline" src="' +
            escapeAttribute(message.imageDataUrl) +
            '" width="32" height="32" alt="" loading="lazy" decoding="async">'
          : "";
        bodyHtml =
          '<div class="home-chat-message-text' +
          (inlineMedia ? " home-chat-message-text--with-inline" : "") +
          '">' +
          inlineImg +
          textPart +
          "</div>";
      }
      const boxImg = boxMedia
        ? '<img class="home-chat-message-image" src="' +
          escapeAttribute(message.imageDataUrl) +
          '" alt="Chat image from ' +
          escapeAttribute(shownNickname) +
          '" loading="lazy">'
        : "";
      return (
        '<article class="home-chat-message" data-message-id="' + escapeAttribute(message.id) + '">' +
          '<div class="home-chat-message-head">' +
            renderMessageAvatar(message) +
            '<div class="home-chat-message-head-main">' +
              '<div class="home-chat-message-head-top">' +
                '<div class="home-chat-message-name-row">' +
                  renderStyledNicknameButton(message, shownNickname) +
                  renderMessageNameTags(message) +
                  renderMessageBadges(message, banned, timedOut) +
                  '<button class="home-chat-msg-action" type="button" data-chat-reply="' + escapeAttribute(message.id) + '">Reply</button>' +
                  '<button class="home-chat-action-button home-chat-msg-action" type="button" data-chat-reaction-open="' + escapeAttribute(message.id) + '">React</button>' +
                "</div>" +
                '<div class="home-chat-message-time">' + escapeHtml(formatMessageTime(message)) + "</div>" +
              "</div>" +
            "</div>" +
          "</div>" +
          renderReplyQuoteBlock(message) +
          bodyHtml +
          boxImg +
          renderReactionBar(message) +
          profileCard +
          (ownerActions || authorActions) +
        '</article>'
      );
    }).join("");

    if (stickToBottom) {
      els.feed.scrollTop = els.feed.scrollHeight;
    }
  }

  function formatTime(timestamp) {
    if (!timestamp) {
      return "just now";
    }
    try {
      return new Date(timestamp).toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit"
      });
    } catch (error) {
      return "just now";
    }
  }

  function formatMessageTime(message) {
    const baseTime = formatTime(message && message.createdAt);
    if (message && message.editedAt) {
      return baseTime + " • edited";
    }
    return baseTime;
  }

  function handleFeedActionClick(event) {
    const mentionEl = event.target.closest(".home-chat-mention[data-mention]");
    if (mentionEl) {
      event.preventDefault();
      insertMentionInComposer(mentionEl.getAttribute("data-mention"));
      return;
    }

    const jumpBtn = event.target.closest("[data-chat-jump]");
    if (jumpBtn) {
      scrollToChatMessage(jumpBtn.getAttribute("data-chat-jump"));
      return;
    }

    const replyBtn = event.target.closest("[data-chat-reply]");
    if (replyBtn) {
      setReplyDraftFromMessage(replyBtn.getAttribute("data-chat-reply"));
      return;
    }

    const emojiButton = event.target.closest("[data-chat-emoji]");
    if (emojiButton) {
      const messageId = emojiButton.getAttribute("data-chat-emoji-message");
      const reactionKey = emojiButton.getAttribute("data-chat-emoji-key");
      state.activeReactionPickerMessageId = "";
      toggleReaction(messageId, reactionKey);
      return;
    }

    const reactionOpen = event.target.closest("[data-chat-reaction-open]");
    if (reactionOpen) {
      const messageId = reactionOpen.getAttribute("data-chat-reaction-open");
      state.activeReactionPickerMessageId = state.activeReactionPickerMessageId === messageId ? "" : messageId;
      renderMessages(false);
      return;
    }

    const reactionButton = event.target.closest("[data-chat-reaction]");
    if (reactionButton) {
      toggleReaction(
        reactionButton.getAttribute("data-chat-reaction-message"),
        reactionButton.getAttribute("data-chat-reaction")
      );
      return;
    }

    if (state.activeReactionPickerMessageId && !event.target.closest("[data-chat-reaction-open], [data-chat-emoji], .home-chat-reaction-picker")) {
      state.activeReactionPickerMessageId = "";
      renderMessages(false);
    }

    const profileButton = event.target.closest("[data-chat-profile]");
    if (profileButton) {
      toggleChatProfile(profileButton.getAttribute("data-chat-profile"));
      return;
    }

    const editButton = event.target.closest("[data-chat-edit]");
    if (editButton) {
      const messageId = editButton.getAttribute("data-chat-edit");
      const message = findMessage(messageId);
      if (!message) {
        setStatus("That chat message was not found.");
        return;
      }
      if (!canEditChatMessage(message)) {
        setStatus("You do not have permission to edit this message.");
        return;
      }
      editChatMessage(messageId);
      return;
    }

    const deleteButton = event.target.closest("[data-chat-delete]");
    if (deleteButton) {
      const messageId = deleteButton.getAttribute("data-chat-delete");
      const message = findMessage(messageId);
      if (!message) {
        setStatus("That chat message was not found.");
        return;
      }
      if (!canEditChatMessage(message)) {
        setStatus("You do not have permission to delete this message.");
        return;
      }
      deleteChatMessage(messageId);
      return;
    }

    const banButton = event.target.closest("[data-chat-ban]");
    if (banButton) {
      if (!canModerateChatLikeOwner() || !state.db) {
        setStatus("You do not have permission to chat ban.");
        return;
      }
      banChatAuthor(banButton.getAttribute("data-chat-ban"));
    }
  }

  function toggleChatProfile(messageId) {
    const message = findMessage(messageId);
    if (!message) {
      return;
    }

    const profileKey = getProfileKey(message);
    if (!profileKey) {
      return;
    }

    state.selectedProfileKey = state.selectedProfileKey === profileKey ? "" : profileKey;
    renderMessages(false);
  }

  function getProfileKey(message) {
    if (!message) {
      return "";
    }
    return String(message.deviceId || message.nicknameKey || normalizeNicknameKey(message.nickname)).trim();
  }

  function normalizeXpRecord(record) {
    const xp = Math.max(0, Math.floor(Number(record && record.xp || 0) || 0));
    return {
      deviceId: String(record && record.deviceId || "").trim(),
      nickname: String(record && record.nickname || "").trim(),
      xp: xp,
      joinedAt: Number(record && (record.joinedAt || record.createdAt || record.updatedAt) || 0) || 0,
      updatedAt: Number(record && record.updatedAt || 0) || 0
    };
  }

  function getProfileRecord(message) {
    if (!message) {
      return normalizeXpRecord(null);
    }
    const byDevice = message.deviceId ? normalizeXpRecord(state.xpProfiles[message.deviceId]) : null;
    if (byDevice && (byDevice.deviceId || byDevice.nickname || byDevice.xp || byDevice.joinedAt)) {
      return byDevice;
    }

    const needle = normalizeNicknameKey(message.nicknameKey || message.nickname);
    const matchedKey = Object.keys(state.xpProfiles || {}).find(function (deviceId) {
      const profile = normalizeXpRecord(state.xpProfiles[deviceId]);
      return normalizeNicknameKey(profile.nickname) === needle;
    });

    return matchedKey ? normalizeXpRecord(state.xpProfiles[matchedKey]) : normalizeXpRecord(null);
  }

  function getProfileRole(message) {
    if (!message) {
      return "Member";
    }
    if (isProtectedNickname(message.nickname) || isProtectedNickname(message.nicknameKey)) {
      return "Owner";
    }
    if (message.deviceId && state.adminGrants[message.deviceId]) {
      const g = state.adminGrants[message.deviceId];
      const exp = Number(g.expiresAt || 0);
      if (exp > 0 && exp <= Date.now()) {
        return "Member";
      }
      const role = String(g.role || "").toLowerCase();
      if (role === "corrupted-admin") {
        return "Corrupted Admin";
      }
      if (role === "temp-admin") {
        return "Temporary Admin";
      }
      return "Admin";
    }
    return "Member";
  }

  function formatJoinedDate(timestamp) {
    if (!timestamp) {
      return "Unknown";
    }
    try {
      return new Date(timestamp).toLocaleDateString([], {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    } catch (error) {
      return "Unknown";
    }
  }

  function getLevelFromXp(totalXp) {
    const xp = Math.max(0, Math.floor(Number(totalXp || 0) || 0));
    return Math.floor(xp / xpPerLevel) + 1;
  }

  function renderProfileCard(message) {
    const record = getProfileRecord(message);
    const xp = record.xp;
    const role = getProfileRole(message);
    const roleSlug = String(role || "member").toLowerCase().replace(/\s+/g, "-");
    const level = getLevelFromXp(xp);
    const joined = formatJoinedDate(record.joinedAt);
    return (
      '<section class="home-chat-profile-card">' +
        '<div class="home-chat-profile-head">' +
          '<div class="home-chat-profile-title">Player Stats</div>' +
          '<div class="home-chat-profile-role is-' + escapeAttribute(roleSlug) + '">' + escapeHtml(role) + '</div>' +
        '</div>' +
        '<div class="home-chat-profile-grid">' +
          '<div class="home-chat-profile-stat"><span class="home-chat-profile-label">XP</span><strong>' + escapeHtml(String(xp)) + '</strong></div>' +
          '<div class="home-chat-profile-stat"><span class="home-chat-profile-label">Level</span><strong>' + escapeHtml(String(level)) + '</strong></div>' +
          '<div class="home-chat-profile-stat"><span class="home-chat-profile-label">Joined</span><strong>' + escapeHtml(joined) + '</strong></div>' +
          '<div class="home-chat-profile-stat"><span class="home-chat-profile-label">Status</span><strong>' + escapeHtml(role) + '</strong></div>' +
        '</div>' +
      '</section>'
    );
  }

  function renderMessageBadges(message, banned, timedOut) {
    const badges = [];

    if (banned) {
      badges.push({
        className: "home-chat-message-badge",
        text: "Chat banned"
      });
    }

    if (timedOut) {
      badges.push({
        className: "home-chat-message-badge is-muted",
        text: "Timed out"
      });
    }

    if (!badges.length) {
      return "";
    }

    return '<div class="home-chat-message-badges">' + badges.map(function (badge) {
      return '<div class="' + badge.className + '">' + escapeHtml(badge.text) + '</div>';
    }).join("") + '</div>';
  }

  function renderReactionBar(message) {
    if (!readNickname()) {
      return "";
    }

    const activeReactions = reactionOptions.filter(function (reaction) {
      const entry = message.reactions && message.reactions[reaction.key];
      return !!(entry && entry.count);
    });
    const isPickerOpen = state.activeReactionPickerMessageId === message.id;

    if (!activeReactions.length && !isPickerOpen) {
      return "";
    }

    const activeReactionButtons = activeReactions.map(function (reaction) {
      const entry = message.reactions && message.reactions[reaction.key];
      const count = entry && entry.count || 0;
      const active = !!(entry && entry.members && entry.members[state.deviceId]);
      return (
        '<button class="home-chat-reaction' + (active ? ' is-active' : '') + '" type="button" data-chat-reaction-message="' + escapeAttribute(message.id) + '" data-chat-reaction="' + escapeAttribute(reaction.key) + '" aria-label="' + escapeAttribute(reaction.label) + '">' +
          '<span class="home-chat-reaction-emoji">' + escapeHtml(reaction.emoji) + '</span>' +
          (count ? '<span class="home-chat-reaction-count">' + escapeHtml(String(count)) + '</span>' : '') +
        '</button>'
      );
    }).join("");

    const pickerHtml = '<div class="home-chat-reaction-picker" data-chat-reaction-picker="' + escapeAttribute(message.id) + '">' + reactionOptions.map(function (reaction) {
      return (
        '<button class="home-chat-emoji-picker-item" type="button" data-chat-emoji data-chat-emoji-message="' + escapeAttribute(message.id) + '" data-chat-emoji-key="' + escapeAttribute(reaction.key) + '" aria-label="' + escapeAttribute(reaction.label) + '">' +
          escapeHtml(reaction.emoji) +
        '</button>'
      );
    }).join("") + '</div>';

    return '<div class="home-chat-reactions">' +
      activeReactionButtons +
      (isPickerOpen ? pickerHtml : '') +
      '</div>';
  }

  async function toggleReaction(messageId, reactionKey) {
    const nickname = readNickname();
    if (!nickname) {
      setStatus("Save a nickname above first.");
      return;
    }

    if (isCurrentUserChatBanned()) {
      setStatus("You are banned from the chat.");
      return;
    }

    if (isCurrentUserChatTimedOut()) {
      setStatus("You are timed out from chat.");
      return;
    }

    if (!state.ready || !state.db) {
      return;
    }

    const message = findMessage(messageId);
    const reaction = reactionOptions.find(function (entry) {
      return entry.key === String(reactionKey || "");
    });
    if (!message || !reaction) {
      return;
    }

    const memberPath = chatPath + "/" + message.id + "/reactions/" + reaction.key + "/members/" + state.deviceId;
    const reactionEntry = message.reactions && message.reactions[reaction.key];
    const alreadyReacted = !!(reactionEntry && reactionEntry.members && reactionEntry.members[state.deviceId]);

    if (alreadyReacted) {
      await state.db.ref(memberPath).remove();
      return;
    }

    await state.db.ref(memberPath).set({
      deviceId: state.deviceId,
      nickname: nickname,
      reactedAt: Date.now()
    });
  }

  function syncTypingPresence() {
    const nickname = readNickname();
    const text = String(els.input && els.input.value || "").trim();

    if (!state.db || !state.ready || !nickname || state.sending || isCurrentUserChatBanned() || isCurrentUserChatTimedOut() || !text) {
      clearTypingPresence();
      return;
    }

    state.typingActive = true;
    window.clearTimeout(state.typingClearTimer);
    state.typingClearTimer = window.setTimeout(clearTypingPresence, typingPresenceTtl);

    const typingPayload = {
      deviceId: state.deviceId,
      nickname: nickname,
      nicknameKey: getNicknameKey(),
      updatedAt: Date.now()
    };
    const typingStyle = getNickStyleForPayload();
    if (typingStyle) {
      typingPayload.nickStyle = typingStyle;
    }
    state.db.ref(chatTypingPath + "/" + state.deviceId).set(typingPayload).catch(function () {
      state.typingActive = false;
    });
  }

  function clearTypingSoon() {
    window.clearTimeout(state.typingClearTimer);
    state.typingClearTimer = window.setTimeout(clearTypingPresence, 180);
  }

  async function clearTypingPresence() {
    window.clearTimeout(state.typingClearTimer);
    if (!state.typingActive) {
      return;
    }

    state.typingActive = false;
    if (!state.db || !state.ready) {
      return;
    }

    try {
      await state.db.ref(chatTypingPath + "/" + state.deviceId).remove();
    } catch (error) {
      console.error("Arcady homepage chat typing cleanup failed:", error);
    }
  }

  function renderTypingIndicator() {
    if (!els.typing) {
      return;
    }

    const activeTyping = getVisibleTypingEntries();
    if (!activeTyping.length) {
      els.typing.hidden = true;
      els.typing.innerHTML = "";
      return;
    }

    els.typing.hidden = false;
    const labelHtml = formatTypingLabelHtml(activeTyping);
    els.typing.innerHTML =
      '<span class="home-chat-typing-dots" aria-hidden="true"><span></span><span></span><span></span></span>' +
      '<span class="home-chat-typing-label">' + labelHtml + "</span>";
  }

  function getVisibleTypingEntries() {
    const now = Date.now();

    return Object.keys(state.typingUsers || {}).map(function (deviceId) {
      return state.typingUsers[deviceId];
    }).filter(function (entry) {
      if (!entry || String(entry.deviceId || "") === state.deviceId) {
        return false;
      }

      const updatedAt = Number(entry.updatedAt || 0);
      if (!updatedAt || (now - updatedAt) > typingPresenceTtl) {
        return false;
      }

      return true;
    }).sort(function (a, b) {
      return Number(b && b.updatedAt || 0) - Number(a && a.updatedAt || 0);
    });
  }

  function handleGlobalComposerShortcut(event) {
    if (event.key !== "/" || event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey) {
      return;
    }

    if (isEditableTarget(event.target) || !els.input || els.input.disabled) {
      return;
    }

    event.preventDefault();
    els.input.focus();
    if (typeof els.input.setSelectionRange === "function") {
      const cursor = String(els.input.value || "").length;
      els.input.setSelectionRange(cursor, cursor);
    }
  }

  function handleVisibilityChange() {
    if (document.hidden) {
      clearTypingPresence();
    }
  }

  function isEditableTarget(target) {
    if (!target || !(target instanceof Element)) {
      return false;
    }

    const tagName = String(target.tagName || "").toLowerCase();
    return tagName === "input" || tagName === "textarea" || target.isContentEditable;
  }

  function isDirectMessage(message) {
    return !!(message && (message.recipientDeviceId || message.recipientNicknameKey));
  }

  function findMessage(messageId) {
    return state.messages.find(function (message) {
      return message.id === String(messageId || "");
    }) || null;
  }

  function isCurrentUserMessageAuthor(message) {
    if (!message) {
      return false;
    }
    if (message.deviceId && message.deviceId === state.deviceId) {
      return true;
    }
    return !!(message.nicknameKey && message.nicknameKey === getNicknameKey());
  }

  function canEditChatMessage(message) {
    return !!state.db && (canModerateChatLikeOwner() || isCurrentUserMessageAuthor(message));
  }

  async function editChatMessage(messageId) {
    const message = findMessage(messageId);
    if (!state.db) {
      setStatus("Chat is offline and cannot edit messages.");
      return;
    }
    if (!message) {
      setStatus("That chat message was not found.");
      return;
    }
    if (!canEditChatMessage(message)) {
      setStatus("You do not have permission to edit this message.");
      return;
    }

    const nextText = prompt("Edit this chat message:", message.text || "");
    if (nextText == null) {
      return;
    }

    const trimmed = String(nextText || "").trim().slice(0, 400);
    if (!trimmed && !message.imageDataUrl) {
      setStatus("Image-free messages need some text.");
      return;
    }

    await state.db.ref(chatPath + "/" + message.id).update({
      text: trimmed,
      editedAt: Date.now()
    });
    setStatus("Chat message updated.");
  }

  async function deleteChatMessage(messageId) {
    const message = findMessage(messageId);
    if (!state.db) {
      setStatus("Chat is offline and cannot delete messages.");
      return;
    }
    if (!message) {
      setStatus("That chat message was not found.");
      return;
    }
    if (!canEditChatMessage(message)) {
      setStatus("You do not have permission to delete this message.");
      return;
    }

    if (!window.confirm('Delete the message from "' + message.nickname + '"?')) {
      return;
    }

    await state.db.ref(chatPath + "/" + message.id).remove();
    setStatus("Chat message deleted.");
  }

  async function banChatAuthor(messageId) {
    if (!canModerateChatLikeOwner() || !state.db) {
      setStatus("You do not have permission to chat ban.");
      return;
    }

    const message = findMessage(messageId);
    if (!message) {
      setStatus("That chat message was not found.");
      return;
    }

    if (isProtectedNickname(message.nickname) || isProtectedNickname(message.nicknameKey)) {
      setStatus("Arcady is protected and cannot be chat banned.");
      return;
    }

    if (isMessageChatBanned(message)) {
      await unbanChatAuthor(message);
      setStatus('Chat unbanned "' + displayNickname(message.nickname) + '".');
      return;
    }

    const nicknameKey = message.nicknameKey || normalizeNicknameKey(message.nickname);
    const payload = {
      nickname: message.nickname,
      nicknameKey: nicknameKey,
      bannedAt: Date.now(),
      bannedBy: chatModerationAttribution()
    };

    if (message.deviceId) {
      payload.deviceId = message.deviceId;
      await state.db.ref(chatBansDevicesPath + "/" + message.deviceId).set(payload);
    } else if (nicknameKey) {
      await state.db.ref(chatBansNicknamesPath + "/" + nicknameKey).set(payload);
    } else {
      setStatus("That message has no ban target.");
      return;
    }

    setStatus('Chat banned "' + displayNickname(message.nickname) + '".');
  }

  async function unbanChatAuthor(message) {
    const nicknameKey = message.nicknameKey || normalizeNicknameKey(message.nickname);
    const removals = [];

    if (message.deviceId) {
      removals.push(state.db.ref(chatBansDevicesPath + "/" + message.deviceId).remove());
    }
    if (nicknameKey) {
      removals.push(state.db.ref(chatBansNicknamesPath + "/" + nicknameKey).remove());
    }

    await Promise.all(removals);
  }

  function isNearBottom(element) {
    if (!element) {
      return true;
    }
    return element.scrollHeight - element.scrollTop - element.clientHeight < 80;
  }

  function setStatus(message) {
    if (els.status) {
      els.status.textContent = message;
    }
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function escapeAttribute(value) {
    return escapeHtml(value);
  }
})();
