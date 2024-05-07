// const contentful = require('contentful')

var client = contentful.createClient({
  space: '1ktjd8goaqzp',
  accessToken: '5pFTo6OedVnD8jk9CBTZLY5MSRJgWv_bWKk5UDUGzxY'
});



// Item Dynamic**
client.getEntries()
  .then((response) => {
    const products = response.items;
    //  dynamic model population
    products.forEach((product) => {
      const productId = product.sys.productIdcore; 
      // const productBrand = product.fields.brandcore;
      const productBrand = product.fields.brandcore ? product.fields.brandcore : '';
      const productDiscount = product.fields.discountcore;
      const productName = product.fields.namecore;
      const productDescription = product.fields.descriptioncore;
      const productCatg = product.fields.productCategorycore;
      const productOldPrice = product.fields.oldpricecore;
      const productPrice = product.fields.pricecore;
      const productImage = 'https:' + product.fields.imagecore.fields.file.url;
      // Markup append to the DOM
      const productElement = document.createElement('div');
      productElement.classList.add('products');
      productElement.setAttribute('id', productId);
      productElement.innerHTML = `
        <div class="ribon-cont">
            <span class="new ribon">${productBrand}</span>
            <span class="percent ribon">
                <span>${productDiscount}</span>
            </span>
        </div>
        <img class="product-image" src="${productImage}">
        <h4 class="product-name">${productName}</h4>
        <p class="product-description">${productDescription}</p>
        <p class="product-category">${productCatg}</p>
        <span class="old-price">${productOldPrice}</span>
        <p class="product-price">${productPrice}</p>
        <button class="add-to-cart">BUY</button>
      `;
      document.getElementById('shop').appendChild(productElement);

      // Inside the forEach loop for products
      // Find the spans within the product element
      const newSpan = productElement.querySelector('.new');
      const percentSpan = productElement.querySelector('.percent');

      // Check if spans are empty and apply styling accordingly
      if (newSpan.textContent.trim() === '') {
          newSpan.style.display = 'none';
          percentSpan.style.marginLeft = '-51px';
          percentSpan.style.borderTopLeftRadius = '10px';
      }

      if (percentSpan.textContent.trim() === '') {
          percentSpan.style.display = 'none';
      }

 
    });
  })
  .catch((error) => {
    console.log("Error fetching products: ", error);
  });

  

// Item Static**
const entryIdToElementIdMap = {
    '7e3WdPW6D70r3kQmGFJ7xb': 'InfinixCharger',
    '1oQWcileLrxC6m10wgr8nX': 'OraimoCharger',
    'amnFTwQk5WfBZTpCGaoaN': 'sevenstartypeccord',
    // More mappings Continue..
    '50S0UEcdY5CIJXOhSpVDCc': 'gamepad',
    '3EihFFavRmIlnsB08Il1J4': 'pclock',
    'L4PqaMHVMJBIKr64IGUWj': 'SelfShineshoe',
    '6IwEhyczQLxQF3PHuSYYmC': 'wirelessmouse',
    '5aMXAEWAJIUwNe8fkikX3F': 'porpo',
    '3lF8fKAlem4c5HKalyTdxB': 'Sandiskdualusbflashdrv',
    '3iEhSXKkfy2cG5bAN27Vt7': 'XboxSingleGamepd',
    '2MTDp6SOg7KYMhqbbUtNoF': 'laptMilitarySkinCover',
    'M7UVv0vq1MM59THmJdEiY':  'readingbulb',
    '6pILUlGjcJRoMpd1Zfefwk': 'oraimoPowerBank2',
    '2BNurjOZu1GKZ7o7FbqElh': 'SingleWirelessGamepd',
    '1cHGouWn58mSf2LFEW8qQO': 'SinglewiredGamepad',
    '54QLtxwynOGmt3IeuL8If7': 'oraimoearphone',
    '5yT09NJsewwx4jUWMzACDl': 'iPhoneearphone',
    '3CQxcHfecLaPXoWSh0P6Kr': 'budearpod',
    '4dR1kq0DDZzURyX7PUUDbw': 'keyboardmouse',
    '1a57yRkeVU2yDvRl4ltKSG': 'Boxers',
    '70hp4R6h4KBrZb6L471pse': 'Singlet',
    '3zpHKjYkjqLCULtZFPKffT': 'whiteLeatherShoe',
    '21eHuoxLZFubRqTcekKr7S': 'yelloshirt',
    '3yBYPWUPm6Cfqk78iXq0RB': 'ptwhitesportswear',
    '2LMZcoE5Q28xUmor5Sue30': 'whiteshort',
    '1PrraJtm9WbsCJeX05PMI5': 'greenshirt',
    '5LdRDDQzEIImnVWIWN0mMH': 'coverall',
    '2pYIFBbxsoEGGXj8MkNizt': 'touchlight',
    'ihdwcEHLjw186JsLZaMLR': 'FrezzilEarphone',
    '5E5lTvpzFN2urzjmKavuLu': 'OraimoIphoneCord',
    '3mcokbSJtSD4t1G2pEGzlo': 'oraimotypeCcharger',
    '68szwwUQK8Xzm8YPpcula0': 'wiredmouse',
    '5Kq2H5jN7Cil8JsQwxJirq': 'laptopSkinCover',
    '1pw52IEhe0t6hDjoBXkF3q': 'DoubleWiredGamepd',
    '5lHZ2fAbTZq1zfGEongGXy': 'fingerbattrey',
    '3Y0s5xi3KBhgb3wDlYfxei': 'itelandroidcord',
    // Recent Shipments Slider
    '54rBMEHevUGyTaVQjIHoZt': 'BrownlaptopBagshipment',
    '3hBNJdDOm6HEi6Xj8Dk4df': 'BlackSportsTrackshipment',
    '4ZY0e6qBeO1lbfVtdd5wvY': 'sandiskflashshipment',
    '7o7Sn1QgzR0BhLlYFrONv8': 'whiteLeatherShoeshipment',
    '2GC9Yd39HITmuCIvrguC8A': 'oraimotypeCchargershipment',
    '1kx2LAc8RN6jMerJGnkoTE': 'oraimoPowerBank2shipment',
    'ECa1KNpypKgfELvYBzo8m': 'XboxSingleGamepdshipment'

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
