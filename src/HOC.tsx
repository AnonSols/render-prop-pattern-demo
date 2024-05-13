import { ReactNode, useState } from "react";
import { products } from "./App";

type ListProps = {
  title: string;
  items: typeof products;
};

export default function withToggles(
  WrappedComponent: ({ items }: { items: typeof products }) => ReactNode
) {
  return function List({ items, title }: ListProps) {
    const [isOpen, setIsOpen] = useState(true);
    const [isCollapsed, setIsCollapsed] = useState(false);

    // const { items, title } = props;
    const displayItems = isCollapsed ? items.slice(0, 3) : items;

    function toggleOpen() {
      setIsOpen((isOpen) => !isOpen);
      setIsCollapsed(false);
    }

    return (
      <div className="list-container">
        <div className="heading">
          <h2>{title}</h2>
          <button onClick={toggleOpen}>
            {isOpen ? <span>&or;</span> : <span>&and;</span>}
          </button>
        </div>
        {isOpen && <WrappedComponent {...items} items={displayItems} />}

        <button onClick={() => setIsCollapsed((isCollapsed) => !isCollapsed)}>
          {isCollapsed ? `Show all ${items.length}` : "Show less"}
        </button>
      </div>
    );
  };
}
