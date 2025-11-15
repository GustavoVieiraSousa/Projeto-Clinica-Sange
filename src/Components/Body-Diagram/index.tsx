
import * as S from "./styles";


const BodyDiagram = () => {
  return (
    <S.Container>
      <S.DiagramWrapper>
        <S.BodyPart 
          $severity= "low"
          $position="upper"
        >
          <S.PartLabel>Superior</S.PartLabel>
        </S.BodyPart>
        
        <S.BackPart 
          $severity="high"
        >
          <S.PartLabel>Costas</S.PartLabel>
        </S.BackPart>
        
        <S.BodyPart 
          $severity="medium"
          $position="lower"
        >
          <S.PartLabel>Inferior</S.PartLabel>
        </S.BodyPart>
      </S.DiagramWrapper>

      <S.Legend>
        <S.LegendItem>
          <S.LegendColor $severity="low" />
          <span>Leve</span>
        </S.LegendItem>
        <S.LegendItem>
          <S.LegendColor $severity="medium" />
          <span>Médio</span>
        </S.LegendItem>
        <S.LegendItem>
          <S.LegendColor $severity="high" />
          <span>Grave</span>
        </S.LegendItem>
      </S.Legend>
    </S.Container>
  );
};

export default BodyDiagram;
