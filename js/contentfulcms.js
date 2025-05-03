




var client = contentful.createClient({
  space: 'duubq1vrcl0m',
  accessToken: 'zkOaBZD3Jb3gmHl8k5AMfkjw72fDiG0xtamBYDxhj0I'
});



// Item Dynamic**
client.getEntries()
  .then((response) => {
    const products = response.items;
    // model population
    products.forEach((product) => {
      const productId = product.sys.productId; 
      // const productBrand = product.fields.brandcore;
      const productBrand = product.fields.brand ? product.fields.brand : '';
      const productDiscount = product.fields.percentageDiscount;
      const productName = product.fields.productName;
      const productDescription = product.fields.productDescription;
      const productCatg = product.fields.productCategory;
      const productOldPrice = product.fields.oldPrice;
      const productPrice = product.fields.productPrice;
      const productImage = 'https:' + product.fields.productImage.fields.file.url;
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
      document.getElementById('shopServices').appendChild(productElement);

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