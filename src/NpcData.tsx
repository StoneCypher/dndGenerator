import React, { Component } from "react";
import { Panel, Row, Col } from "react-bootstrap";
import { Npc, NpcAbilities } from "./npcData/index";
import "./NpcData.less";

const abilities: { key: keyof NpcAbilities, name: string; }[] = [
  { key: "str", name: "Strength" },
  { key: "dex", name: "Dexterity" },
  { key: "con", name: "Constitution" },
  { key: "int", name: "Intellect" },
  { key: "wis", name: "Wisdom" },
  { key: "cha", name: "Charisma" },
];

function toFeet(n: number) {
  const realFeet = ((n * 0.393700) / 12);
  const feet = Math.floor(realFeet);
  const inches = Math.floor((realFeet - feet) * 12);
  return feet + "'" + inches + '"';
}

interface IProps {
  npc: Npc | null
}

export default class NpcData extends Component<IProps> {
  render() {
    const { npc } = this.props;
    if (!npc) {
      return <div>Loading npc...</div>;
    }

    const majP = npc.description.pronounCapit;
    //const minP = npc.description.pronounMinus;
    const quirksArray = npc.pquirks.description.split(".");
    quirksArray.length--;

    if (npc.description.race === "lizardman" || npc.description.race === "lizardwoman") {
      npc.ptraits.traits1 = npc.ptraits.traitslizards;
    }
    if (npc.description.race === "goliath") {
      npc.ptraits.traits1 = npc.ptraits.traitsgoliaths;
    }
    if (npc.description.race === "kenku") {
      npc.description.name = npc.description.kenkuname;
    }

    const specialPhysical1 = npc.physical.special1 !== ""
      ? <div><p hidden>#</p><p>{npc.physical.special1}</p></div>
      : null;
    const specialPhysical2 = npc.physical.special2 !== ""
      ? <div><p hidden>#</p><p>{npc.physical.special2}</p></div>
      : null;

    return (
      <div className="npc-data" id="downloadData">
        <Row>
          <Col xs={12} md={6}>
            <Panel className="first-row-height">
              <Panel.Heading>Description</Panel.Heading>
              <Panel.Body>
                <p hidden>#</p>
                <p>
                  {npc.description.name} is a {npc.description.age + " "}
                  years old {npc.description.gender} {npc.description.race + " "}
                  {npc.description.occupation}.
              </p>
                <p hidden>#</p>
                <p>
                  {majP}has {npc.physical.hair}{npc.physical.eyes}.
              </p>
                <p hidden>#</p>
                <p>
                  {majP}has {npc.physical.skin}.
              </p>
                <p hidden>#</p>
                <p>
                  {majP}stands {npc.physical.height}cm ({toFeet(npc.physical.height)}) tall and has {npc.physical.build}.
              </p>
                <p hidden>#</p>
                <p>
                  {majP}has {npc.physical.face}.
              </p>
                <p hidden>#</p>
                {specialPhysical1}
                {specialPhysical2}
                <p hidden>#</p>
                <p hidden>#</p>
              </Panel.Body>
            </Panel>
          </Col>
          <Col xs={12} md={6}>
            <Panel className="first-row-height">
              <Panel.Heading>Personality Traits</Panel.Heading>
              <Panel.Body>
                <p hidden>#</p>
                <p>
                  {npc.religion.description}
                </p>
                <p hidden>#</p>
                <p>{npc.ptraits.traits1}</p>
                <p hidden>#</p>
                <p>{npc.ptraits.traits2}</p>
                {
                  quirksArray.map(value => <p key={value}>{value}.</p>)
                }
                <p hidden>#</p>
                <p hidden>#</p>
              </Panel.Body>
            </Panel>
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={6} lg={4}>
            <Panel className="second-row-height">
              <Panel.Heading>Ability Scores</Panel.Heading>
              <Panel.Body>
                <p hidden>#</p>
                <Row>
                  <Col
                    lg={12}
                    md={2}
                    xs={12}
                    className="no-right-pad no-left-pad ability"
                  >
                    <table className="ability-table">
                      <tbody>
                        {
                          abilities.map(({ key, name }) => {
                            const ability = npc.abilities[key];
                            return (
                              <tr key={key}><td><b>{name}</b><p hidden> - </p></td><td className="ability-number">{Math.max(3, ability)}<p hidden>#</p></td></tr>
                            );
                          })
                        }
                      </tbody>
                    </table>
                  </Col>
                </Row>
                <p hidden>#</p>
              </Panel.Body>
            </Panel>
          </Col>
          <Col sm={12} md={6} lg={4}>
            <Panel className="second-row-height">
              <Panel.Heading>Relationships</Panel.Heading>
              <Panel.Body>
                <p hidden>#</p>
                <p><b>Sexual Orientation </b></p><p hidden>- </p><p>{npc.relationship.orientation}</p>
                <p hidden>#</p>
                <p><b>Relationship Status </b></p><p hidden>- </p><p>{npc.relationship.status}</p>
                <p hidden>#</p>
                <p hidden>#</p>
              </Panel.Body>
            </Panel>
          </Col>
          <Col sm={12} md={12} lg={4}>
            <Panel className="second-row-height">
              <Panel.Heading>Alignment Tendencies</Panel.Heading>
              <Panel.Body>
                <p hidden>#</p>
                <table className="alignment-table">
                  <tbody>
                    <tr>
                      <td className="width-thin"><b>Good</b></td><td hidden>:    </td><td className="alignment-number">{Math.max(0, npc.alignment.good)}</td>
                      <td hidden>  </td>
                      <td className="width-thin"><b>Lawful</b></td><td hidden>:  </td><td className="alignment-number">{Math.max(0, npc.alignment.lawful)}</td>
                    </tr>
                    <tr hidden><td>#</td></tr>
                    <tr>
                      <td className="width-thin"><b>Neutral</b></td><td hidden>: </td><td className="alignment-number">{Math.max(0, npc.alignment.moralneutral)}</td>
                      <td hidden>  </td>
                      <td className="width-thin"><b>Neutral</b></td><td hidden>: </td><td className="alignment-number">{Math.max(0, npc.alignment.ethicalneutral)}</td>
                    </tr>
                    <tr hidden><td>#</td></tr>
                    <tr>
                      <td className="width-thin"><b>Evil</b></td><td hidden>:    </td><td className="alignment-number">{Math.max(0, npc.alignment.evil)}</td>
                      <td hidden>  </td>
                      <td className="width-thin"><b>Chaotic</b></td><td hidden>: </td><td className="alignment-number">{Math.max(0, npc.alignment.chaotic)}</td>
                    </tr>
                  </tbody>
                </table>
              </Panel.Body>
            </Panel>
          </Col>
        </Row>
        <p hidden>#</p>
        <p hidden>#</p>
        <Row>
          <Col xs={12}>
            <Panel className="align-center">
              <Panel.Heading>Plot Hook</Panel.Heading>
              <Panel.Body>
                <p hidden>#</p>
                {npc.hook.description}
                <p hidden>#</p>
                <p hidden>#</p>
              </Panel.Body>
            </Panel>
          </Col>
        </Row>
      </div>
    );
  }
}
