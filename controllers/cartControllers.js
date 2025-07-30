const connection = require("../db/connect");

const addToCart = async (req, res) => {
    try {
        const { user_id, fruit_id } = req.body;

        // Validate input
        if (!user_id || !fruit_id) {
            return res.status(400).json({ msg: "User ID and Fruit ID are required" });
        }

        // Insert into Cart table (parameterized)
        const addToCartQuery = `
            INSERT INTO Cart (user_id, fruit_id)
            VALUES (?, ?)
        `;

        connection.query(addToCartQuery, [user_id, fruit_id], (err, results) => {
            if (err) {
                console.error('Error adding to cart:', err);
                return res.status(500).json('Internal Server error');
            }

            return res.json({ msg: "Fruit added to cart successfully" });
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json("Internal Server error");
    }
};

// Static image URLs for demo (should match fruitsController)
const fruitImages = {
    apple: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=200&q=80",
    banana: "https://images.unsplash.com/photo-1574226516831-e1dff420e8e9?auto=format&fit=crop&w=200&q=80",
    orange: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=200&q=80",
    mango: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=200&q=80",
    grapes: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=200&q=80",
    // Add more as needed
};

const getCart = (req, res) => {
    const user_id = req.params.user_id;
    if (!user_id) return res.status(400).json({ msg: "User ID is required" });
    const query = `
        SELECT Cart.id as cart_id, Fruits.id as fruit_id, Fruits.fruit, Fruits.price
        FROM Cart
        JOIN Fruits ON Cart.fruit_id = Fruits.id
        WHERE Cart.user_id = ?
    `;
    connection.query(query, [user_id], (err, results) => {
        if (err) {
            console.error('Error fetching cart:', err);
            return res.status(500).json('Internal Server error');
        }
        // Attach static image URL based on fruit name (lowercase)
        const cartWithImages = results.map(item => ({
            ...item,
            image: fruitImages[item.fruit.toLowerCase()] || "https://via.placeholder.com/200x200?text=Fruit"
        }));
        return res.json(cartWithImages);
    });
};

const removeFromCart = (req, res) => {
    const cart_id = req.params.cart_id;
    if (!cart_id) return res.status(400).json({ msg: "Cart item ID is required" });
    const query = `DELETE FROM Cart WHERE id = ?`;
    connection.query(query, [cart_id], (err, results) => {
        if (err) {
            console.error('Error removing from cart:', err);
            return res.status(500).json('Internal Server error');
        }
        return res.json({ msg: "Item removed from cart" });
    });
};

module.exports = { addToCart, getCart, removeFromCart };
