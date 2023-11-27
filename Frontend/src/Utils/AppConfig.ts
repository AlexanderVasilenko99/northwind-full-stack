class AppConfig {

    public readonly productsRoute: string = "/products/"
    public readonly addProductRoute: string = this.productsRoute + "new/"
    public readonly editProductRoute: string = this.productsRoute + "edit/"
    public readonly editProductDetails: string = this.productsRoute + "details/"

    public readonly CategoriesRoute: string = "/categories/"
    public readonly CategoriesDetailsRoute: string = this.CategoriesRoute + "details/"

    public readonly homeRoute: string = "/home/";
    public readonly loginRoute: string = "/login/";

    public readonly productsUrl: string = 'http://localhost:4000/api/products/';
    public readonly employeesUrl: string = `http://localhost:4000/api/employees/`;
    public readonly registerUrl: string = 'http://localhost:4000/api/register/';
    public readonly loginUrl: string = 'http://localhost:4000/api/login/';
    public readonly categoriesUrl: string = 'http://localhost:4000/api/categories/';
}

// Singleton
const appConfig = new AppConfig();

export default appConfig;