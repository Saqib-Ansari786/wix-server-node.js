/**
 * how to use? example
 * const resultPerPage = 5;
 * const productCount = await productModel.countDocuments();
 * const apiFeature = new ApiFeatures(productModel.find(), req.query).search().filter().pagination(resultPerPage);
 * const product = await apiFeature.query;
 * now send the product
 */

// apply for any type of filtration in th application along with pagination
class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  search() {
    const keyword = this.queryStr.keyword && {
      name: {
        $regex: this.queryStr.keyword,
        $options: "i",
      },
    };
    this.query = this.query.find({ ...keyword });
    return this;
  }
  filter() {
    const queryCopy = { ...this.queryStr };
    const removeField = ["keyword", "page", "limit"];
    removeField.forEach((key) => delete queryCopy[key]);
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }
  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resultPerPage * (currentPage - 1);
    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }
}

export default ApiFeatures;
