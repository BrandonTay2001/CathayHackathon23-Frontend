import {NextApiRequest, NextApiResponse} from 'next';
import moment from "moment/moment";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    res.json([
        {
            author: "Sandra Adams",
            pfp: "/pfp/3.jpg",
            title: "Trip to Italy",
            date: moment("2022-11-20"),
            video: "/reels/1.mp4",
            content: "My first time visiting Venice and Tuscany!\n\n Italy is a beautiful country in Europe blessed with beautiful landscapes to see and mesmerize. The cities in Italy have unique cultures as well as culinary skills. It can be visited at any time of the year but if you consider planning a budget holiday along with good climate, Springtime will be the best. Spring brings a lot of positivity and liveliness as the country has ample attractive gardens which blossom during this season. Italians celebrate spring on a huge level. You'll be able to enjoy a lot of springtime festivals hosted throughout Italy. You can witness these splendid festivals wherever you are in Italy just the season being Spring!\n\nAnother significant reason to be in Italy during spring would be it is less crowded during this period and is damn cheap. Lesser crowd means you can enjoy more with your company and you do not have long queues outside various museums. You also find cheaper places to stay in. Also, it is best to visit a place when you can enjoy their seasonal delicacies. Spring has its delicacies in Italy. Artichoke is a food item cultivated in cities in Italy and a popular dish called Carciofi Romaneschi is available during this season only. Fruits like cherries, lemons, strawberries, and tomatoes are readily available during Spring. Although the weather during this season is quite unpredictable, you can witness rain as well as snow during early spring, but the temperature in the cities in Italy doesn't rise above 20 degree Celsius and doesn't drop below 5!\n\nI would also suggest you the things you should pack if you are travelling to Italy during Springtime. As the weather is quite unpredictable, it is a must carry light-weight coat which is better as it is water-proof. A heavy coat, scarf and hat are advised to travel to northern Italy. Sturdy and comfortable walking shoes are a must to travel throughout Italy as there are many hiking trails."
        },
        {
            author: "Ali Connors",
            pfp: "/pfp/1.jpg",
            title: "Trip to Greece",
            video: "/reels/2.mp4",
            date: moment("2022-11-18"),
            content: "Greece: where historic ruins, volcanic cliffs, and friendly locals meet the blue Mediterranean Sea. My first trip to Greece was a summer adventure through Athens and Mykonos. I returned again to sail the Saronic Islands on The Yacht Week Greece, and then again to explore the Cyclades islands of Santorini, Milos, Paros, and Naxos! There are some islands that are famous for their beaches and natural features, while others have a significant nightlife scene or strong cultural traditions.\n\nMykonos is one of the most popular tourist destinations in the Greek islands and is famed for its incredible beaches and world-renowned party scene. I spent a week on the island and indulged in delicious food, epic sunsets, and some of the best parties I\u2019ve ever been to.\n\nIn my opinion, the best time to travel to Greece is between April and May. The weather is perfect for outdoor adventures, and you\u2019ll have the Greek Islands to yourself before the summer crowds arrive.\n\nThe one event you need to plan your trip around is Easter weekend. It\u2019s an incredibly busy time in the country and hotels are often booked up a few weeks in advance.\n\nIf you\u2019re traveling Greece on a budget or you want to avoid the crowds, the winter months are the best time to visit. The top attractions are void of other tourists, and you won\u2019t have a problem finding cheap flights and hotel deals."
        },
        {
            author: "Jose Anderson",
            pfp: "/pfp/2.jpg",
            title: "Trip to Kyoto",
            video: "/reels/3.mp4",
            date: moment("2022-11-17"),
            content: "Kyoto is my favorite city in Japan. It always has been. I\u2019ve visited many cities and prefectures through the years but Kyoto remains my favorite destination in the country.\n\nTokyo and Osaka are more exciting but Kyoto has everything I love about this fascinating country. Slower and more deliberate in pace, it\u2019s an atmospheric city that makes you feel like you were in a different time in Japan.\n\nKyoto is a city of Buddhist temples and Shinto shrines, of geishas and landscaped gardens far removed from the sensory overload of Harajuku and Akihabara. Don\u2019t get me wrong. I enjoy video games and otaru culture too. But when I imagine all the things I love most about Japan \u2013 atmosphere, tradition, culture, and food \u2013 I see Kyoto.\n\nThere is so much to see and experience in this city long regarded as the historical and cultural heart of Japan. If you\u2019re visiting Kyoto for the first time, then I hope this travel guide helps you fall in love with this city as much as I have.\n\nAcross the Kamo River from central/downtown Kyoto is Higashiyama Ward. Divided into north and south, this area is home to some of Kyoto\u2019s most popular attractions like Kiyomizu-dera, Yasaka Shrine, and Ninnen-zaka / Sannen-zaka streets.\n\nBoth Northern and Southern Higashiyama make great bases from which to explore Kyoto, though it\u2019s best to stay as close as possible to the Gion district. I stayed at Shiki Shiki Higashiyama which is right at the border of north and south. It\u2019s a clean and comfortable boutique inn in a quiet neighborhood in Higashiyama.\n\nI paid about USD 30 a night for a 3-person private room with a shower. That\u2019s USD 30 a night for the entire room! It may have been a little tight for three people, especially with all your luggage, but it\u2019s perfect for two."
        }
    ]);
}
