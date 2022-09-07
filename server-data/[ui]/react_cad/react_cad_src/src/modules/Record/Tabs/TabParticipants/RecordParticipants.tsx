/* eslint-disable import/prefer-default-export */
import React from 'react';
import { observer } from 'mobx-react';
// components
import { Preloader, Card, CardHeader } from 'components';
import { Icons, getParticipantsRoles } from 'utils';
import State from 'modules/Record/State';
import RecordPersons from './RecordPersons';
import RecordViolations from './RecordViolations';
// styles
import s from '../../Record.module.scss';

type IProps = { editable: boolean; organization: string };

const TabParticipantsViolations = ({ editable }: { editable: boolean }) => {
  return (
    <RecordViolations
      lawArticles={State.LawArticles}
      violations={State.RecordData.violations}
      editable={editable}
      isViolationsMenuOpen={State.isViolationsMenuOpen}
      onViolationAdd={State.onViolationAdd}
      onViolationRemove={State.onViolationRemove}
    />
  );
};

export const TabParticipants = observer(
  ({ editable, organization }: IProps): JSX.Element => {
    const participantsRoles = getParticipantsRoles(organization);

    const getParticipantsActions = () => {
      if (State.RecordData.participants.length === 0 || !editable) {
        return [];
      }

      return [
        {
          text: State.isParticipantsMenuOpen ? 'Скрыть' : 'Добавить',
          icon: State.isParticipantsMenuOpen ? Icons.RemoveCircleOutline : Icons.ControlPoint,
          onClick: () => {
            State.isParticipantsMenuOpen = !State.isParticipantsMenuOpen;
          },
        },
      ];
    };

    const getViolationsActions = () => {
      if (State.RecordData.violations.length === 0 || !editable) {
        return [];
      }

      return [
        {
          text: State.isViolationsMenuOpen ? 'Скрыть' : 'Добавить',
          icon: State.isViolationsMenuOpen ? Icons.RemoveCircleOutline : Icons.ControlPoint,
          onClick: () => {
            State.isViolationsMenuOpen = !State.isViolationsMenuOpen;
          },
        },
      ];
    };
    return (
      <div className={s.Grid}>
        <Card
          elevation={0}
          header={
            <CardHeader
              labelText={organization === 'police' ? 'Фигуранты' : 'Участники'}
              actions={getParticipantsActions()}
            />
          }
          flex="column top left"
        >
          {State.RecordData.participants && (
            <RecordPersons
              participants={State.RecordData.participants}
              editable={editable}
              participantsRoles={participantsRoles}
              isParticipantsMenuOpen={State.isParticipantsMenuOpen}
              onParticipantAdd={State.onParticipantAdd}
              onParticipantRemove={State.onParticipantRemove}
            />
          )}
        </Card>
        {organization === 'police' && (
          <Card
            elevation={0}
            header={<CardHeader labelText="Правонарушения" actions={getViolationsActions()} />}
            flex="column top left"
          >
            <Preloader
              event={State.assets.lawArticles}
              success={TabParticipantsViolations}
              editable={editable}
            />
          </Card>
        )}
      </div>
    );
  },
);
