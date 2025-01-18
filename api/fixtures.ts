import mongoose from "mongoose";
import config from "./config";
import Album from "./models/Album";
import Track from "./models/Track";
import Artist from "./models/Artist";


const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('artists');
        await db.dropCollection('albums');
         await db.dropCollection('tracks');
    } catch (e) {
        console.log("Collections were not presents, skipping drop");
    }

    const [zhukovArtist, gagarinaArtist] = await Artist.create({
        name: 'Sergei Zhukov',
        description: 'Sergey Evgenievich Zhukov (born May 22, 1976, Dimitrovgrad, Ulyanovsk region) is a Russian singer, musician, entrepreneur, music producer, TV and radio presenter, DJ. Soloist and leader of the Russian pop group “Hands Up!”\n' +
            'In the Forbes ranking of “Top Russian Celebrities” in 2017 they took 43rd place, and in 2018 they rose to sixteenth place. In 2021, the Forbes ranking of “50 most successful stars of Russia” took 21st place[1]',
            image: "fixtures/Zhukov.jpg"},
        {name: "Polina Gagarina",
            description: 'Polina Sergeevna Gagarina (born March 27, 1987[1][2], Moscow) is a Russian pop singer, film, television, voice and dubbing actress, composer and model[3]. People\'s Artist of the Republic of Bashkortostan (2024)[4].\n' +
                'Participant and winner of the Channel One project "Star Factory-2" (2003). Participated in the "New Wave" competition, took third place (2005)[5]. Represented Russia at the Eurovision Song Contest 2015, took second place[6]. Laureate of the "Golden Gramophone" award[7].',
            image: "fixtures/Gagarina.jpg"
        }
    );
    const [In_search_of_tendernessAlbum, TerritoryAlbum, Ask_the_cloudsAlbum, InhaleAlbum] = await Album.create({
        artist: zhukovArtist._id,
        title: "In search of tenderness",
        year: 2007,
        image: "fixtures/nezhnost.jpg",
    },
        {
            artist: zhukovArtist._id,
            title: "Territory",
            year: 2002,
            image: "fixtures/territoria.jpeg",
        },
        {
            artist: gagarinaArtist._id,
            title: "Ask the clouds",
            year: 2013,
            image: "fixtures/clouds.jpeg",
        }, {
            artist: gagarinaArtist._id,
            title: "Ihnail",
            year: 2022,
            image: "fixtures/Ihnail.jpeg",
        },);
    
 await Track.create({
        album: In_search_of_tendernessAlbum._id,
        name: "Let's Hide Behind the Rain...",
        time: "04:38",
        trackNumber: 1,
         linkYouTube: "https://www.youtube.com/watch?v=nJfyQSa9rVQ"
    },
     {
         album: In_search_of_tendernessAlbum._id,
         name: "Summer Evening",
         time: "04:34",
         trackNumber: 2,
         linkYouTube: "https://www.youtube.com/watch?v=IcAmrCULkPM"
     },{
         album: In_search_of_tendernessAlbum._id,
         name: "Why Do You Talk About Love?",
         time: "04:19",
         trackNumber: 3,
         linkYouTube: "https://www.youtube.com/watch?v=IcAmrCULkPM"
     },{
         album: In_search_of_tendernessAlbum._id,
         name: "Tears are dripping",
         time: "04:14",
         trackNumber: 4,
         linkYouTube: "https://www.youtube.com/watch?v=SKLglsJ8VUE"
     },{
         album: In_search_of_tendernessAlbum._id,
         name: "Roses",
         time: "04:09",
         trackNumber: 5,
         linkYouTube:"https://www.youtube.com/watch?v=ahKXU2T9xYU"
     },
     {
         album: TerritoryAlbum._id,
         name: "Whirlpool",
         time: "04:48",
         trackNumber: 6,
         linkYouTube: "https://www.youtube.com/watch?v=ahKXU2T9xYU"
     },
     {
         album: TerritoryAlbum._id,
         name: "Wait for me, my love",
         time: "03:29",
         trackNumber: 7,
         linkYouTube:"https://www.youtube.com/watch?v=rktVxcjZU1o"
     },
     {
         album: TerritoryAlbum._id,
         name: "Let You",
         time: "04:25",
         trackNumber: 8,
         linkYouTube: "https://www.youtube.com/watch?v=ZyEoPjNA-o8"
     },
     {
         album: TerritoryAlbum._id,
         name: "Next to You",
         time: "03:19",
         trackNumber: 9,
         linkYouTube: "https://www.youtube.com/watch?v=ZyEoPjNA-o8"
     },
     {
         album: TerritoryAlbum._id,
         name: "Separate",
         time: "04:08",
         trackNumber: 10,
         linkYouTube: "https://www.youtube.com/watch?v=rktVxcjZU1o"
     },
     {
         album: Ask_the_cloudsAlbum._id,
         name: " I am yours",
         time: "03:17",
         trackNumber: 11,
         linkYouTube: "https://www.youtube.com/watch?v=jZFbMmbQ9Fs"
     },
     {
         album: Ask_the_cloudsAlbum._id,
         name: "  Wind",
         time: "03:42",
         trackNumber: 12,
         linkYouTube: "https://www.youtube.com/watch?v=thtFvrl68-U"
     },
     {
         album: Ask_the_cloudsAlbum._id,
         name: " Give Up",
         time: "02:55",
         trackNumber: 13,
         linkYouTube:"https://www.youtube.com/watch?v=thtFvrl68-U"
     },
     {
         album:Ask_the_cloudsAlbum._id,
         name: "Morning",
         time: "03:43",
         trackNumber: 14,
         linkYouTube:"https://www.youtube.com/watch?v=PeggbKkZ8mk"

     },
     {
         album: Ask_the_cloudsAlbum._id,
         name: "I will never forgive you",
         time: "04:15",
         trackNumber: 15,
         linkYouTube: "https://www.youtube.com/watch?v=PeggbKkZ8mk"

     },
     {
         album: InhaleAlbum._id,
         name: "Butterflies",
         time: "03:08",
         trackNumber: 16,
         linkYouTube: "https://www.youtube.com/watch?v=tF_zhKxcH2s"
     },
     {
         album: InhaleAlbum._id,
         name: "Inhale",
         time: "02:59",
         trackNumber: 17,
         linkYouTube: "https://www.youtube.com/watch?v=yqqTBS7LFQU"
     },
     {
         album: InhaleAlbum._id,
         name: "Shadows",
         time: "03:36",
         trackNumber: 18,
         linkYouTube:"https://www.youtube.com/watch?v=qhrKHMY8EGM"
     },
     {
         album: InhaleAlbum._id,
         name: "They cried",
         time: "03:10",
         trackNumber: 19,
         linkYouTube:"https://www.youtube.com/watch?v=HC30C2Ae6rE"
     },
     {
         album: InhaleAlbum._id,
         name: " Water",
         time: "03:07",
         trackNumber: 20,
         linkYouTube:"https://www.youtube.com/watch?v=gv3s0hvq_p8"
     },
     );

    await db.close();
    
}

run().catch(console.error);