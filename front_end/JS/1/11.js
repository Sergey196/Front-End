var library =   [
    {  author: 'Bill Gates', title: 'The Road Ahead', libraryID: 1254},
    {  author: 'Steve Jobs', title: 'Walter Isaacson', libraryID: 4264},
    {  author: 'Suzanne Collins', title: 'Mockingjay: The Final Book of The Hunger Games', libraryID: 3245}
];

library.sort(function (a, b) {
    if (a.libraryID < b.libraryID) {
        return 1;
    }
    if (a.libraryID > b.libraryID) {
        return -1;
    }
    return 0;
});

console.log(library);
