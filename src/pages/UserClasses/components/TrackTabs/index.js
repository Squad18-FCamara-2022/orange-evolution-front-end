import CategoryTab from "./CategoryTab";
import "./styles.css";

// um componente no React é uma função JavaScript que retorna um HTML
export default function TrackTabs({ aba, categories, setAba }) {
  return (
    <div className="test">
      <div className="user-classes-tabs">
        {categories.map((category, i) => {
          const title = category.name;
          return (
            <CategoryTab
              key={`aba-${i}`}
              title={title}
              selecionado={i === aba}
              onClick={() => setAba(i)}
            />
          );
        })}
      </div>
    </div>
  );
}
