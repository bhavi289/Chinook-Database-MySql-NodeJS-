const express = require('express');
const mysql = require('mysql');

// Create connection
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'chinook'
});

// Connect
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySql Connected...');
});

const app = express();


// Select actors
app.get('/getalbums', (req, res) => {
    let sql = 'SELECT * FROM Album';
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results[4]);
        res.json(results);
    });

// Select actors
app.get('/getalbum/:id', (req, res) => {
    let newTitle = 'Album';
    let sql = `SELECT * FROM Album WHERE Album_Id = "${req.params.id}"`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.json(result);
    });
});

// Join Querry
app.get('/join1', (req, res) => {
    let newTitle = 'Album';
    let sql = 'SELECT * FROM Album INNER JOIN Artist ON Album.Artist_Id = Artist.ArtistId;';
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.json(result);
    });
});

// Join Querry
app.get('/join2', (req, res) => {
    let sql = 'SELECT * FROM Track INNER JOIN Album ON Track.AlbumId = Album.Album_Id INNER JOIN MediaType ON Track.MediaTypeId = MediaType.MediaType_Id INNER JOIN Genre ON Track.GenreId = Genre.Genre_Id ';
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.json(result);
    });
});
// Join Querry
app.get('/join3', (req, res) => {
    let sql = 'SELECT * FROM Track INNER JOIN (SELECT * FROM Album INNER JOIN Artist ON Album.Artist_Id = Artist.ArtistId) z ON Track.AlbumId = z.Album_Id INNER JOIN MediaType ON Track.MediaTypeId = MediaType.MediaType_Id INNER JOIN Genre ON Track.GenreId = Genre.Genre_Id';
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.json(result);
    });
});

// Join Querry
app.get('/Playlists', (req, res) => {
    let sql = 'SELECT  PlaylistTrack.PlaylistId,Playlist_name, TrackName,Composer,AlbumTitle,ArtistName,MediaTypeName,GenreName,Milliseconds,Bytes,UnitPrice FROM PlaylistTrack INNER JOIN Playlist ON PlaylistTrack.PlaylistId = Playlist.PlaylistId INNER JOIN (SELECT * FROM Track INNER JOIN (SELECT * FROM Album INNER JOIN Artist ON Album.Artist_Id = Artist.ArtistId) z ON Track.AlbumId = z.Album_Id INNER JOIN MediaType ON Track.MediaTypeId = MediaType.MediaType_Id INNER JOIN Genre ON Track.GenreId = Genre.Genre_Id) p ON PlaylistTrack.TrackId = p.TrackId';
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.json(result);
    });
});
// Join Querry
app.get('/Playlist/:id', (req, res) => {
    let sql = `SELECT * FROM PlaylistTrack INNER JOIN Playlist ON PlaylistTrack.PlaylistId = Playlist.PlaylistId INNER JOIN (SELECT * FROM Track INNER JOIN (SELECT * FROM Album INNER JOIN Artist ON Album.Artist_Id = Artist.ArtistId) z ON Track.AlbumId = z.Album_Id INNER JOIN MediaType ON Track.MediaTypeId = MediaType.MediaType_Id INNER JOIN Genre ON Track.GenreId = Genre.Genre_Id) p ON PlaylistTrack.TrackId = p.TrackId where PlaylistTrack.PlaylistId="${req.params.id}"`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.json(result);
    });
});
// Join Querry
app.get('/Employee', (req, res) => {
    let sql = 'SELECT  * FROM Employee';
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.json(result);
    });
});

});
app.get('/', (req, res) => {
        res.send('Hello');
});

app.listen('3006', () => {
    console.log('Server started on port 3000');
});