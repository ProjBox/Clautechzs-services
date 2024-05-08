// const contentful = require('contentful')

var client = contentful.createClient({
  space: '1ktjd8goaqzp',
  accessToken: '5pFTo6OedVnD8jk9CBTZLY5MSRJgWv_bWKk5UDUGzxY'
});


// RES ASSISTANCE (MAIN)

// Item Post/Demands
// client.getEntries()
//   .then((response) => {
//     const products = response.items;
//     //  dynamic model population
//     products.forEach((product) => {
//       const productId = product.fields.productIdtxtpd; 
//       const productBrand = product.fields.brandpd ? product.fields.brandpd : '';
//       const productDiscount = product.fields.discountpd;
//       const productName = product.fields.namepd;
//       const productDescription = product.fields.descriptionpd;
//       const productOldPrice = product.fields.oldpricepd;
//       const productPrice = product.fields.pricepd;
//       const productImage = 'https:' + product.fields.imagepd.fields.file.url;
//       // Markup append to the DOM
//       const productElement = document.createElement('div');
//       productElement.classList.add('products');
//       productElement.setAttribute('id', productId);
//       productElement.innerHTML = `
//         <div class="ribon-cont">
//             <span class="new ribon">${productBrand}</span>
//             <span class="percent ribon">
//                 <span>${productDiscount}</span>
//             </span>
//         </div>
//         <img class="product-image" src="${productImage}">
//         <h4 class="product-name">${productName}</h4>
//         <p class="product-description">${productDescription}</p>
//         <p class="product-price">${productPrice}</p>
//         <button class="add-to-cart">BUY</button>
//       `;
//       document.getElementById('shopServices').appendChild(productElement);
//     });
//   })
//   .catch((error) => {
//     console.log("Error fetching products: ", error);
//   });

//  


// Item Dynamic**
// client.getEntries()
//   .then((response) => {
//     const products = response.items;
//     //  dynamic model population
//     products.forEach((product) => {
//       const productId = product.sys.productIdcore; 
//       // const productBrand = product.fields.brandcore;
//       const productBrand = product.fields.brandcore ? product.fields.brandcore : '';
//       const productDiscount = product.fields.discountcore;
//       const productName = product.fields.namecore;
//       const productDescription = product.fields.descriptioncore;
//       const productCatg = product.fields.productCategorycore;
//       const productOldPrice = product.fields.oldpricecore;
//       const productPrice = product.fields.pricecore;
//       const productImage = 'https:' + product.fields.imagecore.fields.file.url;
//       // Markup append to the DOM
//       const productElement = document.createElement('div');
//       productElement.classList.add('products');
//       productElement.setAttribute('id', productId);
//       productElement.innerHTML = `
//         <div class="ribon-cont">
//             <span class="new ribon">${productBrand}</span>
//             <span class="percent ribon">
//                 <span>${productDiscount}</span>
//             </span>
//         </div>
//         <img class="product-image" src="${productImage}">
//         <h4 class="product-name">${productName}</h4>
//         <p class="product-description">${productDescription}</p>
//         <p class="product-category">${productCatg}</p>
//         <span class="old-price">${productOldPrice}</span>
//         <p class="product-price">${productPrice}</p>
//         <button class="add-to-cart">BUY</button>
//       `;
//       document.getElementById('shop').appendChild(productElement);

//       // Inside the forEach loop for products
//       // Find the spans within the product element
//       const newSpan = productElement.querySelector('.new');
//       const percentSpan = productElement.querySelector('.percent');

//       // Check if spans are empty and apply styling accordingly
//       if (newSpan.textContent.trim() === '') {
//           newSpan.style.display = 'none';
//           percentSpan.style.marginLeft = '-51px';
//           percentSpan.style.borderTopLeftRadius = '10px';
//       }

//       if (percentSpan.textContent.trim() === '') {
//           percentSpan.style.display = 'none';
//       }

 
//     });
//   })
//   .catch((error) => {
//     console.log("Error fetching products: ", error);
//   });

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
    // More mappings Continued..
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



// // Function to fetch product data from Contentful
// function fetchProductData(entryId) {
//     const spaceId = '1ktjd8goaqzp';
//     const accessToken = '5pFTo6OedVnD8jk9CBTZLY5MSRJgWv_bWKk5UDUGzxY';

//     const client = contentful.createClient({
//         space: spaceId,
//         accessToken: accessToken
//     });

//     return client.getEntry(entryId)
//         .then(entry => {
//             return {
//                 brand: entry.fields.brandpd,
//                 discount: entry.fields.discountpd,
//                 name: entry.fields.namepd,
//                 description: entry.fields.descriptionpd,
//                 productCategory: entry.fields.productCategorypd,
//                 oldprice: entry.fields.oldpricepd,
//                 price: entry.fields.pricepd,
//                 imageUrl: 'https:' + entry.fields.imagepd.fields.file.url 
//             };
//         })
//         .catch(error => {
//             console.error('Error fetching product data:', error);
//             return null;
//         });
// }

// // Function to update product information on the webpage
// function updateProductInformation(entryId) {
//     const productElementId = entryIdToElementIdMap[entryId];
//     const productElement = document.getElementById(productElementId);

//     if (productElement) {
//         fetchProductData(entryId).then(product => {
            
//             if (product) {
//                 productElement.querySelector('.new').textContent = product.brand || '';
//                 productElement.querySelector('.percent').textContent = product.discount || '';
//                 productElement.querySelector('.product-name').textContent = product.name || '';
//                 productElement.querySelector('.product-description').textContent = product.description || '';
//                 productElement.querySelector('.product-category').textContent = product.productCategory || '';
//                 productElement.querySelector('.old-price').textContent = product.oldprice || '';
//                 productElement.querySelector('.product-price').textContent = product.price || '';
                
//                 const productImageElement = productElement.querySelector('.product-image');
//                 productImageElement.src = product.imageUrl;
//                 productImageElement.classList.remove('hidden');

//                 // Call handleSpans() after updating product information
//                 handleSpans();

//             } else {
//                 console.error('Error: Product data not found for entry ID ' + entryId);
//             }
//         });
//     } else {
//         console.error('Error: Product element not found for entry ID ' + entryId);
//     }
// }

// // Update individual product information based on Contentful entries
// Object.keys(entryIdToElementIdMap).forEach(entryId => {
//     updateProductInformation(entryId);
// });
