import React, { useState } from "react";
import "./styles.css";

const ABAS = {
  fullStack: [],
  UX: [
    "O Início",
    "Fundamenuhdhuehdehhos de UX (User Interface)",
    "Fundamentos de UI (User Interface)",
    "Opcional",
  ],
  QA: [],
};

const dadosDeMentira = [
  {
    responsavel: "UX Now",
    tipo: "Vídeo",
    duracao: "00:06:10",
    conteudo: "https://www.youtube.com/watch?v=zaFEEvHZgjw",
    status: true,
  },
  {
    responsavel: "UX Now",
    tipo: "Vídeo",
    duracao: "00:06:37",
    conteudo: "https://www.youtube.com/watch?v=ii_yO_at8Do",
    status: true,
  },
  {
    responsavel: "UX Now",
    tipo: "Vídeo",
    duracao: "00:08:17",
    conteudo: "https://www.youtube.com/watch?v=ii_yO_at8Do",
    status: true,
  },
  {
    responsavel: "Mergo",
    tipo: "Artigo",
    duracao: "00:03:00",
    conteudo: "https://uxdesign.blog.br/don-norman-e-o-termo-ux-6dffb3f8d218",
    status: false,
  },
  {
    responsavel: "Alura",
    tipo: "Apostila",
    duracao: "00:22:00",
    conteudo:
      "https://www.alura.com.br/apostila-ux-usabilidade-mobile-web/experiencia",
    status: false,
  },
];

const Linha = ({ dados }) => {
  return (
    <div className="linha">
      <div className="linha-responsavel">{dados.responsavel || "-"}</div>
      <div className="linha-tipo">{dados.tipo || "-"}</div>
      <div className="linha-duracao">{dados.duracao || "-"}</div>
      <div className="linha-conteudo">
        {dados.conteudo ? (
          <a href={dados.conteudo} rel="noopener noreferrer" target="_blank">
            {dados.conteudo}
          </a>
        ) : (
          "-"
        )}
      </div>
      <div
        className={dados.status ? "linha-status cor-status" : "linha-status"}
      >
        {dados.status ? "✓" : "☐"}
      </div>
    </div>
  );
};

const Cabecalho = () => {
  return (
    <div className="linha cabecalho">
      <div className="linha-responsavel">RESPONSÁVEL</div>
      <div className="linha-tipo">TIPO</div>
      <div className="linha-duracao">DURAÇÃO</div>
      <div className="linha-conteudo">CONTEÚDO</div>
      <div className="linha-status">STATUS</div>
    </div>
  );
};

const Aba = ({ titulo, selecionado, ...props }) => {
  return (
    <button className={selecionado ? "aba aba-selecionada" : "aba"} {...props}>
      {titulo}
    </button>
  );
};

const App = () => {
  const [aba, setAba] = useState(1);

  return (
    <div className="teste">
      <div className="abas">
        {ABAS.UX.map((titulo, i) => (
          <Aba
            key={`aba-${i}`}
            titulo={titulo}
            selecionado={i === aba}
            onClick={() => setAba(i)}
          />
        ))}
      </div>
      <Cabecalho />
      {dadosDeMentira.map((dados, i) => (
        <Linha key={`linha-${i}`} dados={dados} />
      ))}
    </div>
  );
};

export default App;
