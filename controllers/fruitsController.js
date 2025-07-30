const connection = require("../db/connect");

const addFruits = async (req, res) => {
    try {
        const { fruit, price } = req.body;

        // Validate input
        if (!fruit || !price) {
            return res.status(400).json({ msg: "Fruit and price are required" });
        }

        // Insert the fruit into the database
        const addFruitQuery = `
            INSERT INTO Fruits (fruit, price)
            VALUES (?, ?)
        `;

        connection.query(addFruitQuery, [fruit, price], (err, results) => {
            if (err) {
                console.error('Error adding fruit to database:', err);
                return res.status(500).json('Internal Server error');
            }

            return res.json({ msg: "Fruit added successfully" });
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json("Internal Server error");
    }
};

// Static image URLs for demo
const fruitImages = {
    apple: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=200&q=80",
    banana: "https://th.bing.com/th/id/R.27bd77b7a2a0a4c6ba8f97576fd0225d?rik=HrKczj4Fht4tBw&riu=http%3a%2f%2fweknowyourdreams.com%2fimages%2fbanana%2fbanana-02.jpg&ehk=eYK4G8CM4DNYN0qWcCDU7EHRAlNpX9avsOD4aY83J2w%3d&risl=&pid=ImgRaw&r=0",
    orange: "https://th.bing.com/th/id/R.a8e83d5482e46bfdbd52476546d9cdd7?rik=9sM4jdpPK7mDWQ&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f2016%2f05%2fOrange-Free-PNG-Image.png&ehk=0TgvoJ62gbSTDIxL63kfKEfbm%2fAQPRrbNT%2flPXwadn4%3d&risl=1&pid=ImgRaw&r=0",
    mango: "https://daganghalal.blob.core.windows.net/28749/Product/1000x1000__mango-1657087656055.jpg",
    grapes: "https://www.foodrepublic.com/img/gallery/15-types-of-grapes-to-know-eat-and-drink/l-intro-1684769284.jpg",
    // Add more as needed
};

const getFruits = (req, res) => {
    const query = `SELECT * FROM Fruits`;
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching fruits:', err);
            return res.status(500).json('Internal Server error');
        }
        // Attach static image URL based on fruit name (lowercase)
        const fruitsWithImages = results.map(fruit => ({
            ...fruit,
            image: fruitImages[fruit.fruit.toLowerCase()] || "https://via.placeholder.com/200x200?text=Fruit"
        }));
        return res.json(fruitsWithImages);
    });
};

module.exports = { addFruits, getFruits };
