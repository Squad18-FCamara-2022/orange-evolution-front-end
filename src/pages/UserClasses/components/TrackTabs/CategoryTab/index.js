import './styles.css';

export default function CategoryTab({ title, selecionado, ...props }) {
  return (
    <button className={selecionado ? 'aba aba-selecionada' : 'aba'} {...props}>
      {title}
    </button>
  );
}
