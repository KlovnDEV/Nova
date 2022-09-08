import * as T from 'types';

export function Person(): T.Person {
  return {
    sex: 0,
    firstname: '',
    lastname: '',
    age: 18,
    status: T.PersonStatus.Alive,
    phone: '',
    photo: `${ASSETS}/img/person.jpg`,
  };
}

export default Person;
