import React from 'react';
import { observer } from 'mobx-react';
import AppStorage from 'modules/App/Storage';
import classNames from 'classnames';
import { Icon } from 'libs/UI';
import s from './HealthCheck.local.scss';
import HealthStore, { IRegion, IDamage } from './Storage';

function DamageItem({ name, description, icon }: IDamage): JSX.Element {
  return (
    <div className={s.DamageItem} key={name}>
      <Icon className={s.DamageIcon} name={icon} />
      <p className={s.DamageHeader}>{name}</p>
      <p className={s.DamageDescription}>{description}</p>
    </div>
  );
}

function HealthCheckProto() {
  const onShowTooltip = (e: React.SyntheticEvent) => {
    AppStorage.showTooltip({
      anchor: e.currentTarget,
      tip: {
        title: e.currentTarget.id,
      },
    });
  };

  const onCloseTooltip = () => {
    AppStorage.showTooltip(null);
  };

  return (
    <div className={s.Wrapper}>
      <div className={s.Health}>
        <div
          className={classNames(s.Block, s.DamageMap)}
          onClick={e => {
            if (e.target !== this) return; // ignore clicks on children
            HealthStore.setSelectedRegion(null);
          }}
          role="presentation"
        >
          <svg
            className={s.DamageMapIcon}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="15 0 250 500"
          >
            <polygon
              id="head"
              className={classNames(
                s.DamageMapItem,
                HealthStore.DamageMap.head?.length > 0 ? s['is-damaged'] : null,
                HealthStore.SelectedRegion === 'head' ? s['is-active'] : null,
              )}
              points="121,21,115,43,120,62,130,71,139,76,151,69,158,61,162,39,157,20,139,14"
              onClick={e => HealthStore.setSelectedRegion(e.currentTarget.id as IRegion)}
            />
            <g
              id="torso"
              className={classNames(
                s.DamageMapItem,
                HealthStore.DamageMap.torso?.length > 0 ? s['is-damaged'] : null,
                HealthStore.SelectedRegion === 'torso' ? s['is-active'] : null,
              )}
              onClick={e => HealthStore.setSelectedRegion(e.currentTarget.id as IRegion)}
            >
              <polygon points="153,72 141,96 141,110 168,112 190,124 187,104 172,100 160,89" />
              <polygon points="88,124 91,105 106,100 118,88 126,74 137,97 136,110 110,111" />
              <polygon points="144,116 142,149 159,156 183,150 190,130 169,116" />
              <polygon points="90,128 94,150 117,156 135,149 134,117 109,117" />
              <polygon points="155,159 159,171 160,205 160,241 155,255 152,269 143,278 142,221 141,179 142,154" />
              <polygon points="124,158 136,154 137,179 136,221 135,277 126,268 117,238 117,206 118,172" />
              <polygon points="185,169 182,154 161,160 164,171 165,218 178,207 180,185 182,185" />
              <polygon points="100,206 98,190 93,169 96,154 117,159 113,169 113,219" />
            </g>
            <g
              id="handR"
              className={classNames(
                s.DamageMapItem,
                HealthStore.DamageMap.handR?.length > 0 ? s['is-damaged'] : null,
                HealthStore.SelectedRegion === 'handR' ? s['is-active'] : null,
              )}
              onClick={e => HealthStore.setSelectedRegion(e.currentTarget.id as IRegion)}
            >
              <polygon
                id="Right_Deltoids_Front"
                points="86,130 69,144 66,131 67,114 77,105 87,105 83,120"
              />
              <polygon
                id="Right_Biceps_Brachii_Long_Head"
                points="58,181 61,189 73,176 88,146 85,135 67,151"
              />
              <polygon id="Right_Biceps_Brachii_Short_Head" points="72,184 90,150 90,163 73,193" />
              <polygon
                id="Right_Brachioradialis"
                points="32,231 42,198 53,186 57,196 64,194 28,253 17,259"
              />
              <polygon
                id="Right_Flexor_Digitorum"
                points="34,262 50,236 63,220 70,203 69,190 29,256"
              />
            </g>
            <g
              id="handL"
              className={classNames(
                s.DamageMapItem,
                HealthStore.DamageMap.handL?.length > 0 ? s['is-damaged'] : null,
                HealthStore.SelectedRegion === 'handL' ? s['is-active'] : null,
              )}
              onClick={e => HealthStore.setSelectedRegion(e.currentTarget.id as IRegion)}
            >
              <polygon
                id="Left_Deltoids_Front"
                points="209,144 212,131 211,115 203,107 191,103 194,119 192,130"
              />
              <polygon
                id="Left_Brachioradialis"
                points="224,185 221,194 213,193 250,255 262,260 246,233 237,201"
              />
              <polygon
                id="Left_Biceps_Brachii_Short_Head"
                points="187,150 187,165 203,192 207,186 202,179"
              />
              <polygon
                id="Left_Flexor_Digitorum"
                points="207,191 207,204 214,220 226,234 243,262 249,258"
              />
              <polygon
                id="Left_Biceps_Brachii_Long_Head"
                points="192,135 189,148 204,176 217,190 220,183 210,150"
              />
            </g>
            <g
              id="legR"
              className={classNames(
                s.DamageMapItem,
                HealthStore.DamageMap.legR?.length > 0 ? s['is-damaged'] : null,
                HealthStore.SelectedRegion === 'legR' ? s['is-active'] : null,
              )}
              onClick={e => HealthStore.setSelectedRegion(e.currentTarget.id as IRegion)}
            >
              <polygon
                id="GROINS"
                points="134,285 127,321 120,298 116,291 114,277 110,265 102,244 114,240 119,257 124,272"
              />
              <polygon
                id="QUADS"
                points="102,256 108,279 108,327 101,350 93,339 89,308 86,287 89,261 96,246"
              />
              <polygon
                id="QUADS"
                points="112,331 111,289 118,304 126,331 122,345 115,372 106,373 104,357"
              />
              <polygon
                id="Right_Knee_Front"
                points="100,357 102,365 104,375 106,384 103,398 90,398 84,388 84,375 91,367"
              />
              <polygon id="QUADS" points="97,353 82,371 80,349 80,326 83,294 89,341" />
              <polygon
                id="Right_Shin"
                points="104,402 105,412 105,423 103,436 103,447 96,460 92,473 83,491 84,474 86,456 87,444 88,430 90,416 91,403"
              />
              <polygon
                id="Right_Tibialis_Anterior"
                points="78,491 85,418 86,407 81,392 78,400 72,410 68,425 71,475 68,493"
              />
            </g>
            <g
              id="legL"
              className={classNames(
                s.DamageMapItem,
                HealthStore.DamageMap.legL?.length > 0 ? s['is-damaged'] : null,
                HealthStore.SelectedRegion === 'legL' ? s['is-active'] : null,
              )}
              onClick={e => HealthStore.setSelectedRegion(e.currentTarget.id as IRegion)}
            >
              <polygon
                id="GROINS"
                points="146,284 150,320 164,284 169,259 176,245 164,241 156,270"
              />
              <polygon
                id="Left_Knee_Front"
                points="178,357 194,376 194,387 188,399 176,398 171,384"
              />
              <polygon id="QUADS" points="193,291 198,318 198,358 195,371 180,353 189,341" />
              <polygon
                id="QUADS"
                points="172,273 175,259 181,246 189,262 191,288 184,340 177,351 170,329 169,287"
              />
              <polygon id="QUADS" points="163,371 153,330 166,293 167,333 174,356 171,373" />
              <polygon
                id="Left_Tibialis_Anterior"
                points="192,407 197,390 205,409 212,425 209,474 212,493 200,493"
              />
              <polygon id="Left_Shin" points="195,492 188,404 177,402 174,412 174,419 178,448" />
            </g>
          </svg>
        </div>
        <div className={s.Block}>
          <p className={s.BlockHeader}>Общая информация</p>
          <div className={s.BlockRow}>
            <div className={s.Info}>
              <p className={s.InfoHeader}>Имя</p>
              <p className={s.InfoDetail}>{HealthStore.PersonInfo?.firstname}</p>
            </div>
            <div className={s.Info}>
              <p className={s.InfoHeader}>Фамилия</p>
              <p className={s.InfoDetail}>{HealthStore.PersonInfo?.lastname}</p>
            </div>
            <div className={s.Info}>
              <p className={s.InfoHeader}>Пол</p>
              <p className={s.InfoDetail}>{HealthStore.PersonInfo?.sex === 0 ? 'Муж.' : 'Жен.'}</p>
            </div>
            <div className={s.Info}>
              <p className={s.InfoHeader}>Состояние</p>
              <p className={s.InfoDetail}>
                {HealthStore.PersonInfo?.status === 0 ? 'В сознании' : 'Без сознания'}
              </p>
            </div>
          </div>
        </div>
        <div className={classNames(s.Block, s.DoubleRow)}>
          <p className={s.BlockHeader}>Физические повреждения</p>
          <div className={s.BlockRow}>
            {Object.entries(HealthStore.DamageMap).map(([regionName, region]) => {
              if (regionName != HealthStore.SelectedRegion && HealthStore.SelectedRegion !== null)
                return null;

              return region.map(item => <DamageItem {...item} />);
            })}
          </div>
        </div>
        {/* <div className={s.Block}>
          <p className={s.BlockHeader}>Анализы</p>
          <div className={s.BlockRow}>
            <div className={s.Info}>
              <p className={s.InfoHeader}>asd</p>
              <p className={s.InfoDetail}>qwe</p>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

const HealthCheck = observer(HealthCheckProto);
export { HealthCheck };
export default HealthCheck;
