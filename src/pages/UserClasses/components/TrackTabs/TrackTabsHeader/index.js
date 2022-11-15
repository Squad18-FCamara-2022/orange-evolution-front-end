import './styles.css';

export default function TrackTabsHeader() {
  return (
    <>
      <div className="linha-cabecalho cabecalho-desk">
        <h3 className="linha-titulo">Título</h3>
        <h3 className="linha-responsavel">Autor</h3>
        <h3 className="linha-tipo">Tipo</h3>
        <h3 className="linha-duracao">Duração</h3>
        <h3 className="linha-conteudo">Conteúdo</h3>
        <h3 className="linha-status">Status</h3>
      </div>
      <div className="linha-cabecalho cabecalho-mobile">
        <h3 className="linha-titulo">
          Trilha
          <br />
          Autor | Tipo | Duração
        </h3>
        <div>
          <h3>Link</h3>
          <h3>Status</h3>
        </div>
      </div>
    </>
  );
}
