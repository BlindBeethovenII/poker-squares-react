import React, { useContext } from 'react';

import { Modal } from 'react-responsive-modal';
import styled from 'styled-components';

import GameStateContext from '../context/GameStateContext';

const Title = styled.h2`
  background: white;
  color: #761d38;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #761d38;
  border-radius: 3px;
  text-align: center;
`;

const P = styled.p`
  background: white;
  color: #761d38;
  margin: 1em;
  padding: 0.25em 1em;
  text-align: left;
`;

export const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

// taken from https://codesandbox.io/s/tables-styled-components-v7vgb?from-embed=&file=/src/components/kit/Table/index.js:68-960
const StyledTable = styled.table`
  caption-side: top;
  border: none;
  border-collapse: collapse;
  /* border-collapse: separate; */
  /* border-spacing: 5px 10px; */

  caption-side: bottom;
  /* empty-cell: show | hide;  */
  /* empty-cell is a property of table or the cells themselves */

  /* vertical-align: baseline | sub | super | text-top | 
                text-bottom | middle | top | bottom | 
                <percentage> | <length> */

  /* tbody {
    vertical-align: top;
  }              */
  td,
  th {
    border: none;
    text-align: center;
  }
  /* td,
  th {
    border: 1px solid;
  } */

  td {
    padding: 5px 10px;
  }

  tbody tr {
    :nth-of-type(odd) {
      background-color: #efefef;
    }
    :hover {
      background-color: lightpink;
    }
  }
  thead > tr {
    background-color: #c2c2c2;
  }
  caption {
    font-size: 0.9em;
    padding: 5px;
    font-weight: bold;
  }
`;

const HelpModal = () => {
  const { helpOpen, closeHelp } = useContext(GameStateContext);

  return (
    <Modal open={helpOpen} onClose={closeHelp} center>
      <Title>Help</Title>
      <P>
        In Poker Squares 25 cards are randomly dealt, one at a time. You place them in a 5 by 5 grid to create 10 poker
        hands; 5 across and 5 down. The better the poker hands the bigger the score.
      </P>
      <P>We are using the UK scoring system, which is based on probabilities:</P>
      <Center>
        <StyledTable>
          <colgroup>
            <col />
            <col />
          </colgroup>
          <thead>
            <tr>
              <th key="tr_hand">Hand</th>
              <th key="tr_score">Score</th>
            </tr>
          </thead>
          <tbody>
            <tr key="row_0">
              <td key="row_0_0">Straight Flush</td>
              <td key="row_0_1">30</td>
            </tr>
            <tr key="row_1">
              <td key="row_1_0">Four of a Kind</td>
              <td key="row_1_1">16</td>
            </tr>
            <tr key="row_2">
              <td key="row_2_0">Straight</td>
              <td key="row_2_1">12</td>
            </tr>
            <tr key="row_3">
              <td key="row_3_0">Full House</td>
              <td key="row_3_1">10</td>
            </tr>
            <tr key="row_4">
              <td key="row_4_0">Three of a Kind</td>
              <td key="row_4_1">6</td>
            </tr>
            <tr key="row_5">
              <td key="row_5_0">Flush</td>
              <td key="row_5_1">5</td>
            </tr>
            <tr key="row_6">
              <td key="row_6_0">Two Pair</td>
              <td key="row_6_1">3</td>
            </tr>
            <tr key="row_7">
              <td key="row_7_0">Pair</td>
              <td key="row_7_1">1</td>
            </tr>
          </tbody>
        </StyledTable>
      </Center>
      <P>
        You can either play against the computer or against another player. In both cases you place your cards in the
        playing area on the left, and the opponent&apos;s cards will be shown on the right.
      </P>
      <P>
        To play a peer-to-peer game, the host uses the &quot;Host Peer Game&quot; dialog to enter their name. On
        selecting the &quot;Host&quot; button they are presented with a unique Game Id for this session. They have to
        share that Game Id with the other player via some means outside of this game. The other player then uses the
        &quot;Join Peer Game&quot; dialog to enter their own name and that Game Id; and then selects the
        &quot;Join&quot; button. When both players are happy that the other player is connected they select the
        &quot;Play&quot; button to start playing.
      </P>
    </Modal>
  );
};

export default HelpModal;
