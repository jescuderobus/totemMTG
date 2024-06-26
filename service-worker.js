
    // Based off of https://github.com/pwa-builder/PWABuilder/blob/main/docs/sw.js

    /*
      Welcome to our basic Service Worker! This Service Worker offers a basic offline experience
      while also being easily customizeable. You can add in your own code to implement the capabilities
      listed below, or change anything else you would like.


      Need an introduction to Service Workers? Check our docs here: https://docs.pwabuilder.com/#/home/sw-intro
      Want to learn more about how our Service Worker generation works? Check our docs here: https://docs.pwabuilder.com/#/studio/existing-app?id=add-a-service-worker

      Did you know that Service Workers offer many more capabilities than just offline? 
        - Background Sync: https://microsoft.github.io/win-student-devs/#/30DaysOfPWA/advanced-capabilities/06
        - Periodic Background Sync: https://web.dev/periodic-background-sync/
        - Push Notifications: https://microsoft.github.io/win-student-devs/#/30DaysOfPWA/advanced-capabilities/07?id=push-notifications-on-the-web
        - Badges: https://microsoft.github.io/win-student-devs/#/30DaysOfPWA/advanced-capabilities/07?id=application-badges
    */

    const HOSTNAME_WHITELIST = [
        self.location.hostname,
        'fonts.gstatic.com',
        'fonts.googleapis.com',
        'cdn.jsdelivr.net'
    ]

    const CACHE_NAME = "totem-cache";

    const PRECACHE_ASSETS = [
        "./app_MAIN/index.html",
        "./app_23deAbril/css/styles.css",
        "./app_23deAbril/images/dragon-1-svgrepo-com.svg",
        "./app_23deAbril/images/postcardBack1.png",
        "./app_23deAbril/images/postcardBack2.png",
        "./app_23deAbril/images/postcardFront1.png",
        "./app_23deAbril/images/snJorge.jpg",
        "./app_23deAbril/index.html",
        "./app_23deAbril/js/dadosHistorias.js",
        "./app_23deAbril/js/qrcode.min.js",
        "./app_carteleriaOculus/carteles/cartel01.jpg",
        "./app_carteleriaOculus/carteles/cartel02.jpg",
        "./app_carteleriaOculus/carteles/cartel03.jpg",
        "./app_carteleriaOculus/carteles/cartel04.jpg",
        "./app_carteleriaOculus/carteles/cartel05.jpg",
        "./app_carteleriaOculus/carteles/cartel06.jpg",
        "./app_carteleriaOculus/carteles/cartel07.jpg",
        "./app_carteleriaOculus/carteles/cartel08.jpg",
        "./app_carteleriaOculus/carteles/cartel09.jpg",
        "./app_carteleriaOculus/carteles/cartel10.jpg",
        "./app_carteleriaOculus/carteles/img1.JPG",
        "./app_carteleriaOculus/carteles/img1.png",
        "./app_carteleriaOculus/carteles/img2.JPG",
        "./app_carteleriaOculus/carteles/img2.png",
        "./app_carteleriaOculus/carteles/img3.JPG",
        "./app_carteleriaOculus/carteles/img3.png",
        "./app_carteleriaOculus/css/cssCarousel.css",
        "./app_carteleriaOculus/css/styles.css",
        "./app_carteleriaOculus/images/eye-3-svgrepo-com.svg",
        "./app_carteleriaOculus/images/warp-galaxy-svgrepo-com.svg",
        "./app_carteleriaOculus/images/working-with-laptop-black.svg",
        "./app_carteleriaOculus/images/working-with-laptop-eee.svg",
        "./app_carteleriaOculus/index.html",
        "./app_carteleriaOculus/js/javascript.js",
        "./app_carteleriaOculus/js/slideshow.js",
        "./app_carteleriaOculus/oculus/1z2wptmhf5wks88cs8.png",
        "./app_carteleriaOculus/oculus/98dmw1rfrb408co40g.jpg",
        "./app_carteleriaOculus/oculus/alas_bus.png",
        "./app_carteleriaOculus/oculus/bus.png",
        "./app_carteleriaOculus/oculus/fecha.js",
        "./app_carteleriaOculus/oculus/fondo.png",
        "./app_carteleriaOculus/oculus/m2mhtqqrpaocco4kcw.jpg",
        "./app_carteleriaOculus/oculus/oculusCOMAleat.html",
        "./app_carteleriaOculus/oculus/oculusmain.css",
        "./app_carteleriaOculus/oculus/oculusmainFlex.css",
        "./app_carteleriaOculus/oculus/reloj.js",
        "./app_comicAbril/api2db/01_create_database_comics.py",
        "./app_comicAbril/api2db/comics.db",
        "./app_comicAbril/api2db/mms_id",
        "./app_comicAbril/api2db/query",
        "./app_comicAbril/api2db/TODO.json",
        "./app_comicAbril/apiTest/Adaptación_literaria.json",
        "./app_comicAbril/apiTest/Adaptación_literaria_procesado.json",
        "./app_comicAbril/apiTest/Aventura_Superhéroes.json",
        "./app_comicAbril/apiTest/Aventura_Superhéroes_procesado.json",
        "./app_comicAbril/apiTest/bash",
        "./app_comicAbril/apiTest/Biografía.json",
        "./app_comicAbril/apiTest/Biografía_procesado.json",
        "./app_comicAbril/apiTest/build_json_1.py",
        "./app_comicAbril/apiTest/build_json_2.py",
        "./app_comicAbril/apiTest/build_json_3.py",
        "./app_comicAbril/apiTest/build_json_4.py",
        "./app_comicAbril/apiTest/Bélico.json",
        "./app_comicAbril/apiTest/Bélico_procesado.json",
        "./app_comicAbril/apiTest/Ciencia_Ficción.json",
        "./app_comicAbril/apiTest/Ciencia_Ficción_procesado.json",
        "./app_comicAbril/apiTest/comandos_build_json_1",
        "./app_comicAbril/apiTest/Costumbrismo_Drama.json",
        "./app_comicAbril/apiTest/Costumbrismo_Drama_procesado.json",
        "./app_comicAbril/apiTest/Fantasía_Romance.json",
        "./app_comicAbril/apiTest/Fantasía_Romance_procesado.json",
        "./app_comicAbril/apiTest/Género_negro_Terror_Underground.json",
        "./app_comicAbril/apiTest/Género_negro_Terror_Underground_procesado.json",
        "./app_comicAbril/apiTest/Histórico_Política.json",
        "./app_comicAbril/apiTest/Histórico_Política_procesado.json",
        "./app_comicAbril/apiTest/Humor.json",
        "./app_comicAbril/apiTest/Humor_procesado.json",
        "./app_comicAbril/apiTest/listado_isbns.txt",
        "./app_comicAbril/apiTest/Manga.json",
        "./app_comicAbril/apiTest/Manga_procesado.json",
        "./app_comicAbril/apiTest/Metacomic.json",
        "./app_comicAbril/apiTest/Metacomic_procesado.json",
        "./app_comicAbril/apiTest/Mujeres_Feminismo.json",
        "./app_comicAbril/apiTest/Mujeres_Feminismo_procesado.json",
        "./app_comicAbril/apiTest/Premios_Nacionales.json",
        "./app_comicAbril/apiTest/Premios_Nacionales_procesado.json",
        "./app_comicAbril/apiTest/revisar.txt",
        "./app_comicAbril/apiTest/Social_LGTBIplus.json",
        "./app_comicAbril/apiTest/Social_LGTBIplus_procesado.json",
        "./app_comicAbril/apiTest/TODO.json",
        "./app_comicAbril/apiTest/TODO_procesado.json",
        "./app_comicAbril/code/Adaptación_literaria.json",
        "./app_comicAbril/code/aux1",
        "./app_comicAbril/code/Aventura_Superhéroes.json",
        "./app_comicAbril/code/biblioteca.json",
        "./app_comicAbril/code/biblioteca_completa.json",
        "./app_comicAbril/code/biblioteca_procesada.json",
        "./app_comicAbril/code/Biografía.json",
        "./app_comicAbril/code/build_json_1.py",
        "./app_comicAbril/code/build_json_2.py",
        "./app_comicAbril/code/Bélico.json",
        "./app_comicAbril/code/Ciencia_Ficción.json",
        "./app_comicAbril/code/comandos",
        "./app_comicAbril/code/Costumbrismo_Drama.json",
        "./app_comicAbril/code/Fantasía_Romance.json",
        "./app_comicAbril/code/generate_rn.py",
        "./app_comicAbril/code/Género_negro_Terror_Underground.json",
        "./app_comicAbril/code/Histórico_Política.json",
        "./app_comicAbril/code/Humor.json",
        "./app_comicAbril/code/isbns.txt",
        "./app_comicAbril/code/isbns.txt.bak",
        "./app_comicAbril/code/isbns_ordenados.txt",
        "./app_comicAbril/code/Manga.json",
        "./app_comicAbril/code/Metacomic.json",
        "./app_comicAbril/code/Mujeres_Feminismo.json",
        "./app_comicAbril/code/Premios_Nacionales.json",
        "./app_comicAbril/code/procesar_ISBN.py",
        "./app_comicAbril/code/rename_commands.sh",
        "./app_comicAbril/code/salida",
        "./app_comicAbril/code/Social_LGTBIplus.json",
        "./app_comicAbril/code/validisbn",
        "./app_comicAbril/codeMayo/modificados/Adaptación_literaria.json",
        "./app_comicAbril/codeMayo/modificados/Aventura_Superhéroes.json",
        "./app_comicAbril/codeMayo/modificados/Biografía.json",
        "./app_comicAbril/codeMayo/modificados/Bélico.json",
        "./app_comicAbril/codeMayo/modificados/Ciencia_Ficción.json",
        "./app_comicAbril/codeMayo/modificados/Costumbrismo_Drama.json",
        "./app_comicAbril/codeMayo/modificados/Fantasía_Romance.json",
        "./app_comicAbril/codeMayo/modificados/Género_negro_Terror_Underground.json",
        "./app_comicAbril/codeMayo/modificados/Histórico_Política.json",
        "./app_comicAbril/codeMayo/modificados/Humor.json",
        "./app_comicAbril/codeMayo/modificados/Manga.json",
        "./app_comicAbril/codeMayo/modificados/Metacomic.json",
        "./app_comicAbril/codeMayo/modificados/Mujeres_Feminismo.json",
        "./app_comicAbril/codeMayo/modificados/Premios_Nacionales.json",
        "./app_comicAbril/codeMayo/modificados/Social_LGTBIplus.json",
        "./app_comicAbril/codeMayo/originales/Adaptación_literaria.json",
        "./app_comicAbril/codeMayo/originales/Aventura_Superhéroes.json",
        "./app_comicAbril/codeMayo/originales/Biografía.json",
        "./app_comicAbril/codeMayo/originales/Bélico.json",
        "./app_comicAbril/codeMayo/originales/Ciencia_Ficción.json",
        "./app_comicAbril/codeMayo/originales/Costumbrismo_Drama.json",
        "./app_comicAbril/codeMayo/originales/Fantasía_Romance.json",
        "./app_comicAbril/codeMayo/originales/Género_negro_Terror_Underground.json",
        "./app_comicAbril/codeMayo/originales/Histórico_Política.json",
        "./app_comicAbril/codeMayo/originales/Humor.json",
        "./app_comicAbril/codeMayo/originales/Manga.json",
        "./app_comicAbril/codeMayo/originales/Metacomic.json",
        "./app_comicAbril/codeMayo/originales/Mujeres_Feminismo.json",
        "./app_comicAbril/codeMayo/originales/Premios_Nacionales.json",
        "./app_comicAbril/codeMayo/originales/Social_LGTBIplus.json",
        "./app_comicAbril/codeMayo/ponerCoverISBN.py",
        "./app_comicAbril/css/decks.css",
        "./app_comicAbril/css/styles.css",
        "./app_comicAbril/css/switch.css",
        "./app_comicAbril/images/choose-type.svg",
        "./app_comicAbril/images/cover/8417575022.jpg",
        "./app_comicAbril/images/cover/9781595824318.jpg",
        "./app_comicAbril/images/cover/9781595825018.jpg",
        "./app_comicAbril/images/cover/9788412007350.jpg",
        "./app_comicAbril/images/cover/9788415163046.jpg",
        "./app_comicAbril/images/cover/9788415163428.jpg",
        "./app_comicAbril/images/cover/9788415601937.jpg",
        "./app_comicAbril/images/cover/9788415685357.jpg",
        "./app_comicAbril/images/cover/9788415685487.jpg",
        "./app_comicAbril/images/cover/9788415724780.jpg",
        "./app_comicAbril/images/cover/9788416114153.jpg",
        "./app_comicAbril/images/cover/9788416131341.jpg",
        "./app_comicAbril/images/cover/9788416251513.jpg",
        "./app_comicAbril/images/cover/9788416880485.jpg",
        "./app_comicAbril/images/cover/9788417776640.jpg",
        "./app_comicAbril/images/cover/9788417989699.jpg",
        "./app_comicAbril/images/cover/9788418052675.jpg",
        "./app_comicAbril/images/cover/97884415530145.jpg",
        "./app_comicAbril/images/cover/9788461249787.jpg",
        "./app_comicAbril/images/cover/9788467433975.jpg",
        "./app_comicAbril/images/cover/9788467438000.jpg",
        "./app_comicAbril/images/cover/9788467909227.jpg",
        "./app_comicAbril/images/cover/9788467909982.jpg",
        "./app_comicAbril/images/cover/9788467914252.jpg",
        "./app_comicAbril/images/cover/9788467924718.jpg",
        "./app_comicAbril/images/cover/9788490249505.jpg",
        "./app_comicAbril/images/cover/9788496730588.jpg",
        "./app_comicAbril/images/cover/9788496815391.jpg",
        "./app_comicAbril/images/cover/9788498852998.jpg",
        "./app_comicAbril/images/cover/9788498853445.jpg",
        "./app_comicAbril/images/discard.svg",
        "./app_comicAbril/images/favorite.svg",
        "./app_comicAbril/images/main-deck.svg",
        "./app_comicAbril/images/noun-comic-5640534.svg",
        "./app_comicAbril/images/portadaZC_0.jpg",
        "./app_comicAbril/images/restart.svg",
        "./app_comicAbril/index.html",
        "./app_comicAbril/js/Adaptación_literaria.json",
        "./app_comicAbril/js/Aventura_Superhéroes.json",
        "./app_comicAbril/js/Biografía.json",
        "./app_comicAbril/js/Bélico.json",
        "./app_comicAbril/js/categorias-switchs.js",
        "./app_comicAbril/js/Ciencia_Ficción.json",
        "./app_comicAbril/js/Costumbrismo_Drama.json",
        "./app_comicAbril/js/Fantasía_Romance.json",
        "./app_comicAbril/js/Género_negro_Terror_Underground.json",
        "./app_comicAbril/js/Histórico_Política.json",
        "./app_comicAbril/js/Humor.json",
        "./app_comicAbril/js/main-buttons.js",
        "./app_comicAbril/js/main-favorite-deck.js",
        "./app_comicAbril/js/Manga.json",
        "./app_comicAbril/js/Metacomic.json",
        "./app_comicAbril/js/Mujeres_Feminismo.json",
        "./app_comicAbril/js/Premios_Nacionales.json",
        "./app_comicAbril/js/restart-button.js",
        "./app_comicAbril/js/Social_LGTBIplus.json",
        "./app_cuentameUnCuento/css/styles.css",
        "./app_cuentameUnCuento/images/juglar.png",
        "./app_cuentameUnCuento/images/plain_dice.png",
        "./app_cuentameUnCuento/images/shadow.png",
        "./app_cuentameUnCuento/images/story-image-circle-line-svgrepo-com-03a9f4.svg",
        "./app_cuentameUnCuento/images/story-image-circle-line-svgrepo-com.svg",
        "./app_cuentameUnCuento/images/story_dice1.png",
        "./app_cuentameUnCuento/images/story_dice10.png",
        "./app_cuentameUnCuento/images/story_dice101.png",
        "./app_cuentameUnCuento/images/story_dice102.png",
        "./app_cuentameUnCuento/images/story_dice103.png",
        "./app_cuentameUnCuento/images/story_dice104.png",
        "./app_cuentameUnCuento/images/story_dice105.png",
        "./app_cuentameUnCuento/images/story_dice106.png",
        "./app_cuentameUnCuento/images/story_dice107.png",
        "./app_cuentameUnCuento/images/story_dice108.png",
        "./app_cuentameUnCuento/images/story_dice109.png",
        "./app_cuentameUnCuento/images/story_dice11.png",
        "./app_cuentameUnCuento/images/story_dice12.png",
        "./app_cuentameUnCuento/images/story_dice13.png",
        "./app_cuentameUnCuento/images/story_dice14.png",
        "./app_cuentameUnCuento/images/story_dice15.png",
        "./app_cuentameUnCuento/images/story_dice16.png",
        "./app_cuentameUnCuento/images/story_dice17.png",
        "./app_cuentameUnCuento/images/story_dice18.png",
        "./app_cuentameUnCuento/images/story_dice19.png",
        "./app_cuentameUnCuento/images/story_dice2.png",
        "./app_cuentameUnCuento/images/story_dice20.png",
        "./app_cuentameUnCuento/images/story_dice21.png",
        "./app_cuentameUnCuento/images/story_dice22.png",
        "./app_cuentameUnCuento/images/story_dice23.png",
        "./app_cuentameUnCuento/images/story_dice24.png",
        "./app_cuentameUnCuento/images/story_dice25.png",
        "./app_cuentameUnCuento/images/story_dice26.png",
        "./app_cuentameUnCuento/images/story_dice27.png",
        "./app_cuentameUnCuento/images/story_dice28.png",
        "./app_cuentameUnCuento/images/story_dice29.png",
        "./app_cuentameUnCuento/images/story_dice3.png",
        "./app_cuentameUnCuento/images/story_dice30.png",
        "./app_cuentameUnCuento/images/story_dice31.png",
        "./app_cuentameUnCuento/images/story_dice32.png",
        "./app_cuentameUnCuento/images/story_dice33.png",
        "./app_cuentameUnCuento/images/story_dice34.png",
        "./app_cuentameUnCuento/images/story_dice35.png",
        "./app_cuentameUnCuento/images/story_dice36.png",
        "./app_cuentameUnCuento/images/story_dice37.png",
        "./app_cuentameUnCuento/images/story_dice38.png",
        "./app_cuentameUnCuento/images/story_dice39.png",
        "./app_cuentameUnCuento/images/story_dice4.png",
        "./app_cuentameUnCuento/images/story_dice40.png",
        "./app_cuentameUnCuento/images/story_dice41.png",
        "./app_cuentameUnCuento/images/story_dice42.png",
        "./app_cuentameUnCuento/images/story_dice43.png",
        "./app_cuentameUnCuento/images/story_dice44.png",
        "./app_cuentameUnCuento/images/story_dice45.png",
        "./app_cuentameUnCuento/images/story_dice46.png",
        "./app_cuentameUnCuento/images/story_dice47.png",
        "./app_cuentameUnCuento/images/story_dice48.png",
        "./app_cuentameUnCuento/images/story_dice49.png",
        "./app_cuentameUnCuento/images/story_dice5.png",
        "./app_cuentameUnCuento/images/story_dice50.png",
        "./app_cuentameUnCuento/images/story_dice51.png",
        "./app_cuentameUnCuento/images/story_dice6.png",
        "./app_cuentameUnCuento/images/story_dice7.png",
        "./app_cuentameUnCuento/images/story_dice8.png",
        "./app_cuentameUnCuento/images/story_dice9.png",
        "./app_cuentameUnCuento/index.html",
        "./app_cuentameUnCuento/js/dadosHistorias.js",
        "./app_cuentameUnCuento/js/qrcode.min.js",
        "./app_debug/resolucionPantalla.html",
        "./app_EmojiStarsRating/emojis/emoji-1.png",
        "./app_EmojiStarsRating/emojis/emoji-2.png",
        "./app_EmojiStarsRating/emojis/emoji-3.png",
        "./app_EmojiStarsRating/emojis/emoji-4.png",
        "./app_EmojiStarsRating/emojis/emoji-5.png",
        "./app_EmojiStarsRating/index.html",
        "./app_EmojiStarsRating/style.css",
        "./app_MAIN/css/styles.css",
        "./app_MAIN/css/stylesPuntoDeInformacionBUS.css",
        "./app_MAIN/images/bookshelf-library-svgrepo-com.svg",
        "./app_MAIN/images/darth-vader-svgrepo-com.svg",
        "./app_MAIN/images/dice6.svg",
        "./app_MAIN/images/eye-3-svgrepo-com.svg",
        "./app_MAIN/images/megaphone-7-svgrepo-com.svg",
        "./app_MAIN/images/noun-comic-3925541.svg",
        "./app_MAIN/images/noun-comic-4048248.svg",
        "./app_MAIN/images/noun-comic-5640534.svg",
        "./app_MAIN/images/noun-woody-allen-105159.png",
        "./app_MAIN/images/noun-woody-allen-105159.svg",
        "./app_MAIN/images/poster-svgrepo-com.svg",
        "./app_MAIN/images/rick-svgrepo-com.svg",
        "./app_MAIN/images/warp-galaxy-svgrepo-com.svg",
        "./app_MAIN/js/javascript.js",
        "./app_MAIN/js/rotatoryModal.js",
        "./app_preguntasFrecuentes/code/results.php",
        "./app_preguntasFrecuentes/css/accordion.css",
        "./app_preguntasFrecuentes/css/existencias.css",
        "./app_preguntasFrecuentes/css/styles.css",
        "./app_preguntasFrecuentes/css/styles9.css",
        "./app_preguntasFrecuentes/horariosCOM.html",
        "./app_preguntasFrecuentes/images/android-svgrepo-com.svg",
        "./app_preguntasFrecuentes/images/apple-inc-svgrepo-com.svg",
        "./app_preguntasFrecuentes/images/charger-svgrepo-com.svg",
        "./app_preguntasFrecuentes/images/demo_salas.jpg",
        "./app_preguntasFrecuentes/images/laptop-alt-2-svgrepo-com.svg",
        "./app_preguntasFrecuentes/images/laptop-material-4-svgrepo-com.svg",
        "./app_preguntasFrecuentes/images/laptop-material-6-svgrepo-com.svg",
        "./app_preguntasFrecuentes/images/working-with-laptop-black.svg",
        "./app_preguntasFrecuentes/images/working-with-laptop-eee.svg",
        "./app_preguntasFrecuentes/index.backup.html",
        "./app_preguntasFrecuentes/index.html",
        "./app_preguntasFrecuentes/js/consultaPortatiles.js",
        "./app_preguntasFrecuentes/js/consultaPortatilesHeroku.js",
        "./app_preguntasFrecuentes/js/horarios_app9.js",
        "./app_preguntasFrecuentes/js/horarios_data.json",
        "./app_preguntasFrecuentes/js/javascript_accordion.js",
        "./app_relojUniversal/css/ra0.css",
        "./app_relojUniversal/css/ra1.css",
        "./app_relojUniversal/css/ra10.css",
        "./app_relojUniversal/css/ra15.css",
        "./app_relojUniversal/css/ra2.css",
        "./app_relojUniversal/css/ra3.css",
        "./app_relojUniversal/css/ra4.css",
        "./app_relojUniversal/css/ra5.css",
        "./app_relojUniversal/css/ra6.css",
        "./app_relojUniversal/css/ra7.css",
        "./app_relojUniversal/css/ra8.css",
        "./app_relojUniversal/css/ra9.css",
        "./app_relojUniversal/css/stylesMain.css",
        "./app_relojUniversal/images/clock2-svgrepo-com.svg",
        "./app_relojUniversal/index.html",
        "./app_relojUniversal/js/clock.js",
        "./app_relojUniversal/js/ra0.js",
        "./app_relojUniversal/js/ra1.js",
        "./app_relojUniversal/js/ra10.js",
        "./app_relojUniversal/js/ra15.js",
        "./app_relojUniversal/js/ra2.js",
        "./app_relojUniversal/js/ra3.js",
        "./app_relojUniversal/js/ra4.js",
        "./app_relojUniversal/js/ra5.js",
        "./app_relojUniversal/js/ra6.js",
        "./app_relojUniversal/js/ra7.js",
        "./app_relojUniversal/js/ra8.js",
        "./app_relojUniversal/js/ra9.js",
        "./app_relojUniversal/js/relojController0.js",
        "./app_relojUniversal/js/relojController1.js",
        "./app_relojUniversal/js/relojControllerSinRecarga.js",
        "./app_relojUniversal/relojeria0.html",
        "./app_relojUniversal/relojeria1.html",
        "./app_relojUniversal/relojes.Reserva.md",
        "./app_teNecesitamos/css/abueloNieto.css",
        "./app_teNecesitamos/css/cssTabs.css",
        "./app_teNecesitamos/css/styles.css",
        "./app_teNecesitamos/images/warp-galaxy-svgrepo-com.svg",
        "./app_teNecesitamos/images/working-with-laptop-black.svg",
        "./app_teNecesitamos/images/working-with-laptop-eee.svg",
        "./app_teNecesitamos/index.html",
        "./app_teNecesitamos/js/javascript.js",
        "./app_teNecesitamos/js/qrcode.min.js",
        "./app_woodyAllen/code/api_omeka.md",
        "./app_woodyAllen/code/api_omeka_All.json",
        "./app_woodyAllen/code/libros.txt",
        "./app_woodyAllen/code/peliculas.json",
        "./app_woodyAllen/code/peliculas.py",
        "./app_woodyAllen/code/peliculas.txt",
        "./app_woodyAllen/code/peliculas_omeka_01.json",
        "./app_woodyAllen/code/peliculas_omeka_02.json",
        "./app_woodyAllen/code/pelis",
        "./app_woodyAllen/code/python_omeka.py",
        "./app_woodyAllen/code/python_omeka_2.py",
        "./app_woodyAllen/code/testing_omeka.html",
        "./app_woodyAllen/code/vivaldi.html",
        "./app_woodyAllen/css/newYork.css",
        "./app_woodyAllen/css/styles.css",
        "./app_woodyAllen/css/wheelOfFortune.css",
        "./app_woodyAllen/images/arrow-sync-svgrepo-com.svg",
        "./app_woodyAllen/images/book-svgrepo-com.svg",
        "./app_woodyAllen/images/brain-14-svgrepo-com.svg",
        "./app_woodyAllen/images/cinema-clapper-director-scene-movie-svgrepo-com.svg",
        "./app_woodyAllen/images/circle-svgrepo-com.svg",
        "./app_woodyAllen/images/movie-projector-svgrepo-com.svg",
        "./app_woodyAllen/images/new-york-panoramic-buildings-silhouette-svgrepo-com.svg",
        "./app_woodyAllen/images/noun-woody-allen-03a9f4.svg",
        "./app_woodyAllen/images/noun-woody-allen-eee.svg",
        "./app_woodyAllen/images/question1-svgrepo-com.svg",
        "./app_woodyAllen/index.html",
        "./app_woodyAllen/js/DEBUG.json",
        "./app_woodyAllen/js/ESCENAS.json",
        "./app_woodyAllen/js/EXTRA.json",
        "./app_woodyAllen/js/FRASES.json",
        "./app_woodyAllen/js/leaflet.js",
        "./app_woodyAllen/js/LIBROS.json",
        "./app_woodyAllen/js/NEW♥YORK.json",
        "./app_woodyAllen/js/PARTICIPA.json",
        "./app_woodyAllen/js/PELÍCULAS_imdb.json",
        "./app_woodyAllen/js/PELÍCULAS_omeka.json",
        "./app_woodyAllen/js/qrcode.min.js",
        "./app_woodyAllen/js/wheelOfFortune.js",
        "./app_woodyAllen/js/wheelOfFortuneQR.js",
        "./app_woodyAllen/QR_wikipedia.html",
        "./app_workingOn/css/styles.css",
        "./app_workingOn/files/Arabesque1Debussy.mid",
        "./app_workingOn/files/DueloNavajas.mid",
        "./app_workingOn/files/jinmeri.mid",
        "./app_workingOn/gigantes.html",
        "./app_workingOn/girasol.html",
        "./app_workingOn/images/characterAI.jpg",
        "./app_workingOn/images/hombrosGigantes.jpg",
        "./app_workingOn/images/working-with-laptop-03a9f4.svg",
        "./app_workingOn/images/working-with-laptop-black.svg",
        "./app_workingOn/images/working-with-laptop-eee.svg",
        "./app_workingOn/index.html",
        "./app_workingOn/midilandia.html",
        "./app_workingOn/novaBus.html",
        "./app_workingOn/rosa.html",
        "./app_workingOn/screensaver.html",
        "./ficheros_public.txt",
        "./icons/manifest-icon-180.maskable.png",
        "./icons/manifest-icon-192.maskable.png",
        "./icons/manifest-icon-512.maskable.png",
        "./icons/manifest-icon-96.maskable.png",
        "./index.html",
        "./labCopilot.md",
        "./public_dirs.txt",
        "./screenshots/screenshot_appMain.png",
        "./screenshots/screenshot_appMain2.png",
        "./screenshots/screenshot_CartelesBiblioteca.png",
        "./screenshots/screenshot_Comics.png",
        "./screenshots/screenshot_FAQs.png",
        "./screenshots/screenshot_RelojUniversal.png",
        "./screenshots/screenshot_TeNecesitamos.png",
        "./screenshots/screenshot_WoodyAllen.png",
        "./screenshots/screenshot_WorkingOn.png",
        "./simuladorDeTotem.html",
        "./manifest.json",
        "./service-worker.js"
    ]

    // The Util Function to hack URLs of intercepted requests
    const getFixedUrl = (req) => {
        var now = Date.now()
        var url = new URL(req.url)

        // 1. fixed http URL
        // Just keep syncing with location.protocol
        // fetch(httpURL) belongs to active mixed content.
        // And fetch(httpRequest) is not supported yet.
        url.protocol = self.location.protocol

        // 2. add query for caching-busting.
        // Github Pages served with Cache-Control: max-age=600
        // max-age on mutable content is error-prone, with SW life of bugs can even extend.
        // Until cache mode of Fetch API landed, we have to workaround cache-busting with query string.
        // Cache-Control-Bug: https://bugs.chromium.org/p/chromium/issues/detail?id=453190
        if (url.hostname === self.location.hostname) {
            url.search += (url.search ? '&' : '?') + 'cache-bust=' + now
        }
        return url.href
    }


    /**
     *  @Lifecycle Install 
     */
    self.addEventListener('install', event => {
      event.waitUntil((async () => {
          const cache = await caches.open(CACHE_NAME);
          for (const asset of PRECACHE_ASSETS) {
              try {
                  await cache.add(asset);
                  console.log(`Successfully cached: ${asset}`);
              } catch (error) {
                  console.error(`Failed to cache: ${asset}`, error);
              }
          }
      })());
  });

    /**
     *  funcion cacheAllFiles
     */

    /**
     *  @Lifecycle Activate
     *  New one activated when old isnt being used.
     *
     *  waitUntil(): activating ====> activated
     */
    self.addEventListener('activate', event => {
      event.waitUntil(self.clients.claim())
    })


    /**
     *  @Functional Fetch
     *  All network requests are being intercepted here.
     *
     *  void respondWith(Promise<Response> r)
     */
    self.addEventListener('fetch', event => {
      // Skip some of cross-origin requests, like those for Google Analytics.
      if (HOSTNAME_WHITELIST.indexOf(new URL(event.request.url).hostname) > -1) {
          
          
          // Stale-while-revalidate
          // similar to HTTP's stale-while-revalidate: https://www.mnot.net/blog/2007/12/12/stale
          // Upgrade from Jake's to Surma's: https://gist.github.com/surma/eb441223daaedf880801ad80006389f1
          /** 
          const cached = caches.match(event.request)
          const fixedUrl = getFixedUrl(event.request)
          const fetched = fetch(fixedUrl, { cache: 'no-store' })
          const fetchedCopy = fetched.then(resp => resp.clone())
          */
          // Call respondWith() with whatever we get first.
          // If the fetch fails (e.g disconnected), wait for the cache.
          // If there’s nothing in cache, wait for the fetch.
          // If neither yields a response, return offline pages.
          /** 
          event.respondWith(
          Promise.race([fetched.catch(_ => cached), cached])
              .then(resp => resp || fetched)
              .catch(_ => {} )
          )
          */
          // Update the cache with the version we fetched (only for ok status)
          /** 
          event.waitUntil(
          Promise.all([fetchedCopy, caches.open("pwa-cache")])
              .then(([response, cache]) => response.ok && cache.put(event.request, response))
              .catch(_ => {})
          )
          */
  
          self.addEventListener('fetch', (event) => {
            // Check if this is a navigation request
            if (event.request.mode === 'navigate') {
              // Open the cache
              event.respondWith(caches.open(CACHE_NAME).then((cache) => {
                // Go to the network first
                return fetch(event.request.url).then((fetchedResponse) => {
                  cache.put(event.request, fetchedResponse.clone());
          
                  return fetchedResponse;
                }).catch(() => {
                  // If the network is unavailable, get
                  return cache.match(event.request.url);
                });
              }));
            }  else {
              event.respondWith(
                  caches.match(event.request).then((response) => {
                      return response || fetch(event.request).then((fetchedResponse) => {
                          return caches.open(CACHE_NAME).then((cache) => {
                              cache.put(event.request, fetchedResponse.clone());
                              return fetchedResponse;
                          });
                      });
                  })
              );
            }
          }); 
        }
  })  

