

const ProductDetails = () => {

  const selectedProducts = {
    name: "Stylish Jacker",
    price: 120,
    originalPrice: 150,
    description: "This is a stylish jacket perfect for any occasion",
    brand: "FashionBrand",
    material: "Leather",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Red", "Black"],
    images: [
      {
        url: "https://picsum.photos/500/500?random=1",
        altText: "Stylish Jacket 1",
      },
      {
        url: "https://picsum.photos/500/500?random=2",
        altText: "Stylish Jacket 2",
      },
    ]
  }

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
        <div className="flex flex-col md:flex-row">
          <div className="hidden md:flex flex-col space-y-4 mr-6">
            {selectedProducts.images.map( (image, index) => {
              <img key={index} src={image.url} alt={image.altText} className="w-20 h-20 object-cover rounded-lg cursor-pointer border" />
            })}
          </div>
          <div className="md:w-1/2">
            <div className="mb-4">
              <img src={selectedProducts.images[0]?.url} alt="Main Prodcut" className="w-full h-auto object-cover rounded-lg" />
            </div>
          </div>

          {/* Mobile Thumbnails */}
          <div className="md:hidden flex overscroll-x-scroll space-x-4 mb-4">
            {selectedProducts.images.map( (image, index) => {
              <img key={index} src={image.url} alt={image.altText} className="w-20 h-20 object-cover rounded-lg cursor-pointer border" />
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails