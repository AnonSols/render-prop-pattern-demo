import { faker } from "@faker-js/faker/locale/af_ZA";
import { ReactNode, useState } from "react";

const products = Array.from({ length: 25 }, () => {
  return {
    productName: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
  };
});
const companys = Array.from({ length: 15 }, () => {
  return {
    companyName: faker.company.name(),
    phrase: faker.company.catchPhrase(),
  };
});

interface productType {
  product: (typeof products)[0];
}
function ProductItem({ product }: productType) {
  const { productName, description, price } = product;
  return (
    <li className="product">
      <p className="product-name">{productName}</p>
      <p className="product-price">{price}</p>
      <p className="product-description">{description}</p>
    </li>
  );
}

interface companyType {
  company: (typeof companys)[0];
  defaultVisibility: boolean;
}

function CompanyItem({ company, defaultVisibility }: companyType) {
  const [isVisible, setIsVisible] = useState(defaultVisibility);

  const { companyName, phrase } = company;
  return (
    <li
      className="company"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <p className="company-name">{companyName}</p>
      {isVisible && <p className="company-phrase">About: {phrase}</p>}
    </li>
  );
}

CompanyItem;

interface ProdType {
  kind: "products";
  items: typeof products;
  title: string;
  render: (item: (typeof products)[0]) => ReactNode;
}

interface CompType {
  kind: "company";
  title: string;
  items: typeof companys;
  render: (item: (typeof companys)[0]) => ReactNode;
}

type ListType = ProdType | CompType;

function List(item: ListType) {
  const { items, title, render, kind } = item;
  const [isOpen, setIsOpen] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);

  let displayItems;

  kind === "company"
    ? (displayItems = isCollapsed ? items.slice(0, 3) : items)
    : (displayItems = isCollapsed ? items.slice(0, 3) : items);

  const toggleOpen = () => {
    setIsOpen((isOpen) => !isOpen);
    setIsCollapsed(true);
  };

  return (
    <div className="list-container">
      <div className="heading">
        <h2>{title}</h2>

        <button onClick={toggleOpen}>
          {isOpen ? <span>&or;</span> : <span>&and;</span>}
        </button>
      </div>

      {isOpen && <ul className="list">{displayItems?.map(render)}</ul>}

      <button onClick={() => setIsCollapsed((isCollapsed) => !isCollapsed)}>
        {" "}
        {isCollapsed ? `Show all ${items.length}` : "Show less"}
      </button>
    </div>
  );
}
const App = () => {
  return (
    <div>
      <h1>Render Props Demo</h1>

      <div className="col-2">
        <List
          title="Product"
          items={products}
          kind="products"
          render={(product) => (
            <ProductItem product={product} key={product.productName} />
          )}
        />
        <List
          title="Company"
          items={companys}
          kind="company"
          render={(company) => (
            <CompanyItem defaultVisibility={false} company={company} />
          )}
        />
      </div>
    </div>
  );
};

export default App;
