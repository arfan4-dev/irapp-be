export const calculateStockByColor = (sizes) => {
    const colorStock = {};
    let total = 0; // Initialize total stock count

    // Iterate over each size (key) in the sizes object
    for (const sizeKey in sizes) {
        const sizeData = sizes[sizeKey]; // This is the array of colors and stock for the given size
        sizeData.forEach((sizeObj) => {
            sizeObj.colors.forEach((colorObj) => {
                // Sum up the stock by color
                if (colorStock[colorObj.color]) {
                    colorStock[colorObj.color] += colorObj.stock;
                } else {
                    colorStock[colorObj.color] = colorObj.stock;
                }
                total += colorObj.stock; // Add stock to total
            });
        });
    }

    // Add total to the colorStock object
    colorStock.total = total;

    return colorStock;
};
