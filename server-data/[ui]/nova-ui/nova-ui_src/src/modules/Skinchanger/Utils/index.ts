/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
export * from './setMapItem';

export const eye_color = [
  {
    value: 0,
    color: '#525e37',
  },
  {
    value: 1,
    color: '#263419',
  },
  {
    value: 2,
    color: '#83b7d5',
  },
  {
    value: 3,
    color: '#3e66a3',
  },
  {
    value: 4,
    color: '#8d6833',
  },
  {
    value: 5,
    color: '#523711',
  },
  {
    value: 6,
    color: '#d08418',
  },
  {
    value: 8,
    color: '#bebebe',
  },
  {
    value: 12,
    color: '#0d0d0c',
  },
];

export const skin = [
  {
    value: 12,
    color: '#ecc8ae',
  },
  {
    value: 25,
    color: '#ce9874',
  },
  {
    value: 19,
    color: '#925a41',
  },
  {
    value: 14,
    color: '#4e3a26',
  },
];

export const noseSliders = [
  {
    name: 'nose_width',
    header: 'Ширина носа',
    value: 0,
    min: -10,
    max: 10,
  },
  {
    name: 'nose_peak_height',
    header: 'Высота носа',
    value: 0,
    min: -10,
    max: 10,
  },
  {
    name: 'nose_peak_length',
    header: 'Выступ кончика носа',
    value: 0,
    min: -10,
    max: 10,
  },
];

export const noseSliders2 = [
  {
    name: 'nose_peak_lowering',
    header: 'Высота кончика носа',
    value: 0,
    min: -10,
    max: 10,
  },
  {
    name: 'nose_bone_height',
    header: 'Высота переносицы',
    value: 0,
    min: -10,
    max: 10,
  },
  {
    name: 'nose_peak_twist',
    header: 'Искривление носа',
    value: 0,
    min: -10,
    max: 10,
  },
];

export const eyeSliders = [
  {
    name: 'eyebrow_height',
    header: 'Высота бровей',
    value: 0,
    min: -10,
    max: 10,
  },
  {
    name: 'eyebrow_forward',
    header: 'Выступ бровей',
    value: 0,
    min: -10,
    max: 10,
  },
  {
    name: 'eyebrows_1',
    header: 'Форма бровей',
    value: 0,
    min: 0,
    max: 34,
  },
  {
    name: 'eyebrows_2',
    header: 'Толщина бровей',
    value: 0,
    min: 0,
    max: 10,
  },
];

export const eyeSliders2 = [
  {
    name: 'eyes_opening',
    header: 'Разрез глаз',
    value: 0,
    min: -10,
    max: 10,
  },
];

export const faceShapeSliders = [
  {
    name: 'cheeks_bone_height',
    header: 'Высота скул',
    value: 0,
    min: -10,
    max: 10,
  },
  {
    name: 'cheeks_bone_width',
    header: 'Ширина скул',
    value: 0,
    min: -10,
    max: 10,
  },
  {
    name: 'cheeks_width',
    header: 'Полнота щек',
    value: 0,
    min: -10,
    max: 10,
  },
  {
    name: 'lips_thickness',
    header: 'Полнота губ',
    value: 0,
    min: -10,
    max: 10,
  },
  {
    name: 'neck_thickness',
    header: 'Полнота шеи',
    value: 0,
    min: -10,
    max: 10,
  },
];

export const faceShapeSliders2 = [
  {
    name: 'jaw_bone_width',
    header: 'Ширина челюсти',
    value: 0,
    min: -10,
    max: 10,
  },
  {
    name: 'jaw_bone_back_length',
    header: 'Высота челюсти',
    value: 0,
    min: -10,
    max: 10,
  },
  {
    name: 'chimp_bone_lowering',
    header: 'Высота подбородка',
    value: 0,
    min: -10,
    max: 10,
  },
  {
    name: 'chimp_bone_length',
    header: 'Длина подбородка',
    value: 0,
    min: -10,
    max: 10,
  },
  {
    name: 'chimp_bone_width',
    header: 'Ширина подбородка',
    value: 0,
    min: -10,
    max: 10,
  },
  {
    name: 'chimp_hole',
    header: 'Ямочка на подбородке',
    value: 0,
    min: -10,
    max: 10,
  },
];

export const makeupSliders = [
  {
    name: 'blush_1',
    header: 'Раскраска лица',
    value: 0,
    min: 0,
    max: 32,
  },
  {
    name: 'blush_2',
    header: 'Интенсивность раскраски',
    value: 0,
    min: 0,
    max: 10,
  },
];

export const makeupSliders2 = [
  {
    name: 'makeup_1',
    header: 'Тип макияжа',
    value: 0,
    min: 0,
    max: 71,
  },
  {
    name: 'makeup_2',
    header: 'Насыщенность макияжа',
    value: 0,
    min: 0,
    max: 10,
  },

  {
    name: 'lipstick_1',
    header: 'Тип помады',
    value: 0,
    min: 0,
    max: 9,
  },
  {
    name: 'lipstick_2',
    header: 'Насыщенность помады',
    value: 0,
    min: 0,
    max: 10,
  },
];

export const skinDamage = [
  {
    name: 'acne_1',
    header: 'Тип угрей',
    value: 0,
    min: 0,
    max: 23,
  },
  {
    name: 'acne_2',
    header: 'Интенсивность угрей',
    value: 0,
    min: 0,
    max: 10,
  },
];

export const skinDamage2 = [
  {
    name: 'moles_1',
    header: 'Веснушки',
    value: 0,
    min: 0,
    max: 17,
  },
  {
    name: 'moles_2',
    header: 'Интенсивность веснушек',
    value: 0,
    min: 0,
    max: 10,
  },
  {
    name: 'age_1',
    header: 'Морщины',
    value: 0,
    min: 0,
    max: 14,
  },
  {
    name: 'age_2',
    header: 'Глубина морщин',
    value: 0,
    min: 0,
    max: 10,
  },
];

export const hairSliders = [
  {
    name: 'hair_1',
    header: 'Прическа',
    value: 0,
    min: 0,
    max: 74,
  },
  {
    name: 'hair_2',
    header: 'Прическа (2)',
    value: 0,
    min: 0,
    max: 5,
  },
];

export const hairSliders2 = [
  {
    name: 'beard_1',
    header: 'Тип бороды',
    value: 0,
    min: 0,
    max: 28,
  },
  {
    name: 'beard_2',
    header: 'Толщина бороды',
    value: 0,
    min: 0,
    max: 10,
  },
];
