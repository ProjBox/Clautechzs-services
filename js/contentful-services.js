// const contentful = require('contentful')

var client = contentful.createClient({
  space: '1ktjd8goaqzp',
  accessToken: '5pFTo6OedVnD8jk9CBTZLY5MSRJgWv_bWKk5UDUGzxY'
});



// Item Static**
const entryIdToElementIdMap = {
    '50S0UEcdY5CIJXOhSpVDCc': 'doublewirelessgamepadshipmentservices',
    '1HacsA9v4zjOFvqGjZb3NC': 'doublewiredgamepadshipmentservices',
    '75hdOmfe59PNUnarnst9jK': 'oraimotypeCchargershipmentservices',
    '7CGR1VewF95vgqOWRsG5tj': 'whiteLeatherShoeshipmentservices',
    '1P7UGg3bakznC7qXuSJto9': '16gbsandiskFlashshipmentservices',
    '44Tu3QTg0bcDkjOIWm90xd': 'OraimoChargershipmentservices',
    '1lSD6ZIlYqfjpUabdPQJy0': 'infinixChargershipmentservices',
    '510Ax7QM8hPXieTpzNt9Ib': 'DpTouchLightshipmentservices',
    '6Iznk6uG6LbU2rGNyxbRwK': 'OraimoiphoneCordshipmentservices',
    '4NJ6rYfEilJs9mqlWsTEdI': 'BlackSportsTrackshipmentservices',
    // Added
    '7o1Lk0SVSbWqmXsJx3HqTl': 'oraimoPowerBankshipmentservices',
    '1cD0KsqvhTVOlZ0maYlzcL': 'XboxSingleGamepdshipmentservices'
};


// Function to fetch product data from Contentful
function fetchProductData(entryId) {
    const spaceId = '1ktjd8goaqzp';
    const accessToken = '5pFTo6OedVnD8jk9CBTZLY5MSRJgWv_bWKk5UDUGzxY';

    const client = contentful.createClient({
        space: spaceId,
        accessToken: accessToken
    });

    return client.getEntry(entryId)
        .then(entry => {
            return {
                brand: entry.fields.brand,
                discount: entry.fields.discount,
                name: entry.fields.name,
                description: entry.fields.description,
                productCategory: entry.fields.productCategory,
                oldprice: entry.fields.oldprice,
                price: entry.fields.price,
                imageUrl: 'https:' + entry.fields.image.fields.file.url // Assuming 'image' is a reference to an asset
            };
        })
        .catch(error => {
            console.error('Error fetching product data:', error);
            return null;
        });
}

// Function to update product information on the webpage
function updateProductInformation(entryId) {
    const productElementId = entryIdToElementIdMap[entryId];
    const productElement = document.getElementById(productElementId);

    if (productElement) {
        fetchProductData(entryId).then(product => {
            
            if (product) {
                productElement.querySelector('.new').textContent = product.brand || '';
                productElement.querySelector('.percent').textContent = product.discount || '';
                productElement.querySelector('.product-name').textContent = product.name || '';
                productElement.querySelector('.product-description').textContent = product.description || '';
                productElement.querySelector('.product-category').textContent = product.productCategory || '';
                productElement.querySelector('.old-price').textContent = product.oldprice || '';
                productElement.querySelector('.product-price').textContent = product.price || '';
                
                const productImageElement = productElement.querySelector('.product-image');
                productImageElement.src = product.imageUrl;
                productImageElement.classList.remove('hidden');

                // Call handleSpans() after updating product information
                handleSpans();

            } else {
                console.error('Error: Product data not found for entry ID ' + entryId);
            }
        });
    } else {
        console.error('Error: Product element not found for entry ID ' + entryId);
    }
}

// Update individual product information based on Contentful entries
Object.keys(entryIdToElementIdMap).forEach(entryId => {
    updateProductInformation(entryId);
});



