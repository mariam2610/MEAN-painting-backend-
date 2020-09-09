const Artist = require('../models/artist');

exports.createartist = (req, res) => {
    const artist = new Artist(req.body);
    artist.save((err, artist) => {
        if (err) {
            if (err.code === 11000 || err.code === 11001) {
                return res.status(400).json({ error: "Duplicate Value " + req.body.artist_name + ", value must be UNIQUE" });
            }
            else {
                return res.status(400).json({ error: "Not able to save " + req.body.artist_name + " in DB" });
            }

        }
        res.json({ artist });
    });
};

exports.getallartists = (req, res) => {
    Artist.find().exec((err, categories) => {
        if (err) {
            return res.status(400).json({ error: "No categories found" });
        }
        res.json(categories);

    });
};

exports.getartistbyid = (req, res, next, id) => {
    Artist.findById(id).exec((err, cate) => {
        if (err) {
            return res.status(400).json({ error: +req.body.artist_name + " not found in DB" });
        }
        req.artist = cate;
        console.log(req.artist = cate);
        next();
    });
};

exports.getartist = (req, res) => {
    return res.json(req.artist);
}

exports.updateartist = (req, res) => {
    const artist = req.artist;

    artist.artist_name = req.body.artist_name;
    artist.artist_email = req.body.artist_email;
    artist.artist_contact = req.body.artist_contact;

    artist.save((err, updatedartist) => {
        if (err) {
            return res.status(400).json({ error: "Failed to update " + req.body.artist_name + " artist" });
        }
        res.json({ messsage: "Successfully Updated :", updateartist: updatedartist });
    });
};

exports.removeartist = (req, res) => {
    const artist = req.artist;

    artist.remove((err, artist) => {
        if (err) {
            return res.status(400).json({ error: "Failed to delete " + req.body.artist_name + " artist" });
        }
        res.json({ messsage: "Succesfully Deleted : ", artist: artist });
    });
};