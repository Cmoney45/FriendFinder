const friends = [];

 const createFriend = (name, photo) => {
    let newFriend = {
        "name": name,
        "photo": photo,
        "scores":[
            `${(Math.floor(Math.random() * 5) + 1)}`,
            `${(Math.floor(Math.random() * 5) + 1)}`,
            `${(Math.floor(Math.random() * 5) + 1)}`,
            `${(Math.floor(Math.random() * 5) + 1)}`,
            `${(Math.floor(Math.random() * 5) + 1)}`,
            `${(Math.floor(Math.random() * 5) + 1)}`,
            `${(Math.floor(Math.random() * 5) + 1)}`,
            `${(Math.floor(Math.random() * 5) + 1)}`,
            `${(Math.floor(Math.random() * 5) + 1)}`,
            `${(Math.floor(Math.random() * 5) + 1)}`,
        ]
    }

    friends.push(newFriend);
 };

const charlie = new createFriend("Charlie Kelly", "https://images.8tracks.com/cover/i/009/128/165/Screen_Shot_2015-05-29_at_9.04.57_PM-151.png?rect=0,2,690,690&q=98&fm=jpg&fit=max&w=640&h=640");
const mac = new createFriend("Ronald McDonald", "https://qph.fs.quoracdn.net/main-qimg-ea4b938c491a63435770555e8a5cad56-c")
const dennis = new createFriend("Dennis Reynolds", "https://pbs.twimg.com/profile_images/468455129491189760/CdOdmU0q_400x400.jpeg");
const mantis = new createFriend("Mantis Toboggan, M.D.", "https://i1.sndcdn.com/avatars-000091511606-wp2f16-t500x500.jpg") 

module.exports = friends;