class ProductModel {
    // we can add `?` or `!` or⬇️
    // strictNullChecks = false
    public id: number;
    public name: string;
    public price: number;
    public stock: number;
    public imageUrl: string;
    public image: File;
}
export default ProductModel;